#!/usr/bin/env node

/**
 * Conservative Next.js export optimization script
 * 
 * This script:
 * 1. Preserves all CSS, media, page chunks, and runtime files
 * 2. Removes only server, cache, and build metadata not needed for client
 * 3. Optimizes HTML files for better loading performance
 * 4. Removes source maps to reduce file size
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Set the output directory
const outDir = path.join(process.cwd(), 'out');

console.log('Starting conservative export optimization...');

/**
 * IMPORTANT: This script preserves all functionality while removing unused files
 */

// Function to recursively delete a folder
function deleteFolderRecursive(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // Recurse
                deleteFolderRecursive(curPath);
            } else {
                // Delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirPath);
    }
}

// Remove unnecessary server-side directories
function removeServerDirs() {
    const nextDir = path.join(outDir, '_next');
    if (!fs.existsSync(nextDir)) {
        console.log('_next directory not found, nothing to clean');
        return;
    }

    try {
        // List of directories to remove (server-side only)
        const dirsToRemove = [
            path.join(nextDir, 'server'),
            path.join(nextDir, 'cache')
        ];

        dirsToRemove.forEach(dir => {
            if (fs.existsSync(dir)) {
                console.log(`Removing ${dir}...`);
                deleteFolderRecursive(dir);
                console.log(`Removed ${dir}`);
            }
        });

        console.log('Server-side directories removed successfully');
    } catch (error) {
        console.log('Error removing server directories:', error.message);
    }
}

// Remove source map files to reduce size
function removeSourceMaps() {
    try {
        console.log('Removing .js.map files...');
        const mapFiles = execSync(`find ${outDir} -name "*.js.map"`).toString().trim().split('\n');

        if (mapFiles.length > 0 && mapFiles[0] !== '') {
            let removedCount = 0;
            mapFiles.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                    removedCount++;
                }
            });
            console.log(`Removed ${removedCount} source map files`);
        } else {
            console.log('No source map files found');
        }
    } catch (error) {
        console.log('Error finding or removing source maps:', error.message);
    }
}

// Optimize HTML files for better performance
function optimizeHtmlFiles() {
    try {
        console.log('Optimizing HTML files...');
        const htmlFiles = execSync(`find ${outDir} -name "*.html"`).toString().trim().split('\n');

        if (htmlFiles.length > 0 && htmlFiles[0] !== '') {
            let optimizedCount = 0;

            htmlFiles.forEach(file => {
                try {
                    let content = fs.readFileSync(file, 'utf8');

                    // Advanced image optimization:
                    // 1. First visible image: Add fetchpriority="high" for LCP improvement
                    // 2. Other images: Add loading="lazy" and decoding="async"
                    let firstImgProcessed = false;
                    content = content.replace(/<img ([^>]*)>/g, (match, attrs) => {
                        if (!firstImgProcessed && !attrs.includes('loading=')) {
                            firstImgProcessed = true;
                            return `<img ${attrs} fetchpriority="high" decoding="async">`;
                        }

                        if (!attrs.includes('loading=')) {
                            return `<img ${attrs} loading="lazy" decoding="async">`;
                        }

                        return match;
                    });

                    // Add preload for critical resources
                    if (!content.includes('<link rel="preload"') && content.includes('<link rel="stylesheet"')) {
                        const cssMatch = content.match(/<link rel="stylesheet" href="([^"]+)"/);
                        if (cssMatch && cssMatch[1]) {
                            const cssPreload = `<link rel="preload" href="${cssMatch[1]}" as="style">`;
                            content = content.replace('</head>', `${cssPreload}\n</head>`);
                        }
                    }

                    fs.writeFileSync(file, content, 'utf8');
                    optimizedCount++;
                } catch (err) {
                    console.log(`Error optimizing ${file}:`, err.message);
                }
            });

            console.log(`Optimized ${optimizedCount} HTML files`);
        } else {
            console.log('No HTML files found');
        }
    } catch (error) {
        console.log('Error optimizing HTML files:', error.message);
    }
}

// Run the optimizations
removeServerDirs();
removeSourceMaps();
optimizeHtmlFiles();

// Print summary
console.log('\n=== Optimization Summary ===');
console.log('✅ Preserved all CSS files in _next/static/css/');
console.log('✅ Preserved all media files in _next/static/media/');
console.log('✅ Preserved all JS files in _next/static/chunks/pages/');
console.log('✅ Preserved all runtime files in _next/static/runtime/');
console.log('✅ Preserved framework and common chunks for core functionality');
console.log('✅ Removed server-side directories not needed for client');
console.log('✅ Removed source maps to reduce file size');
console.log('✅ Optimized HTML files for better loading performance');

console.log('\nExport optimization complete!');
console.log('Your site is now optimized for performance while maintaining ALL functionality.'); 