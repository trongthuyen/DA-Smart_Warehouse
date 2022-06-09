import { animated } from 'react-spring';
import Image from './Image';
import clsx from 'https://cdn.skypack.dev/clsx@1.1.1';



export default function Info({name, rise, age}) {
  if (name !== "Cooler") {
    return (
      <div className="flex flex-col items-center">
          <Image
            path={rise ? 'https://svgshare.com/i/gjD.svg' : 'https://svgshare.com/i/giK.svg'}
            className="w-8 h-8"
          />
          <animated.div
            className={clsx(
              rise ? 'text-green-500' : 'text-red-500',
              'font-bold',
              'text-lg',
            )}
          >
            {`${ age } years`}
          </animated.div>
          <div className="text-sm ">Last 6 month</div>
        </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center">
          <animated.div
            className={clsx(
              'font-bold',
            )}
            id="degC"
          >
            {`${ age }`}
            <div className="text-sm inline" id="sym">&deg;C</div>
          </animated.div>
        </div>
    )
  }
};