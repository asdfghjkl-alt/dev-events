import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import FeaturedEventsSection from "@/components/FeaturedEventsSection";
import { IEvent } from "@/database/event.model";
import api from "@/lib/axios";

export default async function Home() {
  const { data } = await api.get("/events");
  const events = data.events;

  return (
    <section>
      <h1 className="text-center">
        The hub for every dev <br /> event you can&apos;t miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <FeaturedEventsSection>
        {events && events.length > 0 ? (
          events.map((event: IEvent) => (
            <EventCard
              key={event.title}
              title={event.title}
              image={event.images[0].url}
              slug={event.slug}
              location={event.location}
              date={event.date}
              time={event.time}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </FeaturedEventsSection>
    </section>
  );
}
