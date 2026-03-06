const applications = [
  {
    id: crypto.randomUUID(),
    role: "Junior Software Engineer",
    company: "Google",
    dateApplied: "2026-03-04",
    status: "progress",
  },
];

// add application
const addApplicationButton = document.getElementById("add-button");
addApplicationButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

const closeModalButton = document.getElementById("close-button");
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});
