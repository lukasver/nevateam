import React, { ComponentProps, useEffect, useState } from 'react';
import { getAssets } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import profilePic from '/public/assets/projectPicture.jpg';

const ImageWithFallback = (props: ComponentProps<typeof Image>) => {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>('');

  useEffect(() => {
    setImgSrc(profilePic);
  }, [src]);

  return (
    <Image
      className='rounded-xl'
      src={imgSrc}
      {...rest}
      alt={alt}
      onError={() => {
        setImgSrc(getAssets('realestate.webp'));
      }}
    />
  );
};

export default ImageWithFallback;
