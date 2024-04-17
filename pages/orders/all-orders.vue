<template>
  <div>
    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Все заказы</h1>
      </div>

      <div class="grid xl:grid-cols-5 2xl:grid-cols-7 gap-x-5 gap-y-5">
        <nuxt-link
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
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
          class="flex space-x-[7px] py-[10px] px-[18px] transition-all duration-200 rounded-lg hover:bg-[#727E93]"
          to="/orders/canceled-orders"
        >
          <span class="w-[20px] h-[20px] rounded-full bg-[#f31212]"></span>
          <span>Отмененные (0)</span>
        </nuxt-link>
      </div>

      <form
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
    }
  },
  head() {
    return {
      title: 'Все заказы',
    }
  },
  methods: {
    editProduct() {},

    removeProduct() {},

    searchProduct() {},
  },
}
</script>

<style>
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
