import {
  appliedCount,
  inProgressCount,
  offerCount,
  rejectedCount,
} from "../crud.js";
import { applications } from "../crud.js";

export const renderCounts = () => {
  const appliedCountLabel = document.querySelector(`#apply .column__count`);
  appliedCountLabel.textContent = appliedCount;

  const inProgressCountLabel = document.querySelector(
    `#progress .column__count`,
  );
  inProgressCountLabel.textContent = inProgressCount;

  const rejectedCountLabel = document.querySelector(`#reject .column__count`);
  rejectedCountLabel.textContent = rejectedCount;

  const offerCountLabel = document.querySelector(`#offer .column__count`);
  offerCountLabel.textContent = offerCount;
};

export const renderItems = () => {
  const columns = ["apply", "progress", "reject", "offer"];

  // first, clear all columns
  columns.forEach((columnId) => {
    const dropzone = document.querySelector(`#${columnId} .dropzone`);

    dropzone.innerHTML = "";
  });

  // render each application into the correct column
  applications.forEach((application) => {
    const dropzone = document.querySelector(`#${application.status} .dropzone`);

    const item = document.createElement("li");
    item.classList.add("item");

    item.dataset.id = application.id;

    item.setAttribute("draggable", "true");

    // for drag-and-drop
    item.addEventListener("dragstart", (event) => {
      item.id = "dragged-item";

      event.dataTransfer.effectAllowed = "move";

      event.dataTransfer.setData("item", "");
    });

    item.addEventListener("dragend", (event) => {
      item.removeAttribute("id");
    });

    item.innerHTML = `
    <div class="item__details">
      <h2 class="item__role">${application.role}</h2>

      <button class="item__button">⁝</button>

      <div class="item__options" style="display: none;">
        <button class="item__update-button">✏️ Edit</button>

        <button class="item__delete-button">🗑️ Delete</button>
      </div>
    </div>

    <p class="item__details">
      <span class="item__company">${application.company}</span>

      <span class="item__date">${application.dateApplied.toLocaleDateString()}</span>
    </p>
    `;

    dropzone.appendChild(item);

    renderCounts();
  });
};
