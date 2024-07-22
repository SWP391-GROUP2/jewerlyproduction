import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import "./Filter.css";

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortOption, setSortOption] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để chuyển hướng

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const categories = ["Ring", "Bracelet", "Necklace", "Earrings"];

  const filters = {
    Ring: ["Solitaire", "Three Stone", "Pave"],
    Bracelet: ["Chain", "Charm", "Bar"],
    Necklace: ["Chain", "Station", "Initial"],
    Earrings: ["Stud", "Jacket", "Ear Spike"],
  };

  const fetchProducts = async () => {
    let query = [];

    if (selectedCategory) {
      query.push(`type=${selectedCategory}`);
    }

    if (sortOption) {
      query.push(`sortPrice=${sortOption}`);
    }

    if (selectedCategory && selectedFilters[selectedCategory]) {
      query.push(`style=${selectedFilters[selectedCategory]}`);
    }

    const queryString = query.length ? `?${query.join("&")}` : "";

    try {
      const url = `https://nbjewelrybe.azurewebsites.net/api/ProductSamples${
        queryString ? "/FilterInSearch" + queryString : ""
      }`;
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

  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
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
        {currentProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <ul>
            {currentProducts.map((product) => (
              <div
                className="product-card"
                key={product.productSampleId}
                onClick={() => navigateToProductDetail(product.productSampleId)} // Chuyển hướng khi nhấp vào sản phẩm
              >
                <img
                  src={
                    product.image ||
                    "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"
                  }
                  alt={product.productName}
                  className="product-image"
                />
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-price">
                  {parseInt(product.price).toLocaleString()} VND
                </p>
              </div>
            ))}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <span
                    key={page}
                    className={`page-node ${
                      page === currentPage ? "current" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </span>
                )
              )}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
