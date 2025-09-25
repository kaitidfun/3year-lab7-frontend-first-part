import axios from 'axios'
import type { Organization } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizations(perPage: Number, page: Number) {
    return apiClient.get('/organizers?_limit=' + perPage + '&_page=' + page)
  },
  getOrganization(id: number) {
    return apiClient.get('/organizers/' + id)
  },
  saveOrganization(org: Organization) {
    return apiClient.post('/organizers', org)
  }
}
