import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfileMutation } from "../../features/authUser/usersApiSlice";
import { useEffect, useState } from "react";
import PostsOrganizer from "./Posts";
import { setCredentials } from "../../features/authUser/authSlice";
const SinglePage = () => {
  const dispatch = useDispatch();
  const [getOrganizerProfile, { isLoading }] = useGetProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);
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
            userId: res.userId,
            address: res.address,
            agency: res.agency,

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
      <section className="bg-black bg-blend-multiply relative">
        <img
          src={userInfo.data.user.imageBg}
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

      <PostsOrganizer displayLabel={false} />
    </div>
  );
};

export default SinglePage;
