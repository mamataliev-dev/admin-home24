<template>
  <div>
    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Отправленные сообщения</h1>

        <button class="header__btn" @click="$router.push('/add-product')">
          <span>Отправить</span>
        </button>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[80px]">№</th>
            <th class="table__tr text-start">ПОЛЬЗОВАТЕЛЬ</th>
            <th class="table__tr text-start">СООБЩЕНИЯ</th>
            <th class="table__tr texr-center">ДАТА ОТПРАВЛЕНИЯ</th>
            <th class="table__tr texr-center">УСПЕШНО ОТПРАВЛЕННЫЕ</th>
            <th class="table__tr texr-center">НЕ ОТПРАВЛЕННЫЕ</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
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

            <!-- Name -->
            <td class="tbody__td">
              <span class="font-bold text-[18px]">admin</span>
            </td>

            <!-- Message -->
            <td class="tbody__td">
              <span class="font-medium">message</span>
            </td>

            <!-- Sent Date -->
            <td class="tbody__td text-center">
              <span class="font-medium text-blue">11/01/2024</span>
            </td>

            <!-- Sent -->
            <td class="tbody__td text-center">
              <span class="font-bold text-[16px]">3</span>
            </td>

            <!-- Unsent -->
            <td class="tbody__td text-center">
              <span class="font-bold text-[16px]">0</span>
            </td>

            <!-- Actions -->
            <td class="tbody__td">
              <div class="flex justify-end pr-[50px]">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[14px] rounded-lg"
                >
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
    return {}
  },
  head() {
    return {
      title: 'SMS Рассылки',
    }
  },
  methods: {
    removeProduct() {},
  },
}
</script>

<style></style>
