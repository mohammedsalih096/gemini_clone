import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSend,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How Can I help You Today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful place for an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Recommend innovative project ideas</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>How to improve my coding skills?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Explain complex code snippets</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loading">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div
                  className="response-content"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></div>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ?<img onClick={() => onSend()} src={assets.send_icon} alt="" /> : null } 
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your Privacy and Gemini App.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
