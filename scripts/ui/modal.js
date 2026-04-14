import {
  applications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../crud.js";
import { renderItems } from "./render.js";

let modalMode = "create";
let applicationId = null;

const openModal = () => {
  const modal = document.getElementById("modal");

  modal.style.display = "flex";
};

const createButton = document.getElementById("create-button");
createButton.addEventListener("click", () => {
  modalMode = "create";

  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  openModal();
});

const closeModal = () => {
  const modal = document.getElementById("modal");

  const modalForm = document.querySelector(".modal__form");
  modalForm.reset();

  modalMode = "create";

  applicationId = null;

  modal.style.display = "none";
};

const closeButton = document.querySelector(".modal__close-button");
closeButton.addEventListener("click", closeModal);

const submitButton = document.querySelector(".modal__submit-button");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const roleInput = document.querySelector(`.modal__input[name="role"]`);
  const role = roleInput.value.trim();

  const companyInput = document.querySelector(`.modal__input[name="company"]`);
  const company = companyInput.value.trim();

  if (!role || !company) return;

  if (modalMode === "create") {
    createApplication(role, company);
  } else if (modalMode === "update") {
    updateApplication(applicationId, { role, company });
  }

  closeModal();

  renderItems();
});

const container = document.querySelector(".container");
container.addEventListener("click", (event) => {
  const itemButton = event.target.closest(".item__button"); // .closest traverses up dom tree from event target
  if (!itemButton) return; // if there's no items on the board, there'll be no kebab buttons to be found

  const itemOptions = itemButton.nextElementSibling;

  // close all other kebab menus first
  document.querySelectorAll(".item__options").forEach((menu) => {
    if (menu !== itemOptions) {
      menu.style.display = "none";
    }
  });

  // and then open/close kebab menu (based on current status)
  if (itemOptions.style.display === "none") {
    itemOptions.style.display = "flex";
  } else {
    itemOptions.style.display = "none";
  }
});

// kebab update button
container.addEventListener("click", (event) => {
  const updateButton = event.target.closest(".item__update-button");
  if (!updateButton) return;

  const item = updateButton.closest(".item");
  applicationId = item.dataset.id;

  const application = applications.find((app) => app.id === applicationId);
  if (!application) return;

  const roleInput = document.querySelector(`.modal__input[name="role"]`);
  roleInput.value = application.role;

  const companyInput = document.querySelector(`.modal__input[name="company"]`);
  companyInput.value = application.company;

  modalMode = "update";

  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "Update Application";

  openModal();

  const itemOptions = event.target.closest(".item__options");
  itemOptions.style.display = "none";
});

// kebab delete button
container.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".item__delete-button");
  if (!deleteButton) return;

  const item = deleteButton.closest(".item");
  applicationId = item.dataset.id;

  deleteApplication(applicationId);

  renderItems();
});
