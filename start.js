/** @format */

import emails from "./emails/emails.js";
import { fs } from "fs";

const emailInput = document.querySelector("#email");
const emailButton = document.querySelector(".sub");
const startButton = document.querySelector(".startBtn");

emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid) {
    startButton.classList.remove("hidden");
  } else {
    startButton.classList.add("hidden");
  }
});

startButton.addEventListener("click", () => {
  emails.push(emailInput.value);
});
