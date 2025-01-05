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
  strength?: number;
}

const Zone: React.FC<Zone> = ({ x1, y1, x2, y2, name, gang, strength }) => {
  const imageSize = 6000;

  const transformCoordinates = (x: number, y: number) => {
    const pixelX = ((x + 3000) / 6000) * imageSize;
    const pixelY = ((3000 - y) / 6000) * imageSize; // Invert Y-axis
    return { pixelX, pixelY };
  };

  const topLeft = transformCoordinates(x1, y2);
  const bottomRight = transformCoordinates(x2, y1);

  const pickColours = (gang: string, strength: number) => {
    const opacity = Math.min(Math.max(strength / 100, 0), 1);
    switch (gang) {
      case 'GANG1':
        return {
          bg: `rgba(204, 0, 204, ${opacity})`,
          border: '1px solid rgba(204, 0, 204, 0.8)',
        }
      case 'GANG2':
        return {
          bg: `rgba(0, 153, 0, ${opacity})`,
          border: '1px solid rgba(0, 153, 0, 0.8)',
        };
      case 'GANG3':
        return {
          bg: `rgba(255, 255, 0, ${opacity})`,
          border: '1px solid rgba(255, 255, 0, 0.8)',
        };
      case 'GANG8':
        return {
          bg: `rgba(0, 255, 255, ${opacity})`,
          border: '1px solid rgba(0, 255, 255, 0.8)',
        };
      default:
        return {
          bg: 'rgba(192, 192, 192, 0.2)',
          border: '1px solid rgba(192, 192, 192, 0.8)',
        };
    }
  };

  const gangColour = pickColours(gang ?? 'default', strength ?? 0);

  const boxStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${topLeft.pixelX}px`,
    top: `${topLeft.pixelY}px`,
    width: `${bottomRight.pixelX - topLeft.pixelX}px`,
    height: `${bottomRight.pixelY - topLeft.pixelY}px`,
    backgroundColor: gangColour.bg,
    border: gangColour.border,
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '1px 1px 1px black',
    textAlign: 'center',
    lineHeight: `${bottomRight.pixelY - topLeft.pixelY}px`,
    overflow: 'hidden',
  };

  return (
    <div style={boxStyle} title={name}>
      {name}
      {strength !== undefined && (
  <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
    {` [${strength}]`}
  </span>
)}
    </div>
  );
};

export default Zone;
