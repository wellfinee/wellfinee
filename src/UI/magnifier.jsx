import { useRef, useEffect } from 'react';
export default function Magnifier({ targetRef, zoom = 2, size = 150 }) {
  const magnifierRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    const magnifier = magnifierRef.current;

    if (!target || !magnifier) return;

    const handleEnter = () => {
      magnifier.style.display = 'block';
    };

    const handleLeave = () => {
      magnifier.style.display = 'none';
    };

    const handleMove = (e) => {
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // позиция лупы
      magnifier.style.left = `${x - size / 2}px`;
      magnifier.style.top = `${y - size / 2}px`;

      // фон — увеличенная копия содержимого
      magnifier.style.backgroundImage = `url(${getSnapshot(target)})`;
      magnifier.style.backgroundSize = `${target.offsetWidth * zoom}px ${target.offsetHeight * zoom}px`;
      magnifier.style.backgroundPosition = `-${x * (zoom - 1)}px -${y * (zoom - 1)}px`;
    };

    target.addEventListener('mouseenter', handleEnter);
    target.addEventListener('mouseleave', handleLeave);
    target.addEventListener('mousemove', handleMove);

    return () => {
      target.removeEventListener('mouseenter', handleEnter);
      target.removeEventListener('mouseleave', handleLeave);
      target.removeEventListener('mousemove', handleMove);
    };
  }, [targetRef, zoom, size]);

  return <div ref={magnifierRef} className="magnifier" style={{ width: size, height: size }} />;
}

// Вспомогательная функция: делает скриншот элемента как dataURL
function getSnapshot(element) {
  const clone = element.cloneNode(true);
  clone.style.transform = 'scale(1)';
  clone.style.pointerEvents = 'none';
  const wrapper = document.createElement('div');
  wrapper.appendChild(clone);
  wrapper.style.position = 'absolute';
  wrapper.style.top = '0';
  wrapper.style.left = '-9999px';
  document.body.appendChild(wrapper);

  const rect = element.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  const canvas = document.createElement('canvas');
  canvas.width = rect.width * scale;
  canvas.height = rect.height * scale;
  const ctx = canvas.getContext('2d');

  ctx.scale(scale, scale);
  ctx.drawWindow
  document.body.removeChild(wrapper);
  return canvas.toDataURL();
}
