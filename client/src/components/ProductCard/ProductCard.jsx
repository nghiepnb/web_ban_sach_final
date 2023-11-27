import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem._id}`);
  };
  const handelAdd = (productItem) => {
    if (!login.isLogged) {
      toast.error("Bạn cần đăng nhập để mua hàng");
      return;
    }
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Thêm vào giỏ hàng thành công");
  };
  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {productItem.product_discount ? (
        <span className="discount">
          {productItem?.product_discount || 30}% Off
        </span>
      ) : null}
      <a href={`/shop/${productItem._id}`}>
        <img
          loading="lazy"
          onClick={() => handelClick()}
          src={productItem.product_thumb}
          alt=""
        />
      </a>
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()} className="line-clamp-2	">
          {productItem.product_name}
        </h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>{VND.format(productItem.product_price)}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
