<template>
    <div>
      <div class="p-1">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p>{{ good ? parseInt(good.ovr) : 'No' }}</p>
            <p>{{ good ? good.position : 'No' }}</p>
          </div>
  
          <div>
            <img :src="good ? good.img : ''" alt="Product Image" class="img-fluid" style="max-width: 100px;" />
          </div>
        </div>
        <div>
          <p style="text-align: center;">{{ good ? good.name : 'No' }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import GoodsService from '../services/goods.service'
  export default {
    props: {
      cart: { type: Object, required: true },
    },
    data() {
      return {
        good: null
      }
    },
    methods: {
      async getGoodById() {
        this.good = await GoodsService.get(this.cart.idGoods);
      },
    },
    mounted() {
      this.getGoodById();
    }
  };
  </script>
  