//import { useState } from 'react';
import Header from '../components/common/Header';
import PostHeader from '../components/common/postHeader/PostHeader';
import CommentCard from '../components/CommentCard';

function PostDashBoard() {
  return (
    <div className='min-h-screen'>
      <Header />
      <PostHeader />
      <div className='w-screen py-110 bg-orange-200'>
        <div className='w-1200 mx-auto grid grid-cols-3 gap-24 bg-green-400'>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
          <CommentCard comment={"테스트테스트테스트테스트"}></CommentCard>
        </div>
      </div>
    </div>
  );
}

export default PostDashBoard;
