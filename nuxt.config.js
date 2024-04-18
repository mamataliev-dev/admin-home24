export default {
  ssr: false,

  head: {
    title: 'home24-admin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/logo.svg',
      },
    ],
  },

  css: ['@/assets/main.css'],

  plugins: [
    { src: '@/plugins/element-ui', ssr: false },
    '@/plugins/base-url',
    '@/plugins/ant-ui',
    '~/plugins/draggable.js',
    {
      src: '~/plugins/vue-quill-editor',
      ssr: false,
    },
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/axios'],

  server: {
    host: 'localhost',
    port: 8000,
  },

  // router: {
  //   middleware: ['auth'],
  // },

  build: {},
}
