<template>
  <div>
    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Продукты</h1>

        <button
          class="header__btn"
          @click="$router.push('/catalog/add-product')"
        >
          <img src="@/assets/img/icons/add.svg" alt="" />
          <span>Добавить продукт</span>
        </button>
      </div>

      <form
        class="relative flex space-x-[20px]"
        @submit.prevent="searchProduct"
      >
        <div>
          <input
            v-model="query"
            type="text"
            placeholder="Поиск продукта"
            class="w-[290px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] pl-[50px] pr-[16px] focus:outline-none"
          />

          <img
            class="absolute top-[14px] left-[16px] z-10"
            src="@/assets/img/icons/search.svg"
            alt=""
          />
        </div>

        <div>
          <input
            v-model="query"
            type="text"
            placeholder="Фильтр по категориям"
            class="w-[290px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] px-[16px] focus:outline-none"
          />
        </div>

        <div>
          <el-select v-model="value1" placeholder="В наличии">
            <el-option
              v-for="item in stocks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div>
          <el-select v-model="value2" placeholder="Статус">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </form>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start">№</th>
            <th class="table__tr text-start">ПРОДУКТ</th>
            <th class="table__tr">КОЛ-ВО</th>
            <th class="table__tr">ЦЕНА</th>
            <th class="table__tr">СТАТУС</th>
            <th class="table__tr_border-r">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in 6" :key="index" class="tbody_tr">
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ index }}
            </td>

            <!-- Product -->
            <td class="tbody__td">
              <div class="flex items-center space-x-[15px]">
                <img
                  class="border border-[rgb(235,238,244)] w-[50px] h-[50px] rounded-lg object-cover"
                  src="@/assets/img/png/test-product.png"
                  alt=""
                />

                <div class="flex flex-col space-y-[3px]">
                  <span class="text-[15px] font-semibold">Product Title</span>
                  <span class="font-regular text-textGray"
                    >Product Category Path</span
                  >
                </div>
              </div>
            </td>

            <!-- Quantity -->
            <td class="tbody__td tbody__td_center">
              <span class="font-semibold">5</span>
            </td>

            <!-- Price -->
            <td class="tbody__td tbody__td_center">
              <span class="font-semibold">360$</span>
            </td>

            <!-- Status -->
            <td class="tbody__td tbody__td_center">
              <span class="bg-[#00B69B] rounded-lg px-[16px] py-[8px]"
                >Активный</span
              >
            </td>

            <!-- Actions -->
            <td class="tbody__td">
              <div class="flex justify-center">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg w-[100px]"
                >
                  <button
                    class="border-r border-[#979797] pr-[16px]"
                    @click="$router.push(`/edit-product/${index}`)"
                  >
                    <img src="@/assets/img/icons/edit.svg" alt="" />
                  </button>

                  <button @click="removeProduct">
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
      title: 'Продукты',
    }
  },
  methods: {
    editProduct() {},

    removeProduct() {},

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
