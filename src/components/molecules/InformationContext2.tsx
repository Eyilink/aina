import React, { createContext, useState } from 'react';

export const InformationContext2 = createContext<{
  infoText2: string | undefined;
  setinfoText2: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
    infoText2: undefined,
  setinfoText2: () => {},
});

export const InfomrationProvider2: React.FC = ({ children }) => {
  const [infoText2, setinfoText2] = useState<string | undefined>(undefined);

  return (
    <InformationContext2.Provider value={{ infoText2, setinfoText2 }}>
      {children}
    </InformationContext2.Provider>
  );
};
