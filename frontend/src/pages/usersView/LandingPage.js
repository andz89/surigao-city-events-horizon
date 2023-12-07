import Header from "../../component/Header";
import Logo from "../../images/logo.png";
const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="bg-white flex justify-center text-slate-700 items-center  flex-col  ">
        <div className="  p-10 rounded  flex flex-col items-center">
          <img src={Logo} width={100} />
          <p className="lead mx-auto w-[380px] mt-3 text-center  mb-[20px]">
            {" "}
            Introducing <strong>Surigao City Tourism Events Agenda,</strong> the
            ultimate platform for event organizers to showcase their experiences
            and engage with their audience like never before! 🎉
          </p>
          <div className=" ">
            <ul>
              <li>
                <strong>Organize, Post, Thrive:</strong> Seamlessly create and
                share your event highlights, updates, and behind-the-scenes
                moments with our user-friendly posting feature.
              </li>
              <li>
                <strong>Connect with Your Community:</strong> Foster meaningful
                conversations with your audience through our interactive
                commenting system. Build a vibrant community around your events
                by directly engaging.
              </li>
              <li>
                <strong>Save Your Favorites:</strong> Users can now bookmark and
                save their favorite posts for easy access, ensuring they never
                miss a moment. It's the perfect way to cherish memories and
                revisit the best moments from your events.
              </li>
              <li>
                <strong>Elevate Your Events:</strong> Whether you're hosting a
                conference, concert, or community gathering, Surigao City Events
                Horizon is the go-to platform for organizers who want to elevate
                their events to new heights.
              </li>
              <li>
                <strong>Privacy and Security:</strong> Rest easy knowing that
                your content is secure. Our platform prioritizes the privacy of
                both organizers and users, providing a safe space for genuine
                connections.
              </li>
            </ul>
            <p>
              Join the Surigao City Events Horizon community today and
              revolutionize the way you share, connect, and celebrate your
              events! 🎊
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
