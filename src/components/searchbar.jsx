import React from "react";

 function SearchBar({searchPost}) {

  const searchBarHandler = (value) => {
    searchPost(value);
  };

  return (
    <div className="bg-black border-2 border-green-500 rounded-md text-black">
      <input
        onChange={(e) => {
          searchBarHandler(e.target.value);
        }}
        type="text"
        placeholder="Search..."
        className="w-96 h-10 rounded-md px-4 outline-none"
      />
    </div>
  );
}

export default SearchBar;
