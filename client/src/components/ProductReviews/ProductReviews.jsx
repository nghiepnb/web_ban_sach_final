import { Avatar, Button, Input, List } from "antd";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../../config/service";
import "./product-review.css";
const { TextArea } = Input;

const ProductReviews = ({}) => {
  const { id } = useParams();

  const [listSelected, setListSelected] = useState("desc");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [review, setReview] = useState("");

  const requestAddReviews = async () => {
    try {
      const { data } = await apiClient.patch(`product/${id}`, {
        product_review: review,
        product_type: selectedProduct.product_type,
        product_attribute: {
          manufacturer: "VN",
          model: "XLLM",
          color: "red",
        },
      });
      toast.success("Thêm bình luận thành công");
      setReview("");
      requestData();
    } catch (error) {
      toast.error(error);
    }
  };

  const requestData = async () => {
    const { data } = await apiClient.get(`product/${id}`);
    setSelectedProduct(data.metaData);
  };
  useEffect(() => {
    requestData();
  }, []);
  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({selectedProduct?.product_reviews?.length || 0})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p>{selectedProduct?.product_description}</p>
        ) : (
          <div className="rates">
            {selectedProduct?.product_reviews.map((rate) => (
              <div className="rate-comment" key={rate.rating}>
                <span>{rate}</span>
              </div>
            ))}

            <div>
              <TextArea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                placeholder="Thêm bình luận"
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={() => {
                    requestAddReviews();
                  }}
                  className=""
                >
                  Bình luận
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
