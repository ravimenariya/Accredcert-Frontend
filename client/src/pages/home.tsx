import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Globe, ChevronDown } from "lucide-react";
import SEO from "@/components/seo";
import ParticlesEffect from "@/components/ui/particles-effect";
import Magnetic from "@/components/ui/magnetic";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const fullTitle = "Simplifying Global Compliance";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, index + 1));
      index++;
      if (index >= fullTitle.length) {
        clearInterval(intervalId);
      }
    }, 45); // 45ms per character for standard professional typewriter speed
    return () => clearInterval(intervalId);
  }, []);

  // Fluent curtain reveal animations
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroScale, setHeroScale] = useState(1);
  const [isHeroHidden, setIsHeroHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight || 800;

      // Calculate opacity: fade to 0 over 75% of viewport height
      const opacity = Math.max(0, 1 - scrollY / (viewportHeight * 0.75));
      // Calculate scale: zoom down to 0.95
      const scale = Math.max(0.95, 1 - (scrollY / viewportHeight) * 0.05);

      setHeroOpacity(opacity);
      setHeroScale(scale);
      setIsHeroHidden(scrollY >= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO
        title="FDA Compliance & Regulatory Solutions"
        description="AccredCert is a trusted & US Govt. certified FDA agent specializing in global compliance solutions for manufacturers, distributors, and exporters."
        keywords="FDA compliance, FDA registration, FDA agent, food registration, cosmetics registration, MoCRA, medical device registration, food facility registration, FSVP agent"
      />

      {/* Decorative floating shapes for premium UI */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-y pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float-x pointer-events-none z-0" />

      {/* Hero Section */}
      <section
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          display: isHeroHidden ? "none" : "flex"
        }}
        className="fixed top-0 left-0 w-full h-screen bg-black text-white z-0 flex items-center justify-center origin-center transition-transform duration-100 ease-out"
      >
        {/* Background dynamic particle network - permanently active */}
        <ParticlesEffect isActive={true} />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-animate="reveal">
            <div
              className="inline-block cursor-pointer transition-all duration-300 transform hover:scale-[1.02] mb-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight select-none min-h-[96px] md:min-h-[144px] text-white">
                {typedTitle.length <= 18 ? (
                  <>
                    <span className="text-white">{typedTitle}</span>
                    {typedTitle.length < 18 && (
                      <span className="animate-pulse inline-block w-1.5 h-8 md:h-12 bg-white ml-1 align-middle" />
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-white">Simplifying Global</span>
                    <br />
                    <span className="text-white">
                      {typedTitle.slice(18)}
                      {typedTitle.length < fullTitle.length && (
                        <span className="animate-pulse inline-block w-1.5 h-8 md:h-12 bg-white ml-1 align-middle" />
                      )}
                    </span>
                  </>
                )}
              </h1>
            </div>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white font-medium bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-balance">
              AccredCert is a trusted &amp; US Govt. certified FDA agent specializing in global compliance solutions for manufacturers, distributors, and exporters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Magnetic strength={0.2} range={60}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8">
                    Get Started Today
                  </Button>
                </Magnetic>
              </Link>
              <Link href="/services">
                <Magnetic strength={0.2} range={60}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-colors duration-300 font-semibold py-4 px-8 bg-transparent">
                    View Our Services
                  </Button>
                </Magnetic>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer text-white/50 hover:text-white transition-colors duration-300 group"
        >
          <span className="text-xs uppercase tracking-widest mb-1.5 font-semibold group-hover:translate-y-[-2px] transition-transform duration-300">Scroll Down</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </section>

      {/* Scrolling Content Wrapper (Curtain Reveal) */}
      <div className="relative z-20 bg-[#090b0e] mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.4)] pb-1">
        {/* Soft blend transition from black hero to dark content */}
        <div className="absolute -top-48 left-0 w-full h-48 bg-gradient-to-t from-[#090b0e] to-transparent pointer-events-none" />
        {/* Key Features */}
        <section id="features" className="py-20 bg-gradient-to-br from-[#090b0e] via-[#0d1014] to-[#090b0e] text-white" data-animate="reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose AccredCert?</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We provide comprehensive compliance solutions with unmatched expertise and reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-animate-group="stagger">
              <div className="text-center bg-[#11151a]/80 border border-white/5 rounded-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-[#151a21] transition-colors duration-300 backdrop-blur-sm animate-item" data-animate-item="stagger">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">FDA Certified</h3>
                <p className="text-gray-400">
                  US Government certified FDA agent with proven track record in global compliance.
                </p>
              </div>

              <div className="text-center bg-[#11151a]/80 border border-white/5 rounded-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-[#151a21] transition-colors duration-300 backdrop-blur-sm animate-item" data-animate-item="stagger">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
                <p className="text-gray-400">
                  Experienced professionals specializing in regulatory compliance across industries.
                </p>
              </div>

              <div className="text-center bg-[#11151a]/80 border border-white/5 rounded-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-[#151a21] transition-colors duration-300 backdrop-blur-sm animate-item" data-animate-item="stagger">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">500+ Clients</h3>
                <p className="text-gray-400">
                  Successfully helped over 500 businesses achieve compliance and market entry.
                </p>
              </div>

              <div className="text-center bg-[#11151a]/80 border border-white/5 rounded-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-[#151a21] transition-colors duration-300 backdrop-blur-sm animate-item" data-animate-item="stagger">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Global Reach</h3>
                <p className="text-gray-400">
                  Serving clients across 50+ countries with comprehensive compliance solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 bg-[#0c0f13] text-white" data-animate="reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Core Services</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive regulatory and compliance services tailored to your business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate-group="stagger">
              {/* USA Services */}
              <div className="bg-[#11151a] border border-white/5 rounded-xl p-6 group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)]" data-animate-item="stagger">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                    alt="FDA Registration"
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">FDA Registration</h3>
                <p className="text-gray-400 mb-4">
                  Complete FDA facility registration and food product compliance for U.S. market entry.
                </p>
                <Button className="professional-button">Learn More</Button>
              </div>

              <div className="bg-[#11151a] border border-white/5 rounded-xl p-6 group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)]" data-animate-item="stagger">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                    alt="Cosmetics Registration"
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cosmetics (MoCRA)</h3>
                <p className="text-gray-400 mb-4">
                  Navigate the new MoCRA requirements for cosmetic product registration and compliance.
                </p>
                <Button className="professional-button">Learn More</Button>
              </div>

              <div className="bg-[#11151a] border border-white/5 rounded-xl p-6 group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)]" data-animate-item="stagger">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                    alt="LLC Registration"
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">LLC Registration</h3>
                <p className="text-gray-400 mb-4">
                  Complete business formation services for establishing your U.S. presence.
                </p>
                <Button className="professional-button">Learn More</Button>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Magnetic strength={0.2} range={60}>
                  <Button size="lg" className="professional-button">
                    View All Services
                  </Button>
                </Magnetic>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-1 mb-20 text-center bg-[linear-gradient(130deg,#0d1f31_0%,#0a4fa3_58%,#139f6a_100%)] rounded-2xl p-12 max-w-5xl mx-auto" data-animate="reveal">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Simplify Your Compliance?
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started with our expert compliance solutions today and ensure your
            products meet all regulatory requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Magnetic strength={0.2} range={60}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Contact Us Today
                </Button>
              </Magnetic>
            </Link>
            <Link href="/verification">
              <Magnetic strength={0.2} range={60}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  Verify Certificate
                </Button>
              </Magnetic>
            </Link>
          </div>
        </div>

      </div> {/* Closing the scrolling content wrapper */}
    </div>
  );
}
