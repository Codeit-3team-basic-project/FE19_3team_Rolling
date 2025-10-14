import Header from '../components/common/Header';
import Dropdown from '../components/common/dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = 'https://rolling-api.vercel.app';
const TEAM = '19-3';
const ID = 13971; // 테스트 하려고 임시로 설정한 ID입니다. ID는 받아서 유동적으로 처리될 예정입니다.

const RELATIONS = ['지인', '친구', '동료', '가족'];
const FONTS = ['Noto Sans', 'Pretendard', 'Poppins']; // Font 모음입니다.

function PostMessage() {
  const [imageArr, setImageArr] = useState([]);
  const [sender, setSender] = useState('');
  const [senderFocus, setSenderFocus] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png'
  );
  const [relationship, setRelationship] = useState('지인');
  const [content, setContent] = useState('');
  const [font, setFont] = useState('Noto Sans');

  const navigate = useNavigate();

  let nameCondition = sender === '' && senderFocus;
  let buttonCondition = sender === '' || content === ''; // sender와 content에 내용이 있어야만 버튼 활성화됩니다.

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

      navigate(`/post/${ID}`);
    } catch (err) {
      throw new Error(`Post Error ${err}`);
    }
  };

  const changeSender = e => {
    setSender(e.target.value);
    setSenderFocus(true);
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
            onChange={changeSender}
            className='py-12 px-16 border-1 border-solid border-gray-300 rounded-lg'
            placeholder='이름을 입력해 주세요.'
          ></input>
          {nameCondition && (
            <div className='text-red-600 text-12 font-regular'>
              값을 입력해 주세요.
            </div>
          )}
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
        <div className='flex flex-col gap-12'>
          <label className='text-24 font-bold'>상대와의 관계</label>
          <Dropdown options={RELATIONS} onSelect={setRelationship} />
          {/* 종인님 뱃지 프로필 받아와야함 */}
        </div>
        <div className='flex gap-12 flex-col'>
          <label className='text-24 font-bold'>내용을 입력해 주세요</label>
          <textarea
            className='text-16 w-full h-243 px-16 py-12 border-1 border-gray-300 rounded-xl'
            onChange={e => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='text-24 font-bold'>폰트 선택</label>
          <Dropdown options={FONTS} onSelect={setFont} />
        </div>
      </div>
      <button
        onClick={handleClick}
        className='cursor-pointer flex w-720 mx-auto my-62 px-24 py-14 rounded-xl bg-purple-600 hover:bg-purple-900 disabled:bg-gray-400 disabled:cursor-default text-18 text-white justify-center'
        disabled={buttonCondition}
      >
        생성하기
      </button>
    </div>
  );
}

export default PostMessage;
