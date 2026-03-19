import { applications } from "./data.js"; // i guess this is the "read" lol

export const createApplication = (role, company) => {
  applications.push({
    id: crypto.randomUUID(),
    role,
    company,
    dateApplied: new Date(),
    status: "apply",
  });
};

export const updateApplication = (applicationId, role, company) => {
  if (!applicationId) return;

  const application = applications.find((app) => app.id === applicationId);

  if (!application) return;

  application.role = role;
  application.company = company;
};

export const deleteApplication = (applicationId) => {
  const indexToDelete = applications.findIndex(
    (application) => application.id === applicationId,
  );

  if (indexToDelete === -1) return;

  applications.splice(indexToDelete, 1);
};
