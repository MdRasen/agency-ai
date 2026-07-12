import { useRef, useState } from "react";
import { motion } from "motion/react";

const ServiceCard = ({ index, service }) => {
  const glowRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();

    glowRef.current.style.left = `${e.clientX - rect.left - 150}px`;
    glowRef.current.style.top = `${e.clientY - rect.top - 150}px`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative overflow-hidden max-w-lg m-2 sm:m-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-gray-100 dark:shadow-white/10"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className={`pointer-events-none absolute w-75 h-75 rounded-full blur-2xl bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 transition-opacity duration-300 ${
          visible ? "opacity-70" : "opacity-0"
        }`}
        style={{
          left: "-150px",
          top: "-150px",
        }}
      />

      <div className="relative z-10 flex items-center gap-10 p-8 hover:p-7.5 hover:m-0.5 transition-all rounded-[10px] bg-white dark:bg-gray-900">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full">
          <img
            src={service.icon}
            alt="service-icon"
            className="max-w-24 bg-white dark:bg-gray-900 rounded-full m-2"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-bold">{service.title}</h3>
          <p className="text-sm mt-2">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
