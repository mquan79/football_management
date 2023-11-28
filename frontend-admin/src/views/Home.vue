<template>
  <div class="page">
    <AppHeader />

    <div class="container mt-3">
      <div class="mb-3">
        <button @click="startAdding" class="btn btn-primary">Thêm</button>
        <button @click="startSearch" class="btn btn-secondary ml-2">Tìm kiếm</button>
      </div>

      <div v-if="isAdding" class="mb-3">
        <form @submit.prevent="addOrUpdateGood">
          <div class="input-group mb-3">
            <span class="input-group-text" for="newGood.name">Tên:</span>
            <input v-model="newGood.name" type="text" id="newGood.name" required class="form-control" />
            <span class="input-group-text" for="newGood.price">Giá:</span>
            <input v-model="newGood.price" type="number" id="newGood.price" required class="form-control" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" for="newGood.img">Hình ảnh:</span>
            <input v-model="newGood.img" type="text" id="newGood.img" required class="form-control" />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" for="newGood.point">Điểm:</span>
            <input v-model="newGood.point" type="number" id="newGood.point" required class="form-control" />
            <span class="input-group-text" for="newGood.position">Vị trí:</span>
            <select v-model="newGood.position" id="newGood.position" class="form-select" required>
              <option value="FW">FW</option>
              <option value="MF">MF</option>
              <option value="DF">DF</option>
              <option value="GK">GK</option>
            </select>
          </div>

          <div class="input-group">
            <span class="input-group-text" for="newGood.pac">PAC:</span>
            <input v-model="newGood.pac" type="number" id="newGood.pac" required class="form-control" />
            <span class="input-group-text" for="newGood.sho">SHO:</span>
            <input v-model="newGood.sho" type="number" id="newGood.sho" required class="form-control" />
            <span class="input-group-text" for="newGood.pas">PAS:</span>
            <input v-model="newGood.pas" type="number" id="newGood.pas" required class="form-control" />
            <span class="input-group-text" for="newGood.dri">DRI:</span>
            <input v-model="newGood.dri" type="number" id="newGood.dri" required class="form-control" />
            <span class="input-group-text" for="newGood.def">DEF:</span>
            <input v-model="newGood.def" type="number" id="newGood.def" required class="form-control" />
            <span class="input-group-text" for="newGood.phy">PHY:</span>
            <input v-model="newGood.phy" type="number" id="newGood.phy" required class="form-control" />
          </div>

          <button type="submit" class="btn btn-success">{{ editingIndex === null ? 'Thêm' : 'Lưu' }}</button>
          <button @click="cancelAdding" class="btn btn-danger ml-2">Hủy</button>
        </form>
      </div>

      <div v-if="isSearch" class="mb-3">
        <div class="input-group mb-3">
          <span class="input-group-text" for="searchInput">Tìm kiếm theo tên:</span>
          <input v-model="searchText" type="text" id="searchInput" @input="searchGoods" class="form-control" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" for="minPrice">Giá tối thiểu:</span>
          <input v-model.number="minPrice" type="number" id="minPrice" @input="filterByPrice" class="form-control" />
          <span class="input-group-text" for="maxPrice">Giá tối đa:</span>
          <input v-model.number="maxPrice" type="number" id="maxPrice" @input="filterByPrice" class="form-control" />
        </div>

        <button @click="cancelSearch" class="btn btn-secondary">Hủy</button>
      </div>

      <div v-for="(good, index) in filteredGoods" :key="index" class="mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ good.name }}</h5>

            <img :src="good.img" alt="Product Image" class="img-fluid mb-2" style="max-width: 70%;" />
            <div class="button">
              <button @click="editGood(index)" class="btn btn-info">Sửa</button>
              <button @click="deleteGood(good._id)" class="btn btn-danger ml-2">Xóa</button>
              <button @click="viewDetails(good._id)" class="btn btn-primary ml-2">Xem</button>
            </div>
            <div v-if="selectedProductId === good._id">
              <p class="mt-3">Giá: {{ good.price }}</p>
              <p class="mt-3">OVR: {{ good.ovr }}</p>
              <p class="mt-3">Điểm: {{ good.point }}</p>
              <p class="mt-3">Vị trí: {{ good.position }}</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>


<script>
import GoodsService from '../services/goods.service'
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: 'HomePage',
  data() {
    return {
      goods: null,
      isAdding: false,
      newGood: {
        name: '',
        price: '',
        img: '',
        ovr: '',
        point: '',
        position: '',
        pac: '',
        sho: '',
        pas: '',
        dri: '',
        def: '',
        phy: ''
      },
      editingIndex: null,
      selectedProductId: null,
      searchText: '',
      minPrice: null,
      maxPrice: null,
      isSearch: false
    };
  },
  computed: {
    filteredGoods() {
      if (!this.searchText && this.minPrice === null && this.maxPrice === null) {
        return this.goods;
      } else {
        const searchTextLower = this.searchText.toLowerCase();
        return this.goods.filter(good =>
          (this.searchText === '' || good.name.toLowerCase().includes(searchTextLower)) &&
          (this.minPrice === null || good.price >= this.minPrice) &&
          (this.maxPrice === null || good.price <= this.maxPrice)
        );
      }
    },
  },
  components: {
    AppHeader,
  },
  methods: {
    logout() {
      localStorage.removeItem("userToken");
      this.$router.push({ name: "login" });
    },

    async getGoods() {
      try {
        this.goods = await GoodsService.getAll();
        console.log("Goods data:", this.goods.length);
      } catch (e) {
        console.error("Error fetching goods:", e);
      }
    },

    editGood(index) {
      this.editingIndex = index;
      this.newGood = {
        name: this.goods[index].name,
        price: this.goods[index].price,
        img: this.goods[index].img,
        ovr: this.goods[index].ovr,
        point: this.goods[index].point,
        position: this.goods[index].position,
        pac: this.goods[index].pac,
        sho: this.goods[index].sho,
        pas: this.goods[index].pas,
        dri: this.goods[index].dri,
        def: this.goods[index].def,
        phy: this.goods[index].phy
      }
      this.isAdding = true;
    },

    async deleteGood(id) {
      try {
        await GoodsService.delete(id);
        console.log("Xóa thành công");
        this.getGoods();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    },

    startAdding() {
      this.editingIndex = null;
      this.isAdding = true;
      this.newGood = {
        name: '',
        price: '',
        img: '',
        ovr: '',
        point: '',
        position: '',
        pac: '',
        sho: '',
        pas: '',
        dri: '',
        def: '',
        phy: ''
      };
    },

    cancelAdding() {
      this.editingIndex = null;
      this.isAdding = false;
      this.newGood = {
        name: '',
        price: '',
        img: '',
        ovr: '',
        point: '',
        position: '',
        pac: '',
        sho: '',
        pas: '',
        dri: '',
        def: '',
        phy: ''
      };
    },


    async addOrUpdateGood() {
      let ovr;
      if (this.newGood.position === 'FW') {
        ovr = (parseFloat(this.newGood.pac) * 3 + parseFloat(this.newGood.sho) * 3 + parseFloat(this.newGood.pas) + parseFloat(this.newGood.dri) + parseFloat(this.newGood.def) + parseFloat(this.newGood.phy)) / 10;
      } else if (this.newGood.position === 'MF') {
        ovr = (parseFloat(this.newGood.pac) + parseFloat(this.newGood.sho) + parseFloat(this.newGood.pas) * 3 + parseFloat(this.newGood.dri) * 3 + parseFloat(this.newGood.def) + parseFloat(this.newGood.phy)) / 10;
      } else if (this.newGood.position === 'DF') {
        ovr = (parseFloat(this.newGood.pac) + parseFloat(this.newGood.sho) + parseFloat(this.newGood.pas) + parseFloat(this.newGood.dri) + parseFloat(this.newGood.def) * 3 + parseFloat(this.newGood.phy) * 3) / 10;
      } else {
        ovr = (parseFloat(this.newGood.pac) + parseFloat(this.newGood.sho) + parseFloat(this.newGood.pas) * 3 + parseFloat(this.newGood.dri) + parseFloat(this.newGood.def) + parseFloat(this.newGood.phy) * 3) / 10;
      }

      const newGood = {
        name: this.newGood.name,
        price: parseFloat(this.newGood.price),
        img: this.newGood.img,
        ovr: ovr,
        point: parseFloat(this.newGood.point),
        position: this.newGood.position,
        pac: parseFloat(this.newGood.pac),
        sho: parseFloat(this.newGood.sho),
        pas: parseFloat(this.newGood.pas),
        dri: parseFloat(this.newGood.dri),
        def: parseFloat(this.newGood.def),
        phy: parseFloat(this.newGood.phy),
      };

      if (this.editingIndex === null) {
        const findGood = this.goods ? this.goods.find((item) => item.name === this.newGood.name) : {};
        if(findGood) {
          alert('Cầu thủ đã có trong dữ liệu');
          return;
        }
        try {
          await GoodsService.create(newGood);
          console.log("Thêm thành công:", newGood.name);
          this.cancelAdding();
          this.getGoods();
        } catch (error) {
          alert('Cầu thủ này đã tồn tại trong dữ liệu');
        }
      } else {
        const id = this.goods[this.editingIndex]._id;
        try {
          await GoodsService.update(id, newGood);
          console.log("Sửa thành công:", newGood.name);
          this.cancelAdding();
          this.getGoods();
        } catch (error) {
          console.error("Lỗi khi sửa sản phẩm:", error);
        }
      }
    },


    viewDetails(productId) {
      this.selectedProductId = this.selectedProductId === productId ? null : productId;
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
    this.getGoods();
  },
};
</script>

<style scoped>
.button {
  float: right;
}
</style>
