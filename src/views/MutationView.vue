<script setup lang="ts">
  import { useMutation } from '@tanstack/vue-query'
  import axios from 'axios'

  interface Todo {
    id: string;
    title: string;
  }

  const { isPending, isError, data, error, isSuccess, mutate } = useMutation({
    mutationFn: (newTodo:Todo) => axios.post('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10', newTodo),
  })

  function addTodo() {
    mutate({ id: new Date().toString(), title: 'Do Laundry' })
  }
</script>

<template>
  <div class="about">
    <div style="padding: 20px; border: 1px #ccc solid; background-color: #e1e1e1; display: block;">
      <h1>Mutation</h1>
      <br>
      <div style="padding: 20px; border: 1px #ccc solid; background-color: #e1e1e1; display: block; overflow: auto; height: 200px; width: 600px;">
        <pre>{{ data }}</pre>
      </div>
      <br>
      <span v-if="isPending">Adding todo...</span>
      <span v-else-if="isError">An error occurred: {{ error?.message }}</span>
      <span v-else-if="isSuccess">Todo added!</span>
      <button @click="addTodo">Create Todo</button>
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
