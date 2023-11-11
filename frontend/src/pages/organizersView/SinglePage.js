import { useSelector, useDispatch } from "react-redux";
import { useGetProfileMutation } from "../../features/authUser/usersApiSlice";
import { useEffect, useState } from "react";
import PostsOrganizer from "./Posts";
import { setCredentials } from "../../features/authUser/authSlice";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import NavBar from "../../component/HeaderAndsidebar/NavBar";
import Header from "../../component/Header";

const SinglePage = () => {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const [getOrganizerProfile, { isLoading }] = useGetProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [viewInfo, setViewInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrganizerProfile().unwrap();

        const data = {
          ...userInfo.data,
          user: {
            name: res.name,
            email: res.email,
            number: res.number,
            agency: res.agency,

            address: res.address,
            agency: res.agency,
            userId: res._id,
            description: res.description,
            imageBg: res.imageBg,
            roles: res.roles,
          },
        };

        dispatch(
          setCredentials({
            data,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <section className="bg-black bg-blend-multiply relative h-[210px]   ">
        <img
          src={"/" + userInfo.data.user.imageBg}
          alt="Conference"
          className="opacity-40 absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="px-4 mx-auto max-w-screen-xl text-center py-12 relative">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            {userInfo.data.user.agency}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            {userInfo.data.user.description}
          </p>
        </div>
      </section>

      <div className="bg-white overflow-hidden shadow rounded-lg border mx-auto max-w-2xl">
        <div className="  bg-teal-600 text-white p-2 font-semibold flex justify-between">
          <div>Agency Information </div>
          <div
            onClick={() => setViewInfo((prev) => !prev)}
            className="mt-2 text-slate-600 gap-1 cursor-pointer flex items-center w-[80px]"
          >
            {!viewInfo && (
              <>
                <IoIosArrowUp className="text-white" size={"1.1rem"} />{" "}
                <small className="text-white"> See more</small>{" "}
              </>
            )}
            {viewInfo && (
              <>
                <IoIosArrowDown className="text-white" size={"1.1rem"} />{" "}
                <small className="text-white"> See less</small>
              </>
            )}
          </div>
        </div>

        {viewInfo && (
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Agency</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userInfo.data.user.agency}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Event Organizer
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userInfo.data.user.name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userInfo.data.user.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userInfo.data.user.address}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userInfo.data.user.number}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
      <div className="mt-2">
        <PostsOrganizer displayLabel={false} userInfo={userInfo} />
      </div>
    </div>
  );
};

export default SinglePage;
