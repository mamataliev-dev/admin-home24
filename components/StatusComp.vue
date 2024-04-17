<template>
  <div
    class="flex flex-col space-y-[25px] py-[25px] 2xl:py-[30px] px-[20px] 2xl:px-[30px] rounded-lg bg-[#323d4e] mt-[45px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
  >
    <div class="flex flex-col space-y-[10px]">
      <div class="flex items-center space-x-[10px]">
        <span>Статус</span>
        <div
          :class="isGoodStatus ? 'bg-[#50cd89] ' : 'bg-[#f1416c]'"
          class="w-[10px] h-[10px] rounded-full"
        ></div>
      </div>

      <el-select
        v-model="status"
        placeholder="Активный"
        @change="$emit('chosenStatus', status)"
      >
        <el-option
          v-for="item in statuses"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span class="text-[#a1a5bf]">Установить статус продукта</span>
    </div>

    <div class="flex flex-col space-y-[13px]">
      <span>Бренд</span>

      <div id="card" class="flex items-center justify-between">
        <el-select
          v-model="brand"
          placeholder="----"
          @change="$emit('chosenBrand', brand)"
        >
          <el-option
            v-for="item in brands"
            :key="item.id"
            :label="item.name"
            :value="item.slug"
          >
          </el-option>
        </el-select>

        <button
          class="w-[35px] h-[35px] flex justify-center items-center rounded-lg bg-[#D4E9FF] hover:bg-blue transition-all duration-150"
          @click="$emit('openBrandModal', true)"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="icon-plus"
          >
            <path
              d="M12 6V18M18 12L6 12"
              stroke="#5899FF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGoodStatus: true,
      status: '',
      brand: '',
      statuses: [
        {
          label: 'Активный',
          value: 'active',
        },
        {
          label: 'Неактивный',
          value: 'inactive',
        },
      ],
    }
  },
  computed: {
    brands() {
      return this.$store.state.brands?.brands
    },
  },
  mounted() {
    this.$store.dispatch('fetchBrands')
  },
  methods: {
    setLang(val) {
      this.isGoodStatus = val
      this.$emit('isGoodStatus', val)
    },
  },
}
</script>

<style></style>
