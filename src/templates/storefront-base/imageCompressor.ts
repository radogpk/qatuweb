/**
 * Utilidad de compresión nativa en el navegador usando <canvas>.
 * Convierte cualquier foto pesada de cámara móvil (4-8 MB) a formato WebP optimizado (<80 KB).
 * Protege el Tier Gratuito de 1 GB de Supabase Storage para que rinda más de 10,000 fotos por cliente.
 */

export interface CompressionResult {
  file: File;
  dataUrl: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  reductionPercentage: number;
  width: number;
  height: number;
}

export async function compressImageToWebP(
  file: File,
  maxWidth = 800,
  quality = 0.8
): Promise<CompressionResult> {
  const originalSizeKB = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calcular escala proporcional respetando el ancho máximo
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        // Crear canvas en memoria
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto 2D del canvas'));
          return;
        }

        // Dibujar con renderizado suave
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar a WebP
        const dataUrl = canvas.toDataURL('image/webp', quality);

        // Convertir dataURL a objeto File
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al convertir canvas a Blob'));
              return;
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
            const compressedFile = new File([blob], cleanFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            const compressedSizeKB = Math.round(compressedFile.size / 1024);
            const reductionPercentage = Math.round(
              ((originalSizeKB - compressedSizeKB) / originalSizeKB) * 100
            );

            resolve({
              file: compressedFile,
              dataUrl,
              originalSizeKB,
              compressedSizeKB,
              reductionPercentage: Math.max(0, reductionPercentage),
              width,
              height,
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => reject(new Error('Error al cargar la imagen para compresión'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}
