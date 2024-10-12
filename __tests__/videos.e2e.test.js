"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const hometask_01_1 = require("../src/router/hometask_01");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', hometask_01_1.homeTask01Router);
describe('Videos API', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app).delete('/testing/all-data');
    }));
    it('should get empty list of videos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/videos');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    }));
    it('should create a new video', () => __awaiter(void 0, void 0, void 0, function* () {
        const newVideo = {
            title: 'Test Video',
            author: 'John Doe',
            availableResolutions: ['P144']
        };
        const response = yield (0, supertest_1.default)(app)
            .post('/videos')
            .send(newVideo);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(Object.assign(Object.assign({}, newVideo), { id: expect.any(Number), canBeDownloaded: true, minAgeRestriction: null, createdAt: expect.any(String), publicationDate: expect.any(String) }));
    }));
    it('should return 400 for invalid video creation request', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidVideo = {
            title: '',
            author: 'John Doe',
            availableResolutions: ['InvalidResolution']
        };
        const response = yield (0, supertest_1.default)(app)
            .post('/videos')
            .send(invalidVideo);
        expect(response.status).toBe(400);
        expect(response.body.errorsMessages).toContainEqual({
            message: "Field 'title' must be a non-empty string.",
            field: 'title'
        });
        expect(response.body.errorsMessages).toContainEqual({
            message: `Invalid resolution: InvalidResolution.`,
            field: 'availableResolutions'
        });
    }));
    it('should get a video by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const newVideo = {
            title: 'Test Video',
            author: 'John Doe',
            availableResolutions: ['P144']
        };
        const createResponse = yield (0, supertest_1.default)(app)
            .post('/videos')
            .send(newVideo);
        const videoId = createResponse.body.id;
        const getResponse = yield (0, supertest_1.default)(app).get(`/videos/${videoId}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toMatchObject(newVideo);
    }));
    it('should return 404 for non-existing video', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/videos/999');
        expect(response.status).toBe(404);
    }));
    it('should update an existing video', () => __awaiter(void 0, void 0, void 0, function* () {
        const newVideo = {
            title: 'Original Title',
            author: 'John Doe',
            availableResolutions: ['P144']
        };
        const createResponse = yield (0, supertest_1.default)(app)
            .post('/videos')
            .send(newVideo);
        const videoId = createResponse.body.id;
        const updatedVideo = {
            title: 'Updated Title',
            author: 'Jane Doe',
            availableResolutions: ['P240'],
            canBeDownloaded: false,
            minAgeRestriction: 12,
            publicationDate: new Date().toISOString()
        };
        const updateResponse = yield (0, supertest_1.default)(app)
            .put(`/videos/${videoId}`)
            .send(updatedVideo);
        expect(updateResponse.status).toBe(204);
        const getResponse = yield (0, supertest_1.default)(app).get(`/videos/${videoId}`);
        expect(getResponse.body).toMatchObject(updatedVideo);
    }));
    it('should delete a video by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const newVideo = {
            title: 'Test Video',
            author: 'John Doe',
            availableResolutions: ['P144']
        };
        const createResponse = yield (0, supertest_1.default)(app)
            .post('/videos')
            .send(newVideo);
        const videoId = createResponse.body.id;
        const deleteResponse = yield (0, supertest_1.default)(app).delete(`/videos/${videoId}`);
        expect(deleteResponse.status).toBe(204);
        const getResponse = yield (0, supertest_1.default)(app).get(`/videos/${videoId}`);
        expect(getResponse.status).toBe(404);
    }));
    it('should delete all videos', () => __awaiter(void 0, void 0, void 0, function* () {
        const newVideo = {
            title: 'Test Video',
            author: 'John Doe',
            availableResolutions: ['P144']
        };
        yield (0, supertest_1.default)(app).post('/videos').send(newVideo);
        yield (0, supertest_1.default)(app).post('/videos').send(newVideo);
        const deleteAllResponse = yield (0, supertest_1.default)(app).delete('/testing/all-data');
        expect(deleteAllResponse.status).toBe(204);
        const getResponse = yield (0, supertest_1.default)(app).get('/videos');
        expect(getResponse.body).toEqual([]);
    }));
});
