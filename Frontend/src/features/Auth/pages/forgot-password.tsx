import ForgotPasswordForm
from "../components/forgot-password-form";

import styles
from "../../../styles/forgot-password.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <div className={styles.imageWrapper}>
          <img
            src="/forgot-password-img.png"
            alt="forgot password"
            className={styles.image}
          />
        </div>

        <ForgotPasswordForm />

      </div>

    </div>
  );
}