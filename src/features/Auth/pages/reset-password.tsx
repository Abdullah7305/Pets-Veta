// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Input from "@/shared/components/Input/Input";
// import Button from "@/shared/components/Button/Button";

// export default function ResetPasswordPage() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";

//   const validate = () => {
//     if (!newPassword || !confirmPassword) {
//       return "Please fill in both password fields";
//     }
//     if (newPassword.length < 8) {
//       return "Password must be at least 8 characters long";
//     }
//     if (newPassword !== confirmPassword) {
//       return "Passwords do not match";
//     }
//     return "";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const validationError = validate();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setLoading(true);

//       // TODO: Replace with your actual API call
//       // await api.post("/auth/reset-password", {
//       //   email,
//       //   password: newPassword,
//       // });

//       navigate("/login", {
//         state: { message: "Password reset successfully. Please login." },
//       });
//     } catch (err) {
//       setError("Failed to reset password. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
//         {/* HEADER */}
//         <div className="mb-6 text-center">
//           <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Enter your new password below
//           </p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <Input
//             label="New Password"
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             showPassword={showNewPassword}
//             onTogglePassword={() => setShowNewPassword(!showNewPassword)}
//           />

//           <Input
//             label="Confirm New Password"
//             type="password"
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             showPassword={showConfirmPassword}
//             onTogglePassword={() =>
//               setShowConfirmPassword(!showConfirmPassword)
//             }
//           />

//           {/* ERROR MESSAGE */}
//           {error && <p className="text-sm text-red-500">{error}</p>}

//           {/* RESET BUTTON */}
//           <Button type="submit" variant="primary" disabled={loading}>
//             {loading ? "Resetting..." : "Reset Password"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }