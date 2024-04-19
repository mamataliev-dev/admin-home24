<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Атрибуты</h1>

        <div class="flex space-x-[30px]">
          <form
            class="relative flex justify-end space-x-[20px]"
            @submit.prevent="searchAttribute"
          >
            <div>
              <input
                v-model="query"
                type="text"
                placeholder="Атрибуты посика"
                class="w-[290px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] pl-[50px] pr-[16px] focus:outline-none"
              />

              <img
                class="absolute top-[14px] left-[16px] z-10"
                src="@/assets/img/icons/search.svg"
                alt=""
              />
            </div>
          </form>

          <button class="header__btn" @click="$router.push('/add-attribute')">
            <img src="@/assets/img/icons/add.svg" alt="" />
            <span>Добавить атрибут</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start">АТРИБУТЫ</th>
            <th class="table__tr text-center">ПАРАМЕТРЫ</th>
            <th class="table__tr text-center">КАТЕГОРИИ</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr class="tbody_tr">
            <!-- Attribute -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              <div class="flex flex-col space-y-[10px]">
                <span class="text-white text-[15px] font-semibold">Цвет</span>
                <span class="font-medium text-textGray">Цвет</span>
              </div>
            </td>

            <!-- Settings -->
            <td class="tbody__td tbody__td_center">
              <div class="flex justify-center space-x-[5px]">
                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Apple
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Samsung
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Artel
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Apple
                </div>
              </div>
            </td>

            <!-- Categories -->
            <td class="tbody__td tbody__td_center">
              <div class="flex justify-center space-x-[5px]">
                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Apple
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Samsung
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Artel
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Apple
                </div>
              </div>
            </td>

            <!-- Actions -->
            <td class="tbody__td">
              <div class="flex justify-end pr-[30px]">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg"
                >
                  <button @click="$router.push(`/edit-product/${index}`)">
                    <img src="@/assets/img/icons/edit.svg" alt="" />
                  </button>
                </div>
              </div>
            </td>
          </tr>

          <tr v-for="(item, index) in attributes" :key="index" class="tbody_tr">
            <!-- Attribute -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              <div class="flex flex-col space-y-[10px]">
                <span class="text-white text-[15px] font-semibold">{{
                  item.name.ru
                }}</span>
                <span class="font-medium text-textGray">{{
                  item.name.ru
                }}</span>
              </div>
            </td>

            <!-- Options -->
            <td class="tbody__td tbody__td_center">
              <div class="flex justify-center space-x-[5px]">
                <div
                  v-for="elem in item.options.slice(1, 4)"
                  :key="elem.id"
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  {{ elem.name.ru }}
                </div>
              </div>
            </td>

            <!-- Categories -->
            <td class="tbody__td tbody__td_center">
              <div class="flex justify-center space-x-[5px]">
                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Apple
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Samsung
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Artel
                </div>

                <div
                  class="bg-[#eff2f5] text-[#6c7b9a] rounded-lg py-[4px] px-[10px]"
                >
                  Apple
                </div>
              </div>
            </td>

            <!-- Actions -->
            <td class="tbody__td">
              <div class="flex justify-end pr-[30px]">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg w-[100px]"
                >
                  <button
                    class="border-r border-[#979797] pr-[16px]"
                    @click="$router.push(`/edit-product/${index}`)"
                  >
                    <img src="@/assets/img/icons/edit.svg" alt="" />
                  </button>

                  <button @click="removeAttribute(item.id)">
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
      attributes: null,
      query: '',
    }
  },
  head() {
    return {
      title: 'Атрибуты',
    }
  },
  mounted() {
    this.fetchAttributes()
  },
  methods: {
    async fetchAttributes() {
      this.loading = true
      try {
        const response = await this.$axiosURL.get('/attributes/all')
        this.attributes = response.data.attributes
        console.log(response.data.attributes)
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    editProduct() {},

    async removeAttribute(id) {
      try {
        const response = await this.$axiosURL.delete(`/attributes/${id}`)

        if (response) {
          this.$notify({
            title: 'Success',
            message: 'Атрибут успешно удален',
            type: 'success',
          })

          this.fetchAttributes()
        }
      } catch (error) {
        throw Error
      }
    },

    searchAttribute() {},
  },
}
</script>

<style></style>
