<template>
  <a-form
    name="registration"
    :labelCol="{ span: '8px' }"
    :wrapperCol="{ span: '16px' }"
    :style="{ maxWidth: '600px'}"
    ref="formRef"
    :model="form"
    autoComplete="off"
  >
    <dir :style="{
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'end',
      margin: '0 auto'
    }">
      <a-form-item name="username"
        label="Логін"
        :rules="{ required: true, message: 'Please input your username!' }"
      >
        <a-input
          :style="formItemStyle"
          autoComplete="off"
          v-model:value="form.username"
        />
      </a-form-item>
  
      <a-form-item name="password"
        label="Пароль"
        :rules="{ required: true, message: 'Please input your password!' }"
      >
        <a-input-password
          :style="formItemStyle"
          v-model:value="form.password"
        />
      </a-form-item>
  
      <a-form-item name="name"
        label="Ім'я"
        :rules="{ required: true, message: 'Please input your name!' }"
      >
        <a-input
          :style="formItemStyle"
          autoComplete="off"
          v-model:value="form.name"
        />
      </a-form-item>
  
      <a-form-item name="surname"
        label="Прізвище"
        :rules="{ required: true, message: 'Please input your surname!' }"
      >
        <a-input
          :style="formItemStyle"
          autoComplete="off"
          v-model:value="form.surname"
        />
      </a-form-item>
  
      <a-form-item name="middle_name"
        label="Побатькові"
        :rules="{ required: true, message: 'Please input your middle name!' }"
      >
        <a-input
          :style="formItemStyle"
          autoComplete="off"
          v-model:value="form.middle_name"
        />
      </a-form-item>
  
      <a-form-item name="group"
        label="Група"
        :rules="{ required: true, message: 'Please input your username!' }"
      >
        <a-input
          :style="formItemStyle"
          autoComplete="off"
          v-model:value="form.group"
        />
      </a-form-item>
  
      <a-form-item name="year"
        label="Рік навчання"
        :rules="{ required: true, message: 'Please input your username!' }"
      >
        <a-input
          :style="formItemStyle"
          autoComplete="off"
          v-model:value="form.year"
        />
      </a-form-item>
    </dir>
  </a-form>
</template>

<script setup>
// import { Auth } from '@/api/auth';
import { onBeforeUnmount, reactive, ref, watch } from 'vue';
const {submit} = defineProps(['submit'])
const emit = defineEmits(['onClose'])
const formRef = ref();
const form = reactive({
  username: '',
  password: '',
  name: '',
  surname: '',
  middle_name: '',
  group: '',
  year: '',
});

const formItemStyle = {
  width: '315px',
}

watch(() => submit, async (newValue) => {
  console.log(newValue);
  if (newValue) {
    await handleSubmit();
    formRef.value.resetFields();
  }
})

const handleSubmit = async () => {
  try {
    const result = await formRef.value.validate();
  
    await sendData(result);
    console.log('values', result);
  } catch (error) {
    console.log('error', error);
  }
};

onBeforeUnmount(() => formRef.value.resetFields());

const sendData = async(values) => {
  try {
    // const result = await Auth.register(values);
  //TODO: add request for registration

    // console.log(result);
    emit('onClose')
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped>
</style>