import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { apiClient } from "../config/service";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); //
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(type || "All");
  const [search, setSearch] = useState("");

  const requestData = async () => {
    if (filter == "All") {
      if (search) {
        const { data } = await apiClient.get(`product/search/${search}`);
        setProducts(data.metaData);
      } else {
        const { data } = await apiClient.get(`product`);
        setProducts(data.metaData);
      }
    } else {
      if (search) {
        const { data } = await apiClient.get(`product/search/${search}`);
        setProducts(data.metaData.filter((i) => i.product_type == filter));
      } else {
        const { data } = await apiClient.get(`product/type/${filter}`);
        setProducts(data.metaData.filter((i) => i.product_type == filter));
      }
    }
  };
  useWindowScrollToTop();
  useEffect(() => {
    requestData();
  }, [filter, search]);
  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              {/* <FilterSelect setFilter={setFilter} filter={filter} /> */}
            </Col>
            <Col md={8}>
              <SearchBar setSearch={setSearch} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={products} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
