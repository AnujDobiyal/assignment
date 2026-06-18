"use client";

import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSepater,
} from "./breadcrumb";
import { LinkedButton } from "./buttons";
import { ChevronRight } from "./svgs";

const Hero = () => {
  return (
    <section id="hero" className="mt-16 md:mt-22">
      <Breadcrumb className="m-1 md:m-2">
        <BreadcrumbLink href="https://www.uniportal.in/">Home</BreadcrumbLink>
        <BreadcrumbSepater />
        <BreadcrumbPage>Boarding Schools in India</BreadcrumbPage>
      </Breadcrumb>
      <div className=" bg-blue-500 shadow-sm xl:rounded-lg px-2 py-5 md:px-8 md:py-6 text-balance md:text-pretty">
        <h1 className="text-3xl md:text-5xl text-neutral-100 font-bold font-stretch-expanded mt-12 md:mt-20 md:mb-3 max-w-3xl ">
          Best Boarding Schools in India (2026)
        </h1>
        <p className="text-sm text-neutral-200/85 md:text-lg font-medium tracking-wide max-w-3xl">
          Discover, compare, and apply to the top-rated residential schools
          across India. Check fee structures, rating scores, academic boards,
          and expert reviews of the top 20 boarding institutions.
        </p>

        <LinkedButton
          href="/#listings"
          scale={1.02}
          duration={0.15}
          className="bg-orange-400 hover:bg-orange-500 mt-5 md:text-sm flex items-center tracking-tight gap-2 md:py-3 rounded-lg"
        >
          VIEW TOP BOARDING SCHOOLS <ChevronRight />
        </LinkedButton>
      </div>
    </section>
  );
};

export default Hero;
