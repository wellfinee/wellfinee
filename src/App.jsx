import { useEffect } from "react";
import { Route, Routes } from "react-router"; // убедитесь, что у вас react-router-dom (v6)
import Lenis from "@studio-freight/lenis";          // <-- правильный импорт!
import Preloader from "./UI/preloader";
import MainPage from "./pages/MainPage";
import MainPagesLayout from "./pages/layouts/MainPageLayouts";
import "./App.css"
function startNoise() {
  const canvas = document.getElementById('noiseCanvas');
  const ctx = canvas.getContext('2d');

  const SIZE = 200; // render small canvas and scale via CSS
  canvas.width = SIZE;
  canvas.height = SIZE;
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  const imageData = ctx.createImageData(SIZE, SIZE);
  const buffer32 = new Uint32Array(imageData.data.buffer);

  function noiseFrame() {
    crypto.getRandomValues(buffer32);
    for (let i = 0; i < buffer32.length; i++) {
      buffer32[i] |= 0xff000000; // set alpha channel
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(noiseFrame);
  }

  noiseFrame();
}
function App() {
  useEffect(() => {
  startNoise();
}, []);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3,
      smooth: true,
    });

    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
    <canvas id="noiseCanvas" className="noise-bg" />
      <Preloader />
      <Routes>
        <Route path="/" element={<MainPagesLayout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
      <div style={{width: "100vw", height: "300vh"}}></div>
    </>
  );
}

export default App;
