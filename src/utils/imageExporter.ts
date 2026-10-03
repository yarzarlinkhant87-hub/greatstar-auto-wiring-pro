import { toPng, toJpeg } from 'html-to-image';

/**
 * Downloads an HTML element as a high-resolution image (PNG)
 * @param elementId The HTML ID of the container element to capture
 * @param fileName The desired filename (without or with extension)
 */
export async function downloadElementAsImage(
  elementId: string,
  fileName: string = 'reference-card'
): Promise<boolean> {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id "${elementId}" not found`);
    return false;
  }

  try {
    // Generate high resolution image
    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2.5, // Crisp high-DPI output for retina & mobile displays
      cacheBust: true,
      backgroundColor: '#0c0a09', // stone-950 dark background default
    });

    // Create a virtual download link
    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Error saving image:', error);
    // Fallback try with jpeg
    try {
      const dataUrl = await toJpeg(node, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#0c0a09',
      });
      const link = document.createElement('a');
      link.download = `${fileName}.jpg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (fallbackError) {
      console.error('Fallback image export failed:', fallbackError);
      return false;
    }
  }
}
