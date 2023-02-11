import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Storage from "../../utils/Storage";

const tasks = Storage.fetchAll();

export const useTasksStore = defineStore("tasks", {
    state() {
      return {
        tasks: tasks || [],
        selectedTask: null,
      }
    },
    actions: {
      createTask(data) {
        this.tasks.push(data);
        
      },
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
