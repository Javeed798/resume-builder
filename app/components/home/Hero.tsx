"use client";

import Link from "next/link";
import FlexBoxSpacer from "../FlexBoxSpacer";

const Hero = () => {
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexBoxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />

      <div className="mx-auto max-w-xl pl-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
        <h1 className="text-primary pb-2 text-4xl fw-bold  lg:text-5xl">
          Create a Professional
          <br />
          Resume easily
        </h1>
        <p className="mt-3 text-lg lg:mt-5 lg:text-xl font-semibold">
          With this PoWerful Resume Builder
        </p>
        <Link href={"/resume-import"} className="btn-primary mt-6 lg:mt-14">
          Create Resume
        </Link>
        <p className="ml-6 mt-3 text-sm text-gray-600">No Signup Needed</p>
        <p className="mt-3 text-sm text-gray-600 lg:mt-36">
          Already have a resume?. Test its ATS readilibity with the{" "}
          <Link
            className="underline underline-offset-2"
            href={"/resume-parser"}
          >
            Resume Parser
          </Link>{" "}
        </p>
      </div>

      <FlexBoxSpacer className="hidden lg:block" maxWidth={100} minWidth={50} />

      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
        <>
          <h1>Auto Typing Resume</h1>
        </>
      </div>
    </section>
  );
};

export default Hero;
