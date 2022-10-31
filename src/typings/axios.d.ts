import 'axios'

declare module 'axios' {
  interface AxiosRequestConfig<T = any> {
    data?: T
    needToken?: boolean
  }
}
