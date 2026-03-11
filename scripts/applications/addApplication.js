import { applications } from "../data.js";

import { renderApplications } from "./renderApplications.js";
import { closeModal } from "../modal.js";

const roleInput = document.querySelector(`.modal__input[name="role"]`);
const companyInput = document.querySelector(`.modal__input[name="company"]`);

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  const modal = document.getElementById("modal");
  modal.style.display = "flex";
});

const submitButton = document.querySelector(".modal__submit-button");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const role = roleInput.value.trim();
  const company = companyInput.value.trim();

  if (!role || !company) return;

  const newApplication = {
    id: crypto.randomUUID(),
    role,
    company,
    dateApplied: new Date(),
    status: "apply",
  };

  applications.push(newApplication);

  renderApplications();

  closeModal();
});
