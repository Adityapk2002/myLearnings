import { useState } from "react";
import ChatPanel from "../../component/chatPanel";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");

  return (
    <div className="h-screen w-full bg-[#111111] text-white flex overflow-hidden">
      <div className="flex flex-col w-[35%] border-r border-white bg-[#0d0d0d]">
        <div className="flex items-center ont-medium pl-12 border-b py-2 gap-2 font-cinzel text-lg">
          <span className="bg-yellow-300 h-4 w-4 rounded-full" />
          Lovable
        </div>
        <ChatPanel />
      </div>

      <div className="w-[65%] flex flex-col">
        <div className="h-14 border-b border-white flex items-center justify-between px-4 bg-[#0f0f0f]">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-4 py-1 rounded-md text-sm ${activeTab == "code" ? "bg-white text-black " : "text-white/60"}`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-1 rounded-md text-sm ${activeTab == "preview" ? "bg-white text-black " : "text-white/60"}`}
            >
              Preview
            </button>
          </div>

          <div className="text-sm text-white">Aditya</div>
        </div>

        <div className="flex-1 bg-black flex items-center justify-center px-2">
          {activeTab == "code"
            ? "Code editor coming..."
            : "Live preview coming..."}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
