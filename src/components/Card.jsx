import { useEffect, useState } from "react";
export default function Card({
  name,
  avatars,
  participants,
  reactions,
}) {
  return (
    <div className="w-[275px] h-[260px] rounded-2xl bg-purple-200/70 p-4 relative border border-black/10 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)]">
      <h3 className="text-gray-900 mt-20 ml-10 font-pretendard font-bold text-2xl leading-[36px] tracking-[-0.01em] mb-3">
        {/* 이름 */}
        To. {name}
      </h3>

      {/* 아바타 프로필 목록 */}
      <div className="mt-14 ml-10 flex flex-row flex-wrap items-center gap-12">
      <AvatarStack avatars={avatars} />
      </div>

      {/* 참여자 수 표시 */}
      <div className="mt-10 ml-10 flex items-center gap-2 w-[125px] h-[26px] opacity-100">
        <p className="text-gray-700 font-pretendard text-base leading-[26px] tracking-[-0.01em]">
          <span className="font-bold">{participants}</span>
          명이 작성했어요!
        </p>
      </div>

      {/* 구분선 */}
      <div className="mt-50 ml-10 w-[227px] h-px bg-black/10"></div>

      {/* 반응 목록 */}
      <div className=" mt-14 ml-10 ">
        <ReactionList reactions={reactions} />
      </div>
    </div>
  );
}

function AvatarStack({ avatars = [] }) {
  const visible = avatars.slice(0, 3); // 최대 3개만
  const extra = avatars.length - visible.length;

  return (
    <div className="flex -space-x-8">
      {visible.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`avatar-${i}`}
          className={`w-28 h-28 rounded-full object-cover ring-2 ring-white ${
            i ? "-ml-2" : ""
          }`}
        />
      ))}
      {extra > 0 && (
        <span className="bg-white w-[33px] h-[28px] rounded-[30px] py-[5px] px-[6px] flex items-center justify-center opacity-100 ring-2 ring-white font-pretendard font-normal text-s leading-[18px] tracking-[-0.005em]">
         <span className="text-gray-500 text-sm">+{extra}</span>
        </span>
      )}
    </div>
  );
}

function ReactionList({ reactions = [] }) {
  const [reactionCounts, setReactionCounts] = useState(reactions || []);
  
  // reactions가 변경될 때 상태 업데이트
  useEffect(() => {
    if (reactions && reactions.length > 0) {
      setReactionCounts(reactions);
    }
  }, [reactions]);
  
  const handleClick = (index) => {
    const newReactions = [...reactionCounts];
    newReactions[index].count += 1;
    setReactionCounts(newReactions);
  };
  
  if (!reactionCounts || reactionCounts.length === 0) {
    return <div>반응 버튼 로딩 중...</div>;
  }

  return (
    <div className="flex gap-6 mt-4">
      {reactionCounts.map((r, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className="inline-flex items-center justify-center gap-2 w-[65px] h-[36px] rounded-[32px] opacity-100 bg-black/50 text-sm hover:bg-gray-300 transition"
        >
          {/* 이모지 */}
          <span className="text-[16px] leading-[20px]">{r.emoji}</span>

          {/* 카운트 */}
          <span
            className="text-white w-[17px] h-[20px] 
    font-pretendard font-normal text-[16px] leading-[20px] tracking-[0]
    opacity-100"
          >
            {r.count}
          </span>
        </button>
      ))}
    </div>
  );
}
