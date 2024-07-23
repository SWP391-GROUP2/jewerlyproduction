import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GemstoneSibar.css";

const Sidebar = () => {
  const [selectedGemstone, setSelectedGemstone] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    shape: "",
    gemstoneType: "",
    gemstoneColor: "",
    gemstoneClarity: "",
  });

  const [gemstones, setGemstones] = useState([]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để chuyển hướng

  const attributes = {
    Diamond: {
      color: ["White", "Yellow", "Blue", "Pink", "Red", "Green"],
    },
    Emerald: {
      color: ["Green"],
    },
    Ruby: {
      color: ["Red"],
    },
    Sapphire: {
      color: ["Blue"],
    },
    SideStone: {
      color: ["White", "Pink"],
    },
    clarity: ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2"],
    shape: ["Round", "Princess", "Heart", "Oval", "Pear", "Radiant", "Cushion"],
  };

  const fetchGemstones = async () => {
    let query = [];

    if (selectedFilters.shape) {
      query.push(`shape=${selectedFilters.shape}`);
    }

    if (selectedFilters.gemstoneType) {
      query.push(`categoryName=${selectedFilters.gemstoneType}`);
    }

    if (selectedFilters.gemstoneColor) {
      query.push(`colors=${selectedFilters.gemstoneColor}`);
    }

    if (selectedFilters.gemstoneClarity) {
      query.push(`clarity=${selectedFilters.gemstoneClarity}`);
    }

    const queryString = query.length ? `?${query.join("&")}` : "";

    try {
      const url = `https://nbjewelrybe.azurewebsites.net/api/Gemstones${
        queryString ? "/Filter Gemstone" + queryString : ""
      }`;
      const response = await axios.get(url);

      setGemstones(response.data);
    } catch (error) {
      console.error("Error fetching gemstones:", error);
    }
  };

  useEffect(() => {
    fetchGemstones();
  }, [selectedFilters]);

  const handleGemstoneClick = (gemstone) => {
    setSelectedGemstone(gemstone);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      gemstoneType: gemstone,
      gemstoneColor: "",
      gemstoneClarity: "",
      shape: "",
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (attribute, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [attribute]: value,
    }));
  };

  const navigateToProductDetail = (gemstoneId) => {
    navigate(`/gemstone/${gemstoneId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  return (
    <div className="gemstone-container">
      <div className={`gemstone-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button onClick={toggleSidebar} className="toggle-button">
          {isSidebarOpen ? "<<" : ">>"}
        </button>
        {isSidebarOpen && (
          <>
            <h2 className="sidebar-title">Gemstone</h2>
            <ul className="gemstone-list">
              {Object.keys(attributes)
                .filter((key) => key !== "clarity" && key !== "shape")
                .map((gemstone) => (
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
                  <h3>Clarity</h3>
                  <select
                    value={selectedFilters.clarity || ""}
                    onChange={(e) =>
                      handleFilterChange("gemstoneClarity", e.target.value)
                    }
                  >
                    <option value="" disabled selected>
                      Select Clarity
                    </option>
                    {attributes.clarity.map((clarity) => (
                      <option key={clarity} value={clarity}>
                        {clarity}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="gemstone-filters">
                  <h3>Shape</h3>
                  <select
                    value={selectedFilters.shape || ""}
                    onChange={(e) =>
                      handleFilterChange("shape", e.target.value)
                    }
                  >
                    <option value="" disabled selected>
                      Select Shape
                    </option>
                    {attributes.shape.map((shape) => (
                      <option key={shape} value={shape}>
                        {shape}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="gemstone-products">
        {gemstones.length === 0 ? (
          <p>No products found</p>
        ) : (
          <ul>
            {gemstones.map((gemstones) => (
              <div
                className="gemstone-product-card"
                key={gemstones.id}
                onClick={() => navigateToProductDetail(gemstones.gemstoneId)}
              >
                <img
                  src={
                    gemstones.image ||
                    "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"
                  }
                  alt={gemstones.name}
                  className="gemstone-product-image"
                />
                <h3 className="gemstone-product-name">{gemstones.name}</h3>
                <p className="gemstone-product-price">${gemstones.price}</p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
