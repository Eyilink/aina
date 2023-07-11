import React, { createContext, useState } from 'react';

export const ImageContext = createContext<{
  imageProp: string | undefined;
  setImageProp: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
  imageProp: undefined,
  setImageProp: () => {},
});

export const ImageProvider: React.FC = ({ children }) => {
  const [imageProp, setImageProp] = useState<string | undefined>(undefined);

  return (
    <ImageContext.Provider value={{ imageProp, setImageProp }}>
      {children}
    </ImageContext.Provider>
  );
};
