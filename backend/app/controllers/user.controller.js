const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        const documents = name ? await userService.findByName(name) : await userService.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving users")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        await userService.findById(req.params.id);
        // const document = await userService.findById(req.params.id);
        // if (!document) {
        //     return next(new ApiError(404, "User not found"));
        // }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving user with id-${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        await userService.update(req.params.id, req.body);
        // const document = await userService.update(req.params.id, req.body);
        // if (!document) {
        //     return next(new ApiError(404, "User not found"));
        // }
        return res.send({ message: "User was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        await userService.delete(req.params.id);
        // const document = await userService.delete(req.params.id);
        // if (!document) {
        //     return next(new ApiError(404, "User not found"));
        // }
        return res.send({ message: "User was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error deleting user with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} users were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while deleting users"
            )
        );
    }
};
