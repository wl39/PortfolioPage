import React from "react";
import styles from "./SyntaxHighlight.module.css";

const type = /&type=([^:]+):/;

// --- Java ---
const java_keywords = /\b(public|private|protected|abstract|class|static|void)/g;
const java_strings = /"([^"\\]|\\.)*"/g;
const java_type = /\b(int|boolean|short|String)\b/g;
const java_comments = /\/\*[\s\S]*?\*\/|\/\/.*/g;
const java_methods = /\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?=\()/g;

// --- SQL ---
const sql_comments = /\/\*[\s\S]*?\*\/|--.*/g;
const sql_strings = /'([^'\\]|\\.)*'/g;
const sql_keywords = /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP|BY|HAVING|ORDER|ASC|DESC|CREATE|TABLE|PRIMARY|KEY|FOREIGN|DROP|ALTER|ADD|COLUMN|LIMIT|OFFSET|AND|OR|NOT|IN|IS|NULL|BETWEEN|EXISTS|LIKE)\b/gi;
const sql_type = /\b(INT|VARCHAR|CHAR|TEXT|DATE|TIMESTAMP|BIT|FLOAT|DOUBLE|DECIMAL|NUMERIC|BOOLEAN|BLOB)\b/gi;
const sql_methods = /\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?=\()/g;

// --- Python  ---
const python_keywords = /\b(def|class|import|from|as|if|elif|else|for|while|return|in|and|or|not|is|None|True|False)/g;
const python_strings = /(['"])(?:(?=(\\?))\2.)*?\1/g;
const python_comments = /#.*/g;
const python_methods = /\b[a-zA-Z_][A-Za-z0-9_]*\s*(?=\()/g;

// --- C / C++ ---
const c_keywords = /\b(int|char|float|double|void|short|long|signed|unsigned|if|else|for|while|do|switch|case|default|break|continue|return|struct|typedef|union|enum|const|volatile)\b/g;
const cpp_keywords = /\b(class|namespace|template|typename|public|private|protected|virtual|override|new|delete|using|std::\w+)/g;
const c_strings = /"([^"\\]|\\.)*"/g;
const c_char = /'([^'\\]|\\.)*'/g;
const c_comments = /\/\*[\s\S]*?\*\/|\/\/.*/g;
const c_methods = /\b[a-zA-Z_]\w*(?=\s*\()/g;

function SyntaxHighlight({ code }) {
  const highlightCode = (code) => {
    const m = code.match(type);
    if (m) {
      const lang = m[1];
      switch (lang) {
        case "SQL":
        case "sql":
          return code
            .replace(type, "<span class=" + styles.type + ">SQL</span>")
            .replace(sql_comments, "<span class=" + styles.sql_comment + ">$&</span>")
            .replace(sql_strings, "<span class=" + styles.sql_string + ">$&</span>")
            .replace(sql_keywords, "<span class=" + styles.sql_keyword + ">$&</span>")
            .replace(sql_type, "<span class=" + styles.sql_type + ">$&</span>")
            .replace(sql_methods, "<span class=" + styles.sql_method + ">$&</span>");
        case "Java":
        case "java":
          return code
            .replace(java_keywords, "<span class=" + styles.java_keyword + ">$&</span>")
            .replace(type, "<span class=" + styles.type + ">Java</span>")
            .replace(java_comments, "<span class=" + styles.java_comment + ">$&</span>")
            .replace(java_strings, "<span class=" + styles.java_string + ">$&</span>")
            .replace(java_type, "<span class=" + styles.java_type + ">$&</span>")
            .replace(java_methods, "<span class=" + styles.java_method + ">$&</span>");
        case "Python":
        case "python":
        case "py":
          return code
            .replace(python_keywords, "<span class=" + styles.python_keyword + ">$&</span>")
            .replace(type, "<span class=" + styles.type + ">Python</span>")
            .replace(python_comments, "<span class=" + styles.python_comment + ">$&</span>")
            .replace(python_strings, "<span class=" + styles.python_string + ">$&</span>")
            .replace(python_methods, "<span class=" + styles.python_method + ">$&</span>");
        case "C":
        case "c":
          return code
            .replace(type, "<span class=" + styles.type + ">C</span>")
            .replace(c_comments, "<span class=" + styles.c_comment + ">$&</span>")
            .replace(c_strings, "<span class=" + styles.c_string + ">$&</span>")
            .replace(c_char, "<span class=" + styles.c_char + ">$&</span>")
            .replace(c_keywords, "<span class=" + styles.c_keyword + ">$&</span>")
            .replace(c_methods, "<span class=" + styles.c_method + ">$&</span>");
        case "C++":
        case "CPP":
        case "c++":
        case "cpp":
          return code
            .replace(cpp_keywords, "<span class=" + styles.cpp_keyword + ">$&</span>")
            .replace(type, "<span class=" + styles.type + ">C++</span>")
            .replace(c_comments, "<span class=" + styles.cpp_comment + ">$&</span>")
            .replace(c_strings, "<span class=" + styles.cpp_string + ">$&</span>")
            .replace(c_char, "<span class=" + styles.cpp_char + ">$&</span>")
            .replace(c_keywords, "<span class=" + styles.cpp_keyword + ">$&</span>")
            .replace(c_methods, "<span class=" + styles.cpp_method + ">$&</span>");
        default:
          break;
      }
    }

    // 기본 Java 하이라이팅 (type 태그 없을 때)
    return code
    .replace(java_keywords, "<span class=" + styles.java_keyword + ">$&</span>")
      .replace(java_comments, "<span class=" + styles.java_comment + ">$&</span>")
      .replace(java_strings, "<span class=" + styles.java_string + ">$&</span>")
      .replace(java_type, "<span class=" + styles.java_type + ">$&</span>")
      .replace(java_methods, "<span class=" + styles.java_method + ">$&</span>");
  };

  return (
    <pre
      className={styles.codeContainer}
      dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
    />
  );
}

export default SyntaxHighlight;
