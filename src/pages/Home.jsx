import { useEffect, useState } from 'react';
import Card from '../components/Card';
import CommentCard from '../components/CommentCard';
import Header from '../components/common/Header';

export default function Home() {
  const [comments, setComments] = useState([]);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const mockComments = [
          {
            id: 1,
            name: '홍독이',
            relation: '친구',
            comment:
              '프로젝트 축하해!ㄹㄹㄹㄹㄹㄹㄹㄹ 정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ 정신머리도ㄹㄹ 정신머리도ㄹㄹ 정신머리도ㄹㄹ 정신머리도ㄹㄹ 정신머리도 꼭 커밋하길 바라!',
            date: '1997.02.16',
            avatarSrc:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
          },
        ];
        setComments(mockComments);
      } catch (error) {
        console.error('댓글 데이터를 가져오는데 실패했습니다:', error);
      }
    };

    const fetchCardData = async () => {
      try {
        const mockCardData = {
          name: '홍독이',
          avatars: [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
          ],
          participants: 15,
          reactions: [
            { emoji: '👍', count: 8 },
            { emoji: '😍', count: 12 },
            { emoji: '😢', count: 3 },
          ],
        };

        setCardData(mockCardData);
      } catch (error) {
        console.error('카드 데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchCommentData();
    fetchCardData();
  }, []);

  const handleDeleteComment = commentId => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      <Header />

      {cardData ? (
        <Card
          name={cardData.name}
          avatars={cardData.avatars}
          participants={cardData.participants}
          reactions={cardData.reactions}
        />
      ) : (
        <div>카드 로딩 중...</div>
      )}

      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          onDelete={() => handleDeleteComment(comment.id)}
          name={comment.name}
          relation={comment.relation}
          comment={comment.comment}
          date={comment.date}
          avatarSrc={comment.avatarSrc}
        />
      ))}
    </div>
  );
}
