import PetOwnerForm from "../components/pet-owner-form";
import styles from "../../../styles/pet-owner-signup.module.css";

export default function PetOwnerSignup() {
  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <PetOwnerForm />
      </div>

      <div className={styles.right}>
        <img src="/login-img.jpg" className={styles.image} alt="pet owner" />
      </div>
    </div>
  );
}