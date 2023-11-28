import * as fs from "fs";
export const exportMasterFile = (name: string, data: any) => {
  const dir = "./src-tauri/data";
  const fileName = `./src-tauri/data/${name}.json`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fileName, JSON.stringify(data));
  console.log(`export file [file_path = ${fileName}]`);
};
