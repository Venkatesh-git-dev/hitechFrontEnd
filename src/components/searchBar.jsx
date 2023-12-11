import { createEffect, createSignal } from "solid-js";
import { scrollBars } from "../utils/customStyles";

const debounceRateSec = 1;
let debounce;

export default function SearchBar(props) {
  let searchBarRef;

  const [suggestions, setSuggestions] = createSignal([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selected, setSelected] = createSignal(-1);
  const [showDropDown, setShowDropDown] = createSignal(false);
  const [hideDelete, setHideDelete] = createSignal(true);

  createEffect(() => {
    setShowDropDown(!!(searchTerm().length && suggestions().length));
  });

  return (
    <div class="relative w-full">
      <label class="sr-only">Search {props.search}</label>
      <input
        ref={searchBarRef}
        type="text"
        class="w-full rounded-lg border-gray-200 px-9 py-2 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder={`Search ${props.search}`}
        autocomplete="off"
        value={searchTerm()}
        onInput={(e) => {
          setSearchTerm(e.currentTarget.value);
          setHideDelete(() => !searchTerm().trim().length);
          clearTimeout(debounce);
          debounce = setTimeout(() => {
            if (!searchTerm().trim().length) return;
            setSuggestions((prev) => [...prev, searchTerm().trim()]);
          }, debounceRateSec * 1000);
        }}
        onKeyDown={(e) => {
          if (!suggestions().length) return;

          if (e.key === "ArrowDown") {
            setSelected((prev) => prev + 1);
          } else if (e.key === "ArrowUp") {
            setSelected((prev) => prev - 1);
          }

          if (selected() < -1) {
            setSelected(suggestions().length - 1);
          } else if (selected() >= suggestions().length) {
            setSelected(-1);
          }

          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            if (selected() !== -1) {
              setSearchTerm(suggestions()[selected()]);
            }
          }
        }}
      />

      <div class="to pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <ion-icon
          name="search-outline"
          class="h-4 w-4 text-gray-400"
        ></ion-icon>
      </div>

      <button
        class="absolute right-0 top-0 flex aspect-square h-full items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        classList={{ hidden: hideDelete() }}
        onClick={() => {
          setSearchTerm("");
          setHideDelete(true);
          searchBarRef.focus();
        }}
      >
        <span>
          <ion-icon
            name="close-outline"
            class="relative top-[2px] text-xl"
          ></ion-icon>
        </span>
      </button>

      <Show when={showDropDown()}>
        <ul class="absolute z-10 mt-3 w-full rounded-lg bg-white p-2 shadow-md dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800">
          <Index each={suggestions()}>
            {(item, i) => (
              <li>
                <button
                  class="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                  classList={{
                    "bg-gray-100 dark:bg-gray-700 dark:text-gray-300":
                      selected() === i,
                  }}
                  onClick={() => {
                    setSearchTerm(item());
                    setShowDropDown(false);
                    searchBarRef.focus();
                  }}
                >
                  {item()}
                </button>
              </li>
            )}
          </Index>
        </ul>
      </Show>
    </div>
  );
}
