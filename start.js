/** @format */

import express from "express";
import path from "path";

import fs from "fs";

const app = express();

const PORT = 5500;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.resolve("./public")));

app.post("/game", async (req, res) => {
  fs.appendFile(
    "./emails/emails.txt",
    `
------
Namn: ${req.body.name}
Email: ${req.body.email}
------  
`,
    function (err) {
      if (err) throw err;
    }
  );
  res.sendFile("game.html", { root: "./public" });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.listen(PORT, () => {
  console.log("port: ", PORT);
});
