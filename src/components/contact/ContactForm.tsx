"use client";

import { useState, FormEvent } from "react";
import { theme } from "@/lib/theme";

type FormState = "idle" | "submitting" | "success";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: theme.metalDark,
  border: `1px solid ${theme.metal}`,
  borderRadius: "8px",
  color: theme.paper,
  fontSize: "14px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: `${theme.paper}99`,
  marginBottom: "6px",
};

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend wired up yet — this just simulates a submit so the UI/UX
    // can be reviewed. Swap this for a real fetch() call to an API route,
    // Formspree, etc. once ready.
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <div
        className="pointer-events-auto flex flex-col items-center justify-center text-center"
        style={{
          width: "420px",
          padding: "48px 28px",
          background: `${theme.ink}E6`,
          border: `1px solid ${theme.metal}`,
          borderRadius: "14px",
          boxShadow: `0 20px 60px -20px ${theme.void}, 0 0 40px -10px ${theme.violet}33`,
        }}
      >
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: `${theme.ember}22`, border: `1px solid ${theme.ember}55` }}
        >
          <span style={{ color: theme.ember, fontSize: "20px" }}>✓</span>
        </div>
        <div style={{ color: theme.paper, fontSize: "18px", fontWeight: 600 }}>Message received</div>
        <div style={{ color: `${theme.paper}99`, fontSize: "13px", marginTop: "8px" }}>
          We&apos;ll be in touch shortly.
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="pointer-events-auto"
      style={{
        width: "420px",
        padding: "28px",
        background: `${theme.ink}E6`,
        border: `1px solid ${theme.metal}`,
        borderRadius: "14px",
        boxShadow: `0 20px 60px -20px ${theme.void}, 0 0 40px -10px ${theme.violet}33`,
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: `${theme.paper}80`,
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        Start a project
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Name</label>
        <input required type="text" name="name" style={inputStyle} placeholder="Your name" />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Email</label>
        <input required type="email" name="email" style={inputStyle} placeholder="you@company.com" />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Budget</label>
        <select required name="budget" style={inputStyle} defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          <option value="<10k">Under $10k</option>
          <option value="10k-50k">$10k – $50k</option>
          <option value="50k-150k">$50k – $150k</option>
          <option value="150k+">$150k+</option>
        </select>
      </div>

      <div style={{ marginBottom: "22px" }}>
        <label style={labelStyle}>Message</label>
        <textarea
          required
          name="message"
          rows={4}
          style={{ ...inputStyle, resize: "none" }}
          placeholder="Tell us about your project"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full transition-colors duration-300"
        style={{
          padding: "13px",
          borderRadius: "8px",
          background: status === "submitting" ? theme.metal : theme.ember,
          color: status === "submitting" ? `${theme.paper}99` : theme.void,
          fontSize: "13px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 600,
          border: "none",
          cursor: status === "submitting" ? "default" : "pointer",
        }}
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
