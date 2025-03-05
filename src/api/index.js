import request from "@/config/request";

// 封装 GET 请求
export function get(url, params) {
  return request({
    url,
    method: "get",
    params,
  });
}

// 封装 POST 请求
export function post(url, data) {
  return request({
    url,
    method: "post",
    data,
  });
}

// 封装 PUT 请求
export function put(url, data) {
  return request({
    url,
    method: "put",
    data,
  });
}

// 封装 DELETE 请求
export function del(url, params) {
  return request({
    url,
    method: "delete",
    params,
  });
}

// 封装上传文件请求
export function upload(url, file) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
