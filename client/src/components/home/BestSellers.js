import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1); //default page
  const [prodPerPage] = useState(3);

  //this useEffect has higher priority
  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //(sort, order, limit)
    getProducts("sold", "desc", page, prodPerPage)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {/* {productsCount} */}
      <div className="container">
        {loading ? (
          <LoadingCard count={prodPerPage} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-4 p-3">
          <Pagination
            current={page}
            total={(productsCount / prodPerPage) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
