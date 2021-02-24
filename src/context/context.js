import React from "react";
export const QRContext = React.createContext(null);
const initialState = {
  generatedCodes: [],
  ordered:[],
  address:{},
  status: 0
};
export function Context(props) {
  const [state, setState] = React.useState(initialState);
  return (
    <QRContext.Provider value={{ state, setState }}>
      {props.children}
    </QRContext.Provider>
  );
}
