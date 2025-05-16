
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Calendar, Car, Award, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container-page text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Learn to Drive with Confidence</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Expert driving instructors to help you master the road safely and pass your test first time.
          </p>
          <Link to="/lessons" className="btn-primary hover-lift text-lg px-8 py-3">
            Find a Lesson
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container-page">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="card hover-lift">
            <div className="flex justify-center mb-4">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-muted-foreground">Book lessons that fit your busy schedule</p>
          </div>
          
          <div className="card hover-lift">
            <div className="flex justify-center mb-4">
              <Car className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Modern Vehicles</h3>
            <p className="text-muted-foreground">Learn in safe, comfortable dual-control cars</p>
          </div>
          
          <div className="card hover-lift">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Certified Instructors</h3>
            <p className="text-muted-foreground">All instructors are fully qualified and experienced</p>
          </div>
          
          <div className="card hover-lift">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lesson Packages</h3>
            <p className="text-muted-foreground">Save with our multi-lesson packages</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-muted my-12 py-12">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Register today and receive $10 off your first driving lesson
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn-primary">
              Register Now
            </Link>
            <Link to="/lessons" className="bg-white text-primary border border-primary font-medium py-2 px-4 rounded hover:bg-muted transition-colors duration-200">
              View Lessons
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
