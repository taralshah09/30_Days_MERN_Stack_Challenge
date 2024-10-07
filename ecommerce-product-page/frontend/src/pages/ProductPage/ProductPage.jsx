import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`, {
          withCredentials: true,
        });
        setProduct(res.data.product);
        setProductImages(res.data.product.images || []);
        setCurrentImage(
          res.data.product.images[0] || res.data.product.thumbnail
        );
      } catch (err) {
        setError("Error fetching the product. Please try again later.");
        console.error("Error fetching the product with id: ", id, err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="product-page">
        {error && <div className="error-message">{error}</div>}
        <div className="img-section">
          <div className="main-img">
            <img src={currentImage} alt={product.title || "Product image"} />
          </div>
          <div className="img-feed">
            {productImages.map((image, index) => (
              <div
                className="img-box"
                key={index}
                onClick={() => handleImageClick(image)}
                style={{
                  border: ` ${currentImage === image ? "8px solid black" : "2px solid black"}`, // Example condition
                }}
              >
                <img
                  src={image}
                  alt={`Product thumbnail ${index}`}
                  className={currentImage === image ? "active" : ""}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="details-section">
          <h2>{product.title}</h2>
          <p className="price">{product.price}</p>
          <p className="desc">{product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
