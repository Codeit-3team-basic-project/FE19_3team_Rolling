// PostHeader 컴포넌트 중 공유 버튼 누르면 나오는 드롭다운 메뉴입니다.
// 공유 관련 기능은 추후에 추가하겠습니다.

function ShareDropdown({ onShareKakao, onShareUrl }) {
  return (
    <ul className='w-150 border-solid border-1 border-gray-300 rounded-md z-10 text-center py-10 bg-white text-black text-16 font-regular'>
      <li
        className='cursor-pointer px-16 py-12 hover:bg-gray-100'
        onClick={onShareKakao}
      >
        카카오톡 공유하기
      </li>
      <li
        className='cursor-pointer px-16 py-12 hover:bg-gray-100'
        onClick={onShareUrl}
      >
        URL 공유하기
      </li>
    </ul>
  );
}

export default ShareDropdown;
