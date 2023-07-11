import React, { createContext, useState } from 'react';

export const InformationContext = createContext<{
  infoText: string | undefined;
  setinfoText: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
    infoText: undefined,
  setinfoText: () => {},
});

export const InfomrationProvider: React.FC = ({ children }) => {
  const [infoText, setinfoText] = useState<string | undefined>(undefined);

  return (
    <InformationContext.Provider value={{ infoText, setinfoText }}>
      {children}
    </InformationContext.Provider>
  );
};
