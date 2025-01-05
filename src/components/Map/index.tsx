import React, { useState, useRef, useEffect } from 'react';
import zones from '../../assets/zones.json';
import Zone from '../Zone';

const GangMap: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const imageSize = { width: 6000, height: 6000 };
  const [minScale, setMinScale] = useState(0.1);

  useEffect(() => {
    const updateInitialScale = () => {
      const container = containerRef.current;
      if (!container) return;

      const { clientWidth, clientHeight } = container;

      const scaleWidth = clientWidth / imageSize.width;
      const scaleHeight = clientHeight / imageSize.height;

      const initialScale = Math.max(scaleWidth, scaleHeight);

      setMinScale(0.1);
      setScale(initialScale);
      setPosition({
        x: (clientWidth - imageSize.width * initialScale) / 2,
        y: (clientHeight - imageSize.height * initialScale) / 2,
      });
    };

    updateInitialScale();
    window.addEventListener('resize', updateInitialScale);

    return () => {
      window.removeEventListener('resize', updateInitialScale);
    };
  }, [imageSize.width, imageSize.height]);

  const handleWheel = (event: React.WheelEvent) => {
    const zoomStep = 0.1;
    const { clientX, clientY } = event;
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    const offsetX = clientX - rect.left - position.x;
    const offsetY = clientY - rect.top - position.y;
    const newScale = Math.min(Math.max(scale + (event.deltaY > 0 ? -zoomStep : zoomStep), minScale), 2);

    const scaleChange = newScale / scale;

    setPosition({
      x: position.x - offsetX * (scaleChange - 1),
      y: position.y - offsetY * (scaleChange - 1),
    });

    setScale(newScale);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button !== 0) return;
    event.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: event.clientX - position.x, y: event.clientY - position.y };
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const mapStyle: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
    transformOrigin: '0 0',
    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
    position: 'relative',
    width: `${imageSize.width}px`,
    height: `${imageSize.height}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={mapStyle}>
        <img
          src="images/6000.jpg"
          alt="Gang Map"
          draggable="false"
        />
        {zones.map((zone, index) => {
          const { x1, y1, x2, y2, name, gang, strength } = zone;
          return (
            <Zone
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              name={name}
              gang={gang}
              strength={strength}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GangMap;
