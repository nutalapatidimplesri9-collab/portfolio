import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, Mail, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { validateContactForm, type ContactFormInput } from '../utils/portfolioLogic';

export function ContactFooter() {
  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [submittedNote, setSubmittedNote] = useState<ContactFormInput | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedNote({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setForm({ name: '', email: '', message: '' });
  };

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry for ${PROFILE.name}`
  )}&body=${encodeURIComponent(
    form.message
      ? `${form.message}\n\nFrom: ${form.name || 'Visitor'} (${form.email || 'no email'})`
      : `Hi ${PROFILE.shortName},\n\nI would like to connect regarding your AI Engineering & B.Tech portfolio.`
  )}`;

  return (
    <>
      <section id="contact" className="scroll-mt-20 border-b border-white/[0.08] bg-[#090C14] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-blue-400">Contact</p>
            <h2 className="mt-2 font-['Outfit'] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s Build and Learn Together
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              I&apos;m always interested in connecting with fellow students, developers, mentors,
              and people working on interesting technology projects.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Connect Directly */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0F1523] p-6 sm:p-8 lg:col-span-5">
              <div>
                <h3 className="font-['Outfit'] text-xl font-semibold text-white">
                  Connect Directly
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Reach out through social platforms or send an email.
                </p>

                <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#070A11] p-4">
                  <p className="text-xs font-medium text-slate-400">Email Address</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="truncate text-sm font-medium text-blue-300 hover:text-blue-200"
                    >
                      {PROFILE.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-200 shrink-0 hover:bg-white/[0.08]"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-xs font-medium tracking-wider text-slate-400">
                    Social Profiles
                  </p>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#070A11] px-4 py-3 text-sm text-slate-200 transition-colors hover:border-blue-500/40 hover:text-white"
                  >
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-xs text-slate-400">{PROFILE.githubDisplay}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </a>

                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#070A11] px-4 py-3 text-sm text-slate-200 transition-colors hover:border-blue-500/40 hover:text-white"
                  >
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-xs text-slate-400">{PROFILE.linkedinDisplay}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Send a Quick Note */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0F1523] p-6 sm:p-8 lg:col-span-7">
              <h3 className="font-['Outfit'] text-xl font-semibold text-white">
                Send a Quick Note
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Have a question, feedback, or want to collaborate on a student project?
              </p>

              {submittedNote && (
                <div
                  role="status"
                  data-testid="contact-success-banner"
                  className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200"
                >
                  <p className="font-semibold text-emerald-100">
                    Note prepared for {PROFILE.name}
                  </p>
                  <p className="mt-1 text-xs text-emerald-200/90">
                    Thank you, {submittedNote.name}. Your message from {submittedNote.email} has
                    been recorded in this session, or click Open Default Email Client below to send
                    via mail.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your name"
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#070A11] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#070A11] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your question, collaboration idea, or feedback..."
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#070A11] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#070A11] px-4 py-2.5 text-sm font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors hover:bg-white/[0.06]"
                  >
                    <Mail className="h-4 w-4 text-slate-300" aria-hidden="true" />
                    <span>Open Default Email Client</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#07090E] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-['Outfit'] text-base font-semibold text-white">{PROFILE.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              {PROFILE.role} · {PROFILE.status}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-400">
              © 2026 {PROFILE.name}. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-slate-500">“{PROFILE.footerTagline}”</p>
          </div>
        </div>
      </footer>
    </>
  );
}
