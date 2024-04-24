<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Вопросы и ответы</h1>

        <div class="flex space-x-[30px]">
          <button class="header__btn" @click="isModalOpen = true">
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

                  <button @click="removeFaq(item.id)">
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

    <!-- Add Brand Modal -->
    <el-dialog title="Добавить брэнд" :visible.sync="isModalOpen" width="520px">
      <el-form
        ref="brandForm"
        :model="form"
        status-icon
        class="demo-ruleForm"
        action="#"
      >
        <el-form-item
          label="Название *"
          prop="title"
          :rules="[
            {
              required: true,
              message: 'Пожалуйста заполните это поле',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="form.question"
            type="textarea"
            :rows="5"
            autocomplete="off"
            placeholder="Вопрос"
          ></el-input>

          <el-input
            v-model="form.answer"
            type="textarea"
            :rows="5"
            autocomplete="off"
            placeholder="Ответ"
          ></el-input>
        </el-form-item>

        <!-- Cancel / Add -->
        <div
          class="flex justify-end space-x-[15px] mt-[30px] pt-[15px] border-t border-[#e8e8e8]"
        >
          <el-button type="danger" plain @click="isModalOpen = false"
            >Отмена</el-button
          >

          <el-button
            id="brand-btn"
            class="!flex !items-center !space-x-[7px] !py-[6px] !px-[18px] !rounded-lg !bg-blue"
            @click="add()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                <path
                  d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                  opacity="0.3"
                ></path>
                <path
                  d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </svg>

            <span class="font-semibold text-white">Добавить</span>
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isModalOpen: false,
      faqs: null,
      form: {
        question: '',
        answer: '',
      },
    }
  },
  head() {
    return {
      title: 'FAQ',
    }
  },
  mounted() {
    this.fetchFaqs()
  },
  methods: {
    async fetchFaqs() {
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

    async removeFaq(id) {
      try {
        const response = await this.$axiosURL.delete(`/faqs/${id}`)

        if (response) {
          this.$notify({
            title: 'Success',
            message: 'Вопрос успешно удален',
            type: 'success',
          })

          this.fetchFaqs()
        }
      } catch (error) {
        throw Error
      }
    },

    add() {},
  },
}
</script>

<style></style>
