import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import DetailsThumb from "../../components/Thumb/DetailsThumb";

function ProductDetails() {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const myRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [productId]); // Theo dõi thay đổi của productId để fetch dữ liệu mới khi productId thay đổi

  const navigateToProductDetail = (productId) => {
    navigate(`/customer/customize/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  useEffect(() => {
    if (myRef.current && myRef.current.children.length > 0) {
      const images = myRef.current.children;
      for (let i = 0; i < images.length; i++) {
        if (i === index) {
          images[i].className = "active";
        } else {
          images[i].className = "";
        }
      }
    }
  }, [index]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5266/api/ProductSamples/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleTab = (index) => {
    setIndex(index);
  };

  return (
    <div className="ProductDetails">
      {product && (
        <div className="details" key={product.productSample.productSampleId}>
          <div className="big-img">
            {/* Hiển thị hình ảnh sản phẩm */}
            <img
                          src={product.productSample.image || "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"}
                          alt={product.productSample.productName}
            />
          </div>

          <div className="box">
            <div className="row">
              <h2>{product.productSample.productName}</h2>
              <span>
                {parseInt(product.productSample.price).toLocaleString()} VND
              </span>
            </div>

            <p>{product.productSample.description}</p>
            <p>Type: {product.productSample.type}</p>
            <p>Style: {product.productSample.style}</p>
            <p>Size: {product.productSample.size}</p>
            <p>Gold Type: {product.productSample.goldType}</p>

            {product.gemstones.map((gemstone) => (
              <p>Gemstone: {gemstone.name}</p>
            ))}

            {/* Nếu có nhiều hình ảnh, sử dụng DetailsThumb */}
            {product.images && (
              <DetailsThumb
                images={product.images}
                tab={handleTab}
                myRef={myRef}
              />
            )}

            <button
              className="cart"
              onClick={() =>
                navigateToProductDetail(product.productSample.productSampleId)
              }
            >
              Add to customize
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
