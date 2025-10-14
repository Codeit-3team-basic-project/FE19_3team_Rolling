import { useState } from 'react';
import clsx from 'clsx';

const ColorSelection = () => {
  const colors = [
    { id: 'orange', name: '오렌지', value: 'var(--color-orange-200)' },
    { id: 'purple', name: '퍼플', value: 'var(--color-purple-200)' },
    { id: 'blue', name: '블루', value: 'var(--color-blue-200)' },
    { id: 'green', name: '그린', value: 'var(--color-green-200)' },
  ];

  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = colorId => {
    setSelectedColor(colorId);
  };

  return (
    <div className={clsx('grid grid-cols-4 gap-16')}>
      {colors.map(color => (
        <button
          key={color.id}
          onClick={() => handleColorChange(color.id)}
          className={clsx(
            'w-full aspect-square rounded-lg transition-all duration-200',
            {
              'ring-2 ring-gray-800 ring-offset-2': selectedColor === color.id,
              'hover:scale-105 hover:shadow-md': selectedColor !== color.id,
            }
          )}
          style={{ backgroundColor: color.value }}
          aria-label={`${color.name} 색상 선택`}
        >
          {selectedColor === color.id && (
            <div className='w-full h-full flex items-center justify-center'>
              <img
                src='/src/assets/imgs/Enabled.png'
                alt='선택됨'
                className='w-48 h-48'
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorSelection;
