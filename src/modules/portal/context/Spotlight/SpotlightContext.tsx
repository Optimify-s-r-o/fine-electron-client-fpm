import { createContext, useContext } from 'react';

export const SpotlightContext = createContext<{
  showSpotlight: () => void;
  closeSpotlight: () => void;
}>({
  showSpotlight: () => {},
  closeSpotlight: () => {}
});

export const useSpotlightContext = () => {
  const context = useContext(SpotlightContext);
  return context;
};
