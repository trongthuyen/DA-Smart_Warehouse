
import { useState } from 'react';

export default function AddWH() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="lg:w-16 flex-shrink-0 h-full flex justify-center pt-4"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-plus-circle-fill hover:fill-[#4895ef] animate-bounce rounded-full" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
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
                          <label for="houseName" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                          <input type="houseName" name="houseName" id="houseName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Warehouse 1" required/>
                      </div>
                      <div>
                          <label for="addr" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                          <input type="addr" name="addr" id="addr" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
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
  );
};
