<template>
    <div class="page">
        <AppHeader />
        <div class="card d-flex">
            <div v-for="(coin, index) of coin" :key="index" class="mb-3 d-flex justify-content-between">
                <div class="card-body d-flex">
                    <p class="card-text" style="margin: 10px;">{{ this.getNameById(coin.idUser) }}</p>
                    <p class="card-text" style="margin: 10px;">{{ coin.card }}</p>
                    <p class="card-text" style="margin: 10px;">{{ parseInt(coin.coin).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }) }}</p>
                </div>
                <div class="d-flex">
                    <div class="mr-auto"></div>
                    <button @click="payCoin(coin.idUser, coin.coin, coin._id)" class="btn btn-primary" style="height: 40px;align-self: center; margin: 10px;">Duyệt</button>
                </div>
            </div>
        </div>
    </div>
</template>



  
<script>
import AppHeader from '../components/AppHeader.vue';
import CoinService from '../services/coin.service';
import UserService from '../services/user.service'
export default {
    name: 'CoinPage',
    components: {
        AppHeader,
    },

    data() {
        return {
            coin: null,
            user: null
        };
    },

    computed: {

    },

    methods: {
        async getCoin() {
            this.coin = await CoinService.getAll();
        },

        getNameById(id) {
            return this.user ? this.user.find((item) => item._id === id).name : {}
        },

        async payCoin(idUser, coin, idCoin) {
            let money = 0;
            if (coin === 20000) {
                money = 40
            }
            if (coin === 50000) {
                money = 105
            }
            if (coin === 100000) {
                money = 210
            }
            if (coin === 200000) {
                money = 420
            }
            if (coin === 500000) {
                money = 1050
            }

            const userFind = this.user.find((item) => item._id === idUser)
            const currentMoney = userFind.money;
            const dataMoney = {
                money: currentMoney + money
            }
            if(!confirm('Bạn có chắc chắn người này đã thanh toán?')) {
                return;
            }
            try {
                await UserService.update(userFind._id, dataMoney)
                await CoinService.delete(idCoin)
                console.log(idCoin)
                this.getCoin();
            } catch (e) {
                console.log(e)
            }
        },



        async getUser() {
            this.user = await UserService.getAll();
        }
    },

    mounted() {
        this.getCoin();
        this.getUser();
    },
};
</script>
  
<style scoped></style>
  