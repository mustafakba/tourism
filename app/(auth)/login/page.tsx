"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";

import {
  getDocs,
  query,
  where,
  collection,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../provider/redux/users/usersSlice";
import { calculateAge } from "../../../utils/CalculateAge";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // @ts-ignore
  const user = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );
        console.log("Firebase Auth ile Giriş Yapıldı:", userCredential);

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("email", "==", values.email));
        const querySnapshot = await getDocs(q);
        let userData = null;
        querySnapshot.forEach((doc) => {
          console.log("Kullanıcı Bilgileri:", doc.id, " => ", doc.data());
          const data = doc.data();
          userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            birthDate: calculateAge(data.birthDate),
            gender: data.gender,
          };
          const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 saat sonrasını hesapla
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("expiryTime", expiryTime.toString());
          if (data) {
            // @ts-ignore
            dispatch(setUser(userData));
            router.push("/");
          }
        });
        toast.success("Başarıyla giriş yapıldı.");
      } catch (error) {
        let errorMessage = "Giriş sırasında bir hata oluştu.";
        formik.setStatus(errorMessage);
        toast.error("Mail adresi veya şifre hatalı.");
      }
    },
  });

  useEffect(() => {
    if (user.firstName) {
      // Eğer user.firstName varsa, kullanıcı giriş yapmış demektir.
      router.push("/"); // Ana sayfaya yönlendir.
    }
  }, [user, router]);
  return (
    <div className="bg-primary-color h-full w-[90%] md:w-[40%] mt-10 md:mt-0 md:p-8 bg-white relative rounded ml-auto mr-auto">
      <div className="authBanner flex flex-col w-full">
        <Image
          className={"w-full max-h-[200px] rounded"}
          src={"/assets/images/bannerAuth.jpg"}
          alt={"banner"}
          width={600}
          height={0}
        />
        <div
          className={
            "text-center absolute bg-white px-4 py-4 top-[30%] md:top-[18%] rounded center-item text-primary-500 italic mb-4"
          }
        >
          <Link href={"/"}>
            <Image
              src={"/assets/logos/svg/logo-no-background.svg"}
              alt={"logo"}
              width={250}
              height={250}
            />
          </Link>
          <span className={"text-[11px]"}> Sign Up For The Future</span>
        </div>
      </div>
      <form
        className={"flex flex-col gap-y-4 mt-10"}
        onSubmit={formik.handleSubmit}
      >
        <div className={" flex flex-col"}>
          <label htmlFor="name">Email*</label>
          <input
            className={
              "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
            }
            id="name"
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={"flex flex-col"}>
          <label htmlFor="password">Password*</label>
          <input
            className={
              "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
            }
            id="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Last Name"
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
        </div>
        <div
          className={
            "opacity-90 duration-200 hover:opacity-100 bg-primary-50 hover flex w-full justify-center text-center py-2 text-white rounded"
          }
        >
          <button
            className={"flex w-full items-center text-center justify-center"}
            type={"submit"}
          >
            Login
          </button>
        </div>
      </form>
      <div
        className={
          "text-center pt-4 underline hover:cursor-pointer hover:scale-[1.01] duration-200"
        }
      >
        <Link
          className={"w-full items-center justify-center my-5 md:my-0 pt-4"}
          href={"/signup"}
        >
          You don't have a account ? Signup.
        </Link>
      </div>
    </div>
  );
};
export default LoginForm;
