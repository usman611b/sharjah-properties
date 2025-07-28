import { motion } from 'framer-motion'
import { Users, Award, Target, Heart, CheckCircle } from 'lucide-react'

const About = () => {
  const stats = [
    { number: '500+', label: 'Properties Sold' },
    { number: '1000+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Team Members' }
  ]

  const values = [
    {
      icon: <Heart size={48} className="text-primary-600" />,
      title: "Client First",
      description: "We prioritize our clients' needs and satisfaction above everything else."
    },
    {
      icon: <Target size={48} className="text-primary-600" />,
      title: "Excellence",
      description: "We strive for excellence in every transaction and service we provide."
    },
    {
      icon: <CheckCircle size={48} className="text-primary-600" />,
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices."
    },
    {
      icon: <Users size={48} className="text-primary-600" />,
      title: "Teamwork",
      description: "We believe in collaboration and working together to achieve success."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white shadow-sm">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Sharjah Properties</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in real estate for over 15 years, serving the Pakistan community with excellence and integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2008, Sharjah Properties has been at the forefront of the real estate industry in Pakistan. 
                What started as a small family business has grown into one of the most trusted names in property sales, 
                rentals, and management across major cities including Lahore, Islamabad, and Karachi.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our journey has been marked by a commitment to excellence, personalized service, and deep understanding 
                of the local Pakistani market. We've helped thousands of families find their dream homes in prestigious 
                housing societies like DHA, Bahria Town, Gulberg, and Model Town.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to innovate and adapt to the changing market while maintaining the core values 
                that have made us successful: integrity, professionalism, and client satisfaction.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
                alt="Our Office"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-primary-100 text-lg">
              Numbers that speak for our success and commitment to excellence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let our experienced team help you find your perfect property in Pakistan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923464337896" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Call Us Today
              </a>
              <a href="mailto:usmanali611b@gmail.com" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About 