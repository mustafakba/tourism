"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("tr");
  const [chooseLanguage, setChooseLanguage] = useState<boolean>(false);
  const languages = [
    { code: "tr", name: "TR" },
    { code: "en", name: "EN" },
  ];

  // Dil seçimi yapacak fonksiyon
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
  };
  return (
    <div className={"bg-primary-50 shadow-xl"}>
      <div className={"wrapper text-white"}>
        <header className={"container flex items-center w-full h-[100px] "}>
          <Link href={"/"} className="logo">
            <Image
              src={"/assets/logos/svg/logo-nobg-white.svg.svg"}
              alt={"logo"}
              width={120}
              height={80}
            />
          </Link>
          <nav className="menu flex justify-center gap-x-5 flex-1">
            <div className={"menu-items"}>Otobüs Seferleri</div>
            <div className={"menu-items"}>Hizmetlerimiz</div>
            <div className={"menu-items"}>Otobüsüm-Yolcum Nerede</div>
            <div className={"menu-items"}>Yardım</div>
          </nav>
          <div className={"lang-bar relative"}>
            <div
              className={
                " flex gap-x-2 cursor-pointer opacity-80 hover:opacity-100"
              }
              onClick={() => setChooseLanguage(!chooseLanguage)}
            >
              <div className={"uppercase"}>{selectedLanguage}</div>
              <Image
                src={`/assets/images/${selectedLanguage}-flag.svg`}
                alt={selectedLanguage}
                height={25}
                width={25}
              />
            </div>
            {chooseLanguage && (
              <div className="absolute shadow border-primary-200 top-8">
                {languages
                  .filter((lang) => lang.code !== selectedLanguage) // Seçili olmayan dilleri filtrele
                  .map((lang, index) => (
                    <div
                      key={index}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="cursor-pointer w-[80px] shadow items-center justify-center flex gap-x-2 px-2" // İmleci işaretçi olarak ayarla
                    >
                      <div className={"uppercase"}>{lang.name}</div>
                      <Image
                        src={`/assets/images/${lang.code}-flag.svg`}
                        alt={lang.code}
                        height={25}
                        width={25}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
