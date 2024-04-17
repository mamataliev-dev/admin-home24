<template>
  <div
    v-if="isLoading"
    class="blackout fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
  >
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.blackout {
  z-index: 999999999;
}
</style>
