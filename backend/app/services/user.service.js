const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    extractContactData(payload) {
        const user = {
            username: payload.username,
            password: payload.password,
            name: payload.name,
            phone: payload.phone,
            address: payload.address,
            birthday: payload.birthday,
            email: payload.email,
            money: payload.money,
            rank: payload.rank
        };

        Object.keys(user).forEach((key) => user[key] === undefined && delete user[key]);

        return user;
    }

    async create(payload) {
        const user = this.extractContactData(payload);
        const result = await this.User.findOneAndUpdate(
            { username: user.username },
            { $set: user },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            username: { $regex: new RegExp(name, "i") }
        });
    }

    async findById(id) {
        return await this.User.findOne({
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
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = UserService;
