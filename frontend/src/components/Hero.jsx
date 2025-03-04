import { useSelector } from 'react-redux';
import { motion as Motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiRedux, SiTailwindcss, SiFramer, SiExpress, SiMongodb, SiJsonwebtokens } from 'react-icons/si';

function Hero() {
  const { userInfo } = useSelector((state) => state.auth);

  const techStack = [
    { icon: <FaReact className="text-[#61DAFB]" />, name: "React" },
    { icon: <SiRedux className="text-[#764ABC]" />, name: "Redux" },
    { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: "Tailwind" },
    { icon: <SiFramer className="text-[#0055FF]" />, name: "Framer" },
    { icon: <FaNodeJs className="text-[#339933]" />, name: "Node.js" },
    { icon: <SiExpress className="text-[#000000] dark:text-[#FFFFFF]" />, name: "Express" },
    { icon: <SiMongodb className="text-[#47A248]" />, name: "MongoDB" },
    { icon: <SiJsonwebtokens className="text-[#000000] dark:text-[#FFFFFF]" />, name: "JWT" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900/80 via-green-800/80 to-teal-900/80 animate-gradient-bg dark:from-emerald-950 dark:via-green-900 dark:to-teal-950">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <Card className={`bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-emerald-500/10 ${
            userInfo ? 'border-4 border-emerald-400/50' : 'border border-emerald-200/20 dark:border-emerald-800/20'
          }`}>
            <CardHeader className="p-8 text-center">
              <CardTitle className="text-4xl font-bold text-emerald-100 dark:text-emerald-300 mb-2">MERN Authentication</CardTitle>
              <CardDescription className="text-lg text-emerald-300 dark:text-emerald-400">
                Secure, scalable, and modern authentication solution 🚀
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              {userInfo && (
                <Motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-emerald-800/30 rounded-xl p-6 shadow-inner mb-6"
                >
                  <p className="text-2xl font-semibold text-emerald-100 dark:text-emerald-300 text-center">
                    Welcome back, <span className="text-teal-400">{userInfo.name}</span>!
                  </p>
                </Motion.div>
              )}
              <div className="mb-6">
                {/* <h3 className="text-xl font-semibold text-emerald-200 mb-4 text-center">Powered by</h3> */}
                <div className="grid grid-cols-4 gap-4 mt-15">
                  {techStack.map((tech, index) => (
                    <Motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="text-3xl mb-2">{tech.icon}</div>
                      <span className="text-xs text-emerald-200">{tech.name}</span>
                    </Motion.div>
                  ))}
                </div>
              </div>
              {/* <Motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-emerald-300 text-sm"
              >
                Experience the power of full-stack authentication with modern technologies.
              </Motion.p> */}
            </CardContent>
          </Card>
        </Motion.div>
      </div>
    </section>
  );
}

export default Hero;
