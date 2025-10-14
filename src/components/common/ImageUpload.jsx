import { useRef, useState, useEffect } from "react";

const ImageUploader = () => {
  const fileInputRef = useRef(null);      // 파일 input DOM 참조
  const [selectedImage, setSelectedImage] = useState(null); // 실제 파일
  const [previewUrl, setPreviewUrl] = useState(null);       // 미리보기 URL

  // 파일 변경 시 실행
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  // 버튼 클릭으로 파일 input 열기
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 선택된 이미지가 바뀔 때마다 previewUrl 생성
  useEffect(() => {
    if (!selectedImage) return;

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    // cleanup: 메모리 해제
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow"
      >
        이미지 업로드
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {previewUrl && (
        <div className="w-64 h-40 rounded-lg overflow-hidden border">
          <img
            src={previewUrl}
            alt="미리보기"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;