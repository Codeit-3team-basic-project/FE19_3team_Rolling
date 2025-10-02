import Header from '../components/common/Header';

function PostMessage() {
  return (
    <div>
      <Header isDisplayed={false} />
      <div className='flex flex-col w-720 mx-auto my-47 gap-50'>
        <div className='flex flex-col gap-8'>
          <label className='text-24 font-bold'>From.</label>
          <input
            type='text'
            className='py-12 px-16 border-1 border-solid border-gray-300 rounded-lg'
            placeholder='이름을 입력해 주세요.'
          ></input>
        </div>
        <div>
          <label className='text-24 font-bold'>프로필 이미지</label>
        </div>
        <div>
          <label className='text-24 font-bold'>상대와의 관계</label>
        </div>
        <div>
          <label className='text-24 font-bold'>내용을 입력해 주세요</label>
        </div>
        <div>
          <label className='text-24 font-bold'>폰트 선택</label>
        </div>
      </div>
    </div>
  );
}

export default PostMessage;
