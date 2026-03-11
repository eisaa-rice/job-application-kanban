// TODO: autofill with previous info
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

// TODO: extract application info using id from item div attribute
const editApplication = () => {};

// TODO: apply event listener to all edit buttons on the page
const editApplicationButton = document.getElementById("edit-button");

console.log(editApplicationButton); // DEBUG

// if there's no items on the board, there'll be no edit button to find
if (editApplicationButton) {
  editApplicationButton.addEventListener("click", () => {
    const modalTitle = document.querySelector(".modal__title");
    modalTitle.textContent = "Edit Application";

    modal.style.display = "flex";
  });
}
