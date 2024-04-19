<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div id="cart" class="cart">
      <div class="w-8/12 2xl:w-9/12">
        <div class="cart__container">
          <!-- Title -->
          <div class="flex flex-col">
            <LangComp @updateLang="setLang" />

            <div class="cart__block_lang">
              <h1 class="cart__block-title">Добавить продукт</h1>

              <!-- Ru -->
              <el-form
                v-if="isRussian"
                ref="ruTitleForm"
                :model="ruTitleForm"
                class="demo-ruleForm"
              >
                <el-form-item
                  :rules="[
                    {
                      required: true,
                      message: 'Пожалуйста введите название продукта',
                      trigger: 'blur',
                    },
                  ]"
                  label="Название *"
                  prop="title"
                >
                  <el-input
                    v-model="ruTitleForm.title"
                    type="text"
                    autocomplete="off"
                    placeholder="Название продукта"
                  ></el-input>
                </el-form-item>

                <el-form-item label="Модель" prop="model">
                  <el-input
                    v-model="ruTitleForm.model"
                    type="text"
                    autocomplete="off"
                    placeholder="Модель продукта"
                  ></el-input>
                </el-form-item>
              </el-form>

              <!-- Uz -->
              <el-form
                v-if="!isRussian"
                ref="ruleForm"
                :model="uzTitleForm"
                status-icon
                class="demo-ruleForm"
              >
                <el-form-item
                  :rules="[
                    {
                      required: true,
                      message: 'Пожалуйста введите название продукта',
                      trigger: 'blur',
                    },
                  ]"
                  label="Название *"
                  prop="name"
                >
                  <el-input
                    v-model="uzTitleForm.title"
                    type="text"
                    autocomplete="off"
                    placeholder="Product nomi"
                  ></el-input>
                </el-form-item>

                <el-form-item label="Модель" prop="model">
                  <el-input
                    v-model="uzTitleForm.model"
                    type="text"
                    autocomplete="off"
                    placeholder="Product modeli"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- Category -->
          <div class="cart__block">
            <h1 class="cart__block-title mb-[10px]">Информация о продукте</h1>
            <div
              id="category"
              class="flex items-center justify-between space-x-[10px]"
            >
              <el-form
                ref="categoryForm"
                :model="categoryForm"
                status-icon
                class="demo-ruleForm"
              >
                <el-form-item label="Категория *" prop="category">
                  <a-cascader
                    v-model="categoryForm.category"
                    :options="categories"
                    style="width: 100%"
                  >
                    <template
                      slot="displayRender"
                      slot-scope="{ selectedOptions }"
                    >
                      <span
                        v-for="option in selectedOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        <span @click="onChange">{{ option.label }} / </span>
                      </span>
                    </template>
                  </a-cascader>
                </el-form-item>
              </el-form>

              <button
                class="w-[35px] h-[35px] flex justify-center items-center rounded-lg bg-[#D4E9FF] hover:bg-blue transition-all duration-150 mt-[10px]"
                @click="isCategoryModal = true"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-plus"
                >
                  <path
                    d="M12 6V18M18 12L6 12"
                    stroke="#5899FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="flex flex-col">
            <LangComp @updateLang="setLang" />

            <div class="cart__block_lang">
              <h1 class="cart__block-title">Информация о продукте</h1>

              <!-- Ru -->
              <TextEditor v-if="isRussian" @content="getContent" />

              <!-- Uz -->
              <TextEditor v-if="!isRussian" @content="getContent" />
            </div>
          </div>

          <!-- Add / Cancel -->
          <div class="flex justify-end space-x-[20px]">
            <el-button
              type="danger"
              plain
              @click="$router.push('/catalog/products')"
              >Отмена</el-button
            >

            <button class="header__btn" @click="submitForm('ruleForm')">
              <img src="@/assets/img/icons/add.svg" alt="" />
              <span>Добавить продукт</span>
            </button>
          </div>
        </div>
      </div>

      <div class="w-4/12 2xl:w-3/12">
        <div
          class="flex flex-col space-y-[25px] py-[25px] 2xl:py-[30px] px-[20px] 2xl:px-[30px] rounded-lg bg-[#323d4e] mt-[45px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
        >
          <div class="flex flex-col space-y-[10px]">
            <div class="flex items-center space-x-[10px]">
              <span>Статус</span>
              <div
                :class="isGoodStatus ? 'bg-[#50cd89] ' : 'bg-[#f1416c]'"
                class="w-[10px] h-[10px] rounded-full"
              ></div>
            </div>

            <el-select
              v-model="status"
              placeholder="Активный"
              @change="isGoodStatus = !isGoodStatus"
            >
              <el-option
                v-for="item in statuses"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <span class="text-[#a1a5bf]">Установить статус продукта</span>
          </div>

          <div class="flex flex-col space-y-[13px]">
            <span>Бренд</span>

            <div id="card" class="flex items-center justify-between">
              <el-select v-model="brand" placeholder="----">
                <el-option
                  v-for="item in brands"
                  :key="item.id"
                  :label="item.name"
                  :value="item.slug"
                >
                </el-option>
              </el-select>

              <button
                class="w-[35px] h-[35px] flex justify-center items-center rounded-lg bg-[#D4E9FF] hover:bg-blue transition-all duration-150"
                @click="openBrandModal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-plus"
                >
                  <path
                    d="M12 6V18M18 12L6 12"
                    stroke="#5899FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Brand Modal -->
      <el-dialog
        title="Добавить брэнд"
        :visible.sync="isBrandModal"
        width="520px"
      >
        <el-form
          ref="brandForm"
          :model="brandForm"
          status-icon
          class="demo-ruleForm"
          action="#"
        >
          <el-form-item
            label="Название *"
            prop="title"
            :rules="[
              {
                required: true,
                message: 'Пожалуйста заполните это поле',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="brandForm.title"
              type="text"
              autocomplete="off"
              placeholder="Название продукта"
            ></el-input>
          </el-form-item>

          <!-- Image -->
          <div class="mt-[30px]">
            <el-upload
              v-model="brandForm.image"
              class="avatar-uploader"
              list-type="picture-card"
              :auto-upload="false"
              action="https://e-shop.ndc.uz/api/admin/files/upload"
              :on-change="handleFileChange"
            >
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
            <el-button type="danger" plain @click="isBrandModal = false"
              >Отмена</el-button
            >

            <el-button
              id="brand-btn"
              class="!flex !items-center !space-x-[7px] !py-[6px] !px-[18px] !rounded-lg !bg-blue"
              @click="addNewBrand()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
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

              <span class="font-semibold text-white">Добавить</span>
            </el-button>
          </div>
        </el-form>
      </el-dialog>

      <!-- Add Category Modal -->
      <el-dialog
        title="Добавить категорию"
        :visible.sync="isCategoryModal"
        width="520px"
      >
        <el-form
          ref="addCategoryForm"
          :model="addCategoryForm"
          status-icon
          class="demo-ruleForm"
          action="#"
        >
          <el-form-item
            v-model="addCategoryForm.title"
            label="Название категории *"
            prop="title"
            :rules="[
              {
                required: true,
                message: 'Пожалуйста заполните это поле',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="brandForm.title"
              type="text"
              autocomplete="off"
              placeholder="Название категории"
            ></el-input>
          </el-form-item>

          <el-form-item label="Выберите категорию" prop="category">
            <el-select v-model="addCategoryForm.atrtibute" placeholder="Select">
              <el-option
                v-for="item in categories"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Информация о категории" prop="description">
            <el-input
              v-model="addCategoryForm.description"
              type="textarea"
              autocomplete="off"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Описание..."
            ></el-input>
          </el-form-item>

          <div class="flex space-x-[30px]">
            <el-form-item label="Популярный" prop="popular">
              <el-switch v-model="addCategoryForm.isPopular"></el-switch>
            </el-form-item>

            <el-form-item label="Статус" prop="status">
              <el-switch v-model="addCategoryForm.status"></el-switch>
            </el-form-item>
          </div>

          <!-- <el-form-item
            label="Атрибуты"
            prop="status"
            :rules="[
              {
                required: true,
                message: 'Пожалуйста выберите атрибуты',
                trigger: 'blur',
              },
            ]"
          >
            <el-select
              v-model="addCategoryForm.atrtibute"
              multiple
              placeholder="Select"
            >
              <el-option
                v-for="item in attributes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Характеристическая группа"
            prop="status"
            :rules="[
              {
                required: true,
                message: 'Пожалуйста выберите атрибуты',
                trigger: 'blur',
              },
            ]"
          >
            <el-select
              v-model="addCategoryForm.characteristics"
              multiple
              placeholder="Select"
            >
              <el-option
                v-for="item in characteristics"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->

          <div class="mt-[30px]">
            <el-upload
              v-model="brandForm.image"
              class="avatar-uploader"
              list-type="picture-card"
              :auto-upload="false"
              action="https://e-shop.ndc.uz/api/admin/files/upload"
              :on-change="handleFileChange"
            >
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
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>

          <div
            class="flex justify-end space-x-[15px] mt-[30px] pt-[15px] border-t border-[#e8e8e8]"
          >
            <el-button type="danger" plain @click="isBrandModal = false"
              >Отмена</el-button
            >

            <el-button
              id="brand-btn"
              class="!flex !items-center !space-x-[7px] !py-[6px] !px-[18px] !rounded-lg !bg-blue"
              @click="addNewBrand()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
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

              <span class="font-semibold text-white">Добавить</span>
            </el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isRussian: true,
      isGoodStatus: true,
      isCategoryStatus: true,
      isBrandModal: false,
      isCategoryModal: false,
      array1: [],
      array: [
        {
          id: 1,
          name: '1',
          label: 'test',
          value: 1,
          children: null,
        },
      ],
      brand: '',
      newBrand: '',
      category: '',
      status: 'active',
      categoryStatus: 'inactive',
      ruTitleForm: {
        title: '',
        model: '',
      },
      uzTitleForm: {
        title: '',
        model: '',
      },
      categoryForm: {
        category: [],
      },
      addCategoryForm: {
        title: '',
        category: [],
        characteristics: [],
        description: '',
        isPopular: 0,
        status: 0,
        atrtibute: null,
      },
      brandForm: {
        title: '',
        image: null,
      },
      statuses: [
        {
          label: 'Активный',
          value: 'active',
        },
        {
          label: 'Неактивный',
          value: 'inactive',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Добавить продукт',
    }
  },
  computed: {
    brands() {
      return this.$store.state.brands?.brands
    },
    categories() {
      return this.recursive(this.$store.state.categories?.categories.data)
    },
    attributes() {
      return this.$store.state.attributes?.attributes
    },
    characteristics() {
      return this.$store.state.characteristics?.characteristics
    },
  },
  watch: {
    brands() {
      this.$store.dispatch('fetchBrands')
    },
    // categories() {
    //   this.$store.dispatch('fetchCategories')
    // },
  },
  mounted() {
    this.$store.dispatch('fetchBrands')
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchAttributes')
    this.$store.dispatch('fetchCharacteristics')
  },
  methods: {
    recursive(data) {
      return data?.map((el) => {
        return {
          label: el.name.ru,
          value: el.id,
          children: el.children ? this.recursive(el.children) : [],
        }
      })
    },

    setLang(val) {
      this.isRussian = val
    },

    openBrandModal() {
      this.isBrandModal = true
    },

    handleRemove(file) {
      console.log(file)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
    },

    handleDownload(file) {
      console.log(file)
    },

    cancelAdding() {},

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    async addNewBrand() {
      if (this.brandForm.title !== '') {
        try {
          const response = await this.$axiosURL.post('/brands', {
            name: this.brandForm.title,
            logo: this.brandForm.image,
            is_top: 0,
          })

          if (response) {
            this.isBrandModal = false

            this.$notify({
              title: 'Success',
              message: 'Брэнд успешно добавлен',
              type: 'success',
            })
          }

          console.log(response)
        } catch (error) {
          throw Error
        }
      }
    },

    getContent(cont) {},

    onChange(value) {
      console.log(value)
    },

    async handleFileChange(file, fileList) {
      this.loading = true
      const actualFile = file.raw

      if (!actualFile) {
        console.error('No file to upload')
        return
      }

      const formData = new FormData()
      formData.append('file', actualFile)

      try {
        const response = await this.$axiosURL.post('/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log('Upload successful:', response.data)
        this.brandForm.image = response.data.path
        console.log('1', this.brandForm.image)
      } catch (error) {
        console.error('Upload error:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>
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
