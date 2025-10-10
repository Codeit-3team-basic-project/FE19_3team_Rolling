// 롤링 서비스 모든 페이지에 적용되는 헤더입니다.
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [_makeRoll, _setMakeRoll] = useState(false);

  // 추후에 생성 페이지로 이동하는 코드 작성 예정.
  const handleOnClick = () => {
    return;
  };

  return (
    <div className='bg-white text-black border-b-1 border-solid border-b-gray-200'>
      <div className='flex items-center justify-between max-w-1200 mx-auto py-11 text-20'>
        <Link to='/' className='flex gap-8 cursor-pointer'>
          <img src='./rolling.svg' className='size-28' alt='rolling' />
          <span className='poppins-bold'>Rolling</span>
        </Link>
        <div>
          <button
            disabled={_makeRoll}
            onClick={handleOnClick}
            className='cursor-pointer border-1 text-16 border-gray-300 rounded-md px-16 py-8 hover:bg-gray-200'
          >
            롤링 페이퍼 만들기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
