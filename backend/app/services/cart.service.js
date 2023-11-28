const { ObjectId } = require("mongodb");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts"); 
    }

    extractCartData(payload) {
        const cart = {
            cartname: payload.cartname,
            idUser: payload.idUser,
            idGoods: payload.idGoods,
            status: payload.status,
            position: payload.position,
        };

        Object.keys(cart).forEach((key) => cart[key] === undefined && delete cart[key]);

        return cart;
    }

    async create(payload) {
        const cart = this.extractCartData(payload);
        const result = await this.Cart.findOneAndUpdate(
            { cartname: cart.cartname }, 
            { $set: cart },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            cartname: { $regex: new RegExp(name, "i") } 
        });
    }

    async findById(id) {
        return await this.Cart.findOne({
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
        const update = this.extractCartData(payload);
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.Cart.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = CartService;
