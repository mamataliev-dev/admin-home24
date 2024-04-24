<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Брэнды</h1>

        <div class="flex space-x-[30px]">
          <form
            class="relative flex justify-end space-x-[20px]"
            @submit.prevent
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

          <button class="header__btn" @click="isBrandModal = true">
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
          <tr v-for="(item, index) in brands" :key="index" class="tbody_tr">
            <!-- Index -->
            <td
              class="last:rounded-bl-2xl tbody__td table__tr_border-b text-textGray font-medium pl-[30px]"
            >
              #{{ ++index }}
            </td>

            <!-- Brand -->
            <td class="tbody__td">
              <div class="flex items-center space-x-[15px]">
                <img
                  class="img-box w-[40px] h-[40px] rounded-lg"
                  :src="item.md_logo || require('@/assets/img/png/empty.png')"
                  alt=""
                />
                <span class="font-semibold">{{ item.name }}</span>
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
                    @click="
                      editBrand(item.id, item.name, item.md_logo, item.slug)
                    "
                  >
                    <img src="@/assets/img/icons/edit.svg" alt="" />
                  </button>

                  <button @click="removeBrand(item.id)">
                    <img src="@/assets/img/icons/trash.svg" alt="" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mt-[30px]">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1"
          :page-size="1"
          @current-change="handlePageChange"
        >
        </el-pagination>
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

        <el-form-item label="Популярный" prop="title">
          <el-switch v-model="brandForm.isPopular" class="w-full"></el-switch>
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

            <span class="font-semibold text-white">Добавить</span>
          </el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- Edit Brand Modal -->
    <el-dialog
      title="Добавить брэнд"
      :visible.sync="isEditBrandModal"
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
            v-model="editBrandData.name"
            type="text"
            autocomplete="off"
            placeholder="Название продукта"
          ></el-input>
        </el-form-item>

        <el-form-item label="Популярный" prop="title">
          <el-switch
            v-model="editBrandData.isPopular"
            class="w-full"
          ></el-switch>
        </el-form-item>

        <!-- Image -->
        <div class="mt-[30px]">
          <el-upload
            class="avatar-uploader"
            list-type="picture-card"
            :file-list="fileList"
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
          <el-button type="danger" plain @click="isEditBrandModal = false"
            >Отмена</el-button
          >

          <el-button
            id="brand-btn"
            class="!flex !items-center !space-x-[7px] !py-[6px] !px-[18px] !rounded-lg !bg-blue"
            @click="updateBrand()"
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

            <span class="font-semibold text-white">Добавить</span>
          </el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- Image Privew Modal -->
    <el-dialog id="preview" :visible.sync="isPreviewModal" width="40%">
      <img
        :src="previewImage"
        alt="Preview"
        style="width: 100%; height: auto"
      />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      brands: null,
      isEditBrandModal: false,
      isPreviewModal: false,
      isCorfirmModal: false,
      dialogImageUrl: '',
      dialogVisible: false,
      previewImage: '',
      pagination: {
        total: 0,
        per_page: 16,
        current_page: 1,
      },
      fileList: [],
      editBrandData: {
        id: '',
        name: '',
        img: '',
        slug: '',
        isPopular: true,
      },
      disabled: false,
      query: '',
      brandForm: {
        title: '',
        image: null,
        isPopular: false,
      },
      isBrandModal: false,
    }
  },
  head() {
    return {
      title: 'Брэнды',
    }
  },
  computed: {},
  mounted() {
    this.fetchBrands()
  },
  methods: {
    async fetchBrands() {
      this.loading = true

      try {
        const response = await this.$axiosURL.get('/brands/all')

        this.brands = response.data.brands

        console.log(response.data)

        this.pagination = {
          total: response.data.total,
          per_page: response.data.per_page,
          current_page: response.data.current_page,
        }
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
      }
    },

    handlePageChange() {
      this.$router.push({
        query: {
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        },
      })
    },

    async updateBrand() {
      try {
        const response = await this.$axiosURL.put(
          `/brands/${this.editBrandData.id}`,
          {
            name: this.editBrandData.name,
            logo: this.editBrandData.img,
            slug: this.editBrandData.slug,
            is_top: this.editBrandData.isPopular,
          }
        )

        if (response) {
          this.isEditBrandModal = false
          this.$notify({
            title: 'Success',
            message: 'Брэнд успешно обновлен',
            type: 'success',
          })
          this.$store.dispatch('fetchBrands')
        }
      } catch (error) {
        console.log(error)
      }
    },

    editBrand(id, name, img, slug) {
      this.isEditBrandModal = true

      this.editBrandData = {
        id,
        name,
        img,
        slug,
        isPopular: true,
      }

      this.fileList = [
        {
          name: 'brand-image',
          url: img,
          status: 'finished',
        },
      ]
    },

    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      if (index !== -1) {
        this.fileList.splice(index, 1)
      }

      this.editBrandData.img = ''
    },

    async handleFileChange(file) {
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

        this.brandForm.image = response.data.path
      } catch (error) {
        console.error('Upload error:', error)
      } finally {
        this.loading = false
      }
    },

    async addNewBrand() {
      if (this.brandForm.title !== '') {
        try {
          const response = await this.$axiosURL.post('/brands', {
            name: this.brandForm.title,
            logo: this.brandForm.image,
            is_top: this.brandForm.isPopular,
          })

          if (response) {
            this.isBrandModal = false

            this.$notify({
              title: 'Success',
              message: 'Брэнд успешно добавлен',
              type: 'success',
            })

            this.fetchBrands()
          }
        } catch (error) {
          throw Error
        }
      }
    },

    async removeBrand(id) {
      try {
        const response = await this.$axiosURL.delete(`/brands/${id}`)

        if (response) {
          this.$notify({
            title: 'Success',
            message: 'Брэнд успешно Удален',
            type: 'success',
          })

          this.fetchBrands()
        }
      } catch (error) {
        console.log(error)
      }
    },

    handlePictureCardPreview(file) {
      this.previewImage = file.url
      this.isPreviewModal = true
    },
  },
}
</script>
