import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import { apiClient } from "../../config/service";
import { toast } from "react-toastify";
const options = [
  { value: "Clothings", label: "Clothings" },
  { value: "Furniture", label: "Furniture" },
  { value: "Phone", label: "Phone" },
  { value: "Book", label: "Book" },
  { value: "Clock", label: "Clock" },
];
const ModalAddProduct = ({ open, setOpen }) => {
  console.log("open", open);
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen({
      isOpen: false,
      type: "",
    });
  };
  const onFinish = async (values) => {
    try {
      if (open.type == "edit") {
        const { data } = await apiClient.patch(`product/${open.isOpen._id}`, {
          ...values,
          product_type: "Book",
          product_attribute: {
            manufacturer: "VN",
            model: "XLLM",
            color: "red",
          },
        });
        toast.success("Sủa sản phẩm thành công");
      } else {
        const { data } = await apiClient.post("product", {
          ...values,
          product_type: "Book",
          product_attribute: {
            manufacturer: "VN",
            model: "XLLM",
            color: "red",
          },
        });
        toast.success("Tạo sản phẩm thành công");
      }
      setOpen({
        isOpen: false,
        type: "",
      });
    } catch (error) {
      toast.error("Tạo sản phẩm thành công");
      console.log("error", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => form.resetFields(), [open.isOpen]);
  return (
    <>
      <Drawer
        title={open.type == "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
        placement="right"
        onClose={onClose}
        open={open.isOpen}
      >
        <Form
          form={form}
          name="basic"
          initialValues={open.type == "edit" ? open.isOpen : {}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="product_name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập sản phẩm!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="product_thumb"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ảnh!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gía"
            name="product_price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="product_description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            name="product_discount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giảm giá!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="product_quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          {/* <Form.Item
            name="product_type"
            label="Thể loại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập the loai!",
              },
            ]}
          >
            <Select placeholder="Vui lòng chọn thể loại" allowClear>
              {options.map((item, idx) => {
                return (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                );
              })}
            </Select>
          </Form.Item> */}
          <Form.Item>
            <Button className="bg-blue-700" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default ModalAddProduct;
