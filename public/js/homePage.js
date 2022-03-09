/** @format */

const emailInput = document.querySelector("#email");
const startButton = document.querySelector(".startBtn");

emailInput.addEventListener("input", () => {
  console.log("email");
  if (emailInput.validity.valid) {
    startButton.classList.remove("hidden");
  } else {
    startButton.classList.add("hidden");
  }
});
