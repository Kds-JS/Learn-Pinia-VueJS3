<script setup>
    import {ref} from 'vue';
    import { useTasksStore } from '../stores/tasks';
    import {v4 as uuid} from 'uuid';

    const name = ref('');
    const description = ref('');

    const tasksStore = useTasksStore();

    function handleSubmit () {
        const task = {
            id: tasksStore.selectedTask ? tasksStore.selectedTask.id : uuid(),
            completed: false,
            name : name.value, 
            description: description.value
        };
        tasksStore.tasks.push(task); 
        
        if(tasksStore.selectedTask) {
            tasksStore.selectedTask = null;
        }

        name.value = "";
        description.value = "";
        
    }
    
    tasksStore.$subscribe((mutation) => {
        const selectedTask = mutation.events.target.selectedTask;
        if(selectedTask) {
            name.value = selectedTask.name;
            description.value = selectedTask.description;
        }
    })
</script>

<template>
  <form
    class="px-16 flex flex-col justify-center h-full"
    @submit.prevent="handleSubmit"
  >
    <h1 class="text-3xl font-semibold mb-10">
        {{ tasksStore.selectedTask ? 'Modifier une Tâche' : 'Nouvelle Tâche' }}
    </h1>
    <div class="mb-6">
      <input
        v-model="name"
        placeholder="Name"
        class="inline-flex w-full px-2 py-3 rounded-lg border-2 border-gray-300 focus:outline-none"
      />
    </div>
    <div class="mb-6">
      <textarea
        v-model="description"
        placeholder="Description of the task"
        class="inline-flex w-full px-3 py-4 rounded-lg border-2 border-gray-300 focus:outline-none"
        rows="6"
      ></textarea>
    </div>
    <div class="mb-6">
      <button
        class="bg-blue-100 text-blue-600 font-semibold px-6 py-3 rounded mr-2"
        type="submit"
      >
      {{ tasksStore.selectedTask ? 'Enregister' : 'Créer' }}
        
      </button>
      
    </div>
  </form>
</template>

<style scoped></style>
