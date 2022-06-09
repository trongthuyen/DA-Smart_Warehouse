import Image from './Image';
import Icon from './Icon';
import { animated } from 'react-spring';
import Info from './Info';


export default function NameCard({
  name,
  position,
  age,
  rise,
  mode,
  imgId,
}) {
  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="rounded-lg bg-card flex justify-between p-3 h-32">
        <div className="">
          <div className="flex items-center">
            <Image path={`${imgId}`} className="w-10 h-10" />
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-white">{name}</div>
                <Icon path="res-react-dash-tick" />
              </div>
              <div className="text-sm ">{position}</div>
            </div>
          </div>

          <div className="text-sm  mt-2">{`Mode: Turn ${mode ? "on" : "off"}`}</div>
          <svg
            className="w-44 mt-3"
            height="6"
            viewBox="0 0 200 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="6" rx="3" fill="#2D2D2D" />
            <animated.rect
              width={mode ? 200 : 0}
              height="6"
              rx="3"
              fill="#560bad"
            />
          </svg>
        </div>
        <Info
          name={name}
          rise={rise}
          age={age}/>
      </div>
    </div>
  );
}