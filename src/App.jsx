import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import PostHeader from './components/common/postHeader/PostHeader';
import Home from './pages/Home.jsx';
import List from './pages/List.jsx';
// import './App.css'

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route
          path='/post'
          element={
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
                    onClick={() => setCount(count + 1)}
                    className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    메시지 모달 테스트
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}
