import { Editor } from "@monaco-editor/react";

const MonacoEditor = () => {
  return (
    <div className="h-full w-full">
      <Editor
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={`<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
</head>
<body>
  <h1>Hello from AI builder 🚀</h1>
</body>
</html>`}
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
