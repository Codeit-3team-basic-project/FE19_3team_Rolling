import Button from './Button';

export default function ToggleButtonGroup({ selected, onSelectionChange }) {
  return (
    <div className="flex gap-2">
      {/* 컬러 버튼 */}
      <Button
        variant={selected === 'color' ? 'secondary' : 'outlined'}
        size='40'
        onClick={() => onSelectionChange('color')}
        className="flex-1"
      >
        컬러
      </Button>

      {/* 이미지 버튼 */}
      <Button
        variant={selected === 'image' ? 'secondary' : 'outlined'}
        size='40'
        onClick={() => onSelectionChange('image')}
        className="flex-1"
      >
        이미지
      </Button>
    </div>
  );
}
