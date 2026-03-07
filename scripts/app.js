const applications = [
  {
    id: crypto.randomUUID(),
    role: "Junior Software Engineer",
    company: "Google",
    dateApplied: new Date("12-04-2025"),
    status: "progress",
  },
];

const modal = document.getElementById("modal");

let role = "";
const applicationRoleInput = document.querySelector(
  `.modal__input[name="role"]`,
);
applicationRoleInput.addEventListener("input", (event) => {
  role = event.target.value;

  console.log("role: ", role); // DEBUG
});

let company = "";
const applicationCompanyInput = document.querySelector(
  `.modal__input[name="company"]`,
);
applicationCompanyInput.addEventListener("input", (event) => {
  company = event.target.value;

  console.log("company: ", company); // DEBUG
});

// TODO: actually render applications onto page in their respective columns
// RENDER APPLICATIONS
const renderApplications = () => {
  const columns = ["apply", "progress", "reject", "offer"];

  //  clear all columns first
  columns.forEach((columnId) => {
    const dropzone = document.querySelector(`#${columnId} .dropzone`);

    dropzone.innerHTML = "";
  });

  // render each application into the correct col
  applications.forEach((application) => {
    const dropzone = document.querySelector(`#${application.status} .dropzone`);

    const item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `
    <div class="item__details">
      <h2 class="item__role">${application.role}</h2>

      <button id="edit-button">Edit</button>
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

// ADD APPLICATION
const addApplicationButton = document.getElementById("add-button");
addApplicationButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  modal.style.display = "flex";
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

// EDIT APPLICATION
const editApplicationButton = document.getElementById("edit-button");
// if there's no items on the board, there'll be no edit button to find
if (editApplicationButton) {
  editApplicationButton.addEventListener("click", () => {
    const modalTitle = document.querySelector(".modal__title");
    modalTitle.textContent = "Edit Application";

    modal.style.display = "flex";
  });
}
const editApplication = () => {};

// DELETE APPLICATION
const deleteApplication = () => {};

// TODO: how to set it dynamically between create application and edit application
const modalSubmitButton = document.querySelector(".modal__submit-button");
modalSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (role && company) {
    addApplication();

    closeModal();
  }
});

// CLOSE MODAL
const modalForm = document.querySelector(".modal__form");

const closeModal = () => {
  role = "";
  company = "";
  modalForm.reset();

  modal.style.display = "none";
};

const closeModalButton = document.querySelector(".modal__close-button");
closeModalButton.addEventListener("click", closeModal);

const modalBackground = document.getElementById("modal");
modalBackground.addEventListener("click", (event) => {
  // only clicking on the bg should cause modal to close
  if (event.target === event.currentTarget) {
    closeModal();
  }
});
