import { applications } from "../data.js";

import { renderApplications } from "./renderApplications.js";
import { closeModal } from "../modal.js";

let role = "";
const roleInput = document.querySelector(`.modal__input[name="role"]`);
roleInput.addEventListener("input", (event) => {
  role = event.target.value;

  console.log("role: ", role); // DEBUG
});

let company = "";
const companyInput = document.querySelector(`.modal__input[name="company"]`);
companyInput.addEventListener("input", (event) => {
  company = event.target.value;

  console.log("company: ", company); // DEBUG
});

const addApplication = () => {
  const newApplication = {
    id: crypto.randomUUID(),
    role,
    company,
    dateApplied: new Date(),
    status: "apply",
  };

  applications.push(newApplication);

  renderApplications();
};

const addApplicationButton = document.getElementById("add-button");
addApplicationButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  modal.style.display = "flex";
});

const modalSubmitButton = document.querySelector(".modal__submit-button");
modalSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (role && company) {
    addApplication();

    closeModal();
  }
});
