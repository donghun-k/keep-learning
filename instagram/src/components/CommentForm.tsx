import React from "react";

import SmileIcon from "./ui/icons/SmileIcon";

const CommentForm = () => {
  return (
    <form className="flex items-center border-t border-neutral-300 px-3">
      <SmileIcon />
      <input
        className="ml-2 w-full border-none p-3 outline-none"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="ml-2 font-bold text-sky-500" type="submit">
        Post
      </button>
    </form>
  );
};

export default CommentForm;
