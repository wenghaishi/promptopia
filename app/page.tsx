import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-sourced AI prompting tool for mordern world to
        discover, create and share creative prompts.
      </p>

      <Feed />
    </section>
  );
}
