import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Lessons } from './pages/Lessons';
import { WorldMap } from './pages/WorldMap';
import { Game } from './pages/Game';
import { DailyWord } from './pages/DailyWord';
import { Medals } from './pages/Medals';
import { FinalReview } from './pages/FinalReview';
import { AdultPanel } from './pages/AdultPanel';
import { useFullscreen } from './hooks/useFullscreen';
import { Maximize, Minimize, AlertCircle } from 'lucide-react';
import { Button } from './components/ui';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Check orientation
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 font-sans selection:bg-sky-200 flex flex-col relative overflow-hidden">
      {/* Landscape Warning for Tablets/Mobiles */}
      {!isPortrait && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center text-white p-8 text-center md:hidden">
          <AlertCircle className="w-20 h-20 mb-4 text-amber-400" />
          <h2 className="text-3xl font-bold mb-2">¡Gira la tablet!</h2>
          <p className="text-xl">Para jugar mejor, pon la tablet en vertical.</p>
        </div>
      )}

      {/* Top Bar */}
      <header className="p-4 flex justify-between items-center z-10 sticky top-0 bg-sky-50/80 backdrop-blur-sm">
        {!isHome ? (
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-xl">
            ← Volver
          </Button>
        ) : <div />}
        <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="bg-white/50 rounded-full">
          {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-0 flex flex-col items-center w-full">
        <div className="w-full max-w-[834px] mx-auto px-4 pb-10 flex-1 flex flex-col">
          {children}
        </div>
      </main>

      {/* Ambient background decoration */}
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/map" element={<WorldMap />} />
          <Route path="/game/:worldId" element={<Game />} />
          <Route path="/daily" element={<DailyWord />} />
          <Route path="/medals" element={<Medals />} />
          <Route path="/review" element={<FinalReview />} />
          <Route path="/adults" element={<AdultPanel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
