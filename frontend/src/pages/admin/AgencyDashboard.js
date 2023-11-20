import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import UseSearchAgency from "../../hooks/useSearchAgency";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfileMutation } from "../../features/authUser/usersApiSlice";
import { parseISO, formatDistanceToNow, format } from "date-fns";
import { Link } from "react-router-dom";

const AgencyDashboard = () => {
  const dispatch = useDispatch();
  const [getOrganizerProfile, { isLoading }] = useGetProfileMutation();

  const [results, setResults] = useState([]);
  const [resultsCopy, setResultsCopy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrganizerProfile().unwrap();
        setResultsCopy(res);
        setResults(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const timeAgo = (timestamp) => {
    let data = "";
    let date = parseISO(timestamp);

    // Format the date to display the month and year
    data = format(date, "MMMM yyyy");

    return data;
  };

  const ordered = results
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const renderedAgency = ordered?.map((agency) => (
    <tr key={agency._id}>
      <td className="px-2 py-2">{agency.agency}</td>
      <td className="px-2 py-2">{agency.name}</td>
      <td className="px-2 py-2">{agency.address}</td>
      <td className=" py-2">{timeAgo(agency.createdAt)}</td>
      <td className="px-2 py-2">{agency.number}</td>
      <td className="px-2 py-2">{agency.email}</td>
      <td className="px-2 py-2">
        <Link to={`${"/" + agency._id}`} className="text-blue-500">
          Visit Page{" "}
        </Link>{" "}
      </td>
    </tr>
  ));
  return (
    <>
      <Header />
      <div className="bg-dark w-[220px]   rounded p-2 m-5 flex  gap-2 justify-between items-center">
        <h4 className="font-normal text-2xl  text-white mx-auto  ">
          Agency Dashboard
        </h4>
        <UseSearchAgency posts={resultsCopy} setResults={setResults} />
      </div>
      <div className="px-2 sm:w-[95%] w-full mx-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Agency
              </th>
              <th scope="col" className="px-2 py-3">
                Organizer
              </th>
              <th scope="col" className="px-2 py-3">
                Address
              </th>
              <th scope="col" className="py-3">
                Date Created
              </th>

              <th scope="col" className="  py-3 ">
                Contact Number
              </th>
              <th scope="col" className="  py-3 ">
                Email
              </th>
            </tr>
          </thead>
          <tbody>{renderedAgency}</tbody>
        </table>
      </div>
    </>
  );
};

export default AgencyDashboard;
