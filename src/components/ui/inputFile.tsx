import { Upload } from "lucide-react";
import React, { useEffect } from "react";

type InputFileProps = {
  file?: string[];
  fileUrl?: File[];
  setFileUrl?: (fileUrl: File[]) => void;
  isRefresh?: boolean;
  fileLimit?: number;
  setFileName?: (fileName: string[]) => void;
  ButtonName: string;
};

const InputFile: React.FC<InputFileProps> = ({
  file,
  fileUrl,
  setFileUrl,
  isRefresh = false,
  fileLimit = Infinity,
  ButtonName,
}) => {
  const [fileName, setFileName] = React.useState<string[]>([]);

  useEffect(() => {
    if (isRefresh) {
      setFileName([]);
    }
    if (file && file.length > 0) {
      setFileName(file);
    }
  }, [file, isRefresh]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = [];
      const fileUrls = [];

      if (fileName.length + files.length > fileLimit) {
        alert(`File limit is ${fileLimit}`);
        return;
      }

      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
        fileUrls.push(files[i]);
      }
      setFileName([...fileName, ...fileNames]);
      setFileUrl && setFileUrl([...(fileUrl || []), ...fileUrls]);
    }
  };

  const handleDeleteList = (index: number) => {
    setFileName(fileName.filter((_, i) => i !== index));
    setFileUrl && setFileUrl((fileUrl || []).filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-9 w-full justify-center">
      <ul className="relative flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base text-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-50">
        {fileName?.length > 0 ? (
          fileName.map((fileName, index) => (
            <li
              key={index}
              className="flex h-6 items-center justify-center gap-2 rounded bg-gray-100 px-2 mr-1"
            >
              <span className="text-xs font-medium text-gray-600">
                {fileName}
              </span>
              <button
                onClick={() => handleDeleteList(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                ✕
              </button>
            </li>
          ))
        ) : (
          <span className="text-sm flex items-center font-medium text-gray-500">
            No file chosen
          </span>
        )}

        <input
          id="image"
          type="file"
          name="image"
          className="hidden"
          onChange={handleFileChange}
        />
      </ul>
      <label
        htmlFor="image"
        className="ml-2 flex text-sm h-9 w-36 cursor-pointer items-center justify-center rounded-md border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <Upload className="w-4 h-4 mr-2" /> {ButtonName}
      </label>
    </div>
  );
};

export default InputFile;
