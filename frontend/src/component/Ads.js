import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import sideLeft from "../images/sideLeft.webp";
import sideRight from "../images/sideRight.jpg";
import bottom from "../images/bottom.webp";

const Ads = () => {
  const [hideBottomAdd, setHideBottomAdd] = useState(true);
  return (
    <div>
      <Link
        to={
          "https://ph.shein.com/?url_from=phgooglebrandshein_Sheinshop_online03_srsa_20210204&cid=10070622617&setid=108058521064&adid=496351751034&pf=GOOGLE&gad_source=1&gclid=CjwKCAiAgeeqBhBAEiwAoDDhn2-sv6wzp_eUc5cBInOosLx8Kn5TcW7TMVcelBmeuJi-iYPClGh6mxoCV5gQAvD_BwE"
        }
        target="_blank"
      >
        <div className="fixed top-[75px] left-[10px] animate-waving-hand  bg-slate-300 hidden   sm:block ">
          <img src={sideLeft} width={"200"} />
        </div>
      </Link>

      <div className="animate-bounce lg:animate-bounce md:animate-bounce animate-none fixed bottom-[10px] right-[10px]   bg-slate-300 flex">
        {hideBottomAdd && (
          <>
            <Link
              to={
                "https://ph.shein.com/?url_from=phgooglebrandshein_Sheinshop_online03_srsa_20210204&cid=10070622617&setid=108058521064&adid=496351751034&pf=GOOGLE&gad_source=1&gclid=CjwKCAiAgeeqBhBAEiwAoDDhn2-sv6wzp_eUc5cBInOosLx8Kn5TcW7TMVcelBmeuJi-iYPClGh6mxoCV5gQAvD_BwE"
              }
              target="_blank"
            >
              <img src={bottom} className=" w-[300px]" />
            </Link>

            <IoMdClose
              onClick={() => setHideBottomAdd((prev) => !prev)}
              className="m-1 float-right hover:text-blue-800 cursor-pointer"
              size={"1.2rem"}
            />
          </>
        )}
      </div>

      <Link to={"https://shopee.ph "} target="_blank">
        <div className="fixed  hidden   sm:block    right-0  top-[130px]  ">
          <span>
            <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden  [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          </span>
          <img src={sideRight} className=" backdrop  " width={300} />
        </div>
      </Link>
    </div>
  );
};

export default Ads;
