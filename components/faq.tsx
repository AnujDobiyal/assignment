"use client";

import React, { useState } from "react";
import { MinusSvg, PlusSvg } from "./svgs";
import { AnimatePresence, motion } from "motion/react";

const FAQ = () => {
  const faqs = [
    {
      q: "At what age or class should a child start boarding school?",
      a: "Counselors generally recommend enrolling children between class 4 and class 6 (around 9 to 11 years old). At this stage, children are old enough to manage basic personal hygiene and daily routines independently, yet young enough to easily adapt to boarding house guidelines and form close peer bonds.",
    },
    {
      q: "What is the difference between tuition fees and the imprest account?",
      a: "The tuition and boarding fee covers academic instruction, dining, and hostel lodging. The Imprest Account is a separate, mandatory advance fund (ranging from ₹50,000 to ₹1,50,000 annually) from which the school deducts actual costs for uniforms, laundry, textbooks, school trips, specialized sports gear, and minor medical expenses.",
    },
    {
      q: "Which academic board is best for students aiming for foreign universities?",
      a: "If your child intends to apply to colleges abroad, the International Baccalaureate (IB) or Cambridge (CIE) boards are recommended. They focus heavily on independent research, analytical writing, and international projects. However, national boards like ICSE/ISC are also highly respected, while CBSE is best suited for students preparing for Indian competitive exams like JEE and NEET.",
    },
    {
      q: "How do boarding schools support students experiencing homesickness?",
      a: "Top-tier boarding schools utilize a dedicated pastoral care network consisting of resident house parents, student peer mentors, and full-time professional counselors. During the initial 4 to 6 weeks, schools organize structured ice-breaking activities and keep students engaged in sports and social clubs to ease the transition.",
    },
    {
      q: "What medical and safety facilities are present on campus?",
      a: "Verified boarding schools maintain a fully equipped on-campus wellness center or infirmary staffed 24/7 by resident nurses and a visiting or resident physician. They handle immediate medical care, minor injuries, and have established tie-ups with leading local multi-specialty hospitals for emergencies.",
    },
  ];

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section id="faq" className="my-10 p-2">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">
        Frequently Asked Questions
      </h1>
      <div>
        {faqs.map((faq, idx) => {
          const isOpen = openItems.includes(idx);
          return (
            <div
              key={faq.q}
              onClick={() => toggle(idx)}
              className={`mb-4 rounded-lg ${isOpen && "bg-blue-50/60 border border-blue-100"}`}
            >
              <div className="flex gap-1 items-center w-full text-lg md:text-xl font-semibold px-4 py-6 border-b border-neutral-300">
                <h1 className="flex-1 text-neutral-800">{faq.q}</h1>
                <div className="shrink-0 md:mr-5">
                  {isOpen ? <MinusSvg /> : <PlusSvg />}
                </div>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="px-2 font-medium text-neutral-500 py-6"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
