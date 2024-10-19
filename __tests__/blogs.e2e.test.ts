import request from 'supertest';
import { app } from '../src/app';
import { db, setDB } from '../src/db/db';
import { SETTINGS } from '../src/config';

const BLOGS_PATH = SETTINGS.PATH.BLOGS;

describe("Blogs API", () => {
  beforeEach(() => {
    setDB({ blogs: [] });
  });

  it("should create a new blog", async () => {
    const newBlog = {
      name: "New Blog",
      description: "This is a test blog.",
      websiteUrl: "https://example.com",
    };

    const response = await request(app)
      .post(BLOGS_PATH)
      .send(newBlog)
      .expect(201);

    expect(response.body).toMatchObject(newBlog);
    expect(db.blogs).toHaveLength(1);
  });

  it("should update a blog", async () => {
    setDB({ blogs: [{ id: 1, name: "Old Blog", description: "Old description", websiteUrl: "https://old.com" }] });

    const updatedBlog = {
      name: "Updated Blog",
      description: "Updated description",
      websiteUrl: "https://updated.com",
    };

    const response = await request(app)
      .put(`${BLOGS_PATH}/1`)
      .send(updatedBlog)
      .expect(200);

    expect(response.body).toMatchObject(updatedBlog);
    expect(db.blogs[0].name).toBe("Updated Blog");
  });

  it("should get all blogs", async () => {
    setDB({ blogs: [{ id: 1, name: "Test Blog", description: "A blog for testing", websiteUrl: "https://test.com" }] });

    const response = await request(app)
      .get(BLOGS_PATH)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe("Test Blog");
  });

  it("should delete a blog", async () => {
    setDB({ blogs: [{ id: 1, name: "To Delete", description: "This blog will be deleted", websiteUrl: "https://delete.com" }] });

    await request(app)
      .delete(`${BLOGS_PATH}/1`)
      .expect(204);

    expect(db.blogs).toHaveLength(0);
  });
});
