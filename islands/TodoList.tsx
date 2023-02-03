import { useEffect, useRef, useState } from "preact/hooks";

type Todo = {
  label: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const labelRef = useRef<HTMLInputElement>(null);

  const handleTodo = () => {
    console.log("called");
    const label = labelRef?.current?.value;
    if (label) {
      setTodos((prev) => [...prev, { label }]);
      labelRef.current.value = "";
    }
  };

  const [country, setCountry] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${
            Deno.env.get("API_KEY")
          }`,
        )
          .then((res) => res.json())
          .then((data) => {
            setCountry(data.results[0].components.country);
          });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const time = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <>
      <p class="text-lg text-gray-200 mt-3 text-center max-w-xl text-gray-200 mt-4">
        This component was rendered on the server-side on the fly on{" "}
        <span class="font-bold">{time}</span>
      </p>
      <p class="text-lg text-gray-200 mt-4">
        Thank you for connecting from{" "}
        <span class="font-bold">
          {country ?? "loading.."}
        </span>
      </p>
      <div className="flex flex-col justify-center items-center mt-12">
        <div className="flex flex-col  rounded-md h-96 bg-gray-100 shadow-md  bg-opacity-10 p-4">
          {todos?.map((todo, idx) => {
            return (
              <div
                key={idx}
                className="rounded-md px-4 shadow-md border  bg-white bg-opacity-20 items-center py-2 mt-2 flex justify-between text-white "
              >
                <p>{todo.label}</p>
                <button
                  className="border border p-1 rounded-lg"
                  onClick={() => {
                    setTodos((prev) => prev.filter((_, i) => i !== idx));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {" "}
              </div>
            );
          })}
          <div className="mt-auto">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter" && todos.length < 4) {
                  handleTodo();
                }
              }}
              ref={labelRef}
              className="w-full shadow-sm text-sm border-gray-300 rounded-md px-4 py-2 border my-4"
              placeholder="my cool task"
            />
            <button
              onClick={() => {
                if (todos.length < 4) {
                  handleTodo();
                }
              }}
              className="bg-[#115E59] w-full text-sm font-semibold rounded-md px-4 py-3 text-white"
            >
              add task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
