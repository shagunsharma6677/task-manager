import { Login } from '@/components/Login/Login';
import { LampContainer } from '@/components/ui/lamp.aceternity';
import { motion } from 'framer-motion';

const Authentication = () => {
  return (
    <div className="flex justify-center h-screen w-screen items-center">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-0 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center tracking-tight flex flex-col   box-border text-transparent"
        >
          <p className="text-5xl font-bold text-black mb-10">
            We are Happy to see you back
          </p>

          <Login />
        </motion.h1>
      </LampContainer>
    </div>
  );
};

export default Authentication;
