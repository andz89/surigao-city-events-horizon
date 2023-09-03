import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <div className="flex flex-col justiy-center items-center gap-5 mt-12">
        <div className="flex flex-col justiy-center items-center gap-1">
          <FaExclamationTriangle className="text-yellow-500" size="5rem" />
          <div className="text-2xl font-semibold">Unauthorized</div>
        </div>

        <p>You do not have access to the requested page.</p>
        <div className="flexGrow">
          <button
            className="bg-primary text-white rounded p-2"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
