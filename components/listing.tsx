"use client";

import React, { useEffect, useRef, useState } from "react";
import { LinkedButton, LinkedPlaneButton, PlaneButton } from "./buttons";
import {
  FilterSvg,
  GridListSvg,
  ListSvg,
  LocationSvg,
  StarSvg,
  TableSvg,
  VerifiedSvg,
  XSvg,
} from "./svgs";
import { Modal } from "./modal";
import { useOutsideClick } from "@/lib/useOutsideClick";
import { Card, CardContent, CardTitle } from "./card";
import { Checkbox } from "./inputs";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useIsMobile } from "@/lib/useIsMobile";

type FilterOptionsTypes = {
  fees: number;
  setFees: React.Dispatch<React.SetStateAction<number>>;

  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;

  accommodation: {
    residential: boolean;
    day: boolean;
  };
  setAccommodation: React.Dispatch<
    React.SetStateAction<{
      residential: boolean;
      day: boolean;
    }>
  >;

  boards: {
    cbse: boolean;
    icse: boolean;
    ib: boolean;
    igcse: boolean;
  };
  setBoards: React.Dispatch<
    React.SetStateAction<{
      cbse: boolean;
      icse: boolean;
      ib: boolean;
      igcse: boolean;
    }>
  >;

  gender: {
    coed: boolean;
    girls: boolean;
    boys: boolean;
  };
  setGender: React.Dispatch<
    React.SetStateAction<{
      coed: boolean;
      girls: boolean;
      boys: boolean;
    }>
  >;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type AdditionalTypes = {
  open: boolean;
  isFilterChanged: boolean;
  clearAll: () => void;
  listOption: "default" | "grid";
  setListOption: React.Dispatch<React.SetStateAction<"default" | "grid">>;
};

type FilterType = FilterOptionsTypes & AdditionalTypes;

type TypeSchool = {
  _id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  feeFrom: number;
  rating: number;
  schoolType: {
    isBoarding: boolean;
    isCoed: boolean;
    isCbse: boolean;
    isIcse: boolean;
    isIgcse: boolean;
    isBoys: boolean;
    isGirls: boolean;
    isDay: boolean;
    isIb: boolean;
  };
  logo?: string;
  thumbnail?: string;
  isVerified: boolean;
};

const Listing = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [listOption, setListOption] = useState<"default" | "grid">("default");

  const initialFees = 20;
  const initialRating = 0;
  const initialAccommodation = {
    residential: false,
    day: false,
  };

  const initialBoards = {
    cbse: false,
    icse: false,
    ib: false,
    igcse: false,
  };

  const initialGender = {
    coed: false,
    girls: false,
    boys: false,
  };

  const [fees, setFees] = useState<number>(initialFees);
  const [rating, setRating] = useState<number>(initialRating);
  const [accommodation, setAccommodation] = useState<{
    residential: boolean;
    day: boolean;
  }>(initialAccommodation);
  const [boards, setBoards] = useState<{
    cbse: boolean;
    icse: boolean;
    ib: boolean;
    igcse: boolean;
  }>(initialBoards);
  const [gender, setGender] = useState<{
    coed: boolean;
    girls: boolean;
    boys: boolean;
  }>(initialGender);

  const isFilterChanged =
    fees !== initialFees ||
    rating !== initialRating ||
    JSON.stringify(accommodation) !== JSON.stringify(initialAccommodation) ||
    JSON.stringify(boards) !== JSON.stringify(initialBoards) ||
    JSON.stringify(gender) !== JSON.stringify(initialGender);

  const clearAll = () => {
    setFees(initialFees);
    setRating(initialRating);
    setAccommodation(initialAccommodation);
    setBoards(initialBoards);
    setGender(initialGender);
  };

  const [schoolList, setSchoolList] = useState<TypeSchool[]>([]);

  const fetchedSchools = useRef<TypeSchool[]>([]);

  useEffect(() => {
    const getSchools = async () => {
      const res = await fetch(
        "https://edutracker-updated-backend.onrender.com/api/schools?limit=50&isBoarding=true",
      );
      const data = await res.json();
      const sortedSchools = [...data.schools].sort(
        (a, b) => b.rating - a.rating,
      );
      fetchedSchools.current = sortedSchools;
      setSchoolList(sortedSchools);
      console.log(sortedSchools);
    };
    getSchools();
  }, []);

  useEffect(() => {
    const updateSchools = () => {
      let schools = fetchedSchools.current.filter(
        (school) => school.feeFrom <= fees * 100000 && school.rating >= rating,
      );

      if (accommodation.day !== initialAccommodation.day) {
        schools = schools.filter((school) => school.schoolType.isDay === true);
      }
      if (boards.cbse || boards.ib || boards.icse || boards.igcse) {
        schools = schools.filter(
          (school) =>
            (school.schoolType.isCbse && boards.cbse) ||
            (school.schoolType.isIb && boards.ib) ||
            (school.schoolType.isIcse && boards.icse) ||
            (school.schoolType.isIgcse && boards.igcse),
        );
      }
      if (gender.boys || gender.girls || gender.coed) {
        schools = schools.filter(
          (school) =>
            (school.schoolType.isBoys && gender.boys) ||
            (school.schoolType.isGirls && gender.girls) ||
            (school.schoolType.isCoed && gender.coed),
        );
      }

      setSchoolList(schools);
    };
    updateSchools();
  }, [fees, rating, accommodation, boards, gender]);

  return (
    <section id="listings" className=" my-12 scroll-mt-20 px-2">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
        Verified Boarding Schools
      </h1>
      <Filter
        fees={fees}
        setFees={setFees}
        rating={rating}
        setRating={setRating}
        accommodation={accommodation}
        setAccommodation={setAccommodation}
        boards={boards}
        setBoards={setBoards}
        gender={gender}
        setGender={setGender}
        open={openFilter}
        setOpen={setOpenFilter}
        listOption={listOption}
        setListOption={setListOption}
        isFilterChanged={isFilterChanged}
        clearAll={clearAll}
      />
      <SchoolContainer
        schools={schoolList.slice(0, 20)}
        listOption={listOption}
      />
    </section>
  );
};

const Filter = ({
  fees,
  setFees,
  rating,
  setRating,
  accommodation,
  setAccommodation,
  boards,
  setBoards,
  gender,
  setGender,
  open,
  setOpen,
  listOption,
  setListOption,
  isFilterChanged,
  clearAll,
}: FilterType) => {
  const isMobile = useIsMobile()

  const list = [
    {
      svg: (
        <ListSvg
          className={listOption === "default" ? "stroke-blue-700" : ""}
        />
      ),
      type: "default",
    },
    {
      svg: (
        <GridListSvg
          className={listOption === "grid" ? "stroke-blue-700" : ""}
        />
      ),
      type: "grid",
    },
    // {
    //   svg: (
    //     <TableSvg className={listOption === "table" ? "stroke-blue-700" : ""} />
    //   ),
    //   type: "table",
    // },
  ];

  return (
    <div className=" flex justify-between items-center">
      <PlaneButton
        onclick={() => setOpen(true)}
        className={
          isFilterChanged || open
            ? "text-blue-600 border-blue-600 h-10"
            : "h-10"
        }
      >
        <FilterSvg /> Filter
        {isFilterChanged && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              clearAll();
            }}
            className="rounded-full hover:bg-blue-100 p-1 "
          >
            <XSvg className="size-4" />
          </div>
        )}
        {open && (
          <FilterOptions
            fees={fees}
            setFees={setFees}
            rating={rating}
            setRating={setRating}
            accommodation={accommodation}
            setAccommodation={setAccommodation}
            boards={boards}
            setBoards={setBoards}
            gender={gender}
            setGender={setGender}
            setOpen={setOpen}
          />
        )}
      </PlaneButton>

      {!isMobile && <div className="flex gap-1">
        {list.map((l) => (
          <PlaneButton
            key={l.type}
            onclick={() => setListOption(l.type as "default" | "grid")}
            className={`p-1 rounded-md ${listOption === l.type ? " border-blue-700 hover:border-blue-700" : ""}`}
          >
            {l.svg}
          </PlaneButton>
        ))}
      </div>}
    </div>
  );
};

const FilterOptions = ({
  fees,
  setFees,
  rating,
  setRating,
  accommodation,
  setAccommodation,
  boards,
  setBoards,
  gender,
  setGender,
  setOpen,
}: FilterOptionsTypes) => {
  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  const accommodationList = [
    {
      name: "Hostel / Residental",
      check: accommodation.residential,
      handleChange: () =>
        setAccommodation((prev) => ({
          ...prev,
          residential: !prev.residential,
        })),
    },
    {
      name: "Day School",
      check: accommodation.day,
      handleChange: () =>
        setAccommodation((prev) => ({
          ...prev,
          day: !prev.day,
        })),
    },
  ];

  const boardsList = [
    {
      name: "CBSE",
      check: boards.cbse,
      handleChange: () =>
        setBoards((prev) => ({
          ...prev,
          cbse: !prev.cbse,
        })),
    },
    {
      name: "ICSE",
      check: boards.icse,
      handleChange: () =>
        setBoards((prev) => ({
          ...prev,
          icse: !prev.icse,
        })),
    },
    {
      name: "IB",
      check: boards.ib,
      handleChange: () =>
        setBoards((prev) => ({
          ...prev,
          ib: !prev.ib,
        })),
    },
    {
      name: "IGCSE",
      check: boards.igcse,
      handleChange: () =>
        setBoards((prev) => ({
          ...prev,
          igcse: !prev.igcse,
        })),
    },
  ];
  const genderList = [
    {
      name: "Co-Ed",
      check: gender.coed,
      handleChange: () =>
        setGender((prev) => ({
          ...prev,
          coed: !prev.coed,
        })),
    },
    {
      name: "Boys Only",
      check: gender.boys,
      handleChange: () =>
        setGender((prev) => ({
          ...prev,
          boys: !prev.boys,
        })),
    },
    {
      name: "Girls Only",
      check: gender.girls,
      handleChange: () =>
        setGender((prev) => ({
          ...prev,
          girls: !prev.girls,
        })),
    },
  ];

  return (
    <Modal>
      <div
        ref={ref}
        className="mx-auto my-auto px-4 py-5 h-fit bg-white rounded-xl border border-neutral-300 shadow-md max-w-md w-[90%] overflow-hidden "
      >
        <h1 className="text-xl md:text-2xl font-bold mb-2 tracking-wide">
          Filter Schools
        </h1>

        <div className="bg-neutral-100 border border-neutral-200/70 p-2 rounded-lg max-h-[80vh]  overflow-auto">
          <Card className="mb-5">
            <CardTitle>Annual fee (max)</CardTitle>
            <CardContent className="flex-col">
              <p className="text-xs text-neutral-600">
                Slide to set your fee ceiling
              </p>
              <div className="my-2">
                <div className="flex flex-col gap-2 justify-center">
                  <div className="text-xs tracking-tighter flex justify-between text-neutral-600 px-1">
                    <span>₹50k</span>
                    <span className="text-xs tracking-tighter font-medium text-blue-600">
                      Up to ₹{fees.toFixed(1)}L
                    </span>
                    <span>₹20L</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={20}
                    step={0.5}
                    value={fees}
                    onChange={(e) => setFees(+Number(e.target.value))}
                    className="h-2 bg-neutral-200/80 appearance-none accent-blue-500 hover:accent-blue-600 cursor-pointer rounded-lg "
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-5">
            <CardTitle>Minimum star rating</CardTitle>
            <CardContent className="flex-col">
              <p className="text-xs text-neutral-600">
                From parent & student reviews
              </p>
              <div className="my-2 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <PlaneButton
                    onclick={() => setRating(rating === i + 1 ? 0 : i + 1)}
                    key={i}
                    className={`p-2 cursor-pointer shadow-sm ${rating > i ? "border-amber-400 bg-amber-100 hover:border-amber-400" : "border-neutral-200 hover:bg-neutral-50 hover:border-neutral-200"}`}
                  >
                    <StarSvg
                      className={
                        rating > i
                          ? "stroke-amber-500 fill-amber-500"
                          : "stroke-neutral-300"
                      }
                    />
                  </PlaneButton>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-5">
            <CardTitle>Hostel & campus</CardTitle>
            <CardContent className="flex-col">
              <p className="text-xs text-neutral-600">
                Residential / hostel vs day
              </p>
              <div className="my-2 flex gap-2">
                {accommodationList.map((acc) => (
                  <Checkbox
                    key={acc.name}
                    check={acc.check}
                    handleChange={acc.handleChange}
                  >
                    {acc.name}
                  </Checkbox>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardTitle>Board Curriculum</CardTitle>

            <CardContent className="flex-col">
              <p className="text-xs text-neutral-600">
                Select top boards in India
              </p>
              <div className="my-2 flex gap-2">
                {boardsList.map((board) => (
                  <Checkbox
                    key={board.name}
                    check={board.check}
                    handleChange={board.handleChange}
                    className="py-1"
                  >
                    {board.name}
                  </Checkbox>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardTitle>Student Gender</CardTitle>
            <CardContent className="flex-col">
              <p className="text-xs text-neutral-600">Select school type</p>
              <div className="flex my-2 gap-2">
                {genderList.map((gen) => (
                  <Checkbox
                    key={gen.name}
                    check={gen.check}
                    handleChange={gen.handleChange}
                    className="py-1"
                  >
                    {gen.name}
                  </Checkbox>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Modal>
  );
};

const SchoolContainer = ({
  schools,
  listOption,
}: {
  schools: TypeSchool[] | [];
  listOption: "default" | "grid";
}) => {
  return (
    <div
      className={`mt-5 min-h-100 grid  gap-4 ${listOption === "default" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
    >
      {schools.map((school) => (
        <SchoolCard key={school._id} school={school} listOption={listOption} />
      ))}
    </div>
  );
};

const SchoolCard = ({
  school,
  listOption,
}: {
  school: TypeSchool;
  listOption: "default" | "grid";
}) => {
  return (
    <motion.div
      initial={{opacity: 0 , y: 10}}
      animate={{opacity: 1 , y: 0}}
      className={`flex  p-4 border bg-white border-neutral-200 rounded-xl group  ${listOption === "grid" ? "flex-col gap-4" : "gap-8 flex-col md:flex-row md:gap-4 "}`}
    >
      <Link
        href={`/schools/${school.slug}/`}
        className={`relative rounded-lg border border-neutral-200 overflow-hidden cursor-pointer ${listOption === "grid" ? "w-full h-72" : "w-full md:w-48 h-72 md:h-full "}`}
      >
        <Image
          alt="school"
          sizes="200px"
          src={school.thumbnail ? school.thumbnail : "/school-fallback.png"}
          fill
        />
        <div className="absolute top-2 left-2 flex gap-0.5 items-center bg-green-600  border border-green-400 text-[8px] tracking-tight text-white font-bold rounded-md  p-1  ">
          <VerifiedSvg className="size-2.5 stroke-white stroke-3" /> verified
        </div>
      </Link>
      <div className="flex-1">
        <div className="flex gap-3">
          <div className="relative bg-white border border-neutral-200 shadow-sm size-14 rounded-lg p-1.5 overflow-hidden ">
            {school.logo ? (
              <Image alt="logo" sizes="200px" src={school.logo} fill />
            ) : (
              <div className="w-full h-full bg-blue-50 rounded-lg flex items-center justify-center text-md font-bold text-neutral-800">
                {school.name[0]}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-bold group-hover:text-blue-600">
              {school.name}
            </h1>
            <span className="flex text-xs items-center text-gray-400 font-semibold">
              <LocationSvg className="p-1 stroke-blue-500" /> {school.city},
              {school.state}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <span className="flex items-center text-[10px] text-amber-500 border border-amber-200 px-1 py-0.5 rounded-lg bg-amber-50 font-bold">
                <StarSvg className="size-3 stroke-amber-500 fill-amber-500" />{" "}
                {school.rating.toFixed(1)}
              </span>
              {school.schoolType.isCbse && (
                <span className="flex items-center text-[10px] text-blue-500 border border-blue-200 px-1 py-0.5 rounded-lg bg-blue-50 font-bold">
                  CBSE
                </span>
              )}
              {school.schoolType.isIcse && (
                <span className="flex items-center text-[10px] text-blue-500 border border-blue-200 px-1 py-0.5 rounded-lg bg-blue-50 font-bold">
                  ICSE
                </span>
              )}
              {school.schoolType.isIb && (
                <span className="flex items-center text-[10px] text-blue-500 border border-blue-200 px-1 py-0.5 rounded-lg bg-blue-50 font-bold">
                  IB
                </span>
              )}
              {school.schoolType.isIgcse && (
                <span className="flex items-center text-[10px] text-blue-500 border border-blue-200 px-1 py-0.5 rounded-lg bg-blue-50 font-bold">
                  IGCSE
                </span>
              )}
              {school.schoolType.isBoarding && (
                <span className="flex items-center text-[10px] text-indigo-500 border border-indigo-200 px-1 py-0.5 rounded-lg bg-indigo-50 font-bold">
                  Boarding
                </span>
              )}
              {school.schoolType.isBoys && (
                <span className="flex items-center text-[10px] text-red-600 border border-red-200 px-1 py-0.5 rounded-lg bg-red-50 font-bold">
                  Boys Only
                </span>
              )}
              {school.schoolType.isGirls && (
                <span className="flex items-center text-[10px] text-red-600 border border-red-200 px-1 py-0.5 rounded-lg bg-red-50 font-bold">
                  Girls Only
                </span>
              )}
              {school.schoolType.isCoed && (
                <span className="flex items-center text-[10px] text-red-600 border border-red-200 px-1 py-0.5 rounded-lg bg-red-50 font-bold">
                  Co-ed
                </span>
              )}
              <span className="flex items-center text-[10px] text-green-600 border border-green-200 px-1 py-0.5 rounded-lg bg-green-50 font-bold">
                ₹{school.feeFrom.toLocaleString()} Avg
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex mt-8 md:mt-13 justify-between w-full ${listOption === "grid" ? "flex-col" : "flex-col md:flex-row"}`}
        >
          <div>
            <span className="flex items-center gap-1">
              <h1 className="text-lg font-extrabold tracking-tight text-green-600">
                ₹{school.feeFrom.toLocaleString()}
              </h1>
              <span className="text-neutral-400 font-bold text-[10px] tracking-tight ">
                Annual Fee
              </span>
            </span>
            <div className="divide-x divide-neutral-200">
              <Link
                href={`/schools/${school.slug}/`}
                className="text-[10px] px-2 font-bold text-blue-700 tracking-tight hover:underline"
              >
                View Profile
              </Link>
              <Link
                href={`/schools/${school.slug}/fees/`}
                className="text-[10px] px-2 font-bold text-blue-700 tracking-tight hover:underline"
              >
                View Fees
              </Link>
            </div>
          </div>
          <div
            className={`flex gap-2 ${listOption === "grid" ? "flex-col" : "flex-col md:flex-row md:self-end"}`}
          >
            <div
              className={`flex gap-2 ${listOption === "grid" ? "mt-4" : "mt-4 md:mt-0"}`}
            >
              <PlaneButton
                onclick={() => console.log("a")}
                className={`h-fit border-neutral-300 text-xs ${listOption === "grid" ? "flex-1 flex items-center justify-center" : "flex-1 flex items-center justify-center"}`}
              >
                Compare
              </PlaneButton>
              <LinkedPlaneButton
                href="/login"
                className={`h-fit py-2 border-neutral-300 text-xs  ${listOption === "grid" ? "flex-1 flex items-center justify-center" : "flex-1 flex items-center justify-center w-fit"} `}
              >
                Apply
              </LinkedPlaneButton>
            </div>
            <LinkedButton
              scale={1.02}
              href={`/schools/${school.slug}/`}
              className={`rounded-lg ${listOption === "grid" ? "text-xs w-full flex items-center justify-center p-3" : "text-xs md:text-[10px] w-full flex items-center justify-center p-3 md:px-4 md:py-2.5"}`}
            >
              Enquiry
            </LinkedButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Listing;
