import { useState } from 'react';
import Button from './Button';

export default function ToggleButtonGroup() {
  const [selected, setSelected] = useState('color'); // 현재 선택된 버튼 상태

  return (
    <div>
      {/* 컬러 버튼 */}
      <Button
        variant='secondary'
        size='40'
        state={selected === 'color' ? 'enabled' : 'focus'}
        onClick={() => setSelected('color')}
      >
        컬러
      </Button>

      {/* 이미지 버튼 */}
      <Button
        variant='secondary'
        size='40'
        state={selected === 'image' ? 'enabled' : 'focus'}
        onClick={() => setSelected('image')}
      >
        이미지
      </Button>
    </div>
  );
}
