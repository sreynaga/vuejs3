<script setup lang="ts">
  import axios from 'axios'
  import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
  import { queryKeys } from '@/helpers/todos'
  import { requestKeys } from '@/helpers/Task'

  interface Task {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  // Access QueryClient instance
  const queryClient = useQueryClient()

  // GET ALL
  const { isPending, isFetching, refetch,  isError, data, error } = useQuery(requestKeys.tasks.list({}))

  // POST
  const { isPending:isPendingMutation, isError:isErrorMutation, data:dataMutation, error:errorMutation, isSuccess, mutate } = useMutation({
    mutationFn: (newTask:Task) => axios.post('https://649475d40da866a95367cdf6.mockapi.io/api/v1/tasks', newTask),
  })

  // PUT
  const { isPending:isPendingMutationPUT, isError:isErrorMutationPUT, data:dataMutationPUT, error:errorMutationPUT, isSuccess:IsSuccessMutationPUT, mutate:mutatePUT } = useMutation({
    mutationFn: (newTask:Task) => axios.put('https://649475d40da866a95367cdf6.mockapi.io/api/v1/tasks/1'),
  })

  // DELETE
  const { isPending:isPendingMutationDELETE, isError:isErrorMutationDELETE, data:dataMutationDELETE, error:errorMutationDELETE, isSuccess:IsSuccessMutationDELETE, mutate:mutateDELETE } = useMutation({
    mutationFn: (newTask:Task) => axios.delete('https://649475d40da866a95367cdf6.mockapi.io/api/v1/tasks/3'),
  })

  async function refetchQueries() {
    // Refetch all active queries
    await queryClient.refetchQueries({ type: 'active' })
  }
  
  function createAction() {
    mutate({
      name: 'name new',
      description: 'description new',
      createdAt: 'createdAt new',
      updatedAt: 'updatedAt new'
    })
  }

  function updateAction() {
    mutatePUT({
      name: 'name updated',
      description: 'description updated',
      createdAt: 'createdAdd updated',
      updatedAt: 'updatedAt updated'
    })
  }

  function deleteAction() {
    mutateDELETE({
      name: 'name updated',
      description: 'description updated',
      createdAt: 'createdAdd updated',
      updatedAt: 'updatedAt updated'
    })
  }
  
</script>

<template>
  <main>
    <h1>Homepage</h1>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <div>
      <button @click="refetchQueries">refetchQueries</button>
      <button @click="createAction">Create</button>
      <button @click="updateAction">Update</button>
      <button @click="deleteAction">Delete</button>

      <table border="1">
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>DESCRIPTION</th>
          <th>CREATED AT</th>
          <th>UPDATED AT</th>
        </tr>
        <tr v-for="task in data">
          <td>{{ task.id }}</td>
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.createdAt }}</td>
          <td>{{ task.updatedAt }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<style>
  button {
    margin-right: 10px;
  }
  table {
    margin-top: 20px;
  }
  table td {
    padding: 8px;
  }
  th {
    font-weight: bold;
    background-color: #e1e1e1;
  }  
</style>