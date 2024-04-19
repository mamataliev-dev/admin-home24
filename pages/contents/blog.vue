<template>
  <div>
    <LoadingModal :is-loading="loading" />

    <div class="header">
      <div class="header__block">
        <h1 class="header__title">Блог</h1>

        <div class="flex space-x-[30px]">
          <button class="header__btn" @click="isBrandModal = true">
            <img src="@/assets/img/icons/add.svg" alt="" />
            <span>Добавить</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-[30px]">
      <table class="table__container">
        <thead class="table__thead">
          <tr>
            <th class="table__tr_border-l text-start w-[100px]">ID</th>
            <th class="table__tr text-start">ЗОГОВОЛОК</th>
            <th class="table__tr text-center">ДАТА</th>
            <th class="table__tr_border-r text-end pr-[40px]">ДЕЙСТВИЯ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in blogs" :key="index" class="tbody_tr">
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
                  class="img-box w-[50px] h-[50px] rounded-lg"
                  :src="item.md_img || require('@/assets/img/png/empty.png')"
                  alt=""
                />

                <span class="font-semibold text-[17px]">{{
                  item.title.ru
                }}</span>
              </div>
            </td>

            <!-- Date -->
            <td class="tbody__td flex justify-center">
              <span class="font-semibold text-blue">{{
                formatDate(item.created_at)
              }}</span>
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

                  <button @click="removeBlog(item.id)">
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
    <!-- <el-dialog
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
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      isPopular: null,
      blogs: null,
    }
  },
  head() {
    return {
      title: 'Блог',
    }
  },
  mounted() {
    this.fetchBlogs()
  },
  methods: {
    async fetchBlogs() {
      this.loading = true
      try {
        const response = await this.$axiosURL.get('/posts')
        this.blogs = response.data.posts.data
      } catch (error) {
        throw Error
      } finally {
        this.loading = false
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

    handleRemove(file) {
      console.log(file)
    },

    editProduct() {},

    async removeBlog(id) {
      try {
        const response = await this.$axiosURL.delete(`/posts/${id}`)

        if (response) {
          this.$notify({
            title: 'Success',
            message: 'Блог успешно удален',
            type: 'success',
          })

          this.fetchBlogs()
        }
      } catch (error) {
        throw Error
      }
    },
  },
}
</script>

<style>
.el-dialog__header {
}
</style>
