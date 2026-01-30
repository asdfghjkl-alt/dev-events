"use client";

import { useState } from "react";

export default function BookEvent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 3000);
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for booking!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="button-submit">
            Book Event
          </button>
        </form>
      )}
    </div>
  );
}
