const ApiError = require("../api-error");
const MatchService = require("../services/match.service"); 
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const matchService = new MatchService(MongoDB.client); 
        const document = await matchService.create(req.body); 
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the match") 
        );
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const matchService = new MatchService(MongoDB.client); 
        const { name } = req.query;
        const documents = name ? await matchService.findByName(name) : await matchService.find({}); 
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving matches") 
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const matchService = new MatchService(MongoDB.client); 
        const document = await matchService.findById(req.params.id); 
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving match with id-${req.params.id}` 
            )
        );
    }
};

exports.update = async (req, res, next) => {
    try {
        const matchService = new MatchService(MongoDB.client); 
        await matchService.update(req.params.id, req.body); 
        return res.send({ message: "Match was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating match with id=${req.params.id}`) 
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const matchService = new MatchService(MongoDB.client); 
        await matchService.delete(req.params.id); 
        return res.send({ message: "Match was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error deleting match with id=${req.params.id}`) 
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const matchService = new MatchService(MongoDB.client); 
        const deletedCount = await matchService.deleteAll(); 
        return res.send({
            message: `${deletedCount} matches were deleted successfully` 
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while deleting matches" 
            )
        );
    }
};
