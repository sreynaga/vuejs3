import axios from 'axios'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export const requestKeys = createQueryKeyStore({
  tasks: {
    list: (filters: any) => ({
      queryKey: [{ filters }],
      queryFn: () => axios.get('https://649475d40da866a95367cdf6.mockapi.io/api/v1/tasks').then((response) => { return response.data }),
    }),
  },
  getOne: {
    list: (filters: any) => ({
      queryKey: [{ filters }],
      queryFn: () => axios.get('https://649475d40da866a95367cdf6.mockapi.io/api/v1/tasks/1').then((response) => { return response.data }),
    }),
  },
})