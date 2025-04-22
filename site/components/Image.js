// Replace Next.js Image with standard img tag
const Image = ({ src, alt, width, height, className, ...rest }) => {
    // If the src starts with /static/images/, use it as is
    // Otherwise, assume it's a relative path and prepend /static/images/
    const imageSrc = src.startsWith('/static/images/') ? src : `/static/images/${src}`

    // Convert width/height props to style if they're provided as strings with units
    const style = {}
    if (width && typeof width === 'string' && width.endsWith('px')) {
        style.width = width
    }
    if (height && typeof height === 'string' && height.endsWith('px')) {
        style.height = height
    }

    return <img
        src={imageSrc}
        alt={alt || ''}
        className={className || ''}
        style={style}
        {...rest}
    />
}

export default Image
