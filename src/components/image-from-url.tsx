import { RefObject, useEffect, useRef, useState } from "react";
import { Image } from "react-konva";
import { KImage } from "../utils/types/konva-types";

export const CanvasImage = ({
  images,
  x,
  y,
}: {
  images: KImage[];
  x: string;
  y: string;
}) => {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  //   const imageRef = useRef<RefObject<Image>>();

  useEffect(() => {
    const loadImages = async () => {
      const newLoadedImages = await Promise.all(
        images.map(async (imgSrc) => {
          const img = new window.Image();
          img.src = imgSrc;
          await new Promise((resolve) => {
            img.onload = () => {
              resolve(img);
            };
          });
          return img;
        })
      );

      setLoadedImages(newLoadedImages);
    };

    loadImages();

    //   return () => {
    //     img.removeEventListener("load", img);
    //   };
    // };

    // loadImage();

    // return () => {
    //   if (imageRef.current != null) {
    //     imageRef.current.removeEventListener("load", loadImage);
    //   }
    // };
  }, [images]);

  return (
    <>
      {loadedImages.map((img, idx) => {
        <Image key={idx + 1} x={images[idx].x} y={images[idx].y} image={img} />;
      })}
    </>
  );
};
