import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GemstoneSibar.css";

const Sidebar = () => {
  const [selectedGemstone, setSelectedGemstone] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]);

  const gemstones = ["Diamond", "Ruby", "Sapphire", "Emerald"];

  const attributes = {
    color: ["Red", "Blue", "Green", "Yellow"],
    transparency: ["Opaque", "Translucent", "Transparent"],
    cut: ["Round", "Oval", "Princess", "Emerald"],
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

  return (
    <div className="container">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button onClick={toggleSidebar} className="toggle-button">
          {isSidebarOpen ? "<<" : ">>"}
        </button>
        {isSidebarOpen && (
          <>
            <h2>Gemstone</h2>
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
                <div className="filters">
                  <h3>Color</h3>
                  <ul className="filter-list">
                    {attributes.color.map((color) => (
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
                <div className="filters">
                  <h3>Transparency</h3>
                  <ul className="filter-list">
                    {attributes.transparency.map((transparency) => (
                      <li key={transparency}>
                        <label>
                          <input
                            type="radio"
                            name="transparency"
                            value={transparency}
                            checked={selectedFilters.transparency === transparency}
                            onChange={() =>
                              handleFilterChange("transparency", transparency)
                            }
                          />
                          {transparency}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="filters">
                  <h3>Cut</h3>
                  <ul className="filter-list">
                    {attributes.cut.map((cut) => (
                      <li key={cut}>
                        <label>
                          <input
                            type="radio"
                            name="cut"
                            value={cut}
                            checked={selectedFilters.cut === cut}
                            onChange={() => handleFilterChange("cut", cut)}
                          />
                          {cut}
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
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
        