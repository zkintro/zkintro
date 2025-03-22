import NextImage from 'next/image'

const Image = ({ src, ...rest }) => {
    // If the src starts with /static/images/, use it as is
    // Otherwise, assume it's a relative path and prepend /static/images/
    const imageSrc = src.startsWith('/static/images/') ? src : `/static/images/${src}`
    return <NextImage src={imageSrc} {...rest} loading="eager" unoptimized={true} />
}

export default Image
