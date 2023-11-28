<template>
    <div class="page">
        <div class="player">
            <div class="col d-flex justify-content-center">
                <div v-for="(cart, index) in filteredFW" :key="index" class="card mb-3" style="margin: 10px;">
                    <UserSquadItem :cart="cart" />
                </div>
            </div>

            <div class="col d-flex justify-content-center">
                <div v-for="(cart, index) in filteredMF" :key="index" class="card mb-3" style="margin: 10px;">
                    <UserSquadItem :cart="cart" />
                </div>
            </div>

            <div class="col d-flex justify-content-center">
                <div v-for="(cart, index) in filteredDF" :key="index" class="card mb-3" style="margin: 10px;">
                    <UserSquadItem :cart="cart" />
                </div>
            </div>

            <div class="col d-flex justify-content-center">
                <div v-for="(cart, index) in filteredGK" :key="index" class="card mb-3" style="margin: 10px;">
                    <UserSquadItem :cart="cart" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CartService from '../services/cart.service';
import GoodsService from '../services/goods.service';
import UserService from '../services/user.service'
import UserSquadItem from '../components/UserSquadItem.vue';

export default {
    components: {
        UserSquadItem
    },
    props: {
        idUser: { type: String, required: true },
    },

    data() {
        return {
            users: null,
            goods: null,
            cart: [],
        };
    },

    computed: {
        filteredFW() {
            return this.filterCartByPosition('FW');
        },
        filteredMF() {
            return this.filterCartByPosition('MF');
        },
        filteredDF() {
            return this.filterCartByPosition('DF');
        },
        filteredGK() {
            return this.filterCartByPosition('GK');
        },
        filteredUser() {
            return this.users.find((user) => user._id === this.idUser) || {};
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
        async getGoods() {
            try {
                this.goods = await GoodsService.getAll();
            } catch (e) {
                console.error('Error fetching goods:', e);
            }
        },
        async getUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (e) {
                console.error('Error fetching users:', e);
            }
        },

        filterCartByPosition(position) {
            return this.cart.filter((cart) => cart.idUser === this.idUser && cart.status === 'yes' && cart.position === position);
        },
    },

    mounted() {
        this.getCart();
        this.getUsers();
        this.getGoods();
    },
};
</script>
  
<style scoped>
.player {
    background-image: url('../assets/stadium.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
}
</style>
  