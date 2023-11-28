const { ObjectId } = require("mongodb");

class CoinService {
    constructor(client) {
        this.coin = client.db().collection("coins"); 
    }

    extractCoinData(payload) {
        const coin = {
            coinname: payload.coinname,
            idUser: payload.idUser,
            card: payload.card,
            coin: payload.coin,
        };

        Object.keys(coin).forEach((key) => coin[key] === undefined && delete coin[key]);

        return coin;
    }

    async create(payload) {
        const coin = this.extractCoinData(payload);
        const result = await this.coin.findOneAndUpdate(
            { coinname: coin.coinname }, 
            { $set: coin },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.coin.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            coinname: { $regex: new RegExp(name, "i") } 
        });
    }

    async findById(id) {
        return await this.coin.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
    }

    async update(id, payload) {
        if (Object.keys(payload).length === 0) {
            return null;
        }

        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const update = this.extractCoinData(payload);
        const result = await this.coin.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.coin.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.coin.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = CoinService;
