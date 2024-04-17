<template>
  <div>
    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Брэнды</h1>

        <div class="flex space-x-[30px]">
          <form
            class="relative flex justify-end space-x-[20px]"
            @submit.prevent="searchAttribute"
          >
            <div>
              <input
                v-model="query"
                type="text"
                placeholder="Поиск брэнда"
                class="w-[290px] border-[0.1px] border-[rgba(207, 207, 207, 0.1142)] rounded-lg bg-[#323D4E] py-[12px] pl-[50px] pr-[16px] focus:outline-none"
              />

              <img
                class="absolute top-[14px] left-[16px] z-10"
                src="@/assets/img/icons/search.svg"
                alt=""
              />
            </div>
          </form>

          <button class="header__btn" @click="dialogVisible = true">
            <img src="@/assets/img/icons/add.svg" alt="" />
            <span>Добавить брэнд</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[100px]">№</th>
            <th class="table__tr text-start">БРЕНД</th>
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

            <!-- Brand -->
            <td class="tbody__td">
              <div class="flex items-center space-x-[15px]">
                <img
                  class="w-[40px] h-[40px] rounded-lg"
                  src="@/assets/img/png/empty-category-status.png"
                  alt=""
                />
                <span class="font-semibold">brand name</span>
              </div>
            </td>

            <!-- Actions -->
            <td class="tbody__td pr-[30px]">
              <div class="flex justify-end">
                <div
                  class="flex items-center justify-between bg-[#323D4E] py-[8px] px-[16px] rounded-lg w-[100px]"
                >
                  <button
                    class="border-r border-[#979797] pr-[16px]"
                    @click="dialogVisible = true"
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

    <!-- Add Brand Modal -->
    <div>
      <el-dialog
        title="Добавить брэнд"
        :visible.sync="dialogVisible"
        width="520px"
        :before-close="handleClose"
      >
        <!-- Brand Name -->
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          class="demo-dynamic"
        >
          <el-form-item
            label="Брэнд"
            :rules="{
              required: true,
              message: 'Пожалуйста введите название брэнда',
              trigger: 'blur',
            }"
          >
            <el-input v-model="brandName"></el-input>
          </el-form-item>
        </el-form>

        <!-- Is Popular -->
        <div class="flex space-x-[20px] mt-[40px]">
          <el-switch v-model="isPopular"> </el-switch>
          <span class="font-semibold text-white">Популярные бренды</span>
        </div>

        <!-- Image -->
        <div class="mt-[30px]">
          <el-upload list-type="picture-card" :auto-upload="false">
            <div class="pt-[40px]">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text leading-[17px]">
                Добавить <br />
                изображение
              </div>
            </div>

            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />

              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </div>

        <!-- Cancel / Add -->
        <div
          class="flex justify-end space-x-[15px] mt-[30px] pt-[15px] border-t border-[#e8e8e8]"
        >
          <el-button type="danger" plain>Отмена</el-button>

          <button
            class="flex items-center space-x-[7px] py-[6px] px-[18px] rounded-lg bg-blue"
            @click="submitForm('dynamicValidateForm')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                <path
                  d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                  opacity="0.3"
                ></path>
                <path
                  d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </svg>
            <span class="font-semibold text-white">Сохранить</span>
          </button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      query: '',
      isPopular: false,
      brandName: '',
      dynamicValidateForm: {
        domains: [
          {
            key: 1,
            value: '',
          },
        ],
        email: '',
      },
    }
  },
  head() {
    return {
      title: 'Брэнды',
    }
  },
  methods: {
    editProduct() {},

    removeProduct() {},

    searchAttribute() {},

    submitForm(formName) {},

    handleRemove(file) {
      console.log(file)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleDownload(file) {
      console.log(file)
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
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
