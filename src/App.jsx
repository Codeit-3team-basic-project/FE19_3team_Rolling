import { useState } from 'react';
import Header from './components/common/Header';
import PostHeader from './components/common/postHeader/PostHeader';
import Button from './components/common/button';
import { IconPlus, IconArrow } from './components/common/icons/IconButton';

// import ModalExamples from './components/examples/ModalExamples';
// import MessageModal from './components/examples/MessageModal';

function App() {
  const [_messageModalOpen, setMessageModalOpen] = useState(false);

  const _sampleMessage = {
    profileImage: 'https://via.placeholder.com/40',
    senderName: '홍길동',
    tag: '중요',
    date: '2024-01-15',
    message:
      '안녕하세요! 이것은 테스트 메시지입니다.\n\n새로운 Modal 컴포넌트가 잘 작동하는지 확인해보세요.',
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <PostHeader />
      <div className='container mx-auto py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Modal 컴포넌트 테스트
          </h1>
          <p className='text-gray-600 mb-6'>
            다양한 Modal 사용 예시를 확인해보세요
          </p>
          <button
            onClick={() => setMessageModalOpen(true)}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            메시지 모달 테스트
          </button>
        </div>

        {/* <ModalExamples />

        <MessageModal
          isOpen={messageModalOpen}
          onClose={() => setMessageModalOpen(false)}
          profileImage={sampleMessage.profileImage}
          senderName={sampleMessage.senderName}
          tag={sampleMessage.tag}
          date={sampleMessage.date}
          message={sampleMessage.message}
          onConfirm={() => {
            alert('메시지를 확인했습니다!');
            setMessageModalOpen(false);
          }}
        /> */}
      </div>
      <div>
        <h2>버튼 테스트입니다</h2>
        <Button variant='primary' size='40' state='enabled' icon=''>
          Primary
        </Button>
        <Button variant='secondary' size='36' state='enabled' icon=''>
          secondary
        </Button>
        <Button variant='outlined' size='32' state='enabled' icon=''>
          outlined
        </Button>
        <Button
          variant='circle'
          size='56'
          state='enabled'
          icon={<IconPlus size='28' />}
        />
        <Button
          variant='arrow'
          state='enabled'
          icon={<IconArrow size='28' />}
        />
      </div>
    </div>
  );
}

export default App;
