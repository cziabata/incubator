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
const app_1 = require("../src/app");
const db_1 = require("../src/db/db");
const config_1 = require("../src/config");
const codedAuth = Buffer.from('admin:qwerty').toString('base64');
const POSTS_PATH = config_1.SETTINGS.PATH.POSTS;
describe("Posts API", () => {
    beforeEach(() => {
        (0, db_1.setDB)({ posts: [], blogs: [{ id: "1", name: "Test Blog", description: "A test blog", websiteUrl: "https://blog.com" }] });
    });
    it("should create a new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = {
            title: "New Post",
            shortDescription: "This is a short description",
            content: "Full content of the post.",
            blogId: "1",
        };
        const response = yield (0, supertest_1.default)(app_1.app)
            .post(POSTS_PATH)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(newPost)
            .expect(201);
        expect(response.body).toMatchObject(newPost);
        expect(db_1.db.posts).toHaveLength(1);
    }));
    it("should update a post", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.setDB)({ posts: [{ id: "1", title: "Old Post", shortDescription: "Old desc", content: "Old content", blogId: "1", blogName: "blogName" }] });
        const updatedPost = {
            title: "Updated Post",
            shortDescription: "Updated desc",
            content: "Updated content",
            blogId: 1,
        };
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`${POSTS_PATH}/1`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(updatedPost)
            .expect(204);
        // expect(response.body).toMatchObject(updatedPost);
        expect(db_1.db.posts[0].title).toBe("Updated Post");
    }));
    it("should get all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.setDB)({ posts: [{ id: "1", title: "Test Post", shortDescription: "Short desc", content: "Content", blogId: "1", blogName: "blogName" }] });
        const response = yield (0, supertest_1.default)(app_1.app)
            .get(POSTS_PATH)
            .expect(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe("Test Post");
    }));
    it("should delete a post", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.setDB)({ posts: [{ id: "1", title: "To Delete", shortDescription: "To be deleted", content: "Delete this post", blogId: "1", blogName: "blogName" }] });
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${POSTS_PATH}/1`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(204);
        expect(db_1.db.posts).toHaveLength(0);
    }));
});
