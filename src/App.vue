<template>
  <RouterView></RouterView>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus'

  window.$message = ElMessage
</script>
