import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateReaction, getReactions } from '../api/recipients';

export default function Card({
  id,
  name,
  avatars,
  participants,
  reactions,
  background,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${id}`);
  };
  return (
    <div
      onClick={handleCardClick}
      className='w-[275px] h-[260px] rounded-2xl p-4 relative border border-black/10 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-lg transition-shadow'
      style={{ backgroundColor: background }}
    >
      <h3 className='text-gray-900 mt-20 ml-10 font-pretendard font-bold text-2xl leading-[36px] tracking-[-0.01em] mb-3'>
        {/* 이름 */}
        To. {name}
      </h3>

      {/* 아바타 프로필 목록 */}
      <div className='mt-14 ml-10 flex flex-row flex-wrap items-center gap-12'>
        <AvatarStack avatars={avatars} />
      </div>

      {/* 참여자 수 표시 */}
      <div className='mt-10 ml-10 flex items-center gap-2 w-[125px] h-[26px] opacity-100'>
        <p className='text-gray-700 font-pretendard text-base leading-[26px] tracking-[-0.01em]'>
          <span className='font-bold'>{participants}</span>
          명이 작성했어요!
        </p>
      </div>

      {/* 구분선 */}
      <div className='mt-50 mx-auto w-[227px] h-px bg-black/10'></div>

      {/* 반응 목록 */}
      <div className='mt-14 flex justify-center'>
        <ReactionList id={id} reactions={reactions} />
      </div>
    </div>
  );
}

function AvatarStack({ avatars = [] }) {
  const visible = avatars.slice(0, 3); // 최대 3개만
  const extra = avatars.length - visible.length;

  return (
    <div className='flex -space-x-8'>
      {visible.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`avatar-${i}`}
          className={`w-28 h-28 rounded-full object-cover ring-2 ring-white ${
            i ? '-ml-2' : ''
          }`}
        />
      ))}
      {extra > 0 && (
        <span className='bg-white w-[33px] h-[28px] rounded-[30px] py-[5px] px-[6px] flex items-center justify-center opacity-100 ring-2 ring-white font-pretendard font-normal text-s leading-[18px] tracking-[-0.005em]'>
          <span className='text-gray-500 text-sm'>+{extra}</span>
        </span>
      )}
    </div>
  );
}

function ReactionList({ id, reactions = [] }) {
  const defaultReactions = [
    { emoji: '👍', count: 0 },
    { emoji: '🎉', count: 0 },
    { emoji: '❤️', count: 0 }
  ];

  const [reactionCounts, setReactionCounts] = useState(
    reactions?.length > 0 ? reactions : defaultReactions
  );

  // reactions가 변경될 때만 상태 업데이트
  useEffect(() => {
    if (reactions?.length > 0) {
      setReactionCounts(reactions);
    }
  }, [reactions]);

  const handleClick = async (index) => {
    try {
      // 로컬 상태 먼저 업데이트
      const newReactions = [...reactionCounts];
      newReactions[index] = {
        ...newReactions[index],
        count: (newReactions[index].count || 0) + 1
      };
      setReactionCounts(newReactions);

      // API 호출로 서버 업데이트
      await updateReaction(id, {
        emoji: newReactions[index].emoji,
        count: newReactions[index].count
      });

      // 최신 데이터 가져오기
      const updatedReactions = await getReactions(id);
      if (updatedReactions?.length > 0) {
        setReactionCounts(updatedReactions);
      }
    } catch (error) {
      console.error('리액션 업데이트 실패:', error);
      // 에러 발생 시 이전 상태로 복구
      if (reactions?.length > 0) {
        setReactionCounts(reactions);
      }
    }
  };

  return (
    <div className='flex gap-6 mt-4'>
      {reactionCounts.map((r, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.stopPropagation();  // 이벤트 전파 중단
            handleClick(i);
          }}
          className='inline-flex items-center justify-center gap-2 w-[65px] h-[36px] rounded-[32px] opacity-100 bg-black/50 text-sm hover:bg-gray-300 transition'
        >
          {/* 이모지 */}
          <span className='text-[16px] leading-[20px]'>{r.emoji}</span>

          {/* 카운트 */}
          <span
            className='text-white w-[17px] h-[20px] 
    font-pretendard font-normal text-[16px] leading-[20px] tracking-[0]
    opacity-100'
          >
            {r.count}
          </span>
        </button>
      ))}
    </div>
  );
}
