"use client";
import { PostService } from "@/config/apis";
import React, { useEffect } from "react";

const ViewIncrement = ({ postId }: { postId: string }) => {
  useEffect(() => {
    PostService().viewIncrement({ post_id: postId });
  }, [postId]);
  return <></>;
};

export default ViewIncrement;
