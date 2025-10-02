import { useState } from 'react';
import Header from './Header';
import ColorSelection from './components/common/ColorSelection';
import BadgeSelector from './components/common/Badge';

function App() {
  const [selectedColor, setSelectedColor] = useState('orange');

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />

      <div className='max-w-4xl mx-auto p-8 space-y-8'>
        <section className='bg-white rounded-lg p-6 shadow-md'>
          <div className='space-y-4'>
            <ColorSelection
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>
        </section>
        {/* 브라우저에서 실험 */}

        <section className='bg-white rounded-lg p-6 shadow-md'>
          <div>
            <BadgeSelector selected={null} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
