import React, { useEffect, useState } from "react";
import "./CustomizeForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Notify from "../Alert/Alert";

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
  const [gemstoneClarity, setGemstoneClarity] = useState("all");
  const [gemstoneCaratMin, setGemstoneCaratMin] = useState("all");
  const [gemstoneCaratMax, setGemstoneCaratMax] = useState("all");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để chuyển hướng
  const [styles, setStyles] = useState([]);
  const [quantitys, setQuantity] = useState([]);
  const [ProductSample, setProductSample] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [gemstones, setGemstones] = useState([]);

  const [PrimaryGemstonesId, setPrimaryGemstoneId] = useState("");
  const [PrimarySencondGemstoneId, setPrimarySencondGemstoneId] = useState("");
  const [AdditionalGemstone, setAdditionalGemstoneIds] = useState([]);
  const [PrimaryGemstone, setSelectedMainStone] = useState(null);
  const [PrimarySecondGemstone, setSelectedSencondMainStone] = useState(null);
  const [selectedSideStones, setSelectedSideStones] = useState([]);
  const [currentMainPage, setCurrentMainPage] = useState(1);
  const [currentSecondMainPage, setCurrentSecondMainPage] = useState(1);
  const [currentSidePage, setCurrentSidePage] = useState(1);
  const [PrimaryGemstoneId, setSelectedStones] = useState(["", ""]);

  const user = useSelector((State) => State.auth.Login.currentUser);

  const selectMainStone = (gemstone) => {
    setSelectedMainStone(gemstone);
    setPrimaryGemstoneId(gemstone.gemstoneId);
    // Nếu chọn trùng với đá quý phụ, reset đá quý phụ
    if (PrimarySencondGemstoneId === gemstone.gemstoneId) {
      setSelectedSencondMainStone(null);
      setPrimarySencondGemstoneId("");
    }
    setSelectedStones([gemstone.gemstoneId, PrimaryGemstoneId[1]]);
  };

  const selectSencondMainStone = (gemstone) => {
    setSelectedSencondMainStone(gemstone);
    setPrimarySencondGemstoneId(gemstone.gemstoneId);
    setSelectedStones([PrimaryGemstoneId[0], gemstone.gemstoneId]);
  };

  useEffect(() => {
    console.log("select Main Stone ", PrimaryGemstonesId);
    console.log("select Second Stone ", PrimarySencondGemstoneId);
  }, [PrimaryGemstonesId, PrimarySencondGemstoneId]);

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
          `https://nbjewelrybe.azurewebsites.net/api/ProductSamples/${productId}`
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
      if (ProductSample.type) {
        setselectedType(ProductSample.type);
      }
      if (ProductSample.style) {
        setselectedStyle(ProductSample.style);
      }
      if (ProductSample.goldType) {
        setselectedGold(ProductSample.goldType);
      }
      if (ProductSample.size) {
        setselectedSize(ProductSample.size);
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

    if (gemstoneClarity !== "all") {
      query.push(`clarity=${gemstoneClarity}`);
    }

    if (gemstoneCaratMin !== "all" && gemstoneCaratMax !== "all") {
      query.push(`caraMin=${gemstoneCaratMin}`);
      query.push(`caraMax=${gemstoneCaratMax}`);
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
  }, [
    shape,
    gemstoneSize,
    gemstoneType,
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
    Bracelet: ["chain", "Charm", "bar"],
    Necklace: ["chain", "station", "initial"],
    Earrings: ["stud", "jacket", "ear spike"],
  };
  const typeQuantitys = {
    Ring: ["1"],
    Bracelet: ["1"],
    Necklace: ["1"],
    Earrings: ["2"],
  };

  const gemstonesPerPage = 5;

  const filteredGemstones = gemstones.filter((gemstone) => {
    // Filter out the primary gemstone and gemstones with non-null productSampleID or customizeRequestID
    return (
      gemstone.gemstoneId !==
        (PrimaryGemstone ? PrimaryGemstone.gemstoneId : null) &&
      gemstone.productSampleId === null &&
      gemstone.customizeRequestId === null
    );
  });

  const filteredMainGemstones = gemstones.filter((gemstone) => {
    // Filter out the primary gemstone and gemstones with non-null productSampleID or customizeRequestID
    return (
      gemstone.productSampleId === null &&
      gemstone.customizeRequestId === null &&
      gemstone.categoryId !== "C005"
    );
  });

  const filteredSideGemstones = gemstones.filter((gemstone) => {
    // Filter out the primary gemstone and gemstones with non-null productSampleID or customizeRequestID
    return (
      gemstone.gemstoneId !==
        (PrimaryGemstone ? PrimaryGemstone.gemstoneId : null) &&
      gemstone.categoryId === "C005" &&
      gemstone.productSampleId === null &&
      gemstone.customizeRequestId === null
    );
  });

  const totalMainPages = Math.ceil(
    filteredMainGemstones.length / gemstonesPerPage
  );
  const totalMainPagessecond = Math.ceil(
    filteredGemstones.length / gemstonesPerPage
  );
  const totalSidePages = Math.ceil(
    filteredSideGemstones.length / gemstonesPerPage
  );

  const indexOfLastMainGemstone = currentMainPage * gemstonesPerPage;
  const indexOfFirstMainGemstone = indexOfLastMainGemstone - gemstonesPerPage;
  const currentMainGemstones = filteredMainGemstones.slice(
    indexOfFirstMainGemstone,
    indexOfLastMainGemstone
  );

  const indexOfLastSecondMainGemstone =
    currentSecondMainPage * gemstonesPerPage;
  const indexOfFirsSecondtMainGemstone =
    indexOfLastSecondMainGemstone - gemstonesPerPage;
  const currentSecondMainGemstones = filteredGemstones.slice(
    indexOfFirsSecondtMainGemstone,
    indexOfLastSecondMainGemstone
  );

  const indexOfLastSideGemstone = currentSidePage * gemstonesPerPage;
  const indexOfFirstSideGemstone = indexOfLastSideGemstone - gemstonesPerPage;
  const currentSideGemstones = filteredSideGemstones.slice(
    indexOfFirstSideGemstone,
    indexOfLastSideGemstone
  );

  const handleMainPageChange = (page) => {
    setCurrentMainPage(page);
  };

  const handleMainPageSecondChange = (page) => {
    if (page >= 1 && page <= totalMainPagessecond) {
      setCurrentSecondMainPage(page);
    }
  };

  // Nếu trang hiện tại vượt quá số trang mới, đặt lại về trang đầu tiên
  if (
    currentSecondMainPage > totalMainPagessecond &&
    totalMainPagessecond > 0
  ) {
    setCurrentSecondMainPage(1);
  }

  const handleSidePageChange = (page) => {
    setCurrentSidePage(page);
  };

  const createCustomizeRequest = async (customize) => {
    try {
      const response = await axios.post(
        "https://nbjewelrybe.azurewebsites.net/api/CustomerRequests",
        customize
      );

      if (response) {
        console.log("Response:", response.data);
        Notify.success("Customize Request create successful!");
      } else {
        Notify.fail("Customize Request create failed!");
      }
    } catch (error) {
      Notify.fail("Customize Request create failed!");
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
        "https://nbjewelrybe.azurewebsites.net/api/ProductSamples/getrecommend"
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
    setQuantity(type ? typeQuantitys[type] : []);
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
                      <option value="" disabled selected>
                        -- Choose a Style --
                      </option>
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
                      <option value="" disabled selected>
                        -- Choose a Gold Type --
                      </option>
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
                      <option value="" disabled selected>
                        -- Choose Size --
                      </option>
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
                      type="text"
                      value={quantitys}
                      onChange={(e) => setselectedQuantity(e.target.value)}
                      required
                      readOnly
                    />
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
                      id="oval"
                      className={getClassNamesShape("oval")}
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-4.png?v=5351" />
                    </div>
                  </div>
                </div>

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
                  </div>
                </div>
              </div>

              <div className="option-section">
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
                      className={getClassNames("6.0")}
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

              {type === "Earrings" && (
                <>
                  <div className="option-section">
                    <div className="tablegemstone">
                      <h2>Gemstone Second Information</h2>
                      <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Clarity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentSecondMainGemstones.map((gemstone) => (
                            <tr
                              key={gemstone.gemstoneId}
                              onClick={() => selectSencondMainStone(gemstone)}
                              style={{
                                backgroundColor:
                                  PrimarySecondGemstone &&
                                  PrimarySecondGemstone.gemstoneId ===
                                    gemstone.gemstoneId
                                    ? "#d3f4ff"
                                    : "transparent",
                              }}
                            >
                              <td>{gemstone.gemstoneId}</td>
                              <td>{gemstone.name}</td>
                              <td>{gemstone.size}</td>
                              <td>{gemstone.clarity}</td>
                              <td>{gemstone.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="pagination">
                        {Array.from(
                          { length: totalMainPagessecond },
                          (_, i) => i + 1
                        ).map((page) => (
                          <span
                            key={page}
                            className={`page-node ${
                              page === currentSecondMainPage ? "current" : ""
                            }`}
                            onClick={() => handleMainPageSecondChange(page)}
                          >
                            {page}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

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
