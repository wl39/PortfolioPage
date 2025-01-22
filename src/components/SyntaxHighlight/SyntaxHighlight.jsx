import React from "react";
import styles from "./SyntaxHighlight.module.css";

const type = /&type=([^:]+):/;
const java_keywords = /(public|private|protected|abstract|class|static|void)/g;
const java_strings = /"([^"\\]|\\.)*"/g;
const java_type = /\b(int|boolean|short|String)\b/g;
const java_comments = /\/\*[\s\S]*?\*\/|\/\/.*/g;
const java_methods = /\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?=\()/g;
// /(public|private|protected)\s+\b\w+\b\s+\b\w+\b\s*\([^)]*\)\s*(?=\{)/g;

// Matches SQL block comments /* ... */ or single-line comments --
const sql_comments = /\/\*[\s\S]*?\*\/|--.*/g;

// Matches single-quoted strings, including escaped quotes
const sql_strings = /'([^'\\]|\\.)*'/g;

// Common SQL keywords
// (Add more as you need. This is just a sample set.)
const sql_keywords =
  /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP|BY|HAVING|ORDER|ASC|DESC|CREATE|TABLE|PRIMARY|KEY|FOREIGN|DROP|ALTER|ADD|COLUMN|LIMIT|OFFSET|AND|OR|NOT|IN|IS|NULL|BETWEEN|EXISTS|LIKE)\b/gi;

// Common SQL data types (again, add or remove as needed)
const sql_type =
  /\b(INT|VARCHAR|CHAR|TEXT|DATE|TIMESTAMP|BIT|FLOAT|DOUBLE|DECIMAL|NUMERIC|BOOLEAN|BLOB)\b/gi;

// Identify function-like calls: anything that looks like name(...)
const sql_methods = /\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?=\()/g;

function SyntaxHighlight({ code }) {
  // Define regular expressions for Java syntax elements
  const highlightCode = (code) => {
    const codeType = code.match(type);

    if (codeType) {
      switch (codeType[1]) {
        case "SQL":
          return code
            .replace(type, "<span class=" + styles.type + ">SQL</span>")
            .replace(
              sql_comments,
              "<span class=" + styles.sql_comment + ">$&</span>"
            )
            .replace(
              sql_strings,
              "<span class=" + styles.sql_string + ">$&</span>"
            )
            .replace(
              sql_keywords,
              "<span class=" + styles.sql_keyword + ">$&</span>"
            )
            .replace(sql_type, "<span class=" + styles.sql_type + ">$&</span>")
            .replace(
              sql_methods,
              "<span class=" + styles.sql_method + ">$&</span>"
            );
        case "Java":
          code = code
            .replace(
              java_keywords,
              "<span class=" + styles.java_keyword + ">$&</span>"
            )
            .replace(
              java_methods,
              "<span class=" + styles.java_method + ">$&</span>"
            )
            .replace(
              java_type,
              "<span class=" + styles.java_type + ">$&</span>"
            )
            .replace(
              java_strings,
              "<span class=" + styles.java_string + ">$&</span>"
            )
            .replace(
              java_comments,
              "<span class=" + styles.java_comment + ">$&</span>"
            );

          code = code.replace(
            type,
            "<span class=" + styles.type + ">Java</span>"
          );

          return code;
        default:
          break;
      }
    }
    code = code
      .replace(
        java_keywords,
        "<span class=" + styles.java_keyword + ">$&</span>"
      )
      .replace(java_methods, "<span class=" + styles.java_method + ">$&</span>")
      .replace(java_type, "<span class=" + styles.java_type + ">$&</span>")
      .replace(java_strings, "<span class=" + styles.java_string + ">$&</span>")
      .replace(
        java_comments,
        "<span class=" + styles.java_comment + ">$&</span>"
      );

    // code = `<span class="${styles.type}">Java</span> ` + code;
    return code;
  };

  return (
    <pre
      className={styles.codeContainer}
      dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
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
