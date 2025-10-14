import { useState, useRef, useEffect } from 'react';

// Dropdown 공통 컴포넌트
function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState(options[0] || '');

  const dropdownRef = useRef(null);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleSelect(option) {
    setSelectedValue(option);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className='relative w-[500px]'>
      {/* 클릭하는 버튼 */}
      <button
        onClick={toggleDropdown}
        className='w-288 px-16 py-12 border-1 border-gray-300 rounded-lg text-16 flex justify-between items-center cursor-pointer'
      >
        <span className='text-gray-500'>{selectedValue}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* 아래로 나오는 목록 */}
      {isOpen && (
        <ul
          className='dropdown-list absolute w-288 left-0 right-0 mt-2 border-1 border-gray-300 rounded-lg overflow-y-auto z-50 list-none p-0 m-0'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {options.map((option, index) => {
            const isSelected = selectedValue === option;
            const isLastItem = index === options.length - 1;

            return (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`
                  px-16 py-12 cursor-pointer 
                  ${isLastItem ? '' : 'border-b border-gray-200'}
                  ${isSelected ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}
                `}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
