import { createEffect, createSignal } from "solid-js";
import Dashboard from "./dashbord";

function App() {
  const [darkTheme, setDarkTheme] = createSignal(
    document.documentElement.classList.contains("dark"),
  );

  createEffect(() => {
    darkTheme()
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  });

  return (
    <div class="relative h-screen min-h-[667px] w-screen bg-gray-100 text-gray-950 dark:bg-slate-900 dark:text-white">
      <div class="mx-auto flex h-full w-full flex-col">
        <Dashboard />
      </div>

      {/* Theme toggler */}
      <div
        class="absolute right-0 top-0 z-20 px-2 py-2 transition-all duration-300 sm:mr-6 md:mr-8"
        classList={{ "blur-sm": blur() }}
      >
        <button
          type="button"
          class="rounded-full dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={(e) => {
            setDarkTheme((prev) => !prev);
          }}
        >
          <span class="flex aspect-square h-10 items-center justify-center rounded-full text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800">
            <Show
              when={darkTheme()}
              fallback={
                <ion-icon name="sunny-outline" class="text-xl"></ion-icon>
              }
            >
              <ion-icon name="moon-outline"></ion-icon>
            </Show>
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;
