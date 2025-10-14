import { useState, useRef } from 'react';
import clsx from 'clsx';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const processFiles = files => {
    const validFiles = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target.result;
        setSelectedImages(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            url: imageUrl,
            name: file.name,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = e => {
    processFiles(e.target.files);
  };

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = id => {
    setSelectedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className={clsx('space-y-16')}>
      <div className={clsx('flex gap-8 overflow-x-auto')}>
        {/* 선택된 이미지들 */}
        {selectedImages.map(image => (
          <div
            key={image.id}
            className={clsx(
              'relative flex-shrink-0 w-160 h-160 rounded-lg overflow-hidden border border-gray-200'
            )}
          >
            <img
              src={image.url}
              alt={image.name}
              className={clsx('w-full h-full object-cover')}
            />
            <button
              onClick={() => removeImage(image.id)}
              className={clsx(
                'absolute top-4 right-4 w-24 h-24 bg-red-500 text-white rounded-full',
                'flex items-center justify-center hover:bg-red-600 transition-colors'
              )}
            >
              ×
            </button>
          </div>
        ))}

        {/* 파일 업로드 영역 */}
        <div
          className={clsx(
            'flex-shrink-0 w-160 h-160 border-2 border-dashed rounded-lg',
            'transition-colors cursor-pointer flex items-center justify-center',
            {
              'border-purple-400 bg-purple-50': isDragOver,
              'border-gray-300 hover:border-gray-400': !isDragOver,
            }
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          role='button'
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openFileDialog();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='hidden'
            multiple
          />
          <div className={clsx('text-center')}>
            <div className={clsx('space-y-8')}>
              <img
                src='/src/assets/imgs/Enabled.png'
                alt='이미지 업로드'
                className={clsx('mx-auto h-32 w-32')}
              />
              <p className={clsx('text-12 text-gray-600')}>
                {isDragOver ? '여기에 이미지를 올려주세요' : '이미지 추가'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedImages.length > 0 && (
        <p className={clsx('text-14 text-gray-600')}>
          선택된 이미지: {selectedImages.length}개
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
