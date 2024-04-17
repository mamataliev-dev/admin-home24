export default function ({ $axios, redirect, error }, inject) {
  const axiosURL = $axios.create({
    baseURL: process.env.BASE_URL || 'https://e-shop.ndc.uz/api/admin/',
  })

  axiosURL.onRequest((config) => {
    const token = localStorage.getItem('admin-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  axiosURL.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    if (code === 500) {
      redirect('/error')
    } else if (code === 401) {
      redirect('/login')
    }

    error({ statusCode: code, message: err.message })
  })

  inject('axiosURL', axiosURL)
}
