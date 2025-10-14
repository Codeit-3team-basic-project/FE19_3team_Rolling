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
        <Route path='/post/:id' element={<PostDashBoard />} />
        <Route path='/post/:id/message' element={<PostMessage />} />
      </Routes>
    </Router>
  );
}
