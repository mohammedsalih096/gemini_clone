import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    // Process response to include HTML formatting
    let responseArray = response.split("**");
    let formattedResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 1) {
        formattedResponse += `<b>${responseArray[i]}</b>`;
      } else {
        formattedResponse += responseArray[i];
      }
    }

    // Add line breaks and wrap code blocks
    let finalResponse = formattedResponse
      .replace(/\n/g, "<br>")
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

    setResultData(finalResponse);
    setLoading(false);
    setInput("");
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSend,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
