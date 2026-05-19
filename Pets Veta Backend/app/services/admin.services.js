const { default: prisma, userRole } = require('../config/prisma')


const sendPendingDoctors = async () => {
    const pendingDoctors = await prisma.doctor.findMany({
        where: {
            isVerified: false
        }
    })
    if (pendingDoctors.length == 0) {
        return false;
    }
    return pendingDoctors;
}

const rejectDoctor = async (doctorId) => {

    const doExist = await prisma.doctor.findUnique({
        where: {
            id: doctorId
        }
    })
    const rejectDoctor = await prisma.doctor.delete({
        where: {
            id: doctorId
        }
    })
    return rejectDoctor;
}

const approvedDoctor = async (doctorId) => {
    const doExist = await prisma.doctor.findUnique({
        where: {
            id: doctorId
        }
    })
    const approveDoctor = await prisma.doctor.update({
        where: {
            id: doctorId
        },
        data: {
            isVerified: true
        }
    })
    return approveDoctor;

}

module.exports = {
    sendPendingDoctors,
    approvedDoctor,
    rejectDoctor
}