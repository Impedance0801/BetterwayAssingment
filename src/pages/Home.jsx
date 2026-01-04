import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/Slices/InventorySlice";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import Navbar from "../components/Navbar";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [stockFilter, setStockFilter] = useState("all");

  const dispatch = useDispatch();
  const inventory = useSelector((s) => s.inventory?.stock || {});

  function searchPost(value) {
    setSearchQuery(value || "");
  }

  function onCategoryChange(value) {
    setSelectedCategory(value || "all");
  }

  function onSortChange(value) {
    setSortOrder(value || "none");
  }

  function onClearFilters() {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortOrder("none");
  }

  // derive categories from allPosts
  const categories = useMemo(() => {
    const s = new Set();
    (allPosts || []).forEach((p) => p && p.category && s.add(p.category));
    return Array.from(s);
  }, [allPosts]);

  // compute displayed posts based on search/category/sort
  useEffect(() => {
    let filtered = Array.isArray(allPosts) ? allPosts.slice() : [];

    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((post) => {
        const title = (post.title || "").toLowerCase();
        const desc = (post.description || "").toLowerCase();
        const category = (post.category || "").toLowerCase();
        const id = String(post.id || "");
        return (
          title.includes(q) ||
          desc.includes(q) ||
          category.includes(q) ||
          id === q
        );
      });
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    setPosts(filtered);
  }, [allPosts, searchQuery, selectedCategory, sortOrder, inventory, stockFilter]);

  // useEffect(() => {
  //   searchPost("Mens Casual Slim Fit");
  // });

  useEffect(() => {
    async function fetchProductData() {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        setAllPosts(data || []);
        setPosts(data || []);
        // initialize inventory state for products
        dispatch(setProducts(data || []));
      } catch (error) {
        console.log("error aa gya");
        setPosts([]);
      }
      setLoading(false);
    }

    fetchProductData();
  }, []);

  return (
    <div>
      <div className="bg-slate-900">
        <Navbar
          searchPost={searchPost}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          onClearFilters={onClearFilters}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="grid xs:grid-col-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] ">
          {posts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>no data found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
