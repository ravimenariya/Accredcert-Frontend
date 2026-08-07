import React, { Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cleanupScrollAnimations, runScrollAnimations } from "@/lib/scrollAnimations";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Verification from "@/pages/verification";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Blogs from "@/pages/blog";
import NotFound from "@/pages/not-found";
import Service from "@/pages/service";
import SingleBlog from "@/pages/Single-Blog";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    runScrollAnimations();
    return () => cleanupScrollAnimations();
  }, [location]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div
        data-scroll-progress
        className="fixed top-0 left-0 z-[70] h-1 w-full origin-left bg-[linear-gradient(90deg,#e4b441_0%,#0a4fa3_48%,#13a36b_100%)]"
      />
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/verification" component={Verification} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog/:id" component={SingleBlog} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/service/:id" component={Service} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;
