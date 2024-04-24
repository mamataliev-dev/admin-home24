<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="flex flex-col space-y-[40px] pt-[15px]">
        <h1 class="header__title">{{ client?.name }}</h1>

        <div class="flex space-x-[50px]">
          <button
            :class="isSettings ? ' text-blue border-b-2 border-blue' : ''"
            class="text-[16px]"
            @click="isSettings = true"
          >
            Настройки
          </button>

          <button
            :class="isSettings ? '' : ' text-blue border-b-2 border-blue'"
            class="text-[16px]"
            @click="isSettings = false"
          >
            Заказы
          </button>
        </div>
      </div>
    </div>

    <div v-if="isSettings" class="flex flex-col space-y-[30px] mt-[30px]">
      <div>
        <div class="cart__block_lang !rounded-lg">
          <h1 class="cart__block-title mb-[15px]">Детали профиля</h1>

          <hr />

          <div class="flex flex-col space-y-[30px] pt-[15px]">
            <div class="flex justify-between w-[50%]">
              <span class="text-[15px] text-[#a1a5b7]">Дата Добавлена</span>
              <span class="text-[15px] font-bold">{{
                formatDate(client?.created_at)
              }}</span>
            </div>

            <div class="flex justify-between w-[50%]">
              <span class="text-[15px] text-[#a1a5b7]">Номер телефона</span>
              <span class="text-[15px] font-bold">+{{ client?.login }}</span>
            </div>

            <div class="flex justify-between w-[50%]">
              <span class="text-[15px] text-[#a1a5b7]">Электронная почта</span>
              <span class="text-[15px] font-bold text-[#a1a5b7]">{{
                client?.email || '------'
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="cart__block_lang !rounded-lg">
          <h1 class="cart__block-title mb-[15px]">Адрес</h1>

          <hr />

          <div class="pt-[15px]">
            <el-empty
              v-if="client?.addresses.length === 0"
              :image-size="200"
            ></el-empty>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isSettings" class="flex flex-col space-y-[30px] mt-[30px]">
      <div class="cart__block_lang !rounded-lg">
        <h1 class="cart__block-title mb-[15px]">Заказы</h1>

        <hr />

        <table
          v-if="client.orders.length !== 0"
          class="table__container !mt-[20px]"
        >
          <thead class="table__thead">
            <tr>
              <th class="table__tr_border-l text-start">НОМЕР ЗАКАЗ</th>
              <th class="table__tr text-center">НОМЕР КЛИЕНТА</th>
              <th class="table__tr text-center">СТАТУС</th>
              <th class="table__tr_border-r text-center">ДАТА</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in client.orders"
              :key="index"
              class="tbody_tr"
            >
              <!-- Index -->
              <td
                class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
              >
                #{{ ++index }}
              </td>

              <!-- Phone number -->
              <td class="tbody__td text-center">
                <span class="font-medium text-[#A1A5BF] text-[16px]"
                  >+{{ item.phone_number }}</span
                >
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

              <!-- Registration Date -->
              <td class="tbody__td flex items-center justify-center">
                <span class="font-medium text-blue text-[16px]">{{
                  formatDate(item.created_at)
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pt-[15px]">
          <el-empty
            v-if="client.orders.length === 0"
            :image-size="200"
          ></el-empty>
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
      isSettings: true,
      client: null,
    }
  },
  head() {
    return {
      title: `Клиент | ${this.$route.params.id}`,
    }
  },
  computed: {},
  mounted() {
    this.fetchClient()
  },
  methods: {
    async fetchClient() {
      this.loading = true
      try {
        const response = await this.$axiosURL.get(
          `/clients/${this.$route.params.id}`
        )
        this.client = response.data.client
      } catch (error) {
        console.log(error)
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
          return { text: 'Новый', class: 'tag_new' }
        default:
          return { text: '', class: '' }
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
  },
}
</script>

<style>
hr {
  color: #f4f4f4;
}

.profile-box {
  margin-bottom: 30px;
  border-bottom: 1px solid #f4f4f4 !important;
}

.ant-cascader-picker {
  background: #323d4e !important;
  border: 0.1 solid !important;
}

.ant-cascader-input {
  height: 46px !important;
  outline: none !important;
}

.ant-cascader-picker-focused {
  outline: none !important;
}

.ant-cascader-picker-arrow {
  color: white !important;
}

.ant-cascader-picker-label {
  color: white !important;
}

.el-form {
  width: 100% !important;
}

.el-cascader {
  width: 100% !important;
}
.el-form {
  width: 100% !important;
}

#category .demo-ruleForm {
  height: 115px !important;
}

.ant-cascader-menu-item {
  color: black !important;
}
</style>
