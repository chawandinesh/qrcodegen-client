import React from "react";
import { Steps, InputNumber } from "antd";
import QRCode from "qrcode-react";
import { QRContext } from "../context/context";
import StripeCheckout from "../components/StripeCheckout";
import Address from "../components/Address";
const { Step } = Steps;
function Cart() {
  const { state, setState } = React.useContext(QRContext);
  const [count, setCount] = React.useState(0);
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [paymentInfo, setPaymentInfo] = React.useState(undefined);
  const sum =
    Array.isArray(state.generatedCodes) &&
    state.generatedCodes.length &&
    state.generatedCodes.reduce((r, a) => r + a.price * a.quantity, 0);

  console.log(state, "context state");
  const handleItemCountChange = (item, idx) => {
    setCount(item);
    state.generatedCodes[idx].quantity = item;
  };

  let productData =
    Array.isArray(state.generatedCodes) && state.generatedCodes.length
      ? state.generatedCodes.map((e) => ({ id: e.id, quantity: e.quantity }))
      : [];

  const getPaymentStatus = (e, result) => {
    console.log(e, result, "result info");
    setPaymentStatus(e);
    setPaymentInfo(result);
  };

  // console.log(paymentInfo, "paymentInfo");

  const CartDesciption = () => {
    return (
      <div>
        <div
          style={{
            width: "90vw",
            background: "#fff",
            marginBlock: 20,
            padding: 10,
            alignItems: "center",
            height: "8vh",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4>QR Code</h4>
          </div>
          <div>
            <h4>size</h4>
          </div>
          <div>
            <h4>Product Id</h4>
          </div>
          <div>
            <h4>Quantity</h4>
          </div>
          <div>
            <h4>Amount</h4>
          </div>
          <div style={{ width: "100px" }}>
            <h4>Action</h4>
          </div>
        </div>

        {state.generatedCodes.map((e, idx) => {
          return (
            <div
              style={{
                width: "90vw",
                background: "#fff",
                border: `2px solid #1890FF`,
                marginBlock: 20,
                padding: 10,
                alignItems: "center",
                height: "20vh",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <QRCode
                  value={JSON.stringify(e)}
                  bgColor={"#ffffff"}
                  fgColor={e.qrCodeColor}
                  id="123456"
                  size={75}
                  level={"H"}
                  includeMargin={false}
                  renderAs={"svg"}
                />
              </div>
              <div>
                <h4>size-{e.size}</h4>
              </div>
              <div>
                <h3>{e.petName}</h3>
                <p style={{ color: "gray" }}>id: {e.id}</p>
              </div>
              <div>
                <InputNumber
                  min={1}
                  max={10}
                  value={state.generatedCodes[idx].quantity}
                  onChange={(item) => {
                    handleItemCountChange(item, idx);
                  }}
                  style={{ marginTop: "10px" }}
                />
              </div>
              <div>
                <h3>
                  {state.generatedCodes[idx].price *
                    state.generatedCodes[idx].quantity}
                </h3>
              </div>
              <div style={{ width: "120px" }}>
                <button
                  style={{
                    backgroundColor: "darkred",
                    color: "#fff",
                    marginLeft: 10,
                  }}
                  onClick={() =>
                    setState({
                      ...state,
                      generatedCodes: state.generatedCodes.filter(
                        (item, index) => index !== idx
                      ),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <div
          style={{
            width: "90vw",
            background: "#fff",
            marginBlock: 20,
            padding: 5,
            paddingLeft: "230px",
            alignItems: "center",
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4></h4>
          </div>
          <div>
            <h4></h4>
          </div>
          <div>
            <h4></h4>
          </div>
          <div>
            <h4 style={{ color: "gray" }}>Total</h4>
          </div>
          <div>
            <h4 style={{ color: "darkgreen" }}>{sum}</h4>
          </div>
          <div>
            <StripeCheckout
              getPaymentStatus={getPaymentStatus}
              sum={sum}
              productData={productData}
              address={state.address}
            />
          </div>
        </div>
      </div>
    );
  };

  const AddressBox = () => {
    return (
      <div
        style={{
          width: "100vw",
          margin: "0 auto",
          height: "auto",
          minHeight: "10vh",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "50vw",
            justifyContent: "space-around",
            flexWrap: "wrap",
            height: "auto",
            minHeight: "10vh",
            background: "#fff",
            display: "flex",
            padding: "10px",
          }}
        >
          <h3 style={{ fontWeight: "bold", width: "80vw" }}>Address:</h3>
          {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              address1
            </p>
            <p>:</p>
            <p style={{ color: "#aaa" }}>{state.address.line1}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              address2
            </p>
            <p>:</p>
            <p style={{ color: "#aaa" }}>{state.address.line1}</p>
          </div>
          {/* </div> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              city
            </p>
            <p>:</p>
            <p style={{ color: "#aaa" }}>{state.address.city}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              state
            </p>
            <p>:</p>
            <p style={{ color: "#aaa" }}>{state.address.state}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              country
            </p>
            <p>:</p>
            <p style={{ color: "#aaa" }}>{state.address.country}</p>
          </div>
          <div
            style={{
              display: "flex",
              // width:'50vw',
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              zip code
            </p>
            <p>:</p>
            <p style={{ color: "#aaa" }}>{state.address.postal_code}</p>
          </div>
        </div>
      </div>
    );
  };

  const EmptyCart = () => {
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Cart is Empty</h1>
      </div>
    );
  };

  const StatusDetails = () => {
    switch (state.status) {
      case 0:
        return (
          <div>
            <h1>Address</h1>
            <Address />
          </div>
        );
      case 1:
        return (
          <div>
            <h1>Summary</h1>
            <AddressBox />
            <CartDesciption />
          </div>
        );

      case 2:
        return (
          <div>
            <h1>Payment Info</h1>
            {paymentStatus === 403 ? (
              <div
                style={{
                  width: "50vw",
                  borderRadius: "10px",
                  height: "40vh",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  display: "flex",
                  background: "#fff",
                  margin: "0 auto",
                }}
              >
                <h2 style={{ color: "red" }}>Payment Failed</h2>
                <h1 style={{ fontWeight: "bold" }}>
                  Unautherized Payment Access
                </h1>
                <h2 style={{ color: "#aaa" }}>Please login to pay</h2>
              </div>
            ) : (
              <React.Fragment />
            )}
            {paymentStatus === 200 && paymentInfo ? (
              <div
                style={{
                  width: "50vw",
                  borderRadius: "10px",
                  height: "40vh",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  display: "flex",
                  background: "#fff",
                  margin: "0 auto",
                }}
              >
                <h2 style={{ color: "green" }}>Payment Success</h2>
                <h1 style={{ fontWeight: "bold" }}>
                  {paymentInfo.data.amount}
                </h1>
                <h2 style={{ color: "#aaa" }}>
                  {paymentInfo.data.balance_transaction}
                </h2>
                <a target="_blank" href={`${paymentInfo.data.receipt_url}`}>
                  Download Recept
                </a>
              </div>
            ) : null}

            {/* </div> */}
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div>
      {state.generatedCodes.length ? (
        <Steps current={state.status}>
          <Step
            title="Address"
            onClick={() => setState({ ...state, status: 0 })}
          />
          <Step
            title="Summary"
            onClick={() => setState({ ...state, status: 1 })}
          />
          <Step
            title="Payment"
            onClick={() => setState({ ...state, status: 3 })}
          />
        </Steps>
      ) : null}

      {state.generatedCodes.length ? <StatusDetails /> : <EmptyCart />}
    </div>
  );
}

export default Cart;
