export async function getThumbnailUrl(
    originalUrl: string,
    targetWidth = 300,
    originalWidth: number,
    originalHeight: number
  ) {
    const urlParts = originalUrl.split('/');
    const fullFilename = urlParts[urlParts.length - 1];
    const [filenameWithoutExt, extension] = fullFilename.split('.');
  
    const proportionalHeight = Math.round((originalHeight * targetWidth) / originalWidth);
    const thumbnailFilename = `${filenameWithoutExt}-${targetWidth}x${proportionalHeight}.${extension}`;
  
    urlParts[urlParts.length - 1] = thumbnailFilename;
    const thumbnailUrl = urlParts.join('/');
    try {
      const response = await fetch(thumbnailUrl, { method: 'HEAD' });
      if (response.ok) {
        return thumbnailUrl;
      }
    } catch (error) {
      console.error('Error checking thumbnail URL:', error);
    }
  
    return originalUrl;
  }