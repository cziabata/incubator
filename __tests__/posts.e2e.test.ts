import request from 'supertest';
import { app } from '../src/app';
import { db, setDB } from '../src/db/db';
import { SETTINGS } from '../src/config';

const codedAuth = Buffer.from('admin:qwerty').toString('base64');

const POSTS_PATH = SETTINGS.PATH.POSTS;

describe("Posts API", () => {
  beforeEach(() => {
    setDB({ posts: [], blogs: [{ id: "1", name: "Test Blog", description: "A test blog", websiteUrl: "https://blog.com" }] });
  });

  it("should create a new post", async () => {
    const newPost = {
      title: "New Post",
      shortDescription: "This is a short description",
      content: "Full content of the post.",
      blogId: "1",
    };

    const response = await request(app)
      .post(POSTS_PATH)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(newPost)
      .expect(201);

    expect(response.body).toMatchObject(newPost);
    expect(db.posts).toHaveLength(1);
  });

  it("should update a post", async () => {
    setDB({ posts: [{ id: "1", title: "Old Post", shortDescription: "Old desc", content: "Old content", blogId: "1", blogName: "blogName" }] });

    const updatedPost = {
      title: "Updated Post",
      shortDescription: "Updated desc",
      content: "Updated content",
      blogId: 1,
    };

    const response = await request(app)
      .put(`${POSTS_PATH}/1`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(updatedPost)
      .expect(204);

    // expect(response.body).toMatchObject(updatedPost);
    expect(db.posts[0].title).toBe("Updated Post");
  });

  it("should get all posts", async () => {
    setDB({ posts: [{ id: "1", title: "Test Post", shortDescription: "Short desc", content: "Content", blogId: "1", blogName: "blogName" }] });

    const response = await request(app)
      .get(POSTS_PATH)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("Test Post");
  });

  it("should delete a post", async () => {
    setDB({ posts: [{ id: "1", title: "To Delete", shortDescription: "To be deleted", content: "Delete this post", blogId: "1", blogName: "blogName" }] });

    await request(app)
      .delete(`${POSTS_PATH}/1`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(204);

    expect(db.posts).toHaveLength(0);
  });
});
