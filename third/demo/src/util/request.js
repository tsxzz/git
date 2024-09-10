import { post, get, put, del } from "./service";

export const loginApi = (data) => {
  return post({
    url: "/login",
    data,
  });
};

//获取用户
export const userListApi = (data) => {
  return get({
    url: "/users",
    data,
  });
};
//新建用户
export const userAddApi = (data) => {
  return post({
    url: "/users",
    data,
  });
};

//修改状态
export const userChangeStateApi = (data) => {
  return put({
    url: `/users/${data.id}/state/${data.mg_state}`,
    data: {
      state: data.state,
    },
  });
};

//修改用户
export const userChangeApi = (data) => {
  return put({
    url: `users/${data.id}`,
    data,
  });
};

//删除用户
export const userDelateApi = (data) => {
  return del({
    url: `/users/${data.id}`,
  });
};

//获取角色
export const rolesListApi = (data) => {
  return get({
    url: "roles",
    data,
  });
};
