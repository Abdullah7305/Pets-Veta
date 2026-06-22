import type {
  PetOwnerDashboardData,
} from "../types/petOwnerDashboard.types";

export const dashboardData: PetOwnerDashboardData = {
  user: {
    id: "user-1",
    fullName: "Ayesha Khan",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },

  counts: {
    totalPets: 3,
    totalAppointments: 8,
    upcomingAppointments: 2,
    completedAppointments: 5,
    cancelledAppointments: 1,
    totalReports: 4,
  },

  pets: [
    {
      id: "pet-1",
      petOwnerId: "user-1",
      name: "Bruno",
      age: 3,
      breed: "German Shepherd",
      category: "DOG",
    },
    {
      id: "pet-2",
      petOwnerId: "user-1",
      name: "Kitty",
      age: 2,
      breed: "Persian Cat",
      category: "CAT",
    },
    {
      id: "pet-3",
      petOwnerId: "user-1",
      name: "Coco",
      age: 1,
      breed: "Parrot",
      category: "OTHER",
    },
  ],

  upcomingAppointments: [
    {
      id: "appointment-1",
      petId: "pet-1",
      petName: "Bruno",
      doctorId: "doctor-1",
      doctorName: "Dr. Ayesha Khan",
      appointmentType: "Checkup",
      checkupTime: "2026-05-24T10:00:00.000Z",
      clinicAddress: "Downtown Pet Clinic",
      status: "PENDING",
    },
    {
      id: "appointment-2",
      petId: "pet-2",
      petName: "Kitty",
      doctorId: "doctor-2",
      doctorName: "Dr. Ali Raza",
      appointmentType: "Vaccination",
      checkupTime: "2026-05-28T14:30:00.000Z",
      clinicAddress: "City Pet Care Hospital",
      status: "PENDING",
    },
  ],
};
