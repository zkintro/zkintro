// Replace Next.js Image with standard img tag
const Image = ({ src, alt, width, height, className, ...rest }) => {
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

    // Convert width/height props to style if they're provided as strings with units
    const style = {}
    if (width && typeof width === 'string' && width.endsWith('px')) {
        style.width = width
    }
    if (height && typeof height === 'string' && height.endsWith('px')) {
        style.height = height
    }

    // Generate alt text from filename if not provided
    const altText = alt || (isStaticImage ? src.split('/').pop().split('.')[0] : '');

    return <img
        src={imageSrc}
        alt={altText}
        className={className || ''}
        style={style}
        width={width || 1200}
        height={height || 'auto'}
        loading="lazy"
        {...rest}
    />
}

export default Image
