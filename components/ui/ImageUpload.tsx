"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "./button";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
  disabled?: boolean;
}
const ImageUpload = ({
  disabled,
  values,
  onChange,
  onRemove,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //if(!isMounted) redirect('/');

  const onUpload = (res: any) => {
    onChange(res?.info?.secure_url);
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-5">
        {values?.map(url => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="icon"
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} alt="cover image" className="object-cover" fill />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="nqrwjzcc">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              onClick={onClick}
              variant="secondary"
            >
              <ImagePlus className="mr-2 h-5 w-5" />
              <span>Upload image</span>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
