
<template>
    <div>
        <div class="p-1 d-flex justify-content-between">
            <div style="display: flex;">
                <div>
                    <img :src="good ? good.img : ''" alt="Product Image" class="img-fluid" style="max-width: 100px;" />
                </div>
                <div>
                    <strong>{{ good ? good.name : 'No' }}</strong>
                    <p>OVR: {{ good ? parseInt(good.ovr) : 'No' }}</p>
                    <div style="display: flex;">
                        <p style="margin: 10px;">{{ good ? good.price : 'No' }}</p><i class="fas fa-coins" style="align-self: center"></i>
                    </div>
                </div>
                
            </div>
            <div><strong>{{ user ? user.name : 'No' }}</strong></div>
        </div>
    </div>
</template>
<script>
import GoodsService from '../services/goods.service'
import UserService from '../services/user.service'
export default {
    props: {
        cart: { type: Object, required: true },
    },
    data() {
        return {
            good: null,
            user: null
        }
    },
    methods: {
        async getGoodById() {
            this.good = await GoodsService.get(this.cart.idGoods);
        },

        async getUserById() {
            const allUser = await UserService.getAll();
            this.user = allUser.find((item) => item._id === this.cart.idUser)
        }
    },
    mounted() {
        this.getGoodById();
        this.getUserById();
    }
};
</script>