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

module.exports = {
    sendPendingDoctors
}