import DoctorForm from "../components/doctor-form";
import styles from "../../../styles/doctor-signup.module.css";

export default function DoctorSignup() {
  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <DoctorForm />
      </div>

      {/* <div className={styles.right}>
        <img src="/doctor-pet.png" className={styles.image} alt="doctor" />
      </div> */}
    </div>
  );
}
