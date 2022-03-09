/** @format */

import express from "express";
import path from "path";

import fs from "fs";

const app = express();

const PORT = 5500;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.resolve("./public")));

// let ididid;

app.post("/game", async (req, res) => {
  // ididid = req.body.id;
  fs.appendFile(
    "./emails/emails.txt",
    `
------
Namn: ${req.body.name}
Email: ${req.body.email}
------  
`,
    // ID: ${req.body.id}

    function (err) {
      if (err) throw err;
    }
  );
  const scorB = {
    name: req.body.name,
    // ID: req.body.id,
    score: null,
  };
  fs.readFile("./public/scoreBoard.json", (err, data) => {
    let json = JSON.parse(data);
    console.log(json);
    json.push(scorB);

    fs.writeFile("./public/scoreBoard.json", JSON.stringify(json), (error) => {
      if (error) {
        throw error;
      }
    });
  });
  // res.sendFile("game.html", { root: "./public" });
  res.json({
    success: true,
  });
});

// app.get("/gameon/:id", async (req, res) => {
//   res.sendFile("game.html", { root: "./public" });
// });

app.post("/gameover", async (req, res) => {
  fs.readFile("./public/scoreBoard.json", (err, data) => {
    let json = JSON.parse(data);
    let copy = json.pop();
    copy.score = req.body.score;

    json.push(copy);

    fs.writeFile("./public/scoreBoard.json", JSON.stringify(json), (error) => {
      if (error) {
        throw error;
      }
    });
  });
  //   res.sendFile("index.html", { root: "./public" });
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.listen(PORT, () => {
  console.log("port: ", PORT);
});

//  to start: 1. clone repo. 2. "npm i" in rootfolder. 3. "node start.js" in root folder. 4. "localhost:5500" in browser
