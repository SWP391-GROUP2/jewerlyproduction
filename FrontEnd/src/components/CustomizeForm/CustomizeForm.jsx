import React, { useEffect, useState } from "react";
import "./CustomizeForm.css";
import { useLocation } from "react-router-dom";

function CustomizeForm() {
  const location = useLocation();
  const { state } = location;
  const { item } = state || {}; // Lấy dữ liệu từ state
  const [type, setselectedType] = useState();
  const [style, setselectedStyle] = useState("");
  const [goldType, setselectedGold] = useState("");
  const [size, setselectedSize] = useState("");
  const [quantity, setselectedQuantity] = useState("1");
  const [shape, setShape] = useState("1");

  useEffect(() => {
    if (item) {
      setselectedType(item);
    }
  }, [item]);

  const onClickSelectedShape = (event) => {
    const element = event.currentTarget;
    const idValue = element.id;
    console.log(idValue);
    setShape(idValue);
  };

  const Style = [
    { value: "Solitaire", label: "Solitaire", Image: "" },
    { value: "Three Stone", label: "Three Stone", Image: "" },
    { value: "Pave", label: "Pave", Image: "" },
    // Add more options here
  ];

  const gold = [
    { value: "Gold 9999", label: "Gold 9999" },
    { value: "Gold 999", label: "Gold 999" },
    { value: "Gold 98", label: "Gold 98" },
    { value: "Gold 75", label: "Gold 75" },
    { value: "Gold 58.3", label: "Gold 58.3" },
    { value: "White Gold", label: "White Gold" },
    { value: "Gold 14k", label: "Gold 14k" },
    { value: "Italy Gold", label: "Italy Gold" },
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

  const handleCreate = (e) => {
    e.preventDefault();
    const newCustomizeRequest = {
      type: type,
      style: style,
      goldType: goldType,
      shape: shape,
    };
  };

  return (
    <div className="customizer-container">
      <main className="main-content">
        <form className="CUS" onSubmit={handleCreate}>
          <h1 className="title">Customize Your Jewelry</h1>
          <h2 className="subtitle">{item && <p>Selected Item: {item} </p>}</h2>
          <div className="customize-options-wrapper">
            <div className="customize-options">
              <div className="option-section">
                <div className="style">
                  <h3>STYLE</h3>
                  <div className="options-grid">
                    <select
                      value={style}
                      onChange={(e) => setselectedStyle(e.target.value)}
                    >
                      {Style.map((Style) => (
                        <option key={Style.value} value={Style.value}>
                          {Style.label}
                        </option>
                      ))}
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
                  <h3 class="left-aligned-heading">SHAPE</h3>
                  <div className="grid-cols-5">
                    <div
                      id="round"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-danh-1.png?v=5351" />
                    </div>
                    <div
                      id="emerald"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-5.png?v=5351" />
                    </div>
                    <div
                      id="marquise"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-8.png?v=5351" />
                    </div>
                    <div
                      id="princess"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-2.png?v=5351" />
                    </div>
                    <div
                      id="radiant"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-10.png?v=5351" />
                    </div>
                    <div
                      id="heart"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-6.png?v=5351" />
                    </div>
                    <div
                      id="pear"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-7.png?v=5351" />
                    </div>
                    <div
                      id="cushion"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-3.png?v=5351" />
                    </div>
                    <div
                      id="trillion"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-9.png?v=5351" />
                    </div>
                    <div
                      id="oval"
                      className="gemstoneShape"
                      onClick={onClickSelectedShape}
                    >
                      <img src="//theme.hstatic.net/200000567741/1000979581/14/hinh-dang-4.png?v=5351" />
                    </div>
                  </div>
                </div>

                <div className="quantity">
                  <h3>QUANTITY</h3>
                  <div className="grid-size-carat">
                    <div
                      id="all"
                      className="grid-size-item col-size-selected"
                      onclick="onClickSelectedOptionSize"
                    >
                      Tất cả
                    </div>
                    <div
                      id="45"
                      class="grid-kimcuong-item"
                      onclick="onClickSelectedOptionSize(this)"
                    >
                      4.5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="create-button">Create your model</button>
        </form>

        <div className="divider"></div>
        <div className="model-gallery">
          <div className="model-preview"></div>
          <div className="model-preview"></div>
          <div className="model-preview"></div>
          <div className="model-preview"></div>
        </div>
        <button className="view-more-button">View More</button>
      </main>
    </div>
  );
}

export default CustomizeForm;
