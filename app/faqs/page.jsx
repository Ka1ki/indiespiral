"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, browse our online gallery, select your desired product or custom service, add it to your cart, and proceed to checkout. Follow the instructions to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major secure payment methods as indicated at checkout. All transactions are processed through encrypted payment gateways to ensure your information is protected.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Once an order is placed, your purchased products will be dispatched for shipping within 4 to 7 Indian working days. Estimated delivery time for domestic purchases will be 2 to 10 days post the dispatch. International delivery times may vary from 1 to 3 weeks post the dispatch.",
  },
  {
    question: "Can I cancel or change my order?",
    answer:
      "Once an order is placed, it cannot be canceled or changed. Please review your order and address carefully before finalizing your purchase.",
  },
  {
    question: "Do you offer refunds?",
    answer: "All sales are final. We do not offer refunds for any orders.",
  },
  {
    question: "How are the products shipped?",
    answer:
      "Our products are securely packed in protective materials to ensure they arrive in perfect condition. You will receive a tracking number once your order has been shipped. We are trying to be as plastic-free as we can with our deliveries. However, certain packages may contain plastic if the delivery area is remote or has uncertain weather conditions.",
  },
  {
    question: "What should I do if my package arrives damaged?",
    answer:
      "If your artwork arrives damaged, please contact us within 2 days of delivery with unboxing video and photos of the damage. We will assess the issue and arrange for a replacement if necessary. For more information, please check our Return Policy.",
  },
  {
    question: "What materials do you use for the artworks?",
    answer:
      "We use particle wood frames, good-quality prints on 180 GSM paper, 270 GSM to 300 GSM canvas, and pine wood frames for stretched canvases. Materials for future art pieces or sculptures may vary.",
  },
  {
    question: "Can I see a proof of authenticity?",
    answer:
      "Yes, we provide a certificate of authenticity with every Original Painting.",
  },
  {
    question: "Do you sign the artworks?",
    answer:
      "Yes, every Artwork be it Prints or Originals is personally signed.",
  },
  {
    question: "What inspired you to create videos and songs?",
    answer:
      "As an artist, I believe in the power of positivity and the ability of music and visuals to inspire change. My own journey of self-discovery and overcoming challenges has fueled my passion for creating content that uplifts and empowers others.",
  },
  {
    question: "How do you come up with ideas for your videos and songs?",
    answer:
      "Inspiration can come from anywhere -- personal experiences, stories shared by others, or even everyday moments. I often draw from universal themes of resilience, courage, and hope to create content that resonates with people from all walks of life.",
  },
  {
    question: "Can I use your Art, videos or songs in my own projects?",
    answer:
      "Copyrights for the all the works belong to me and are not permissible for use without permission and credibility. If you have any specific requests or inquiries regarding usage rights, feel free to reach out to me at _______",
  },
  {
    question: "Do you take requests for specific topics or themes?",
    answer:
      "While I'm constantly exploring new ideas and themes, I also value input from my audience. If you have a particular topic or theme that you'd like to see addressed in a video or song, don't hesitate to share it with me! I can't guarantee that I'll be able to fulfill every request, but I always appreciate hearing from my supporters.",
  },
  {
    question: "How can I support your work?",
    answer:
      "Thank you for your interest in supporting my creative endeavors! There are several ways you can show your support: Subscribe to my YouTube channel or follow me on social media to stay updated on my latest releases. Share my videos and songs with your friends, family, and followers. Leave comments and feedback on my content -- your input helps me improve and grow as an artist. Consider purchasing merchandise or subscriptions from the website or social media pages.",
  },
  {
    question: "Can I collaborate with you on a project?",
    answer:
      "I'm always open to collaboration opportunities with like-minded individuals and organizations. Whether you're a fellow artist, a content creator, or a nonprofit organization working towards a noble cause, I'd love to explore how we can collaborate to spread positivity and inspiration. Please reach out to me with your ideas and proposals, and let's see what we can create together! Please mentions 'Collaboration' in your email subject so that the team can direct the emails directly to me",
  },
  {
    question: "Do you offer Public speaking or Live performance services?",
    answer:
      "Yes, I'm available for live performances at events, conferences, schools, and other venues that are not private celebrations. Please get in touch with me to discuss your specific requirements and to check my availability.",
  },
  {
    question: "How do I contact customer support?",
    answer: `For any questions or issues, please contact us at _______. We are here to assist you and ensure a smooth and enjoyable experience with ${process.env.ORG_NAME}.`,
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-base-300">
      <button
        className="flex items-center justify-between w-full px-6 py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen py-12 bg-base-200 mt-14">
      <div className="container px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto shadow-xl bg-base-100 rounded-box">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
