const ApiError = require("../api-error");
const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the admin")
        );
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const { name } = req.query;
        const documents = name ? await adminService.findByName(name) : await adminService.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving admins")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "admin not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving admin with id-${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "admin not found"));
        }
        return res.send({ message: "admin was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating admin with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "admin not found"));
        }
        return res.send({ message: "admin was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error deleting admin with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const deletedCount = await adminService.deleteAll();
        return res.send({
            message: `${deletedCount} admins were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while deleting admins"
            )
        );
    }
};
