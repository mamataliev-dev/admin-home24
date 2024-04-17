<template>
  <div>
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
            <th class="table__tr texr-center">ПОЧТА</th>
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
            <td class="tbody__td w-[280px] 2xl:w-[430px]">
              <span class="font-bold text-[17px]"> Khasan Cho'lliyev</span>
            </td>

            <!-- Phone number -->
            <td class="tbody__td text-center">
              <span class="font-medium text-[#A1A5BF] text-[16px]"
                >998913722502</span
              >
            </td>

            <!-- Registration Date -->
            <td class="tbody__td text-center">
              <span class="font-medium text-blue text-[16px]">09/02/2024</span>
            </td>

            <!-- Email -->
            <td class="tbody__td text-center">
              <span class="font-medium text-[16px]"
                >chulliyevhasan1499@mail.ru</span
              >
            </td>

            <!-- Actions -->
            <td class="tbody__td pr-[30px]">
              <div class="flex justify-end">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg w-[100px]"
                >
                  <button
                    class="border-r border-[#979797] pr-[16px]"
                    @click="editProduct"
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
    return {}
  },
  head() {
    return {
      title: 'Клиенты',
    }
  },
  methods: {
    removeProduct() {},

    editProduct() {},
  },
}
</script>

<style></style>
