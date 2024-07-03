import React, { useEffect, useState } from "react";
import "./CustomizeForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function CustomizeForm() {
  const { productId } = useParams();
  const location = useLocation();
  const { state } = location;
  const { item } = state || {}; // Lấy dữ liệu từ state
  const [type, setselectedType] = useState("");
  const [style, setselectedStyle] = useState("");
  const [goldType, setselectedGold] = useState("");
  const [size, setselectedSize] = useState("");
  const [quantity, setselectedQuantity] = useState("1");

  const [shape, setShape] = useState("");
  const [gemstoneSize, setGemstoneSize] = useState("all");
  const [gemstoneType, setGemstoneType] = useState("");
  const [gemstoneColor, setGemstoneColor] = useState("all");
  const [gemstoneClarity, setGemstoneClarity] = useState("all");
  const [gemstoneCaratMin, setGemstoneCaratMin] = useState("all");
  const [gemstoneCaratMax, setGemstoneCaratMax] = useState("all");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để chuyển hướng
  const [styles, setStyles] = useState([]);
  const [ProductSample, setProductSample] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [gemstones, setGemstones] = useState([]);

  const [PrimaryGemstoneId, setPrimaryGemstoneId] = useState("");
  const [AdditionalGemstone, setAdditionalGemstoneIds] = useState([]);
  const [PrimaryGemstone, setSelectedMainStone] = useState(null);
  const [selectedSideStones, setSelectedSideStones] = useState([]);
  const [currentMainPage, setCurrentMainPage] = useState(1);
  const [currentSidePage, setCurrentSidePage] = useState(1);
  const [status, setStatus] = useState("");
  const [primaryGemstone, setPrimaryGemstone] = useState({
    name: "",
    color: "",
    cut: "",
    clarity: "",
  });

  const user = useSelector((State) => State.auth.Login.currentUser);

  const selectMainStone = (gemstone) => {
    setSelectedMainStone(gemstone);
    setPrimaryGemstoneId(gemstone.gemstoneId);
  };

  useEffect(() => {
    console.log("select Main Stone ", PrimaryGemstoneId);
  }, [PrimaryGemstoneId]);

  const selectSideStone = (gemstone) => {
    setSelectedSideStones((prevSelectedStones) => {
      if (
        prevSelectedStones.some(
          (stone) => stone.gemstoneId === gemstone.gemstoneId
        )
      ) {
        // Nếu đã chọn, bỏ chọn
        return prevSelectedStones.filter(
          (stone) => stone.gemstoneId !== gemstone.gemstoneId
        );
      } else if (prevSelectedStones.length < 2) {
        // Nếu chưa chọn và số lượng chọn < 2, thêm vào danh sách
        const updatedStones = [...prevSelectedStones, gemstone];
        const updatedIds = updatedStones.map((stone) => stone.gemstoneId);
        setAdditionalGemstoneIds(updatedIds);
        return updatedStones;
      } else {
        // Nếu đã chọn đủ 2 viên, không thêm nữa
        return prevSelectedStones;
      }
    });
  };

  useEffect(() => {
    console.log("select Side Stone ", AdditionalGemstone);
  }, [AdditionalGemstone]);

  useEffect(() => {
    if (item) {
      setselectedType(item);
    }
  }, [item]);

  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("Product ID is undefined");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5266/api/ProductSamples/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProductSample(data); // Cập nhật dữ liệu sản phẩm vào state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct(); // Gọi hàm fetchProduct khi component được mount hoặc khi productId thay đổi
  }, [productId]);
  // useEffect này phụ thuộc vào biến productId

  useEffect(() => {
    if (ProductSample) {
      if (ProductSample.productSample.type) {
        setselectedType(ProductSample.productSample.type);
      }
      if (ProductSample.productSample.style) {
        setselectedStyle(ProductSample.productSample.style);
      }
      if (ProductSample.productSample.goldType) {
        setselectedGold(ProductSample.productSample.goldType);
      }
      if (ProductSample.productSample.size) {
        setselectedSize(ProductSample.productSample.size);
      }
    }
  }, [ProductSample]);

  const handleViewMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  };

  const onClickSelectedShape = (event) => {
    const element = event.currentTarget;
    const idValue = element.id;
    setShape(idValue);
  };

  const getClassNamesShape = (gemstoneshape) => {
    return `gemstoneShape${
      shape === gemstoneshape ? " col-shape-selected" : ""
    }`;
  };

  const onClickSelectedGemstoneSize = (gemstonesize) => {
    setGemstoneSize(gemstonesize);
  };

  const getClassNames = (gemstonesize) => {
    return `grid-size-item${
      gemstoneSize === gemstonesize ? " col-size-selected" : ""
    }`;
  };

  const onClickSelectedGemstoneType = (gemstonetype) => {
    setGemstoneType(gemstonetype);
  };

  const getClassNamesType = (gemstonetype) => {
    return `grid-size-item${
      gemstoneType === gemstonetype ? " col-size-selected" : ""
    }`;
  };

  const onClickSelectedGemstoneColor = (color) => {
    setGemstoneColor(color);
  };

  const getClassNamesColor = (color) => {
    return `grid-size-item ${
      gemstoneColor === color ? "col-size-selected" : ""
    }`;
  };

  const onClickSelectedClarity = (clarity) => {
    setGemstoneClarity(clarity);
  };

  const getClassNamesClarity = (clarity) => {
    return `grid-size-item ${
      gemstoneClarity === clarity ? "col-size-selected" : ""
    }`;
  };

  const getCaratRange = (carat) => {
    const caratRanges = {
      "0.3-0.49": { caratMin: 0.3, caratMax: 0.49 },
      "0.50-0.89": { caratMin: 0.5, caratMax: 0.89 },
      "0.90-1.29": { caratMin: 0.9, caratMax: 1.29 },
      "1.3-1.9": { caratMin: 1.3, caratMax: 1.9 },
      "2.0-3.0": { caratMin: 2.0, caratMax: 3.0 },
      "more-than-3.0": { caratMin: 3.0, caratMax: Infinity }, // Assuming API handles this case
    };

    return caratRanges[carat] || { caratMin: 0, caratMax: Infinity };
  };

  const fetchGemstones = async () => {
    let query = [];

    if (shape) {
      query.push(`shape=${shape}`);
    }

    let sizeParam = gemstoneSize;
    if (gemstoneSize !== "all") {
      sizeParam = parseFloat(gemstoneSize); // Assuming gemstoneSize is already in the correct format
      query.push(`size=${sizeParam}`);
    }

    if (gemstoneType) {
      query.push(`categoryName=${gemstoneType}`);
    }

    if (gemstoneColor !== "all") {
      query.push(`colors=${gemstoneColor}`);
    }

    if (gemstoneClarity !== "all") {
      query.push(`clarity=${gemstoneClarity}`);
    }

    if (gemstoneCaratMin !== "all" && gemstoneCaratMax !== "all") {
      query.push(`caraMin=${gemstoneCaratMin}`);
      query.push(`caraMax=${gemstoneCaratMax}`);
    }

    const queryString = query.length ? `?${query.join("&")}` : "";

    try {
      const url = `http://localhost:5266/api/Gemstones${
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
  }, [
    shape,
    gemstoneSize,
    gemstoneType,
    gemstoneColor,
    gemstoneClarity,
    gemstoneCaratMin,
    gemstoneCaratMax,
  ]);

  const onClickSelectedCarat = (carat) => {
    const { caratMin, caratMax } = getCaratRange(carat);
    setGemstoneCaratMin(caratMin);
    setGemstoneCaratMax(caratMax);
  };

  const getClassNamesCarat = (carat) => {
    const { caratMin, caratMax } = getCaratRange(carat);
    if (gemstoneCaratMin === caratMin && gemstoneCaratMax === caratMax) {
      return `grid-size-item col-size-selected`;
    }
    return `grid-size-item`;
  };

  const gold = [
    { value: "Gold 9999", label: "Gold 9999" },
    { value: "Gold 999.9", label: "Gold 999.9" },
    { value: "Gold 24k", label: "Gold 24k" },
    { value: "Gold 99", label: "Gold 99" },
    { value: "Gold 18k", label: "Gold 18k" },
    { value: "White 16k", label: "White 16k" },
    { value: "Gold 15k", label: "Gold 15k" },
    { value: "Italy 10k", label: "Italy 10k" },
    // Add more options here
  ];

  const Size = [
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },

    // Add more options here
  ];

  const typeStyles = {
    Ring: ["solitaire", "three stone", "pave"],
    Bracelet: ["chain", "pearl", "bar"],
    Necklace: ["chain", "pearl", "station", "initial"],
    Earrings: ["stud", "jacket", "ear spike"],
  };

  const gemstonesPerPage = 5;

  const totalMainPages = Math.ceil(gemstones.length / gemstonesPerPage);
  const totalSidePages = Math.ceil(gemstones.length / gemstonesPerPage);

  const handleMainPageChange = (page) => {
    setCurrentMainPage(page);
  };

  const handleSidePageChange = (page) => {
    setCurrentSidePage(page);
  };

  const indexOfLastMainGemstone = currentMainPage * gemstonesPerPage;
  const indexOfFirstMainGemstone = indexOfLastMainGemstone - gemstonesPerPage;
  const currentMainGemstones = gemstones.slice(
    indexOfFirstMainGemstone,
    indexOfLastMainGemstone
  );

  const indexOfLastSideGemstone = currentSidePage * gemstonesPerPage;
  const indexOfFirstSideGemstone = indexOfLastSideGemstone - gemstonesPerPage;
  const currentSideGemstones = gemstones.slice(
    indexOfFirstSideGemstone,
    indexOfLastSideGemstone
  );

  const createCustomizeRequest = async (customize) => {
    try {
      const response = await axios.post(
        "http://localhost:5266/api/CustomerRequests",
        customize
      );
      return response.data;
    } catch (error) {
      // Xử lý lỗi từ server nếu có
      if (error.response) {
        // Xử lý lỗi từ server nếu có
        if (error.response) {
          console.error("Server responded with error:", error.response.data);

          // In ra các lỗi validation từ server
          if (error.response.data.errors) {
            Object.keys(error.response.data.errors).forEach((key) => {
              console.error(`${key}: ${error.response.data.errors[key]}`);
            });
          }
        } else {
          console.error("Error create Customize Request:", error.message);
        }
      }
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    // Giải mã token để lấy customerId
    const decodedToken = jwtDecode(user.token);
    const customerId = decodedToken.sid; // hoặc trường tương ứng trong token

    const newCustomizeRequest = {
      customerId: customerId,
      type: type,
      style: style,
      size: size,
      quantity: quantity,
      goldType: goldType,
      PrimaryGemstoneId: PrimaryGemstoneId,
      AdditionalGemstone: AdditionalGemstone,
      status: status, // Gán giá trị rỗng cho status nếu không có dữ liệu
      primaryGemstone: {
        name: primaryGemstone.name || "", // Gửi giá trị mặc định nếu không có primaryGemstone
        color: primaryGemstone.color || "",
        cut: primaryGemstone.cut || "",
        clarity: primaryGemstone.clarity || "",
      },
    };
    // Call the function to create the request
    createCustomizeRequest(newCustomizeRequest);
    // Xử lý kết quả từ server nếu cần
    console.log("Create Customize Request successful:", newCustomizeRequest);
  };

  const fetchRecommendations = async () => {
    try {
      // Tạo object chứa các query parameters
      const params = {
        type: type || undefined,
        style: style || undefined,
        goldType: goldType || undefined,
      };

      // Xây dựng URL với query parameters
      const url = new URL(
        "http://localhost:5266/api/ProductSamples/getrecommend"
      );
      Object.keys(params).forEach(
        (key) =>
          params[key] !== undefined && url.searchParams.append(key, params[key])
      );

      console.log("Sending POST request to URL:", url.toString());

      // Gửi request POST với query parameters trong URL và payload trống
      const response = await axios.post(url.toString(), {});

      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        // Server đã phản hồi với trạng thái khác 200
        console.error("Server phản hồi với lỗi:", error.response.data);
      } else if (error.request) {
        // Đã gửi request nhưng không nhận được phản hồi
        console.error("Không nhận được phản hồi:", error.request);
      } else {
        // Có sự cố xảy ra trong quá trình thiết lập request
        console.error("Lỗi khi thiết lập request:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [type, style, goldType]);

  useEffect(() => {
    setStyles(type ? typeStyles[type] : []);
    // Reset style khi type thay đổi
  }, [type]);

  return (
    <div className="customizer-container">
      <main className="main-content">
        <form className="CUS" onSubmit={handleCreate}>
          <h1 className="title">Customize Your Jewelry</h1>
          <h2 className="subtitle">{type && <p>Selected Item: {type} </p>}</h2>
          <div className="customize-options-wrapper">
            <div className="customize-options">
              <div className="option-section">
                <div className="style">
                  <h3>STYLE</h3>
                  <div className="options-grid">
                    <select
                      value={style}
                      onChange={(e) => {
                        setselectedStyle(e.target.value);
                      }}
                      disabled={!type}
                    >
                      {styles.map((styleOption) => {
                        return (
                          <option key={styleOption} value={styleOption}>
                            {styleOption}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="gold">
                  <h3>GOLD</h3>
                  <div className="options-grid">
                    <select
                      value={goldType}
                      onChange={(e) => setselectedGold(e.target.value)}
                    >
                      {gold.map((gold) => (
                        <option key={gold.value} value={gold.value}>
                          {gold.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="option-section">
                <div className="size">
                  <h3>SIZE</h3>
                  <div className="options-grid">
                    <select
                      value={size}
                      onChange={(e) => setselectedSize(e.target.value)}
                    >
                      {Size.map((Size) => (
                        <option key={Size.value} value={Size.value}>
                          {Size.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="quantity">
                  <h3>QUANTITY</h3>
                  <div className="options-grid">
                    <input
                      className="input-quantity"
                      type="number"
                      min="1"
                      max="20"
                      value={quantity}
                      onChange={(e) => setselectedQuantity(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="tiltegemstone">
                <h3>GEMSTONE</h3>
              </div>

              <div className="option-section">
                <div className="shape">
                  <h3 className="left-aligned-heading">SHAPE</h3>
                  <div className="grid-cols-5">
                    <div
                      id="round"
                      className={getClassNamesShape("round")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-danh-1.png?v=5351" />
                    </div>
                    <div
                      id="emerald"
                      className={getClassNamesShape("emerald")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-5.png?v=5351" />
                    </div>
                    <div
                      id="marquise"
                      className={getClassNamesShape("marquise")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-8.png?v=5351" />
                    </div>
                    <div
                      id="princess"
                      className={getClassNamesShape("princess")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-2.png?v=5351" />
                    </div>
                    <div
                      id="radiant"
                      className={getClassNamesShape("radiant")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-10.png?v=5351" />
                    </div>
                    <div
                      id="heart"
                      className={getClassNamesShape("heart")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-6.png?v=5351" />
                    </div>
                    <div
                      id="pear"
                      className={getClassNamesShape("pear")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-7.png?v=5351" />
                    </div>
                    <div
                      id="cushion"
                      className={getClassNamesShape("cushion")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-3.png?v=5351" />
                    </div>
                    <div
                      id="trillion"
                      className={getClassNamesShape("trillion")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-9.png?v=5351" />
                    </div>
                    <div
                      id="oval"
                      className={getClassNamesShape("oval")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-4.png?v=5351" />
                    </div>
                  </div>
                </div>

                <div className="quantity">
                  <h3 className="left-aligned-heading">SIZE</h3>
                  <div className="grid-size-carat">
                    <div
                      id="all"
                      className={getClassNames("all")}
                      onClick={() => onClickSelectedGemstoneSize("all")}
                    >
                      All
                    </div>
                    <div
                      id="4.5"
                      className={getClassNames("4.5")}
                      onClick={() => onClickSelectedGemstoneSize("4.5")}
                    >
                      4.5
                    </div>
                    <div
                      id="5.0"
                      className={getClassNames("5.0")}
                      onClick={() => onClickSelectedGemstoneSize("5.0")}
                    >
                      5.0
                    </div>
                    <div
                      id="5.4"
                      className={getClassNames("5.4")}
                      onClick={() => onClickSelectedGemstoneSize("5.4")}
                    >
                      5.4
                    </div>
                    <div
                      id="6.0"
                      className={getClassNames(".0")}
                      onClick={() => onClickSelectedGemstoneSize("6.0")}
                    >
                      6.0
                    </div>
                    <div
                      id="6.3"
                      className={getClassNames("6.3")}
                      onClick={() => onClickSelectedGemstoneSize("6.3")}
                    >
                      6.3
                    </div>
                    <div
                      id="6.5"
                      className={getClassNames("6.5")}
                      onClick={() => onClickSelectedGemstoneSize("6.5")}
                    >
                      6.5
                    </div>
                    <div
                      id="6.8"
                      className={getClassNames("6.8")}
                      onClick={() => onClickSelectedGemstoneSize("6.8")}
                    >
                      6.8
                    </div>
                    <div
                      id="7.2"
                      className={getClassNames("7.2")}
                      onClick={() => onClickSelectedGemstoneSize("7.2")}
                    >
                      7.2
                    </div>
                    <div
                      id="8.1"
                      className={getClassNames("8.1")}
                      onClick={() => onClickSelectedGemstoneSize("8.1")}
                    >
                      8.1
                    </div>
                    <div
                      id="9.0"
                      className={getClassNames("9.0")}
                      onClick={() => onClickSelectedGemstoneSize("9.0")}
                    >
                      9.0
                    </div>
                  </div>
                </div>
              </div>

              <div className="option-section">
                <div className="gemstonetype">
                  <h3 className="left-aligned-heading">TYPE</h3>
                  <div className="grid-type-gemstone">
                    <div
                      id="diamond"
                      className={getClassNamesType("diamond")}
                      onClick={() => onClickSelectedGemstoneType("diamond")}
                    >
                      Diamond
                    </div>
                    <div
                      id="emerald"
                      className={getClassNamesType("emerald")}
                      onClick={() => onClickSelectedGemstoneType("emerald")}
                    >
                      Emerald
                    </div>
                    <div
                      id="ruby "
                      className={getClassNamesType("ruby")}
                      onClick={() => onClickSelectedGemstoneType("ruby")}
                    >
                      Ruby
                    </div>
                    <div
                      id="sapphire  "
                      className={getClassNamesType("sapphire")}
                      onClick={() => onClickSelectedGemstoneType("sapphire")}
                    >
                      Sapphire
                    </div>
                    <div
                      id="pearl"
                      className={getClassNamesType("pearl")}
                      onClick={() => onClickSelectedGemstoneType("pearl")}
                    >
                      Pearl
                    </div>
                  </div>
                </div>

                <div className="color-selector">
                  <h3 className="left-aligned-heading">COLORS</h3>
                  <div className="grid-color-carat">
                    <div
                      id="all"
                      className={getClassNamesColor("all")}
                      onClick={() => onClickSelectedGemstoneColor("all")}
                    >
                      All
                    </div>
                    <div
                      id="white"
                      className={getClassNamesColor("white")}
                      onClick={() => onClickSelectedGemstoneColor("white")}
                    >
                      White
                    </div>
                    <div
                      id="yellow"
                      className={getClassNamesColor("yellow")}
                      onClick={() => onClickSelectedGemstoneColor("yellow")}
                    >
                      Yellow
                    </div>
                    <div
                      id="blue"
                      className={getClassNamesColor("blue")}
                      onClick={() => onClickSelectedGemstoneColor("blue")}
                    >
                      Blue
                    </div>
                    <div
                      id="pink"
                      className={getClassNamesColor("pink")}
                      onClick={() => onClickSelectedGemstoneColor("pink")}
                    >
                      Pink
                    </div>
                    <div
                      id="red"
                      className={getClassNamesColor("red")}
                      onClick={() => onClickSelectedGemstoneColor("red")}
                    >
                      Red
                    </div>
                    <div
                      id="green"
                      className={getClassNamesColor("green")}
                      onClick={() => onClickSelectedGemstoneColor("green")}
                    >
                      Green
                    </div>
                    <div
                      id="black"
                      className={getClassNamesColor("black")}
                      onClick={() => onClickSelectedGemstoneColor("black")}
                    >
                      Black
                    </div>
                    <div
                      id="cream"
                      className={getClassNamesColor("cream")}
                      onClick={() => onClickSelectedGemstoneColor("cream")}
                    >
                      Cream
                    </div>
                    <div
                      id="orange"
                      className={getClassNamesColor("orange")}
                      onClick={() => onClickSelectedGemstoneColor("orange")}
                    >
                      Orange
                    </div>
                    <div
                      id="purple"
                      className={getClassNamesColor("purple")}
                      onClick={() => onClickSelectedGemstoneColor("purple")}
                    >
                      Purple
                    </div>
                    <div
                      id="colorless"
                      className={getClassNamesColor("colorless")}
                      onClick={() => onClickSelectedGemstoneColor("colorless")}
                    >
                      Colorless
                    </div>
                  </div>
                </div>
              </div>
              <div className="option-section">
                <div className="clarity-selector">
                  <h3 className="left-aligned-heading">CLARITY</h3>
                  <div className="grid-clarity-carat">
                    <div
                      id="all"
                      className={getClassNamesClarity("all")}
                      onClick={() => onClickSelectedClarity("all")}
                    >
                      All
                    </div>
                    <div
                      id="FL"
                      className={getClassNamesClarity("FL")}
                      onClick={() => onClickSelectedClarity("FL")}
                    >
                      FL
                    </div>
                    <div
                      id="IF"
                      className={getClassNamesClarity("IF")}
                      onClick={() => onClickSelectedClarity("IF")}
                    >
                      IF
                    </div>
                    <div
                      id="VVS1"
                      className={getClassNamesClarity("VVS1")}
                      onClick={() => onClickSelectedClarity("VVS1")}
                    >
                      VVS1
                    </div>
                    <div
                      id="VVS2"
                      className={getClassNamesClarity("VVS2")}
                      onClick={() => onClickSelectedClarity("VVS2")}
                    >
                      VVS2
                    </div>
                    <div
                      id="VS1"
                      className={getClassNamesClarity("VS1")}
                      onClick={() => onClickSelectedClarity("VS1")}
                    >
                      VS1
                    </div>
                    <div
                      id="VS2"
                      className={getClassNamesClarity("VS2")}
                      onClick={() => onClickSelectedClarity("VS2")}
                    >
                      VS2
                    </div>
                    <div
                      id="SI1"
                      className={getClassNamesClarity("SI1")}
                      onClick={() => onClickSelectedClarity("SI1")}
                    >
                      SI1
                    </div>
                    <div
                      id="SI2"
                      className={getClassNamesClarity("SI2")}
                      onClick={() => onClickSelectedClarity("SI2")}
                    >
                      SI2
                    </div>
                  </div>
                </div>
                <div className="carat-selector">
                  <h3 className="left-aligned-heading">CARAT</h3>
                  <div className="grid-carat-carat">
                    <div
                      id="all"
                      className={getClassNamesCarat("all")}
                      onClick={() => onClickSelectedCarat("all")}
                    >
                      All
                    </div>
                    <div
                      id="0.3-0.49"
                      className={getClassNamesCarat("0.3-0.49")}
                      onClick={() => onClickSelectedCarat("0.3-0.49")}
                    >
                      0.3 - 0.49
                    </div>
                    <div
                      id="0.50-0.89"
                      className={getClassNamesCarat("0.50-0.89")}
                      onClick={() => onClickSelectedCarat("0.50-0.89")}
                    >
                      0.50 - 0.89
                    </div>
                    <div
                      id="0.90-1.29"
                      className={getClassNamesCarat("0.90-1.29")}
                      onClick={() => onClickSelectedCarat("0.90-1.29")}
                    >
                      0.90 - 1.29
                    </div>
                    <div
                      id="1.3-1.9"
                      className={getClassNamesCarat("1.3-1.9")}
                      onClick={() => onClickSelectedCarat("1.3-1.9")}
                    >
                      1.3 - 1.9
                    </div>
                    <div
                      id="2.0-3.0"
                      className={getClassNamesCarat("2.0-3.0")}
                      onClick={() => onClickSelectedCarat("2.0-3.0")}
                    >
                      2.0 - 3.0
                    </div>
                    <div
                      id="more-than-3.0"
                      className={getClassNamesCarat("more-than-3.0")}
                      onClick={() => onClickSelectedCarat("more-than-3.0")}
                    >
                      More than 3.0
                    </div>
                  </div>
                </div>
              </div>

              <div className="option-section">
                <div className="tablegemstone">
                  <h2>Gemstone Information</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Clarity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMainGemstones.map((gemstone) => (
                        <tr
                          key={gemstone.gemstoneId}
                          onClick={() => selectMainStone(gemstone)}
                          style={{
                            backgroundColor:
                              PrimaryGemstone &&
                              PrimaryGemstone.gemstoneId === gemstone.gemstoneId
                                ? "#d3f4ff"
                                : "transparent",
                          }}
                        >
                          <td>{gemstone.gemstoneId}</td>
                          <td>{gemstone.name}</td>
                          <td>{gemstone.size}</td>
                          <td>{gemstone.color}</td>
                          <td>{gemstone.clarity}</td>
                          <td>{gemstone.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    {Array.from(
                      { length: totalMainPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <span
                        key={page}
                        className={`page-node ${
                          page === currentMainPage ? "current" : ""
                        }`}
                        onClick={() => handleMainPageChange(page)}
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="option-section">
                <div className="tablegemstone">
                  <h2>Side Stones Information</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Clarity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSideGemstones.map((gemstone) => (
                        <tr
                          key={gemstone.gemstoneId}
                          onClick={() => selectSideStone(gemstone)}
                          style={{
                            backgroundColor: selectedSideStones.some(
                              (stone) =>
                                stone.gemstoneId === gemstone.gemstoneId
                            )
                              ? "#ffd3d3"
                              : "transparent",
                          }}
                        >
                          <td>{gemstone.gemstoneId}</td>
                          <td>{gemstone.name}</td>
                          <td>{gemstone.size}</td>
                          <td>{gemstone.color}</td>
                          <td>{gemstone.clarity}</td>
                          <td>{gemstone.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    {Array.from(
                      { length: totalSidePages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <span
                        key={page}
                        className={`page-node ${
                          page === currentSidePage ? "current" : ""
                        }`}
                        onClick={() => handleSidePageChange(page)}
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="option-section">
                <div className="selected-stones">
                  <h2>Selected Stones</h2>
                  <div>
                    <strong>Main Stone:</strong>{" "}
                    {PrimaryGemstone ? PrimaryGemstone.name : "None"}
                  </div>
                  <div>
                    <strong>Side Stones:</strong>{" "}
                    {selectedSideStones.length > 0
                      ? selectedSideStones.map((stone) => stone.name).join(", ")
                      : "None"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="create-button">Create your model</button>
        </form>

        <div className="divider"></div>

        <div className="products">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <ul>
              {products.slice(0, visibleProducts).map((product) => (
                <div
                  className="product-card"
                  key={product.productSampleId}
                  onClick={() =>
                    navigateToProductDetail(product.productSampleId)
                  } // Chuyển hướng khi nhấp vào sản phẩm
                >
                  <img
                    src={require(`../Assets/${product.image}.jpg`)}
                    alt={product.productName}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.productName}</h3>
                  <p className="product-price">
                    {parseInt(product.price).toLocaleString()} VND
                  </p>
                </div>
              ))}
            </ul>
          )}
        </div>

        <button className="view-more-button" onClick={handleViewMore}>
          View More
        </button>
      </main>
    </div>
  );
}

export default CustomizeForm;
