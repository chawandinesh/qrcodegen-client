import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { notification } from "antd";
import axios from "axios";
import { QRContext } from "../context/context";
function StripeCheckoutComponent(props) {
  const { state, setState } = React.useContext(QRContext);
  const [product, setProduct] = React.useState({
    name: "Qrcode",
    price: 0,
    productData: {item:[], charges:{}},
    productBy: "sQR pvt ltd",
  });

  React.useEffect(() => {
    setProduct({
      ...product,
      price: props.sum,
      productData: {...product.productData, item:props.productData},
    });
  }, [props]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Payment Success",
    });
  };
  const makePayment = async (token) => {
    const body = {
      token,
      product,
      authorization: window.localStorage.getItem("token"),
      address: props.address,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return await axios({
      url: `${process.env.REACT_APP_SERVER}/payment`,
      method: "post",
      headers,
      data: body,
    })
      .then((response) => {
        console.log(response,'response')
        if (response.status === 200) {
          // setProduct({
          //   ...product, productData:{...product.productData, charges: response.data.data}
          // })
          setState({
            ...state,
            status: 2,
            ordered: [...state.ordered,{...product.productData,charges: response.data }],
          });
          props.getPaymentStatus(response.status, response.data);
          openNotificationWithIcon("success");
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <StripeCheckout
      stripeKey={process.env.REACT_APP_KEY}
      token={makePayment}
      currency={"INR"}
      amount={product.price * 100}
      name="Qrcode"
    />
  );
}
 
export default StripeCheckoutComponent;
