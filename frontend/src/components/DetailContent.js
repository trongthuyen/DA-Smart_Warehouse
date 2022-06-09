import Icon from "./Icon";
import IconButton from "./IconButton";
import "../styles/Content.scss";
import { useState } from "react";
import DetailLocation from './DetailLocation';
import AddWH from './AddWH';
import { useSelector } from "react-redux";


function DetailContent({ onSidebarHide }) {
	const { location } = useSelector(state => state.warehouse)

  const [toggle, setToggle] = useState(location[0]?.id || 1);
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
                  className="pl-12 py-2 pr-2 block w-full rounded-lg border-white-300 bg-card"
                  placeholder="search"
                />
              </form>
            </div>
          </div>
          <div className="w-full border-gray-200 dark:border-gray-800 border-b overflow-y-auto lg:block hidden p-5">
            <div className="text-xs text-gray-400 tracking-wider">WAREHOUSES</div>
            <div className="flex flex-row space-x-4 mt-3">
              {location.map(({id, name, address}) => (
              <button key={id} className={toggle === id ? "rounded-lg bg-card p-3 w-full flex flex-col rounded-md shadow-lg relative ring-2 ring-blue-500 focus:outline-none" : "rounded-lg bg-card p-3 w-full flex flex-col rounded-md shadow"} onClick={() => setToggle(id)}>
                <div className="flex xl:flex-row flex-col items-center font-medium text-white-900 pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                <IconButton icon="https://svgshare.com/i/gj6.svg" className="w-8 h-8 mr-5" />
                  {name}
                </div>
                <div className="flex items-center w-full">
                  <div className="text-xs py-1 px-2 leading-none bg-yellow-100 text-yellow-600 rounded-md">Address</div>
                  <div className="ml-auto text-xs text-while-400">{address}</div>
                </div>
              </button>
              ))}
              <div className="h-23">
              <AddWH/>
              </div>
            </div>
          </div>
          <div className="content-tabs">
            <div className={toggle ? "content active-content" : "content"}>
              <DetailLocation warehouseId={toggle}/>
            </div>
          </div>
    </div>
    </div>
  )
}

export default DetailContent;