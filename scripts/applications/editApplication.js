import { applications } from "../data.js";

import { renderApplications } from "./renderApplications.js";
import { closeModal } from "../modal.js";

const roleInput = document.querySelector(`.modal__input[name="role"]`);
const companyInput = document.querySelector(`.modal__input[name="company"]`);

let applicationId = null;

// TODO: update code to use new item options kebab menus for modal opening
document.querySelector(".container").addEventListener("click", (event) => {
  const editButton = event.target.closest(".item__edit-button");
  // if there's no items on the board, there'll be no edit button to find
  if (!editButton) return;

  const item = editButton.closest(".item");
  applicationId = item.dataset.id;

  const application = applications.find((app) => app.id === applicationId);
  if (!application) return;

  roleInput.value = application.role;
  companyInput.value = application.company;

  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  const itemOptions = event.target.closest(".item__options");
  itemOptions.style.display = "none";
});

// TODO: stop code from fighting between add event listener and edit event listener
// const submitButton = document.querySelector(".modal__submit-button");
// submitButton.addEventListener("click", (event) => {
//   event.preventDefault();

//   const role = roleInput.value.trim();
//   const company = companyInput.value.trim();

//   if (!role || !company) return;

//   const editingApplication = applications.find(
//     (app) => app.id === applicationId,
//   );

//   editingApplication.role = role;
//   editingApplication.company = company;

//   renderApplications();

//   closeModal();
// });
