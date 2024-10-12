"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeTask01Router = void 0;
const express_1 = require("express");
const videos_1 = require("../types/videos");
const videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-10-12T10:00:23.592Z",
        "publicationDate": "2024-10-12T10:00:23.592Z",
        "availableResolutions": [
            "P144"
        ]
    }
];
function isValidResolution(resolution) {
    return Object.values(videos_1.VideoResolutions).includes(resolution);
}
function isValidISODateString(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString === date.toISOString();
}
exports.homeTask01Router = (0, express_1.Router)();
exports.homeTask01Router.get("/", (req, res) => {
    res.status(200).send(videos);
});
exports.homeTask01Router.get("/:id", (req, res) => {
    const video = videos.find(p => p.id === +req.params.id);
    if (video) {
        res.status(200).send(video);
    }
    else {
        res.status(404).send();
    }
});
exports.homeTask01Router.post("/", (req, res) => {
    const { title, author, availableResolutions } = req.body;
    const errors = [];
    if (typeof title !== 'string' || !title.trim()) {
        errors.push({ message: "Field 'title' must be a non-empty string.", field: "title" });
    }
    else if (title.length > 40) {
        errors.push({ message: "Field 'title' must not exceed 40 characters.", field: "title" });
    }
    if (typeof author !== 'string' || !author.trim()) {
        errors.push({ message: "Field 'author' must be a non-empty string.", field: "author" });
    }
    else if (author.length > 20) {
        errors.push({ message: "Field 'author' must not exceed 20 characters.", field: "author" });
    }
    if (availableResolutions !== null) {
        if (!Array.isArray(availableResolutions) || availableResolutions.length === 0) {
            errors.push({ message: "Field 'availableResolutions' must be a non-empty array or null.", field: "availableResolutions" });
        }
        else {
            for (const resolution of availableResolutions) {
                if (!isValidResolution(resolution)) {
                    errors.push({ message: `Invalid resolution: ${resolution}.`, field: "availableResolutions" });
                }
            }
        }
    }
    if (errors.length > 0) {
        res.status(400).json({ errorsMessages: errors });
        return;
    }
    const newVideo = {
        id: videos.length,
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions,
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.homeTask01Router.put("/:id", (req, res) => {
    let video = videos.find(v => v.id === +req.params.id);
    if (!video) {
        res.send(404);
        return;
    }
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const errors = [];
    if (typeof title !== 'string' || !title.trim()) {
        errors.push({ message: "Field 'title' must be a non-empty string.", field: "title" });
    }
    else if (title.length > 40) {
        errors.push({ message: "Field 'title' must not exceed 40 characters.", field: "title" });
    }
    if (typeof author !== 'string' || !author.trim()) {
        errors.push({ message: "Field 'author' must be a non-empty string.", field: "author" });
    }
    else if (author.length > 20) {
        errors.push({ message: "Field 'author' must not exceed 20 characters.", field: "author" });
    }
    if (availableResolutions !== null) {
        if (!Array.isArray(availableResolutions) || availableResolutions.length === 0) {
            errors.push({ message: "Field 'availableResolutions' must be a non-empty array or null.", field: "availableResolutions" });
        }
        else {
            for (const resolution of availableResolutions) {
                if (!isValidResolution(resolution)) {
                    errors.push({ message: `Invalid resolution: ${resolution}.`, field: "availableResolutions" });
                }
            }
        }
    }
    if (canBeDownloaded !== null) {
        if (typeof canBeDownloaded !== 'boolean') {
            errors.push({ message: "Field 'canBeDownloaded' must be boolean", field: "canBeDownloaded" });
        }
    }
    if (minAgeRestriction !== null) {
        if (typeof minAgeRestriction !== 'number' || !Number.isInteger(minAgeRestriction)) {
            errors.push({ message: "Field 'minAgeRestriction' must be a integer", field: "minAgeRestriction" });
        }
        else if (minAgeRestriction > 1 && minAgeRestriction < 18) {
            errors.push({ message: "Field 'minAgeRestriction' must be form 1  to 18", field: "minAgeRestriction" });
        }
    }
    if (typeof publicationDate !== "string" || !isValidISODateString(publicationDate)) {
        errors.push({ message: "Field 'publicationDate' must be a valid ISO 8601 date string.", field: "publicationDate" });
    }
    if (errors.length > 0) {
        res.status(400).json({ errorsMessages: errors });
        return;
    }
    video = Object.assign(Object.assign({}, video), { title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate });
    res.send(204);
});
exports.homeTask01Router.delete("/:id", (req, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
