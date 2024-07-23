import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./GemstoneDetail.css";
import DetailsThumb from "../../components/Thumb/DetailsThumb";

function GemstoneDetail() {
  const { gemstoneId } = useParams(); // Lấy productId từ URL
  const [gemstone, setGemstone] = useState(null);
  const [index, setIndex] = useState(0);
  const myRef = useRef();

  useEffect(() => {
    fetchProduct();
  }, [gemstoneId]); // Theo dõi thay đổi của productId để fetch dữ liệu mới khi productId thay đổi

  useEffect(() => {
    if (myRef.current && myRef.current.children.length > 0) {
      const images = myRef.current.children;
      for (let i = 0; i < images.length; i++) {
        if (i === index) {
          images[i].className = "thumb-active";
        } else {
          images[i].className = "thumb-inactive";
        }
      }
    }
  }, [index]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://nbjewelrybe.azurewebsites.net/api/Gemstones/${gemstoneId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setGemstone(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleTab = (index) => {
    setIndex(index);
  };

  return (
    <div className="gemstone-details">
      {gemstone && (
        <div className="gemstone-details-container" key={gemstone.gemstoneId}>
          <div className="gemstone-details-big-img">
            {/* Hiển thị hình ảnh sản phẩm */}

            <img
                          src={gemstone.image || "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"}
                          alt={gemstone.name}
            />
          </div>

          <div className="gemstone-details-info-box">
            <div className="gemstone-details-info-row">
              <h2>{gemstone.name}</h2>
              <span>{parseInt(gemstone.price).toLocaleString()} VND</span>
            </div>

            <p>Shape: {gemstone.shape}</p>
            <p>Cut: {gemstone.cut}</p>
            <p>Size: {gemstone.size}</p>
            <p>Clarity: {gemstone.clarity}</p>

            {/* Nếu có nhiều hình ảnh, sử dụng DetailsThumb */}
            {gemstone.images && (
              <DetailsThumb
                images={gemstone.images}
                tab={handleTab}
                myRef={myRef}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GemstoneDetail;
