import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "./searchbar.jsx";

const Navbar = ({
  searchPost,
  categories = [],
  selectedCategory = "all",
  onCategoryChange,
  sortOrder = "none",
  onSortChange,
  onClearFilters,
}) => {
  const { cart } = useSelector((state) => state);

  return (
    <div>
      <div className="flex justify-between  items-center h-20 max-w-6xl mx-auto ">
        <NavLink to="/">
          <div className="ml-5">
            <img src="/logo.png" alt="logo" className="h-14" />
          </div>
        </NavLink>

        <div className=" flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink>
            <p>Home</p>
          </NavLink>

          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white ">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>

          <div className="flex items-center space-x-3">
            <SearchBar searchPost={searchPost} />

            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
              className="bg-slate-800 text-white rounded px-2 h-10"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
              className="bg-slate-800 text-white rounded px-2 h-10"
            >
              <option value="none">Sort</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="low-to-high">Price: Low to High</option>
            </select>

            <button
              onClick={() => onClearFilters && onClearFilters()}
              className="bg-red-600 text-white px-3 py-1 rounded h-10"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
