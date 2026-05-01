"use client";

import React, { useEffect, useState } from "react";
import { IconMail, IconMessageCircle, IconX, IconSend } from "@tabler/icons-react";

const CONTACT_EMAIL = "hello@pivotsafe.com";

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Listen for global open events (e.g. from hero CTA)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-popup", handler);
    return () => window.removeEventListener("open-contact-popup", handler);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Inquiry from ${name || "Website Visitor"} – PivotSafe`
    );
    const body = encodeURIComponent(
      `Hi PivotSafe team,\n\n${message}\n\n— ${name}\nEmail: ${email}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Floating chat bubble */}
      <button
        type="button"
        aria-label="Open contact form"
        data-testid="contact-bubble-btn"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#bb8922] hover:bg-[#d29c2a] text-white shadow-lg shadow-black/40 flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#bb8922]/60"
      >
        <IconMessageCircle size={26} />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          data-testid="contact-modal"
          onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white p-1 -mr-1 transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSend}
              className="px-5 py-5 space-y-4"
              data-testid="contact-form"
            >
              <p className="text-white/80 text-sm leading-relaxed">
                Tell us a bit about your security needs and we&apos;ll get back
                to you at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#bb8922] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="contact-name-input"
                  className="w-full bg-[#0f0f0f] border border-white/10 focus:border-[#bb8922]/60 focus:outline-none rounded-md px-3 py-2 text-white text-sm placeholder:text-white/30"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="contact-email-input"
                  className="w-full bg-[#0f0f0f] border border-white/10 focus:border-[#bb8922]/60 focus:outline-none rounded-md px-3 py-2 text-white text-sm placeholder:text-white/30"
                  placeholder="jane@company.com"
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  data-testid="contact-message-input"
                  className="w-full bg-[#0f0f0f] border border-white/10 focus:border-[#bb8922]/60 focus:outline-none rounded-md px-3 py-2 text-white text-sm placeholder:text-white/30 resize-none"
                  placeholder="I'd like to discuss a red team engagement for our cloud workloads…"
                />
              </div>

              <button
                type="submit"
                data-testid="contact-send-btn"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#bb8922] hover:bg-[#d29c2a] text-black font-semibold text-sm rounded-md px-4 py-2.5 transition-colors"
              >
                <IconSend size={16} />
                Send via email
              </button>

              <p className="text-[11px] text-white/40 text-center">
                This opens your email client pre-filled. No data is stored on
                this site.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
