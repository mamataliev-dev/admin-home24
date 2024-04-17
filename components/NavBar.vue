<template>
  <div class="my-nav fixed top-0 flex bg-navbar">
    <nav
      class="navbar py-[13px] px-[30px] w-full shadow-lg"
      style="
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
      "
    >
      <el-dropdown>
        <span class="el-dropdown-link">
          <button class="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="SVGID_1__O9K5DaypaVKw_gr1"
                x1="15.002"
                x2="33.584"
                y1="41.506"
                y2="5.353"
                gradientTransform="matrix(1 0 0 -1 0 48)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#5961c3"></stop>
                <stop offset="1" stop-color="#3a41ac"></stop>
              </linearGradient>
              <path
                fill="url(#SVGID_1__O9K5DaypaVKw_gr1)"
                d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
              ></path>
              <linearGradient
                id="SVGID_00000074414934000668274890000002924421020169008045__O9K5DaypaVKw_gr2"
                x1="21.13"
                x2="26.832"
                y1="36.076"
                y2="22.02"
                gradientTransform="matrix(1 0 0 -1 0 48)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#a6acfc"></stop>
                <stop offset=".287" stop-color="#a0a7fa"></stop>
                <stop offset=".651" stop-color="#9198f4"></stop>
                <stop offset="1" stop-color="#7b83eb"></stop>
              </linearGradient>
              <circle
                cx="24"
                cy="19"
                r="8"
                fill="url(#SVGID_00000074414934000668274890000002924421020169008045__O9K5DaypaVKw_gr2)"
              ></circle>
              <linearGradient
                id="SVGID_00000088107406268489966270000012685801071366973886__O9K5DaypaVKw_gr3"
                x1="21.686"
                x2="25.267"
                y1="17.864"
                y2="4.007"
                gradientTransform="matrix(1 0 0 -1 0 48)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#a6acfc"></stop>
                <stop offset=".287" stop-color="#a0a7fa"></stop>
                <stop offset=".651" stop-color="#9198f4"></stop>
                <stop offset="1" stop-color="#7b83eb"></stop>
              </linearGradient>
              <path
                fill="url(#SVGID_00000088107406268489966270000012685801071366973886__O9K5DaypaVKw_gr3)"
                d="M24,44c5,0,9.6-1.9,13.1-4.9	C35.1,33.8,30,30,24,30s-11.1,3.8-13.1,9.1C14.4,42.1,19,44,24,44z"
              ></path>
            </svg>
          </button>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="logOut">
            <span>Log out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    async logOut() {
      try {
        const response = await this.axiosURL.post('/auth/logout', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: end;
}

.my-nav {
  /* width: calc(100vw + 192px) !important; */
  width: 100vw;
  /* margin-left: 92px; */
  z-index: 1000000;
}
</style>
