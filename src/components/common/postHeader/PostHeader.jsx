// Post 페이지에 적용되는 헤더입니다.
import { useState, useRef, useEffect } from 'react';
import ShareDropdown from './ShareDropdown';
import EmojiDropdown from './EmojiDropdown';
import EmojiPickerz from '../EmojiPickerz';

const URL = 'https://rolling-api.vercel.app';
const TEAM = '19-3';

// PostHeader는 앞으로 ID를 props를 설정하셔야합니다.
// Post 페이지에서 받은 id 값을 프롭스로 집어 넣으시면 되겠습니다.
function PostHeader({ ID = 13971 }) {
  const currentUrl = window.location.href;
  const menuRef = useRef();
  const [name, setName] = useState('Undefined');
  const [peopleCount, setPeopleCount] = useState(0);
  const [topReactions, setTopReactions] = useState([]);
  const [emojiDrop, setEmojiDrop] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [shareDrop, setShareDrop] = useState(false);

  // URL 공유 기능 추가, alert는 toast로 비뀔 예정입니다.
  const shareUrl = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => alert('Url 복사 완료'))
      .catch(() => alert('복사 실패!'));
  };

  useEffect(() => {
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('aca6605f6026e2a9fbe224a6bc9adfd9');
    }
  }, []);

  const shareKakao = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로딩되지 않았습니다.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `To. ${name}`,
        description: `${peopleCount}명이 작성했어요!`,
        imageUrl:
          'https://static.vecteezy.com/system/resources/thumbnails/002/375/040/small_2x/modern-white-background-free-vector.jpg',
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '롤링페이퍼 보러가기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });

    alert('카카오톡 공유 성공~');
  };

  // ID 값에 따라 반응 리스트를 새로 갖고옴.
  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch(`${URL}/${TEAM}/recipients/${ID}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Get Error`);
        }

        const data = await res.json();
        setName(data.name);
        setPeopleCount(data.messageCount);
        setTopReactions(data.topReactions);
      } catch (e) {
        // 예외 처리 방법
        if (e instanceof Error) {
          throw new Error(`HTTP error! status: ${e.message}`);
        }
        throw new Error('Unknown Error');
      }
    };
    fetchEmojis();
  }, [ID]);

  // 드롭다운 박스 열린 상태에서 외부 클릭하면 사라지는 함수.
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setEmojiDrop(false);
        setEmojiPicker(false);
        setShareDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // cleanup
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
          <div className='flex gap-11 border-r-1 border-solid border-r-gray-200 pr-28'>
            <div></div>
            <div>
              <span className='font-bold'>{peopleCount}</span>명이 작성했어요!
            </div>
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
                  <EmojiDropdown ID={ID} />
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
                  <EmojiPickerz ID={ID} />
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
                <ShareDropdown
                  onShareKakao={shareKakao}
                  onShareUrl={shareUrl}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
