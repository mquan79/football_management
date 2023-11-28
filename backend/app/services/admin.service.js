const { ObjectId } = require("mongodb");

class AdminService {
    constructor(client) {
        this.Admin = client.db().collection("admins");
    }

    extractContactData(payload) {
        const admin = {
            adminname: payload.adminname,
            password: payload.password,
            name: payload.name,
            phone: payload.phone,
            address: payload.address,
            birthday: payload.birthday,
            email: payload.email
        };

        Object.keys(admin).forEach((key) => admin[key] === undefined && delete admin[key]);

        return admin;
    }

    async create(payload) {
        const admin = this.extractContactData(payload);
        const result = await this.Admin.findOneAndUpdate(
            { adminname: admin.adminname },
            { $set: admin },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Admin.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            adminname: { $regex: new RegExp(name, "i") }
        });
    }

    async findById(id) {
        return await this.Admin.findOne({
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
        const result = await this.Admin.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Admin.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.Admin.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = AdminService;
