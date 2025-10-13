import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import PostHeader from '../components/common/postHeader/PostHeader';
import CommentCard from '../components/CommentCard';
import Button from '../components/common/buttons/Button';

function PostDashBoard() {
  return (
    <div className='min-h-screen'>
      <Header />
      <PostHeader />
      {/* 전체 배경 */}
      <div className='w-screen py-110 bg-orange-200'>
        {/* 컨텐츠 너비랩 */}
        <div className='w-1200 mx-auto'>
          {/* 버튼 영역 */}
          <div className='w-full mb-10 bg-blue-400 flex justify-end'>
            <Link to='/post/message'>
              {/* 링크 루트에 id값 추가 필요 */}
              <Button variant='primary' size='40' state='enabled' icon=''>
                생성하기
              </Button>
            </Link>
          </div>
          {/* 카드 영역 */}
          <div className='w-full grid grid-cols-3 gap-24 bg-green-400'>
            <CommentCard comment={'데이터 연결전입니다'}></CommentCard>
            <CommentCard
              comment={'임시로 이렇게 테스트 텍스트 넣어봄'}
            ></CommentCard>
            <CommentCard comment={'테스트테스트테스트테스트'}></CommentCard>
            <CommentCard comment={'테스트테스트테스트테스트'}></CommentCard>
            <CommentCard comment={'테스트테스트테스트테스트'}></CommentCard>
            <CommentCard comment={'테스트테스트테스트테스트'}></CommentCard>
            <CommentCard comment={'테스트테스트테스트테스트'}></CommentCard>
            <CommentCard comment={'테스트테스트테스트테스트'}></CommentCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDashBoard;
