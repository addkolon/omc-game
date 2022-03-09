/** @format */

// import { playerName, playerEmail } from "./gamePlay/gamePlay.js";

const mainURL = "http://localhost:5500";

const content = document.querySelector("#content");

// function create_UUID() {
//   let dt = new Date().getTime();
//   let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
//     /[xy]/g,
//     function (c) {
//       let r = (dt + Math.random() * 16) % 16 | 0;
//       dt = Math.floor(dt / 16);
//       return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
//     }
//   );
//   return uuid;
// }

let scores;
// let bool = true;
// if ()
window.addEventListener("load", async () => {
  content.innerHTML = "";
  await fetch("scoreBoard.json")
    .then((res) => res.json())
    .then((data) => {
      scores = data;
    });
  console.log(scores);

  if (scores.length < 1) {
    content.innerHTML = `<h1>Mission briefing</h1>
        <form>
          <input type="text" name="name" id="name" placeholder="Fill in your name..."
          required>
          <input name="email" type="email" id="emailen" placeholder="Fill in your e-mail..."
          required>
      </form>
      <button class="startBtn">Gotta save ´em all</button>
                    <div id="rules">
                        <h2>How to play!</h2>
                        <div id="instructions">
                            <div class="keys">
                                <h4>How to stear:</h4>
                                <img src="sprite/arrow-keys.png">
                            </div>
                            <div class="object">
                                <h4>Pickup:</h4>
                                <img src="sprite/Person.png">
                            </div>
                            <div class="threat">
                                <h4>Watch out for:</h4>
                                <img src="sprite/Stones.png">
                            </div>
                        </div>
                    </div>

    `;
    const emailInput = document.querySelector("#emailen");
    const nameInput = document.querySelector("#name");
    const startButton = document.getElementById("startBtn");
    if (startButton) {
      startButton.addEventListener("click", async (e) => {
        // let playerID = create_UUID();
        let res = await fetch(mainURL + "/game", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // id: playerID,
            name: nameInput.value,
            email: emailInput.value,
          }),
        });
        // .then((res) => res.json());
        console.log(res);
        if (res.ok) {
          location.href = mainURL + "/game.html";
        }
        // playerName = nameInput.value;
        // playerEmail = emailInput.value;
        // location.href = mainURL + "/game.html";
      });
    }
  } else {
    content.innerHTML = `<div>Tack ${scores[scores.length - 1].name}! Poäng: ${
      scores[scores.length - 1].score
    }</div>`;

    setTimeout(() => {
      content.innerHTML = `<h1>Mission briefing</h1>
          <form>
            <input type="text" name="name" id="name" placeholder="Fill in your name..."
            required>
            <input name="email" type="email" id="emailen" placeholder="Fill in your e-mail..."
            required>
        </form>
        <button class="startBtn">Gotta save ´em all</button>
                    <div id="rules">
                        <h2>How to play!</h2>
                        <div id="instructions">
                            <div class="keys">
                                <h4>How to stear:</h4>
                                <img src="sprite/arrow-keys.png">
                            </div>
                            <div class="object">
                                <h4>Pickup:</h4>
                                <img src="sprite/Person.png">
                            </div>
                            <div class="threat">
                                <h4>Watch out for:</h4>
                                <img src="sprite/Stones.png">
                            </div>
                        </div>
                    </div>
      `;
      const emailInput = document.querySelector("#emailen");
      const nameInput = document.querySelector("#name");
      const startButton = document.getElementById("startBtn");
      if (startButton) {
        startButton.addEventListener("click", async (e) => {
          let playerID = create_UUID();
          let res = await fetch(mainURL + "/game", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // id: playerID,
              name: nameInput.value,
              email: emailInput.value,
            }),
          });
          // .then((res) => res.json());
          // console.log(res);
          if (res.ok) {
            location.href = mainURL + "/game.html";
          }
          // playerName = nameInput.value;
          // playerEmail = emailInput.value;
          // location.href = mainURL + "/game.html";
        });
      }
    }, 3000);
    const scoreB = document.getElementById("scoreB");

    scoreB.innerHTML = "";
    scores
      .sort((a, b) => b.score - a.score)
      .map((s) => {
        scoreB.innerHTML += `<li>${s.name} <span>${s.score}</span></li>`;
      });
  }
});

// if (emailInput)
//   emailInput.addEventListener("input", () => {
//     console.log("email");
//     if (emailInput.validity.valid) {
//       startButton.classList.remove("hidden");
//     } else {
//       startButton.classList.add("hidden");
//     }
//   });
