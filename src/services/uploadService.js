import config from "../config.json";
import axios from "axios";
const apiEndpoint = config.itemUrl;

export function uploadFile(formData) {
  return axios({
    method: "post",
    url: apiEndpoint + "upload",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
