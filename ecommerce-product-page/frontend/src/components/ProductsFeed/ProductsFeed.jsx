import React, { useEffect, useState } from "react";
import "./ProductsFeed.css";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsFeed = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products", { withCredentials: true })
      .then((res) => {
        setProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err.message);
        setError(err.message);
      });
  }, []);

  const notWantedThumbnails = [
    "https://cdn.dummyjson.com/products/images/beauty/Revlon%20Super%20Lustrous%20Lipstick/1.png",
    "https://cdn.dummyjson.com/products/images/beauty/Neutrogena%20Hydro%20Boost%20Water%20Gel/1.png",
    "https://cdn.dummyjson.com/products/images/beauty/LOreal%20Paris%20Voluminous%20Lash%20Paradise/1.png",
    "https://cdn.dummyjson.com/products/images/beauty/Maybelline%20Fit%20Me%20Foundation/1.png",
    "https://cdn.dummyjson.com/products/images/beauty/Clinique%20Even%20Better%20Makeup%20Foundation/1.png",
  ];
  return (
    <div id="products-feed">
      <h2>Products</h2>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`product/${product._id}`} className="product-link">
              <div key={product.id || Math.random()} className="product">
                <div className="img-box">
                  {/* <img src={product.images[0]==="https://cdn.dummyjson.com/products/images/beauty/Revlon%20Super%20Lustrous%20Lipstick/1.png" ? './public.webp' : product.images[0]} alt={product.title} /> */}
                  <img
                    src={
                      notWantedThumbnails.includes(product.images[0])
                        ? "./public.webp"
                        : product.images[0]
                    }
                    alt={product.title}
                  />
                </div>
                <div className="details-box">
                  <div className="block-one">
                    <p className="title">{product.title}</p>
                    <p className="price">{product.price || 15.99}</p>
                  </div>
                  <div className="block-two">
                    <p>
                      {product.description.length > 90
                        ? product.description.substring(0, 90) + "..."
                        : product.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductsFeed;
