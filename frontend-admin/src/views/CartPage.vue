<template>
  <div class="page">
    <AppHeader />
    <div class="container mt-3">
      <h5>Thống kê</h5>
      <p>Cầu thủ được mua nhiều nhất: {{ getNumberCartMax ? getNameGood(getNumberCartMax).name : '' }}</p>
      <div v-for="(cart, index) in cart" :key="index" class="card mb-3">
        <CartItem :cart="cart" />
      </div>
    </div>
  </div>
</template>

<script>
import CartService from '../services/cart.service';
import AppHeader from '../components/AppHeader.vue';
import CartItem from '../components/CartItem.vue';
import GoodsService from '../services/goods.service';

export default {
  name: 'CartPage',
  components: {
    AppHeader,
    CartItem
  },

  data() {
    return {
      cart: [],
      goods: null,
    };
  },

  computed: {
    getNumberCartMax() {
      let countDict = {};

      for (const item of this.cart) {
        const idGoods = item.idGoods;

        if (countDict[idGoods]) {
          countDict[idGoods]++;
        } else {
          countDict[idGoods] = 1;
        }
      }

      const maxIdGoodsObj = Object.keys(countDict).reduce((max, idGoods) => {
        return countDict[idGoods] > max.count ? { idGoods, count: countDict[idGoods] } : max;
      }, { idGoods: null, count: 0 });

      return maxIdGoodsObj.idGoods;
    },

  },

  methods: {
    async getCart() {
      try {
        this.cart = await CartService.getAll();
      } catch (e) {
        console.error('Error fetching cart:', e);
      }
    },

    async getGood() {
      this.goods = await GoodsService.getAll();
    },

    getNameGood(id) {
      return this.goods ? this.goods.find((item) => item._id === id) : {};
    }
  },

  mounted() {
    this.getCart();
    this.getGood();
  },
};
</script>

<style scoped></style>
