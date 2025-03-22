import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "../components/layout/Layout";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions about our products, shipping, or returns? We're
              here to help! Fill out the form and our team will get back to you
              as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@shopease.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Commerce Street
                    <br />
                    Suite 100
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Our Location
          </h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
            {/* Placeholder for a map - in a real app, you would use Google Maps or similar */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">
                Map would be displayed here
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
