"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser } from "@/provider/redux/users/usersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faCircleXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
}

const Header = () => {
  // @ts-ignore
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();
  const [mobileMenu, setIsMobileMenu] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expiryTime = localStorage.getItem("expiryTime");

    if (storedUser && expiryTime) {
      const currentTime = new Date().getTime();
      const expiry = parseInt(expiryTime, 10);

      if (currentTime < expiry) {
        const user = JSON.parse(storedUser);
        dispatch(setUser(user));
      } else {
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm(
      "Çıkış yapmak istediğinizden emin misiniz?",
    );
    if (isConfirmed) {
      dispatch(clearUser());
      handleMenuToggle();
      router.push("/login");
      localStorage.removeItem("user");
      localStorage.removeItem("expiryTime");
      // @ts-ignore
      setUser(null);
    }
  };

  return (
    <div className={"bg-primary-50 shadow-xl"}>
      <div className={"wrapper text-white"}>
        <header
          className={
            "container justify-between flex items-center w-full h-[100px] "
          }
        >
          <Link href={"/"} className="logo">
            <Image
              src={"/assets/logos/svg/logo-nobg-white.svg.svg"}
              alt={"logo"}
              width={120}
              height={80}
            />
          </Link>
          <nav className="hidden menu md:flex justify-center gap-x-5 flex-1">
            <Link href={"/seferler"} className={"menu-items"}>
              Trips
            </Link>
            <div>About Us</div>
            <div>Who We Are</div>
            <div>Help</div>
          </nav>
          <div className="block md:hidden">
            <button
              onClick={handleMenuToggle}
              className="hamburger-button flex items-center gap-x-2 text-xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className={"auth-bar hidden md:block"}>
            {
              // @ts-ignore

              user?.firstName ? (
                <div className="user-info flex gap-x-2 items-center">
                  <div
                    className={
                      "opacity-90 hover:opacity-100 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                    }
                  >
                    <FontAwesomeIcon className={"mr-2"} icon={faUser} />
                    <span>
                      {
                        // @ts-ignore

                        user.firstName
                      }
                    </span>
                  </div>
                  <button
                    className={
                      "opacity-90 hover:opacity-100 gap-x-2 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                    }
                    onClick={handleLogout}
                  >
                    <span className={"mr-2"}>Log Out</span>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </button>
                </div>
              ) : (
                <div className={"flex gap-x-3"}>
                  <Link href="/login">
                    <button
                      className={
                        "opacity-90 hover:opacity-100 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                      }
                    >
                      Login
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button
                      className={
                        "opacity-90 hover:opacity-100 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                      }
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              )
            }
          </div>
          <nav
            className={
              "flex md:hidden w-full transition-all top-0 min-h-[100vh] z-[120] fixed duration-700 bg-[#6750ff]" +
              (mobileMenu ? " right-0 " : " right-[-100%] ")
            }
          >
            <ul className="flex w-full flex-col relative px-4 lg:px-16 py-4 gap-x-5 text-inverse-color tracking-widest">
              <div className="mb-12 flex w-full justify-between">
                <button
                  onClick={handleMenuToggle}
                  className={
                    "h-[80px] flex items-center justify-center w-full border-b border-white"
                  }
                >
                  <Link href={"/"} className="logo">
                    <Image
                      src={"/assets/logos/svg/logo-nobg-white.svg.svg"}
                      alt={"logo"}
                      width={120}
                      height={80}
                    />
                  </Link>
                </button>
                <button className=" " onClick={handleMenuToggle}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={`${
                      mobileMenu
                        ? "transition-all rotate-0 duration-50 text-xl"
                        : "transition-all rotate-180 duration-50 text-xl"
                    }`}
                  />
                </button>
              </div>
              <nav className="menu  flex md:hidden flex-col gap-y-5 justify-center">
                <div className={"menu-items"}>Otobüs Seferleri</div>
                <div className={"menu-items"}>Hizmetlerimiz</div>
                <div className={"menu-items"}>Otobüsüm-Yolcum Nerede</div>
                <div className={"menu-items"}>Yardım</div>

                {
                  // @ts-ignore

                  user?.firstName ? (
                    <div className="user-info flex gap-x-2 items-center">
                      <div
                        className={
                          "opacity-90 hover:opacity-100 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                        }
                      >
                        <FontAwesomeIcon className={"mr-2"} icon={faUser} />
                        <span>
                          {
                            // @ts-ignore
                            user.firstName
                          }
                        </span>
                      </div>
                      <button
                        className={
                          "opacity-90 hover:opacity-100 gap-x-2 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                        }
                        onClick={handleLogout}
                      >
                        <span className={"mr-2"}>Log Out</span>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      </button>
                    </div>
                  ) : (
                    <div className={"flex gap-x-3"}>
                      <Link href="/login">
                        <button
                          onClick={handleMenuToggle}
                          className={
                            "opacity-90 hover:opacity-100 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                          }
                        >
                          Login
                        </button>
                      </Link>
                      <Link href="/signup">
                        <button
                          onClick={handleMenuToggle}
                          className={
                            "opacity-90 hover:opacity-100 duration-200 text-center bg-gray-50 py-1 px-4 rounded text-primary-200"
                          }
                        >
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  )
                }
              </nav>
              <Link className="my-4" href={"/"}>
                <button onClick={handleMenuToggle}>Kapat</button>
              </Link>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
