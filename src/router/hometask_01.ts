import { Router, Request, Response } from "express";
import { VideoResolutions } from "../types/videos";

 // {
  //   id: 0,
  //   title: "first title",
  //   author: "first author",
  //   canBeDownloaded: true,
  //   minAgeRestriction: null,
  //   createdAt: "2024-10-12T10:00:23.592Z",
  //   publicationDate: "2024-10-12T10:00:23.592Z",
  //   availableResolutions: [
  //     "P144"
  //   ]
  // }

let videos: any  = [];

function isValidResolution(resolution: string): boolean {
  return Object.values(VideoResolutions).includes(resolution as VideoResolutions);
}

function isValidISODateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString();
}

export const homeTask01Router = Router();

homeTask01Router.get("/videos", (req: Request, res: Response) => {
  res.status(200).send(videos);
});

homeTask01Router.get("/videos/:id", (req: Request, res: Response) => {
  const video = videos.find((p: any) => p.id === +req.params.id);
  if (video) {
    res.status(200).send(video);
  } else {
    res.status(404).send();
  }
});

homeTask01Router.post("/videos", (req: Request, res: Response) => {
  const { title, author, availableResolutions } = req.body;
  const errors: { message: string; field: string }[] = [];

  if (typeof title !== 'string' || !title.trim()) {
    errors.push({ message: "Field 'title' must be a non-empty string.", field: "title" });
  } else if (title.length > 40) {
    errors.push({ message: "Field 'title' must not exceed 40 characters.", field: "title" });
  }

  if (typeof author !== 'string' || !author.trim()) {
    errors.push({ message: "Field 'author' must be a non-empty string.", field: "author" });
  } else if (author.length > 20) {
    errors.push({ message: "Field 'author' must not exceed 20 characters.", field: "author" });
  }

  if (availableResolutions !== null) {
    if (!Array.isArray(availableResolutions) || availableResolutions.length === 0) {
      errors.push({ message: "Field 'availableResolutions' must be a non-empty array or null.", field: "availableResolutions" });
    } else {
      for (const resolution of availableResolutions) {
        if (!isValidResolution(resolution)) {
          errors.push({ message: `Invalid resolution: ${resolution}.`, field: "availableResolutions" });
        }
      }
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ errorsMessages: errors });
    return
  }

  const createdAt = new Date();
  const publicationDate = new Date(createdAt);
  publicationDate.setDate(createdAt.getDate() + 1);

  const newVideo = {
    id: videos.length,
    title,
    author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: createdAt.toISOString(),
    publicationDate: publicationDate.toISOString(),
    availableResolutions,
  };

  videos.push(newVideo);
  res.status(201).send(newVideo);
});

homeTask01Router.put("/videos/:id", (req: Request, res: Response) => {
  let video = videos.find((v: any) => v.id === +req.params.id);

  if(!video) {
    res.sendStatus(404);
    return
  }

  let { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
  const errors: { message: string; field: string }[] = [];

  if (typeof title !== 'string' || !title.trim()) {
    errors.push({ message: "Field 'title' must be a non-empty string.", field: "title" });
  } else if (title.length > 40) {
    errors.push({ message: "Field 'title' must not exceed 40 characters.", field: "title" });
  }


  if (typeof author !== 'string' || !author.trim()) {
    errors.push({ message: "Field 'author' must be a non-empty string.", field: "author" });
  } else if (author.length > 20) {
    errors.push({ message: "Field 'author' must not exceed 20 characters.", field: "author" });
  }

  if (availableResolutions === undefined) {
    availableResolutions === null
  } else if (availableResolutions === null) {
    availableResolutions === null
  } else if (!Array.isArray(availableResolutions) || availableResolutions.length === 0) {
    errors.push({ message: "Field 'availableResolutions' must be a non-empty array or null.", field: "availableResolutions" });
  } else {
    for (const resolution of availableResolutions) {
      if (!isValidResolution(resolution)) {
        errors.push({ message: `Invalid resolution: ${resolution}.`, field: "availableResolutions" });
      }
    }
  }

  if (canBeDownloaded === undefined) {
    canBeDownloaded = false;
  } else {
    if (typeof canBeDownloaded !== 'boolean') {
      errors.push({ message: "Field 'canBeDownloaded' must be a boolean", field: "canBeDownloaded" });
    }
  }

  if (minAgeRestriction === undefined) {
    minAgeRestriction = null;
  } else if (minAgeRestriction === null) {
    minAgeRestriction === null
  } else if (typeof minAgeRestriction !== 'number' || !Number.isInteger(minAgeRestriction)) {
    errors.push({ message: "Field 'minAgeRestriction' must be an integer", field: "minAgeRestriction" });
  } else if (minAgeRestriction < 1 || minAgeRestriction > 18) {
    errors.push({ message: "Field 'minAgeRestriction' must be between 1 and 18", field: "minAgeRestriction" });
  }

  if (typeof publicationDate !== "string" || !isValidISODateString(publicationDate)) {
    errors.push({ message: "Field 'publicationDate' must be a valid ISO 8601 date string.", field: "publicationDate" });
  }

  if (errors.length > 0) {
    res.status(400).json({ errorsMessages: errors });
    return
  }

  video = {
    ...video,
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate
  }

  videos = videos.map((v: any) => v.id === video.id ? video : v)

  res.sendStatus(204);

})

homeTask01Router.delete("/videos/:id", (req: Request, res: Response) => {
    for(let i = 0; i < videos.length; i++) {
    if(videos[i].id === +req.params.id) {
      videos.splice(i, 1);
      res.sendStatus(204);
      return
    }
  }

  res.sendStatus(404);
})

homeTask01Router.delete("/testing/all-data", (req: Request, res: Response) => {
  videos = []
  res.sendStatus(204);
})