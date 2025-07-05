import type { MDXComponents } from 'mdx/types';

// Custom MDX components for each markdown element
function CustomMDXComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="text-5xl font-extrabold tracking-tight text-primary mb-6 mt-12 drop-shadow-lg"
        style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="text-3xl font-bold tracking-tight text-primary mb-4 mt-10 border-b border-border pb-2"
        style={{ letterSpacing: '-0.02em' }}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-2xl font-semibold text-foreground mb-3 mt-8"
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="list-disc pl-6 space-y-2 text-lg text-foreground/90" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal pl-6 space-y-2 text-lg text-foreground/90" {...props} />
    ),
    li: (props) => (
      <li className="ml-2" {...props} />
    ),
    em: (props) => (
      <em className="text-primary italic" {...props} />
    ),
    strong: (props) => (
      <strong className="text-primary-foreground font-bold" {...props} />
    ),
    code: (props) => (
      <code className="bg-zinc-900 text-primary-foreground px-2 py-1 rounded text-base font-mono" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-zinc-900 text-primary-foreground p-4 rounded-xl my-6 overflow-x-auto border border-border shadow-lg" {...props} />
    ),
    p: (props) => (
      <p className="text-lg text-foreground/90 my-4 leading-relaxed" {...props} />
    ),
    a: (props) => (
      <a className="text-primary underline underline-offset-2 hover:text-primary-foreground transition-colors" {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 my-6" {...props} />
    ),
    hr: (props) => (
      <hr className="my-8 border-border" {...props} />
    ),
    img: (props) => (
      <img className="rounded-lg shadow-lg my-6 mx-auto max-w-full" {...props} />
    ),
  };
}

export default CustomMDXComponents;
