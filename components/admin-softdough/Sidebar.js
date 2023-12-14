"use client";
import Image from "next/image";
import React, { forwardRef, useState } from "react";
import Logo from "@public/images/logo.svg";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import {
  ChartPieIcon,
  ChevronUpIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const ingredientDropdown = [
  { title: "วัตถุดิบเข้าร้าน", href: "/ingredients/instore" },
  { title: "วัตถุดิบทั้งหมด", href: "/ingredients/all" },
  { title: "วัตถุดิบที่ใช้", href: "/ingredients/using" },
  { title: "รออนุมัติ", href: "/ingredients/pending" },
];

const Sidebar = ({ children, className }) => {
  const [isActive, setIsActive] = useState(null);
  const handleActive = (page) => {
    setIsActive(page);
    console.log(isActive);
  };
  return (
    <div className={`flex flex-row justify-between items-center ${className}`}>
      {/* เริ่มต้น Sidebar */}
      <nav className="flex flex-col gap-4 py-4 bg-white h-screen max-w-md min-w-[240px]">
        <SoftDoughLogo />
        {/* MenuLink คือ Component ที่สร้างขึ้นมาเองโค้ดอยู่ด้านล่าง */}
        <div className="flex flex-col">
          <MenuLink
            isActive={isActive === "ภาพรวม"}
            href="/dashboard"
            title="ภาพรวม"
            startIcon={<ChartPieIcon className="h-5 w-5 inherit" />}
            handleActive={handleActive}
          />
          {/* MenuDropdown ก็สร้างเองอาศัย Accordian ของ headlessui มาทำ 
          แต่ state active ยังไม่แก้ มันจะแปลกๆ หน่อยเดะมาอัปเดตให้ */}
          <MenuDropdown
            title="วัตถุดิบ"
            startIcon={<CubeIcon className="h-5 w-5 inherit" />}
            endIcon={<ChevronUpIcon className="h-5 w-5 inherit" />}
          >
            {ingredientDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;

export const SoftDoughLogo = () => {
  return (
    <Link href="/" className="w-full flex justify-center items-center">
      <Image
        src={Logo}
        width={120}
        height={120}
        className="object-cover"
        alt="logo"
      />
    </Link>
  );
};

export const MenuLink = ({
  title,
  startIcon,
  endIcon,
  href,
  isActive = false,
  handleActive,
}) => {
  const handleClick = () => {
    handleActive(title);
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`flex flex-row flex-wrap justify-between items-center py-2 px-4 ${
        isActive
          ? "bg-[#73664B] hover:bg-[#5E523C]"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex gap-2.5 ">
        {startIcon && (
          <span className={isActive ? "text-white" : "text-gray-700"}>
            {startIcon}
          </span>
        )}
        <span
          className={`text-sm font-medium 
          ${!startIcon && "ml-8"} 
          ${isActive ? "text-white" : "text-gray-700"}`}
        >
          {title}
        </span>
      </div>
      {endIcon && (
        <span className={isActive ? "text-white" : "text-gray-700"}>
          {endIcon}
        </span>
      )}
    </Link>
  );
};

export const MenuDropdown = ({ title, startIcon, children, endIcon }) => {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex flex-row flex-wrap justify-between items-center py-2 px-4 ${
                open
                  ? "bg-[#73664B] hover:bg-[#5E523C]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-2.5 ">
                {startIcon && (
                  <span className={open ? "text-white" : "text-gray-700"}>
                    {startIcon}
                  </span>
                )}
                <span
                  className={`text-sm font-medium ${
                    open ? "text-white" : "text-gray-700"
                  }
                  `}
                >
                  {title}
                </span>
              </div>
              {endIcon && (
                <span
                  className={`${open && "rotate-180 transform"} 
                  ${open ? "text-white" : "text-gray-700"}`}
                >
                  {endIcon}
                </span>
              )}
            </Disclosure.Button>
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
