import React from "react";
import styles from "./SyntaxHighlight.module.css";

function SyntaxHighlight({ code }) {
  // Define regular expressions for Java syntax elements
  const keywords = /(public|private|protected|abstract|class|static|void)/g;
  const strings = /"([^"\\]|\\.)*"/g;
  const type = /\b(int|boolean|short|String)\b/g;
  const comments = /\/\*[\s\S]*?\*\/|\/\/.*/g;
  const methods = /\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?=\()/g;
  // /(public|private|protected)\s+\b\w+\b\s+\b\w+\b\s*\([^)]*\)\s*(?=\{)/g;

  // Apply syntax highlighting
  const highlightedCode = code
    .replace(keywords, "<span class=" + styles.keyword + ">$&</span>")
    .replace(methods, "<span class=" + styles.method + ">$&</span>")
    .replace(type, "<span class=" + styles.type + ">$&</span>")
    .replace(strings, "<span class=" + styles.string + ">$&</span>")
    .replace(comments, "<span class=" + styles.comment + ">$&</span>");

  return (
    <pre
      className={styles.codeContainer}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}

// function JavaCodeSnippet() {
//   const javaCode = `public class HelloWorld {
//     public static void main(String[] args) {
//         // This is a comment
//         System.out.println( "Hello, World!" );
//     }
// }`;

//   return (
//     <div>
//       <h2>Java Code</h2>
//       <SyntaxHighlight code={javaCode} />
//     </div>
//   );
// }

export default SyntaxHighlight;
