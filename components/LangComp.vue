<template>
  <div class="header__lang shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
    <button
      :class="isRussian ? 'text-[#bdc0d2]' : 'text-[#3699FF]'"
      class="header__lang-title"
      @click="setLang(false)"
    >
      Uzbek
    </button>

    <button
      :class="isRussian ? 'text-[#3699FF]' : 'text-[#bdc0d2]'"
      class="header__lang-title"
      @click="setLang(true)"
    >
      Русский
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRussian: true,
    }
  },
  methods: {
    setLang(val) {
      this.isRussian = val
      this.$emit('updateLang', val)
    },
  },
}
</script>

<style>
.header__lang-title {
  @apply text-[16px];
}

.header__lang-title:not(:last-child) {
  border-right: 1px solid #a1a5bf;
  padding-right: 20px;
}

.header__lang {
  @apply w-[184px] py-[10px] px-[18px] rounded-t-lg flex justify-between bg-[#323d4e];
}
</style>
