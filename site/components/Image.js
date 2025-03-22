import NextImage from 'next/image'

const Image = ({ ...rest }) => <NextImage {...rest} loading="eager" unoptimized={true} />

export default Image
