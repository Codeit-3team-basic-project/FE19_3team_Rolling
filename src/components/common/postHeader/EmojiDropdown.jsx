// PostHeader 컴포넌트 중 ^ 버튼을 누르면 나오는 이모지 드롭다운 메뉴입니다.
import { useState, useEffect } from 'react';

const URL = 'https://rolling-api.vercel.app';
const TEAM = '19-3';
const ID = 13971; // 테스트 하려고 임시로 설정한 ID입니다. ID는 받아서 유동적으로 처리될 예정입니다.

function EmojiDropdown() {
  const [emojiList, setEmojiList] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch(`${URL}/${TEAM}/recipients/${ID}/reactions/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        const data = await res.json();
        setEmojiList(data.results);
      } catch (e) {
        throw new Error(`Api get error: ${e}`);
      }
    };
    fetchEmojis();
  }, []);

  const rowArrary = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }

    return result;
  };

  const newArr = rowArrary(emojiList, 4);

  return (
    <div className='flex gap-10 flex-col p-24 border-[1px] border-gray-300 rounded-md z-10 bg-white'>
      {newArr.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-8'>
          {row.map(emo => (
            <button
              key={emo.id}
              className='flex gap-10 cursor-pointer border-1 rounded-4xl px-12 py-8 bg-black/54 hover:bg-gray-500 text-white text-16'
            >
              <div>{emo.emoji}</div>
              <div>{emo.count}</div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default EmojiDropdown;
