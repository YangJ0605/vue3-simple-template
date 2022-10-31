<template>
  <div id="login" class="login" :style="{ background: `url(${loginBody})` }">
    <div class="login-container">
      <div class="login-asset">
        <img :src="loginBgNormal" width="500" />
      </div>
      <div class="login-form">
        <h1 class="form-title">后台管理模板</h1>
        <div class="form-item">
          <el-input
            v-model="data.info.username"
            size="large"
            type="text"
            placeholder="username: 1"
            clearable
          >
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="form-item">
          <el-input
            v-model="data.info.password"
            size="large"
            type="password"
            show-password
            placeholder="password: 1"
            clearable
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="form-item" style="margin-bottom: 14px">
          <el-checkbox v-model="data.remembered"> 记住我 </el-checkbox>
          <el-popconfirm
            title="自行实现！"
            confirm-button-text="好的"
            cancel-button-text="被迫好的"
          >
            <template #reference>
              <span class="forget-p-help cper">忘记密码？</span>
            </template>
          </el-popconfirm>
        </div>
        <div class="form-item">
          <el-button
            type="primary"
            style="width: 100%"
            :loading="data.spinning"
            @click="login"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default { name: 'Login' }
</script>

<script setup lang="ts">
  import { reactive, onMounted, computed } from 'vue'

  import { User, Lock } from '@element-plus/icons-vue'

  import './style.scss'

  const loginBgNormal = new URL(
    '../../assets/images/login-bg.svg',
    import.meta.url
  ).href

  const loginBody = new URL(
    '../../assets/images/login-body.svg',
    import.meta.url
  ).href
  const data = reactive({
    info: {
      username: 'admin',
      password: 'admin'
    },
    remembered: true,
    // 请求中状态
    spinning: false
  })

  const login = () => {
    console.log('login')
    window.$message?.success('成功')
  }
</script>
