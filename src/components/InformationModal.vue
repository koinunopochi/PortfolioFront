<!-- InformationModal.vue -->
<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop :class="[typeClass]">
      <div class="modal-header">
        <h5>{{ title }}</h5>
      </div>
      <div class="modal-body">
        <p>{{ content }}</p>
      </div>
      <div class="modal-footer">
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  type: String,
  isOpen: Boolean,
  content: String,
});

const title = computed(() => {
  switch(props.type) {
    case 'success': return 'Success';
    case 'error': return 'Error';
    default: return 'Information';
  }
});

const typeClass = computed(() => {
  switch(props.type) {
    case 'success': return 'success-modal';
    case 'error': return 'error-modal';
    default: return 'info-modal';
  }
});

const emit = defineEmits();

const closeModal = () => {
  emit('update:isOpen', false);
};
</script>




<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 80%;
  max-width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.modal-header{
  /* padding: 10px 0; */
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  /* text-align: center; */
}
.modal-body {
  padding: 20px 0;
}
.modal-footer {
  text-align: right;
}

button {
  padding: 5px 15px;
  background-color: gray;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
}
</style>

<style scoped>
/* ... other styles ... */

/* エラーモーダルのスタイル */
.error-modal .modal-header {
  /* background-color: #f44336; 赤色 */
  color: red;
}
.error-modal .modal-body {
  color: red;
  /* 文字を太くする */
  font-weight: bold;
}

/* 情報モーダルのスタイル */
.info-modal .modal-header {
  /* background-color: #2196F3; 青色 */
  color: blue;
}

/* 成功モーダルのスタイル */
.success-modal .modal-header {
  /* background-color: #4CAF50; 緑色 */
  color: green;
}
</style>
