import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
    state() {
      return {
        tasks: [],
        selectedTask: null,
      }
    },
    actions: {
      removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
      },
    },
    getters: {
      compledTasks(state) {
          return state.tasks.filter(t => t.completed).length;
      },
      pendingTasks() {
        return this.tasks.length - this.compledTasks;
      }
    }
});
