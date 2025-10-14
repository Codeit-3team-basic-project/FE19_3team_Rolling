import { useState } from "react";
import Header from "../components/common/Header";
import Input from "../components/common/input/Input";
import Button from "../components/common/buttons/Button";
import ColorSelection from "../components/common/ColorSelector/ColorSelection";
import ImageUpload from "../components/common/ImageUpload";

function PostBackground() {
  const [recipientName, setRecipientName] = useState("");
  const [selectedTab, setSelectedTab] = useState("color"); // color | image
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // 생성하기 버튼 클릭 핸들러
  const handleGenerate = () => {
    const background =
      selectedTab === "color" ? selectedColor : selectedImage;

    console.log("생성하기 클릭:", {
      recipientName,
      background,
    });

    if (!recipientName) {
      alert("받는 사람 이름을 입력해 주세요.");
      return;
    }
    
    if (!background) {
      alert("배경을 선택해 주세요.");
      return;
    }

    //  API 호출 or 다음 페이지 이동 등 로직 추가 
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header isDisplayed={false} />

        <div className="flex items-center justify-center p-4 mt-[45px]">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* To 입력 */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-900">
              To.
            </label>
            <Input
              value={recipientName}
              onChange={setRecipientName}
              placeholder="받는 사람 이름을 입력해 주세요"
            />
          </div>

          {/* 배경 선택 */}
          <div className="space-y-4 mt-[50px]">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                배경화면을 선택해 주세요.
              </h2>
              <p className="text-sm text-gray-600">
                컬러를 선택하거나, 이미지를 선택할 수 있습니다.
              </p>
            </div>

            {/* 탭 버튼 */}
            <div className="flex gap-2">
              <Button
                size="40"
                variant={selectedTab === "color" ? "secondary" : "outlined"}
                onClick={() => setSelectedTab("color")}
                className="flex-1"
              >
                컬러
              </Button>
              <Button
                size="40"
                variant={selectedTab === "image" ? "secondary" : "outlined"}
                onClick={() => setSelectedTab("image")}
                className="flex-1"
              >
                이미지
              </Button>
            </div>

            {/* 컬러 선택 */}
            {selectedTab === "color" && (
              <div className="pt-4">
                <ColorSelection
                  selected={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            )}

            {/* 이미지 선택 */}
            {selectedTab === "image" && (
              <div className="pt-4">
                <ImageUpload
                  selected={selectedImage}
                  onChange={setSelectedImage}
                />
              </div>
            )}
          </div>

          {/* 생성 버튼 */}
          <Button
            size="56"
            variant="primary"
            onClick={handleGenerate}
            className="w-full"
          >
            생성하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostBackground;
