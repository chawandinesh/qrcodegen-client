import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Upload,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 32,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 4,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 16,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FormReg = (props) => {
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    props.getSubmitStatus(values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        {/* <Option value="87">+87</Option> */}
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const handleImageChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    console.log(reader);

    console.log(reader.result);
    reader.onloadend = function (e) {
      setImage(reader.result);
    };
  };
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "91",
      }}
      scrollToFirstError
    >
      <Form.Item name="image" label="Image">
        <div
          style={{
            display: "flex",
            marginBottom: "1vw",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            {image ? (
              <img
                src={image}
                style={{ height: "20vh", width: "10vw" }}
                alt="No Image"
                // alt={null}
              />
            ) : null}
          </div>
          <div>
            <input
              accept="image/*"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </Form.Item>

      <Form.Item label="Name" style={{ marginBottom: 0 }}>
        <Form.Item
          name="firstName"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="Input first name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="Input last name" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item> */}

      {/* <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      <Form.Item
        name="company"
        label={<span>Company</span>}
        rules={[
          {
            required: true,
            message: "Please input your company",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label={<span>Address</span>}
        rules={[
          {
            required: true,
            message: "Please input your address",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item> */}

      <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: "Please input website!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="summary"
        label={<span>Summary</span>}
        rules={[
          {
            required: true,
            message: "Please input your summary",
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormReg;
