<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">{{ showcase?.name.ru }}</h1>

        <button class="header__btn" @click="$router.push('/add-product')">
          <img src="@/assets/img/icons/add.svg" alt="" />
          <span>Добавить</span>
        </button>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[80px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="14"
                viewBox="0 0 24 14"
                fill="none"
              >
                <path
                  d="M1 1H23"
                  stroke="#C8CBDF"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M1 7H23"
                  stroke="#C8CBDF"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M1 13H23"
                  stroke="#C8CBDF"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </svg>
            </th>
            <th class="table__tr text-start">ПРОДУКТЫ</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <Draggable
          group="items"
          :options="dragOptions"
          tag="tbody"
          @start="dragging = true"
          @end="dragging = false"
        >
          <tr
            v-for="item in showcase?.products"
            :key="item.id"
            class="tbody_tr"
          >
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="14"
                viewBox="0 0 24 14"
                fill="none"
              >
                <path
                  d="M1 1H23"
                  stroke="#C8CBDF"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M1 7H23"
                  stroke="#C8CBDF"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M1 13H23"
                  stroke="#C8CBDF"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </svg>
            </td>

            <!-- Product -->
            <td class="tbody__td flex space-x-[15px]">
              <img
                class="w-[50px] h-[50px] rounded-lg border border-textGray object-cover"
                :src="item.images[0].md_img"
              />
              <span class="font-semibold">{{ item.name.ru }}</span>
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

          <tr v-if="showcase?.products.length === 0" class="relative h-[250px]">
            <EmptyData />
          </tr>
        </Draggable>
      </table>

      <div
        v-if="showcase?.products.length !== 0"
        class="flex justify-end mt-[30px]"
      >
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
      dragging: false,
      showcase: null,
    }
  },
  head() {
    return {
      title: 'Витрина | 1',
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        dragClass: 'drag',
      }
    },
  },
  mounted() {
    this.fetchCurrentShowcase()
  },
  methods: {
    async fetchCurrentShowcase() {
      this.loading = true
      try {
        const repsonse = await this.$axiosURL.get(
          `/showcases/${this.$route.params.id}`
        )
        this.showcase = repsonse.data.showcase
        console.log(repsonse.data.showcase)
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    editProduct() {},

    removeProduct() {},
  },
}
</script>

<style>
.el-upload .el-upload--picture-card {
  background: #d6d6d6 !important;
}

.demo-dynamic {
  background: #323d4e !important;
}

.el-icon-upload::before {
  content: url('@/assets/img/icons/upload-img.svg');
}

.el-upload-dragger {
  width: 117px !important;
  height: 117px !important;
}

.el-upload-dragger .el-icon-upload {
  margin: 0 !important;
}

.el-upload__text {
  font-size: 12px !important;
  color: #3699ff !important;
  text-align: center !important;
  margin-top: 10px !important;
}

.el-upload--picture-card {
  line-height: 0px !important;
}

.el-dialog {
  background: #323d4e !important;
  border-radius: 10px !important;
}

.el-form-item__label {
  color: #979797 !important;
}

.el-dialog__header {
  border-bottom: 1px solid #e8e8e8 !important;
  padding-bottom: 20px !important;
}

.el-dialog__title {
  color: white !important;
}
</style>
