import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// Слоганы для циклической смены
const slogans = [
    'ТО ЧТО ВЫ ИСКАЛИ',
    'ЛУЧШЕЕ ДЛЯ ВАС',
    'ОТКРОЙТЕ ДЛЯ СЕБЯ',
    'ПРИСОЕДИНЯЙТЕСЬ СЕЙЧАС'
];

const Preloader = () => {
const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const controls = useAnimation();

  // Обеспечиваем минимальную длительность показа прелоадера,
  // чтобы логотип успел анимироваться
  useEffect(() => {
    const minDisplay = 2000; // минимум 1.6 секунды
    const startTime = performance.now();

    const hide = () => {
      controls.start({ opacity: 0, transition: { duration: 0.6, ease: 'linear' } })
        .then(() => setLoaded(true));
    };

    const handleLoad = () => {
      const elapsed = performance.now() - startTime;
      const delay = Math.max(0, minDisplay - elapsed);
      setTimeout(hide, delay);
    };

    if (document.readyState === 'complete') {
      // если уже загружено до монтирования
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, [controls]);

  // Смена слогана каждую секунду
  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % slogans.length), 1000);
    return () => clearInterval(id);
  }, []);

  if (loaded) return null;

// Разбивка слова на буквы для деконструкции
const renderLetters = word => word.split('').map((char, i) => (
    <motion.span
        key={char + i}
        initial={{ y: 150, scale: 4, opacity: 0, skewX: 50 }}
        animate={{ y: 0, scale: 1, opacity: 1, skewX: 0 }}
        transition={{ delay: i * 0.3, duration: 0.6, ease: 'easeInOut' }}
        className="inline-block"
    >{char}</motion.span>
));

return (
    <AnimatePresence>
        <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            animate={controls}
        >

            <div className='preloader__logo'>
                {/* Логотип по буквам */}
                <h1 className="preloader__logo--string">
                    {renderLetters('WELL')}
                </h1>
                <h1 className="preloader__logo--string">
                    {renderLetters('FINEE')}
                </h1>
            </div>
            {/* Слоган */}
            <motion.h3
                className="preloader__desc"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', delay: 0.5 } }}
            >{slogans[current]}</motion.h3>
        </motion.div>
    </AnimatePresence>
);
};

export default Preloader;
