<template>
  <div class="page">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="input-group  mb-3">
        <span class="input-group-text" for="username">Username:</span>
        <input type="text" id="username" v-model="adminname" class="form-control" required>
      </div>
      <div class="input-group  mb-3">
        <span class="input-group-text" for="password">Password:</span>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <!-- <div class="input-group  mb-3">
        <p>Bạn chưa có tài khoản?</p><button type="button" class="btn btn-link" @click="register">Đăng ký</button>
    </div> -->
  </div>
</template>
<script>
import AdminService from '../services/admin.service'
export default {
  name: 'LoginPage',
  data() {
    return {
      adminname: "",
      password: "",
      error: null,
      users: null,
    };
  },
  methods: {
    // register() {
    //   this.$router.push({ name: "register" });
    // },
    
    async getUser() {
      try {
        this.users = await AdminService.getAll();
      } catch (e) {
        console.log(e);
      }
    },
    async login() {
      await this.getUser();
      let foundUser = this.users.find(user => {
        return this.adminname === user.adminname && this.password === user.password;
      });
        if (foundUser) {
          localStorage.setItem("adminToken", foundUser._id);
          this.$router.push({ name: "home" });
          return;
        } else {
          console.log('Sai');
        }
    },
  },
};
</script>
  
<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}
</style>