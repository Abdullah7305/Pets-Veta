import VerifyOtpForm from "../components/verify-otp-form";

import styles from "../../../styles/verify-otp.module.css";

export default function VerifyOtpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src="/verify-otp-img.png"
            alt="verify otp"
            className={styles.image}
          />
        </div>

        <VerifyOtpForm />
      </div>
    </div>
  );
}
