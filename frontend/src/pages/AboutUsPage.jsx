import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function AboutUsPage() {
  return (
    <div>
      <Nav />
      <div className="pattern mt-20">
        
        <div className="relative w-fit img ">
          <div
            className="bg-slate w-[50%] text-center space-y-10 bg-slate-600 p-10 mx-auto mt-32 z-10"
            style={{ "box-shadow": "12px 12px 2px 1px  rgb(148 163 184)  " }}
          >
            <p className="text-5xl font-bol">About Tech Trove</p>
            <p className="text-lg ">
              Tech Trove is a leading ecommerce platform that specializes in
              offering a wide range of cutting-edge technology products and
              gadgets. With an extensive catalog and a user-friendly interface,
              Tech Trove provides a seamless online shopping experience for tech
              enthusiasts, professionals, and casual users alike.
            </p>
          </div>
        </div>
  
        <div className="w-[50%] mx-auto mt-10 space-y-10">
          <div>
            <h1 className="text-3xl font-semibold share-tech-regular pb-2 ">
              Vision
            </h1>
            <p>
              To become the ultimate destination for electronic enthusiasts,
              offering a wide range of high-quality tech products and establishing
              Tech Trove as a trusted and beloved brand in the ecommerce industry.
            </p>
          </div>
          <div>
            <h1 className="text-3xl font-semibold share-tech-regular pb-2">
              {" "}
              Mission
            </h1>
            <p>
              Every day, we strive to provide our customers with a seamless and
              enjoyable online shopping experience, offering a diverse selection
              of cutting-edge electronic products that inspire and enrich their
              lives.
            </p>
          </div>
          <div>
            <h1 className="text-3xl font-semibold share-tech-regular pb-2">
              Values
            </h1>
            <p>
              At Tech Trove, our values guide us in delivering exceptional service
              and creating a customer-centric environment
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-y-2  gap-4 sm:gap-20 p-10  justify-evenly items-center md:pb-20 lg:pb-10 w-[70%] mx-auto">
          <div className="flex flex-col justify-center items-center w-fit gap-2">
            <div className="bg-slate-500/40 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full text-center p-5 flex justify-center items-center">
              Customer Service
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-fit gap-2">
            <div className=" bg-slate-500/40 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full text-center  flex justify-center items-center">
              <p>Innovation</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-fit gap-2">
            <div className="bg-slate-500/40 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full text-center  flex justify-center items-center">
              <p>Expertise</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-fit gap-2">
            <div className="bg-slate-700/40 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full text-center  flex justify-center items-center">
              <p>Convenience</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-fit gap-2">
            <div className="bg-slate-700/40 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full text-center  flex justify-center items-center">
              <p>Reliability</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-fit gap-2">
            <div className="bg-slate-700/40 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full text-center  flex justify-center items-center">
              <p>Quality</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUsPage;
