
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Check, Info } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Add-on services data
const addOnServices = [
  { id: 1, name: 'Test Preparation Session', price: 45, description: 'Extra 1-hour session focused on test preparation' },
  { id: 2, name: 'Highway Driving Practice', price: 35, description: 'Specialized practice for highway driving' },
  { id: 3, name: 'Parking Skills Training', price: 30, description: 'Focus on parallel and reverse parking techniques' },
];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  
  // Initialize booking data from location state
  useEffect(() => {
    if (location.state?.bookingData) {
      setBookingData(location.state.bookingData);
      // Extract price as a number
      const basePrice = parseInt(location.state.bookingData.price.replace('$', ''));
      setTotal(basePrice);
    } else {
      navigate('/lessons');
    }
  }, [location.state, navigate]);

  // Calculate total price whenever quantity or add-ons change
  useEffect(() => {
    if (!bookingData) return;
    
    // Extract base price as a number
    const basePrice = parseInt(bookingData.price.replace('$', ''));
    
    // Calculate selected add-ons total
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOnServices.find(addon => addon.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    
    // Calculate subtotal
    let subtotal = (basePrice * quantity) + addOnTotal;
    
    // Apply 20% discount if booking 5 or more lessons
    if (quantity >= 5) {
      subtotal = subtotal * 0.8; // 20% discount
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
    
    setTotal(subtotal);
  }, [quantity, selectedAddOns, bookingData]);

  // Add or remove add-on service
  const toggleAddOn = (id: number) => {
    setSelectedAddOns(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Increment lesson quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrement lesson quantity, minimum 1
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  // Proceed to booking confirmation
  const handleCheckout = () => {
    // Get selected add-on details
    const selectedAddOnDetails = addOnServices.filter(addon => 
      selectedAddOns.includes(addon.id)
    );
    
    // Create updated booking data with quantity and add-ons
    const updatedBookingData = {
      ...bookingData,
      quantity,
      addOns: selectedAddOnDetails,
      discountApplied,
      originalPrice: bookingData.price,
      totalPrice: `$${total.toFixed(2)}`,
    };
    
    toast({
      title: "Processing your booking",
      description: "Please wait while we confirm your booking details.",
    });
    
    // Navigate to confirmation page with updated booking data
    navigate('/booking-confirmation', { 
      state: { bookingData: updatedBookingData } 
    });
  };

  if (!bookingData) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container-page flex-grow">
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          
          {/* Lesson Summary */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4 text-primary">Lesson Summary</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {new Date(bookingData.date).toLocaleDateString('en-AU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{bookingData.time}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{bookingData.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Instructor</p>
                <p className="font-medium">{bookingData.instructor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vehicle Type</p>
                <p className="font-medium">{bookingData.vehicleType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Base Price</p>
                <p className="font-medium">{bookingData.price} per lesson</p>
              </div>
            </div>
            
            {/* Lesson Quantity Selector */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Number of Lessons</p>
                  <p className="text-sm text-muted-foreground">Book 5 or more lessons for a 20% discount</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={decrementQuantity}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="font-medium w-8 text-center">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {discountApplied && (
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-md mt-2 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>20% discount applied!</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Add-on Services */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4 text-primary">Add-on Services</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Enhance your learning experience with these additional services
            </p>
            
            <div className="space-y-4">
              {addOnServices.map((service) => (
                <div key={service.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                  <input 
                    type="checkbox" 
                    id={`addon-${service.id}`}
                    checked={selectedAddOns.includes(service.id)}
                    onChange={() => toggleAddOn(service.id)}
                    className="mt-1"
                  />
                  <div className="flex-grow">
                    <label htmlFor={`addon-${service.id}`} className="font-medium cursor-pointer">
                      {service.name}
                    </label>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="font-semibold">${service.price}</div>
                </div>
              ))}
              
              {selectedAddOns.length === 0 && (
                <div className="text-sm text-muted-foreground italic">
                  No add-on services selected
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4 text-primary">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Base Lesson Price</span>
                <span>{bookingData.price} × {quantity}</span>
              </div>
              
              {selectedAddOns.length > 0 && (
                <>
                  <div className="flex justify-between">
                    <span>Add-on Services</span>
                    <span>
                      ${selectedAddOns.reduce((sum, id) => {
                        const addOn = addOnServices.find(addon => addon.id === id);
                        return sum + (addOn?.price || 0);
                      }, 0)}
                    </span>
                  </div>
                </>
              )}
              
              {discountApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (20%)</span>
                  <span>-${(total * 0.25).toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={() => navigate('/lessons')}
              className="btn-outline"
            >
              Back to Lessons
            </button>
            <button 
              onClick={handleCheckout}
              className="btn-primary"
            >
              Complete Booking
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
