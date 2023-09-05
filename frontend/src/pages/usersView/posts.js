import Header from "../../component/Header";
import LoadingSpinner from "../../component/LoadingSpinner";

const Posts = () => {
  return (
    <>
      {/* <LoadingSpinner /> */}
      <Header />
      <div className="bg-white flex justify-center items-center h-96 flex-col">
        <div className="bg-teal-500 p-10 rounded font-bold flex flex-col items-center">
          <div className=" text-2xl text-white"> Post view of login users</div>
        </div>
      </div>
    </>
  );
};

export default Posts;
