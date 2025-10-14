import Header from '../components/common/Header';
import Dropdown from '../components/common/dropdown/Dropdown';
import { useEffect, useState } from 'react';

const URL = 'https://rolling-api.vercel.app';
const TEAM = '19-3';
const ID = 13971; // 테스트 하려고 임시로 설정한 ID입니다. ID는 받아서 유동적으로 처리될 예정입니다.

const FONTS = ['Noto Sans', 'Pretendard', 'Poppins']; // Font 모음입니다.

function PostMessage() {
  const [imageArr, setImageArr] = useState([]);
  const [sender, setSender] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png'
  );
  const [relationship, _setRelationship] = useState('지인');
  const [content, _setContent] = useState('');
  const [font, setFont] = useState('Noto Sans');

  let condition = sender === '' || content === ''; // sender와 content에 내용이 있어야만 버튼 활성화됩니다.

  // UseEffect 이용해서 처음부터 프로필 이미지 받아오기.
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${URL}/profile-images/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        const data = await res.json();
        setImageArr(data.imageUrls);
      } catch (err) {
        throw new Error(`Profile loading error: ${err}`);
      }
    };
    fetchImages();
  }, []);

  // 메세지 생성 함수.
  const handleClick = async e => {
    e.preventDefault();
    const postData = {
      team: TEAM,
      recipientId: ID,
      sender,
      profileImageURL: profileImage,
      relationship,
      content,
      font,
    };

    try {
      fetch(`${URL}/${TEAM}/recipients/${ID}/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
    } catch (err) {
      throw new Error(`Post Error ${err}`);
    }
  };

  return (
    <div>
      <Header isDisplayed={false} />
      <div className='flex flex-col w-720 mx-auto my-47 gap-50'>
        <div className='flex flex-col gap-8'>
          <label className='text-24 font-bold'>From.</label>
          <input
            type='text'
            value={sender}
            onChange={e => setSender(e.target.value)}
            className='py-12 px-16 border-1 border-solid border-gray-300 rounded-lg'
            placeholder='이름을 입력해 주세요.'
          ></input>
        </div>
        <div className='flex gap-12 flex-col'>
          <label className='text-24 font-bold'>프로필 이미지</label>
          <div className='flex gap-32'>
            <div className='flex items-center'>
              <div
                className='round w-80 h-80 bg-cover bg-no-repeat bg-center'
                style={{ backgroundImage: `url(${profileImage})` }}
              ></div>
            </div>
            <div className='flex gap-12 flex-col'>
              <div className='font-regular text-16 text-gray-500'>
                프로필 이미지를 선택해주세요!
              </div>
              <div>
                {imageArr.map((image, index) => {
                  return (
                    <button
                      key={index}
                      className='cursor-pointer w-56 h-56 round bg-cover bg-no-repeat bg-center mr-4'
                      style={{ backgroundImage: `url(${image})` }}
                      onClick={() => setProfileImage(image)}
                    ></button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className='text-24 font-bold'>상대와의 관계</label>
          {/* 종인님 뱃지 프로필 받아와야함 */}
        </div>
        <div>
          <label className='text-24 font-bold'>내용을 입력해 주세요</label>
          {/* 지원님 텍스트 에디터 받아와야함 */}
        </div>
        <div className='flex flex-col gap-12'>
          <label className='text-24 font-bold'>폰트 선택</label>
          <Dropdown options={FONTS} onSelect={setFont} />
        </div>
      </div>
      <button
        onClick={handleClick}
        className='cursor-pointer flex w-720 mx-auto my-62 px-24 py-14 rounded-xl bg-purple-600 disabled:bg-gray-400 text-18 text-white justify-center'
        disabled={condition}
      >
        생성하기
      </button>
      {/* 수빈님 버튼 받아와야함 일단 임시로 내가 만듬 */}
    </div>
  );
}

export default PostMessage;
