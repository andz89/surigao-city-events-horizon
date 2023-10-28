import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../component/Header";
import { setCredentials } from "../../features/authUser/authSlice";
import {
  useOrganizerUpdateProfileMutation,
  useOrganizerImageBgMutation,
} from "../../features/authUser/usersApiSlice";
import LoadingSpinner from "../../component/LoadingSpinner";
import { BiLinkExternal } from "react-icons/bi";
import Label from "../../component/HeaderAndsidebar/Label";
import { addBg } from "../../features/authUser/authSlice";
const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    agency: "",
  });
  const { name, email, number, agency } = formData;
  const [imageBg, setImageBg] = useState();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useOrganizerUpdateProfileMutation();
  const [addImageBg, { isLoading: bgImageLoading }] =
    useOrganizerImageBgMutation();
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
  const handleImage = async () => {
    const formData = new FormData();

    formData.append("imageBg", imageBg);
    try {
      const res = await addImageBg(formData).unwrap();

      dispatch(addBg(res.imageBg));
      setImageBg("");
      toast.success("Publish Successfuly", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error?.data?.message, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="mb-2 ">
        <label
          forhtml="bg-image"
          className="bg-slate-300 p-1 rounded cursor-pointer"
        >
          Change Background Image
          <input
            type="file"
            id="bg-image"
            onChange={(e) => setImageBg(e.target.files[0])}
            className="hidden"
          />
        </label>
        {imageBg && (
          <>
            <div className="  my-2 border-2 rounded p-2">
              <div> {imageBg.name}</div>
              <div className="w-full flex justify-end">
                <div
                  onClick={handleImage}
                  className="bg-primary   cursor-pointer py-1 px-4 font-semibold text-white rounded text-center "
                >
                  {bgImageLoading ? (
                    <div className="flex items-center gap-2">
                      <div>Saving </div>
                    </div>
                  ) : (
                    "Save"
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <section className="bg-black bg-blend-multiply relative">
        <img
          src={userInfo.data.user.imageBg}
          alt="Conference"
          className="opacity-40 absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="px-4 mx-auto max-w-screen-xl text-center py-12 relative">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            {userInfo.data.user.storeName}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            {userInfo.data.user.description}
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>
      <form onSubmit={onSubmit}>
        <div className="mt-5 bg-teal-600 text-white p-2 font-semibold">
          Agency Information
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 ">
          <div className="relative z-0 w-full mb-6 group mt-5">
            <input
              value={name}
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={onChange}
            />
            <label
              forhtml="floating_company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name of Organizer
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group  mt-5">
            <input
              value={number}
              type="tel"
              name="number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={onChange}
            />
            <label
              forhtml="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group ">
            <input
              value={email}
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={onChange}
            />
            <label
              forhtml="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group ">
            <input
              type="description"
              name="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={onChange}
            />
            <label
              forhtml="floating_description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={agency}
              type="text"
              name="agency"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={onChange}
            />
            <label
              forhtml="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Agency Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={onChange}
            />
            <label
              forhtml="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <div className="flex items-center gap-1">
              <div>Submitting</div>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default Profile;
