declare global {
  interface Window {
    QRCode: any;
  }
}

export async function generateQRCodeToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  options: {
    width?: number;
    height?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.QRCode) {
      try {
        window.QRCode.toCanvas(canvas, text, {
          width: options.width || 256,
          height: options.height || 256,
          color: {
            dark: options.color?.dark || '#000000',
            light: options.color?.light || '#FFFFFF',
          },
          errorCorrectionLevel: 'H',
          margin: 1,
        }, (error: Error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('QRCode library not loaded'));
    }
  });
}
