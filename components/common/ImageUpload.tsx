"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";

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
  const onUpload = (res: any) => {
    onChange(res?.info?.secure_url);
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-5">
        {values?.map(url => (
          <div
            key={url}
            className="relative size-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="icon"
                variant="destructive"
              >
                <Trash className="size-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="cover image"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100%, 200px"
            />
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
              <ImagePlus className="mr-2 size-5" />
              <span>Upload image</span>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
