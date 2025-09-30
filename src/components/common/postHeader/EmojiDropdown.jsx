// PostHeader 컴포넌트 중 ^ 버튼을 누르면 나오는 이모지 드롭다운 메뉴입니다.
// 이모지 배열방식은 추후에 변경하겠습니다.

function EmojiDropdown() {
  return (
    <div className='absolute flex gap-10 top-120 right-550 flex-col p-24 border-1 border-gray-300 rounded-md z-10 bg-white'>
      <div className='flex gap-8'>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>1</div>
        </button>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>2</div>
        </button>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>3</div>
        </button>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>4</div>
        </button>
      </div>
      <div className='flex gap-8'>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>5</div>
        </button>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>6</div>
        </button>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>7</div>
        </button>
        <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
          <div>😂</div>
          <div>8</div>
        </button>
      </div>
    </div>
  );
}

export default EmojiDropdown;
