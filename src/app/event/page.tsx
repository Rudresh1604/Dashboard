import EventForm from "../../components/forms/EventForm";
const EventRegister = () => {
  return (
    <div className="flex flex-col px-10 py-12">
      <div>
        <h1 className="text-center text-3xl text-red-700">
          Tech Innovators Club
        </h1>
        <p>
          The Tech Innovators Club is dedicated to fostering creativity and
          innovation among students interested in technology. We explore various
          fields, including software development, artificial intelligence,
          robotics, and web development. Our mission is to create a
          collaborative environment where members can share ideas, work on
          projects, and learn new skills.
        </p>
      </div>
      <EventForm />
    </div>
  );
};

export default EventRegister;
