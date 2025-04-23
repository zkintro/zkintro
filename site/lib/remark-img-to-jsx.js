import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'

export default function remarkImgToJsx() {
  return (tree) => {
    // Define image base URL based on environment
    const IMG_BASE = process.env.NODE_ENV === 'production'
      ? 'https://zkintro.imgix.net'
      : '/static/images';

    visit(
      tree,
      // only visit p tags that contain an img element
      (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node) => {
        const imageNode = node.children.find((n) => n.type === 'image')

        // Check if the image path is /static/images
        const isStaticImage = imageNode.url.startsWith('/static/images/') || imageNode.url.startsWith('static/images/');
        let src = imageNode.url;

        if (isStaticImage) {
          // Transform to Imgix URL in production, use local path in development
          const imagePath = imageNode.url.replace(/^\/?(static\/images\/)/, '');

          // In production, use Imgix with parameters; in development use local path
          src = process.env.NODE_ENV === 'production'
            ? `${IMG_BASE}/${imagePath}?w=1200&auto=format&fit=max`
            : `${IMG_BASE}/${imagePath}`;
        }

        // Get dimensions for local files
        let width = 1200;
        let height = 'auto';
        if (!isStaticImage && fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)
          width = dimensions.width;
          height = dimensions.height;
        }

        // Generate alt text from filename if not provided
        const altText = imageNode.alt || imageNode.url.split('/').pop().split('.')[0];

        // Convert original node to standard img element
        imageNode.type = 'mdxJsxFlowElement'
        imageNode.name = 'img'
        imageNode.attributes = [
          { type: 'mdxJsxAttribute', name: 'alt', value: altText },
          { type: 'mdxJsxAttribute', name: 'src', value: src },
          { type: 'mdxJsxAttribute', name: 'width', value: width },
          { type: 'mdxJsxAttribute', name: 'height', value: height },
          { type: 'mdxJsxAttribute', name: 'loading', value: 'lazy' },
          { type: 'mdxJsxAttribute', name: 'className', value: 'mx-auto' }
        ]

        // Change node type from p to div to avoid nesting error
        node.type = 'div'
        node.children = [imageNode]
      }
    )
  }
}
