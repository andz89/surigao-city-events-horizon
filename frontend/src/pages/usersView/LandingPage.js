import Header from "../../component/Header";
const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="bg-white flex justify-center items-center h-96 flex-col">
        <div className="bg-teal-500 p-10 rounded font-bold flex flex-col items-center">
          <div className=" text-2xl text-white"> Landing Page</div>
          <p className="text-2xl text-white"> Surigao City Event Horizons</p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
