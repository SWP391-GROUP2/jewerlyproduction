import React, { useState, useEffect, useRef } from 'react';
import './ProductDetails.css';
import DetailsThumb from "../../components/Thumb/DetailsThumb";

function ProductDetails() {
  const [products] = useState([
    {
      _id: "1",
      title: "Diamond Ring",
      src: [
        "https://cdn.pnj.io/images/detailed/112/gnddddw001592-nhan-kim-cuong-vang-trang-14k-pnj-1.png",
        "https://cdn.pnj.io/images/detailed/112/gnddddw001592-nhan-kim-cuong-vang-trang-14k-pnj-2.png",
        "https://cdn.pnj.io/images/detailed/112/gnddddw001592-nhan-kim-cuong-vang-trang-14k-pnj-3.png",
        "https://cdn.pnj.io/images/detailed/112/gnddddw001592-nhan-kim-cuong-vang-trang-14k-pnj-4.jpg"
      ],
      description: "A beautiful diamond ring",
      content: "High quality diamond ring",
      price: 2300,
     
      
    }
  ]);
  const [index, setIndex] = useState(0);
  const myRef = useRef();

  useEffect(() => {
    myRef.current.children[index].className = "active";
  }, [index]);

  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  return (
    
    <div className="ProductDetails">
      {products.map((item) => (
        <div className="details" key={item._id}>
          <div className="big-img">
            <img src={item.src[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{item.title}</h2>
              <span>${item.price}</span>
            </div>

            <p>{item.description}</p>
            <p>{item.content}</p>

            <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />
            <button className="cart">Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductDetails;




// import React, { useState, useEffect, useRef } from 'react';
// import './ProductDetails.css';
// import DetailsThumb from "../../components/Thumb/DetailsThumb";

// function ProductDetails() {
//   const [products, setProducts] = useState([]);
//   const [index, setIndex] = useState(0);
//   const myRef = useRef();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (myRef.current && myRef.current.children.length > 0) {
//       const images = myRef.current.children;
//       for (let i = 0; i < images.length; i++) {
//         if (i === index) {
//           images[i].className = "active";
//         } else {
//           images[i].className = "";
//         }
//       }
//     }
//   }, [index]);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('https://example.com/api/products');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleTab = (index) => {
//     setIndex(index);
//   };

//   return (
//     <div className="ProductDetails">
//       {products.map((item) => (
//         <div className="details" key={item._id}>
//           <div className="big-img">
//             <img src={item.src[index]} alt="" />
//           </div>

//           <div className="box">
//             <div className="row">
//               <h2>{item.title}</h2>
//               <span>${item.price}</span>
//             </div>

//             <p>{item.description}</p>
//             <p>{item.content}</p>

//             <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />
//             <button className="cart">Add to cart</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductDetails;
