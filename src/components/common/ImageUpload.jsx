import { useState, useRef, useEffect } from "react";

export default function ImageUpload({ onChange, selected, onImageSelect }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const fileInputRef = useRef(null);

  // selected prop이 변경될 때 상태 업데이트
  useEffect(() => {
    if (selected && Array.isArray(selected)) {
      setSelectedImages(selected);
    }
  }, [selected]);

  // 파일 선택 핸들러 (다중 선택)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    if (imageFiles.length === 0) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 기존 이미지들과 새 이미지들 합치기
    const newImages = [...selectedImages, ...imageFiles];
    setSelectedImages(newImages);
    onChange && onChange(newImages); // 상위 컴포넌트로 전달
  };

  // 미리보기 URL 생성
  useEffect(() => {
    // 새 URL들 생성
    const newUrls = selectedImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // cleanup 함수
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

  // 개별 이미지 삭제 핸들러
  const handleRemoveImage = (indexToRemove) => {
    const newImages = selectedImages.filter((_, index) => index !== indexToRemove);
    setSelectedImages(newImages);
    onChange && onChange(newImages);
    
    // 선택된 이미지가 삭제되면 선택 해제
    if (selectedImageIndex === indexToRemove) {
      setSelectedImageIndex(null);
      onImageSelect && onImageSelect(null);
    } else if (selectedImageIndex > indexToRemove) {
      // 선택된 이미지 인덱스 조정
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // 이미지 선택 핸들러
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    const selectedImage = selectedImages[index];
    onImageSelect && onImageSelect(selectedImage);
  };

  return (
    <div className="space-y-4">

      {previewUrls.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative flex-shrink-0">
              <div
                onClick={() => handleImageClick(index)}
                className={`cursor-pointer transition-transform duration-200 ${
                  selectedImageIndex === index 
                    ? '' 
                    : 'hover:scale-105'
                }`}
              >
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className="w-168 h-168 object-cover rounded-lg shadow-md"
                />
                {/* 선택 표시 */}
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-opacity-20  flex items-center justify-center">
                    <div className="w-25 h-25 rounded-full flex items-center justify-center">
                      <img 
                        src="/src/assets/imgs/Enabled.png" 
                        alt="선택됨" 
                        className="w-25 h-25"
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-gray-800 p-1 rounded-full transition-colors hover:bg-gray-400"
              >
                <img 
                  src="/src/assets/imgs/toastImages/close.png" 
                  alt="삭제" 
                  className="w-25 h-25"
                />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-168 h-168 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400 mb-12">
          미리보기 없음
        </div>
      )}

      {/* 파일 선택 버튼 */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-200"
      >
        이미지 선택
      </button>
    </div>
  );
}