export const state = () => ({
  brands: null,
  categories: null,
  attributes: null,
  characteristics: null,
  orders: [],
  ordersCounts: null,
})

export const mutations = {
  setBrands(state, value) {
    state.brands = value
  },

  setCategories(state, value) {
    state.categories = value
  },

  setAttributes(state, value) {
    state.attributes = value
  },

  setCharacteristics(state, value) {
    state.characteristics = value
  },

  setOrders(state, value) {
    state.orders = value
  },

  setOrdersCounts(state, value) {
    state.ordersCounts = value
  },
}

export const actions = {
  // Get Brands
  async fetchBrands({ commit }) {
    try {
      const response = await this.$axiosURL.get('/brands/all')
      commit('setBrands', response.data.brands)
      console.log('store brands: ', response.data.brands)
    } catch (error) {
      throw Error
    }
  },

  // Get Categories
  async fetchCategories({ commit }) {
    try {
      const response = await this.$axiosURL.get('/categories')
      commit('setCategories', response.data)
    } catch (error) {
      throw Error
    }
  },

  // Get Attributdes
  async fetchAttributes({ commit }) {
    try {
      const response = await this.$axiosURL.get('/attributes/all')
      commit('setAttributes', response.data.attributes)
    } catch (error) {
      throw Error
    }
  },

  // Get Characteristics
  async fetchCharacteristics({ commit }) {
    try {
      const response = await this.$axiosURL.get('/characteristics/all')
      commit('setCharacteristics', response.data)
    } catch (error) {
      throw Error
    }
  },

  // Get Orders
  async fetchOrders({ commit }) {
    try {
      const response = await this.$axiosURL.get('/orders')
      commit('setOrders', response.data.orders.data)
    } catch (error) {
      throw Error
    }
  },

  // Get Orders Counts
  async fetchOrdersCounts({ commit }, state) {
    try {
      const response = await this.$axiosURL.get('/orders/counts')
      commit('setOrdersCounts', response.data.counts)
    } catch (error) {
      throw Error
    }
  },
}

export const getters = {}
