import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The hub for every dev <br /> event you can&apos;t miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-5">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              image={event.image}
              slug={event.slug}
              location={event.location}
              date={event.date}
              time={event.time}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
