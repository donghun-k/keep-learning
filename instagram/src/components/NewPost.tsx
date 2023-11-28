"use client";
import {
  ChangeEventHandler,
  DragEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import { AuthUser } from "@/app/model/user";

import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";

interface Props {
  user: AuthUser;
}

const NewPost = ({ user: { username, image } }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag: DragEventHandler = (e) => {
    if (e.type === "dragenter") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };
  const handleDragOver: DragEventHandler = (e) => {
    e.preventDefault();
  };
  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");
  };

  return (
    <section className="mt-6 flex w-full max-w-xl flex-col items-center">
      <PostUserAvatar username={username} userImage={image ?? ""} />
      <form className="mt-2 flex w-full flex-col" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`flex h-60 w-full flex-col items-center justify-center ${
            !file && "border-2 border-dashed border-sky-500"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className="pointer-events-none absolute inset-0 z-10 bg-sky-500/20"></div>
          )}
          {!file && (
            <div className="pointer-events-none flex flex-col items-center">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative aspect-square w-full">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="border border-neutral-300 text-lg outline-none"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="Write a caption..."
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
};

export default NewPost;
