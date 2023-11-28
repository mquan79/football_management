const ApiError = require("../api-error");
const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the cart")
        );
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const { name } = req.query;
        const documents = name ? await cartService.findByName(name) : await cartService.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving carts")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.findById(req.params.id);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving cart with id-${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        await cartService.update(req.params.id, req.body);
        return res.send({ message: "Cart was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating cart with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        await cartService.delete(req.params.id);
        return res.send({ message: "Cart was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error deleting cart with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const deletedCount = await cartService.deleteAll();
        return res.send({
            message: `${deletedCount} carts were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while deleting carts"
            )
        );
    }
};
