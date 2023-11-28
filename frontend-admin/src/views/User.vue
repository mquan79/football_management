<template>
  <div class="page">
    <AppHeader />
    <!-- <button @click="startAdding" class="btn btn-primary mt-3">Thêm</button> -->
    <button @click="startSearch" class="btn btn-secondary ml-2 mt-3">Tìm kiếm</button>

    <div v-if="isAdding" class="mt-3">
      <form @submit.prevent="addOrUpdateUser">
          <div class="input-group">
            <span class="input-group-text" for="newUser.name">Tên người dùng:</span>
            <input v-model="newUser.name" type="text" id="newUser.name" required class="form-control" />
          </div>
          <div class="input-group">
            <span class="input-group-text" for="newUser.username">Tài khoản:</span>
            <input v-model="newUser.username" type="text" id="newUser.username" required class="form-control" />
            <span class="input-group-text" for="newUser.birthday">birthday:</span>
            <input v-model="newUser.birthday" type="date" id="newUser.birthday" required class="form-control" />
          </div>
          <!-- <div class="input-group">
            <span class="input-group-text" for="newUser.password">Mật khẩu:</span>
            <input v-model="newUser.password" type="password" id="newUser.password" required class="form-control" />
            <span class="input-group-text" for="confirmPass">Xác nhận mật khẩu:</span>
            <input v-model="confirmPass" type="password" id="confirmPass" required class="form-control" />
          </div> -->
          <div class="input-group">
            <span class="input-group-text" for="newUser.email">Email:</span>
            <input v-model="newUser.email" type="email" id="newUser.email" required class="form-control" />
            <span class="input-group-text" for="newUser.phone">Số điện thoại:</span>
            <input v-model="newUser.phone" type="tel" id="newUser.phone" required class="form-control" />
          </div>
          <div class="input-group">
            <span class="input-group-text" for="newUser.address">Địa chỉ:</span>
            <input v-model="newUser.address" type="text" id="newUser.address" required class="form-control" />
          </div>
          <button type="submit" class="btn btn-success">{{ editingIndex === null ? 'Thêm' : 'Lưu' }}</button>
          <button @click="cancelAdding" class="btn btn-danger ml-2">Hủy</button>
        </form>
      </div>
  
      <div v-if="isSearch" class="mt-3">
        <div class="input-group">
          <span class="input-group-text" for="searchInput">Tìm kiếm theo tên:</span>
          <input v-model="searchText" type="text" id="searchInput" @input="searchUsers" class="form-control" />
        </div>
        <button @click="cancelSearch" class="btn btn-secondary">Hủy</button>
      </div>
  
      <div v-for="(user, index) in filteredUsers" :key="index" class="mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ user.name }}</h5>
            <button @click="editUser(index)" class="btn btn-outline-success">Sửa</button>
            <!-- <button @click="deleteUser(user._id)" class="btn btn-outline-danger ml-2">Xóa</button> -->
            <button @click="viewDetails(user._id)" class="btn btn-outline-primary ml-2">Xem</button>
  
            <div v-if="selectedUserId === user._id" class="mt-3">
              <p class="mb-1">Tên: {{ user.name }}</p>
              <p class="mb-1">Xếp hạng: {{ user.rank }}</p>
              <p class="mb-1">Coin còn lại: {{ user.money }}</p>
            </div>
            
            <div v-if="selectedUserId === user._id" class="mt-3">
            <SquadInfo :idUser="selectedUserId" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
<script>
import UsersService from '../services/user.service'
import AppHeader from "@/components/AppHeader.vue";
import SquadInfo from '@/components/SquadInfo.vue'
export default {
    name: 'UserPage',
    components: {
        SquadInfo,
        AppHeader
    },
    data() {
        return {
            users: null,
            isAdding: false,
            newUser: {
                username: '',
                password: '',
                name: '',
                phone: '',
                address: '',
                birthday: '',
                email: ''
            },
            editingIndex: null,
            selectedUserId: null,
            searchText: '',
            isSearch: false,
            confirmPass: '',
        };
    },
    computed: {
        filteredUsers() {
            if (!this.searchText) {
                return this.users;
            } else {
                const searchTextLower = this.searchText.toLowerCase();
                return this.users.filter(user =>
                    (this.searchText === '' || user.name.toLowerCase().includes(searchTextLower))
                );
            }
        },
    },
    methods: {
        logout() {
            localStorage.removeItem("userToken");
            this.$router.push({ name: "login" });
        },

        async getUsers() {
            try {
                this.users = await UsersService.getAll();
                console.log("Users data:", this.users.length);
            } catch (e) {
                console.error("Error fetching users:", e);
            }
        },

        editUser(index) {
            this.editingIndex = index;
            this.newUser = {
                username: this.users[index].username,
                password: this.users[index].password,
                name: this.users[index].name,
                phone: this.users[index].phone,
                address: this.users[index].address,
                birthday: this.users[index].birthday,
                email: this.users[index].email
            }
            this.isAdding = true;
        },

        // async deleteUser(id) {
        //     try {
        //         await UsersService.delete(id);
        //         console.log("Xóa thành công");
        //         this.getUsers();
        //     } catch (error) {
        //         console.error("Lỗi khi xóa người dùng:", error);
        //     }
        // },

        startAdding() {
            this.editingIndex = null;
            this.isAdding = true;
            this.newUser = {
                username: '',
                password: '',
                name: '',
                phone: '',
                address: '',
                birthday: '',
                email: ''
            };
        },

        cancelAdding() {
            this.editingIndex = null;
            this.isAdding = false;
            this.newUser = {
                username: '',
                password: '',
                name: '',
                phone: '',
                address: '',
                birthday: '',
                email: ''
            };
        },

        async addOrUpdateUser() {
            const newUser = {
                username: this.newUser.username,
                password: this.newUser.password,
                name: this.newUser.name,
                phone: this.newUser.phone,
                address: this.newUser.address,
                birthday: this.newUser.birthday,
                email: this.newUser.email
            };

            if (this.editingIndex === null) {
                try {
                    await UsersService.create(newUser);
                    console.log("Thêm thành công:", newUser.name);
                    this.cancelAdding();
                    this.getUsers();
                } catch (error) {
                    console.error("Lỗi khi thêm người dùng:", error);
                }
            } else {
                const id = this.users[this.editingIndex]._id;
                try {
                    await UsersService.update(id, newUser);
                    console.log("Sửa thành công:", newUser.name);
                    this.cancelAdding();
                    this.getUsers();
                } catch (error) {
                    console.error("Lỗi khi sửa người dùng:", error);
                }
            }
        },

        viewDetails(userId) {
            this.selectedUserId = this.selectedUserId === userId ? null : userId;
        },

        startSearch() {
            this.isSearch = true;
        },

        cancelSearch() {
            this.isSearch = false;
            this.searchText = '';
            this.minPrice = null;
            this.maxPrice = null;
        },
    },
    mounted() {
        this.getUsers();
    },
};
</script>
  
<style scoped></style>
  