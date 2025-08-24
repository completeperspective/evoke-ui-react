import { useState } from 'react';
import { Button } from '@evoke-ui/react';
import DesignSystemDemo from './pages/DesignSystemDemo';
import TailwindDemo from './pages/TailwindDemo';

type Page = 'design-system' | 'tailwind';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('design-system');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Evoke UI React Test Consumer</h1>
          <div className="flex gap-4">
            <Button
              variant={currentPage === 'design-system' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('design-system')}
            >
              Design System CSS (22KB)
            </Button>
            <Button
              variant={currentPage === 'tailwind' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('tailwind')}
            >
              Full Tailwind CSS v4
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentPage === 'design-system' && <DesignSystemDemo />}
        {currentPage === 'tailwind' && <TailwindDemo />}
      </main>

      {/* Footer */}
      <footer className="bg-background mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 text-center">
            Testing @evoke-ui/react package build configuration • Version: 0.1.0 • React:{' '}
            {currentPage === 'design-system' ? 'styles.css only' : 'styles.css + Tailwind CSS v4'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
