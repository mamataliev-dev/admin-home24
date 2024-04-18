<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Категории</h1>

        <div class="flex space-x-[30px]">
          <form
            class="flex justify-end space-x-[20px]"
            @submit.prevent="searchCategory"
          >
            <div>
              <el-select v-model="value2" placeholder="Статус">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </form>

          <button class="header__btn" @click="$router.push('/add-category')">
            <img src="@/assets/img/icons/add.svg" alt="" />
            <span>Добавить категорию</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start">КАТЕГОРИИ</th>
            <th class="table__tr text-center">ИКОНКА</th>
            <th class="table__tr text-center">ПОПУЛЯРНЫЙ</th>
            <th class="table__tr text-center">СТАТУС</th>
            <th class="table__tr_border-r text-center">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in categories" :key="index" class="tbody_tr">
            <!-- Category -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              <div class="flex items-center space-x-[15px]">
                <img
                  class="img-box w-[50px] h-[50px] rounded-lg object-cover"
                  src="@/assets/img/png/test-product.png"
                  alt=""
                />

                <div class="flex space-x-[5px]">
                  <span class="text-white text-[15px] font-semibold">{{
                    item.name.ru
                  }}</span>
                  <span class="font-semibold text-[#4880FF]"
                    >({{ item.children.length }})</span
                  >
                </div>
              </div>
            </td>

            <!-- Icon -->
            <td class="tbody__td">
              <img
                class="m-auto rounded-full w-[40px] h-[40px]"
                src="@/assets/img/png/empty-category-status.png"
                alt=""
              />
            </td>

            <!-- Popular -->
            <td
              class="tbody__td tbody__td_center flex justify-center items-center max-auto mt-[15px]"
            >
              <div
                :class="item.is_popular === 1 ? 'bg-blue' : 'bg-gray'"
                class="w-[20px] h-[20px] rounded-lg"
              ></div>
            </td>

            <!-- Status -->
            <td class="tbody__td tbody__td_center">
              <span
                :class="item.is_active === 1 ? 'bg-[#00B69B]' : 'bg-[#EF3826]'"
                class="rounded-lg px-[16px] py-[8px]"
              >
                {{ item.is_active === 1 ? 'Активный' : 'Неактивный' }}
              </span>
            </td>

            <!-- Actions -->
            <td class="tbody__td">
              <div class="flex justify-center">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg w-[100px]"
                >
                  <button
                    class="border-r border-[#979797] pr-[16px]"
                    @click="$router.push(`/edit-product/${index}`)"
                  >
                    <img src="@/assets/img/icons/edit.svg" alt="" />
                  </button>

                  <button @click="removeProduct">
                    <img src="@/assets/img/icons/trash.svg" alt="" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mt-[30px]">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      query: '',
      stocks: [
        {
          value: 'in stock',
          label: 'В наличии',
        },
        {
          value: 'out of stock',
          label: 'Нет в наличии',
        },
      ],
      value1: '',
      status: [
        {
          value: 'all',
          label: 'Все',
        },
        {
          value: 'active',
          label: 'Активные',
        },
        {
          value: 'not active',
          label: 'Неактивные',
        },
      ],
      value2: '',
    }
  },
  head() {
    return {
      title: 'Категории',
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories?.categories.data
    },
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      this.loading = true
      try {
        await this.$store.dispatch('fetchCategories')
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    editProduct() {},

    removeProduct() {},

    searchCategory() {},
  },
}
</script>

<style></style>
