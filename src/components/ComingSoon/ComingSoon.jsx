import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import Squares from './Squares/Squares';
import TrueFocus from './TextAnimation/TextAnimation';
import TextCursor from './TextCursor';
import '../../styles/cursor.css';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const ComingSoon = memo(() => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }
    
    // Open the Razorpay payment link in a new tab
    window.open('https://razorpay.me/@datalis?amount=n%2FUUsdogj%2F7sarE2WD13qg%3D%3D', '_blank');
  };

  return (
    <div className="relative h-screen bg-[#070B14] flex items-center justify-center overflow-hidden">
      {/* Back to Home Button - refined design */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1221]/80 backdrop-blur-sm rounded-full border border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#0B1221] transition-all duration-300 text-xs sm:text-sm"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
      </div>
      
      <TextCursor
        delay={0.01}
        spacing={100}
        followMouseDirection={false}
        randomFloat={false}
        exitDuration={0.2}
        removalInterval={30}
        maxPoints={5}
        size={24} // Smaller size for mobile
      />
      
      {/* Animated Squares Background */}
      <div className="absolute inset-0 bg-[#070B14]">  
        <Squares 
          speed={0.8} 
          squareSize={20}
          direction='diagonal'
          borderColor='rgba(0, 255, 209, 0.2)'
          hoverFillColor='rgba(0, 255, 209, 0.05)'
          density={0.8}
          className="teal-hover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#070B14]/95 via-[#070B14]/90 to-[#070B14]/95" />

      {/* Content - improved spacing and responsiveness */}
      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto h-full flex flex-col justify-center gap-6 sm:gap-8">
        {/* Header - responsive logo sizing */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-2">
          <img 
            src="/Datalis1.png"
            alt="Datalis Logo" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter drop-shadow-lg"
          />
          <span className="text-xl sm:text-2xl font-semibold text-white">Datalis</span>
        </div>

        {/* TrueFocus - adjusted for mobile */}
        <div className="flex justify-center">
          <TrueFocus 
            sentence="Coming Soon"
            manualMode={false}
            blurAmount={2}
            borderColor="rgba(0, 255, 209, 0.5)"
            animationDuration={0.4}
            pauseBetweenAnimations={0.6}
          />
        </div>

        {/* CountdownTimer - with improved spacing */}
        <div className="my-2 sm:my-4">
          <CountdownTimer 
            initialDays={20}
            initialHours={24}
            initialMinutes={60}
            initialSeconds={60}
          />
        </div>
        
        <p className="text-gray-300 text-xs sm:text-sm max-w-lg mx-auto">
          Revolutionizing the way you connect, create, and collaborate. 
          Join us on this exciting journey as we prepare to launch.
        </p>

        {/* Early Bird Offers - refined design */}
        <div className="mt-6 sm:mt-8 bg-[#0B1221]/90 border border-gray-800 rounded-lg p-4 sm:p-5 max-w-md mx-auto w-full shadow-lg">
          <h3 className="text-base sm:text-lg font-medium text-white mb-4 flex items-center justify-center">
            <span className="text-[#00FFD1] mr-2">🎁</span> Early Bird Offers
          </h3>
          
          <div className="space-y-2.5 text-left mb-5">
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-[#00FFD1] mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-sm text-gray-300">Access to Auditor & Tax Agents</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-[#00FFD1] mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-sm text-gray-300">Premium Access on Launch</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-[#00FFD1] mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-sm text-gray-300">Exclusive Webinars & Training</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-md text-white text-sm focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
              required
            />
            <button 
              type="submit"
              className="w-full py-2.5 bg-[#00FFD1] text-black rounded-md text-sm font-medium hover:bg-[#00FFD1]/90 transition-all duration-300 flex items-center justify-center"
            >
              <span>Claim offer via Razorpay</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

ComingSoon.displayName = 'ComingSoon';
export default ComingSoon;
















