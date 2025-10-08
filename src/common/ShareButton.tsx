import React from 'react';

type ShareButtonProps = {
    shareUrl?: string;
};

const getFavicon = () => {
    const favicon = document.querySelector('link[rel~="icon"]');
    return favicon ? favicon.getAttribute('href') || '/favicon.ico' : '/favicon.ico';
};

const ShareButton: React.FC<ShareButtonProps> = ({ shareUrl }) => {
    const url = window.location.href;
    const title = document.title;
    const imageSrc = shareUrl || getFavicon();

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title,
                url,
            });
        } else {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            window.open(twitterUrl, '_blank');
        }
    };

    return (
        
            <button
                type="button"
                onClick={handleShare}
                className="p-2 cursor-pointer duration-300 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none flex items-center justify-center"
                title="Twitterで共有"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.29c0 .34.04.67.1.99C8.09 9.13 4.8 7.38 2.67 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.82 1.94 3.59-.72-.02-1.39-.22-1.98-.55v.06c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54c-.34 0-.67-.02-1-.06A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59c-.77.34-1.6.58-2.47.7z" />
                </svg>
            </button>
        
    );
};

export default ShareButton;