<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[550px] p-[60px] flex flex-col justify-center items-center space-y-[40px] bg-white rounded-xl shadow-[0_3px_10px_rgba(255,255,255,0.2)]"
  >
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-[32px] !text-black !mb-[10px]">Oops!</h1>
      <span class="text-[#a1a5b7]">We can't find that page.</span>
    </div>

    <div class="flex flex-col items-center space-y-[10px]">
      <img
        class="w-[300px] h-[300px]"
        src="@/assets/img/icons/404.svg"
        alt=""
      />

      <nuxt-link
        class="w-[110px] bg-blue py-[10px] px-[20px] rounded-lg text-center text-white"
        to="/dashboard"
        >Go home</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login-layout',
}
</script>
