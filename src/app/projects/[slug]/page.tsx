
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CustomMDXComponents from '@/components/mdx/CustomMDXComponents';

interface ProjectMeta {
  title: string;
  image: string;
  libraries: string[];
  description: string;
  language: string;
}

interface ProjectData {
  content: string;
  meta: ProjectMeta;
}


export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const hdrs = await headers();
  const host = hdrs.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/project-mdx?slug=dome`, { cache: 'no-store' });
  if (!res.ok) return notFound();
  const data: ProjectData = await res.json();

  return (
    <div className="relative flex flex-col w-full max-w-4xl mx-auto py-0 sm:py-12 px-0 sm:px-4">
      {/* Hero section */}
      <div className="relative flex flex-col items-center mb-12">
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-2xl aspect-[2.2/1] rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-500">
            <img
              src={data.meta.image}
              alt={data.meta.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.92) contrast(1.08)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 to-zinc-950/90" />
            <div className="absolute bottom-0 left-0 w-full px-8 py-6 flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 mb-2 text-center drop-shadow-lg">
                {data.meta.title}
              </h1>
              <p className="text-zinc-300 text-lg mb-2 text-center max-w-2xl drop-shadow">
                {data.meta.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {data.meta.libraries.map((lib: string) => (
                  <span
                    key={lib}
                    className="bg-zinc-800/80 text-zinc-200 px-3 py-1 rounded-full text-xs shadow border border-zinc-700"
                  >
                    {lib}
                  </span>
                ))}
              </div>
              <div className="flex flex-row gap-4 items-center text-zinc-400 text-xs mt-2">
                <span>
                  Language: <span className="text-zinc-200 font-semibold">{data.meta.language}</span>
                </span>
                {/* Optional: Add meta info here if available */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog content (MDX) */}
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={data.content} components={CustomMDXComponents()} />
      </div>
    </div>
  );
}
