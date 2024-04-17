export const state = () => ({
  brands: null,
  categories: null,
  attributes: null,
  characteristics: null,
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
}

export const actions = {
  // Get Brands
  async fetchBrands({ commit }) {
    try {
      const response = await this.$axiosURL.get('/brands/all')
      commit('setBrands', response.data)
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

  // Get Attributes
  async fetchAttributes({ commit }) {
    try {
      const response = await this.$axiosURL.get('/attributes/all')
      commit('setAttributes', response.data)
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
}

export const getters = {}
