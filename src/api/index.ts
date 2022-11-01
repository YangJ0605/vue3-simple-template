import request from '../utils/request'

export const apiLogin = async (username: string, password: string) => {
  return request.post('/auth/login', {
    username,
    password
  })
}

export const apiGetClusterroleList = async () => {
  return request.get('/rbac/clusterroles')
}
