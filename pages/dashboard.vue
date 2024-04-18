<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <h1 class="header__title">Dashboard</h1>
    </div>

    <div class="mt-[30px]">
      <!-- Dashboard -->
      <div class="grid grid-cols-3 gap-[15px]">
        <!-- Orders by today -->
        <div class="item__block">
          <span class="item__text">Количество заказов на сегодня</span>
          <span class="item__number">{{ dashboard?.today_orders_amount }}</span>
        </div>

        <!-- Orders sum by today -->
        <div class="item__block">
          <span class="item__text">Сумма заказов на сегодня</span>
          <span class="item__number">{{ dashboard?.today_orders_count }}</span>
        </div>

        <!-- New user by today -->
        <div class="item__block">
          <span class="item__text">Новый пользователь на сегодня</span>
          <span class="item__number">{{ dashboard?.today_users_count }}</span>
        </div>

        <!-- Total orders -->
        <div class="item__block_under">
          <span class="item__text_under">Всего заказов</span>
          <span class="item__number_under">{{ dashboard?.orders_count }}</span>
        </div>

        <!-- Orders sum by all time -->
        <div class="item__block_under">
          <span class="item__text_under">Сумма заказов на вес период</span>
          <span class="item__number_under">{{ dashboard?.orders_amount }}</span>
        </div>

        <!-- Sum users -->
        <div class="item__block_under">
          <span class="item__text_under">Количество пользователей</span>
          <span class="item__number_under">{{ dashboard?.users_count }}</span>
        </div>
      </div>

      <!-- Status -->
      <div class="grid grid-cols-4 2xl:grid-cols-7 gap-[15px] mt-[25px]">
        <!-- New -->
        <div class="status__item">
          <span class="text-xl text-[#18b3bd]">Новые</span>
          <span class="text-2xl">{{ ordersCounts?.new }}</span>
        </div>

        <!-- Accepted -->
        <div class="status__item">
          <span class="text-xl text-[#3699ff]">Принятые</span>
          <span class="text-2xl">{{ ordersCounts?.accepted }}</span>
        </div>

        <!-- Pending -->
        <div class="status__item">
          <span class="text-xl text-[#ffa909]">Ожидание</span>
          <span class="text-2xl">{{ ordersCounts?.pending }}</span>
        </div>

        <!-- In delivery -->
        <div class="status__item">
          <span class="text-xl text-[#62cacf]">В Доставке</span>
          <span class="text-2xl">{{ ordersCounts?.on_the_way }}</span>
        </div>

        <!-- Devlivered -->
        <div class="status__item">
          <span class="text-xl text-[#48a377]">Доставленные</span>
          <span class="text-2xl">{{ ordersCounts?.done }}</span>
        </div>

        <!-- Cenceled -->
        <div class="status__item">
          <span class="text-xl text-[#f31212]">Отмененные</span>
          <span class="text-2xl">{{ ordersCounts?.canceled }}</span>
        </div>

        <!-- Refund -->
        <div class="status__item">
          <span class="text-xl text-[#ad00c9]">Возврат</span>
          <span class="text-2xl">{{ ordersCounts?.returned }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      dashboard: null,
    }
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders
    },
    ordersCounts() {
      return this.$store.state.ordersCounts
    },
  },
  mounted() {
    this.asyncFunctions()
  },
  methods: {
    async asyncFunctions() {
      await this.fetchDashboard()
      await this.$store.dispatch('fetchOrders')
      await this.$store.dispatch('fetchOrdersCounts')
    },

    async fetchDashboard() {
      this.loading = true
      try {
        const response = await this.$axiosURL('/dashboard')
        this.dashboard = response.data
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.item__block {
  @apply h-[130px] flex flex-col space-y-[15px] items-start p-[16px] bg-navbar rounded-lg relative shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px];
}

.item__text {
  @apply text-xl font-semibold text-wrap;
}

.item__number {
  @apply absolute bottom-[10px] left-[15px] text-[28px] font-bold text-blue;
}

.item__block_under {
  @apply flex flex-col space-y-[15px] items-start p-[16px] bg-navbar rounded-lg relative;
}

.item__text_under {
  @apply text-lg text-[#878787] font-semibold text-wrap;
}

.item__number_under {
  @apply text-[28px] font-bold;
}

.status__item {
  @apply flex flex-col p-[18px] bg-navbar rounded-lg items-start space-y-[20px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px];
}
</style>
