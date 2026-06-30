import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { Services } from "@/components/sections/services"
import { Showreel } from "@/components/sections/showreel"
import { WhyUs } from "@/components/sections/why-us"
import { Gallery } from "@/components/sections/gallery"
import { Testimonials } from "@/components/sections/testimonials"
import { FollowUs } from "@/components/sections/follow-us"
import { FAQ } from "@/components/sections/faq"
import { CTAContact } from "@/components/sections/cta-contact"
import { Footer } from "@/components/sections/footer"
import ChatWidget from "@/components/chat-widget"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Showreel />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <FollowUs />
        <FAQ />
        <CTAContact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
