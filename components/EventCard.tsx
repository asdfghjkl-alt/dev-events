"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export default function EventCard({
  title,
  image,
  slug,
  location,
  date,
  time,
}: {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}) {
  const handleEventCardClick = () => {
    posthog.capture("event_card_clicked", {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
      event_time: time,
    });
  };

  return (
    <Link
      href={`/events/${slug}`}
      id="event-card"
      onClick={handleEventCardClick}
    >
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p className="location">{location}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
        <p className="date">{date}</p>
        <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
        <p className="time">{time}</p>
      </div>
    </Link>
  );
}
