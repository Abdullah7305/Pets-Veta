const { PrismaClient } = require("@prisma/client");
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

const getApprovedDoctorsForUsers = async ({ page = 1, limit = 5, search = "" }) => {
  const skip = (page - 1) * limit;
  const today = getCurrentDayName();
  const currentTime = getCurrentTime();

  const whereCondition = {
    status: "approved",
    isVerified: true,
    OR: search
      ? [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            specialization: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            qualification: {
              contains: search,
              mode: "insensitive",
            },
          },
        ]
      : undefined,
  };

  const [total, doctors] = await Promise.all([
    prisma.doctor.count({
      where: whereCondition,
    }),

    prisma.doctor.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        phone: true,
        specialization: true,
        qualification: true,
        experience: true,
        profileImage: true,

        user: {
          select: {
            email: true,
          },
        },

        availability: {
          select: {
            id: true,
            day: true,
            startTime: true,
            endTime: true,
            isAvailable: true,
          },
        },
      },
    }),
  ]);

  const formattedDoctors = doctors.map((doctor) => {
    const todaySlots = doctor.availability.filter(
      (slot) => slot.day === today && slot.isAvailable
    );

    const isActive = todaySlots.some((slot) =>
      isTimeBetween(currentTime, slot.startTime, slot.endTime)
    );

    const availableDays = [
      ...new Set(
        doctor.availability
          .filter((slot) => slot.isAvailable)
          .map((slot) => slot.day)
      ),
    ];

    const nextAvailableSlot = doctor.availability.find(
      (slot) =>
        slot.isAvailable &&
        (slot.day !== today || slot.startTime > currentTime)
    );

    return {
      id: doctor.id,
      name: doctor.name,
      email: doctor.user?.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      profileImage: doctor.profileImage,

      status: isActive ? "active" : "inactive",
      availableDays,
      todaySlots,
      nextAvailable: nextAvailableSlot
        ? {
            day: nextAvailableSlot.day,
            startTime: nextAvailableSlot.startTime,
            endTime: nextAvailableSlot.endTime,
          }
        : null,
    };
  });

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