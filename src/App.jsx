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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer32 = new Uint32Array(imageData.data.buffer);

  function noiseFrame() {
    for (let i = 0; i < buffer32.length; i++) {
      const gray = Math.random() * 255 | 0;
      buffer32[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function loop() {
    noiseFrame();
    requestAnimationFrame(loop);
  }

  loop();
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
