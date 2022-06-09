
import { useState } from 'react';


export default function EditE({id, name, type, state, location, fInfo}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <button className="w-4 h-4 inline-flex items-center justify-center text-gray-400 ml-auto"
    type="button"
    onClick={() => setShowModal(true)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>
    </button>
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-full max-w-md">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <div className="flex">
                <h3 className="grow mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a Warehouse</h3>
                <button
                  className="grow-0 w-6 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent h-6 w-6 text-2xl block">
                    x
                  </span>
                </button>
                </div>
                <form className="space-y-6" action="#">
                    <div>
                        <label for="EName" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="EName" name="EName" id="EName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={name}/>
                    </div>
                    <div>
                      <label for="typ" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                      <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="typ">
                          <option selected>{type}</option>
                          <option>Light</option>
                          <option>Cooler</option>
                          <option>Door</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                      <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="state">
                          <option selected>{state ? "On" : "Off"}</option>
                          <option>On</option>
                          <option>Off</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                        <label for="loca" className="block mb-2 text-sm font-medium text-gray-900">Location At</label>
                        <div className="relative">
                          <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="loca">
                            <option selected>{location}</option>
                            <option>Warehouse 1</option>
                            <option>Warehouse 2</option>
                            <option>Warehouse 3</option>
                            <option>Warehouse 4</option>
                            <option>Warehouse 5</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                    <div>
                        <label for="furInfo" className="block mb-2 text-sm font-medium text-gray-900">Further Info</label>
                        <input type="furInfo" name="furInfo" id="furInfo" placeholder={fInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
    </>
  )
}