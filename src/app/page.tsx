import EventList from "../components/EventList";
import Sponsor from "../components/Sponsor";

const Homepage = () => {
  return (
    <div className="">
      <h1 className="text-center text-xl text-red-700">
        Here are on going events you can register it
      </h1>
      <EventList />
      <Sponsor />
    </div>
  );
};

export default Homepage;
