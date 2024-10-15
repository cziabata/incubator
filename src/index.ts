import { SETTINGS } from "./config";
import { app } from "./app";

app.listen(SETTINGS.PORT, () => {
  console.log(`App started on ${SETTINGS.PORT} port`)
})