import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { VND } from "../utils/utils";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.product_price,
    0
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <div className="flex justify-center items-center">
                <svg
                  width="184"
                  height="152"
                  viewBox="0 0 184 152"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(24 31.67)">
                      <ellipse
                        fill-opacity=".8"
                        fill="#F5F5F7"
                        cx="67.797"
                        cy="106.89"
                        rx="67.797"
                        ry="12.668"
                      ></ellipse>
                      <path
                        d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        fill="#AEB8C2"
                      ></path>
                      <path
                        d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                        fill="url(#linearGradient-1)"
                        transform="translate(13.56)"
                      ></path>
                      <path
                        d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        fill="#F5F5F7"
                      ></path>
                      <path
                        d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        fill="#DCE0E6"
                      ></path>
                    </g>
                    <path
                      d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                      fill="#DCE0E6"
                    ></path>
                    <g transform="translate(149.65 15.383)" fill="#FFF">
                      <ellipse
                        cx="20.654"
                        cy="3.167"
                        rx="2.849"
                        ry="2.815"
                      ></ellipse>
                      <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path>
                    </g>
                  </g>
                </svg>
              </div>
            )}
            {cartList.map((item) => {
              const productQty = item.product_price * item.qty;
              return (
                <div className="cart-list rounded" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img
                        className="rounded"
                        src={item.product_thumb}
                        alt=""
                      />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.product_name}</h3>
                          {item.product_discount > 0 && (
                            <p className="mb-0 text-red-300 font-bold">{`Giảm giá : ${item.product_discount} %`}</p>
                          )}
                          <h4>
                            {VND.format(item.product_price)} * {item.qty}
                            <span>{VND.format(productQty)}</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Giỏ hàng của tôi</h2>
              <div className=" d_flex">
                <h4>Tổng tiền :</h4>
                <h3>{VND.format(totalPrice)}</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
