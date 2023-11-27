import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Categorys from "../components/categorys";
import { apiClient } from "../config/service";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productSales, setProductSale] = useState([]);
  const requestData = async () => {
    const { data } = await apiClient.get("product");
    const productSales = data.metaData.filter((i) => i.product_discount);
    const product = data.metaData.filter((i) => !i.product_discount);
    setProducts(product);
    setProductSale(productSales);
  };
  useWindowScrollToTop();
  useEffect(() => {
    requestData();
  }, []);
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      {/* <Categorys /> */}
      <Section
        title="Giảm giá lớn"
        bgColor="#f6f9fc"
        productItems={productSales}
      />
      <Section title="Gợi ý hôm nay" bgColor="white" productItems={products} />
      {/* <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} /> */}
    </Fragment>
  );
};

export default Home;
