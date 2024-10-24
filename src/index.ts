import { SETTINGS } from "./config";
import { app } from "./app";
import { runDb } from "./db/mongoDb";

const startApp = async () => {
  
  const res = await runDb(SETTINGS.MONGO_URL);
  if(!res) process.exit(1);

  app.listen(SETTINGS.PORT, () => {
    console.log(`App started on ${SETTINGS.PORT} port`)
  })
}

startApp();
