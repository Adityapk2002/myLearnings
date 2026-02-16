import { useState } from "react";
import "./App.css";
import Container from "./component/container";
import PromptBox from "./component/promptBox";
import PreviewFrame from "./component/previewFrame";

function App() {
  const [previewUrl, setPreviewUrl] = useState("");
  return (
    <>
      <Container>
        <PromptBox setPreview={setPreviewUrl} />
        <PreviewFrame previewUrl={previewUrl} />
      </Container>
    </>
  );
}

export default App;
