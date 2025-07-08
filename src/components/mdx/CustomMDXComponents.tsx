import Image from "next/image";
import Link from "next/link";
import { Link2 } from "lucide-react";
import type { MDXComponents } from "mdx/types";

// Custom MDX components for each markdown element
function CustomMDXComponents(): MDXComponents {
  return {
    h1: (props) => {
      const { id, children, ...rest } = props as any;
      return (
        <div className="relative group">
          <Link
            href={`#${id}`}
            className="inline-flex items-center group/link group-hover:underline group-hover:underline-offset-4 transition-all w-fit"
            tabIndex={-1}
          >
            <h1
              id={id}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-5 mt-10 drop-shadow-lg flex items-center"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
              {...rest}
            >
              {children}
              {id && (
                <span className="ml-2 flex items-center opacity-0 group-hover/link:opacity-100 transition-opacity text-primary hover:text-primary-foreground self-center align-middle">
                  <Link2 size={20} />
                </span>
              )}
            </h1>
          </Link>
        </div>
      );
    },
    h2: (props) => {
      const { id, children, ...rest } = props as any;
      return (
        <div className="relative group">
          <Link
            href={`#${id}`}
            className="inline-flex items-center group/link group-hover:underline group-hover:underline-offset-4 transition-all w-fit"
            tabIndex={-1}
          >
            <h2
              id={id}
              className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-3 mt-8 border-b border-border pb-2 flex items-center"
              style={{ letterSpacing: "-0.02em" }}
              {...rest}
            >
              {children}
              {id && (
                <span className="ml-2 flex items-center opacity-0 group-hover/link:opacity-100 transition-opacity text-primary hover:text-primary-foreground self-center align-middle">
                  <Link2 size={18} />
                </span>
              )}
            </h2>
          </Link>
        </div>
      );
    },
    h3: (props) => {
      const { id, children, ...rest } = props as any;
      return (
        <div className="relative group">
          <Link
            href={`#${id}`}
            className="inline-flex items-center group/link group-hover:underline group-hover:underline-offset-4 transition-all w-fit"
            tabIndex={-1}
          >
            <h3
              id={id}
              className="text-xl md:text-2xl font-semibold text-foreground mb-2 mt-6 flex items-center"
              {...rest}
            >
              {children}
              {id && (
                <span className="ml-2 flex items-center opacity-0 group-hover/link:opacity-100 transition-opacity text-primary hover:text-primary-foreground self-center align-middle">
                  <Link2 size={16} />
                </span>
              )}
            </h3>
          </Link>
        </div>
      );
    },
    ul: (props) => <ul className="list-disc pl-6 space-y-2 text-base text-foreground/90" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 space-y-2 text-base text-foreground/90" {...props} />,
    li: (props) => <li className="ml-2" {...props} />,
    em: (props) => <em className="text-primary italic" {...props} />,
    strong: (props) => <strong className="text-primary-foreground font-bold" {...props} />,
    code: (props) => <code {...props} />,
    pre: (props) => <pre {...props} />,
    p: (props) => <p className="text-base text-foreground/90 my-5 leading-relaxed" {...props} />,
    a: (props) => (
      <a
        className="text-primary underline underline-offset-2 hover:text-primary-foreground transition-colors"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 my-5 text-base" {...props} />
    ),
    hr: (props) => <hr className="my-7 border-border" {...props} />,
    img: (props) => {
      // Use next/image for optimization if src is present, else fallback to img
      const { src, alt = "" } = props as any;
      if (src) {
        return (
          <Image
            src={src}
            alt={alt}
            className="rounded-lg shadow-lg my-6 mx-auto max-w-full"
            width={800}
            height={600}
            style={{ height: "auto", maxWidth: "100%" }}
          />
        );
      }
      // eslint-disable-next-line @next/next/no-img-element
      return <img className="rounded-lg shadow-lg my-6 mx-auto max-w-full" alt={alt} {...props} />;
    },
  };
}

export default CustomMDXComponents;
