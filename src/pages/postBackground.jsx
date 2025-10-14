import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Input from "../components/common/input/Input";
import Button from "../components/common/buttons/Button";
import ToggleButtonGroup from "../components/common/buttons/ToggleButtonGroup";
import ColorSelection from "../components/common/ColorSelector/ColorSelection";
import ImageUpload from "../components/common/ImageUpload";
import { createRecipient } from "../api/recipients";

function PostBackground() {
  const navigate = useNavigate();
  
  const [recipientName, setRecipientName] = useState("");
  const [selectedTab, setSelectedTab] = useState("color"); // color | image
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]); // 배열로 변경
  const [selectedSingleImage, setSelectedSingleImage] = useState(null); // 선택된 단일 이미지
  

  const [backgroundData, setBackgroundData] = useState({
    backgroundColor: 'orange200', // API enum 기본값
    backgroundImageURL: null,
  });
  const [loading, setLoading] = useState(false);

  // ColorSelection에서 호출할 컬러 선택 핸들러
  const handleColorSelect = useCallback((colorData) => {
    setSelectedColor(colorData.id);
    setBackgroundData({
      backgroundColor: colorData.id, // colorId 사용
      backgroundImageURL: null, // 컬러 선택 시 이미지는 null
    });
  }, []);



  // 이미지 배열 변경 핸들러
  const handleImagesChange = useCallback((images) => {
    setSelectedImages(images);
  }, []);

  // 단일 이미지 선택 핸들러
  const handleSingleImageSelect = useCallback((image) => {
    setSelectedSingleImage(image);
    setBackgroundData({
      backgroundColor: 'orange200', // 이미지 선택 시 기본 컬러
      backgroundImageURL: image,
    });
  }, []);

  // 생성하기 버튼 클릭 핸들러
  const handleGenerate = async () => {
    if (!recipientName) {
      alert("받는 사람 이름을 입력해 주세요.");
      return;
    }

    // 실제 선택 검증
    const hasBackground = selectedTab === 'color'
      ? selectedColor !== null // 컬러 탭에서 컬러가 선택되었는지 확인
      : selectedSingleImage !== null; // 이미지 탭에서 이미지가 선택되었는지 확인

    if (!hasBackground) {
      alert("배경을 선택해 주세요.");
      return;
    }

    setLoading(true);

    try {
      // API 호출을 위한 데이터 준비
      const newRecipientData = {
        name: recipientName,
        backgroundColor: backgroundData.backgroundColor || "orange200", // 기본값 설정
        backgroundImageURL: backgroundData.backgroundImageURL,
      };

      console.log("API 호출 데이터:", newRecipientData);

      // API 호출
      const res = await createRecipient(newRecipientData);
      const newPostId = res.id;
      
      console.log("생성 성공:", res);
      alert("롤링 페이퍼가 성공적으로 생성되었습니다!");
      
      // 성공 후 페이지 이동
      navigate(`/post/${newPostId}`);
      
    } catch (err) {
      console.error('글 생성 실패', err);
      alert("글 생성 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header isDisplayed={false} />

        <div className="flex items-center justify-center p-4 mt-[45px]">
          <div className="w-[720px] bg-white">
            {/* To 입력 */}
            
           <div className="space-y-2 w-[720px]">
            <form 
              onSubmit={(e) => {
                e.preventDefault(); 
                handleGenerate();  
              }} 
              className="flex flex-col gap-2 w-full"
            >
              <label 
                htmlFor="To" 
                className="block text-[24px] font-semibold text-gray-900 mb-12"
              >
                To.
              </label>
              
               <Input
                 id="To"
                 value={recipientName}
                 onChange={setRecipientName}
                 placeholder="받는 사람 이름을 입력해 주세요"
                 name="recipientName"
                 className="w-full"
                 style={{ width: '720px' }}
               />

            </form>
          </div>

            {/* 배경 선택 */}
            <div className="space-y-4 mt-[50px]">
              <div>
                <h2 className="font-semibold text-gray-900 mb-10" style={{ fontSize: '24px' }}>
                  배경화면을 선택해 주세요.
                </h2>
                  <p className="text-gray-600 mb-10" style={{ fontSize: '16px' }}>
                    컬러를 선택하거나, 이미지를 선택할 수 있습니다.
                  </p>
              </div>

              {/* 탭 버튼 */}
              <div className="w-[244px] h-[40px] flex mt-[25px] mb-[62px]">
                <button
                  onClick={() => setSelectedTab("color")}
                  className={`w-[122px] h-[40px] rounded-md border text-[16px] transition-all duration-200 ${
                    selectedTab === "color" ? "font-bold" : "font-regular"
                  }`}
                  style={{
                    backgroundColor: selectedTab === "color" ? "#ffffff" : "#eeeeee",
                    color: selectedTab === "color" ? "#9935ff" : "#181818",
                    borderColor: selectedTab === "color" ? "#861dee" : "transparent",
                    borderWidth: selectedTab === "color" ? "2px" : "1px"
                  }}
                >
                  컬러
                </button>
                <button
                  onClick={() => setSelectedTab("image")}
                  className={`w-[122px] h-[40px] rounded-md border text-[16px] transition-all duration-200 ${
                    selectedTab === "image" ? "font-bold" : "font-regular"
                  }`}
                  style={{
                    backgroundColor: selectedTab === "image" ? "#ffffff" : "#eeeeee",
                    color: selectedTab === "image" ? "#9935ff" : "#181818",
                    borderColor: selectedTab === "image" ? "#861dee" : "transparent",
                    borderWidth: selectedTab === "image" ? "2px" : "1px"
                  }}
                >
                  이미지
                </button>
              </div>

                {/* 컬러 선택 */}
                {selectedTab === "color" && (
                  <div className="pt-4">
                    <ColorSelection
                      selected={selectedColor}
                      onChange={handleColorSelect}
                    />
                  </div>
                )}

                {/* 이미지 선택 */}
                {selectedTab === "image" && (
                  <div className="pt-4">
                    <ImageUpload
                      selected={selectedImages}
                      onImageSelect={handleSingleImageSelect}
                      onChange={handleImagesChange}
                    />
                  </div>
                )}
            </div>

            {/* 생성 버튼 */}
            <div className="mt-40">
              <Button
                size="56"
                variant="primary"
                onClick={handleGenerate}
                className="w-[720px] h-[56px] px-[24px] py-[14px] text-center flex items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "#9935ff",
                  color: "#ffffff",
                  borderRadius: "12px",
                  fontSize: "18px"
                }}
                disabled={loading}
              >
                {loading ? "생성 중..." : "생성하기"}
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default PostBackground;
