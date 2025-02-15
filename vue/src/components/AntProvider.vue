<template>
<a-config-provider
  :theme="theme"
>
  <slot />
</a-config-provider>
</template>

<script>
  import { theme as aTheme } from 'ant-design-vue';
  export default {
    data() {
      return {
        theme: {
          algorithm: aTheme.compactAlgorithm
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>