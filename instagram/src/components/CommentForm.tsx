"use client";
import React, { FormEventHandler, useState } from "react";

import SmileIcon from "./ui/icons/SmileIcon";

interface Props {
  onPostComment: (comment: string) => void;
}

const CommentForm = ({ onPostComment }: Props) => {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t border-neutral-300 px-3"
    >
      <SmileIcon />
      <input
        className="ml-2 w-full border-none p-3 outline-none"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        required
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`ml-2 font-bold ${
          buttonDisabled ? "text-gray-300" : "text-sky-500"
        }`}
        type="submit"
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
