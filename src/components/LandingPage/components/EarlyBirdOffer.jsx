import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, X } from 'lucide-react';

export default function EarlyBirdOffer() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim() || !name.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    // Open the Razorpay payment link in a new tab
    window.open('https://razorpay.me/@datalis?amount=n%2FUUsdogj%2F7sarE2WD13qg%3D%3D', '_blank');
    setSubmitted(true);
    
    // Close modal after success
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#070B14] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Early Bird </span>
            <span className="text-[#00FFD1]">Offer</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Be among the first to experience Datalis at a special introductory price.
            Limited time offer for early adopters.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#0B1221] border border-[#00FFD1]/20 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-3/5">
              <h3 className="text-2xl font-bold mb-3 text-white">50% Off Launch Price</h3>
              <p className="text-gray-400 mb-4">
                Get exclusive access to all premium features at half the price. 
                This offer is only available for a limited time.
              </p>
              
              <ul className="space-y-2 mb-6">
                {['All 3 AI Agents', 'Advanced Analytics', 'Priority Support', 'File Parsing'].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-[#00FFD1]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#00FFD1] text-black rounded-full font-medium hover:bg-[#00FFD1]/90 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Claim Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => window.open('https://docs.google.com/document/d/1zdfwL1chbpnJ14MWGxDDRrRDU7wpc-_n/edit?usp=sharing&ouid=104426491086879883523&rtpof=true&sd=true', '_blank')}
                  className="w-full sm:w-auto px-6 py-3 border border-[#00FFD1] text-[#00FFD1] rounded-full font-medium hover:bg-[#00FFD1]/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Sample Report</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-2/5">
              <div className="bg-[#1A2333] rounded-xl p-5 text-center">
                <div className="text-[#00FFD1] text-lg font-medium mb-2">Limited Time Offer</div>
                <div className="text-4xl font-bold mb-2">₹499</div>
                <div className="text-gray-400 line-through mb-4">₹999</div>
                <div className="text-sm text-gray-300 mb-4">
                  One-time payment for lifetime access
                </div>
                <button 
                  onClick={() => window.open('https://razorpay.me/@datalis?amount=n%2FUUsdogj%2F7sarE2WD13qg%3D%3D', '_blank')}
                  className="w-full py-2.5 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Claim offer via Razorpay
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* KYC Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B1221] rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-[#00FFD1] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-400">Your payment is being processed.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Quick Registration</h3>
                <p className="text-gray-400 mb-6">Please provide your details to claim the offer.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-md text-white text-sm focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-md text-white text-sm focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-[#00FFD1] text-black rounded-md text-sm font-medium hover:bg-[#00FFD1]/90 transition-all duration-300 flex items-center justify-center"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
