import { useState, useEffect } from 'react';
import clsx from 'clsx';

const MessageModal = ({ isOpen, onClose, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200); // 애니메이션 시간과 맞춤
  };

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
        'transition-opacity duration-200',
        {
          'opacity-100': isVisible,
          'opacity-0': !isVisible,
        }
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          'bg-white rounded-16 p-24 mx-16 max-w-md w-full max-h-[80vh]',
          'transform transition-transform duration-200',
          {
            'scale-100': isVisible,
            'scale-95': !isVisible,
          }
        )}
      >
        {/* 헤더 */}
        <div className={clsx('flex items-start justify-between mb-16')}>
          <div className={clsx('flex items-center gap-12')}>
            {/* 프로필 이미지 */}
            <div className={clsx('w-40 h-40 rounded-full overflow-hidden bg-gray-200')}>
              {message?.profileImageURL ? (
                <img
                  src={message.profileImageURL}
                  alt={message.sender}
                  className={clsx('w-full h-full object-cover')}
                />
              ) : (
                <div className={clsx('w-full h-full bg-gray-300 flex items-center justify-center')}>
                  <span className={clsx('text-gray-600 text-14')}>
                    {message?.sender?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>

            <div className={clsx('flex flex-col')}>
              {/* 보내는 사람 */}
              <div className={clsx('text-16 font-semibold text-gray-800')}>
                From. {message?.sender || '익명'}
              </div>
              
              {/* 관계 배지 */}
              {message?.relationship && (
                <div
                  className={clsx(
                    'inline-flex items-center px-8 py-4 rounded-full text-12 font-medium mt-4 w-fit',
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
          </div>

          {/* 날짜 */}
          <div className={clsx('text-14 text-gray-500')}>
            {message?.createdAt 
              ? new Date(message.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).replace(/\./g, '.').replace(/\s/g, '')
              : '2023.07.08'
            }
          </div>
        </div>

        {/* 메시지 내용 */}
        <div className={clsx('mb-24')}>
          <div
            className={clsx(
              'max-h-200 overflow-y-auto text-14 text-gray-800 leading-relaxed',
              'border border-gray-200 rounded-8 p-16'
            )}
            style={{
              fontFamily: message?.font === 'Pretendard' ? 'Pretendard' :
                         message?.font === 'Noto Sans' ? 'Noto Sans' :
                         message?.font === '나눔명조' ? '나눔명조' :
                         message?.font === '나눔손글씨 손편지체' ? '나눔손글씨 손편지체' : 'Pretendard'
            }}
          >
            {message?.content || '코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!'}
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className={clsx('flex justify-center')}>
          <button
            onClick={handleClose}
            className={clsx(
              'w-full py-12 bg-purple-500 text-white font-medium rounded-8',
              'hover:bg-purple-600 transition-colors text-16'
            )}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
