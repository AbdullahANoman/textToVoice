export const audioGenerate = async (text, language) => {
  const url = `https://text-to-speech-api3.p.rapidapi.com/speak?text=${text}&lang=${language}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6cf60ab617msh503efd6e688d236p1569c3jsn830a8558c165",
      "X-RapidAPI-Host": "text-to-speech-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const blob = await response.blob();

    const readFile = (input) => {
      return new Promise((resolve) => {
        const fr = new FileReader();
        fr.readAsDataURL(input);
        fr.addEventListener("load", () => {
          const res = fr.result;
          resolve(res);
        });
      });
    };

    const file = new File([blob], "audio", { type: blob.type });
    const fileData = await readFile(blob);
    console.log(fileData);

    return fileData;
  } catch (error) {
    console.error(error);
  }
};
