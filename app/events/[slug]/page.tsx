import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import api from "@/lib/axios";
import Image from "next/image";
import { notFound } from "next/navigation";

function EventDetailItem({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) {
  return (
    <section className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={14} height={14} />
      <p>{label}</p>
    </section>
  );
}

function EventAgenda({ agendaItems }: { agendaItems: string[] }) {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { data } = await api.get(`/events/${slug}`);
    const {
      title,
      description,
      overview,
      images,
      venue,
      location,
      date,
      time,
      mode,
      audience,
      agenda,
      organizer,
      tags,
      bookings,
    } = data.event;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
      <section id="event">
        <div className="header">
          <h1>{title}</h1>
          <p className="mt-2">{description}</p>
        </div>
        <div className="details">
          <div className="content">
            <Image
              src={images[0].url}
              alt="Event Banner"
              width={410}
              height={300}
              className="banner"
            />
            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>Event Details</h2>
              <p>{description}</p>
            </section>
            <section className="flex-col-gap-2">
              <EventDetailItem
                icon="/icons/pin.svg"
                alt="location"
                label={location}
              />
              <EventDetailItem
                icon="/icons/calendar.svg"
                alt="date"
                label={date}
              />
              <EventDetailItem
                icon="/icons/clock.svg"
                alt="time"
                label={time}
              />
              <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
              <EventDetailItem
                icon="/icons/audience.svg"
                alt="audience"
                label={audience}
              />
            </section>

            <EventAgenda agendaItems={agenda} />
            <section className="flex-col-gap-2">
              <h2>Organizer</h2>
              <p>{organizer}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>Tags</h2>
              <div className="flex-row-gap-2">
                {tags.map((tag: string, index: number) => (
                  <div className="pill" key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className="booking">
            <div className="signup-card">
              <p className="text-lg font-semibold">Book Event</p>
              {bookings > 0 ? (
                <p className="text-sm">
                  Join {bookings} others who have already booked a spot!
                </p>
              ) : (
                <p className="text-sm">Be the first to book your spot!</p>
              )}
              <BookEvent />
            </div>
          </aside>
        </div>
        <div className="flex w-full flex-col gap-4 pt-20">
          <h2>Similar Events</h2>
          <div className="flex-row-gap-2">
            {similarEvents.map((event: IEvent) => (
              <EventCard
                key={event.title}
                title={event.title}
                image={event.images[0].url}
                slug={event.slug}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (e) {
    return notFound();
  }
}
