import { useState } from 'react';
import Header from './components/common/Header';
import ColorSelection from './components/common/ColorSelector/ColorSelection';
import BadgeSelector from './components/common/Badge/BadgeSelector';
import BadgeSelected from './components/common/Badge/BadgeSelected';
import Button from './components/common/Button';
import { IconPlus, IconArrow } from './components/common/Icons';

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
      <div>
        <h2>버튼 테스트입니다</h2>
        <Button variant='primary' size='40' state='enabled' icon=''>
          Primary
        </Button>
        <Button variant='secondary' size='36' state='enabled' icon=''>
          secondary
        </Button>
        <Button variant='outlined' size='32' state='enabled' icon=''>
          outlined
        </Button>
        <Button
          variant='circle'
          size='56'
          state='enabled'
          icon={<IconPlus size='28' />}
        />
        <Button
          variant='arrow'
          state='enabled'
          icon={<IconArrow size='28' />}
        />
      </div>
    </div>
  );
}

export default App;
