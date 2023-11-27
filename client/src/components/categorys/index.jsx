import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { serviceData } from "../../utils/products";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const Categorys = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mb-14">
      <div className="w-[1320px]">
        <div className="text-xl mb-2 font-semibold	">Danh mục</div>
        <div className="grid grid-cols-5 gap-3">
          {categoryList.map((item) => {
            return (
              <div
                key={item.name}
                onClick={() => navigate(`/shop?type=${item.type}`)}
                className="border border-solid flex flex-col justify-center items-center cursor-pointer p-3"
                style={{ background: item.bg }}
              >
                <img src={item.img} />
                <div className="font-semibold	">{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const categoryList = [
  {
    name: "Điện Thoại & Phụ Kiện",
    img:
      "https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca_tn",
    type: "Phone",
    bg: "#fdefe6",
  },
  {
    name: "Thời trang",
    img:
      "https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52_tn",
    type: "Clothings",
    bg: "#ceebe9",
  },
  {
    name: "Nội thất",
    img:
      "https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857_tn",
    type: "Furniture",
    bg: "#e2f2b2",
  },
  {
    name: "Sách",
    img:
      "https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139_tn",
    type: "Book",
    bg: "#d6e5fb",
  },
  {
    name: "Đồng hồ",
    img:
      "https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn",
    type: "Clock",
    bg: "#fdefe6",
  },
];
export default Categorys;
