import React, { Suspense } from "react";
import QRCode from "qrcode-react";
import QRForm from "./QRForm";
import { jsPDF } from "jspdf";
import { useHistory } from "react-router-dom";
import { Checkbox, InputNumber, Radio, Card } from "antd";
import Select from "react-select";
import "../App.css";
import FormReg from "./Form";
import { QRContext } from "../context/context";

export default function QRGenerator() {
  const [data, setData] = React.useState("");
  const { state, setState } = React.useContext(QRContext);
  const [qrcolor, setQrcolor] = React.useState("#000");
  const [option, setOption] = React.useState({
    value: "small",
    label: "Small",
  });
  const [checked, setChecked] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    window.localStorage.setItem("header", "1");
  }, []);
  const handleSubmitStatus = (status) => {
    setData(JSON.stringify(status));
  };

  const onChange = () => {
    setChecked(!checked);
  };

  const options = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];
  function selectQR() {
    const handleChange = (value) => {
      setOption(value);
    };
    return (
      <div style={{ width: "200px" }}>
        <p>Select size</p>
        <Select
          id="color"
          style={{ width: "200px", zIndex: 0 }}
          name="QR Code"
          options={options}
          onChange={handleChange}
          value={option}
        />
      </div>
    );
  }

  const getQRCode = () => {
    switch (option.value) {
      case "small":
        return (
          <div>
            <h1>124 X 124</h1>
            <div id="small">
              <QRCode
                value={data}
                bgColor={"#ffffff"}
                fgColor={qrcolor}
                id="123456"
                size={124}
                level={"H"}
                includeMargin={false}
                renderAs={"svg"}
              />
            </div>
            <div>
              <div>
                <a onClick={(e) => downloadQR("small")}> Download QR Png</a>
              </div>
              <div>
                <a onClick={(e) => downloadPdf("small")}> Download QR Pdf </a>
              </div>
            </div>
          </div>
        );

        break;

      case "medium":
        return (
          <div>
            <h1>254 X 254</h1>
            <div id="medium">
              <QRCode
                value={data}
                bgColor={"#ffffff"}
                fgColor={qrcolor}
                id="123456"
                size={254}
                level={"H"}
                includeMargin={false}
                renderAs={"svg"}
              />
            </div>
            <div>
              <div>
                <a onClick={(e) => downloadQR("medium")}> Download QR Png </a>
              </div>
              <div>
                <a onClick={(e) => downloadPdf("medium")}> Download QR Pdf </a>
              </div>
            </div>
          </div>
        );
        break;

      case "large":
        return (
          <div>
            <h1>324 X 324</h1>
            <div id="large">
              <QRCode
                value={data}
                bgColor={"#ffffff"}
                fgColor={qrcolor}
                id="123456"
                size={324}
                level={"H"}
                includeMargin={false}
                renderAs={"svg"}
              />
            </div>
            <div>
              <div>
                <a onClick={(e) => downloadQR("large")}> Download QR Png</a>
              </div>
              <div>
                <a onClick={(e) => downloadPdf("large")}> Download QR Pdf </a>
              </div>
            </div>
          </div>
        );
        break;

      default:
        break;
    }
  };

  const downloadPdf = (e) => {
    const canvas = document.getElementById(e).childNodes;
    const imgData = canvas[0].toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save(`${e}.pdf`);
  };
  const downloadQR = (e) => {
    // const canvas = document.getElementsByTagName("canvas");
    const canvas = document.getElementById(e).childNodes;
    // console.log(canvas, "canvas");
    const pngUrl = canvas[0]
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  console.log(state, "context qrgen stat...");

  const handleCartAdd = () => {
    let id = Math.random().toString(36).substring(7);
    setState({
      ...state,
      generatedCodes: [
        ...state.generatedCodes,
        {
          ...JSON.parse(data),
          id: id,
          quantity: 1,
          price: 650,
          size: option.value,
          qrCodeColor: qrcolor,
        },
      ],
    });
    history.push({
      pathname: "/cart",
      id: id,
    });

    window.localStorage.setItem("header", "3");
  };
  return (
    <div
      style={{
        // background: "#c48f2b",
        width: "80vw",
        margin: "0 auto",
        minHeight: "80vh",
        height: "auto",
      }}
    >
      <h1
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          color: "#000",
        }}
      >
        QR Generator
      </h1>

      <div
        style={{
          width: "80vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: " 50vw",
            background: "#fff",
            height: "auto",
            padding: "30px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {data ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {selectQR()}
              <div>
                <div>Choose the color</div>
                <Card
                  style={{
                    width: "300px",
                    height: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Radio.Group
                    onChange={(e) => setQrcolor(e.target.value)}
                    defaultValue={qrcolor}
                    buttonStyle="solid"
                  >
                    <Radio.Button
                      style={{ color: "red", zIndex: 0 }}
                      value="#f00"
                    >
                      Red
                    </Radio.Button>
                    <Radio.Button
                      value="#000"
                      style={{ color: "#000", zIndex: 0 }}
                    >
                      Black
                    </Radio.Button>
                    <Radio.Button
                      value="#999"
                      style={{ color: "#888", zIndex: 0 }}
                    >
                      gray
                    </Radio.Button>
                  </Radio.Group>
                </Card>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                {getQRCode()}
              </div>

              <Checkbox onChange={onChange} checked={checked}>
                Show Url QR Code
              </Checkbox>
              {checked ? (
                <div>
                  <h1>URL</h1>
                  <div id="qr">
                    <QRCode
                      value={"https://ant.design/components/layout/"}
                      bgColor={"#ffffff"}
                      fgColor={qrcolor}
                      id="123456"
                      type="url"
                      size={128}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                    />
                  </div>
                  <div>
                    <div>
                      <a onClick={(e) => downloadQR("large")}>
                        {" "}
                        Download URL QR Png{" "}
                      </a>
                    </div>
                    <div>
                      <a onClick={(e) => downloadPdf("large")}>
                        {" "}
                        Download URL QR Pdf{" "}
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  width: "30vw",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <button
                    onClick={() => setData("")}
                    style={{
                      marginTop: "2vw",
                      background: "#87f",
                      color: "#fff",
                      padding: 6,
                    }}
                  >
                    Generate Again
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleCartAdd}
                    style={{
                      marginTop: "2vw",
                      background: "#787",
                      color: "#fff",
                      padding: 3,
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <FormReg getSubmitStatus={handleSubmitStatus} />
          )}
        </div>
      </div>
    </div>
  );
}
