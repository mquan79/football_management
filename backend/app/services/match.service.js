const { ObjectId } = require("mongodb");

class MatchService { 
    constructor(client) {
        this.Match = client.db().collection("matches"); 
    }

    extractMatchData(payload) { 
        const match = { 
            matchname: payload.matchname, 
            idUser1: payload.idUser1,
            idUser2: payload.idUser2,
            score1: payload.score1,
            score2: payload.score2,
            timespace: payload.timespace
        };

        Object.keys(match).forEach((key) => match[key] === undefined && delete match[key]);

        return match;
    }

    async create(payload) {
        const match = this.extractMatchData(payload); 
        const result = await this.Match.findOneAndUpdate(
            { matchname: match.matchname }, 
            { $set: match },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Match.find(filter); 
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            matchname: { $regex: new RegExp(name, "i") } 
        });
    }

    async findById(id) {
        return await this.Match.findOne({
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
        const update = this.extractMatchData(payload); 
        const result = await this.Match.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Match.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.Match.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = MatchService; 
