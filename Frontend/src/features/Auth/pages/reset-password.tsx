import ResetPasswordForm from "../components/reset-password-form";

import styles from "../../../styles/reset-password.module.css";

export default function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src="/reset-password-img.png"
            alt="reset password"
            className={styles.image}
          />
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
