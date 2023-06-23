<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query'
  import { requestKeys } from '@/helpers/todos'
  import axios from 'axios'

  console.log(requestKeys.getAll);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList
  })

  function fetchTodoList() {
    return [
      {id: 1, name: 'List 1'},
      {id: 2, name: 'List 2'},
      {id: 3, name: 'List 3'}
    ]
  }
</script>

<template>
  <div class="about">
    <div style="padding: 20px; border: 1px #ccc solid; background-color: #e1e1e1; display: block;">
      <h1>Queries</h1>
      <br>
      <span v-if="isPending">Loading...</span>
      <span v-else-if="isError">Error: {{ error?.message }}</span>
      <!-- We can assume by this point that `isSuccess === true` -->
      <ul v-else-if="data">
        <li v-for="todo in data" :key="todo.id">{{ todo.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  span.error {
    color: red;
  }
}
</style>
