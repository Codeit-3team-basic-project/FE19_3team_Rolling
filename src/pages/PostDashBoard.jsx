import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import PostHeader from '../components/common/postHeader/PostHeader';
import CommentCard from '../components/CommentCard';
import Button from '../components/common/buttons/Button';
import { getRecipients, deleteRecipient } from '../api/recipients';
import MessageModal from '../components/common/Modal';

function PostDashBoard() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    async function fetchRecipients() {
      try {
        const data = await getRecipients();
        setRecipients(data.results);
      } catch (error) {
        console.error('Failed to fetch recipients:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipients();
  }, []);

  // 삭제 함수
  const handleDelete = async id => {
    try {
      await deleteRecipient(id);
      setRecipients(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('삭제 중 오류:', error);
    }
  };

  // 모달 열기
  const handleOpenModal = message => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className='min-h-screen'>
      <Header />
      <PostHeader />

      <div className='w-screen min-h-[calc(100vh-130px)] py-110 bg-orange-200'>
        <div className='w-1200 mx-auto'>
          <div className='w-full mb-10 flex justify-end'>
            <Link to='/post/message'>
              <Button variant='primary' size='40' state='enabled'>
                생성하기
              </Button>
            </Link>
          </div>

          {loading ? (
            <p>로딩 중...</p>
          ) : (
            <div className='w-full grid grid-cols-3 gap-24'>
              {recipients.map(recipient => {
                const message = recipient.recentMessages[0];
                return (
                  <div
                    key={recipient.id}
                    onClick={() => handleOpenModal(message)}
                  >
                    <CommentCard
                      avatarSrc={
                        message?.profileImageURL ||
                        recipient.backgroundImageURL ||
                        'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png'
                      }
                      name={recipient.name}
                      relation={message?.relationship || '친구'}
                      comment={message?.content || '메시지가 없습니다'}
                      date={
                        message
                          ? new Date(message.createdAt).toLocaleDateString()
                          : new Date(recipient.createdAt).toLocaleDateString()
                      }
                      onDelete={() => handleDelete(recipient.id)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 모달 연결 */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={selectedMessage}
      />
    </div>
  );
}

export default PostDashBoard;
