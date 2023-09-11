import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../component/Header";
import { setCredentials } from "../../features/authUser/authSlice";
import { useOrganizerUpdateProfileMutation } from "../../features/authUser/usersApiSlice";
import LoadingSpinner from "../../component/LoadingSpinner";
import { BiLinkExternal } from "react-icons/bi";
import Label from "../../component/HeaderAndsidebar/Label";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    agency: "",
  });
  const { name, email, number, agency } = formData;

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useOrganizerUpdateProfileMutation();

  useEffect(() => {
    // Set name and email in the formData state
    setFormData((prevState) => ({
      ...prevState,
      name: userInfo.data.user.name,
      email: userInfo.data.user.email,
      number: userInfo.data.user.number,
      agency: userInfo.data.user.agency,
    }));
  }, [
    userInfo.data.user.name,
    userInfo.data.user.email,
    userInfo.data.user.number,
    userInfo.data.user.agency,
    dispatch,
  ]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        name,
        email,
        number,
        agency,
      }).unwrap();

      const data = {
        ...userInfo.data,
        user: {
          name: res.name,
          email: res.email,
          number: res.number,
          agency: res.agency,
          userId: res.userId,
          roles: res.roles,
        },
      };
      dispatch(
        setCredentials({
          data,
        })
      );

      toast.success("Update Successfully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error(err?.data?.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Label>
        <div>Profile</div>
      </Label>
      <form
        onSubmit={onSubmit}
        className="sm:w-[600px]   border-2 border-gray-300 pb-4 px-5 mx-auto mt-12 text-dark"
      >
        <div className="flex justify-end mt-1">
          <Link
            to="/updatePasswordOrganizer"
            className="hover:bg-slate-500 hover:text-white flex items-center  gap-1 bg-slate-400 p-1 rounded text-sm"
          >
            <BiLinkExternal className="font-bold" /> Change Password
          </Link>
        </div>
        <div className="flex items-center gap-2 my-2 justify-center  ">
          <FaUser size={"2em"} />{" "}
          <span className="font-bold text-2xl uppercase">Update Profile </span>
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="block   text-sm font-medium  ">
            Name of Event Coordinator
          </label>
          <input
            type="text"
            id="text"
            value={name}
            name="name"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block   text-sm font-medium  ">
            email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="Number" className="block mb-2 text-sm font-medium  ">
            Contact Number
          </label>
          <input
            type="number"
            value={number}
            name="number"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="agency" className="block mb-2 text-sm font-medium  ">
            Name of Agency
          </label>
          <input
            type="text"
            value={agency}
            name="agency"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? "Updating......" : "Update"}
        </button>
      </form>
    </>
  );
};

export default Profile;
