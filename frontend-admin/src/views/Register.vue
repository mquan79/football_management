<template>
    <div class="page">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div class="input-group">
                <span class="input-group-text" for="adminname"> Username:</span>
                <input type="text" id="adminname" v-model="users.adminname" class="form-control" required>
            </div>
            <div class="box"></div>
            <div class="input-group">
                <span class="input-group-text" for="password">Password:</span>
                <input type="password" id="password" v-model="users.password" class="form-control" required>
            </div>
            <div class="box"></div>
            <div class="input-group">
                <span class="input-group-text" for="name"> Name:</span>
                <input type="text" id="name" v-model="users.name" class="form-control" required>
            </div>
            <div class="box"></div>
            <div class="input-group">
                <span class="input-group-text" for="birthday"> Birthday:</span>
                <input type="date" id="birthday" v-model="users.birthday" class="form-control" required>
            </div>
            <div class="box"></div>
            <div class="input-group">
                <span class="input-group-text" for="email">Email:</span>
                <input type="text" id="email" v-model="users.email" class="form-control" required>
            </div>
            <div class="box"></div>
            <div class="input-group">
                <span class="input-group-text" for="phone">Phone:</span>
                <input type="text" id="phone" v-model="users.phone" class="form-control" required>
            </div>
            <div class="box"></div>
            <div class="input-group">
                <span class="input-group-text" for="address">address:</span>
                <input type="text" id="address" v-model="users.address" class="form-control" required>
            </div>
            <div class="box"></div>
            <div class="input-group">
                <span class="input-group-text" for="password">Confirm Password:</span>
                <input type="password" id="comfirmpassword" v-model="comfirmpassword" class="form-control" required>
            </div>
            <div class="box"></div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <div class="input-group">
            <p>Bạn đã có tài khoản</p><button class="btn btn-link" @click="login">Đăng nhập</button>
        </div>
    </div>
</template>
<script>
import AdminService from '../services/admin.service'
export default {
    name: 'RegisterPage',
    data() {
        return {
            comfirmpassword: "",
            error: null,
            users: {
                adminname: '',
                password: '',
                name: '',
                phone: '',
                address: '',
                birthday: '',
                email: ''
            },
        };
    },
    methods: {
        login() {
            this.$router.push({ name: "login" });
        },
        async register() {
            this.comfirmpassword = ''
            try {
                await this.createUser(this.users);
            } catch (e) {
                console.log(e);
            }
        },

        async createUser(users) {
            try {
                this.users = await AdminService.create(users);
                this.$router.push({ name: "login" });
            } catch (e) {
                console.log(e);
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
.box{
    margin: 20px;
}
</style>