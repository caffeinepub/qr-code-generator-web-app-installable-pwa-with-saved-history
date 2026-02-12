export interface QRSettings {
  size: number;
  fgColor: string;
  bgColor: string;
}

export function getDefaultSettings(): QRSettings {
  return {
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
  };
}
