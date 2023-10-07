"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import { audioGenerate } from "@/utils/generateAudio";
import { Toaster, toast } from "react-hot-toast";

const AudioGenerator = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAudio = async () => {
    setLoading(true);
    if (text == "") {
      toast.error("Please Write Something");
      setLoading(false);
    }
    try {
      const result = await audioGenerate(text, language);
      setAudioUrl(result);
      console.log(result);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const downloadAudio = () => {
    saveAs(audioUrl, "generated-audio.mp3");
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-500 min-h-screen grid justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white px-4 py-6 shadow-2xl shadow-black w-96 rounded-3xl text-start font-semibold">
        <div>
          <h1 className="text-2xl py-5 text-center font-semibold">
            Text to Audio Generator
          </h1>
          <div>
            <textarea
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-md pl-4 pt-2 w-full h-[150px]  border border-[#4D7AF6] text-gray-500  focus:outline-[#935EF7]  "
            />
          </div>
          <div className="w-1/2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full py-2 px-2 mr-4 bg-[#a48bf0] text-white rounded-sm my-2 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              {/* Add more language options as needed */}
            </select>
          </div>
          {!audioUrl && (
            <div className="flex justify-center">
              <button
                className="bg-[#a48bf0] text-white px-4 py-2 rounded-xl my-3"
                onClick={generateAudio}
              >
                {loading ? "Loading ..." : "Generate Audio"}
              </button>
            </div>
          )}
        </div>
        {audioUrl && (
          <>
            <div className="w-full ">
              <audio
                className="w-full h-[100px] pb-4"
                controls
                src={audioUrl}
              ></audio>
              <div className="flex justify-center">
                <button
                  onClick={downloadAudio}
                  className="bg-[#a48bf0] text-white px-4 py-2 rounded-xl my-3"
                >
                  Download Audio
                </button>
              </div>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setAudioUrl("");
                  setText("");
                }}
                className="bg-black text-white px-2 py-1 rounded-sm mt-2"
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioGenerator;
