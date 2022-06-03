import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RandomScreenshot.css";
const RandomScreenshot = () => {
  const [imgUrl, setImgUrl] = useState("");
  const FetchURL = () => {
    const url = `https://prnt.sc/${generateRandomTwoLetterWord()}${generateRandomFourDigitNumber()}`;
    axios.get(url).then((data) => {
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(data.data, "text/html");
      var imgUrl = htmlDoc.getElementsByTagName("img")[0].getAttribute("src");
      console.log(imgUrl);
      setImgUrl(imgUrl);
    });
  };

  const generateRandomTwoLetterWord = () => {
    const str = "abcdefghijklmnopqrstuvwxyz";
    const firstLetter = str.charAt(Math.floor(Math.random() * str.length));
    const secondLetter = str.charAt(Math.floor(Math.random() * str.length));
    const finalWord = firstLetter + secondLetter;
    return finalWord;
  };
  const generateRandomFourDigitNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      FetchURL();
    }, 5000);
  }, []);
  return (
    <>
      <div className="resizeDiv">
        <img
          src={imgUrl}
          style={{ height: "100%", width: "100%", borderRadius: "20px" }}
          alt={imgUrl}
        />
      </div>

      <div className="button-next" onClick={() => FetchURL()}>
        NEXT SCREENSHOT AFTER 5 SECOND
      </div>

      {/* <a href={imgUrl} target="_blank">
        {imgUrl}
      </a> */}
    </>
  );
};

export default RandomScreenshot;
