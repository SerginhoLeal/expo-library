export type ContextProvider = { children: React.ReactNode };

/**
 * Teste de interface, quando você passar o mouse em cima da propriedade, esse texto aparece
 */
export interface ContextProps {
  media: Array<object>;
  setMedia: (media: Array<object>) => void;
  loading: boolean;
};
