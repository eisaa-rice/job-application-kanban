const modalForm = document.querySelector(".modal__form");

const modal = document.getElementById("modal");

export const closeModal = () => {
  modalForm.reset();

  modal.style.display = "none";
};

const closeModalButton = document.querySelector(".modal__close-button");
closeModalButton.addEventListener("click", closeModal);

const modalBackground = document.getElementById("modal");
modalBackground.addEventListener("click", (event) => {
  // only clicking on the background should cause modal to close
  if (event.target === event.currentTarget) {
    closeModal();
  }
});
