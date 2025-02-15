<template>
  <span>
    <a-button
      type="text"
      :style="{
        color: 'blue',
        marginLeft: '20px',
        marginBottom: '5px',
      }"

      @click="showModal()"
    >Sing up</a-button>

    <a-modal
      title="Реєстрація аспіранта"
      :open="isOpen"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="onCancel"
    >
      <registration-form
        :submit="isSubmit"
        @onClose="onClose"
      />
    </a-modal>
  </span>
</template>

<script setup>
import { ref } from 'vue';
import RegistrationForm from '../RegistrationForm.vue';

const isOpen = ref(false);
const isSubmit = ref(false);
const confirmLoading = ref(false);

function showModal() {
  isOpen.value = true;
}
function handleOk() {
  isSubmit.value = true;
}
function onClose() {
  isOpen.value = false;
  isSubmit.value = false;
}
function onCancel() {
  isOpen.value = false;
  confirmLoading.value = false;
}
</script>

<style lang="scss">
.ant-modal-footer {
  margin-top: 0px !important;
}
</style>

<style lang="scss" scoped>
</style>