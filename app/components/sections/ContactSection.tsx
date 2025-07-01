import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import ContactMeForm from "../ContactMeForm";
import { useSwipeableCarousel, SwipeIndicator } from "../ui/useSwipeableCarousel";

const ContactInfoItem = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="flex items-start">
    <div className="p-3 rounded-full bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </div>

    <div className="flex flex-col items-center justify-center w-full">
      <h4 className="font-medium w-full text-center">{label}</h4>
      {href ? (
        <a
          href={href}
          className="text-muted-foreground hover:text-primary transition-colors w-full text-center"
        >
          {value}
        </a>
      ) : (
        <span className="text-muted-foreground w-full text-center">{value}</span>
      )}
    </div>
  </div>
);

interface SectionProps {
  id: string;
}

const ContactSection: React.FC<SectionProps> = ({ id }) => {
  const { activeSlide, handlers } = useSwipeableCarousel(2);

  return (
    <section className="flex items-center justify-center min-h-screen" id={id}>
      <div className="container mx-auto max-w-5xl hidden md:block">
        <div className="py-24 px-4 relative bg-secondary/30">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get in <span className="text-primary">Touch</span>
          </h2>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6 justify-center">
                <ContactInfoItem
                  icon={Mail}
                  label="Email"
                  value="dummymail@gmail.com"
                  href="mailto:dummymail@gmail.com"
                />
                <ContactInfoItem
                  icon={Phone}
                  label="Phone"
                  value="+34 000 000 000"
                  href="tel:1234567890"
                />
                <ContactInfoItem
                  icon={MapPin}
                  label="Location"
                  value="Spain"
                />
              </div>

              <div className="pt-8">
                <h4 className="font-medium mb-4">Connect With Me</h4>
                <div className="flex space-x-4 justify-center">
                  <a href="dummylink" target="_blank">
                    <Linkedin/>
                  </a>
                  <a href="dummylink" target="_blank">
                    <Github/>
                  </a>

                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-xs">
              <ContactMeForm/>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile: swipeable carousel, full viewport width */}
      <div className="md:hidden w-screen max-w-none px-0 relative overflow-hidden" style={{ margin: 0 }} {...handlers}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.7s cubic-bezier(.4,2,.6,1)",
            transform: `translateX(-${activeSlide * 100}vw)`,
            width: "200vw",
          }}
        >
          <div style={{ width: "100vw", minWidth: 0, boxSizing: "border-box", display: "flex", justifyContent: "center", padding: "0 20px" }}>
            <div className="space-y-8" style={{ width: "100%", maxWidth: 400 }}>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-6 justify-center">
                <ContactInfoItem
                  icon={Mail}
                  label="Email"
                  value="dummymail@gmail.com"
                  href="mailto:dummymail@gmail.com"
                />
                <ContactInfoItem
                  icon={Phone}
                  label="Phone"
                  value="+34 000 000 000"
                  href="tel:1234567890"
                />
                <ContactInfoItem
                  icon={MapPin}
                  label="Location"
                  value="Spain"
                />
              </div>
              <div className="pt-8">
                <h4 className="font-medium mb-4">Connect With Me</h4>
                <div className="flex space-x-4 justify-center">
                  <a href="dummylink" target="_blank">
                    <Linkedin/>
                  </a>
                  <a href="dummylink" target="_blank">
                    <Github/>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100vw", minWidth: 0, boxSizing: "border-box", display: "flex", justifyContent: "center", padding: "0 20px" }}>
            <div className="bg-card p-8 rounded-lg shadow-xs" style={{ width: "100%", maxWidth: 400 }}>
              <ContactMeForm/>
            </div>
          </div>
        </div>
        <SwipeIndicator activeSlide={activeSlide} slideCount={2} />
      </div>
    </section>
  );
};

export default ContactSection;
