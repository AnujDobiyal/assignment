import React from "react";
import { ChevronRight } from "./svgs";

const AboutUniportal = () => {
  return (
    <section id="about" className="my-10 p-2">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
        Why choose UniPortal ?
      </h1>
      <h2 className="text-xl md:text-2xl font-bold text-blue-500 px-2 mt-2 tracking-tight">
        We Help You Find the Right School
      </h2>

      <div className="px-2 my-8 text-neutral-600 font-medium space-y-5 text-lg max-w-4xl">
        <p>
          {
            "Choosing the right school is one of the most important decisions in a child's educational journey. At UniPortal, our goal is to make this process simpler, more transparent, and more informed for parents and students."
          }
        </p>
        <p>
          {
            "UniPortal is a school discovery and admission guidance platform that helps families explore, compare, and connect with leading boarding and day schools across India. We bring together essential information such as admissions, fee structures, facilities, academics, and school profiles in one convenient place."
          }
        </p>
      </div>

      <div className="px-2 ">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          What We Do
        </h1>
        <h2 className="text-lg my-2 text-neutral-600">
          Our platform helps parents and students:
        </h2>
        <span className="flex items-start text-neutral-600 font-medium my-1">
          <ChevronRight className="stroke-blue-500 hrink-0 mt-1" /> Discover top
          schools across India
        </span>
        <span className="flex items-start text-neutral-600 font-medium my-1">
          <ChevronRight className="stroke-blue-500 shrink-0 mt-1" /> Compare
          schools based on academics, facilities, and location
        </span>
        <span className="flex items-start text-neutral-600 font-medium my-1">
          <ChevronRight className="stroke-blue-500 hrink-0 mt-1" /> Explore
          admission requirements and fee information
        </span>
        <span className="flex items-start text-neutral-600 font-medium my-1">
          <ChevronRight className="stroke-blue-500 hrink-0 mt-1" /> Access
          school rankings and educational insights
        </span>
        <span className="flex items-start text-neutral-600 font-medium my-1">
          <ChevronRight className="stroke-blue-500 hrink-0 mt-1" /> Make
          informed decisions with confidence
        </span>
      </div>
      <div className=" p-8 my-8 bg-neutral-200 rounded-xl w-fit">
        <h1 className="text-xl md:text-xl font-bold tracking-tight my-2">For Schools</h1>
        <p className=" text-neutral-600 font-medium text-lg max-w-4xl">
          UniPortal provides educational institutions with a platform to
          showcase their strengths, reach prospective students, and improve
          their digital visibility. We help schools connect with families
          actively searching for quality educational opportunities.
        </p>
      </div>
    </section>
  );
};

export default AboutUniportal;
