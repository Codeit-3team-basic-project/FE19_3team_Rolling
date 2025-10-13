import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import PostDashBoard from './pages/PostDashBoard';
import PostMessage from './pages/PostMessage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/post' element={<PostDashBoard />} />
        {/* path에 ID 추가 필요 */}
        <Route path='/post/message' element={<PostMessage />} />
      </Routes>
    </Router>
  );
}
