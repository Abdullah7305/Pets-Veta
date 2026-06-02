const { PrismaClient, VerificationStatus } = require("@prisma/client");
const prisma = new PrismaClient();

const getCurrentDayName = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
};

const getCurrentTime = () => {
  return new Date().toTimeString().slice(0, 5); // HH:mm
};

const isTimeBetween = (currentTime, startTime, endTime) => {
  return currentTime >= startTime && currentTime <= endTime;
};

const buildSearchCondition = (search) => {
  if (!search) return undefined;

  return [
    { user: { fullName: { contains: search, mode: "insensitive" } } },
    { specialization: { contains: search, mode: "insensitive" } },
    { education: { contains: search, mode: "insensitive" } },
  ];
};

const getScheduleInfo = (schedules, today, currentTime) => {
  const availableSchedules = schedules.filter((slot) => slot.isEmergency);

  const todaySlots = availableSchedules.filter(
    (slot) => slot.day === today
  );

  const isActive = todaySlots.some((slot) =>
    isTimeBetween(currentTime, slot.startTime, slot.endTime)
  );

  const availableDays = [
    ...new Set(availableSchedules.map((slot) => slot.day)),
  ];

  const nextAvailableSlot = availableSchedules.find(
    (slot) => slot.day !== today || slot.startTime > currentTime
  );

  return {
    status: isActive ? "active" : "inactive",
    availableDays,
    todaySlots: todaySlots.map((slot) => ({
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
    nextAvailable: nextAvailableSlot
      ? {
        day: nextAvailableSlot.day,
        startTime: nextAvailableSlot.startTime,
        endTime: nextAvailableSlot.endTime,
      }
      : null,
  };
};

const formatDoctors = (doctors, today, currentTime) => {
  return doctors.map((doctor) => {
    const scheduleInfo = getScheduleInfo(
      doctor.doctorSchedules,
      today,
      currentTime
    );

    return {
      id: doctor.id,
      name: doctor.user.fullName,
      email: doctor.user.email,
      phone: doctor.user.phone,
      specialization: doctor.specialization,
      education: doctor.education,
      experience: doctor.experience,
      profileImage: doctor.user.profileImageUrl,
      ...scheduleInfo,
    };
  });
};

const getApprovedDoctorsForUsers = async ({ page = 1, limit = 5, search = "" }) => {
  const skip = (page - 1) * limit;
  const today = getCurrentDayName();
  const currentTime = getCurrentTime();

  const whereCondition = {
    isVerified: VerificationStatus.APPROVED,
    ...(search && { OR: buildSearchCondition(search) }),
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
          select: {
            fullName: true,
            email: true,
            phone: true,
            profileImageUrl: true,
          },
        },
        doctorSchedules: {
          select: {
            day: true,
            startTime: true,
            endTime: true,
            isEmergency: true,
          },
        },
      },
    }),
  ]);

  const formattedDoctors = formatDoctors(doctors, today, currentTime);

  return {
    data: formattedDoctors,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  getApprovedDoctorsForUsers,
};