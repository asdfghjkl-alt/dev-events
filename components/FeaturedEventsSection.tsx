"use client";

import { useRef, useCallback } from "react";
import posthog from "posthog-js";

export default function FeaturedEventsSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasTrackedRef = useRef(false);

  const sectionRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || hasTrackedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTrackedRef.current) {
          hasTrackedRef.current = true;
          posthog.capture("featured_events_viewed", {
            section: "featured_events",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
  }, []);

  return (
    <div ref={sectionRef} className="mt-20 space-y-5">
      <h3>Featured Events</h3>
      <ul className="events">{children}</ul>
    </div>
  );
}
