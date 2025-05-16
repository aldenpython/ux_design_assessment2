
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    toast({
      title: "Message Sent Successfully",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
      e.currentTarget.reset();
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container-page">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center">Contact Us</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center hover-lift">
              <div className="flex justify-center mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground">(02) 1234 5678</p>
            </div>
            
            <div className="card text-center hover-lift">
              <div className="flex justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground">info@sydneydrivingschool.com</p>
            </div>
            
            <div className="card text-center hover-lift">
              <div className="flex justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-muted-foreground">123 Drive Street, Sydney, NSW 2000</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              
              {submitted && (
                <div className="message-success mb-4" role="alert">
                  Message sent successfully! We'll respond shortly.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    className="input-field" 
                    placeholder="Your name"
                    required 
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    className="input-field" 
                    placeholder="your.email@example.com"
                    required 
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="input-field" 
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="form-label">Subject <span className="text-red-500">*</span></label>
                  <select id="subject" className="input-field" required>
                    <option value="" disabled selected>Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="support">Customer Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Message <span className="text-red-500">*</span></label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="input-field resize-none" 
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
            
            <div>
              <div className="card mb-6">
                <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Our Location</h2>
                
                <div className="bg-muted h-48 flex items-center justify-center mb-4">
                  <p className="text-muted-foreground text-sm">Map would be displayed here</p>
                </div>
                
                <address className="not-italic text-muted-foreground">
                  Sydney Driving School<br />
                  123 Drive Street<br />
                  Sydney, NSW 2000<br />
                  Australia
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
