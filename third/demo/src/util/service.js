import axios from "axios";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus";
//使用create创建axios实例
let loadingObj = null;
const Service = axios.create({
  timeout: 8000,
  baseURL: "http://XXX",
  headers: {
    "Content-type": "application/json;chartset=utf-8",
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
