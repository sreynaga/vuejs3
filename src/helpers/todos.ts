import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import axios from 'axios'

// my-api/todos.ts
export const queryKeys = createQueryKeys('todos', {
    detail: (taskId: string) => [taskId],
    list: (filters: any) => ({
        queryKey: [{ filters }, 'taskKey'],
        queryFn: () => axios.get('https://649475d40da866a95367cdf6.mockapi.io/api/v1/tasks').then((response) => { return response.data }),
    }),
})