import { useState } from 'react';
import clsx from 'clsx';
import Header from '../Header';
import ColorSelection from '../components/common/ColorSelection';
import ImageUpload from '../components/common/ImageUpload';

const PostBackgorund = () => {
  const [recipientName, setRecipientName] = useState('');
  const [backgroundType, setBackgroundType] = useState('color'); // 'color' or 'image'

  return (
    <div className={clsx('min-h-screen bg-white')}>
      <Header />

      <div className={clsx('px-24 py-32')}>
        <div className={clsx('max-w-md mx-auto')}>
          <div className={clsx('mb-32')}>
            <h2 className={clsx('text-18 font-semibold text-gray-800 mb-16')}>
              To.
            </h2>
            <input
              type='text'
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              placeholder='받는 사람 이름을 입력해 주세요'
              className={clsx(
                'w-full px-16 py-12 border border-gray-300 rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                'text-gray-800 placeholder-gray-500 text-16'
              )}
            />
          </div>

          {/* Background */}
          <div className={clsx('mb-32')}>
            <h2 className={clsx('text-18 font-semibold text-gray-800 mb-8')}>
              배경화면을 선택해 주세요.
            </h2>
            <p className={clsx('text-14 text-gray-600 mb-24')}>
              컬러를 선택하거나, 이미지를 선택할 수 있습니다.
            </p>

            {/* 컬러, 이미지 탭 */}
            <div className={clsx('flex mb-24')}>
              <button
                onClick={() => setBackgroundType('color')}
                className={clsx(
                  'flex-1 py-12 px-16 rounded-lg font-medium transition-colors',
                  {
                    'border-2 border-purple-500 text-purple-500 bg-white':
                      backgroundType === 'color',
                    'bg-gray-100 text-gray-600': backgroundType !== 'color',
                  }
                )}
              >
                컬러
              </button>
              <button
                onClick={() => setBackgroundType('image')}
                className={clsx(
                  'flex-1 py-12 px-16 rounded-lg font-medium transition-colors ml-8',
                  {
                    'border-2 border-purple-500 text-purple-500 bg-white':
                      backgroundType === 'image',
                    'bg-gray-100 text-gray-600': backgroundType !== 'image',
                  }
                )}
              >
                이미지
              </button>
            </div>

            {/* 컬러 탭 */}
            {backgroundType === 'color' && <ColorSelection />}

            {/* 이미지 탭 */}
            {backgroundType === 'image' && <ImageUpload />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBackgorund;
