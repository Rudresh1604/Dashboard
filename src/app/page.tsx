import EventList from "../components/EventList";
import Sponsor from "../components/Sponsor";

const Homepage = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-xl text-red-700">
          Here are on going events you can register it
        </h1>
        <button className="px-3 w-1/4 btn bg-blue-400 border-2 rounded-lg py-5">
          Go To Login
        </button>
      </div>
      <EventList />
      <Sponsor />
    </div>
  );
};

export default Homepage;
