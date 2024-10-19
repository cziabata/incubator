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
const BLOGS_PATH = config_1.SETTINGS.PATH.BLOGS;
describe("Blogs API", () => {
    beforeEach(() => {
        (0, db_1.setDB)({ blogs: [] });
    });
    it("should create a new blog", () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = {
            name: "New Blog",
            description: "This is a test blog.",
            websiteUrl: "https://example.com",
        };
        const response = yield (0, supertest_1.default)(app_1.app)
            .post(BLOGS_PATH)
            .send(newBlog)
            .expect(201);
        expect(response.body).toMatchObject(newBlog);
        expect(db_1.db.blogs).toHaveLength(1);
    }));
    it("should update a blog", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.setDB)({ blogs: [{ id: 1, name: "Old Blog", description: "Old description", websiteUrl: "https://old.com" }] });
        const updatedBlog = {
            name: "Updated Blog",
            description: "Updated description",
            websiteUrl: "https://updated.com",
        };
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`${BLOGS_PATH}/1`)
            .send(updatedBlog)
            .expect(200);
        expect(response.body).toMatchObject(updatedBlog);
        expect(db_1.db.blogs[0].name).toBe("Updated Blog");
    }));
    it("should get all blogs", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.setDB)({ blogs: [{ id: 1, name: "Test Blog", description: "A blog for testing", websiteUrl: "https://test.com" }] });
        const response = yield (0, supertest_1.default)(app_1.app)
            .get(BLOGS_PATH)
            .expect(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe("Test Blog");
    }));
    it("should delete a blog", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.setDB)({ blogs: [{ id: 1, name: "To Delete", description: "This blog will be deleted", websiteUrl: "https://delete.com" }] });
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${BLOGS_PATH}/1`)
            .expect(204);
        expect(db_1.db.blogs).toHaveLength(0);
    }));
});
