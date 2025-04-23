import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'
import path from 'path'

export default function remarkImgToJsx() {
  return (tree) => {
    // Define image base URL based on environment
    const IMG_BASE = process.env.NODE_ENV === 'production'
      ? 'https://zkintro.imgix.net'
      : '/static/images';

    // Track first image to prioritize it
    let isFirstImage = true;

    visit(
      tree,
      // only visit p tags that contain an img element
      (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node) => {
        const imageNode = node.children.find((n) => n.type === 'image')

        // Check if this is the first image in the content
        const shouldPrioritize = isFirstImage;
        // After processing first image, set flag to false
        isFirstImage = false;

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

        // Check for dimensions in local images
        const publicPath = `${process.cwd()}/public`;
        let dimensionsFound = false;

        // Try to get dimensions from public directory for static images
        if (isStaticImage) {
          const staticImagePath = path.join(publicPath, 'static', 'images', imageNode.url.replace(/^\/?(static\/images\/)/, ''));
          if (fs.existsSync(staticImagePath)) {
            try {
              const dimensions = sizeOf(staticImagePath);
              width = dimensions.width || 1200;
              height = dimensions.height || 'auto';
              dimensionsFound = true;
            } catch (e) {
              console.warn(`Could not determine dimensions for ${staticImagePath}`);
            }
          }
        }

        // Try direct public path if not found
        if (!dimensionsFound && !isStaticImage && fs.existsSync(`${publicPath}${imageNode.url}`)) {
          try {
            const dimensions = sizeOf(`${publicPath}${imageNode.url}`);
            width = dimensions.width || 1200;
            height = dimensions.height || 'auto';
          } catch (e) {
            console.warn(`Could not determine dimensions for ${publicPath}${imageNode.url}`);
          }
        }

        // Generate alt text from filename if not provided
        const fileName = imageNode.url.split('/').pop();
        const fileNameWithoutExt = fileName ? fileName.split('.')[0] : '';
        const altText = imageNode.alt || fileNameWithoutExt || 'Image';

        // Convert original node to standard img element
        imageNode.type = 'mdxJsxFlowElement'

        // If it's the first image, use a plain img tag with eager loading and high priority
        if (shouldPrioritize) {
          imageNode.name = 'img'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'src', value: src },
            { type: 'mdxJsxAttribute', name: 'alt', value: altText },
            { type: 'mdxJsxAttribute', name: 'width', value: width },
            { type: 'mdxJsxAttribute', name: 'height', value: height },
            { type: 'mdxJsxAttribute', name: 'loading', value: 'eager' },
            { type: 'mdxJsxAttribute', name: 'fetchpriority', value: 'high' },
            { type: 'mdxJsxAttribute', name: 'decoding', value: 'async' },
            { type: 'mdxJsxAttribute', name: 'className', value: 'mx-auto hero' }
          ]
        } else {
          // For other images, use the Image component
          imageNode.name = 'img'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'src', value: src },
            { type: 'mdxJsxAttribute', name: 'alt', value: altText },
            { type: 'mdxJsxAttribute', name: 'width', value: width },
            { type: 'mdxJsxAttribute', name: 'height', value: height },
            { type: 'mdxJsxAttribute', name: 'loading', value: 'lazy' },
            { type: 'mdxJsxAttribute', name: 'decoding', value: 'async' },
            { type: 'mdxJsxAttribute', name: 'className', value: 'mx-auto' }
          ]
        }

        // Change node type from p to div to avoid nesting error
        node.type = 'div'
        node.children = [imageNode]
      }
    )
  }
}
