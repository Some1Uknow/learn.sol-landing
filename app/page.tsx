"use client";

import { ArrowRight, Code, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FeatureCard from "@/components/feature-card";
import RoadmapItem from "@/components/roadmap-item";
import AIAnimation from "@/components/ai-animation";
import { useState, useEffect } from "react";
import { BetaSignupModal } from "@/components/beta-signup-modal";

export default function Home() {
  const [betaModalOpen, setBetaModalOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number>(0);

  // Fetch waitlist count
  useEffect(() => {
    fetch('/api/beta-signup')
      .then(res => res.json())
      .then(data => {
        if (data.count !== undefined) {
          setWaitlistCount(data.count);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0c10] text-white">
      {/* Beta Signup Modal */}
      <BetaSignupModal open={betaModalOpen} onOpenChange={setBetaModalOpen} />

      {/* Gradient background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[70%] bg-[#14F195]/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[60%] bg-[#9945FF]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[40%] bg-[#00C2FF]/20 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="container mx-auto py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-space-grotesk">
            learn.sol
          </span>
          <div className="h-2 w-2 rounded-full bg-[#14F195] animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </Button>
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Features
          </Button>
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white"
            onClick={() => {
              document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Roadmap
          </Button>
          <Button
            className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 text-black"
            onClick={() => setBetaModalOpen(true)}
          >
            Join the Beta
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="container mx-auto py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight font-space-grotesk mb-6">
              Learn. Build. Ship.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                Faster
              </span>{" "}
              — with AI for Solana.
            </h1>
            <p className="text-xl text-white/80 mb-8">
              AI-powered platform to help you become a Solana dev — faster than
              ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 text-black"
                onClick={() => setBetaModalOpen(true)}
              >
                Join the Beta
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Waitlist indicator */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Avatar key={i} className="border-2 border-[#0c0c10] w-8 h-8 bg-gradient-to-br from-[#14F195]/20 to-[#9945FF]/20">
                    <AvatarFallback className="bg-gradient-to-br from-[#14F195]/10 to-[#9945FF]/10 text-white/70 text-xs">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#14F195] animate-pulse"></div>
                <span className="text-white/70">
                  <span className="font-semibold text-white">{waitlistCount.toLocaleString()}</span> developers joined
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <AIAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-space-grotesk">
          Key Features
        </h2>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to accelerate your Solana development journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<MessageSquare className="h-6 w-6 text-[#14F195]" />}
            title="AI Chat Assistant"
            description="Trained on Solana, Rust, and Anchor documentation to answer all your development questions instantly."
          />
          <FeatureCard
            icon={<Code className="h-6 w-6 text-[#9945FF]" />}
            title="Smart Contract Generation"
            description="Generate Rust, Anchor, and Seahorse code with simple prompts. Build faster with AI assistance."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-[#00C2FF]" />}
            title="Real-time Debugging"
            description="Get instant explanations for errors and suggestions to fix them, saving hours of debugging time."
          />
          <FeatureCard
            icon={<MessageSquare className="h-6 w-6 text-[#14F195]" />}
            title="Interactive Tutorials"
            description="Build real dApps with step-by-step guidance. Create tokens, voting systems, NFT mints, and more."
          />
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block px-4 py-2 bg-white/5 rounded-full text-white/70 border border-white/10">
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-[#14F195] mr-2"></span>
              Coming Soon: In-browser AI IDE for full stack DApp development with Solana, Rust and Anchor
            </span>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="container mx-auto py-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-space-grotesk">
          Roadmap
        </h2>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          Our vision for the future of learn.sol
        </p>

        <div className="max-w-3xl mx-auto">
          <RoadmapItem
            version="V0"
            title="Core AI Chatbot"
            description="Launch with AI Chatbot trained on Solana, Rust, and Anchor documentation for learning, building and debugging."
            active={true}
          />
          <RoadmapItem
            version="V1"
            title="FreeCodeCamp-style tutorials to learn Solana, Rust, and Anchor"
            description="Interactive tutorials to build real dApps and smart contracts with step-by-step guidance"
          />
          <RoadmapItem
            version="V2"
            title="AI Assisted Smart Contract and DApp Code Generation and Deployment"
            description="Generate Rust, Anchor, and Solana DApp code with simple prompts. Build and deploy faster with AI."
          />
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="container mx-auto py-20 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center font-space-grotesk">
            Get Early Access
          </h2>
          <p className="text-white/70 text-center mb-4">
            Join {waitlistCount.toLocaleString()} others on the waitlist — limited seats.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto items-center justify-center">
            <Button
              className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 text-black px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transform transition-transform hover:scale-105"
              onClick={() => setBetaModalOpen(true)}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left side - Logo */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold font-space-grotesk">
                  learn.sol
                </span>
                <div className="h-2 w-2 rounded-full bg-[#14F195]" />
              </div>
              <p className="text-white/60 text-sm">
                Built by developers, for developers
              </p>
            </div>

            {/* Right side - Social & Backed by */}
            <div className="flex items-center gap-12">
              {/* Social Links */}
              <div className="flex items-center gap-4 border-r border-white/10 pr-12">
                <Link
                  href="https://x.com/Some1UKnow25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/some1uknow/learn.sol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </Link>
                <Link
                  href="mailto:raghu250407@gmail.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </Link>
              </div>

              {/* Backed by section */}
              <div>
                <p className="text-sm text-white/60 mb-3">Backed by</p>
                <div className="flex items-center gap-6">
                  <div className="relative h-6 w-24 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                    <Image
                      src="https://solana.org/pages/branding/logotype/logo-light.png"
                      alt="Solana Foundation"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-6 w-24 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                    <Image
                      src="https://coindcx.com/api/help/img/CoinDCX-Logo.png"
                      alt="CoinDCX"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
