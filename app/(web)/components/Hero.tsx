import { motion } from 'motion/react';
import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden ">
      <div className="relative z-10 min-h-screen   flex  items-start justify-center px-4 text-center pt-24">
          <div className=" w-3/4 sm:w-2/3 h-160 flex flex-col items-center justify-center rounded-xl ">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-white font-semibold text-4xl sm:text-4xl md:text-6xl  mb-6 max-w-4xl "
              >
                  <p className="bg-[#212121] rounded-2xl text-sm sm:text-lg w-full sm:w-[84%] mx-auto mb-8 py-1 flex items-center justify-around shadow-lg">Rider&#39;s choice award 2026: Best service. <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="Right-Line--Streamline-Mingcute" height={20} width={20} ><g fill="none" fillRule="evenodd"><path d="M16 0v16H0V0h16ZM8.395333333333333 15.505333333333333l-0.007333333333333332 0.0013333333333333333 -0.047333333333333324 0.023333333333333334 -0.013333333333333332 0.0026666666666666666 -0.009333333333333332 -0.0026666666666666666 -0.047333333333333324 -0.023333333333333334c-0.006666666666666666 -0.0026666666666666666 -0.012666666666666666 -0.0006666666666666666 -0.016 0.003333333333333333l-0.0026666666666666666 0.006666666666666666 -0.011333333333333334 0.2853333333333333 0.003333333333333333 0.013333333333333332 0.006666666666666666 0.008666666666666666 0.06933333333333333 0.049333333333333326 0.009999999999999998 0.0026666666666666666 0.008 -0.0026666666666666666 0.06933333333333333 -0.049333333333333326 0.008 -0.010666666666666666 0.0026666666666666666 -0.011333333333333334 -0.011333333333333334 -0.2846666666666666c-0.0013333333333333333 -0.006666666666666666 -0.005999999999999999 -0.011333333333333334 -0.011333333333333334 -0.011999999999999999Zm0.17666666666666667 -0.07533333333333334 -0.008666666666666666 0.0013333333333333333 -0.12333333333333332 0.062 -0.006666666666666666 0.006666666666666666 -0.002 0.007333333333333332 0.011999999999999999 0.2866666666666666 0.003333333333333333 0.008 0.005333333333333333 0.004666666666666666 0.134 0.062c0.008 0.0026666666666666666 0.015333333333333332 0 0.019333333333333334 -0.005333333333333333l0.0026666666666666666 -0.009333333333333332 -0.02266666666666667 -0.4093333333333333c-0.002 -0.008 -0.006666666666666666 -0.013333333333333332 -0.013333333333333332 -0.014666666666666665Zm-0.4766666666666666 0.0013333333333333333a0.015333333333333332 0.015333333333333332 0 0 0 -0.018 0.004l-0.004 0.009333333333333332 -0.02266666666666667 0.4093333333333333c0 0.008 0.004666666666666666 0.013333333333333332 0.011333333333333334 0.016l0.009999999999999998 -0.0013333333333333333 0.134 -0.062 0.006666666666666666 -0.005333333333333333 0.0026666666666666666 -0.007333333333333332 0.011333333333333334 -0.2866666666666666 -0.002 -0.008 -0.006666666666666666 -0.006666666666666666 -0.12266666666666666 -0.06133333333333333Z" strokeWidth={0.6667} /><path fill="#ffffff" d="M10.471333333333334 7.528666666666666a0.6666666666666666 0.6666666666666666 0 0 1 0 0.9426666666666665l-3.771333333333333 3.771333333333333a0.6666666666666666 0.6666666666666666 0 1 1 -0.9426666666666665 -0.9426666666666665l3.3 -3.3 -3.3 -3.3a0.6666666666666666 0.6666666666666666 0 0 1 0.9426666666666665 -0.9426666666666665l3.771333333333333 3.771333333333333Z" strokeWidth={0.6667} /></g></svg> </p>
                 <p className="text-white "> Unlock Your Ride </p>
                  <p className="text-[#3ecf8e] ">Pick. Book. Go. </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white  sm:text-xl md:text-2xl  max-w-2xl my-8"
              >
                  Experience seamless vehicle booking with our smart mobility platform
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 "
              >
                  <button className=" px-8 py-2 bg-[#006239] text-white font-semibold rounded-lg text-lg hover:bg-[#006239]/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-green-500">
                      Start your journey
                  </button>
                  <button className="px-8 py-2 bg-transparent border-2 border-white/20 text-white font-semibold rounded-lg text-lg hover:bg-white/5 transition-colors duration-300">
                      Learn More
                  </button>
              </motion.div>
          </div>

      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-900/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-indigo-900/10 rounded-full blur-2xl"></div>
    </div>
  )
};

export default Hero;