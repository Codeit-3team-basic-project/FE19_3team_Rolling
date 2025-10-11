// Post 페이지에 적용되는 헤더입니다.
import { useState, useRef, useEffect } from 'react';
import ShareDropdown from './ShareDropdown';
import EmojiDropdown from './EmojiDropdown';
import EmojiPickerz from '../EmojiPickerz';
import 'emoji-picker-element';

const URL = 'https://rolling-api.vercel.app';
const TEAM = '19-3'; // 우리팀 데이터는 없어서 테스트용도로 임시로 다른 팀꺼로 설정했습니다. 나중에는 URL에 19-3이 추가될 예정.
const ID = 13971; // 테스트 하려고 임시로 설정한 ID입니다. ID는 받아서 유동적으로 처리될 예정입니다.

function PostHeader() {
  const menuRef = useRef();
  const [name, setName] = useState('Undefined');
  const [peopleCount, setPeopleCount] = useState(0);
  const [topReactions, setTopReactions] = useState([]);
  const [emojiDrop, setEmojiDrop] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [shareDrop, setShareDrop] = useState(false);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch(`${URL}/${TEAM}/recipients/${ID}/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        const data = await res.json();
        setName(data.name);
        setPeopleCount(data.messageCount);
        setTopReactions(data.topReactions);
      } catch (e) {
        throw new Error(`HTTP error! status: ${e}`);
      }
    };
    fetchEmojis();
  }, []);

  // 드롭다운 박스 열린 상태에서 외부 클릭하면 사라지는 함수.
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setEmojiDrop(false);
        setEmojiPicker(false);
        setShareDrop(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div
      className='bg-white text-black border-b-1 border-solid border-b-gray-200'
      ref={menuRef}
    >
      <div className='flex items-center justify-between max-w-1200 mx-auto py-11 text-18'>
        <div className='text-28 text-gray-800 font-bold'>To. {name}</div>
        <div className='flex items-center'>
          <div className='border-r-1 border-solid border-r-gray-200 pr-28'>
            <span className='font-bold'>{peopleCount}</span>명이 작성했어요!
          </div>
          <div className='flex pl-28 items-center border-r-1 border-solid border-r-gray-200 pr-13'>
            <div className='flex gap-8'>
              {topReactions.map((emo, emoIndex) => (
                <button
                  key={emoIndex}
                  className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'
                >
                  <div>{emo.emoji}</div>
                  <div>{emo.count}</div>
                </button>
              ))}
            </div>
            <div className='px-8 relative'>
              <button
                onClick={() => {
                  setEmojiDrop(emojiDrop => !emojiDrop);
                }}
                className='flex items-center cursor-pointer'
              >
                <div className='w-36 h-36 bg-[url(../../../arrow_down.svg)] bg-cover bg-no-repeat bg-center'></div>
              </button>
              {emojiDrop && (
                <div className='absolute top-full right-0'>
                  <EmojiDropdown />
                </div>
              )}
            </div>
            <div className='relative'>
              <button
                onClick={() => {
                  setEmojiPicker(emojiPicker => !emojiPicker);
                }}
                className='flex gap-4 px-16 py-6 border-1 border-solid border-gray-300 hover:bg-gray-200 rounded-md text-16'
              >
                <div className='w-24 h-24 bg-[url(../../../add-24.svg)] bg-cover bg-no-repeat bg-center'></div>
                <div>추가</div>
              </button>
              {emojiPicker && (
                <div className='absolute top-full right-0'>
                  <EmojiPickerz />
                </div>
              )}
            </div>
          </div>
          <div className='pl-13 relative inline-block'>
            <button
              onClick={() => {
                setShareDrop(shareDrop => !shareDrop);
              }}
              className='flex cursor-pointer gap-10 px-16 py-6 border-solid border-1 border-gray-300 hover:bg-gray-200 rounded-md'
            >
              <div className='w-24 h-24 bg-[url(../../../share-24.svg)] bg-cover bg-no-repeat bg-center'></div>
            </button>
            {shareDrop && (
              <div className='absolute top-full'>
                <ShareDropdown />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
