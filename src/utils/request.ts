import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const BASE_URL = '/api'

const deafaultConfig: AxiosRequestConfig = {
  needToken: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  ...deafaultConfig
})

axiosInstance.interceptors.request.use(
  config => {
    if (config.headers) {
      if (config.needToken) {
        config.headers.token = 'cccc'
      }
    }
    return config
  },
  error => {
    window.$message?.error('请求出错')
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    const { status } = response
    if (status === 200 || status < 300 || status === 304) {
      return response.data
    } else {
      window.$message?.error(`响应状态码为${status}`)
      return Promise.reject({
        message: `响应状态码为${status}`
      })
    }
  },
  error => {
    window.$message?.error(error.message)
    return Promise.reject(error)
  }
)

export default axiosInstance
