"use client";

import { TestService } from "@/config/apis";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [posts, setPosts] = useState<TestResponse.GetPosts>();
  const [getAllPosts, setGetAllPosts] = useState<TestResponse.GetPosts[]>();
  const [postPosts, setPostPosts] = useState<TestResponse.GetPosts>();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     // 포스트 상세 조회
  //     const response = await TestService().getPosts({ id: 1 }, { userId: 1 });
  //     setPosts(response);
  //   };

  //   const fetchAllPosts = async () => {
  //     // 포스트 전체 조회
  //     const response = await TestService().getAllPosts();
  //     setGetAllPosts(response);
  //   };

  //   const postPosts = async () => {
  //     // 포스트 생성
  //     const response = await TestService().postPosts({
  //       title: "test123",
  //       body: "test123",
  //       userId: 1,
  //     });
  //     setPostPosts(response);
  //   };

  //   fetchPosts();
  //   fetchAllPosts();
  //   postPosts();
  // }, []);

  return (
    <div>
      <h1>Test</h1>
      <div>{posts?.title}</div>
      {getAllPosts?.map((post) => <div key={post.id}>{post.title}</div>)}
      <div>{postPosts?.title}</div>
    </div>
  );
}
