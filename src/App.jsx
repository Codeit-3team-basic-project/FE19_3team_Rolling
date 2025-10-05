import { useState } from 'react';
import Header from './Header';
import ColorSelection from './components/common/ColorSelection';
import BadgeSelector from './components/common/BadgeSelector';
import BadgeSelected from './components/common/BadgeSelected';

function App() {
  const [selectedColor, setSelectedColor] = useState('orange');
  const [selectedBadge, setSelectedBadge] = useState(null);

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
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>배지 선택:</h3>
            <BadgeSelector
              selected={selectedBadge}
              onSelectionChange={setSelectedBadge}
            />

            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>선택된 배지:</h3>
              <div className='flex flex-wrap gap-2'>
                {selectedBadge ? (
                  <BadgeSelected selectedId={selectedBadge} />
                ) : (
                  <span className='text-gray-500'>배지를 선택해주세요</span>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
