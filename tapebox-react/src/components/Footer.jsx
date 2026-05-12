import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white mt-16 w-full">
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">About TapeBox</h3>
            <p className="text-gray-300 text-sm">Fast, reliable, and affordable delivery service for your packages.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-green-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-green-300">About Us</Link></li>
              <li><Link to="/testimonials" className="hover:text-green-300">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-green-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/contact" className="hover:text-green-300">Contact Us</Link></li>
              <li><Link to="/tracking" className="hover:text-green-300">Track Package</Link></li>
              <li><Link to="/dropbox" className="hover:text-green-300">Drop a Box</Link></li>
              <li><Link to="/drone-delivery" className="hover:text-green-300">Drone Delivery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="mailto:balogujeremiah.8@gmail.com" className="hover:text-green-300">
                  balogujeremiah.8@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:08140450440" className="hover:text-green-300">08140450440</a>
              </li>
              <li>Habeeb Oyewole Street, Gbagada</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">&copy; 2026 TapeBox. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-green-300">Privacy Policy</a>
              <a href="#" className="hover:text-green-300">Terms of Service</a>
              <a href="#" className="hover:text-green-300">Cookie Policy</a>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <a href="#" className="text-gray-300 hover:text-green-300 text-sm font-medium">Facebook</a>
            <a href="#" className="text-gray-300 hover:text-green-300 text-sm font-medium">Twitter</a>
            <a href="#" className="text-gray-300 hover:text-green-300 text-sm font-medium">LinkedIn</a>
            <a href="#" className="text-gray-300 hover:text-green-300 text-sm font-medium">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
