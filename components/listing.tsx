"use client";

import React, { useState } from "react";
import { PlaneButton } from "./buttons";
import {
  FilterSvg,
  GridListSvg,
  ListSvg,
  StarSvg,
  TableSvg,
  XSvg,
} from "./svgs";
import { Modal } from "./modal";
import { useOutsideClick } from "@/lib/useOutsideClick";
import { Card, CardContent, CardTitle } from "./card";
import { Checkbox } from "./inputs";

type FilterOptionsTypes = {
  salary: number;
  setSalary: React.Dispatch<React.SetStateAction<number>>;

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

const Listing = () => {
  return (
    <section id="listings" className=" mt-12 scroll-mt-20 px-2">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
        Verified Boarding Schools
      </h1>
      <Filter />
      <SchoolContainer />
    </section>
  );
};

const Filter = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [listOption, setListOption] = useState<"default" | "grid" | "table">(
    "default",
  );

  const initialSalary = 20;
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

  const [salary, setSalary] = useState<number>(initialSalary);
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
    salary !== initialSalary ||
    rating !== initialRating ||
    JSON.stringify(accommodation) !== JSON.stringify(initialAccommodation) ||
    JSON.stringify(boards) !== JSON.stringify(initialBoards) ||
    JSON.stringify(gender) !== JSON.stringify(initialGender);

  const clearAll = () => {
    setSalary(initialSalary);
    setRating(initialRating);
    setAccommodation(initialAccommodation);
    setBoards(initialBoards);
    setGender(initialGender);
  };

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
    {
      svg: (
        <TableSvg className={listOption === "table" ? "stroke-blue-700" : ""} />
      ),
      type: "table",
    },
  ];

  return (
    <div className=" flex justify-between items-center">
      <PlaneButton
        onclick={() => setOpenFilter(true)}
        className={
          isFilterChanged || openFilter ? "text-blue-600 border-blue-600" : ""
        }
      >
        <FilterSvg /> Filter
        {isFilterChanged && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              clearAll();
            }}
            className="rounded-full hover:bg-blue-100 p-1"
          >
            <XSvg className="size-4" />
          </div>
        )}
        {openFilter && (
          <FilterOptions
            salary={salary}
            setSalary={setSalary}
            rating={rating}
            setRating={setRating}
            accommodation={accommodation}
            setAccommodation={setAccommodation}
            boards={boards}
            setBoards={setBoards}
            gender={gender}
            setGender={setGender}
            setOpen={setOpenFilter}
          />
        )}
      </PlaneButton>

      <div className="flex gap-1">
        {/* <select className="bg-white w-30 rounded-md border border-neutral-300 shadow-sm px-1 cursor-pointer">
          <option value="all">All </option>
            <option >
              ldddddddd
            </option>
        </select> */}

        {list.map((l) => (
          <PlaneButton
            key={l.type}
            onclick={() =>
              setListOption(l.type as "default" | "grid" | "table")
            }
            className={`p-1 rounded-md ${listOption === l.type ? " border-blue-700 hover:border-blue-700" : ""}`}
          >
            {l.svg}
          </PlaneButton>
        ))}
      </div>
    </div>
  );
};

const FilterOptions = ({
  salary,
  setSalary,
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
                      Up to ₹{salary.toFixed(1)}L
                    </span>
                    <span>₹20L</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={20}
                    step={0.5}
                    value={salary}
                    onChange={(e) => setSalary(+Number(e.target.value))}
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

const SchoolContainer = () => {
  

  return(
    <div className="mt- border p-2">
      <SchoolCard />
    </div>
  )
};

const SchoolCard = () => {
  return(
    <div>
      card
    </div>
  )
}

export default Listing;
