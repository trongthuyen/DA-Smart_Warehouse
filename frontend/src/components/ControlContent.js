import Icon from "./Icon";
import IconButton from "./IconButton";
import React from "react";
import '../styles/Control.scss';
import ToggleSwitch from './ToggleSwitch';

const data = [
  {
    id: 1,
    name: 'Light Control',
    image: 'https://svgshare.com/i/gnY.svg',
  },
  {
    id: 2,
    name: 'Cooler Control',
    image: 'https://svgshare.com/i/gob.svg',
  },
  {
    id: 3,
    name: 'Door Control',
    image: 'https://svgshare.com/i/gmz.svg',
  }
]

function ControlContent({ onSidebarHide }) {
    return (
      <div className="flex w-full">
        <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
          .
        </div>
        <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <div className="w-full sm:flex p-2 items-end">
            <div className="sm:flex-grow flex justify-between">
              <div className="">
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-white">Hello Suong</div>
                  <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                    <Icon path="res-react-dash-premium-star" />
  
                    <div className="ml-2 font-bold text-premium-yellow">
                      PREMIUM
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon
                    path="res-react-dash-date-indicator"
                    className="w-3 h-3"
                  />
                  <div className="ml-2">May 4</div>
                </div>
              </div>
              <IconButton
                icon="https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg"
                className="block sm:hidden"
                onClick={onSidebarHide}
              />
            </div>
            <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
              <Icon
                path="res-react-dash-search"
                className="w-5 h-5 search-icon left-3 absolute"
              />
              <form action="#" method="POST">
                <input
                  type="text"
                  name="company_website"
                  id="company_website"
                  className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
                  placeholder="search"
                />
              </form>
            </div>
          </div>
          {data.map(({id,name,image}) => (
            <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-card" style={{height: '30em'}}>
              <Control
                key = {id}
                id = {id}
                name = {name}
                image = {image}
              />
            </div>
          </div>
          ),
          )}
          
          
        </div>
      </div>
    );
}

export default ControlContent
  
function Control({name, image}) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">{name}</div>
        <ToggleSwitch />
      </div>
      <div className="mt-3">Current</div>
      <div className="flex justify-center" style={{marginTop: '20px'}}>
        <img src={image} alt="" width={275} height={275}/>
      </div>
    </div>
  );
}
