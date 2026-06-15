const { PrismaClient, VerificationStatus } = require("@prisma/client");
const prisma = new PrismaClient();

const getUpcomingSlotsFilter = (currentDate) => ({
  isBooked: false,
  endTime: { gte: currentDate },
});


const formatSingleSlot = (slot) => ({
  scheduleId: slot.id,
  date: slot.date,
  day: slot.date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
  startTime: slot.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
  endTime: slot.endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
  startDateTime: slot.startTime.toISOString(),
  endDateTime: slot.endTime.toISOString(),
});

const compileScheduleInfo = (doctorSchedules, currentDate) => {
  const todayString = currentDate.toDateString();
  const slots = doctorSchedules.map(formatSingleSlot);

  return {
    availableSlots: slots,
    todaySlots: slots.filter((s) => new Date(s.startDateTime).toDateString() === todayString),
    availableDays: [...new Set(slots.map((s) => s.day))],
    status: doctorSchedules.some((s) => currentDate >= s.startTime && currentDate < s.endTime) ? "active" : "inactive",
    nextAvailable: slots[0] || null,
  };
};


const getApprovedDoctorsForUsers = async ({ page = 1, limit = 5, search = "" }) => {
  const skip = (page - 1) * limit;
  const currentDate = new Date();
  const slotsFilter = getUpcomingSlotsFilter(currentDate);

  const whereCondition = {
    isVerified: VerificationStatus.APPROVED,
    doctorSchedules: { some: slotsFilter },
    ...(search && {
      OR: [
        { user: { fullName: { contains: search, mode: "insensitive" } } },
        { specialization: { contains: search, mode: "insensitive" } },
        { education: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [total, doctors] = await Promise.all([
    prisma.doctor.count({ where: whereCondition }),
    prisma.doctor.findMany({
      where: whereCondition,
      skip,
      take: limit,
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        user: {
          select: { fullName: true, email: true, phone: true, profileImageUrl: true },
        },
        doctorSchedules: {
          where: slotsFilter,
          orderBy: { startTime: "asc" },
        },
      },
    }),
  ]);

  const formattedDoctors = doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.user.fullName,
    email: doctor.user.email,
    phone: doctor.user.phone,
    specialization: doctor.specialization,
    education: doctor.education,
    experience: doctor.experience,
    profileImage: doctor.user.profileImageUrl,
    ...compileScheduleInfo(doctor.doctorSchedules, currentDate), // 👈 Beautifully lightweight mapping
  }));

  return {
    data: formattedDoctors,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};


const getSpecificDoctor = async (doctorId) => {
  const currentDate = new Date();

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: {
      id: true,
      education: true,
      fees: true,
      specialization: true,
      experience: true,
      isAvailable: true,
      isVerified: true,
      user: {
        select: { fullName: true, profileImageUrl: true },
      },
      doctorSchedules: {
        where: getUpcomingSlotsFilter(currentDate),
        orderBy: { startTime: "asc" },
      },
    },
  });

  if (!doctor) return null;

  return {
    id: doctor.id,
    name: doctor.user?.fullName || "Unknown Doctor",
    image: doctor.user?.profileImageUrl || null,
    specialization: doctor.specialization,
    experience: doctor.experience,
    education: doctor.education,
    fees: doctor.fees,
    isVerified: VerificationStatus.APPROVED,
    ...compileScheduleInfo(doctor.doctorSchedules, currentDate),
  };
};


const getBookableSlotsByDoctorId = async (doctorId) => {
  const doctor = await getSpecificDoctor(doctorId);
  return doctor ? doctor.availableSlots : null;
};

module.exports = {
  getApprovedDoctorsForUsers,
  getSpecificDoctor,
  getBookableSlotsByDoctorId,
};