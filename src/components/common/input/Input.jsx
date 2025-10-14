import { useState } from 'react';

function Input({ value, onChange, className, ...props }) {
  const [showError, setShowError] = useState(false);

  const handleChange = e => {
    onChange(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowError(false);
    }
  };

  const handleOutSide = () => {
    if (value.trim() === '') {
      setShowError(true);
    }
  };

  return (
    <div className={className || 'w-full max-w-md'}>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        onBlur={handleOutSide}
        placeholder='받는 사람 이름을 입력해 주세요'
        className={`w-full px-[18px] py-[10px] border-1 rounded-lg focus:outline-none font-regular ${
          showError
            ? 'border-error'
            : 'border-gray-300 hover:border-gray-500 focus:border-gray-700'
        }`}
        {...props}
      />
      {showError && (
        <p className='mt-2 text-sm text-error'>내용을 입력해 주세요</p>
      )}
    </div>
  );
}

export default Input;
