const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dayMap = {
  Sunday: "SUNDAY",
  Monday: "MONDAY",
  Tuesday: "TUESDAY",
  Wednesday: "WEDNESDAY",
  Thursday: "THURSDAY",
  Friday: "FRIDAY",
  Saturday: "SATURDAY",
};

const getTodayEnumDay = () => {
  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return dayMap[todayName];
};

const getMinutesFromDate = (date) => {
  const parsedDate = new Date(date);
  return parsedDate.getHours() * 60 + parsedDate.getMinutes();
};

const getCurrentMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

const isCurrentTimeBetween = (startTime, endTime) => {
  const currentMinutes = getCurrentMinutes();
  const startMinutes = getMinutesFromDate(startTime);
  const endMinutes = getMinutesFromDate(endTime);

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getApprovedDoctorsForUsers = async ({
  page = 1,
  limit = 5,
  search = "",
}) => {
  const skip = (page - 1) * limit;
  const today = getTodayEnumDay();

  const searchCondition = search
    ? {
        OR: [
          {
            user: {
              fullName: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            specialization: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            education: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const whereCondition = {
    isVerified: "APPROVED",
    ...searchCondition,
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
        user: {
          fullName: "asc",
        },
      },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
            phone: true,
            profileImageUrl: true,
          },
        },
        doctorSchedules: {
          orderBy: {
            startTime: "asc",
          },
        },
      },
    }),
  ]);

  const formattedDoctors = doctors.map((doctor) => {
    const todaySlots = doctor.doctorSchedules.filter(
      (schedule) => schedule.day === today
    );

    const isActiveBySchedule = todaySlots.some((slot) =>
      isCurrentTimeBetween(slot.startTime, slot.endTime)
    );

    const availableDays = [
      ...new Set(doctor.doctorSchedules.map((schedule) => schedule.day)),
    ];

    const nextAvailableSlot = doctor.doctorSchedules.find((schedule) => {
      if (schedule.day !== today) return true;

      const currentMinutes = getCurrentMinutes();
      const startMinutes = getMinutesFromDate(schedule.startTime);

      return startMinutes > currentMinutes;
    });

    return {
      id: doctor.id,
      userId: doctor.userId,

      name: doctor.user.fullName,
      email: doctor.user.email,
      phone: doctor.user.phone || doctor.phone,
      profileImage:
        doctor.user.profileImageUrl !== "Enter your Image"
          ? doctor.user.profileImageUrl
          : null,

      specialization: doctor.specialization,
      qualification: doctor.education,
      experience: `${doctor.experience} Years`,
      fees: doctor.fees,
      address: doctor.address,

      status: doctor.isAvailable && isActiveBySchedule ? "active" : "inactive",

      availableDays,

      todaySlots: todaySlots.map((slot) => ({
        id: slot.id,
        day: slot.day,
        startTime: formatTime(slot.startTime),
        endTime: formatTime(slot.endTime),
        isEmergency: slot.isEmergency,
      })),

      nextAvailable: nextAvailableSlot
        ? {
            day: nextAvailableSlot.day,
            startTime: formatTime(nextAvailableSlot.startTime),
            endTime: formatTime(nextAvailableSlot.endTime),
            isEmergency: nextAvailableSlot.isEmergency,
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