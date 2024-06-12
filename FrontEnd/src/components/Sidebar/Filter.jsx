import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filter.css";

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]);

  const categories = ["Ring", "Bracelet", "Necklace", "Earrings"];

  const filters = {
    Ring: ["Solitaire", "Three Stone", "Pave"],
    Bracelet: ["Chain", "Pearl", "Bar"],
    Necklace: ["Chain", "Pearl", "Station", "Initial"],
    Earrings: ["Stud", "Jacket", "Ear Spike"],
  };

  const fetchProducts = async () => {
    let query = "";
    if (selectedCategory) {
      query += `category=${selectedCategory}`;
      if (sortOption) {
        query += `&sort=${sortOption}`;
      }
      if (selectedFilters[selectedCategory]) {
        query += `&filter=${selectedFilters[selectedCategory]}`;
      }
    }

    try {
      const url = query
        ? `https://api.example.com/products?${query}`
        : `https://api.example.com/products`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOption, selectedFilters]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (category, filter) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: filter,
    });
  };

  return (
    <div className="container">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button onClick={toggleSidebar} className="toggle-button">
          {isSidebarOpen ? "<<" : ">>"}
        </button>
        {isSidebarOpen && (
          <>
            <div className="sort-section">
              <h2>Price</h2>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="asc"
                  checked={sortOption === "asc"}
                  onChange={handleSortChange}
                />
                Sort in Ascending Order
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="desc"
                  checked={sortOption === "desc"}
                  onChange={handleSortChange}
                />
                Sort in Descending Order
              </label>
            </div>
            <h2>Type</h2>
            <ul className="category-list">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={selectedCategory === category ? "active" : ""}
                >
                  {category}
                </li>
              ))}
            </ul>
            {selectedCategory && (
              <div className="filters">
                <h3>Style of {selectedCategory}</h3>
                <ul className="filter-list">
                  {filters[selectedCategory].map((filter) => (
                    <li key={filter}>
                      <label>
                        <input
                          type="radio"
                          name={`filter-${selectedCategory}`}
                          value={filter}
                          checked={selectedFilters[selectedCategory] === filter}
                          onChange={() =>
                            handleFilterChange(selectedCategory, filter)
                          }
                        />
                        {filter}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <div className="products">
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
        <div className="product-card">
          <img
            src={
              "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
            }
            alt="Freshwater Ring"
            className="product-image"
          />
          <h3 className="product-name">Freshwater Ring</h3>
          <p className="product-price">$ 300</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
