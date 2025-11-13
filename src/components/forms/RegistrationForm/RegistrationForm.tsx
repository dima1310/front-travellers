// "use client";

// import { useRouter } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import toast from "react-hot-toast";
// import { useAuthStore } from "@/store/useAuthStore";
// import {
//   register as apiRegister,
//   login as apiLogin,
// } from "@/services/api/authApi";
// import styles from "./RegistrationForm.module.css";
// import { RegistrationSchema } from "@/utils/validation/authSchemas";

// export default function RegistrationForm() {
//   const router = useRouter();
//   const { login } = useAuthStore();

//   const handleSubmit = async (
//     values: {
//       name: string;
//       email: string;
//       password: string;
//       confirmPassword: string;
//     },
//     { setSubmitting }: any
//   ) => {
//     try {
//       // 1) регистрация
//       await apiRegister({
//         name: values.name,
//         email: values.email,
//         password: values.password,
//       });
//       // 2) авто-логин после регистрации (чтобы сразу получить user + cookies)
//       const res = await apiLogin({
//         email: values.email,
//         password: values.password,
//       });

//       // сервер уже поставил HttpOnly cookies; кладём user в Zustand
//       login(res.data.user, /* token не нужен из cookies */ "cookie");

//       toast.success("Реєстрація пройшла успішно!");
//       router.push("/");
//     } catch (error: any) {
//       toast.error(error.message || "Помилка реєстрації");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ...оставляем твой JSX как есть
//   return (
//     <div className={styles.container}>
//       {/* ... */}
//       <Formik
//         initialValues={{
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         }}
//         validationSchema={RegistrationSchema}
//         onSubmit={handleSubmit}
//       >
//         {/* ... */}
//       </Formik>
//       {/* ... */}
//     </div>
//   );
// }
