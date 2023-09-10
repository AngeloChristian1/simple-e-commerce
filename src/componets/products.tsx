import { useState, useEffect } from "react";
import "./products.css";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import heropic from "../images/cart2.png"
export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  count: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleAddToCart = (product: Product) => {
    const item: any = localStorage.getItem("product");
    let listOfProducts: any = [];
    console.log(JSON.parse(item));

    listOfProducts = JSON.parse(item);
    if (listOfProducts === null) {
      listOfProducts = [];
      listOfProducts.push(product);
    } else {
      let checkForDuplicate = listOfProducts.filter(
        (item: Product) => item.id === product.id
      );

      console.log(checkForDuplicate);
      if (checkForDuplicate.length < 1) {
        listOfProducts.push(product);
        alert("Product added to cart");
      } else {
        alert("Product already in cart");
      }
    }

    console.log(listOfProducts, product);
    localStorage.setItem("product", JSON.stringify(listOfProducts));
  };

  const [search, setSearch] = useState("");

  return (
    <div className="products-page">
      <div className="hero">
      <div className="header"><div className="shoppy">Shoppy.</div>
      <div className="links">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li> <div>
          <p className="cart">
            <Link to="/cart">
              <BsCart3 />
            </Link>
          </p>
        </div></li>
        </ul>
      </div>
      </div>
      <div className="content"> 
      <div className="text"> 
      <h2>Welcome to Shoppy!</h2>
      <p>Get the latest products in fashion and accessory on the market.</p>
      <p>Trusted by 400+ people in Rwanda.</p>
      <button type="button">SHOP NOW</button>
      </div>
      <div className="hero_image"> 
      <img src={heropic} alt="image" />
       </div>
      </div>
      <div className="nav">
       
        <div className="search-btn">
        <p>Search here:</p>
          <input
            className="search-field"
            type="search"
            placeholder="Search any product"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
       
      </div>

      </div>
      
      <div className="all-products">
        {products
          .filter((detail) => {
            return search.toLowerCase() === ""
              ? detail
              : detail.title.toLowerCase().includes(search);
          })
          .map((detail) => (
            <div className="product-detail" key={detail.id}>
              <div className="image-container">
                <img
                  src={detail.image}
                  alt="product"
                  
                />
              </div>
              <h1 className="title">{detail.title}</h1>
              <h3 className="category">{detail.category}</h3>
              {/* <p className="descri">{detail.description}</p> */}
              <h5 className="price">${detail.price}</h5>
              <div className="add_cart" onClick={() => handleAddToCart(detail)}>
                    <span>Add to Cart</span>
                  </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
