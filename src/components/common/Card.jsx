import { useState } from 'react';
import clsx from 'clsx';
import MessageModal from './MessageModal';

const Card = ({ message, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(message);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(
          'bg-white rounded-16 p-16 cursor-pointer',
          'hover:shadow-lg transition-shadow duration-200',
          'border border-gray-200'
        )}
        onClick={handleCardClick}
      >
        {/* 카드 헤더 */}
        <div className={clsx('flex items-center gap-12 mb-12')}>
          {/* 프로필 이미지 */}
          <div className={clsx('w-32 h-32 rounded-full overflow-hidden bg-gray-200')}>
            {message?.profileImageURL ? (
              <img
                src={message.profileImageURL}
                alt={message.sender}
                className={clsx('w-full h-full object-cover')}
              />
            ) : (
              <div className={clsx('w-full h-full bg-gray-300 flex items-center justify-center')}>
                <span className={clsx('text-gray-600 text-12')}>
                  {message?.sender?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>

          <div className={clsx('flex-1')}>
            <div className={clsx('text-14 font-semibold text-gray-800')}>
              From. {message?.sender || '익명'}
            </div>
            
            {message?.relationship && (
              <div
                className={clsx(
                  'inline-flex items-center px-6 py-2 rounded-full text-10 font-medium mt-2',
                  {
                    'bg-orange-100 text-orange-600': message.relationship === '지인',
                    'bg-purple-100 text-purple-600': message.relationship === '동료',
                    'bg-green-100 text-green-600': message.relationship === '가족',
                    'bg-blue-100 text-blue-600': message.relationship === '친구',
                  }
                )}
              >
                {message.relationship}
              </div>
            )}
          </div>

          <div className={clsx('text-12 text-gray-500')}>
            {message?.createdAt 
              ? new Date(message.createdAt).toLocaleDateString('ko-KR', {
                  month: '2-digit',
                  day: '2-digit',
                }).replace(/\./g, '.').replace(/\s/g, '')
              : '07.08'
            }
          </div>
        </div>

        {/* 메시지 미리보기 */}
        <div className={clsx('text-12 text-gray-600 line-clamp-2')}>
          {message?.content ? 
            message.content.length > 50 
              ? `${message.content.substring(0, 50)}...` 
              : message.content
            : '코로나가 또다시 기승을 부리는 요즘이네요...'
          }
        </div>
      </div>

      {/* 메시지 상세 모달 */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message={message}
      />
    </>
  );
};

export default Card;

