const { PrismaClient, VerificationStatus } = require("@prisma/client");
const prisma = new PrismaClient();

const SLOT_DURATION_IN_MINUTES = 60;

const getCurrentDayName = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }).toUpperCase();
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const isDateBetween = (currentDate, startTime, endTime) => {
  return currentDate >= new Date(startTime) && currentDate < new Date(endTime);
};

const buildBookedAppointmentSet = (appointments = []) => {
  return new Set(
    appointments.map((appointment) =>
      new Date(appointment.checkupTime).getTime()
    )
  );
};

const buildHourlySlots = (schedule, bookedAppointments) => {
  const slots = [];
  const slotDuration = SLOT_DURATION_IN_MINUTES * 60 * 1000;
  let slotStart = new Date(schedule.startTime);
  const scheduleEnd = new Date(schedule.endTime);

  while (slotStart.getTime() + slotDuration <= scheduleEnd.getTime()) {
    const slotEnd = new Date(slotStart.getTime() + slotDuration);
    const isBooked = bookedAppointments.has(slotStart.getTime());

    if (!isBooked) {
      slots.push({
        scheduleId: schedule.id,
        date: schedule.date,
        day: schedule.day,
        startTime: formatTime(slotStart),
        endTime: formatTime(slotEnd),
        startDateTime: slotStart.toISOString(),
        endDateTime: slotEnd.toISOString(),
      });
    }

    slotStart = slotEnd;
  }

  return slots;
};

const buildSearchCondition = (search) => {
  if (!search) return undefined;

  return [
    { user: { fullName: { contains: search, mode: "insensitive" } } },
    { specialization: { contains: search, mode: "insensitive" } },
    { education: { contains: search, mode: "insensitive" } },
  ];
};

const getScheduleInfo = (schedules, appointments, today, currentDate) => {
  const bookedAppointments = buildBookedAppointmentSet(appointments);
  const availableSlots = schedules.flatMap((schedule) =>
    buildHourlySlots(schedule, bookedAppointments)
  );
  const bookableSlots = availableSlots.filter(
    (slot) => new Date(slot.startDateTime) >= currentDate
  );

  const todaySlots = bookableSlots.filter(
    (slot) => slot.day === today
  );

  const isActive = schedules.some((slot) =>
    isDateBetween(currentDate, slot.startTime, slot.endTime)
  );

  const availableDays = [
    ...new Set(bookableSlots.map((slot) => slot.day)),
  ];

  const nextAvailableSlot = bookableSlots[0];

  return {
    status: isActive ? "active" : "inactive",
    availableDays,
    availableSlots: bookableSlots,
    todaySlots,
    nextAvailable: nextAvailableSlot
      ? {
        scheduleId: nextAvailableSlot.scheduleId,
        date: nextAvailableSlot.date,
        day: nextAvailableSlot.day,
        startTime: nextAvailableSlot.startTime,
        endTime: nextAvailableSlot.endTime,
        startDateTime: nextAvailableSlot.startDateTime,
        endDateTime: nextAvailableSlot.endDateTime,
      }
      : null,
  };
};

const formatDoctors = (doctors, today, currentDate) => {
  return doctors.map((doctor) => {
    const scheduleInfo = getScheduleInfo(
      doctor.doctorSchedules,
      doctor.appointments,
      today,
      currentDate
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
  const currentDate = new Date();

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
            id: true,
            date: true,
            day: true,
            startTime: true,
            endTime: true,
          },
          orderBy: {
            startTime: "asc",
          },
        },
        appointments: {
          select: {
            checkupTime: true,
          },
        },
      },
    }),
  ]);

  const formattedDoctors = formatDoctors(doctors, today, currentDate);

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

const getSpecificDoctor = async (doctorId) => {
  const today = getCurrentDayName();
  const currentDate = new Date();

  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    },
    select: {
      id: true,
      education: true,
      fees: true,
      specialization: true,
      experience: true,
      isAvailable: true,
      isVerified: true,
      user: {
        select: {
          profileImageUrl: true,
          fullName: true,
          doctorSkills: {
            select: {
              price: true,
              skill: true
            }
          }
        }
      },
      doctorSchedules: {
        select: {
          id: true,
          date: true,
          day: true,
          startTime: true,
          endTime: true,
        },
        orderBy: {
          date: 'asc'
        }
      },
      appointments: {
        select: {
          checkupTime: true,
        },
      }
    }
  });

  if (!doctor) {
    return null;
  }

  const scheduleInfo = getScheduleInfo(
    doctor.doctorSchedules,
    doctor.appointments,
    today,
    currentDate
  );

  return {
    ...doctor,
    ...scheduleInfo,
  };
};

const getBookableSlotsByDoctorId = async (doctorId) => {
  const doctor = await getSpecificDoctor(doctorId);

  if (!doctor) {
    return null;
  }

  return doctor.availableSlots;
};


module.exports = {
  getApprovedDoctorsForUsers,
  getSpecificDoctor,
  getBookableSlotsByDoctorId,
};
