import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Globe } from "lucide-react";
import SEO from "@/components/seo";
import ParticlesEffect from "@/components/ui/particles-effect";

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
      <section className="relative overflow-hidden bg-[#0f2438] text-white">
        {/* Background dynamic particle network - permanently active */}
        <ParticlesEffect isActive={true} />

        {/* background image */}
        <div
          data-animate="parallax"
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dvgofgw5j/image/upload/v1758716204/626e6679bf1114f85d4a3fca7fa1420c_wjafjj.jpg")',
          }}
        />

        {/* subtle black overlay ~25% opacity so text pops */}
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(6,20,33,0.82)_0%,rgba(12,54,92,0.67)_58%,rgba(25,115,82,0.58)_100%)] z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 xlg:px-8 py-24 md:py-32">
          <div className="text-center" data-animate="reveal">
            <div 
              className="inline-block cursor-pointer transition-all duration-300 transform hover:scale-[1.02] mb-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight select-none min-h-[96px] md:min-h-[144px]">
                {typedTitle.length <= 18 ? (
                  <>
                    {typedTitle}
                    {typedTitle.length < 18 && (
                      <span className="animate-pulse inline-block w-1.5 h-8 md:h-12 bg-white ml-1 align-middle" />
                    )}
                  </>
                ) : (
                  <>
                    Simplifying Global
                    <br />
                    <span className="text-[#f2c357] transition-colors duration-300 hover:text-white">
                      {typedTitle.slice(18)}
                      {typedTitle.length < fullTitle.length && (
                        <span className="animate-pulse inline-block w-1.5 h-8 md:h-12 bg-[#f2c357] ml-1 align-middle" />
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
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="professional-button-outline">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 section-gradient" data-animate="reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose AccredCert?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive compliance solutions with unmatched expertise and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-animate-group="stagger">
            <div className="text-center surface-glass rounded-xl p-5" data-animate-item="stagger">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">FDA Certified</h3>
              <p className="text-gray-600">
                US Government certified FDA agent with proven track record in global compliance.
              </p>
            </div>

            <div className="text-center surface-glass rounded-xl p-5" data-animate-item="stagger">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Experienced professionals specializing in regulatory compliance across industries.
              </p>
            </div>

            <div className="text-center surface-glass rounded-xl p-5" data-animate-item="stagger">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">500+ Clients</h3>
              <p className="text-gray-600">
                Successfully helped over 500 businesses achieve compliance and market entry.
              </p>
            </div>

            <div className="text-center surface-glass rounded-xl p-5" data-animate-item="stagger">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Serving clients across 50+ countries with comprehensive compliance solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50" data-animate="reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive regulatory and compliance services tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate-group="stagger">
            {/* USA Services */}
            <div className="service-card p-6" data-animate-item="stagger">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="FDA Registration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">FDA Registration</h3>
              <p className="text-gray-600 mb-4">
                Complete FDA facility registration and food product compliance for U.S. market entry.
              </p>
              <Button className="professional-button">Learn More</Button>
            </div>

            <div className="service-card p-6" data-animate-item="stagger">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Cosmetics Registration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">Cosmetics (MoCRA)</h3>
              <p className="text-gray-600 mb-4">
                Navigate the new MoCRA requirements for cosmetic product registration and compliance.
              </p>
              <Button className="professional-button">Learn More</Button>
            </div>

            <div className="service-card p-6" data-animate-item="stagger">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="LLC Registration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">LLC Registration</h3>
              <p className="text-gray-600 mb-4">
                Complete business formation services for establishing your U.S. presence.
              </p>
              <Button className="professional-button">Learn More</Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="professional-button">
                View All Services
              </Button>
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
      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
        Contact Us Today
      </Button>
    </Link>
    <Link href="/verification">
      <Button
        size="lg"
        variant="outline"
        className="border-white text-blue hover:bg-white hover:text-black"
      >
        Verify Certificate
      </Button>
    </Link>
  </div>
</div>

    </div>
  );
}
