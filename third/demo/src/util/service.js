import axios from "axios";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus";
import store from "/src/store/index.js";
//使用create创建axios实例
let loadingObj = null;
const Service = axios.create({
  timeout: 8000,
  baseURL: "http://127.0.0.1:8888/api/private/v1/",
  headers: {
    "Content-type": "application/json;chartset=utf-8",
    Authorization: store.state.uInfo.userInfo.token,
  },
});
//请求拦截
Service.interceptors.request.use((config) => {
  loadingObj = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  return config;
});
//响应拦截
Service.interceptors.response.use( 
  (response) => {
    const data = response.data;
    console.log(data);
    if (data.meta.status != 200 && data.meta.state != 201) {
      //请求出错
      let cuowu = data.meta.msg;
      ElMessage({
        showClose: true,
        message: cuowu || "服务器错误",
        type: "error",
      });
      return data;
    }
    if (data === 200) {
      ElMessage({
        showClose: true,
        message: cuowu,
        type: "success",
        duration: 0,
      });
      return data;
    }
    loadingObj.close();
    return response.data;
  },
  (error) => {
    loadingObj.close();
    ElMessage({
      message: "服务器错误",
      type: "error",
      center: true,
      duration: 2000,
    });
  }
);

//post get request
export const post = (config) => {
  return Service({
    ...config,
    method: "post",
    data: config.data,
  });
};
//get request
export const get = (config) => {
  return Service({
    ...config,
    method: "get",
    params: config.data,
  });
};
//put request
export const put = (config) => {
  return Service({
    ...config,
    method: "put",
    params: config.data,
  });
};

export const del = (config) => {
  return Service({
    ...config,
    method: "delete",
  });
};
