"use client";

import Image from "next/image";
import {
  BuildingSvg,
  CastleSvg,
  ExploreSvg,
  HamburgerSvg,
  LocationSvg,
  MinusSvg,
  MountainSvg,
  PlusSvg,
  XSvg,
} from "./svgs";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useOutsideClick } from "@/lib/useOutsideClick";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { LinkedButton, LinkedPlaneButton } from "./buttons";

const Navbar = () => {
  const [openExplore, setOpenExplore] = useState<boolean>(false);
  const [openLocation, setOpenLocation] = useState<boolean>(false);

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 z-30 px-3 md:px-6 w-full md:w-[90%] md:max-w-7xl  bg-white border-b md:border border-neutral-200 shadow-sm flex m-0 md:my-2.5 md:rounded-md justify-between items-center text-xs">
      <div className="flex items-center gap-2">
        <Hamburger />

        <Link href={"/"} className="relative size-14">
          <Image
            src="/logo.webp"
            alt="Logo"
            fill
            priority
            sizes="200px"
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>

      {/* <input
        type="text"
        placeholder="Search for Boarding Schools, CBSE, ICSE..."
        className="h-10 w-full px-3 py-2 text-sm placeholder:text-sm rounded-md bg-neutral-100 border border-neutral-200 focus:outline-none"
      /> */}
      <div className="flex gap-2.5 items-center">
        <div className="hidden md:flex flex-col text-[10px] font-semibold tracking-tight">
          <span className="self-end text-neutral-700 ">Rate a School</span>
          <span className="bg-blue-500/20 text-blue-600 px-1.5 py-0.5 rounded-full ">
            Earn ₹500 Reward
          </span>
        </div>

        <OutsideContainer
          open={openLocation}
          setOpen={setOpenLocation}
          className="relative hidden md:block"
        >
          <SelectionButton open={openLocation} setOpen={setOpenLocation}>
            <LocationSvg
            // className={`stroke-neutral-700 group-hover:stroke-blue-500 ${openLocation && "stroke-blue-600"}`}
            />
            <span>Location</span>
          </SelectionButton>
          {openLocation && <SelectLocation />}
        </OutsideContainer>

        <OutsideContainer
          open={openExplore}
          setOpen={setOpenExplore}
          className="relative hidden md:block"
        >
          <SelectionButton open={openExplore} setOpen={setOpenExplore}>
            <ExploreSvg
            // className={`stroke-neutral-700 group-hover:stroke-blue-500 ${openExplore && "stroke-blue-600"}`}
            />
            <span>Explore</span>
          </SelectionButton>
          {openExplore && <SelectionExplore />}
        </OutsideContainer>

        {/* <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.15, ease: "easeIn" }}
        >
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-bold tracking-tight rounded-sm cursor-pointer shadow-sm"
          >
            Login
          </Link>
        </motion.div> */}
        <LinkedButton href="/login">Login</LinkedButton>
      </div>
    </nav>
  );
};

const Hamburger = ({ className }: { className?: string }) => {
  const [openHamburger, setOpenHamburger] = useState<boolean>(false);
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const [openExplore, setOpenExplore] = useState<boolean>(false);

  return (
    <div className="block md:hidden ">
      <div onClick={() => setOpenHamburger(true)} className={className}>
        <HamburgerSvg className="stroke-neutral-800 p-0.5" />
      </div>

      <AnimatePresence>
        {openHamburger && (
          <motion.div
            initial={{ x: "-200%" }}
            animate={{ x: 0 }}
            exit={{
              x: "-200%",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="fixed inset-0 h-screen w-full bg-white z-50 "
          >
            <div
              onClick={() => {
                setOpenHamburger(false);
              }}
              className="absolute right-4 top-4 bg-neutral-100 rounded-full"
            >
              <XSvg className="p-1 stroke-neutral-400" />
            </div>

            <div className="h-16 flex items-center pl-2 border-b border-neutral-200">
              <Link href={"/"} className="relative block size-14">
                <Image
                  src="/logo.webp"
                  alt="Logo"
                  fill
                  priority
                  sizes="200px"
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </div>

            <div className="relative">
              <SelectionButton
                open={openLocation}
                setOpen={setOpenLocation}
                className={cn(
                  "w-full py-4 px-5 border-b border-neutral-200",
                  openLocation && "border-y border-blue-500",
                )}
              >
                <LocationSvg />
                <span>Location</span>
                {openLocation ? (
                  <MinusSvg className="absolute right-5" />
                ) : (
                  <PlusSvg className="absolute right-5" />
                )}
              </SelectionButton>
              {openLocation && <SelectLocation />}
            </div>

            <div className="relative">
              <SelectionButton
                open={openExplore}
                setOpen={setOpenExplore}
                className={cn(
                  "w-full py-4 px-5 border-b border-neutral-200 group",
                  openExplore && " border-y border-blue-500",
                )}
              >
                <ExploreSvg />
                <span>Explore</span>
                {openExplore ? (
                  <MinusSvg className="absolute right-5" />
                ) : (
                  <PlusSvg className="absolute right-5" />
                )}
              </SelectionButton>
              {openExplore && <SelectionExplore />}
            </div>

            <motion.div
              layout
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <Link
                href="/login"
                className="block w-[94%] my-5 py-3.5 mx-auto bg-blue-600 hover:bg-blue-700 text-[16px] text-white text-center px-4 font-bold tracking-wide rounded-md cursor-pointer shadow-sm"
              >
                Login/Sign Up
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OutsideContainer = ({
  open,
  setOpen,
  children,
  className,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      animate={{ scale: open ? 1.08 : 1 }}
      transition={{ duration: 0.15, ease: "easeIn" }}
      ref={ref}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SelectLocation = () => {
  const cities = [
    {
      svg: <BuildingSvg />,
      name: "Mumbai",
      href: "/mumbai",
    },
    {
      svg: <BuildingSvg />,
      name: "Pune",
      href: "/pune",
    },
    {
      svg: <BuildingSvg />,
      name: "Bangalore",
      href: "/bangalore",
    },
    {
      svg: <MountainSvg />,
      name: "Shimla",
      href: "/shimla",
    },
    {
      svg: <MountainSvg />,
      name: "Dehradun",
      href: "/dehradun",
    },
    {
      svg: <MountainSvg />,
      name: "Mussoorie",
      href: "/mussoorie",
    },
    {
      svg: <CastleSvg />,
      name: "Jaipur",
      href: "/jaipur",
    },
    {
      svg: <BuildingSvg />,
      name: "Other Cities",
      href: "/cities",
    },
  ];

  return (
    <SelectionBox className="w-screen md:w-100">
      <SelectionTitle>Select City</SelectionTitle>
      <SelectionContent>
        {cities.map((city) => (
          <LinkedPlaneButton key={city.name} href={city.href}>
            {city.svg}
            {city.name}
          </LinkedPlaneButton>
        ))}
      </SelectionContent>
    </SelectionBox>
  );
};

const SelectionExplore = () => {
  const links = [
    {
      name: "All Boarding Schools",
      href: "/",
    },
    {
      name: "Compare Schools",
      href: "/compare-schools",
    },
    {
      name: "Elite Scholarships",
      href: "/scholarShips",
    },
    {
      name: "Educational Blog",
      href: "/blogs",
    },
    {
      name: "Parent's Jounral",
      href: "/blogs",
    },
    {
      name: "Ask an Expert",
      href: "/guidence",
    },
    {
      name: "Schools near me",
      href: "/school",
    },
    {
      name: "Course Selection",
      href: "/school",
    },
    {
      name: "Admission Alert",
      href: "/login",
    },
  ];
  return (
    <SelectionBox className="w-screen md:w-150">
      <SelectionTitle>Explore More</SelectionTitle>
      <SelectionContent className="grid-cols-3">
        {links.map((link) => (
          <LinkedPlaneButton key={link.name} href={link.href}>
            {link.name}
          </LinkedPlaneButton>
        ))}
      </SelectionContent>
    </SelectionBox>
  );
};

const SelectionBox = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={cn(
        "md:absolute origin-top px-5 py-4 bg-white z-30 md:right-0 md:top-11.5 md:rounded-lg border-y md:border border-neutral-200 md:shadow-sm",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

const SelectionTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <h1 className={cn("text-xl font-bold", className)}>{children}</h1>;
};
const SelectionContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("mt-4 grid grid-cols-2 gap-x-2 gap-y-2", className)}>
      {children}
    </div>
  );
};

const SelectionButton = ({
  open,
  setOpen,
  className,
  children,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.button
      layout
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      onClick={() => setOpen((prev) => !prev)}
      className={cn(
        "flex items-center group text-neutral-700 hover:text-blue-500 px-2 py-1 font-semibold tracking-tighter cursor-pointer",
        open && "text-blue-600 hover:text-blue-600",
        className,
      )}
    >
      {children}
    </motion.button>
  );
};

export default Navbar;
