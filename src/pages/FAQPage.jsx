import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "../components/layout/Layout";

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay for secure online payments.",
    },
    {
      question: "How long will shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by location.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes! We offer free standard shipping on all orders over $100 within the United States.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of delivery. Items must be in original condition with tags attached. To initiate a return, go to your order history and select 'Return Item'.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can also view your order status and tracking details in your account under 'Order History'.",
    },
    {
      question: "Are my payment details secure?",
      answer:
        "Absolutely. We use industry-standard encryption and secure payment processors to ensure your personal and payment information is protected at all times.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Import duties and taxes may apply and are the responsibility of the customer.",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "You can reach our customer service team by email at support@shopease.com, by phone at +1 (555) 123-4567 during business hours (Mon-Fri, 9am-6pm EST), or through the chat feature on our website.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer gift wrapping for a small additional fee. You can select this option during checkout and even include a personalized message.",
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help you with any other
            questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@shopease.com"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
