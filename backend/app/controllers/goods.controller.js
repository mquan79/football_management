const ApiError = require("../api-error");
const GoodsService = require("../services/goods.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const goodsService = new GoodsService(MongoDB.client);
        const document = await goodsService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the goods")
        );
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const goodsService = new GoodsService(MongoDB.client);
        const { name } = req.query;
        const documents = name ? await goodsService.findByName(name) : await goodsService.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving goodss")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const goodsService = new GoodsService(MongoDB.client);
        const document = await goodsService.findById(req.params.id);
        // if (!document) {
        //     return next(new ApiError(404, "goods not found"));
        // }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving goods with id-${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    try {
        const goodsService = new GoodsService(MongoDB.client);
        await goodsService.update(req.params.id, req.body);
        //const document = await goodsService.update(req.params.id, req.body);
        // if (!document) {
        //     return next(new ApiError(404, "goods not found"));
        // }
        return res.send({ message: "goods was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating goods with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const goodsService = new GoodsService(MongoDB.client);
        await goodsService.delete(req.params.id);
        // const document = await goodsService.delete(req.params.id);
        // if (!document) {
        //     return next(new ApiError(404, "goods not found"));
        // }
        return res.send({ message: "goods was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error deleting goods with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const goodsService = new GoodsService(MongoDB.client);
        const deletedCount = await goodsService.deleteAll();
        return res.send({
            message: `${deletedCount} goodss were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while deleting goodss"
            )
        );
    }
};
