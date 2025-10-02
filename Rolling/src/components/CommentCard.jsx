import { useEffect, useRef, useState } from "react";

export default function CommentCard({
  avatarSrc,
  name,
  relation,
  comment,
  date,
  onDelete = () => {},
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight;
      setShowMoreButton(isOverflowing);
    }
  }, [comment]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`w-[384px] rounded-2xl border border-purple-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-26 opacity-100 relative top-5 left-[31px] flex flex-col ${
      isExpanded ? 'h-auto min-h-[280px]' : 'h-[280px]'
    }`}>
      {/* 삭제 버튼 */}
        <button
          onClick={onDelete}
          className="absolute w-[40px] h-[40px] rounded-md border border-gray-200 p-2 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-100"
          style={{ top: '28px', left: '320px' }}
          title="삭제"
        >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3,6 5,6 21,6"></polyline>
          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
      
      {/* 아바타 + 이름 */}
      <div className="flex items-center gap-16">
        <img
          src={avatarSrc}
          alt={`${name} 프로필 이미지`}
          className="w-56 h-56 rounded-full object-cover ring-2 ring-white"
          loading="lazy"
        />
        <div className="flex flex-col gap-4">
          <p className="text-black-700 text-base">
            <span className="text-black-400 font-pretendard font-light text-xl leading-6 tracking-[0%]">From.</span>{" "}
            <span className="font-pretendard font-bold text-[20px] leading-6 tracking-[0%]">{name}</span>
          </p>
          <span className="w-[41px] h-[20px] rounded px-2 font-pretendard font-normal text-[14px] leading-5 tracking-[-0.005em] bg-purple-100 text-purple-600 opacity-100 flex items-center justify-center">
            {relation}
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="mx-10 mb-10 mt-16 h-px bg-purple-100"  />

      {/* 코멘트 */}
      <div 
        ref={textRef}
        className={`font-pretendard font-normal text-[18px] leading-[28px] tracking-[-0.01em] text-gray-500 relative ${
          !isExpanded ? 'max-h-[120px] overflow-hidden' : 'max-h-none'
        }`}
      >
        <p>
          {comment.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < comment.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
        
        {/* 그라데이션 오버레이 - 확장되지 않았고 더보기 버튼이 있을 때만 */}
        {!isExpanded && showMoreButton && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
        )}
        
        {/* 더보기/접기 버튼 - 오버플로우가 있을 때만 */}
        {showMoreButton && (
          <button 
            onClick={toggleExpanded}
            className="absolute bottom-0 right-2 text-xs text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* 날짜 */}
      <p className="mt-auto text-sm text-zinc-400">{date}</p>
    </div>
  );
}