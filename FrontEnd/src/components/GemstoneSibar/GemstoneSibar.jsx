import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GemstoneSibar.css";

const Sidebar = () => {
  const [selectedGemstone, setSelectedGemstone] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để chuyển hướng

  const gemstones = ["Diamond", "Ruby", "Sapphire", "Emerald", "Pearl"];

  const attributes = {
    Diamond: {
      color: ["Colorless", "Yellow", "Blue", "Pink", "Red", "Green"],
    },
    Emerald: {
      color: ["Green"],
    },
    Ruby: {
      color: ["Red"],
    },
    Sapphire: {
      color: ["Blue", "Yellow", "Pink", "Green", "Colorless", "Orange", "Purple"],
    },
    Pearl: {
      color: ["White", "Pink", "Cream", "Black"],
    },
    clarity: ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"],
    shape: ["Round", "Princess", "Emerald", "Oval", "Marquise", "Pear", "Cushion", "Radiant", "Heart", "Trillion"],
  };

  const fetchProducts = async () => {
    let query = "";
    if (selectedGemstone) {
      query += `gemstone=${selectedGemstone}`;
      Object.keys(selectedFilters).forEach((attribute) => {
        query += `&${attribute}=${selectedFilters[attribute]}`;
      });
    }

    try {
      const url = query
        ? `http://localhost:5266/api/Gemstones?${query}`
        : `http://localhost:5266/api/Gemstones`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching gemstone:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedGemstone, selectedFilters]);

  const handleGemstoneClick = (gemstone) => {
    setSelectedGemstone(gemstone);
    setSelectedFilters({});
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (attribute, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [attribute]: value,
    });
  };

  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  return (
    <div className="gemstone-container">
      <div className={`gemstone-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button onClick={toggleSidebar} className="sidebar-toggle-button">
          {isSidebarOpen ? "<<" : ">>"}
        </button>
        {isSidebarOpen && (
          <>
            <h2 className="sidebar-title">Gemstone</h2>
            <ul className="gemstone-list">
              {gemstones.map((gemstone) => (
                <li
                  key={gemstone}
                  onClick={() => handleGemstoneClick(gemstone)}
                  className={selectedGemstone === gemstone ? "active" : ""}
                >
                  {gemstone}
                </li>
              ))}
            </ul>
            {selectedGemstone && (
              <>
                <div className="gemstone-filters">
                  <h3>Color</h3>
                  <ul className="gemstone-filter-list">
                    {attributes[selectedGemstone].color.map((color) => (
                      <li key={color}>
                        <label>
                          <input
                            type="radio"
                            name="color"
                            value={color}
                            checked={selectedFilters.color === color}
                            onChange={() => handleFilterChange("color", color)}
                          />
                          {color}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="gemstone-filters">
                  <h3>Clarity</h3>
                  <ul className="gemstone-filter-list">
                    {attributes.clarity.map((clarity) => (
                      <li key={clarity}>
                        <label>
                          <input
                            type="radio"
                            name="clarity"
                            value={clarity}
                            checked={selectedFilters.clarity === clarity}
                            onChange={() =>
                              handleFilterChange("clarity", clarity)
                            }
                          />
                          {clarity}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="gemstone-filters">
                  <h3>Shape</h3>
                  <ul className="gemstone-filter-list">
                    {attributes.shape.map((shape) => (
                      <li key={shape}>
                        <label>
                          <input
                            type="radio"
                            name="shape"
                            value={shape}
                            checked={selectedFilters.cut === shape}
                            onChange={() => handleFilterChange("cut", shape)}
                          />
                          {shape}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="gemstone-products">
        {products.map((product) => (
          <div
            className="gemstone-product-card"
            key={product.id}
            onClick={() => navigateToProductDetail(product.id)}
          >
            <img
              src={require(`../Assets/${product.image}.jpg`)}
              alt={product.name}
              className="gemstone-product-image"
            />
            <h3 className="gemstone-product-name">{product.name}</h3>
            <p className="gemstone-product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
