
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import { Calendar, MapPin, Clock } from 'lucide-react';

// Dummy data for lesson results
const lessonData = [
  {
    id: 1,
    date: "2025-05-12",
    time: "9:00 AM - 10:00 AM",
    location: "Sydney CBD",
    vehicleType: "Car",
    instructor: "John Smith",
    price: "$60"
  },
  {
    id: 2,
    date: "2025-05-12",
    time: "11:00 AM - 12:00 PM",
    location: "Bondi",
    vehicleType: "Car",
    instructor: "Sarah Johnson",
    price: "$60"
  },
  {
    id: 3,
    date: "2025-05-12",
    time: "2:00 PM - 3:00 PM",
    location: "Parramatta",
    vehicleType: "Motorcycle",
    instructor: "Michael Chen",
    price: "$65"
  },
  {
    id: 4,
    date: "2025-05-13",
    time: "10:00 AM - 11:00 AM",
    location: "Sydney CBD",
    vehicleType: "Light Truck",
    instructor: "Emma Wilson",
    price: "$75"
  },
  {
    id: 5,
    date: "2025-05-13",
    time: "3:00 PM - 4:00 PM",
    location: "Bondi",
    vehicleType: "Car",
    instructor: "David Brown",
    price: "$60"
  },
  {
    id: 6,
    date: "2025-05-14",
    time: "9:00 AM - 10:00 AM",
    location: "Parramatta",
    vehicleType: "Car",
    instructor: "John Smith",
    price: "$60"
  }
];

const Lessons = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [filteredLessons, setFilteredLessons] = useState(lessonData);
  
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Filter lessons based on selected criteria
    const filtered = lessonData.filter(lesson => {
      const dateMatch = date ? lesson.date === date : true;
      const locationMatch = location ? lesson.location === location : true;
      const vehicleMatch = vehicleType ? lesson.vehicleType === vehicleType : true;
      
      return dateMatch && locationMatch && vehicleMatch;
    });
    
    setFilteredLessons(filtered);
  };
  
  const handleBooking = (lessonId: number) => {
    // Find the booked lesson from the filteredLessons array
    const bookedLesson = filteredLessons.find(lesson => lesson.id === lessonId);
    
    if (bookedLesson) {
      // Show toast notification
      toast({
        title: "Lesson selected",
        description: "Proceed to checkout to complete your booking",
      });
      
      // Navigate to the checkout page with the lesson data
      navigate('/checkout', { 
        state: { bookingData: bookedLesson } 
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container-page">
        <h1 className="text-2xl font-bold mb-6">Find and Book a Driving Lesson</h1>
        
        {/* Filters */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Lessons</h2>
          
          <form onSubmit={handleFilter}>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  id="date"
                  className="input-field"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label htmlFor="location" className="form-label">Location</label>
                <select 
                  id="location" 
                  className="input-field"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  <option value="Sydney CBD">Sydney CBD</option>
                  <option value="Bondi">Bondi</option>
                  <option value="Parramatta">Parramatta</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                <select 
                  id="vehicleType" 
                  className="input-field"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="">All Vehicle Types</option>
                  <option value="Car">Car</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Light Truck">Light Truck</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Search Lessons
              </button>
            </div>
          </form>
        </div>
        
        {/* Results */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Available Lessons ({filteredLessons.length})</h2>
          
          {filteredLessons.length === 0 ? (
            <p className="text-center py-8 bg-muted rounded">No lessons available matching your criteria. Please try different filters.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map(lesson => (
                <div key={lesson.id} className="card hover-lift">
                  <div className="flex items-center mb-3 text-primary font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(lesson.date).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2 text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{lesson.time}</span>
                    </div>
                    
                    <div className="flex items-center mb-2 text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{lesson.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm font-semibold">{lesson.vehicleType}</div>
                      <div className="text-xs text-muted-foreground">Instructor: {lesson.instructor}</div>
                    </div>
                    <div className="text-lg font-semibold">{lesson.price}</div>
                  </div>
                  
                  <button 
                    onClick={() => handleBooking(lesson.id)}
                    className="w-full btn-primary"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Lessons;
