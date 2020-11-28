import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

const CodeBlock: React.FC<{ value: string, language: string }> = (props) => {
  const { language, value } = props;
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {value}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;