<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">{{ checkRoute().title }}</h1>
      </div>

      <div class="grid xl:grid-cols-5 2xl:grid-cols-7 gap-x-5 gap-y-5">
        <nuxt-link
          :class="checkRoute().activeOrder"
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/new-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#18b3bd]"></span>
          <span class="text-white">Новые ({{ ordersCounts?.new }})</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/pending-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#ffa909]"></span>
          <span class="text-white">Ожидание ({{ ordersCounts?.pending }})</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/delivery-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-gray"></span>
          <span class="text-white"
            >В доставке ({{ ordersCounts?.on_the_way }})</span
          >
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/accepted-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#3699ff]"></span>
          <span class="text-white"
            >Принятые ({{ ordersCounts?.accepted }})</span
          >
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/returned-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#f312d5]"></span>
          <span class="text-white">Возврат ({{ ordersCounts?.returned }})</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/delivered-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#0b5f37]"></span>
          <span class="text-white"
            >Доставленные ({{ ordersCounts?.done }})</span
          >
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/canceled-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#f31212]"></span>
          <span class="text-white"
            >Отмененные ({{ ordersCounts?.canceled }})</span
          >
        </nuxt-link>
      </div>

      <form
        v-if="checkRoute().activeOrder !== 'all'"
        class="relative flex space-x-[20px]"
        @submit.prevent="searchProduct"
      >
        <div>
          <input
            v-model="query"
            type="text"
            placeholder="Поиск заказа"
            class="w-[400px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] pl-[50px] pr-[16px] focus:outline-none"
          />

          <img
            class="absolute top-[14px] left-[16px] z-10"
            src="@/assets/img/icons/search.svg"
            alt=""
          />
        </div>
      </form>

      <form
        v-if="checkRoute().activeOrder === 'all'"
        class="relative flex justify-between"
        @submit.prevent="searchProduct"
      >
        <!-- Search -->
        <div>
          <input
            v-model="query"
            type="text"
            placeholder="Поиск продукта"
            class="w-[200px] 2xl:w-[400px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] pl-[50px] pr-[16px] focus:outline-none"
          />

          <img
            class="absolute top-[14px] left-[16px] z-10"
            src="@/assets/img/icons/search.svg"
            alt=""
          />
        </div>

        <div class="flex space-x-[20px]">
          <!-- Start / End Date -->
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="Дата начала"
            end-placeholder="Дата окончания"
          >
          </el-date-picker>

          <!-- Operators -->
          <div>
            <el-select v-model="operator" placeholder="Операторы">
              <el-option
                v-for="item in operators"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <!-- Regions -->
          <div>
            <el-select v-model="region" placeholder="Регионы">
              <el-option
                v-for="item in regions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </form>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start">ID</th>
            <th class="table__tr text-start">КЛИЕНТ</th>
            <th class="table__tr text-center">НОМЕР ТЕЛЕФОНА</th>
            <th class="table__tr text-center">ДАТА</th>
            <th class="table__tr text-center">ОПЕРАТОР</th>
            <th class="table__tr text-center">ОБЛАСТЬ</th>
            <th class="table__tr text-center">КОЛ-ВО</th>
            <th class="table__tr_border-r text-center">СТАТУС</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in orders"
            :key="index"
            class="tbody_tr cursor-pointer"
            @click="$router.push(`/order/${index}`)"
          >
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ ++index }}
            </td>

            <!-- Client -->
            <td class="tbody__td">
              <h1 class="font-semibold text-[#4880FF]">{{ item.user.name }}</h1>
            </td>

            <!-- Phone Number -->
            <td class="tbody__td tbody__td_center">
              <span class="font-semibold">+{{ item.user.login }}</span>
            </td>

            <!-- Date -->
            <td class="tbody__td tbody__td_center">
              <span class="font-semibold text-[#4880FF]">{{
                formattedDate(item.created_at)
              }}</span>
            </td>

            <!-- Operator -->
            <td class="tbody__td tbody__td_center">
              <span class="font-normal">{{
                item.operator?.username || '------------'
              }}</span>
            </td>

            <!-- Region -->
            <td class="tbody__td tbody__td_center">
              <span class="font-medium">{{ item.delivery_method }}</span>
            </td>

            <!-- Quatity -->
            <td class="tbody__td text-center">
              <span class="font-medium">{{ item.products?.length }}</span>
            </td>

            <!-- Status -->
            <td class="tbody__td tbody__td_center">
              <span
                :class="getOrderStatus(item.status).class"
                class="rounded-lg px-[16px] py-[8px] font-bold"
              >
                {{ getOrderStatus(item.status).text }}
              </span>
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
      title: '',
      activeOrder: '',
      status: '',
      query: '',
      ordersAmount: {
        new: 0,
        accepted: 0,
        pending: 0,
        delivery: 0,
        delivered: 0,
        canceled: 0,
        refund: 0,
      },
      operators: [
        {
          value: 'in stock',
          label: 'В наличии',
        },
        {
          value: 'out of stock',
          label: 'Нет в наличии',
        },
      ],
      operator: '',
      regions: [
        {
          value: 'tashkent',
          label: 'Ташкент',
        },
        {
          value: 'andijan',
          label: 'Андижан',
        },
        {
          value: 'bukhara',
          label: 'Бухара',
        },
        {
          value: 'fergana',
          label: 'Фергана',
        },
        {
          value: 'jizzakh',
          label: 'Джизак',
        },
        {
          value: 'khorezm',
          label: 'Хорезм',
        },
        {
          value: 'namangan',
          label: 'Наманган',
        },
        {
          value: 'navoiy',
          label: 'Навои',
        },
        {
          value: 'kashkadarya',
          label: 'Кашкадарья',
        },
        {
          value: 'samarkand',
          label: 'Самарканд',
        },
        {
          value: 'sirdarya',
          label: 'Сырдарья',
        },
        {
          value: 'surkhandarya',
          label: 'Сурхандарья',
        },
        {
          value: 'tashkent-region',
          label: 'Ташкентская область',
        },
        {
          value: 'karakalpakstan',
          label: 'Каракалпакстан',
        },
      ],
      region: '',
      date: '',
      statusText: '',
      statusClass: '',
    }
  },
  head() {
    return {
      title: this.checkRoute().title,
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
  watch: {
    $router() {
      this.checkRoute()
    },
  },
  mounted() {
    this.asyncFunctions()
  },
  methods: {
    async asyncFunctions() {
      await this.$store.dispatch('fetchOrders')
      await this.$store.dispatch('fetchOrdersCounts')
      await this.fetchStatusOrder()
      this.checkRoute()
    },

    async fetchStatusOrder() {
      this.loading = true

      try {
        const response = await this.$axiosURL(`/orders?status=${this.status}`)
        this.$store.commit('setOrders', response.data.orders.data)
        console.log(response.data.orders.data)
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    getOrderStatus(status) {
      switch (status) {
        case 'pending':
          return { text: 'Ожидание', class: 'tag_pending' }
        case 'accepted':
          return { text: 'Принятые', class: 'tag_accepted' }
        case 'returned':
          return { text: 'Возврат', class: 'tag_returned' }
        case 'canceled':
          return { text: 'Отмененнен', class: 'tag_canceled' }
        case 'on_the_way':
          return { text: 'В дороге', class: 'tag_delivery' }
        case 'done':
          return { text: 'Доставленные', class: 'tag_delivered' }
        case 'new':
          return { text: 'Новые', class: 'tag_new' }
        default:
          return { text: '', class: '' }
      }
    },

    checkRoute() {
      switch (this.$route.params.id) {
        case 'all-orders':
          return { title: 'Все заказы', activeOrder: 'all' }
        case 'pending-orders':
          return { title: 'Ожидания', activeOrder: 'pending' }
        case 'accepted-orders':
          return { title: 'Принятые', activeOrder: 'accepted' }
        case 'new-orders':
          return { title: 'Новые', activeOrder: 'new' }
        case 'delivery-orders':
          return { title: 'В доставке', activeOrder: 'delivery' }
        case 'delivered-orders':
          return { title: 'Доставленные', activeOrder: 'delivered' }
        case 'returned-orders':
          return { title: 'Возврат', activeOrder: 'refund' }
        case 'canceled-orders':
          return { title: 'Отмененные', activeOrder: 'canceled' }
        default:
          break
      }
    },

    formattedDate(dateString) {
      const date = new Date(dateString)
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      })

      return formattedDate
    },

    searchProduct() {},
  },
}
</script>

<style>
.tag_pending {
  background: #fff4de;
  color: #ffa909;
}

.tag_new {
  background: #98d3d8;
  color: #18b3bd;
}

.tag_delivery {
  background: #b0b3b8;
  color: #4b5668;
}

.tag_accesed {
  background: #9bbfe3;
  color: #3699ff;
}

.tag_returned {
  background: #d69bce;
  color: #e418c9;
}

.tag_delivered {
  background: #7ed6ac;
  color: #0b5f37;
}

.tag_canceled {
  background: #e27777;
  color: #e02323;
}

.el-range-input {
  background-color: #323d4e !important;
  color: #b5b5c3 !important;
}

.el-range-separator {
  color: #b5b5c3 !important;
  font-size: 16px !important;
  margin-top: 4px !important;
}

.el-picker-panel__content {
  background-color: #323d4e !important;
  color: #929292 !important;
}

.el-picker-panel__icon-btn {
  color: white !important;
}
</style>
