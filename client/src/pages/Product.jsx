import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { apiClient } from "../config/service";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [productSuggest, setProductSuggest] = useState([]);
  const requestData = async () => {
    const { data } = await apiClient.get(`product/${id}`);
    const { data: dataSuggest } = await apiClient.get(
      `product/type/${data.metaData.product_type}`
    );
    setProductSuggest(dataSuggest.metaData.filter((i) => i._id !== id));
    setProduct(data.metaData);
  };
  useEffect(() => {
    requestData();
  }, []);
  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={product?.product_name} />
      <ProductDetails selectedProduct={product} />
      <ProductReviews selectedProduct={product} />
      <section className="related-products">
        <Container>
          <h3>Các sản phẩm tương tự</h3>
        </Container>
        <ShopList productItems={productSuggest} />
      </section>
    </Fragment>
  );
};

export default Product;
