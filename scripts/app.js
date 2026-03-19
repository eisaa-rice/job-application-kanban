import { readApplications } from "./crud.js";
import { renderApplications } from "./ui.js";

// TODO: probably split this file into 2: one for modal & kebab menus and other for application crud handling

readApplications();

renderApplications();
