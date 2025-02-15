<template>
  <div class="form_wrapper">
    <a-form
      name='auth form'
      autoComplete='off'
      :model="formState"
      :style="{
        width: '500px',
        padding: '40px',
        border: '1px solid lightgrey',
        borderRadius: '10px',
      }"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item name="username"
        label="Username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item name="password"
        label="Password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item>
        <a-button block type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>

        <p>
          Not a member?
          <registration-modal />
        </p>
    </a-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import RegistrationModal from '@/components/modal/RegistrationModal.vue';
import { Auth } from '@/api/auth';
import { useNavigation } from '@/utils/navigation';

const { replaceTo } = useNavigation();
    
    const formState = reactive({
      username: '',
      password: '',
    });

    async function onFinish(value) {
      try {
        console.log(value);
        const { data } = await Auth.login(value)
        console.log(data);
        replaceTo(`/cabinet/${data.role}`)
      } catch (error) {
        console.log(error);
      }
    }
</script>

<style lang="scss" scoped>
.form_wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>