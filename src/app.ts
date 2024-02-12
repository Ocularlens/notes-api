import bodyParser from "body-parser";
import express from "express";
import { noteRoute } from "./routes";
import { errorHandler, notFoundHandler } from "./util";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/notes", noteRoute);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
