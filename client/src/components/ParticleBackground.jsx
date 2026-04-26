import React, { useEffect, useRef } from 'react';

const MeshBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const blobs = container.querySelectorAll('.mesh-blob');

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Normalize mouse position to -1 to 1
            const offsetX = (clientX - centerX) / centerX;
            const offsetY = (clientY - centerY) / centerY;

            blobs.forEach((blob, i) => {
                const speed = (i + 1) * 15; // Each blob moves at a different speed
                const direction = i % 2 === 0 ? 1 : -1; // Alternate directions
                const tx = offsetX * speed * direction;
                const ty = offsetY * speed * direction;
                blob.style.transform = `translate(${tx}px, ${ty}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="mesh-bg" ref={containerRef}>
            <div className="mesh-blob mesh-blob-1"></div>
            <div className="mesh-blob mesh-blob-2"></div>
            <div className="mesh-blob mesh-blob-3"></div>
            <div className="mesh-blob mesh-blob-4"></div>
            <div className="mesh-noise"></div>
        </div>
    );
};

export default MeshBackground;
