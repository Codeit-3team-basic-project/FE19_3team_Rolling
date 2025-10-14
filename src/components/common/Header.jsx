// 롤링 서비스 모든 페이지에 적용되는 헤더입니다.
import { Link } from 'react-router-dom';
import RollingIcon from '../../../public/rolling.svg';
function Header({ isDisplayed = true }) {
  return (
    <div className='bg-white text-black border-b border-solid border-gray-200'>
      <div className='flex items-center justify-between max-w-1200 mx-auto py-11 text-20'>
        <Link to='/' className='flex gap-8 cursor-pointer'>
          <img src={RollingIcon} className='size-28' alt='rolling' />
          <span className='poppins-bold'>Rolling</span>
        </Link>
        <div>
          {isDisplayed && (
            <Link to='/post'>
              <button className='cursor-pointer border-1 text-16 border-gray-300 rounded-md px-16 py-8 hover:bg-gray-200'>
                내 롤링 페이퍼 보기
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
