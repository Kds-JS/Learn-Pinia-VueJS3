<script setup>
import { watchEffect } from 'vue';

import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';
import TaskStats from './components/TaskStats.vue';
import { useTasksStore } from './stores/tasks';
import Storage from '../utils/Storage';

const tasksStore = useTasksStore();

watchEffect(() => {
  Storage.performUpdate(tasksStore.tasks);
}
)
</script>

<template>
  <div class="min-h-screen flex ">
    <div class="w-3/5 bg-slate-200 py-20">
      <div class="w-4/5 mx-auto">
        <task-stats />
        <task-list/>
      </div>
    </div>
    <div class="w-2/5 bg-white py-10">
      <task-form />
    </div>
  </div>
</template>

<style>

</style>