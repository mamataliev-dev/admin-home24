<template>
  <div>
    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Отмененные заказы</h1>
      </div>

      <div class="grid xl:grid-cols-5 2xl:grid-cols-7 gap-x-5 gap-y-5">
        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#c2c2c2]"
          to="/orders/new-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#18b3bd]"></span>
          <span>Новые (0)</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/pending-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#ffa909]"></span>
          <span>Ожидание (0)</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/delivery-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-gray"></span>
          <span>В доставке (0)</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/accepted-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#3699ff]"></span>
          <span>Принятые (0)</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/returned-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#f312d5]"></span>
          <span>Возврат (0)</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/delivered-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#0b5f37]"></span>
          <span>Доставленные (0)</span>
        </nuxt-link>

        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg bg-[#727E93]"
          to="/orders/canceled-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#f31212]"></span>
          <span>Отмененные (0)</span>
        </nuxt-link>
      </div>

      <form
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
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start">ID</th>
            <th class="table__tr text-start">КЛИЕНТ</th>
            <th class="table__tr">НОМЕР ТЕЛЕФОНА</th>
            <th class="table__tr">ДАТА</th>
            <th class="table__tr">ОПЕРАТОР</th>
            <th class="table__tr">ОБЛАСТЬ</th>
            <th class="table__tr text-center">КОЛ-ВО</th>
            <th class="table__tr_border-r">СТАТУС</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in 6"
            :key="index"
            class="tbody_tr cursor-pointer"
            @click="$router.push(`/order/${index}`)"
          >
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ index }}
            </td>

            <!-- Client -->
            <td class="tbody__td">
              <h1 class="font-semibold text-[#4880FF]">Khasan Cho'lliyev</h1>
            </td>

            <!-- Phone Number -->
            <td class="tbody__td tbody__td_center">
              <span class="font-semibold">+998997301499</span>
            </td>

            <!-- Date -->
            <td class="tbody__td tbody__td_center">
              <span class="font-semibold text-[#4880FF]">01/02/2024 11:37</span>
            </td>

            <!-- Operator -->
            <td class="tbody__td tbody__td_center">
              <span class="font-normal">admin</span>
            </td>

            <!-- Region -->
            <td class="tbody__td tbody__td_center">
              <span class="font-medium">Самовывоз</span>
            </td>

            <!-- Quatity -->
            <td class="tbody__td text-center">
              <span class="font-medium">1</span>
            </td>

            <!-- Status -->
            <td class="tbody__td flex justify-center">
              <span class="bg-[#00B69B] rounded-lg px-[16px] py-[8px]"
                >Активный</span
              >
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
      query: '',
      stocks: [
        {
          value: 'in stock',
          label: 'В наличии',
        },
        {
          value: 'out of stock',
          label: 'Нет в наличии',
        },
      ],
      value1: '',
      status: [
        {
          value: 'all',
          label: 'Все',
        },
        {
          value: 'active',
          label: 'Активные',
        },
        {
          value: 'not active',
          label: 'Неактивные',
        },
      ],
      value2: '',
    }
  },
  head() {
    return {
      title: 'Отмененные Заказы',
    }
  },
  methods: {
    searchProduct() {},

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    },
  },
}
</script>

<style></style>
