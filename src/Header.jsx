// 롤링 서비스 모든 페이지에 적용되는 헤더입니다.
import { useState } from 'react';
import clsx from 'clsx';

function Header() {
  const [_makeRoll, _setMakeRoll] = useState(false);

  // 추후에 생성 페이지로 이동하는 코드 작성 예정.
  const handleOnClick = () => {
    return;
  };

  return (
    <div
      className={clsx(
        'bg-white text-black border-b border-solid border-gray-200'
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-between max-w-1200 mx-auto py-11 text-20'
        )}
      >
        <div className={clsx('flex gap-8 cursor-pointer')}>
          <img src='./rolling.svg' className={clsx('size-28')} alt='rolling' />
          <a href='https://www.google.com' className={clsx('poppins-bold')}>
            Rolling
          </a>
        </div>
        <div>
          <button
            disabled={_makeRoll}
            onClick={handleOnClick}
            className={clsx(
              'cursor-pointer border text-16 border-gray-300 rounded-md px-16 py-8',
              'transition-colors duration-200',
              {
                'hover:bg-gray-200': !_makeRoll,
                'bg-gray-100 cursor-not-allowed opacity-50': _makeRoll,
              }
            )}
          >
            롤링 페이퍼 만들기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
