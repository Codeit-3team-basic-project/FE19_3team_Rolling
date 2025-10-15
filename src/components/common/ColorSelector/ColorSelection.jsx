import { useState } from 'react';
import clsx from 'clsx';

const ColorSelection = ({ selected, onChange }) => {
  const colors = [
    { id: 'orange', name: '오렌지', value: '#ffe2ad' },
    { id: 'purple', name: '퍼플', value: '#ecd9ff' },
    { id: 'blue', name: '블루', value: '#b1e4ff' },
    { id: 'green', name: '그린', value: '#d0f5c3' },
  ];

  const [selectedColor, setSelectedColor] = useState(selected);

  const handleColorChange = colorId => {
    setSelectedColor(colorId);
    const selectedColorData = colors.find(color => color.id === colorId);
    onChange && onChange(selectedColorData); // 색상 객체 전체를 부모 컴포넌트에 전달
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
              '': selectedColor === color.id,
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
