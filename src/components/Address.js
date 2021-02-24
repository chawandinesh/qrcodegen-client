import React from "react";
import { Form, Input, Select, Tooltip, Button } from "antd";
import { QRContext } from "../context/context";
import { useHistory } from "react-router-dom";
const { Option } = Select;

const Address = () => {
  const history = useHistory();
  const { state, setState } = React.useContext(QRContext);
  const onFinish = (values) => {
    setState({ ...state, address: values, status: 1 });
  };

  return (
    <div
      style={{
        height: "80vh",
        width: "50vw",
        justifyContent: "center",
        margin: "0 auto",
        background: "#fff",
      }}
    >
      <Form
        name="complex-form"
        initialValues={state.address}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        style={{
          paddingTop: "20vh",
          height: "80vh",
          justifyContent: "space-around",
        }}
      >
        <Form.Item label="Address" style={{ marginBottom: 0 }}>
          <Form.Item
            name="line1"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input placeholder="Input address1" />
          </Form.Item>
          <Form.Item
            name="line2"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input placeholder="Input address2" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="City" name="city" style={{ marginBottom: 0 }}>
          <Input placeholder="Input city" />
        </Form.Item>
        <Form.Item label="State" name="state" style={{ marginBottom: 0 }}>
          <Input placeholder="Input state" />
        </Form.Item>
        <Form.Item label="Country" name="country" style={{ marginBottom: 0 }}>
          <Input placeholder="Input country" />
        </Form.Item>
        <Form.Item
          label="Postal Code"
          name="postal_code"
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="Input postalcode" />
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Address;
