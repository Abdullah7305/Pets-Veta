import PetOwnerProfilePage from "./pages/PetOwnerProfilePage";
// import AddPetPage from "./pages/AddPetPage";
import EditPetPage from "./pages/EditPetPage";

export const petProfileRoutes = [
  {
    path: "/pet-owner/profile",
    element: <PetOwnerProfilePage />,
  },
  // {
  //   path: "/pet-owner/pets/add",
  //   element: <AddPetPage />,
  // },
  {
    path: "/pet-owner/pets/:petId/edit",
    element: <EditPetPage />,
  },
];