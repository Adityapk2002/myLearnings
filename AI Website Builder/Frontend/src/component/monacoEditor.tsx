import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  setCode: (val: string) => void;
};

const MonacoEditor = ({ code, setCode }: Props) => {
  return (
    <div className="h-160 border border-[#ddd]">
      <Editor
        className="rounded-2xl "
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(val) => setCode(val || "")}
      />
    </div>
  );
};

export default MonacoEditor;
