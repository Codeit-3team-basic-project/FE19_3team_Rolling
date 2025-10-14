import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import PostHeader from '../components/common/postHeader/PostHeader';
import CommentCard from '../components/CommentCard';
import Button from '../components/common/buttons/Button';
import MessageModal from '../components/common/Modal';

function PostDashBoard() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [_recipient, setRecipient] = useState();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(
          `https://rolling-api.vercel.app/19-3/recipients/${id}/messages/`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const data = await res.json();
        setMessages(data.results);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    }

    async function getRecipient() {
      try {
        const res = await fetch(
          `https://rolling-api.vercel.app/19-3/recipients/${id}/`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const data = await res.json();
        setRecipient(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    }

    fetchMessages();
    getRecipient();
  }, [id]);

  // 삭제 함수
  const handleDelete = async messageId => {
    try {
      await fetch(
        `https://rolling-api.vercel.app/19-3/messages/${messageId}/`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        }
      );
      alert(`삭제 성공!`);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
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

      <div
        className='w-screen min-h-[calc(100vh-130px)] py-110'
        style={{ backgroundColor: 'white' }}
      >
        <div className='w-1200 mx-auto'>
          <div className='w-full mb-10 flex justify-end'>
            <Link to='/post/:id/message'>
              <Button variant='primary' size='40' state='enabled'>
                생성하기
              </Button>
            </Link>
          </div>

          {loading ? (
            <p>로딩 중...</p>
          ) : (
            <div className='w-full grid grid-cols-3 gap-24'>
              {messages.map(Messages => {
                const message = Messages;
                return (
                  <div
                    key={Messages.id}
                    onClick={() => handleOpenModal(message)}
                  >
                    <CommentCard
                      avatarSrc={
                        message?.profileImageURL ||
                        Messages.backgroundImageURL ||
                        'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png'
                      }
                      name={message?.sender || '익명'}
                      relation={message?.relationship || '지인'}
                      comment={message?.content || '메시지가 없습니다'}
                      date={
                        message
                          ? new Date(Messages.createdAt).toLocaleDateString()
                          : new Date(Messages.createdAt).toLocaleDateString()
                      }
                      onDelete={() => handleDelete(Messages.id)}
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
