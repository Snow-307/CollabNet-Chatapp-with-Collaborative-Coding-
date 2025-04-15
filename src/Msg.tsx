import React from "react";
import ReactMarkdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";

import "./Msg.css";

interface MsgProps {
  content: string;
  timestamp: number;
}

export default function Msg({ content, timestamp }: MsgProps) {
  const date = new Date(timestamp);

  const preprocessedContent = preprocessMarkdown(content);

  return (
    <div className="message">
      <div className="message-content">
        <ReactMarkdown
          components={{
            code: CodeBlock,
            a: ExternalLink,
          }}
        >
          {preprocessedContent}
        </ReactMarkdown>
      </div>
      {date && (
        <footer className="message-footer">
          <time dateTime={date.toISOString()}>{date.toLocaleTimeString()}</time>
        </footer>
      )}
    </div>
  );
}

const urlRegex = /(https?:\/\/[^\s\]()]+)/g;

function preprocessMarkdown(content: string) {
  return content.replace(urlRegex, (url) => {
    const prevChar = content[content.indexOf(url) - 1];
    if (prevChar === "(" || prevChar === "]") {
      return url;
    }
    return `[${url}](${url})`;
  });
}

function ExternalLink({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

type CodeBlockProps = {
  className?: string;
  children?: React.ReactNode;
};

function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const code = String(children).replace(/\n$/, "");

  return match ? (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <code className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
