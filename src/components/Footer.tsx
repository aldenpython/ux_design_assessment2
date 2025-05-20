
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-primary">
                HKAA Driving School
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Professional driving instruction in Hong Kong
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground uppercase">Quick Links</h3>
              <ul className="text-muted-foreground">
                <li className="mb-2">
                  <Link to="/" className="hover:text-primary">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/lessons" className="hover:text-primary">Book Lessons</Link>
                </li>
                <li className="mb-2">
                  <Link to="/register" className="hover:text-primary">Register</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground uppercase">Resources</h3>
              <ul className="text-muted-foreground">
                <li className="mb-2">
                  <Link to="#" className="hover:text-primary">FAQ</Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="hover:text-primary">Driving Tips</Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="hover:text-primary">Test Preparation</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground uppercase">Contact</h3>
              <ul className="text-muted-foreground">
                <li className="mb-2">
                  <p>123 Drive Street</p>
                </li>
                <li className="mb-2">
                  <p>Hong Kong</p>
                </li>
                <li className="mb-2">
                  <p>info@hkaadrivingschool.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-6 border-border sm:mx-auto" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground">
            © {currentYear} HKAA Driving School. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:mt-0">
            <Link to="#" className="text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
