<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Группа Характеристики</h1>

        <div class="flex space-x-[30px]">
          <form
            class="relative flex justify-end space-x-[20px]"
            @submit.prevent="searchAttribute"
          >
            <div>
              <input
                v-model="query"
                type="text"
                placeholder="Группа Характеристики"
                class="w-[290px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] pl-[50px] pr-[16px] focus:outline-none"
              />

              <img
                class="absolute top-[14px] left-[16px] z-10"
                src="@/assets/img/icons/search.svg"
                alt=""
              />
            </div>
          </form>

          <button
            class="header__btn"
            @click="$router.push('/add-characteristic')"
          >
            <img src="@/assets/img/icons/add.svg" alt="" />
            <span>Добавить характеристику</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[80px]">№</th>
            <th class="table__tr text-start">НАЗВАНИЕ</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in characteristics"
            :key="index"
            class="tbody_tr"
          >
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ index }}
            </td>

            <!-- Name -->
            <td class="tbody__td">
              <span class="font-semibold text-[18px]">{{
                item.group.name.ru
              }}</span>
            </td>

            <!-- Actions -->
            <td class="tbody__td pr-[30px]">
              <div class="flex justify-end">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg w-[100px]"
                >
                  <button
                    class="border-r border-[#979797] pr-[16px]"
                    @click="dialogVisible = true"
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
      characteristics: null,
    }
  },
  head() {
    return {
      title: 'Группа Характеристики',
    }
  },
  mounted() {
    this.fetchCharacteristics()
  },
  methods: {
    async fetchCharacteristics() {
      this.loading = true
      try {
        const response = await this.$axiosURL.get('/characteristics/all')
        this.characteristics = response.data.characteristics
        console.log(response.data.characteristics)
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },
    editProduct() {},

    removeProduct() {},

    searchAttribute() {},
  },
}
</script>

<style></style>
