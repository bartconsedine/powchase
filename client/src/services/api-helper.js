import axios from 'axios';


const api = axios.create({
  baseURL: ""
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/api/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}
export const updateUser = async (id, data) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  } 
  const resp = await api.put(`/api/users/${id}`, data)
  return resp.data
}

export const readUser = async (id) => {
  const resp = await api.get(`/api/users/${id}`)
  return resp.data
}

export const newExcerpt = async (data) => {
  const resp = await api.post(`/api/excerpts`, data)
  return resp.data
}




