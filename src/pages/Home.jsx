import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

export default function Home() {
  return (
    <>
      {/* 공용 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className='mt-50 flex flex-col items-center gap-30'>
        {/* 첫 번째 섹션 */}
        <section className='relative w-[1200px] h-[324px] rounded-[16px] bg-[#F6F8FF] p-10 flex flex-col justify-center'>
          {/* 왼쪽 텍스트 */}
          <div className='ml-50'>
            <h1 className='mb-20 bg-purple-600 text-white w-[80px] h-[32px] rounded-[50px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] flex items-center justify-center gap-[10px] font-[Pretendard] font-bold text-[14px] leading-[20px] tracking-[-0.005em]'>
              Point. 01
            </h1>
            <p className='font-bold text-[24px] leading-[36px] tracking-[-0.01em] mb-2'>
              누구나 손쉽게, 온라인 <br /> 롤링 페이퍼를 만들 수 있어요
            </p>
            <p className='mb-30 mt-10  text-gray-500 text-[18px] leading-[28px]'>
              로그인 없이 자유롭게 만들어요.
            </p>

            {/* 오른쪽 이미지 */}
            <img
              src='/images/banner1.png'
              alt='배너'
              className='absolute top-[60px] right-[10px] w-[720px] h-[204px]'
            />
          </div>
        </section>

        {/* 두 번째 섹션 */}
        <section className='mb-10 relative w-[1200px] h-[324px] rounded-[16px] bg-[#F6F8FF] p-10 flex flex-col justify-center'>
          {/* 왼쪽 이미지 */}
          <img
            src='/images/banner2.png'
            alt='배너2'
            className='absolute top-[70px] left-[-10px] w-[720px] h-[204px]'
          />

          {/* 오른쪽 텍스트 */}
          <div className='ml-auto mr-170'>
            <h1 className='mb-20 bg-purple-600 text-white w-[80px] h-[32px] rounded-[50px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] flex items-center justify-center gap-[10px] font-[Pretendard] font-bold text-[14px] leading-[20px] tracking-[-0.005em]'>
              Point. 02
            </h1>
            <p className='font-bold text-[24px] leading-[36px] tracking-[-0.01em] mb-2'>
              서로에게 이모지로 감정을 <br /> 표현해보세요
            </p>
            <p className='mb-30 mt-10 text-gray-500 text-[18px] leading-[28px]'>
              롤링 페이퍼에 이모지를 추가할 수 있어요.
            </p>
          </div>
        </section>
      </main>

      {/* 하단 버튼 */}
      <div className='mt-20 mb-40 flex justify-center'>
        <Link to='/list'>
          <button className='w-[280px] h-[56px] bg-purple-600 hover:bg-purple-700 text-white rounded-[12px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] flex items-center justify-center gap-[10px] opacity-100 left-[461px] font-[Pretendard] font-medium text-[18px] leading-[28px] tracking-[-0.01em] text-center cursor-pointer'>
            구경해보기
          </button>
        </Link>
      </div>
    </>
  );
}
