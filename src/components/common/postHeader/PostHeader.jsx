// Post 페이지에 적용되는 헤더입니다.
import { useState } from 'react';
import ShareDropdown from './ShareDropdown';
import EmojiDropdown from './EmojiDropdown';
import EmojiPicker from 'emoji-picker-react';

function PostHeader() {
  const [name, _setName] = useState('Ashley Kim');
  const [peopleCount, _setPeopleCount] = useState(0);
  const [emojiDrop, setEmojiDrop] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [shareDrop, setShareDrop] = useState(false);

  const handleEmojiClick = () => {
    setEmojiDrop(emojiDrop => !emojiDrop);
  };

  const handleEmojiPicker = () => {
    setEmojiPicker(emojiPicker => !emojiPicker);
  };

  const handleShareClick = () => {
    setShareDrop(shareDrop => !shareDrop);
  };

  return (
    <div className='bg-white text-black border-b-1 border-solid border-b-gray-200'>
      <div className='flex items-center justify-between max-w-1200 mx-auto py-11 text-18'>
        <div className='text-28 text-gray-800 font-bold'>To. {name}</div>
        <div className='flex items-center'>
          <div className='border-r-1 border-solid border-r-gray-200 pr-28'>
            <span className='font-bold'>{peopleCount}</span>명이 작성했어요!
          </div>
          <div className='flex pl-28 items-center border-r-1 border-solid border-r-gray-200 pr-13'>
            <div className='flex gap-8'>
              <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
                <div>😂</div>
                <div>1</div>
              </button>
              <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
                <div>😎</div>
                <div>20</div>
              </button>
              <button className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'>
                <div>👍</div>
                <div>30</div>
              </button>
            </div>
            <div className='px-8'>
              <button
                onClick={handleEmojiClick}
                className='flex relative items-center cursor-pointer'
              >
                <div className='w-36 h-36 bg-[url(../../../arrow_down.svg)] bg-cover bg-no-repeat bg-center'></div>
              </button>
              {emojiDrop && <EmojiDropdown />}
            </div>
            <button
              onClick={handleEmojiPicker}
              className='flex relative gap-4 px-16 py-6 border-1 border-solid border-gray-300 hover:bg-gray-200 rounded-md text-16'
            >
              <div className='w-24 h-24 bg-[url(../../../add-24.svg)] bg-cover bg-no-repeat bg-center'></div>
              <div>추가</div>
            </button>
            {emojiPicker && (
              <div className='absolute top-120 right-300'>
                <EmojiPicker />
              </div>
            )}
          </div>
          <div className='pl-13'>
            <button
              onClick={handleShareClick}
              className='flex cursor-pointer gap-10 px-16 py-6 border-solid border-1 border-gray-300 hover:bg-gray-200 rounded-md'
            >
              <div className='w-24 h-24 bg-[url(../../../share-24.svg)] bg-cover bg-no-repeat bg-center'></div>
            </button>
            {shareDrop && <ShareDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
