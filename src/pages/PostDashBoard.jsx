import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import PostHeader from '../components/common/postHeader/PostHeader';
import CommentCard from '../components/CommentCard';
import Button from '../components/common/buttons/Button';
import { getRecipients } from '../api/recipients';

function PostDashBoard() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipients() {
      try {
        const data = await getRecipients();
        setRecipients(data.results); // API 결과의 results 배열 사용
      } catch (error) {
        console.error('Failed to fetch recipients:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipients();
  }, []);

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
          {loading ? (
            <p>로딩 중...</p>
          ) : (
            <div className='w-full grid grid-cols-3 gap-24 bg-green-400'>
              {recipients.map((recipient) => (
                <CommentCard
                  key={recipient.id}
                  avatarSrc={
                    recipient.recentMessages[0]?.profileImageURL ||
                    recipient.backgroundImageURL ||
                    'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png'
                  }
                  name={recipient.name}
                  relation={recipient.recentMessages[0]?.relationship || '친구'}
                  comment={
                    recipient.recentMessages[0]?.content || '메시지가 없습니다'
                  }
                  date={
                    recipient.recentMessages[0]
                      ? new Date(recipient.recentMessages[0].createdAt).toLocaleDateString()
                      : new Date(recipient.createdAt).toLocaleDateString()
                  }
                  onDelete={() => console.log('삭제 기능 구현 필요')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDashBoard;
