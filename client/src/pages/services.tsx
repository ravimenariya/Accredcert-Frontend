import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";
import { AppContext } from "@/Context";
import { Link } from "wouter";
import SEO from "@/components/seo";

const QUICK_FILTERS = ["All", "USA", "India", "Europe"] as const;

function countryToText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (!value || typeof value !== "object") return "";

  const obj = value as Record<string, unknown>;
  const candidates = [obj.name, obj.country, obj.label, obj.title, obj.countryName];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return "";
}

function normalizeCountry(value: unknown) {
  return countryToText(value).toLowerCase();
}

function matchesCountryFilter(country: unknown, selectedFilter: string) {
  const selected = normalizeCountry(selectedFilter);
  const actual = normalizeCountry(country);

  if (!selected || selected === "all") return true;
  if (!actual) return false;

  if (selected === "usa") {
    return ["usa", "us", "u.s.", "u.s.a", "united states", "united states of america"].some((k) => actual.includes(k));
  }

  if (selected === "india") {
    return actual.includes("india");
  }

  if (selected === "europe") {
    return actual.includes("europe") || actual.includes("eu");
  }

  return actual === selected;
}

export default function Services()  {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Services must be used within AppContext.Provider");
  }
  const { services } = context;

  // derive unique countries from available services (preserve original casing)
  // and filter out those that are already covered by QUICK_FILTERS
  const uniqueCountries = Array.from(
    services
      .map((s) => s.country)
      .filter(Boolean)
      .reduce((acc, c) => {
        const str = countryToText(c);
        if (!str) return acc;

        // Check if this country is already handled by any of the quick filters (except "All")
        const isCovered = QUICK_FILTERS.some((filter) => {
          if (filter === "All") return false;
          return matchesCountryFilter(str, filter);
        });

        if (isCovered) return acc;

        const key = str.toLowerCase();
        if (!acc.has(key)) acc.set(key, str);
        return acc;
      }, new Map())
      .values()
  ) as string[];

  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  return (
    <div className="min-h-screen py-20 bg-gray-50 section-gradient relative overflow-hidden">
      <SEO 
        title="Our Services | FDA Compliance & Certification"
        description="Comprehensive FDA compliance, facility registration, US agent representation, MoCRA cosmetics regulations, FSVP, and GPSR/CE marking services."
        keywords="FDA registration, FSVP agent, Prior Notice, US LLC registration, GPSR compliance, CE marking, cosmetics registration"
      />
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float-y pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-float-x pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16" data-animate="reveal">
          <h1 className="text-4xl font-bold text-black mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive FDA compliance and regulatory services tailored to your business needs across multiple regions.
          </p>
        </div>

        {/* Country Selector */}
        <div className="mb-12" data-animate="reveal">
          <div className="flex justify-center">
            <div className="surface-glass rounded-lg shadow-lg p-2 inline-flex flex-wrap gap-1 justify-center">
              {QUICK_FILTERS.map((country) => (
                <Button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  variant={selectedCountry === country ? "default" : "ghost"}
                  className={selectedCountry === country ? "bg-black text-white" : "text-gray-600 hover:text-black"}
                >
                  {country}
                </Button>
              ))}
              {uniqueCountries.map((country) => (
                <Button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  variant={selectedCountry === country ? "default" : "ghost"}
                  className={selectedCountry === country ? "bg-black text-white" : "text-gray-600 hover:text-black"}
                >
                  {country}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate-group="stagger">
          {services
            .filter((service) => {
              return matchesCountryFilter(service.country, selectedCountry);
            })
            .map((service) => (
              <div key={service._id} data-animate-item="stagger">
                <ServiceCard service={service} />
              </div>
            ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg" data-animate="reveal">
          <h2 className="text-3xl font-bold text-black mb-4">Need Custom Compliance Solutions?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experts can provide tailored compliance strategies for your specific business needs and regulatory requirements.
          </p>
          <Link href="/contact">
            <Button size="lg" className="professional-button">
              Contact Our Experts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
