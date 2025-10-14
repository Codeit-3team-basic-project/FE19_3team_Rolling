// Toast.jsx
import { useEffect } from 'react';
import clsx from 'clsx';

export default function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2000); // 2초 뒤 자동 사라짐
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={clsx(
        'fixed bottom-8 left-1/2 -translate-x-1/2',
        'w-[524px] h-[64px] flex items-center justify-between',
        'px-5 bg-black text-white rounded-lg shadow-lg',
        'transition-all duration-500 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5 pointer-events-none'
      )}
    >
      {message}
    </div>
  );
}
