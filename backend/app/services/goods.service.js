const { ObjectId } = require("mongodb");

class GoodsService {
    constructor(client) {
        this.Goods = client.db().collection("goods");
    }

    extractContactData(payload) {
        const goods = {
            img: payload.img,
            name: payload.name,
            price: payload.price,
            ovr: payload.ovr,
            point: payload.point,
            position: payload.position,
            pac: payload.pac,
            sho: payload.sho,
            pas: payload.pas,
            dri: payload.dri,
            def: payload.def,
            phy: payload.phy
        };

        Object.keys(goods).forEach((key) => goods[key] === undefined && delete goods[key]);

        return goods;
    }

    async create(payload) {
        const goods = this.extractContactData(payload);
        const result = await this.Goods.findOneAndUpdate(
            { name: goods.name },
            { $set: goods },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Goods.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            goodsname: { $regex: new RegExp(name, "i") }
        });
    }

    async findById(id) {
        return await this.Goods.findOne({
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
        const update = this.extractContactData(payload);
        const result = await this.Goods.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Goods.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.Goods.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = GoodsService;
