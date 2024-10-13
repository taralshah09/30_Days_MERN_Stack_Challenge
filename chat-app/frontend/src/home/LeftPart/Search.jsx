import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = () => {
  return (
    <div className=" h-[10vh]">
    <div className="px-6 py-4">
      <form >
        <div className="flex space-x-3">
          <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
            <input
              type="text"
              className="grow outline-none bg-transparent"
              placeholder="Search"
            //   value={search}
            //   onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button>
            {/* <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" /> */}
            <i className="text-2xl p-2 hover:bg-gray-600 rounded-full duration-200 fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Search
