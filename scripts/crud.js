export let applications = [];

export const readApplications = () => {
  const storedApplications = localStorage.getItem("applications");
  if (!storedApplications) return;

  applications = JSON.parse(storedApplications);

  // parse string dates into javascript date objects
  applications.forEach(
    (application) =>
      (application.dateApplied = new Date(application.dateApplied)),
  );
};

const setApplications = () => {
  localStorage.setItem("applications", JSON.stringify(applications));
};

export const createApplication = (role, company) => {
  applications.push({
    id: crypto.randomUUID(),
    role,
    company,
    dateApplied: new Date(),
    status: "apply",
  });

  setApplications();
};

export const updateApplication = (applicationId, role, company) => {
  if (!applicationId) return;

  const application = applications.find((app) => app.id === applicationId);

  if (!application) return;

  application.role = role;
  application.company = company;

  setApplications();
};

export const deleteApplication = (applicationId) => {
  const indexToDelete = applications.findIndex(
    (application) => application.id === applicationId,
  );

  if (indexToDelete === -1) return;

  applications.splice(indexToDelete, 1);

  setApplications();
};
