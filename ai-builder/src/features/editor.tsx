import { Editor } from "@monaco-editor/react";

type Props = {
  code: string;
  setCode: (val: string) => void;
};

const MonacoEditor = ({ code, setCode }: Props) => {
  return (
    <div className="h-full w-full">
      <Editor
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        height="100%"
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          smoothScrolling: true,
          padding: { top: 12 },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
