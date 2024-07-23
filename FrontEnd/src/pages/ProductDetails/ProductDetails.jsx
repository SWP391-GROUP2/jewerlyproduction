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

  const [images, setImages] = useState([]); // Khai báo state cho danh sách hình ảnh

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

  // Hàm fetch3dDesigns để lấy dữ liệu từ API 3dDesign
  const fetch3dDesigns = async () => {
    try {
      const response = await fetch(`https://nbjewelrybe.azurewebsites.net/api/_3ddesign`);
      if (!response.ok) {
        throw new Error("Failed to fetch 3dDesigns");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching 3dDesigns:", error);
      return [];
    }
  };

  // Hàm fetchProduct để lấy dữ liệu sản phẩm từ API
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://nbjewelrybe.azurewebsites.net/api/ProductSamples/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      console.log("data Images :", data);
      setProduct(data);

      const designs = await fetch3dDesigns(); // Lấy dữ liệu 3dDesigns từ API

      // Lấy _3dDesignIds từ dữ liệu sản phẩm
      const designIds = data._3dDesignId || [];

      // Lọc và lấy ảnh tương ứng với _3dDesignIds
      const productImages = designs
        .filter((design) => designIds.includes(design._3dDesignId))
        .map((design) => design.image);

      setImages(productImages); // Cập nhật state images

      console.log("Product Images :", productImages);
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
        <div className="details" key={product.productSampleId}>
          <div></div>
          <div className="big-img">
            {/* Hiển thị hình ảnh sản phẩm */}
            <img
              src={
                images[index] ||
                "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"
              }
              alt={product.productName}
            />
          </div>
          <div className="product-details">
            <h2>{product.productName}</h2>
            <span>{parseInt(product.price).toLocaleString()} VND</span>
            <p>Product Sample Id: {product.productSampleId}</p>
            <p>
              The selling price may vary depending on the actual size and weight
              of the product
            </p>
            {/* Nếu có nhiều hình ảnh, sử dụng DetailsThumb */}
            {images.length > 0 && (
              <DetailsThumb images={images} tab={handleTab} myRef={myRef} />
            )}
            <button
              className="cart"
              onClick={() => navigateToProductDetail(product.productSampleId)}
            >
              Add to customize
            </button>
          </div>
        </div>
      )}
      <div className="index-title-box">
        <span className="index-title">Product Sample Detail</span>
      </div>
      {product && (
        <table className="product-info-table">
          <tbody>
            <tr>
              <td>Description</td>
              <td>{product.description}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{product.type}</td>
            </tr>
            <tr>
              <td>Style</td>
              <td>{product.style}</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>{product.size}</td>
            </tr>
            <tr>
              <td>Gold Type</td>
              <td>{product.goldType}</td>
            </tr>
            {/* {product.gemstones.map((gemstone) => (
        <tr key={gemstone.id}>
          <td>Gemstone</td>
          <td>{gemstone.name}</td>
        </tr>
      ))} */}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductDetails;
