"use client";

import React from "react";
import texts from "@content/texts.json";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import ContactMeForm from "../ContactMeForm";
import { SwipeIndicator, useSwipeableCarousel } from "../ui/useSwipeableCarousel";

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
        <a href={href} className="text-muted-foreground hover:text-primary transition-colors w-full text-center">
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
            {texts.contact.title} <span className="text-primary">{texts.contact.titleHighlight}</span>
          </h2>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6">{texts.contact.infoTitle}</h3>

              <div className="space-y-6 justify-center">
                <ContactInfoItem
                  icon={Mail}
                  label={texts.contact.info[0].label}
                  value={texts.contact.info[0].value}
                  href={texts.contact.info[0].href}
                />
                <ContactInfoItem
                  icon={Phone}
                  label={texts.contact.info[1].label}
                  value={texts.contact.info[1].value}
                  href={texts.contact.info[1].href}
                />
                <ContactInfoItem
                  icon={MapPin}
                  label={texts.contact.info[2].label}
                  value={texts.contact.info[2].value}
                />
              </div>

              <div className="pt-8">
                <h4 className="font-medium mb-4">{texts.contact.connectTitle}</h4>
                <div className="flex space-x-4 justify-center">
                  <a href={texts.contact.links[0].href} target="_blank">
                    <Linkedin />
                  </a>
                  <a href={texts.contact.links[1].href} target="_blank">
                    <Github />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-xs">
              <ContactMeForm />
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
          <div
            style={{
              width: "100vw",
              minWidth: 0,
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              padding: "0 20px",
            }}
          >
            <div
              className="space-y-8 flex flex-col items-center justify-center mx-auto"
              style={{ width: "100%", maxWidth: 400 }}
            >
              <h3 className="text-2xl font-semibold mb-6">{texts.contact.infoTitle}</h3>
              <div className="space-y-6 justify-center">
                <ContactInfoItem
                  icon={Mail}
                  label={texts.contact.info[0].label}
                  value={texts.contact.info[0].value}
                  href={texts.contact.info[0].href}
                />
                <ContactInfoItem
                  icon={Phone}
                  label={texts.contact.info[1].label}
                  value={texts.contact.info[1].value}
                  href={texts.contact.info[1].href}
                />
                <ContactInfoItem
                  icon={MapPin}
                  label={texts.contact.info[2].label}
                  value={texts.contact.info[2].value}
                />
              </div>
              <div className="pt-8">
                <h4 className="font-medium mb-4">{texts.contact.connectTitle}</h4>
                <div className="flex space-x-4 justify-center">
                  <a href={texts.contact.links[0].href} target="_blank">
                    <Linkedin />
                  </a>
                  <a href={texts.contact.links[1].href} target="_blank">
                    <Github />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100vw",
              minWidth: 0,
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              padding: "0 20px",
            }}
          >
            <div className="bg-card p-8 rounded-lg shadow-xs" style={{ width: "100%", maxWidth: 400 }}>
              <ContactMeForm />
            </div>
          </div>
        </div>
        <SwipeIndicator activeSlide={activeSlide} slideCount={2} />
      </div>
    </section>
  );
};

export default ContactSection;
