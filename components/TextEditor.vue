<template>
  <div class="pt-[10px]">
    <div id="toolbar">
      <select class="ql-size">
        <option value="small">Small</option>
        <option selected>Normal</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>

      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
      <button class="ql-code-block"></button>
      <button @click="triggerFileInput">
        <svg viewBox="0 0 18 18">
          <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
          <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
          <polyline
            class="ql-even ql-fill"
            points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
          ></polyline>
        </svg>
      </button>
      <input
        ref="fileInput"
        type="file"
        hidden
        accept="image/jpeg, image/png"
        @change="handleFileUpload"
      />
    </div>

    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOptions"
      @input="updateContent"
    ></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: { quillEditor },
  data() {
    return {
      content: '',
      editorOptions: {
        modules: {
          toolbar: '#toolbar',
        },
        placeholder: 'Start typing...',
      },
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const range = this.$refs.myQuillEditor.quill.getSelection()
          const index = range
            ? range.index
            : this.$refs.myQuillEditor.quill.getLength()
          this.$refs.myQuillEditor.quill.insertEmbed(
            index,
            'image',
            e.target.result
          )
          this.$refs.myQuillEditor.quill.setSelection(index + 1)
        }
        reader.readAsDataURL(file)
      }
    },

    updateContent() {
      this.$emit('content', this.content)
    },
  },
}
</script>

<style>
.ql-snow .ql-stroke {
  stroke: white !important;
}

.ql-snow .ql-fill {
  stroke: white !important;
}

.ql-snow .ql-picker {
  color: white !important;
}

.ql-container.ql-snow {
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
}

.ql-toolbar.ql-snow {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  border: 0.1px solid white !important;
}

.ql-editor.ql-blank::before {
  color: #c0c4cc !important;
}

.ql-container {
  height: 200px !important;
  border: 0.1px solid white !important;
}

.ql-picker-item {
  color: #1b2431 !important;
}
</style>
