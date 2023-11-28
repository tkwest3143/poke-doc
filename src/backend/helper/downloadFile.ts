import * as https from "https";
import * as fs from "fs";

export const downloadImage = (
  url: string,
  id: string,
  option?: { directoryName?: string; isNotUpdateImage?: boolean }
): Promise<string> => {
  const outputPath = process.env.IMAGE_OUTPUT_PATH;
  if (!outputPath) {
    console.log(outputPath);
    throw new Error("出力ディレクトリが見つかりません");
  }
  const outputDir =
    option && option.directoryName
      ? "./public/" + outputPath + option.directoryName + "/"
      : "./public/" + outputPath;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputFilePath = outputDir + id + ".png";
  const path =
    option && option.directoryName
      ? outputPath + option.directoryName + "/" + id + ".png"
      : outputPath + id + ".png";
  if (option && option.isNotUpdateImage === true) {
    if (!fs.existsSync(outputFilePath)) {
      return new Promise((resolve) => resolve(path));
    }
  }
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const fileStream = fs.createWriteStream(outputFilePath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          resolve(path);
        });

        fileStream.on("error", (error) => {
          fs.unlinkSync(outputFilePath);
          reject(error);
        });
      })
      .on("error", (error) => reject(error));
  });
};
