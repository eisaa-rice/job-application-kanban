const modal = document.getElementById("modal");

const modalForm = document.querySelector(".modal__form");

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
