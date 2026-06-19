import Link from "next/link";
import React from "react";

const Footer = () => {
  const links = [
    {
      name: "About us",
      href: "/about/",
    },
    {
      name: "Contact us",
      href: "/contact/",
    },
    {
      name: "info@uniportal@zohomail.in",
      href: "milto:info@uniportal@zohomail.in",
    },
    {
      name: "Privacy policy",
      href: "/privacy-policy/",
    },
    {
      name: "Terms & Conditions",
      href: "/terms-conditions/",
    },
    {
      name: "Disclamer",
      href: "/disclamer/",
    },
    {
      name: "Sitemap",
      href: "/sitemap/",
    },
  ];

  const navigationLinks = {
    schoolTypes: [
      { name: "Boarding Schools in India", href: "/boarding-schools-in-india" },
      { name: "Day Schools in India", href: "/day-schools-in-india" },
      { name: "Day Boarding Schools", href: "/day-boarding-schools" },
      { name: "Girls Boarding Schools", href: "/girls-boarding-schools" },
      { name: "Boys Boarding Schools", href: "/boys-boarding-schools" },
      { name: "Co-Ed Boarding Schools", href: "/co-ed-boarding-schools" },
      {
        name: "Affordable Boarding Schools",
        href: "/affordable-boarding-schools",
      },
      { name: "Low Fee Boarding Schools", href: "/low-fee-boarding-schools" },
      { name: "Premium Day Schools", href: "/premium-day-schools" },
    ],

    schoolsByCity: [
      { name: "Best Schools in Dehradun", href: "/best-schools-in-dehradun" },
      { name: "Best Schools in Bangalore", href: "/best-schools-in-bangalore" },
      { name: "Best Schools in Delhi", href: "/best-schools-in-delhi" },
      { name: "Best Schools in Mumbai", href: "/best-schools-in-mumbai" },
      { name: "Best Schools in Pune", href: "/best-schools-in-pune" },
      { name: "Best Schools in Shimla", href: "/best-schools-in-shimla" },
      { name: "Best Schools in Mussoorie", href: "/best-schools-in-mussoorie" },
      { name: "Best Schools in Nainital", href: "/best-schools-in-nainital" },
    ],

    schoolsByBoard: [
      { name: "CBSE Schools in India", href: "/cbse-schools-in-india" },
      { name: "ICSE Schools in India", href: "/icse-schools-in-india" },
      { name: "IB Schools in India", href: "/ib-schools-in-india" },
      { name: "IGCSE Schools in India", href: "/igcse-schools-in-india" },
      { name: "State Board Schools", href: "/state-board-schools" },
      { name: "Cambridge Board Schools", href: "/cambridge-board-schools" },
    ],

    admissions2026: [
      { name: "New Admissions 2026-27", href: "/new-admissions-2026-27" },
      { name: "Boarding Admissions Guide", href: "/boarding-admissions-guide" },
      { name: "School Comparison Tool", href: "/school-comparison-tool" },
      { name: "Fee Comparison Guidance", href: "/fee-comparison-guidance" },
      {
        name: "Admission Alerts & Deadlines",
        href: "/admission-alerts-and-deadlines",
      },
      {
        name: "Low Fee Dehradun Admissions",
        href: "/low-fee-dehradun-admissions",
      },
      {
        name: "Best Boarding Admissions Under 5L",
        href: "/best-boarding-admissions-under-5l",
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 bg-blue-600 text-white  px-4 py-6 md:py-10">

        <div className="flex flex-col  text-center">
            <h1 className="font-bold text-lg mb-3">AllSchools</h1>
            {navigationLinks.schoolTypes.map((link) => (
                <Link key={link.href} href={link.href} className="font-medium text-xs text-neutral-200/80 hover:text-neutral-400">
                {link.name}
                </Link>
            ))}
        </div>
        <div className="flex flex-col  text-center">
            <h1 className="font-bold text-lg mb-3">Schools by city</h1>
            {navigationLinks.schoolsByCity.map((link) => (
                <Link key={link.href} href={link.href} className="font-medium text-xs text-neutral-200/80 hover:text-neutral-400">
                {link.name}
                </Link>
            ))}
        </div>
        <div className="flex flex-col  text-center">
            <h1 className="font-bold text-lg mb-3">Schools by Boards</h1>
            {navigationLinks.schoolsByBoard.map((link) => (
                <Link key={link.href} href={link.href} className="font-medium text-xs text-neutral-200/80 hover:text-neutral-400">
                {link.name}
                </Link>
            ))}
        </div>
        <div className="flex flex-col text-center">
            <h1 className="font-bold text-lg mb-3">Admission 2026</h1>
            {navigationLinks.admissions2026.map((link) => (
                <Link key={link.href} href={link.href} className="font-medium text-xs text-neutral-200/80 hover:text-neutral-400">
                {link.name}
                </Link>
            ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-center text-xs justify-between font-bold tracking-tight text-neutral-500 py-5">
        <span>© 2026 UniPortal. Built for Excellence.</span>
        <div className="flex gap-3 flex-wrap items-center justify-center ">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
