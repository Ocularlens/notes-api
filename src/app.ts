import bodyParser from "body-parser";
import 'dotenv/config';
import express from "express";
import { access, constants, existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
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
  const dataDir = path.join(__dirname, "..", "data");
  const dataDirExists = existsSync(dataDir);

  if (!dataDirExists) {
    mkdirSync(dataDir);
    console.log("Data directory created");
  }

  const filePath = path.join(dataDir, "notes.json");

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      // File does not exist, create it
      writeFileSync(filePath, "[]");
      console.log("File created.");
    }
  });

  console.log(`[server]: Server is running at http://localhost:${port}`);
});
