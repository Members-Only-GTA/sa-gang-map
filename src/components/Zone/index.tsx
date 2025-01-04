interface Zone {
  name: string;
  type?: number;
  x1: number;
  y1: number;
  z1?: number;
  x2: number;
  y2: number;
  z2?: number;
  level?: number;
  text?: string;
  gang?: string;
}

const Zone: React.FC<Zone> = ({ x1, y1, x2, y2, name, gang }) => {
  const imageSize = 6000;

  const transformCoordinates = (x: number, y: number) => {
    const pixelX = ((x + 3000) / 6000) * imageSize;
    const pixelY = ((3000 - y) / 6000) * imageSize; // Invert Y-axis
    return { pixelX, pixelY };
  };

  const topLeft = transformCoordinates(x1, y2);
  const bottomRight = transformCoordinates(x2, y1);

  const pickColours = (gang: string) => {
    switch (gang) {
      case 'GANG1':
        return {
          bg: 'rgba(204, 0, 204, 0.2)',
          border: '1px solid rgba(204, 0, 204, 0.8)',
        };
      case 'GANG2':
        return {
          bg: 'rgba(0, 153, 0, 0.2)',
          border: '1px solid rgba(0, 153, 0, 0.8)',
        };
      case 'GANG3':
        return {
          bg: 'rgba(255, 255, 0, 0.2)',
          border: '1px solid rgba(255, 255, 0, 0.8)',
        };
      case 'GANG8':
        return {
          bg: 'rgba(0, 255, 255, 0.2)',
          border: '1px solid rgba(0, 255, 255, 0.8)',
        };
      default:
        return {
          bg: 'rgba(192, 192, 192, 0.2)',
          border: '1px solid rgba(192, 192, 192, 0.8)',
        };
    }
  };

  const gangColour = pickColours(gang ?? 'default');

  const boxStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${topLeft.pixelX}px`,
    top: `${topLeft.pixelY}px`,
    width: `${bottomRight.pixelX - topLeft.pixelX}px`,
    height: `${bottomRight.pixelY - topLeft.pixelY}px`,
    backgroundColor: gangColour.bg, // Translucent red
    border: gangColour.border, // Border for visibility
  };

  return (
    <div style={boxStyle} title={name}>
      {name}
    </div>
  );
};

export default Zone;
