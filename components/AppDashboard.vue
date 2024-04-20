<template>
  <div
    class="dashboard fixed top-0 flex flex-col items-center bg-navbar p-[24px] overflow-scroll"
  >
    <div class="flex items-center space-x-[10px]">
      <img src="@/assets/img/icons/logo.svg" alt="logo" />
      <h1 class="text-2xl">Admin Panel</h1>
    </div>

    <ul class="mt-[30px]">
      <!-- Catalog -->
      <li>
        <button class="dashboard-link" @click="toggleDropdown('catalog')">
          <span :class="{ 'text-white': openList === 'catalog' }">Каталог</span>
          <span
            :class="{ 'rotate-180 text-white': openList === 'catalog' }"
            class="el-icon-arrow-down transition-transform"
          ></span>
        </button>

        <!-- Drop Down List -->
        <transition
          name="dropdown"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ol v-show="openList === 'catalog'" class="pl-[5px]">
            <li>
              <nuxt-link
                :class="activeChild === 'products' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/catalog/products"
              >
                <span>&#9679;</span>
                <span>Продукты</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'categories' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/catalog/categories"
              >
                <span>&#9679;</span>
                <span>Категории</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'attributes' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/catalog/attributes"
              >
                <span>&#9679;</span>
                <span>Атрибуты</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'characteristic' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/catalog/characteristic"
              >
                <span>&#9679;</span>
                <span>Характиристика</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'brands' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/catalog/brands"
              >
                <span>&#9679;</span>
                <span>Бренды</span>
              </nuxt-link>
            </li>
          </ol>
        </transition>
      </li>

      <!-- Dashboard -->
      <li>
        <button @click="toggleDropdown('dashboard')">
          <nuxt-link
            :class="openList === 'dashboard' ? 'active' : ''"
            class="dashboard-link"
            to="/dashboard"
          >
            <span>Dashboard</span>
          </nuxt-link>
        </button>
      </li>

      <!-- Showcases -->
      <li>
        <button class="dashboard-link" @click="toggleDropdown('showcases')">
          <span :class="{ 'text-white': openList === 'showcases' }"
            >Витрины</span
          >
          <span
            :class="{ 'rotate-180 text-white': openList === 'showcases' }"
            class="el-icon-arrow-down transition-transform"
          ></span>
        </button>

        <!-- Drop Down List -->
        <transition
          name="dropdown"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ol v-show="openList === 'showcases'" class="pl-[5px]">
            <li v-for="item in showcases" :key="item.id">
              <nuxt-link
                :class="activeChild === item.id ? 'active' : ''"
                class="dashboard__dropdown"
                :to="`/showcases/${item.id}`"
              >
                <span>&#9679;</span>
                <span>{{ item.name.ru }}</span>
              </nuxt-link>
            </li>
          </ol>
        </transition>
      </li>

      <!-- Orders -->
      <li>
        <button class="dashboard-link" @click="toggleDropdown('orders')">
          <span :class="{ 'text-white': openList === 'orders' }">Заказы</span>
          <span
            :class="{ 'rotate-180 text-white': openList === 'orders' }"
            class="el-icon-arrow-down transition-transform"
          ></span>
        </button>

        <transition
          name="dropdown"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ol v-show="openList === 'orders'" class="pl-[5px]">
            <li>
              <nuxt-link
                :class="activeChild === 'all-orders' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/all-orders"
              >
                <span>&#9679;</span>
                <span>Все заказы ({{ orders.length }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'new-orders' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/new-orders"
              >
                <span>&#9679;</span>
                <span>Новые заказы ({{ ordersCounts?.new }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'accepted-orders' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/accepted-orders"
              >
                <span>&#9679;</span>
                <span>Принятые заказы ({{ ordersCounts?.accepted }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                class="dashboard__dropdown"
                :class="activeChild === 'pending-orders' ? 'active' : ''"
                to="/orders/pending-orders"
              >
                <span>&#9679;</span>
                <span>Ожидание ({{ ordersCounts?.pending }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'delivery-orders' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/delivery-orders"
              >
                <span>&#9679;</span>
                <span>В доставке ({{ ordersCounts?.on_the_way }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'returned-orders' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/returned-orders"
              >
                <span>&#9679;</span>
                <span>Возврат ({{ ordersCounts?.returned }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'delivered-orders' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/delivered-orders"
              >
                <span>&#9679;</span>
                <span>Доставленные ({{ ordersCounts?.done }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'canceled-orders' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/canceled-orders"
              >
                <span>&#9679;</span>
                <span>Отмененные ({{ ordersCounts?.canceled }})</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'applications' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/orders/applications"
              >
                <span>&#9679;</span>
                <span>Заявки</span>
              </nuxt-link>
            </li>
          </ol>
        </transition>
      </li>

      <!-- Inbox -->
      <li>
        <button class="dashboard-link" @click="toggleDropdown('inbox')">
          <span :class="{ 'text-white': openList === 'inbox' }">Маркетинг</span>
          <span
            :class="{ 'rotate-180 text-white': openList === 'inbox' }"
            class="el-icon-arrow-down transition-transform"
          ></span>
        </button>

        <transition
          name="dropdown"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ol v-show="openList === 'inbox'" class="pl-[5px]">
            <li>
              <nuxt-link
                :class="activeChild === 'discount' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/inbox/discount"
              >
                <span>&#9679;</span>
                <span>Скидки</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'sms' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/inbox/sms"
              >
                <span>&#9679;</span>
                <span>SMS Рассылка</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'promotions' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/inbox/promotions"
              >
                <span>&#9679;</span>
                <span>Акции</span>
              </nuxt-link>
            </li>
          </ol>
        </transition>
      </li>

      <!-- Clients -->
      <li>
        <button @click="toggleDropdown('clients')">
          <nuxt-link
            :class="openList === 'clients' ? 'active' : ''"
            class="dashboard-link"
            to="/home/clients"
          >
            <span :class="{ 'text-white': openList === 'clients' }"
              >Клиенты</span
            >
          </nuxt-link>
        </button>
      </li>

      <!-- Content -->
      <li>
        <button class="dashboard-link" @click="toggleDropdown('contents')">
          <span :class="{ 'text-white': openList === 'contents' }"
            >Котент Сайта</span
          >
          <span
            :class="{ 'rotate-180 text-white': openList === 'contents' }"
            class="el-icon-arrow-down transition-transform"
          ></span>
        </button>

        <!-- Drop Down List -->
        <transition
          name="dropdown"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ol v-show="openList === 'contents'" class="pl-[5px]">
            <li>
              <nuxt-link
                :class="activeChild === 'blog' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/contents/blog"
              >
                <span>&#9679;</span>
                <span>Блог</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'banners' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/contents/banners"
              >
                <span>&#9679;</span>
                <span>Баннеры</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'comments' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/contents/comments"
              >
                <span>&#9679;</span>
                <span>Отзывы</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'faq' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/contents/faq"
              >
                <span>&#9679;</span>
                <span>Вопросы и Ответы</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'feedbacks' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/contents/feedbacks"
              >
                <span>&#9679;</span>
                <span>Feedbacks</span>
              </nuxt-link>
            </li>
          </ol>
        </transition>
      </li>

      <!-- Settings -->
      <li>
        <button class="dashboard-link" @click="toggleDropdown('settings')">
          <span :class="{ 'text-white': openList === 'settings' }"
            >Настройки Сайта</span
          >
          <span
            :class="{ 'rotate-180 text-white': openList === 'settings' }"
            class="el-icon-arrow-down transition-transform"
          ></span>
        </button>

        <!-- Drop Down List -->
        <transition
          name="dropdown"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ol v-show="openList === 'settings'" class="pl-[5px]">
            <li>
              <nuxt-link
                :class="activeChild === 'translations' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/settings/translations"
              >
                <span>&#9679;</span>
                <span>Переводы</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'site-info' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/settings/site-info"
              >
                <span>&#9679;</span>
                <span>Общие данные</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'users' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/settings/users"
              >
                <span>&#9679;</span>
                <span>Пользователи</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'roles' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/settings/roles"
              >
                <span>&#9679;</span>
                <span>Роли</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'permissions-group' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/settings/permissions-group"
              >
                <span>&#9679;</span>
                <span>Permissions Group</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :class="activeChild === 'regions' ? 'active' : ''"
                class="dashboard__dropdown"
                to="/settings/regions"
              >
                <span>&#9679;</span>
                <span>Регионы</span>
              </nuxt-link>
            </li>
          </ol>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openList: null,
      activeChild: null,
      showcases: null,
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
    $route() {
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
      await this.fetchShowcases()
      this.checkRoute()
    },

    async fetchShowcases() {
      try {
        const response = await this.$axiosURL('/showcases/all')
        this.showcases = response.data.showcases
      } catch (error) {
        throw Error
      }
    },

    toggleDropdown(menu) {
      this.openList = this.openList === menu ? null : menu
    },

    checkRoute() {
      const pathSegments = this.$route.path.split('/').filter((p) => p)
      if (pathSegments.length) {
        this.openList = pathSegments[0]
        this.activeChild = pathSegments[1] || null
      }
    },

    beforeEnter(el) {
      el.style.height = '0'
    },

    enter(el, done) {
      el.style.transition = 'height 0.3s ease'
      el.style.height = el.scrollHeight + 'px'
      el.addEventListener('transitionend', done)
    },

    leave(el, done) {
      el.style.height = '0'
      el.addEventListener('transitionend', done)
    },
  },
}
</script>

<style scoped>
.dashboard-link {
  @apply w-[190px] flex items-center justify-between text-textGray font-semibold py-[16px] px-[10px] text-start rounded-lg  transition-all duration-150 hover:text-white focus:text-white;
}

.dashboard-link.active {
  @apply text-white bg-[#4880FF];
}

.dropdown-enter-active,
.dropdown-leave-active {
  overflow: hidden;
}

.dropdown-enter,
.dropdown-leave-to {
  height: 0;
}

.dashboard {
  width: 240px;
  height: 100vh !important;
  z-index: 999999999;
}
</style>
