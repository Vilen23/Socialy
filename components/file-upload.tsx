import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-32 h-32">
        <Image
          src={value}
          layout="fill"
          objectFit="cover"
          alt="upload"
          className="rounded-full"
        />
        <button
          onClick={() => onChange(undefined)}
          className="absolute top-0 right-0 p-1 text-white bg-black bg-opacity-50 rounded-full"
        >
          <X size={24} />
        </button>
      </div>
    );
  }

  if(value && fileType === "pdf"){
    return <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
      <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400 mr-2"/>
      <a href={value}
      target="_black"
      rel="noopener noreferrer"
      className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
      >
        {value}
      </a>
      <button
          onClick={() => onChange(undefined)}
          className="absolute -top-2 -right-2 p-1 text-white bg-black bg-opacity-50 rounded-full"
        >
          <X size={15} />
        </button>
    </div>
  }
  return (
    <UploadDropzone
    className=" ut-button:bg-white ut-uploading:-red-400 cursor-pointer  ut-button:cursor-pointer ut-allowed-content:text-[#797a7f] ut-upload-icon:text-white ut-label:text-white ut-button:text-[#313338] ut-button:font-bold button"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
