import React from 'react';
import { IoAnalyticsSharp } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { FaDatabase, FaFileInvoiceDollar } from "react-icons/fa";
import { MdOutlineQueryStats } from "react-icons/md";
import AnimatedBlock from './AnimatedBlock';

export default function Features() {
  const features = [
    {
      title: "Data Everywhere",
      description: "Insights Nowhere",
      Icon: FaDatabase,
      className: "scale-110", // Slightly larger scale for first icon
      iconColor: "#00FFD1"
    },
    {
      title: "Manual Audits",
      description: "and Financial planning are slow",
      Icon: FaFileInvoiceDollar,
      className: "", // Default size for second icon
      iconColor: "#00FFD1"
    },
    {
      title: "Tax Saving",
      description: "require expert knowledge",
      Icon: MdOutlineQueryStats,
      className: "rotate-0 hover:rotate-3 transition-transform duration-300", // Hover effect for third icon
      iconColor: "#00FFD1"
    }
  ];

  const solutions = [
    {
      title: "Data Integration",
      description: "Real-time data from multiple sources",
      Icon: IoAnalyticsSharp
    },
    {
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms for insights",
      Icon: GiBrain
    },
    {
      title: "Custom Reports",
      description: "Tailored reports for your needs",
      Icon: TbReportSearch
    }
  ];

  return (
    <section className="relative px-4 md:px-6 pt-12 md:pt-16 pb-4 md:pb-8 bg-[#070B14] overflow-hidden">
      {/* Add an overlay to ensure content remains visible */}
      <div className="absolute inset-0 bg-[#070B14]/80"></div>
      
      {/* Make content relative to appear above the background */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-800 px-4 py-2 rounded-full text-sm mb-4">
            Challenges & Solutions
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Transforming Financial Challenges
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-powered platform addresses key financial challenges with innovative solutions.
          </p>
        </div>

        {/* Features grid - improved for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {features.map((feature, index) => (
            <AnimatedBlock key={index} delay={index * 0.1}>
              <div className="min-h-[180px] flex flex-col items-center justify-center text-center space-y-4 p-4">
                <div className={`w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative ${feature.className} bg-[#0B1221] rounded-full p-6 border border-[#00FFD1]/20`}>
                  <feature.Icon className="w-full h-full" style={{ color: feature.iconColor }} />
                </div>
                <p className="text-gray-400 text-sm md:text-base">
                  {feature.title},<br/>
                  {feature.description}
                </p>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        {/* Solutions grid - improved for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-[#0B1221] p-6 md:p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-6 bg-[#00FFD1]/10 rounded-xl flex items-center justify-center">
                <solution.Icon className="w-6 h-6 md:w-8 md:h-8 text-[#00FFD1]" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">{solution.title}</h3>
              <p className="text-gray-400 text-sm md:text-base">{solution.description}</p>
              <div className="mt-4 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-[#00FFD1] rounded-full"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

