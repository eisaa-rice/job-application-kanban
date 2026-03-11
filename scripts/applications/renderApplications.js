import { applications } from "../data.js";

export const renderApplications = () => {
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

    item.setAttribute("id", application.id);

    item.innerHTML = `
    <div class="item__details">
      <h2 class="item__role">${application.role}</h2>

      <button class="item__button">Edit</button>
    </div>

    <p class="item__details">
      <span class="item__company">${application.company}</span>

      <span class="item__date">${application.dateApplied.toLocaleDateString()}</span>
    </p>
    `;

    dropzone.appendChild(item);
  });
};
