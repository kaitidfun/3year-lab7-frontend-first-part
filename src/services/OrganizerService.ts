import axios from 'axios'
import type { Organizer } from '@/types'
import type { AxiosResponse } from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizers(): Promise<AxiosResponse<Organizer[]>> {
    return apiClient.get('/organizers')
  },

  getOrganizer(id: number): Promise<AxiosResponse<Organizer>> {
    return apiClient.get(`/organizers/${id}`)
  },

  createOrganizer(data: { name: string }): Promise<AxiosResponse<Organizer>> {
    return apiClient.post('/organizers', data)
  },

  updateOrganizer(id: number, data: { name: string }): Promise<AxiosResponse<Organizer>> {
    return apiClient.put(`/organizers/${id}`, data)
  }
}