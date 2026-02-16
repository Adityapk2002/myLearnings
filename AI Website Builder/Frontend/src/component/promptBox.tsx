import axios from "axios";
import { useState } from "react";

type props = {
  setPreview: (url: string) => void;
};

const PromptBox = ({ setPreview }: props) => {
  const [promt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateWebsite = async () => {
    if (!promt) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        promt,
      });
      setPreview(res.data.previewUrl);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2">
      <h1 className="font-bold text-3xl text-blue-400">AI Website Builder</h1>
      <textarea
        className="w-100 border border-2 rounded-md p-2 bg-white"
        placeholder="Create a modern todo app.."
        value={promt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
      <button
        className="bg-red-400 rounded-md px-4 py-2 text-white cursor-pointer"
        onClick={generateWebsite}
        disabled={loading}
      >
        {loading ? "Generating" : "Generate Website"}
      </button>
    </div>
  );
};

export default PromptBox;
