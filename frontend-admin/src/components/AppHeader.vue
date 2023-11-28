<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav d-flex justify-content-between" style="width: 100%; margin: 30px;">
        <div class="d-flex">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">
              Cầu thủ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'user' }" class="nav-link">
              Người dùng
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'cart' }" class="nav-link">
              Hàng hóa
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'coin' }" class="nav-link">
              Nạp thẻ
            </router-link>
          </li>
        </div>
        <div>
          <li class="nav-item" @click="logout">
            <button @click="logout" class="btn btn-outline-danger">Đăng xuất</button>
          </li>
        </div>


      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("adminToken");
      this.$router.push({ name: "login" });
    },
  }
};
</script>