import React, { useState, useEffect } from "react";
import { Divider, Radio, Table, Button } from "antd";
import { apiClient } from "../../config/service";
import Card from "antd/es/card/Card";
import ModalAddProduct from "./ModalAddProduct";
import { toast } from "react-toastify";
const columns = [
  {
    title: "Name",
    dataIndex: "product_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Giá",
    dataIndex: "product_price",
  },
  {
    title: "Ảnh",
    dataIndex: "product_thumb",
    render: (src) => <img className="w-12 h-12 rounded" src={src} />,
  },
  {
    title: "Gỉam giá",
    dataIndex: "product_discount",
    render: (text) => <a>{`${text}%`}</a>,
  },
  {
    title: "Nội dung",
    dataIndex: "product_description",
  },
  {
    title: "Thể loại",
    dataIndex: "product_type",
  },
];

const Product = () => {
  const [open, setOpen] = useState({
    isOpen: false,
    type: "",
  });
  const [products, setProducts] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const requestData = async () => {
    const { data } = await apiClient.get("product");
    const product = data.metaData;
    setProducts(product.map((i) => ({ ...i, key: i._id })));
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const removeProduct = async () => {
    try {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        await apiClient.delete(`product/${selectedRowKeys[i]._id}`);
        toast.success("Xoá sản phẩm thành công");
      }
      requestData();
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    requestData();
  }, []);
  return (
    <div>
      <Card
        title="Sản phẩm"
        extra={
          <div>
            <Button
              className="mr-3"
              onClick={() =>
                setOpen({
                  isOpen: true,
                  type: "add",
                })
              }
            >
              Thêm sản phẩm
            </Button>
            <Button
              onClick={() => removeProduct()}
              disabled={selectedRowKeys.length == 0}
              className="mr-3"
            >
              Xoá sản phẩm
            </Button>
            <Button onClick={() => requestData()}>Làm mới </Button>
          </div>
        }
      >
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setOpen({
                  isOpen: record,
                  type: "edit",
                });
              }, // click row
            };
          }}
          dataSource={products}
        />
      </Card>
      <ModalAddProduct
        open={open}
        setOpen={(value) => {
          setOpen(value);
          requestData();
        }}
      />
    </div>
  );
};
export default Product;
