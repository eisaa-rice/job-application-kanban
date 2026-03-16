import { applications } from "./data.js";

// TODO: i think we can drop the add, edit, and delete functions since they're not really re-used and we can replace their singular calls() with the code within each

// RENDER APPLICATIONS
const renderApplications = () => {
  const columns = ["apply", "progress", "reject", "offer"];

  // first, clear all columns
  columns.forEach((columnId) => {
    const dropzone = document.querySelector(`#${columnId} .dropzone`);

    dropzone.innerHTML = "";
  });

  // render each application into the correct column
  applications.forEach((application) => {
    const dropzone = document.querySelector(`#${application.status} .dropzone`);

    const item = document.createElement("div");
    item.classList.add("item");
    item.dataset.id = application.id;

    item.innerHTML = `
    <div class="item__details">
      <h2 class="item__role">${application.role}</h2>

      <button class="item__button">⁝</button>

      <div class="item__options" style="display: none;">
        <button class="item__edit-button">✏️</button>

        <button class="item__delete-button">🗑️</button>
      </div>
    </div>

    <p class="item__details">
      <span class="item__company">${application.company}</span>

      <span class="item__date">${application.dateApplied.toLocaleDateString()}</span>
    </p>
    `;

    dropzone.appendChild(item);
  });
};

renderApplications();

// MODAL CLOSE
const modal = document.getElementById("modal");
const modalForm = document.querySelector(".modal__form");

const closeModal = () => {
  modalForm.reset();

  modal.style.display = "none";
};

const closeModalButton = document.querySelector(".modal__close-button");
closeModalButton.addEventListener("click", closeModal);

// close modal by clicking off of it
const modalBackground = document.getElementById("modal");
modalBackground.addEventListener("click", (event) => {
  // only clicking on the background should cause modal to close
  if (event.target === event.currentTarget) {
    closeModal();
  }
});

document.querySelector(".container").addEventListener("click", (event) => {
  const itemButton = event.target.closest(".item__button"); // .closeset traverses up DOM tree from event target
  // if there's no items on the board, there'll be no buttons to find
  if (!itemButton) return;

  const itemOptions = itemButton.nextElementSibling;

  // close all other kebab menus first
  document.querySelectorAll(".item__options").forEach((menu) => {
    if (menu !== itemOptions) {
      menu.style.display = "none";
    }
  });

  if (itemOptions.style.display === "none") {
    itemOptions.style.display = "flex";
  } else {
    itemOptions.style.display = "none";
  }
});

// ADD & EDIT APPLICATION
const roleInput = document.querySelector(`.modal__input[name="role"]`);
const companyInput = document.querySelector(`.modal__input[name="company"]`);

let modalMode = "add";

let applicationId = null;

const addApplication = (role, company) => {
  const newApplication = {
    id: crypto.randomUUID(),
    role,
    company,
    dateApplied: new Date(),
    status: "apply",
  };

  applications.push(newApplication);
};

const editApplication = (role, company) => {
  if (!applicationId) return;

  const editingApplication = applications.find(
    (app) => app.id === applicationId,
  );

  editingApplication.role = role;
  editingApplication.company = company;
};

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  modalMode = "add";

  const modal = document.getElementById("modal");
  modal.style.display = "flex";
});

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

  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "Edit Application";

  modalMode = "edit";

  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  const itemOptions = event.target.closest(".item__options");
  itemOptions.style.display = "none";
});

const submitButton = document.querySelector(".modal__submit-button");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const role = roleInput.value.trim();
  const company = companyInput.value.trim();

  if (!role || !company) return;

  if (modalMode === "add") {
    addApplication(role, company);
  } else {
    editApplication(role, company);
  }

  renderApplications();

  closeModal();
});

// DELETE APPLICATION
const deleteApplication = () => {
  const indexToDelete = applications.findIndex(
    (application) => application.id === applicationId,
  );

  console.log(indexToDelete);

  // index found
  if (indexToDelete !== -1) {
    applications.splice(indexToDelete, 1);
  }
};

document.querySelector(".container").addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".item__delete-button");
  // if there's no items on the board, there'll be no edit button to find
  if (!deleteButton) return;

  const item = deleteButton.closest(".item");
  applicationId = item.dataset.id;

  deleteApplication();

  renderApplications();
});
