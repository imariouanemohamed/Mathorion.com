"use client";

import { FormEvent, useState } from "react";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const EMPTY_FORM: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimAndValidate(values: ContactFormState) {
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();
  const website = values.website.trim();

  if (website) {
    return "Please complete all required fields.";
  }

  if (!name || !email || !subject || !message) {
    return "Please complete all required fields.";
  }

  if (name.length < 2 || name.length > 100) {
    return "Please complete all required fields.";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address.";
  }

  if (subject.length < 3 || subject.length > 150 || /[\r\n]/.test(subject)) {
    return subject.length < 3 ? "Please complete all required fields." : "Please complete all required fields.";
  }

  if (message.length < 10 || message.length > 5000) {
    return message.length < 10 ? "Please provide a little more detail." : "Please complete all required fields.";
  }

  return "";
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) {
      return;
    }

    const validationMessage = trimAndValidate(form);
    if (validationMessage) {
      setStatusMessage(validationMessage);
      setIsSuccess(false);
      return;
    }

    setSubmitting(true);
    setStatusMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          website: form.website,
        }),
      });

      if (response.status === 201) {
        setForm(EMPTY_FORM);
        setStatusMessage("Thanks! Your message has been sent.");
        setIsSuccess(true);
        return;
      }

      let errorMessage = "We couldn't send your message right now. Please try again later.";
      try {
        const payload = (await response.json()) as { error?: string };

        if (payload.error === "invalid-email") {
          errorMessage = "Please enter a valid email address.";
        } else if (payload.error === "missing-required") {
          errorMessage = "Please complete all required fields.";
        } else if (payload.error === "short-message") {
          errorMessage = "Please provide a little more detail.";
        }
      } catch {
        // Ignore invalid JSON response payloads and keep the generic error.
      }

      setStatusMessage(errorMessage);
      setIsSuccess(false);
    } catch {
      setStatusMessage("We couldn't send your message right now. Please try again later.");
      setIsSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            minLength={2}
            maxLength={100}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </label>
      </div>

      <label>
        Subject
        <input
          name="subject"
          type="text"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          minLength={3}
          maxLength={150}
          required
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          rows={7}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          minLength={10}
          maxLength={5000}
          required
        />
      </label>

      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(event) => updateField("website", event.target.value)}
        className="newsletter-honeypot"
        tabIndex={-1}
        autoComplete="off"
      />

      <button className={`button${submitting ? " button-disabled" : ""}`} type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"} <span>→</span>
      </button>

      {statusMessage ? (
        <p role="status" className={`form-status${isSuccess ? " success" : ""}`}>
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
