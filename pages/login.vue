<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[420px] p-[48px] flex flex-col justify-center items-center space-y-[30px] bg-white rounded-xl shadow-[0_3px_10px_rgba(255,255,255,0.2)]"
  >
    <h1 class="font-bold text-[23px] login-title">Admin Panel</h1>

    <form class="flex flex-col space-y-[30px]" @submit.prevent="logIn">
      <div class="flex flex-col space-y-[10px]">
        <label class="text-black font-bold text-[16px]">Log In</label>
        <input
          v-model="login"
          :class="isLogin ? 'border-[2px] border-red-300' : ''"
          class="w-[400px] bg-[#e8f0fe] text-black text-[17px] rounded-lg py-[12px] px-[16px] outline-[#dae7fc] placeholder:text-[#BFBFBF]"
          type="text"
          placeholder="Log in"
        />

        <transition name="slide-fade">
          <label v-if="isLogin" class="text-red-500"
            >Пожуйста введите пользователя</label
          >
        </transition>
      </div>

      <div class="flex flex-col space-y-[10px]">
        <label class="text-black font-bold text-[16px]">Password</label>
        <input
          v-model="password"
          :class="isPassword ? 'border-[2px] border-red-300' : ''"
          class="w-[400px] bg-[#e8f0fe] text-black text-[17px] rounded-lg py-[12px] px-[16px] outline-[#dae7fc] placeholder:text-[#BFBFBF]"
          type="password"
          placeholder="Password"
        />

        <transition name="slide-fade">
          <label v-if="isPassword" class="text-red-500"
            >Пожуйста введите пароль</label
          >
        </transition>
      </div>

      <div class="flex flex-col space-y-[15px]">
        <transition name="slide-fade">
          <el-tag v-if="isError" closable type="danger"
            >Неверный логин или пароль</el-tag
          >
        </transition>

        <button
          class="w-full py-[10px] rounded-lg bg-[#009EF7] text-[17px] font-medium"
          @submit="logIn"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'login-layout',
  data() {
    return {
      login: '',
      password: '',
      isLogin: false,
      isPassword: false,
      isError: false,
    }
  },
  head() {
    return {
      title: 'Log In',
    }
  },
  methods: {
    async logIn() {
      this.isLogin = false
      this.isPassword = false

      if (this.login === '') {
        this.isLogin = true
      } else if (this.password === '') {
        this.isPassword = true
      } else {
        try {
          const respone = await this.$axiosURL.post('/auth/login', {
            username: this.login,
            password: this.password,
          })

          localStorage.setItem('admin-token', respone.data.token)
          this.$router.push('/dashboard')
        } catch (error) {
          this.isError = true
        }
      }
    },
  },
}
</script>

<style>
body {
  background-color: #1b2431;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.el-tag {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  font-size: 13px !important;
}

.login-title {
  color: #1b2431 !important;
}
</style>
