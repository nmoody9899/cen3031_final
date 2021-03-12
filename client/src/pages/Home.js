import React from "react";
// import { getProducts } from "../functions/product";
// import ProductCard from "../components/cards/ProductCard";
// import LoadingCard from "../components/cards/LoadingCard";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/subcategory/SubCategoryList";
import BrandList from "../components/brand/BrandList";

const Home = () => {
  //const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const loadAllProducts = () => {
  //   setLoading(true);
  //   //(sort, order, limit)
  //   getProducts("createdAt", "desc", 6)
  //     .then((res) => {
  //       setLoading(false);
  //       setProducts(res.data);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   loadAllProducts();
  // }, []);

  return (
    <>
      {/* <div className="jumbotron">
        {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
      </div> */}
      <div className="jumbotron font-weight-bold text-center">
        <Jumbotron />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>

      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>

      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>

      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>

      <SubCategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Brands</h4>

      <BrandList />

      <br />
      <br />

      {/* <div className="container">
        {loading ? (
          <LoadingCard count={6} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div> */}
    </>
  );
};

export default Home;
