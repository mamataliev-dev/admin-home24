<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Скидки</h1>

        <button class="header__btn" @click="$router.push('/add-product')">
          <img src="@/assets/img/icons/add.svg" alt="" />
          <span>Добавить</span>
        </button>
      </div>

      <form class="relative flex justify-between" @submit.prevent>
        <div>
          <input
            v-model="query"
            type="text"
            placeholder="Поиск"
            class="w-[400px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] pl-[50px] pr-[16px] focus:outline-none"
          />

          <img
            class="absolute top-[14px] left-[16px] z-10"
            src="@/assets/img/icons/search.svg"
            alt=""
          />
        </div>

        <div class="flex space-x-[15px]">
          <el-select v-model="status" placeholder="Активные">
            <el-option
              v-for="item in statuses"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-button type="primary" :disabled="!isFilter" @click="removeFilter">
            <i class="el-icon-refresh-right !text-[20px]"></i>
          </el-button>
        </div>
      </form>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[80px]">№</th>
            <th class="table__tr text-start">ЗАГАЛОВОК</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in discounts" :key="index" class="tbody_tr">
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ ++index }}
            </td>

            <!-- Name -->
            <td class="tbody__td">
              <span class="font-semibold text-[18px]">{{ item.title.ru }}</span>
            </td>

            <!-- Actions -->
            <td class="tbody__td pr-[30px]">
              <div class="flex justify-end">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg w-[100px]"
                >
                  <button
                    class="border-r border-[#979797] pr-[16px]"
                    @click="$router.push('/add-discount')"
                  >
                    <img src="@/assets/img/icons/edit.svg" alt="" />
                  </button>

                  <button @click="editDiscount(item.id)">
                    <img src="@/assets/img/icons/trash.svg" alt="" />
                  </button>
                </div>
              </div>
            </td>
          </tr>

          <tr v-if="discounts?.length === 0" class="relative h-[250px]">
            <EmptyData />
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
      discounts: null,
      isFilter: false,
      query: '',
      status: '',
      statuses: [
        {
          value: 1,
          label: 'Активные',
        },
        {
          value: 0,
          label: 'Архив',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Скидки',
    }
  },
  watch: {
    status(newVal) {
      this.isFilter = true
      this.fetchStatusDiscount(newVal)
    },
  },
  mounted() {
    this.fetchDiscounts()

    this.$router.push({
      query: {
        page: 1,
        per_page: 16,
      },
    })
  },
  methods: {
    async fetchDiscounts() {
      this.loading = true
      try {
        const response = await this.$axiosURL.get('/discounts')
        this.discounts = response.data.discounts.data
        console.log(response.data.discounts.data)
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    async fetchStatusDiscount(status) {
      this.loading = true
      try {
        const response = await this.$axiosURL.get(`/discounts?status=${status}`)
        this.discounts = response.data.discounts.data
        console.log(response.data.discounts.data)

        this.$router.push({
          query: {
            page: 1,
            per_page: 16,
            status,
          },
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    removeFilter() {
      this.isFilter = false
      this.fetchDiscounts()

      this.$router.push({
        query: {
          page: 1,
          per_page: 16,
        },
      })
    },

    editDiscount(id) {
      console.log(id)
    },

    async removeDiscount(id) {
      try {
        const response = await this.$axiosURL.delete(`/discounts/${id}`)

        if (response) {
          this.$notify({
            title: 'Success',
            message: 'Скидка успешно удалена',
            type: 'success',
          })

          this.fetchDiscounts()
        }
      } catch (error) {
        throw Error
      }
    },
  },
}
</script>

<style></style>
