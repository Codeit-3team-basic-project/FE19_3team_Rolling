import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipients } from '../api/recipients';
import Card from '../components/Card';
import Header from '../components/common/Header';

export default function List() {
  const [cards, setCards] = useState([]); // 카드 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  // ✅ API 호출
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getRecipients();

        // API 응답 구조에 맞게 데이터 변환
        const transformedData = data.results.map(item => ({
          id: item.id,
          name: item.name,
          avatars: item.recentMessages?.map(msg => msg.profileImageURL) || [],
          participants: item.messageCount,
          reactions: item.topReactions || [],
          backgroundColor: item.backgroundColor,
        }));

        setCards(transformedData);
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
        setError(err.message);
        // 에러 발생 시 빈 배열로 설정하여 빈 화면 대신 기본 UI 표시
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const [popularCurrentIndex, setPopularCurrentIndex] = useState(0);
  const [recentCurrentIndex, setRecentCurrentIndex] = useState(0);

  const cardsPerPage = 4;

  // API에서 받은 데이터를 인기/최근으로 분류
  const popularCards = cards.filter(card => {
    // 인기 기준: 반응 수가 많은 카드들
    const totalReactions =
      card.reactions?.reduce((sum, r) => sum + r.count, 0) || 0;
    return totalReactions > 5 || card.participants > 10;
  });

  const recentCards = cards.filter(card => {
    // 최근 기준: 인기가 아닌 나머지 카드들
    const totalReactions =
      card.reactions?.reduce((sum, r) => sum + r.count, 0) || 0;
    return totalReactions <= 5 && card.participants <= 10;
  });

  const popularTotalPages = Math.ceil(popularCards.length / cardsPerPage);
  const recentTotalPages = Math.ceil(recentCards.length / cardsPerPage);

  const getCurrentCards = (cards, currentIndex) => {
    return cards.slice(
      currentIndex * cardsPerPage,
      (currentIndex + 1) * cardsPerPage
    );
  };

  const nextSlide = (setCurrentIndex, totalPages) => {
    setCurrentIndex(prev => (prev + 1) % totalPages);
  };

  const prevSlide = (setCurrentIndex, totalPages) => {
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
  };
  if (loading) return <div className='text-center mt-20'>로딩 중...</div>;

  return (
    <>
      {/* 공용 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className='mt-70 flex flex-col items-center gap-70'>
        {error && (
          <div className='text-center text-red-500 mb-4'>
            ⚠️ 데이터 로딩 중 오류가 발생했습니다: {error}
          </div>
        )}
        <section className='relative w-[1160px] h-[260px] p-10 flex flex-col justify-center overflow-visible'>
          <h1 className='mb-10 font-[Pretendard] font-bold text-[24px] leading-[36px] tracking-[-0.01em]'>
            인기 롤링 페이퍼🔥
          </h1>
          <div className='relative w-full'>
            <ul className='grid grid-cols-4 gap-6 transition-transform duration-300 ease-in-out'>
              {popularCards.length > 0 ? (
                getCurrentCards(popularCards, popularCurrentIndex).map(c => (
                  <li key={c.id}>
                    <Card
                      name={c.name}
                      avatars={c.avatars}
                      participants={c.participants}
                      reactions={c.reactions}
                      background={c.backgroundColor}
                    />
                  </li>
                ))
              ) : (
                <li className='col-span-4 text-center text-gray-500 py-8'>
                  인기 롤링 페이퍼가 없습니다.
                </li>
              )}
            </ul>

            {/* 이전/다음 버튼 */}
            {popularTotalPages > 1 && (
              <>
                <button
                  onClick={() =>
                    prevSlide(setPopularCurrentIndex, popularTotalPages)
                  }
                  className='absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-50 border border-gray-200'
                >
                  <svg
                    className='w-5 h-5 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    nextSlide(setPopularCurrentIndex, popularTotalPages)
                  }
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-50 border border-gray-200'
                >
                  <svg
                    className='w-5 h-5 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </section>
        <section className='mt-10 relative w-[1160px] h-[260px] p-10 flex flex-col justify-center'>
          <h1 className='mb-10 font-[Pretendard] font-bold text-[24px] leading-[36px] tracking-[-0.01em]'>
            최근 만든 롤링 페이퍼⭐️
          </h1>
          <div className='relative'>
            <ul className='grid grid-cols-4 gap-6 transition-transform duration-300 ease-in-out'>
              {recentCards.length > 0 ? (
                getCurrentCards(recentCards, recentCurrentIndex).map(c => (
                  <li key={c.id}>
                    <Card
                      name={c.name}
                      avatars={c.avatars}
                      participants={c.participants}
                      reactions={c.reactions}
                      background={c.backgroundColor}
                    />
                  </li>
                ))
              ) : (
                <li className='mt-70 col-span-4 text-center text-gray-500 py-8'>
                  최근 롤링 페이퍼가 없습니다.
                </li>
              )}
            </ul>

            {/* 이전/다음 버튼 */}
            {recentTotalPages > 1 && (
              <>
                <button
                  onClick={() =>
                    prevSlide(setRecentCurrentIndex, recentTotalPages)
                  }
                  className='absolute left-[-50px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors'
                >
                  <svg
                    className='w-5 h-5 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    nextSlide(setRecentCurrentIndex, recentTotalPages)
                  }
                  className='absolute right-[-50px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors'
                >
                  <svg
                    className='w-5 h-5 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </section>
      </main>
      {/* 하단 버튼 */}
      <div className='mt-70 mb-40 flex justify-center'>
        <Link to='/post'>
          <button className='w-[280px] h-[56px] bg-purple-600 hover:bg-purple-700 text-white rounded-[12px] pt-[14px] pr-[24px] pb-[14px] pl-[24px] flex items-center justify-center  opacity-100 left-[461px] font-[Pretendard] font-medium text-[18px] leading-[28px] tracking-[-0.01em] text-center cursor-pointer'>
            나도 만들어보기
          </button>
        </Link>
      </div>
    </>
  );
}
