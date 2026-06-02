import PetFormPage from "./pages/PetFormPage";
import PetIssueReportPage from "./pages/PetIssueReportPage";

export const petsRoutes = [
  {
    path: "/pets/add",
    element: <PetFormPage />,
  },
  {
    path: "/pets/report-issue",
    element: <PetIssueReportPage />,
  },
];