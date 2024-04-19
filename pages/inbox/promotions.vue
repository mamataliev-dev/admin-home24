<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Aкции</h1>

        <button class="header__btn" @click="$router.push('/add-product')">
          <img src="@/assets/img/icons/add.svg" alt="" />
          <span>Добавить</span>
        </button>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[100px]">№</th>
            <th class="table__tr text-start">НАЗВАНИЕ</th>
            <th class="table__tr text-center">ДАТА НАЧАЛА</th>
            <th class="table__tr text-center">ДАТА ОКОНЧАНИЯ</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in promotions" :key="index" class="tbody_tr">
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ ++index }}
            </td>

            <!-- Image -->
            <td class="tbody__td">
              <div class="flex items-center space-x-[15px]">
                <img
                  class="img-box w-[40px] h-[40px] rounded-lg"
                  :src="item.sm_banner || require('@/assets/img/png/empty.png')"
                  alt=""
                />
                <span class="font-semibold">{{ item.name.ru }}</span>
              </div>
            </td>

            <td class="tbody__td text-center">
              <span class="font-semibold text-blue">{{ item.start_date }}</span>
            </td>

            <td class="tbody__td text-center">
              <span class="font-semibold text-blue">{{ item.end_date }}</span>
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

                  <button @click="removePromotions(item.id)">
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
      promotions: null,
    }
  },
  head() {
    return {
      title: 'Акции',
    }
  },
  mounted() {
    this.fetchPromotions()
  },
  methods: {
    async fetchPromotions() {
      this.loading = true
      try {
        const response = await this.$axiosURL.get('/promotions')
        this.promotions = response.data.promotions.data
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    editProduct() {},

    async removePromotions(id) {
      try {
        const response = await this.$axiosURL.delete(`/promotions/${id}`)

        if (response) {
          this.$notify({
            title: 'Success',
            message: 'Акция успешно удалена',
            type: 'success',
          })

          this.fetchPromotions()
        }
      } catch (error) {
        throw Error
      }
    },
  },
}
</script>

<style></style>
