import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Building2, ChevronDown, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [propertiesDropdown, setPropertiesDropdown] = useState(false)
  const [projectsDropdown, setProjectsDropdown] = useState(false)
  const [propertiesTimeout, setPropertiesTimeout] = useState(null)
  const [projectsTimeout, setProjectsTimeout] = useState(null)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ]

  const projectCategories = [
    {
      name: '3-4 Marla Projects',
      path: '/properties/3-4-marla',
      description: 'Compact family homes'
    },
    {
      name: '5-7 Marla Projects', 
      path: '/properties/5-7-marla',
      description: 'Spacious family residences'
    },
    {
      name: '10 Marla Projects',
      path: '/properties/10-marla', 
      description: 'Luxury family villas'
    },
    {
      name: '1 Canal Projects',
      path: '/properties/1-canal',
      description: 'Premium canal view properties'
    }
  ]

  return (
    <nav className="navbar-gradient shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Creative Logo - Left Side */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <Building2 size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">Sharjah</span>
              <span className="text-sm font-medium text-gray-600 -mt-1">Properties</span>
            </div>
          </Link>

          {/* Center Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                  location.pathname === item.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
                {/* Hover Underline Animation */}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}

            {/* Properties Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (propertiesTimeout) {
                  clearTimeout(propertiesTimeout)
                  setPropertiesTimeout(null)
                }
                setPropertiesDropdown(true)
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setPropertiesDropdown(false)
                  setProjectsDropdown(false)
                }, 150)
                setPropertiesTimeout(timeout)
              }}
            >
              <button
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group flex items-center space-x-1 ${
                  location.pathname.startsWith('/properties')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <span>Properties</span>
                <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                {/* Hover Underline Animation */}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 transition-all duration-300 group-hover:w-full ${
                  location.pathname.startsWith('/properties') ? 'w-full' : ''
                }`}></span>
              </button>

              {/* Properties Dropdown Menu */}
              {propertiesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                >
                  {/* All Properties Link */}
                  <Link
                    to="/properties"
                    className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 font-medium"
                  >
                    All Properties
                  </Link>
                  
                  <div className="border-t border-gray-100 my-2"></div>
                  
                  {/* Our Projects Section */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setProjectsDropdown(true)}
                    onMouseLeave={() => setProjectsDropdown(false)}
                  >
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 font-medium"
                    >
                      <span>Our Projects</span>
                      <ChevronRight size={16} />
                    </button>

                    {/* Projects Sub-dropdown */}
                    {projectsDropdown && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full top-0 ml-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                      >
                        {projectCategories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                          >
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-gray-500">{category.description}</div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Side - Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+923464337896"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <Phone size={18} />
              <span>+92 346-4337896</span>
            </a>
            <Link to="/contact" className="btn-primary">
              Get Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Properties Section */}
              <div className="px-4 py-3">
                <div className="font-medium text-gray-900 mb-2">Properties</div>
                <div className="space-y-1 ml-4">
                  <Link
                    to="/properties"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    All Properties
                  </Link>
                  <div className="font-medium text-gray-700 mt-3 mb-2">Our Projects</div>
                  {projectCategories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 ml-4"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a
                  href="tel:+923464337896"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium px-4 py-2"
                >
                  <Phone size={18} />
                  <span>+92 346-4337896</span>
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary mx-4"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 