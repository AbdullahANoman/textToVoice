import axios from "axios";
export const audioGenerate = async (text, language) => {
  const options = {
    method: "GET",
    url: "https://text-to-speech-api3.p.rapidapi.com/speak",
    params: {
      text: `${text}`,
      lang: `${language}`,
    },
    
    headers: {
      "X-RapidAPI-Key": "6cf60ab617msh503efd6e688d236p1569c3jsn830a8558c165",
      "X-RapidAPI-Host": "text-to-speech-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
};
