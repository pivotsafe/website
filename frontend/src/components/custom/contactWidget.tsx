"use client";

import React, { useEffect, useState } from "react";
import {
  IconMail,
  IconMessageCircle,
  IconX,
  IconSend,
  IconCheck,
  IconLoader2,
} from "@tabler/icons-react";

const CONTACT_EMAIL = "hello@pivotsafe.com";
const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Listen for global open events (e.g. from hero CTA)
  useEffect(() => {
    const handler = () => {
      setStatus("idle");
      setErrorMsg("");
      setOpen(true);
    };
    window.addEventListener("open-contact-popup", handler);
    return () => window.removeEventListener("open-contact-popup", handler);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setWebsite("");
    setStatus("idle");
    setErrorMsg("");
  };

  const closeModal = () => {
    setOpen(false);
    // Give the close animation a moment, then reset
    setTimeout(resetForm, 250);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, website }),
      });

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data.detail ||
            "Too many submissions from your network. Please try again in an hour."
        );
        setStatus("error");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data.detail ||
            "Something went wrong sending your message. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(
        "Couldn't reach our server. Check your connection and try again."
      );
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <>
      {/* Floating chat bubble */}
      <button
        type="button"
        aria-label="Open contact form"
        data-testid="contact-bubble-btn"
        onClick={() => {
          setStatus("idle");
          setErrorMsg("");
          setOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#bb8922] hover:bg-[#d29c2a] text-white shadow-lg shadow-black/40 flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#bb8922]/60"
      >
        <IconMessageCircle size={26} />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          data-testid="contact-modal"
          onClick={closeModal}
        >
          <div
            className="relative w-full sm:max-w-md bg-[#141414] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-[#1a1a1a] to-[#141414]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#bb8922]/15 border border-[#bb8922]/40 flex items-center justify-center">
                  <IconMail size={18} className="text-[#bb8922]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">
                    Talk to PivotSafe
                  </p>
                  <p className="text-white/50 text-xs leading-tight">
                    We&apos;ll reply within one business day.
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close contact form"
                data-testid="contact-modal-close"
                onClick={closeModal}
                className="text-white/60 hover:text-white p-1 -mr-1 transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Body */}
            {status === "success" ? (
              <div
                className="px-5 py-10 flex flex-col items-center text-center"
                data-testid="contact-success-state"
              >
                <div className="h-14 w-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-4">
                  <IconCheck size={26} className="text-emerald-400" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Message sent
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                  Thanks{name ? `, ${name.split(" ")[0]}` : ""} — your message
                  is on its way to{" "}
                  <span className="text-[#bb8922]">{CONTACT_EMAIL}</span>.
                  We&apos;ll get back to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  data-testid="contact-success-close-btn"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm rounded-md px-5 py-2 border border-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSend}
                className="px-5 py-5 space-y-4"
                data-testid="contact-form"
                noValidate
              >
                <p className="text-white/80 text-sm leading-relaxed">
                  Tell us a bit about your security needs and we&apos;ll get
                  back to you at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[#bb8922] hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>

                {/* Honeypot — hidden from real users */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    top: "auto",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="contact-website">Website (leave blank)</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    data-testid="contact-honeypot-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-white/60 mb-1"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={sending}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-testid="contact-name-input"
                    className="w-full bg-[#0f0f0f] border border-white/10 focus:border-[#bb8922]/60 focus:outline-none rounded-md px-3 py-2 text-white text-sm placeholder:text-white/30 disabled:opacity-50"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-white/60 mb-1"
                  >
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={sending}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid="contact-email-input"
                    className="w-full bg-[#0f0f0f] border border-white/10 focus:border-[#bb8922]/60 focus:outline-none rounded-md px-3 py-2 text-white text-sm placeholder:text-white/30 disabled:opacity-50"
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-medium text-white/60 mb-1"
                  >
                    Company{" "}
                    <span className="text-white/30 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    disabled={sending}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    data-testid="contact-company-input"
                    className="w-full bg-[#0f0f0f] border border-white/10 focus:border-[#bb8922]/60 focus:outline-none rounded-md px-3 py-2 text-white text-sm placeholder:text-white/30 disabled:opacity-50"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-white/60 mb-1"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    minLength={5}
                    disabled={sending}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    data-testid="contact-message-input"
                    className="w-full bg-[#0f0f0f] border border-white/10 focus:border-[#bb8922]/60 focus:outline-none rounded-md px-3 py-2 text-white text-sm placeholder:text-white/30 resize-none disabled:opacity-50"
                    placeholder="I'd like to discuss a red team engagement for our cloud workloads…"
                  />
                </div>

                {status === "error" && errorMsg && (
                  <div
                    className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-md px-3 py-2"
                    data-testid="contact-error-msg"
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  data-testid="contact-send-btn"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#bb8922] hover:bg-[#d29c2a] disabled:bg-[#bb8922]/60 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-md px-4 py-2.5 transition-colors"
                >
                  {sending ? (
                    <>
                      <IconLoader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <IconSend size={16} />
                      Send message
                    </>
                  )}
                </button>

                <p className="text-[11px] text-white/40 text-center">
                  We&apos;ll only use this to reply to your inquiry. No
                  marketing.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
