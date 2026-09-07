import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  Heart,
  HandHeart,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Footer } from "@/sections/Footer";

const amounts = ["$25", "$50", "$100", "$250", "$500"];

const preferences = [
  {
    title: "Animals",
    description: "Shelter care, food, and adoption support.",
    icon: Heart,
  },
  {
    title: "Education",
    description: "School supplies, mentoring, and student programs.",
    icon: Users,
  },
  {
    title: "Environment",
    description: "Community gardens, cleanups, and greener spaces.",
    icon: HandHeart,
  },
];

export default function DonationPreferences() {
  const [amount, setAmount] = useState("$50");
  const [preference, setPreference] = useState("Where it is needed most");
  const [companyGift, setCompanyGift] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-warm-cream text-soft-charcoal">
      <main className="pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 font-body text-sm text-muted-brown transition-colors hover:text-terracotta"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to our story
          </Link>

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-4 font-body text-xs font-medium uppercase tracking-[3px] text-terracotta">
                Your giving preferences
              </p>
              <h1 className="max-w-[520px] font-display text-4xl font-normal leading-[1.08] text-soft-charcoal md:text-6xl">
                Give where your heart leads.
              </h1>
              <p className="mt-6 max-w-[470px] font-body text-lg leading-relaxed text-muted-brown">
                Choose an amount and the work you care about most. Every gift is
                directed with care and reported back to our community.
              </p>

              <div className="mt-10 grid gap-4">
                {preferences.map((item) => {
                  const Icon = item.icon;
                  const selected = preference === item.title;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setPreference(item.title)}
                      className={`flex items-center gap-4 border p-4 text-left transition-colors ${
                        selected
                          ? "border-terracotta bg-warm-white shadow-[0_8px_24px_rgba(45,42,38,0.08)]"
                          : "border-border-beige bg-warm-white/50 hover:border-terracotta-light"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${selected ? "bg-terracotta text-warm-white" : "bg-light-beige text-terracotta"}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-display text-xl text-soft-charcoal">
                          {item.title}
                        </span>
                        <span className="mt-1 block font-body text-sm text-muted-brown">
                          {item.description}
                        </span>
                      </span>
                      {selected && (
                        <Check className="ml-auto h-5 w-5 text-sage-green" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border border-border-beige bg-warm-white p-6 shadow-[0_12px_36px_rgba(45,42,38,0.08)] md:p-10"
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-display text-3xl text-soft-charcoal">
                    Build your gift
                  </h2>
                  <p className="mt-2 font-body text-sm text-muted-brown">
                    Select what feels right for you.
                  </p>
                </div>
                <Building2 className="h-7 w-7 text-warm-gold" />
              </div>

              <fieldset>
                <legend className="mb-3 font-body text-sm font-medium text-soft-charcoal">
                  How much would you like to donate?
                </legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {amounts.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAmount(option)}
                      className={`border px-4 py-3 font-body text-sm transition-colors ${amount === option ? "border-terracotta bg-terracotta text-warm-white" : "border-border-beige text-muted-brown hover:border-terracotta"}`}
                    >
                      {option}
                    </button>
                  ))}
                  <label
                    className={`border px-4 py-3 font-body text-sm ${amount === "custom" ? "border-terracotta bg-terracotta text-warm-white" : "border-border-beige text-muted-brown"}`}
                  >
                    <span className="sr-only">Custom amount</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Custom"
                      onFocus={() => setAmount("custom")}
                      className="w-full bg-transparent outline-none placeholder:text-current"
                    />
                  </label>
                </div>
              </fieldset>

              <div className="mt-8">
                <label
                  htmlFor="preference"
                  className="mb-3 block font-body text-sm font-medium text-soft-charcoal"
                >
                  Where should your gift go?
                </label>
                <select
                  id="preference"
                  value={preference}
                  onChange={(event) => setPreference(event.target.value)}
                  className="w-full border border-border-beige bg-warm-cream px-4 py-3 font-body text-sm text-muted-brown outline-none focus:border-terracotta"
                >
                  <option>Where it is needed most</option>
                  {preferences.map((item) => (
                    <option key={item.title}>{item.title}</option>
                  ))}
                </select>
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 border border-border-beige p-4">
                <input
                  type="checkbox"
                  checked={companyGift}
                  onChange={(event) => setCompanyGift(event.target.checked)}
                  className="mt-1 accent-terracotta"
                />
                <span>
                  <span className="flex items-center gap-2 font-body text-sm font-medium text-soft-charcoal">
                    <Building2 className="h-4 w-4 text-terracotta" /> My company
                    will match this gift
                  </span>
                  <span className="mt-1 block font-body text-xs leading-relaxed text-muted-brown">
                    We will show you how to double your impact through your
                    employer.
                  </span>
                </span>
              </label>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  aria-label="Your name"
                  placeholder="Your name"
                  className="border border-border-beige bg-warm-cream px-4 py-3 font-body text-sm outline-none placeholder:text-muted-brown/70 focus:border-terracotta"
                />
                <input
                  required
                  type="email"
                  aria-label="Email address"
                  placeholder="Email address"
                  className="border border-border-beige bg-warm-cream px-4 py-3 font-body text-sm outline-none placeholder:text-muted-brown/70 focus:border-terracotta"
                />
              </div>

              <PrimaryButton className="mt-6 w-full" size="large">
                Continue with {amount === "custom" ? "your gift" : amount}
              </PrimaryButton>
              {submitted && (
                <p className="mt-4 text-center font-body text-sm text-sage-green">
                  Thank you. Your preferences are saved for the next step.
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
