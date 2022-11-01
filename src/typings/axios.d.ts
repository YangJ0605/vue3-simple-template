import 'axios'

declare module 'axios' {
  interface AxiosRequestConfig<T = any> {
    data?: T
    needToken?: boolean
  }

  interface AxiosResponse<T = any, D = any> {
    [key: string]: any
  }
}
