import service from "../utils/request";

//登录
export function reqLogin(data) {
  return service.request({
    url: "/login/",
    method: "post",
    data,
  });
}

//获取验证码
export function reqGetCode(data) {
  return service.request({
    url: "/getSms/",
    method: "post",
    data,
  });
}

//注册
export function reqRegister(data) {
  return service.request({
    url: "/register/",
    method: "post",
    data,
  });
}