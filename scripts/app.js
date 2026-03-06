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

// TODO: render applications onto page in their respective columns
const renderApplications = () => {};

const addApplication = () => {
  const newApplication = {
    id: crypto.randomUUID(),
    role,
    company,
    dateApplied: new Date(),
    status: "apply",
  };

  applications.push(newApplication);

  console.log(applications); // DEBUG
};

const editApplication = () => {};

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

const addApplicationButton = document.getElementById("add-button");
addApplicationButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  modal.style.display = "flex";
});

const editApplicationButton = document.getElementById("edit-button");
editApplicationButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "Edit Application";

  modal.style.display = "flex";
});

// delete application

// close modal using X button or clicking off content
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
