"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { auth, db } from "../firebase/firebaseConfig";

import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  birthDate: string;
}

const initialValues: SignupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "other",
  birthDate: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  birthDate: Yup.date()
    .max(new Date(), "Birth date cannot be in the future")
    .required("Birth date is required")
    .nullable(),
});

const SignupForm: React.FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );
        console.log("Firebase Auth Kullanıcı Oluşturuldu:", userCredential);

        const userDocRef = await addDoc(collection(db, "users"), {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          gender: values.gender,
          birthDate: new Date(values.birthDate), // Firestore'un kabul ettiği bir Date objesi olarak
        });
        console.log(
          "Firestore'a Kullanıcı Bilgileri Eklendi, Belge ID:",
          userDocRef.id,
        );
        toast.success(
          `${values.firstName} kullanıcı başarıyla oluşturuldu.Giriş sayfasına yönlendiriliyorsunuz.`,
        );
      } catch (error) {
        // Özel hata mesajını ayarla
        let errorMessage = "";
        // @ts-ignore
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "Bu e-posta hesabı zaten kayıtlı.";
        } else {
          // Genel hata mesajı
          errorMessage = "Kayıt sırasında bir hata oluştu.";
        }
        // Hata mesajını formik status'una ata
        formik.setStatus(errorMessage);
        console.error("Kullanıcı kaydı sırasında hata oluştu:", error);
      }
    },
  });

  const handleBirthDateChange = (e: { target: { value: any } }) => {
    const dateValue = e.target.value;
    formik.setFieldValue("birthDate", new Date(dateValue));
  };

  return (
    <div className="bg-primary-color w-[90%] md:w-[40%] mt-10 md:mt-0 md:p-8 bg-white relative rounded ml-auto mr-auto">
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
            "text-center absolute bg-white px-4 py-4 top-[18%] rounded center-item text-primary-500 italic mb-4"
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
        <div className={"flex flex-col md:flex-row gap-y-1 md:gap-y-0 gap-x-2"}>
          <div className={"md:w-1/2 flex flex-col"}>
            <label htmlFor="name">Name*</label>
            <input
              className={
                "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
              }
              id="name"
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              placeholder="First Name"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className={"md:w-1/2 flex flex-col"}>
            <label htmlFor="surname">Surname*</label>
            <input
              className={
                "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
              }
              id="surname"
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              placeholder="Last Name"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className={"flex flex-col gap-1"}>
          <label htmlFor="email">Email address*</label>
          <input
            className={
              "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
            }
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email address
"
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={"flex flex-col gap-1"}>
          <label htmlFor="password">Password</label>
          <input
            className={
              "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
            }
            id={"password"}
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className={"flex flex-col gap-1"}>
          <label htmlFor="gender">Gender</label>
          <select
            id={"gender"}
            className={
              "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
            }
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className={"flex flex-col w-full"}>
          <label htmlFor="bday">Birth Date</label>
          <input
            id={"bday"}
            className={
              "border border-gray-400 focus:border focus:outline-primary-500 rounded py-2 px-4"
            }
            type="date"
            name="birthDate"
            onChange={handleBirthDateChange}
            value={
              formik.values.birthDate
                ? // @ts-ignore
                  formik.values.birthDate.toISOString().split("T")[0]
                : ""
            }
            placeholder="Birth Date"
          />
          {formik.touched.birthDate && formik.errors.birthDate ? (
            <div style={{ color: "red" }}>{formik.errors.birthDate}</div>
          ) : null}
        </div>
        {formik.status && <div style={{ color: "red" }}>{formik.status}</div>}

        <div
          className={
            "opacity-90 duration-200 hover:opacity-100 bg-primary-50 hover flex w-full justify-center text-center py-2 text-white rounded"
          }
        >
          <button type={"submit"}>Submit</button>
        </div>
      </form>
      <div
        className={
          "text-center pt-4 underline hover:cursor-pointer hover:scale-[1.01] duration-200"
        }
      >
        <Link
          className={"w-full pb-10 md:pb-0 items-center justify-center pt-4"}
          href={"/login"}
        >
          Do you have a account ? Log In
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
