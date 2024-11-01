import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080", // 后端请求端口设置，根据自己的端口进行设置
  timeout: 4000, // 超时时间
});

// request 请求拦截
// 可以在请求发送前对请求做一些处理
// eg.统一加上token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    // config.headers['token'] = user.token;  // 设置请求头
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 响应拦截
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === "blob") {
      return res;
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === "string") {
      // 如果是json字符串，将json字符串转换为json对象
      res = res ? JSON.parse(res) : res;
    }
    return res;
  },
  (error) => {
    console.log("err" + error); // 控制台打印错误信息，用于调试
    return Promise.reject(error);
  }
);

export default request;
