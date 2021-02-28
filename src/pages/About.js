import React from "react";
import { useHistory } from "react-router-dom";
function About() {
  const history = useHistory();
  React.useEffect(() => {
    window.localStorage.setItem("header", "2")
  }, [])
  return (
    <div>
      <p>About</p>
      <button onClick={() => history.goBack()}>Go Back</button>
    </div>
  );
}

export default About;
