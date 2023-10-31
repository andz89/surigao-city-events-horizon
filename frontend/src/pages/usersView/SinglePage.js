import { useSelector, useDispatch } from "react-redux";
import { usePublicProfileMutation } from "../../features/authUser/usersApiSlice";
import { useEffect, useState } from "react";
import PostsOrganizer from "./Posts";
import { useParams } from "react-router-dom";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { FaLocationArrow } from "react-icons/fa";
import Header from "../../component/Header";
const SinglePage = () => {
  const paramsId = useParams();
  const userId = paramsId.id;
  const [publicProfile, { isLoading }] = usePublicProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [viewInfo, setViewInfo] = useState(false);
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [agency, setAgency] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageBg, setImageBg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicProfile({ userId }).unwrap(); //public profile of organizer
        setEventOrganizer(res.name);
        setEmail(res.email);
        setNumber(res.number);
        setAgency(res.agency);
        setOwnerId(res.userId);
        setAddress(res.address);
        setDescription(res.description);
        setImageBg(res.imageBg);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <section className="bg-black bg-blend-multiply relative h-[300px]">
        <img
          src={"/" + imageBg}
          alt="Conference"
          className="opacity-40 absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="px-4 mx-auto max-w-screen-xl text-center py-12 relative">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            {agency}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            {description}
          </p>
        </div>
      </section>

      <div className="bg-white overflow-hidden shadow rounded-lg border mx-auto max-w-2xl">
        <div className="  bg-teal-600 text-white p-2 font-semibold ">
          Agency Information
        </div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg ml-5 leading-6 font-medium text-gray-900">
            {agency}
          </h3>
          <p className="mt-1 max-w-2xl flex items-center gap-2   text-sm text-gray-500">
            <FaLocationArrow />
            {address}
          </p>
          <div
            onClick={() => setViewInfo((prev) => !prev)}
            className="mt-2 text-slate-600 gap-1 cursor-pointer flex items-center w-[80px]"
          >
            {!viewInfo && (
              <>
                {" "}
                <IoIosArrowUp size={"1.1rem"} /> <small> See more</small>{" "}
              </>
            )}
            {viewInfo && (
              <>
                {" "}
                <IoIosArrowDown size={"1.1rem"} /> <small> See less</small>
              </>
            )}
          </div>
        </div>
        {viewInfo && (
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Event Organizer
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {eventOrganizer}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {number}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
      <div className="mt-5 ">
        <PostsOrganizer
          displayLabel={false}
          userInfo={userInfo}
          profile={true}
          postOwnerId={userId}
        />
      </div>
    </div>
  );
};

export default SinglePage;
