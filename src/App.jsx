import React, { useState } from 'react';
import { gardenContent } from './data/content';
import BackgroundDetails from './components/BackgroundDetails';
import WelcomeScene from './components/WelcomeScene';
import BouquetScene from './components/BouquetScene';

export function App() {
  // Scene state: 'welcome' or 'bouquet'
  const [currentScene, setCurrentScene] = useState('welcome');
  const [isFading, setIsFading] = useState(false);

  const handleDiscover = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentScene('bouquet');
      setIsFading(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 450);
  };

  return (
    <div className="relative min-h-screen bg-garden-bg text-garden-text-main flex flex-col justify-between selection:bg-garden-muted-sage/30 selection:text-garden-deep-green">
      {/* Editorial framing, paper grain, intimate header & music controller */}
      <BackgroundDetails headerData={gardenContent.header} />

      {/* Main Interactive Stage with Silky Scene Crossfade */}
      <main
        className={`flex-1 flex flex-col justify-center relative z-20 transition-opacity duration-500 ease-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentScene === 'welcome' ? (
          <WelcomeScene
            welcomeData={gardenContent.welcome}
            onDiscover={handleDiscover}
          />
        ) : (
          <BouquetScene
            bouquetData={gardenContent.bouquet}
            secretData={gardenContent.secret}
            signatureData={gardenContent.signature}
          />
        )}
      </main>
    </div>
  );
}

export default App;
