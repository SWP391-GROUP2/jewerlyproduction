import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./Filter.css";

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]); // Khai báo state để lưu trữ các sản phẩm

  const categories = ["Ring", "Bracelet", "Necklace", "Earrings"];

  const filters = {
    Ring: ["Solitaire", "Three Stone", "Pave"],
    Bracelet: ["Chain", "Pearl", "Bar"],
    Necklace: ["Chain", "Pearl", "Station", "Initial"],
    Earrings: ["Stud", "Jacket", "Ear Spike"],
  };

  // Hàm để gọi API
  const fetchProducts = async () => {
    let query = `category=${selectedCategory}`;
    if (sortOption) {
      query += `&sort=${sortOption}`;
    }
    if (selectedFilters[selectedCategory]) {
      query += `&filter=${selectedFilters[selectedCategory]}`;
    }

    try {
      const response = await axios.get(
        `https://api.example.com/products?${query}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Gọi API khi selectedCategory, sortOption hoặc selectedFilters thay đổi
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts();
    }
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
        <h2>Products</h2>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar; // Xuất thành phần Sidebar để sử dụng ở nơi khác
