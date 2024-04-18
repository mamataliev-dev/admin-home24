<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Вопросы и ответы</h1>

        <div class="flex space-x-[30px]">
          <button class="header__btn" @click="dialogVisible = true">
            <img src="@/assets/img/icons/add.svg" alt="" />
            <span>Добавить</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[100px]">ID</th>
            <th class="table__tr text-start">ВОПРОС</th>
            <th class="table__tr text-center">ОТВЕТ</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in faqs" :key="index" class="tbody_tr">
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ ++index }}
            </td>

            <!-- Question -->
            <td class="tbody__td">
              <span class="text-[17px] font-bold">{{ item.question.ru }}</span>
            </td>

            <!-- Asnwer -->
            <td class="tbody__td text-center">
              <span class="font-bold">{{ item.answer.ru }}</span>
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
      faqs: null,
    }
  },
  head() {
    return {
      title: 'FAQ',
    }
  },
  mounted() {
    this.fetchBanners()
  },
  methods: {
    async fetchBanners() {
      this.loading = true
      try {
        const response = await this.$axiosURL.get('/faqs')
        this.faqs = response.data.faqs.data
        console.log(response.data.faqs.data)
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    editProduct() {},

    removeProduct() {},
  },
}
</script>

<style></style>
