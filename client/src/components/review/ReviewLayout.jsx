import { useRef, useState } from "react";

import CodeEditor from "./CodeEditor";
import AIResponse from "./AiResponse";

function ReviewLayout() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(440px,0.92fr)]">
      <CodeEditor
        editorRef={editorRef}
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        review={review}
        setReview={setReview}
        loading={loading}
        setLoading={setLoading}
      />

      <AIResponse
        editorRef={editorRef}
        review={review}
        loading={loading}
        sourceCode={code}
      />
    </div>
  );
}

export default ReviewLayout;
