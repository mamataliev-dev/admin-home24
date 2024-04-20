<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Клиенты</h1>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[80px]">№</th>
            <th class="table__tr text-start w-[280px] 2xl:w-[430px]">ФИО</th>
            <th class="table__tr text-center">НОМЕР ТЕЛЕФОНА</th>
            <th class="table__tr text-end 2xl:text-center">ДАТА РЕГИСТРАЦИИ</th>
            <th class="table__tr text-center">ПОЧТА</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in clients" :key="index" class="tbody_tr">
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ ++index }}
            </td>

            <!-- Name -->
            <td class="tbody__td w-[280px] 2xl:w-[430px]">
              <span class="font-bold text-[17px]">{{
                item.name || '------------'
              }}</span>
            </td>

            <!-- Phone number -->
            <td class="tbody__td text-center">
              <span class="font-medium text-[#A1A5BF] text-[16px]">{{
                item.login
              }}</span>
            </td>

            <!-- Registration Date -->
            <td class="tbody__td flex items-center justify-center">
              <span class="font-medium text-blue text-[16px]">{{
                formatDate(item.created_at)
              }}</span>
            </td>

            <!-- Email -->
            <td class="tbody__td text-center">
              <span class="font-medium text-[16px]">{{
                item.email || '------------'
              }}</span>
            </td>

            <!-- Actions -->
            <td class="tbody__td">
              <div class="flex justify-end pr-[30px]">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg"
                >
                  <button @click="$router.push(`/home/clients/${item.id}`)">
                    <img src="@/assets/img/icons/edit.svg" alt="" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mt-[30px]">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page.sync="pagination.current_page"
          :page-size="pagination.per_page"
          @current-change="handlePageChange"
        >
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
      clients: null,
      pagination: {
        total: 0,
        per_page: 1,
        current_page: 16,
      },
    }
  },
  head() {
    return {
      title: 'Клиенты',
    }
  },
  mounted() {
    this.fetchClients()
  },
  methods: {
    async fetchClients() {
      this.loading = true
      try {
        const page = this.$route.query.page
        const perPage = this.$route.query.perPage

        const response = await this.$axiosURL.get(
          `/clients?page=${page}&per_page=${perPage}`
        )
        this.clients = response.data.clients.data

        this.pagination = {
          total: response.data.clients.total,
          per_page: response.data.clients.per_page,
          current_page: response.data.clients.current_page,
        }
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    async handlePageChange(page) {
      this.$router.push({
        query: {
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        },
      })

      this.loading = true
      try {
        const response = await this.$axiosURL.get(
          `/clients?page=${this.pagination.current_page}&per_page=${this.pagination.per_page}`
        )
        this.clients = response.data.clients.data

        this.pagination = {
          total: response.data.clients.total,
          per_page: response.data.clients.per_page,
          current_page: response.data.clients.current_page,
        }
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    formatDate(dateStr) {
      const date = new Date(dateStr)
      return new Intl.DateTimeFormat('en-GB').format(date)
    },
  },
}
</script>
