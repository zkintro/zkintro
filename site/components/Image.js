// Replace Next.js Image with standard img tag
const Image = ({ src, alt, width, height, className, priority, ...rest }) => {
    // Define image base URL based on environment
    const IMG_BASE = process.env.NODE_ENV === 'production'
        ? 'https://zkintro.imgix.net'
        : '/static/images';

    // Check if this is a static image path
    const isStaticImage = src.startsWith('/static/images/') || src.startsWith('static/images/');

    // Create URL for static images, otherwise use original source
    let imageSrc = src;
    if (isStaticImage) {
        // Remove leading slash if present
        const imagePath = src.replace(/^\/?(static\/images\/)/, '');

        // In production, use Imgix with parameters; in development use local path
        imageSrc = process.env.NODE_ENV === 'production'
            ? `${IMG_BASE}/${imagePath}?w=1200&auto=format&fit=max`
            : `${IMG_BASE}/${imagePath}`;
    } else if (!src.startsWith('http')) {
        // For local images that aren't static/images
        imageSrc = `${IMG_BASE}/${src}`;
    }

    // Generate alt text from filename if not provided
    // Extract from either path format
    const fileName = src.split('/').pop();
    const fileNameWithoutExt = fileName ? fileName.split('.')[0] : '';
    const altText = alt || fileNameWithoutExt || 'Image';

    // Set explicit dimensions to help with CLS
    let finalWidth = width;
    let finalHeight = height;

    // Default to 1200 × auto or use provided dimensions
    if (!finalWidth) {
        finalWidth = 1200;
    }

    if (!finalHeight) {
        finalHeight = 'auto';
    }

    // Convert width/height props to style if they're provided as strings with units
    const style = {}
    if (finalWidth && typeof finalWidth === 'string' && finalWidth.endsWith('px')) {
        style.width = finalWidth;
        // Remove px for the attribute
        finalWidth = parseInt(finalWidth, 10);
    }

    if (finalHeight && typeof finalHeight === 'string' && finalHeight.endsWith('px')) {
        style.height = finalHeight;
        // Remove px for the attribute
        finalHeight = parseInt(finalHeight, 10);
    }

    // Determine loading strategy
    // Use eager loading for priority images or those with "hero" class
    const isPriority = priority === true || (className && className.includes('hero'));
    const loadingStrategy = isPriority ? 'eager' : 'lazy';

    return <img
        src={imageSrc}
        alt={altText}
        className={className || ''}
        style={style}
        width={finalWidth}
        height={finalHeight}
        loading={loadingStrategy}
        decoding="async"
        {...rest}
    />
}

export default Image
