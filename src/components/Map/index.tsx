import zones from '../../assets/zones.json';
import Zone from '../Zone';

const GangMap: React.FC = () => {
  console.log(zones);
  return (
    <>
      <img src="images/6000.jpg" alt="" />
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
    </>
  );
};

export default GangMap;
