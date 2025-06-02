import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Squares from '../../Squares/Squares';
import TiltedCard from '../../TiltedCard/TiltedCard/TiltedCard';
import { motion } from 'framer-motion';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleTryDatalis = () => {
    if (isAuthenticated) {
      navigate('/coming-soon');
    } else {
      navigate('/login');
    }
  };

  // Refined animation variants with smoother easing
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 20px rgba(0, 255, 209, 0.4)',
      transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Spring-like easing for UI elements
  const springEasing = [0.34, 1.56, 0.64, 1];

  return (
    <section className="relative bg-[#070B14] min-h-screen overflow-hidden flex items-center">
      {/* Background Squares */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Squares 
          speed={0.3}
          squareSize={35}
          direction='diagonal'
          borderColor='#00FFD1'
          hoverFillColor='rgba(0, 255, 209, 0.1)'
          backgroundColor='transparent'
          density={1.2}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#070B14]/80 to-transparent"></div>

      {/* Content with increased z-index to appear above squares */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className="w-full lg:w-3/5 mb-10 lg:mb-0">
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Improved text layout for mobile */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-white block">Turn Data into</span>
                <span className="text-white block mt-1">Actionable</span>
                <span className="text-white block mt-1">Insights</span>
                <span className="text-[#00FFD1] block mt-1">with AI</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mb-8 text-lg max-w-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              Let AI transform your business data into the insights you need
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.button 
                onClick={handleTryDatalis}
                className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-[#00FFD1] rounded-full text-black font-medium text-base sm:text-lg hover:bg-[#00FFD1]/90 hover:shadow-[0_0_20px_rgba(0,255,209,0.4)]"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
              >
                Try Datalis
              </motion.button>
              <motion.button 
                onClick={() => window.open('https://huggingface.co/spaces/medhansh-k/Dabby', '_blank')}
                className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 border border-[#00FFD1] text-[#00FFD1] rounded-full font-medium text-base sm:text-lg hover:bg-[#00FFD1]/10"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
              >
                Try Dabby
              </motion.button>
            </motion.div>
          </div>
          
          {/* Right side - Themed Image with TiltedCard - Fixed for mobile */}
          <motion.div 
            className="w-full lg:w-2/5 flex justify-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Fixed card container with min-height to prevent collapse */}
            <div className="w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
              <TiltedCard 
                containerHeight="100%"
                containerWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={6}
                showTooltip={false}
              >
                <div className="relative w-full h-full p-4 overflow-hidden">
                  {/* Dashboard UI Elements */}
                  <motion.div 
                    className="absolute top-4 left-4 right-4 h-10 bg-[#00FFD1]/10 rounded-lg flex items-center px-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#00FFD1] mr-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.3, ease: springEasing }}
                    ></motion.div>
                    <motion.div 
                      className="w-20 h-3 bg-[#00FFD1]/30 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ delay: 1.0, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    ></motion.div>
                    <div className="ml-auto flex space-x-2">
                      <motion.div 
                        className="w-6 h-6 rounded-full bg-[#00FFD1]/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#00FFD1]"></div>
                      </motion.div>
                      <motion.div 
                        className="w-6 h-6 rounded-full bg-[#00FFD1]/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="w-3 h-3 bg-[#00FFD1]"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Chart Area */}
                  <motion.div 
                    className="absolute top-20 left-4 right-4 h-40 bg-[#00FFD1]/5 rounded-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="flex justify-between items-end h-full pb-6 px-4">
                      {[20, 60, 40, 80, 30].map((height, index) => (
                        <motion.div 
                          key={index}
                          className="w-8 bg-gradient-to-t from-[#00FFD1] to-purple-500 rounded-t-md"
                          style={{ height: `${height}%` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ 
                            delay: 1.2 + (index * 0.07), 
                            duration: 0.6, 
                            ease: springEasing
                          }}
                        ></motion.div>
                      ))}
                    </div>
                    <div className="absolute bottom-2 left-4 right-4 h-4 flex justify-between">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <motion.div 
                          key={index}
                          className="w-8 h-2 bg-white/20 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.6 + (index * 0.05), duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        ></motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Data Table */}
                  <motion.div 
                    className="absolute top-64 left-4 right-4 bottom-4 bg-[#00FFD1]/5 rounded-lg p-4 flex flex-col"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="flex justify-between mb-4">
                      <motion.div 
                        className="w-24 h-4 bg-[#00FFD1]/30 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 1.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      ></motion.div>
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.4, ease: springEasing }}
                      >
                        <div className="w-4 h-4 rounded-sm bg-purple-500"></div>
                      </motion.div>
                    </div>
                    
                    {/* Table Rows */}
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center py-3 border-b border-white/5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + (i * 0.08), duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00FFD1]/40 to-purple-500/40 mr-3 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-sm bg-[#00FFD1]/80"></div>
                        </div>
                        <div className="flex-1">
                          <motion.div 
                            className="w-full h-3 bg-white/20 rounded-full mb-1"
                            initial={{ width: "30%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.7 + (i * 0.08), duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                          ></motion.div>
                          <motion.div 
                            className="w-2/3 h-2 bg-white/10 rounded-full"
                            initial={{ width: "20%" }}
                            animate={{ width: "66%" }}
                            transition={{ delay: 1.8 + (i * 0.08), duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          ></motion.div>
                        </div>
                        <motion.div 
                          className="w-16 h-8 ml-4 bg-[#00FFD1]/20 rounded-lg flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.9 + (i * 0.08), duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="w-8 h-3 bg-[#00FFD1] rounded-full"></div>
                        </motion.div>
                      </motion.div>
                    ))}
                    
                    {/* Person with Computer */}
                    <motion.div 
                      className="absolute bottom-6 right-6 w-24 h-24"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.2, duration: 0.5, ease: springEasing }}
                    >
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-purple-600 rounded-lg transform rotate-6"></div>
                      <div className="absolute bottom-4 right-4 w-14 h-10 bg-[#00FFD1]/80 rounded-md transform -rotate-3"></div>
                      <div className="absolute bottom-8 right-8 w-8 h-8 bg-purple-500 rounded-full"></div>
                      <div className="absolute bottom-10 right-6 w-6 h-6 bg-[#00FFD1] rounded-full"></div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Animated Glow Effect */}
                  <motion.div 
                    className="absolute -top-20 -right-20 w-40 h-40 bg-[#00FFD1]/30 rounded-full filter blur-3xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  <motion.div 
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full filter blur-3xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 7,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                </div>
              </TiltedCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



















