import { useState } from 'react';
import Header from './Header';
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
    </div>
  );
}

export default App;
