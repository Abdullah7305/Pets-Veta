import LoginComponent from "../../Auth/components/login-component";

import styles from "../../../styles/login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="/login-img.jpg" alt="login" className={styles.image} />
      </div>

      {/* RIGHT FORM */}
      <div className={styles.right}>
        <div className={styles.formBox}>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}
