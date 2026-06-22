import PetOwnerProfilePage from "./pages/PetOwnerProfilePage";
import PetFormPage from "../pet details/pages/PetFormPage";
import EditPetPage from "./pages/EditPetPage";

export const petProfileRoutes = [
  {
    path: "/pet-owner/profile",
    element: <PetOwnerProfilePage />,
  },
  {
    path: "/pet-owner/pets/add",
    element: <PetFormPage />,
  },
  {
    path: "/pet-owner/pets/:petId/edit",
    element: <EditPetPage />,
  },
];
