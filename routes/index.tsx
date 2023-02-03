import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import TodoList from "../islands/TodoList.tsx";

interface AppProps {
  API_KEY: string;
}

export const handler: Handlers<AppProps> = {
  GET(_, ctx) {
    return ctx.render({ API_KEY: Deno.env.get("API_KEY") as string });
  },
};

export default function Home(props: PageProps<AppProps>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <header class="w-screen font-medium p-2 bg-black text-white text-center">
        Explore the power of Island Components with this instructional reference
        site
      </header>

      <section class="w-full h-screen flex flex-col justify-center items-center relative">
        <span class="text-center font-extrabold text-3xl mb-4">
          Fresh + Preact
        </span>
        <h1 class="text-black font-black text-7xl relative z-20 max-w-4xl text-center">
          Unleash the Potential of{" "}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
            Partial Hydration
          </span>
        </h1>
        <p class="text-center gray-700 text-xl mt-12 relative z-20">
          Take your web development to the next level with island components
        </p>
      </section>
      <section className="h-screen bg-gradient-to-br from-blue-500 to-[#0F766E] flex flex-col justify-center items-center">
        <h2 class="text-white font-black text-5xl text-center max-w-2xl mb-4">
          Task Island Component
        </h2>
        <TodoList api_key={props.data.API_KEY} />
      </section>
    </>
  );
}
