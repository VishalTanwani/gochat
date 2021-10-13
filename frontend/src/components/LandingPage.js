import React, { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    if (!window.localStorage["token"]) {
      window.location.href = "/login";
      console.log("object");
    } else {
        window.location.href = "/whatsapp";
    }
  }, []);
  return <div></div>;
}

export default LandingPage;
