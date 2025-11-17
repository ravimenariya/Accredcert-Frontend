import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";
import { AppContext } from "@/Context";
import { Link } from "wouter";

export default function Services()  {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Services must be used within AppContext.Provider");
  }
  const { services } = context;

  // derive unique countries from available services (preserve original casing)
  const uniqueCountries = Array.from(
    services
      .map((s) => s.country)
      .filter(Boolean)
      .reduce((acc, c) => {
        const str = String(c).trim();
        const key = str.toLowerCase();
        if (!acc.has(key)) acc.set(key, str);
        return acc;
      }, new Map())
      .values()
  ) as string[];

  const [selectedCountry, setSelectedCountry] = useState<string>(uniqueCountries[0] || "All");

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive FDA compliance and regulatory services tailored to your business needs across multiple regions.
          </p>
        </div>

        {/* Country Selector */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-2 inline-flex">
              {/* Add an 'All' option */}
              <Button
                key="all"
                onClick={() => setSelectedCountry("All")}
                variant={selectedCountry === "All" ? "default" : "ghost"}
                className={selectedCountry === "All" ? "bg-black text-white" : "text-gray-600 hover:text-black"}
              >
                All
              </Button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter((service) => {
              if (!selectedCountry || selectedCountry === "All") return true;
              return (service.country || "").toLowerCase() === selectedCountry.toLowerCase();
            })
            .map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
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
