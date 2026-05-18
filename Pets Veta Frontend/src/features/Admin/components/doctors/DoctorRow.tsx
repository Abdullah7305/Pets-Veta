import DoctorStatusBadge from "./DoctorStatusBadge";

import DoctorActions from "./DoctorActions";

interface Props {
  doctor: any;
}

const DoctorRow = ({ doctor }: Props) => {
  return (
    <tr className="border-b">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <img
            src={doctor.image}
            alt="doctor"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">{doctor.name}</h3>

            <p className="text-sm text-gray-500">{doctor.specialist}</p>
          </div>
        </div>
      </td>

      <td>{doctor.specialist}</td>

      <td>{doctor.experience}</td>

      <td>{doctor.email}</td>

      <td>{doctor.phone}</td>

      <td>
        <DoctorStatusBadge status={doctor.status} />
      </td>

      <td>
        <DoctorActions />
      </td>
    </tr>
  );
};

export default DoctorRow;
