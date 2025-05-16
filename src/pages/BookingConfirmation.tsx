
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock, Mail, User, Car, Tag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const bookingData = location.state?.bookingData;
  
  // If no booking data or not logged in, redirect to lessons page
  React.useEffect(() => {
    if (!bookingData || !isLoggedIn) {
      navigate('/lessons');
    }
  }, [bookingData, isLoggedIn, navigate]);

  if (!bookingData) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container-page flex-grow">
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-green-100 rounded-md p-4 mb-8 border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-green-800 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Booking Confirmed!
            </h2>
            <p className="text-green-700 mt-1">
              A confirmation has been sent to your email address.
              Please check your inbox for details.
            </p>
          </div>
          
          <div className="card">
            <h1 className="text-2xl font-bold mb-6 text-center">Booking Details</h1>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-4 text-primary">Lesson Information</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">
                        {new Date(bookingData.date).toLocaleDateString('en-AU', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{bookingData.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{bookingData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Car className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Vehicle Type</p>
                      <p className="text-muted-foreground">{bookingData.vehicleType}</p>
                    </div>
                  </div>
                  
                  {bookingData.quantity > 1 && (
                    <div className="flex items-start">
                      <Tag className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Number of Lessons</p>
                        <p className="text-muted-foreground">{bookingData.quantity}</p>
                        {bookingData.discountApplied && (
                          <p className="text-sm text-green-600">20% discount applied</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-4 text-primary">Instructor</h2>
                
                <div className="flex items-start">
                  <User className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Instructor Name</p>
                    <p className="text-muted-foreground">{bookingData.instructor}</p>
                  </div>
                </div>
              </div>
              
              {bookingData.addOns && bookingData.addOns.length > 0 && (
                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-4 text-primary">Add-on Services</h2>
                  
                  <div className="space-y-2">
                    {bookingData.addOns.map((addon: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{addon.name}</span>
                        <span className="font-medium">${addon.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">Payment</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Base Price</span>
                    <span>{bookingData.originalPrice || bookingData.price}</span>
                  </div>
                  
                  {bookingData.quantity > 1 && (
                    <div className="flex justify-between items-center">
                      <span>Quantity</span>
                      <span>x{bookingData.quantity}</span>
                    </div>
                  )}
                  
                  {bookingData.discountApplied && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount</span>
                      <span>20% off</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <span>{bookingData.totalPrice || bookingData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <button 
                  onClick={() => navigate('/lessons')}
                  className="btn-outline"
                >
                  Book Another Lesson
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="btn-primary"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
