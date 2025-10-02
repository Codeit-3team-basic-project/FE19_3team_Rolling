import { useEffect, useState } from "react";
import Card from "../components/Card";
import CommentCard from "../components/CommentCard";
import Header from "../components/common/Header";

export default function Home() {
  const [comments, setComments] = useState([]);

  // API에서 댓글 데이터 가져오기
  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        // 실제 API 호출 예시
        // const response = await fetch('/api/comments/1');
        // const data = await response.json();
        // setCommentData(data);
        
        // 임시 데이터 (실제로는 API에서 받아옴)
        const mockComments = [
          {
            id: 1,
            name: "홍독이",
            relation: "친구",
            comment: "프로젝트 축하해!ㄹㄹㄹㄹㄹㄹㄹㄹ 정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ정신머리도ㄹㅇㄹㅇㄹㅇㄹ 정신머리도ㄹㄹ 정신머리도ㄹㄹ 정신머리도ㄹㄹ 정신머리도ㄹㄹ 정신머리도 꼭 커밋하길 바라!",
            date: "1997.02.16",
            avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces"
          },
      
        ];
        setComments(mockComments);
      } catch (error) {
        console.error('댓글 데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchCommentData();
  }, []);

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      <Header />
      
      <p>여기는 홈 화면입니다.</p>
      <Card />
      
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
