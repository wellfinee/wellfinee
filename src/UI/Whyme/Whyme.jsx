import React, { useEffect, useRef } from 'react';
import './Whyme.css';

export default function RoomEffect() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const windows = Array.from(container.querySelectorAll('.panel__window'));
    let activeWindow = null;

    // все сразу скрываем
    windows.forEach((w) => (w.style.opacity = '0'));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          // если вошли в зону — показываем, пряча прошлую
          if (isIntersecting) {
            if (activeWindow && activeWindow !== target) {
              activeWindow.style.opacity = '0';
            }
            target.style.opacity = '1';
            activeWindow = target;
          }
          // а если покинули зону вверх или вниз — скрываем этот же элемент
          else if (activeWindow === target) {
            target.style.opacity = '0';
            activeWindow = null;
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // ← полоса по центру
        threshold: 0,
      }
    );

    windows.forEach((w) => obs.observe(w));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className="panel panel__left">
        <div data-side="left" className="panel__window">
          <h1>Perfect</h1>
          <p>Lorem ipsum dolor sit amet…</p>
        </div>
        <div data-side="left" className="panel__window">
          <h1>Perfect</h1>
          <p>Lorem ipsum dolor sit amet…</p>
        </div>
      </div>

      <div className="panel panel__right">
        <div data-side="right" className="panel__window">
          <h1>Perfect</h1>
          <p>Lorem ipsum dolor sit amet…</p>
        </div>
        <div data-side="right" className="panel__window">
          <h1>Perfect</h1>
          <p>Lorem ipsum dolor sit amet…</p>
        </div>
      </div>
    </div>
  );
}
