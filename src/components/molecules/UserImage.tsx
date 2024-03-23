import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";
import Image from "next/image";

const UserImage = (props: {
  src: any;
  alt: string;
  height: `h-${string}`;
  width: `w-${string}`;
}) => {
  return (
    <>
      {props.src ? (
        <div className={cn("relative", props.height, props.width)}>
          <Image
            src={props.src}
            alt={props.alt}
            width={200}
            height={200}
            className={cn("object-cover", props.height, props.width)}
          />
        </div>
      ) : (
        <div
          className={cn(
            "bg-secondary flex justify-center items-center",
            props.height,
            props.width
          )}
        >
          <ImageOff />
        </div>
      )}
    </>
  );
};

export default UserImage;
