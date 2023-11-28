const ApiError = require("../api-error");
const CoinService = require("../services/coin.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const coinService = new CoinService(MongoDB.client);
        const document = await coinService.create(req.body);
        return res.status(201).json(document);
    } catch (error) {
        console.error("Error creating coin:", error);
        return next(new ApiError(500, "An error occurred while creating the coin"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const coinService = new CoinService(MongoDB.client);
        const { name } = req.query;
        const documents = name ? await coinService.findByName(name) : await coinService.find({});
        return res.status(200).json(documents);
    } catch (error) {
        console.error("Error retrieving coins:", error);
        return next(new ApiError(500, "An error occurred while retrieving coins"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const coinService = new CoinService(MongoDB.client);
        const document = await coinService.findById(req.params.id);
        return res.status(200).json(document);
    } catch (error) {
        console.error(`Error retrieving coin with id-${req.params.id}:`, error);
        return next(new ApiError(500, `Error retrieving coin with id-${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    try {
        const coinService = new CoinService(MongoDB.client);
        await coinService.update(req.params.id, req.body);
        return res.status(200).json({ message: "Coin was updated successfully" });
    } catch (error) {
        console.error(`Error updating coin with id=${req.params.id}:`, error);
        return next(new ApiError(500, `Error updating coin with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const coinService = new CoinService(MongoDB.client);
        await coinService.delete(req.params.id);
        return res.status(200).json({ message: "Coin was deleted successfully" });
    } catch (error) {
        console.error(`Error deleting coin with id=${req.params.id}:`, error);
        return next(new ApiError(500, `Error deleting coin with id=${req.params.id}`));
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const coinService = new CoinService(MongoDB.client);
        const deletedCount = await coinService.deleteAll();
        return res.status(200).json({
            message: `${deletedCount} coins were deleted successfully`
        });
    } catch (error) {
        console.error("Error deleting coins:", error);
        return next(new ApiError(500, "An error occurred while deleting coins"));
    }
};
