import request from 'supertest';
import express from 'express';
import { homeTask01Router } from '../src/router/hometask_01';

const app = express();
app.use(express.json());
app.use('/', homeTask01Router);

describe('Videos API', () => {
  beforeEach(async () => {
    await request(app).delete('/testing/all-data');
  });

  it('should get empty list of videos', async () => {
    const response = await request(app).get('/videos');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new video', async () => {
    const newVideo = {
      title: 'Test Video',
      author: 'John Doe',
      availableResolutions: ['P144']
    };
    
    const response = await request(app)
      .post('/videos')
      .send(newVideo);
      
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...newVideo,
      id: expect.any(Number),
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
    });
  });

  it('should return 400 for invalid video creation request', async () => {
    const invalidVideo = {
      title: '',
      author: 'John Doe',
      availableResolutions: ['InvalidResolution']
    };
    
    const response = await request(app)
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
  });

  it('should get a video by id', async () => {
    const newVideo = {
      title: 'Test Video',
      author: 'John Doe',
      availableResolutions: ['P144']
    };
    
    const createResponse = await request(app)
      .post('/videos')
      .send(newVideo);
      
    const videoId = createResponse.body.id;

    const getResponse = await request(app).get(`/videos/${videoId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toMatchObject(newVideo);
  });

  it('should return 404 for non-existing video', async () => {
    const response = await request(app).get('/videos/999');
    expect(response.status).toBe(404);
  });

  it('should update an existing video', async () => {
    const newVideo = {
      title: 'Original Title',
      author: 'John Doe',
      availableResolutions: ['P144']
    };
    
    const createResponse = await request(app)
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

    const updateResponse = await request(app)
      .put(`/videos/${videoId}`)
      .send(updatedVideo);
      
    expect(updateResponse.status).toBe(204);

    const getResponse = await request(app).get(`/videos/${videoId}`);
    expect(getResponse.body).toMatchObject(updatedVideo);
  });

  it('should delete a video by id', async () => {
    const newVideo = {
      title: 'Test Video',
      author: 'John Doe',
      availableResolutions: ['P144']
    };
    
    const createResponse = await request(app)
      .post('/videos')
      .send(newVideo);
      
    const videoId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/videos/${videoId}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/videos/${videoId}`);
    expect(getResponse.status).toBe(404);
  });

  it('should delete all videos', async () => {
    const newVideo = {
      title: 'Test Video',
      author: 'John Doe',
      availableResolutions: ['P144']
    };

    await request(app).post('/videos').send(newVideo);
    await request(app).post('/videos').send(newVideo);

    const deleteAllResponse = await request(app).delete('/testing/all-data');
    expect(deleteAllResponse.status).toBe(204);

    const getResponse = await request(app).get('/videos');
    expect(getResponse.body).toEqual([]);
  });
});
