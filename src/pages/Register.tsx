
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Label } from '@/components/ui/label';
import { CreditCard, Calendar, User, Mail, Lock } from 'lucide-react';

// Define form validation schema
const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return date <= minAge;
  }, { message: "You must be at least 18 years old" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  securityQuestion: z.string().min(1, { message: "Security question is required" }),
  securityAnswer: z.string().min(1, { message: "Security answer is required" }),
  cardNumber: z.string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number must not exceed 19 digits" })
    .refine((val) => /^\d+$/.test(val), { message: "Card number must contain only digits" }),
  cardExpiry: z.string()
    .refine((val) => /^\d{2}\/\d{2}$/.test(val), { message: "Expiry date must be in MM/YY format" }),
  cardCvv: z.string()
    .length(3, { message: "CVV must be 3 digits" })
    .refine((val) => /^\d+$/.test(val), { message: "CVV must contain only digits" }),
  paymentConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the $50 joining fee payment",
  }),
  marketingOptIn: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { isLoggedIn, login } = useAuth();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(true);

  // Initialize form with validation schema
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
      securityQuestion: "",
      securityAnswer: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      paymentConsent: false,
      marketingOptIn: false,
    },
    mode: "onBlur",
  });

  // Simple login form for when isRegistering is false
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const handleRegisterSubmit = (data: RegisterFormData) => {
    console.log("Registration data:", data);
    
    // Simulate registration/payment processing with loading state
    toast({
      title: "Processing registration...",
      description: "Please wait while we set up your account.",
    });
    
    // For demo purposes, simulate a successful registration after 1.5 seconds
    setTimeout(() => {
      login();
      toast({
        title: "Registration Successful",
        description: "Welcome to HKAA Driving School! Your $50 joining fee has been processed.",
      });
    }, 1500);
  };
  
  const handleLoginSubmit = (data: { email: string; password: string }) => {
    console.log("Login data:", data);
    
    // For demo purposes, consider any login attempt successful
    login();
    
    toast({
      title: "Login Successful",
      description: "Welcome back to HKAA Driving School!",
    });
  };

  // Helper function to check if a field has errors and has been touched
  const showError = (fieldName: keyof RegisterFormData) => {
    const field = form.getFieldState(fieldName);
    return field.isTouched && field.error;
  };
  
  if (isLoggedIn) {
    return <Navigate to="/lessons" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container-page">
        <div className="max-w-2xl mx-auto card">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isRegistering ? 'Create an Account' : 'Log In'}
          </h1>
          
          {isRegistering ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">Personal Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Full Name
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date of Birth
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        {showError("dateOfBirth") && (
                          <FormDescription>
                            <span className="text-red-600 font-bold">You must be at least 18 years old</span>
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Security Section */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">Security</h2>
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Password
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        {showError("password") && (
                          <FormDescription>
                            <span className="text-red-600 font-bold">Minimum 8 characters</span>
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Confirm Password
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="securityQuestion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Question</FormLabel>
                        <FormControl>
                          <select className="input-field" {...field}>
                            <option value="">Select a security question</option>
                            <option value="pet">What was your first pet's name?</option>
                            <option value="school">What school did you attend for sixth grade?</option>
                            <option value="city">In what city were you born?</option>
                            <option value="mother">What is your mother's maiden name?</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="securityAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Answer</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Payment Information Section */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">Payment Information</h2>
                  <div className="bg-muted/50 p-3 rounded-md mb-4">
                    <p className="text-sm">A one-time joining fee of <strong>$50</strong> will be charged to your card.</p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Card Number
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        {showError("cardNumber") && (
                          <FormDescription>
                            <span className="text-red-600 font-bold">Card number must be 16-19 digits</span>
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cardExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          {showError("cardExpiry") && (
                            <FormDescription>
                              <span className="text-red-600 font-bold">Format: MM/YY</span>
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardCvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          {showError("cardCvv") && (
                            <FormDescription>
                              <span className="text-red-600 font-bold">3 digits only</span>
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="paymentConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I authorize HKAA Driving School to charge the $50 joining fee to my card
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Marketing Opt-in */}
                <FormField
                  control={form.control}
                  name="marketingOptIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I would like to receive promotions and updates about driving lessons (optional)
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Register & Pay $50 Joining Fee
                </Button>
                
                <p className="text-center text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    className="text-primary hover:underline"
                  >
                    Log In
                  </button>
                </p>
              </form>
            </Form>
          ) : (
            /* Login Form (Simplified) */
            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="email" className="form-label">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  {...loginForm.register("email", { required: true })}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="password" className="form-label">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </div>
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...loginForm.register("password", { required: true })}
                  className="input-field"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Log In
              </Button>
              
              <p className="text-center text-sm">
                Need to create an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-primary hover:underline"
                >
                  Register
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
