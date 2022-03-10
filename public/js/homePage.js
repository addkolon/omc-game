/** @format */

// import { playerName, playerEmail } from "./gamePlay/gamePlay.js";

const mainURL = "http://localhost:5500";

const content = document.querySelector("#content");

// i sekunder
const showGameOverScreenTime = 10;

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

  if (scores.length < 1) {
    content.innerHTML = `<h1>Mission briefing</h1>
        <form>
          <input type="text" name="name" id="name" placeholder="Fill in your name..."
          required>
          <input name="email" type="email" id="emailen" placeholder="Fill in your e-mail..."
          required>
      </form>
      <button id="startBtn">Gotta save ´em all</button>
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
    content.innerHTML = `<div><h1>GAME OVER</h1><h2>Bra jobbat, ${
      scores[scores.length - 1].name
    }!</h2> <h3>Score: ${scores[scores.length - 1].score}</h3></div>`;

    setTimeout(() => {
      content.innerHTML = `<h1>Mission briefing</h1>
          <form>
            <input type="text" name="name" id="name" placeholder="Fill in your name..."
            required>
            <input name="email" type="email" id="emailen" placeholder="Fill in your e-mail..."
            required>
        </form>
        <button id="startBtn">Gotta save ´em all</button>
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
          // console.log(res);
          if (res.ok) {
            location.href = mainURL + "/game.html";
          }
          // playerName = nameInput.value;
          // playerEmail = emailInput.value;
          // location.href = mainURL + "/game.html";
        });
      }
    }, showGameOverScreenTime * 1000);
    const scoreB = document.getElementById("scoreB");

    scoreB.innerHTML = "";
    scores
      .sort((a, b) => b.score - a.score)
      .map((s) => {
        scoreB.innerHTML += `<li><span>${s.score}p</span> - ${s.name} </li>`;
      });

    if (scoreB.children.length < 11) {
      for (let i = 0; i < 10; i++) {
        if (scoreB.children[i] === undefined) {
          scoreB.innerHTML += `<li>...</li>`;
        }
      }
    }
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
