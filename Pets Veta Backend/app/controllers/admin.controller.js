const doctorServices = require('../services/admin.services');
const authServices = require('../services/auth.services');

const pendingDoctorList = async (req, res) => {
    try {
        const { id, email } = req.user;
        const pendingDoctors = await doctorServices.sendPendingDoctors();

        if (pendingDoctors === false) {
            return res.status(204).json({ message: 'No Pending Doctors Found' });

        }
        console.log("Pending Doctors ==>", pendingDoctors);
        const doctorData = {};

        return res.status(200).json({ message: 'Success', doctors: pendingDoctors });

    } catch (error) {
        console.log("Error in sending doctor list is ", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}


const approveDoctor = async (req, res) => {
    try {
        const { id, email } = req.user;
        const { doctorId } = req.body;

        if (!doctorId) {
            return res.status(400).json({ err: "No Doctor Id" });
        }



        return res.status(200).json({ message: 'Success', doctors: pendingDoctors });

    } catch (error) {
        console.log("Error in sending doctor list is ", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}



module.exports={
    pendingDoctorList,
    approveDoctor
}