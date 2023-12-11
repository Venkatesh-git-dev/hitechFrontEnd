import { createStore } from "solid-js/store";
import {
  Index,
  Show,
  Switch,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

import SearchBar from "../components/searchBar";
import Pagination from "../components/pagination";
import Modal from "../components/modal";
import { scrollBars } from "../utils/customStyles";
import { camelCase, capitalCase, sentenceCase } from "../utils/strFormatter";
import fetchData from "../utils/requests";
import debounce from "../utils/debounce.mjs";

const [paginationData, setPaginationData] = createStore({});
const [showModal, setShowModal] = createSignal(false);
const [cardsData, setCardsData] = createSignal([]);

const [collection, setCollection] = createSignal([]);

const [modalTitle, setModalTitle] = createSignal("");

async function loadCardsData({ data = {}, sort = {} }) {
  try {
    const res = await fetchData({
      endPoint: `employeeTypes?data=${JSON.stringify(data)}&limit=24&skip=0 `,
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    const tempData = await res.json();
    if (tempData.status === "fail") throw new Error(tempData.message);

    const { total, skip, limit, data: d1 } = tempData;
    setCardsData(d1);
    setPaginationData({ total, skip, limit });
  } catch (err) {
    alert(`${err.message}, Please try again later`);
  }
}

loadCardsData({ data: {}, sort: {} });

fetchData({ endPoint: "collection", method: "GET" })
  .then((x) => {
    if (!x.ok) {
      throw new Error(x.statusText);
    }
    return x.json();
  })
  .then((x) => {
    console.log(x);
    if (x.status === "fail") {
      throw new Error(x.message);
    }
    setCollection(x.data.collection);
  })
  .catch((err) => {
    alert(`${err.message}, Try again later`);
  });

export default function EmployeeTypes() {
  const [empType, setEmpType] = createSignal(false);

  return (
    <>
      <div class="flex h-full w-full flex-col gap-6">
        <div class="grid-col-2 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          <div class="col-span-full lg:col-span-3">
            <SearchBar search="test"></SearchBar>
          </div>

          <div class="col-span-full lg:col-span-1 lg:col-start-6 ">
            <button
              type="button"
              class="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={() => {
                setEmpType(false);
                setModalTitle("Add Employee Types");
                setShowModal(true);
              }}
            >
              <ion-icon name="add-outline" class="text-2xl"></ion-icon>
              <span>Add new</span>
            </button>
          </div>
        </div>

        {/* CARDS SECTION */}
        <div class="relative w-full flex-grow">
          <div
            class="absolute h-full w-full overflow-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
            classList={{ [scrollBars()]: true }}
          >
            <div class="grid gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              <Index each={cardsData()}>
                {(card) => (
                  <button
                    class="group flex flex-col rounded-xl border bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-slate-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={(e) => {
                      setEmpType(card());
                      setModalTitle(capitalCase(sentenceCase(card().name)));
                      setShowModal(true);
                    }}
                  >
                    <div class="w-full p-4 md:p-5">
                      <div class="flex items-center justify-between">
                        <div class="text-left">
                          <h3 class="font-semibold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-gray-400">
                            {capitalCase(sentenceCase(card().name))}
                          </h3>
                          <p class="text-sm text-gray-500">
                            Access to {card().databaseAccess.length}&nbsp;
                            {card().databaseAccess.length === 1
                              ? "database"
                              : "databases"}
                          </p>
                        </div>
                        <div class="shrink-0 ps-3">
                          <ion-icon
                            name="chevron-forward-outline"
                            class="text-xl"
                          ></ion-icon>
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </Index>
            </div>
          </div>
        </div>

        {/* END CARDS SECTION */}

        {/* PAGINATION SECTION */}
        <Pagination
          data={paginationData}
          fn={(e, btn) => {
            if (btn === paginationData.skip) return;
            setPaginationData("skip", btn);
          }}
        />
        {/* END PAGINATION SECTION */}
      </div>

      {/* MODAL */}
      <Modal
        show={{ showModal, setShowModal }}
        closeOnOverlayClick={false}
        title={modalTitle()}
      >
        <CRUD empType={empType} setEmpType={setEmpType} />
      </Modal>
    </>
  );
}

function CRUD(props) {
  const _data = props.empType()
    ? props.empType()
    : { name: "", databaseAccess: [] };

  const [data, setData] = createStore(_data);

  // state = disabled || confirm || create
  const [state, setState] = createSignal(
    props.empType() ? "disabled" : "create",
  );

  const [addDBBtnOpen, setAddDBBtnOpen] = createSignal(false);
  const DBActions = ["create", "read", "update", "delete"];

  let optionsClickOutsideTime;

  function dbOptionsClickOutside(e) {
    if (
      performance.now() - optionsClickOutsideTime > 100 &&
      !e.target.closest(`[data-id="addDBOptionsMenu"]`)
    ) {
      setAddDBBtnOpen(false);
    }
  }

  onMount(() => {
    document.addEventListener("click", dbOptionsClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("click", dbOptionsClickOutside);
  });

  return (
    <div class="space-y-4">
      <div class="flex flex-col gap-4">
        <label>
          <span class="mb-2 block text-sm font-medium dark:text-white">
            Name
          </span>

          <div class="relative">
            <input
              type="text"
              class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500
                 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Doctor, Nurse etc"
              value={data.name}
              disabled={state() === "disabled"}
              onInput={(e) => {
                if (!e.currentTarget.value.trim()) return;

                debounce({
                  fn: async (str) => {
                    const res = await fetchData({
                      endPoint: `employeeTypes?name=${str}`,
                      method: "GET",
                    });
                    const data = await res.json();
                    console.log(data);
                  },
                  str: e.currentTarget.value,
                });

                setData("name", e.currentTarget.value);
                console.log(data.name);
              }}
            />
          </div>
        </label>
      </div>
      <Show when={data.databaseAccess.length}>
        <div
          class="max-h-[200px] overflow-auto px-4"
          classList={{ [scrollBars()]: true }}
        >
          <table class="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <Index each={["database", ...DBActions, "remove"]}>
                  {(item, i) => (
                    <th
                      class="sticky top-0 bg-white px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:bg-gray-800"
                      classList={{
                        "left-0 z-30 text-start": !i,
                        "z-20 text-center": i,
                      }}
                    >
                      {item()}
                    </th>
                  )}
                </Index>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <Index each={data.databaseAccess}>
                {(row, i) => (
                  <tr>
                    <td class="sticky left-0 z-10 whitespace-nowrap bg-white px-6 py-4 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      {capitalCase(sentenceCase(row().databaseName + ""))}
                    </td>

                    <Index each={DBActions}>
                      {(action) => (
                        <td class="bg-white text-center dark:bg-gray-800">
                          <label class="h-full w-full">
                            <div class="flex h-10 w-full items-center justify-center">
                              <input
                                type="checkbox"
                                class="rounded border-gray-400 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                                disabled={state() === "disabled"}
                                checked={row()[action()]}
                                onInput={(e) => {
                                  setData(
                                    "databaseAccess",
                                    i,
                                    action(),
                                    e.currentTarget.checked,
                                  );
                                }}
                              />
                            </div>
                          </label>
                        </td>
                      )}
                    </Index>

                    <td class="flex justify-center bg-white px-6  py-4 text-center dark:bg-gray-800">
                      <button
                        type="button"
                        class="g-white flex h-[2rem] w-[2rem] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        disabled={state() === "disabled"}
                        onClick={() => {
                          const tempArr = data.databaseAccess.filter(
                            (x) => x.databaseName != row().databaseName,
                          );

                          setData("databaseAccess", tempArr);
                        }}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </td>
                  </tr>
                )}
              </Index>
            </tbody>
          </table>
        </div>
      </Show>

      <div class="relative">
        <Show when={state() === "confirm" || state() === "create"}>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={() => {
              setAddDBBtnOpen((prev) => !prev);

              optionsClickOutsideTime = addDBBtnOpen()
                ? performance.now()
                : undefined;
            }}
          >
            <span>Database Permission</span>
            <ion-icon
              name="chevron-down-outline"
              class="transition-all"
              classList={{
                "rotate-180": addDBBtnOpen(),
              }}
            ></ion-icon>
          </button>
        </Show>

        <Show
          when={
            addDBBtnOpen() &&
            collection().filter(
              (x) =>
                !data.databaseAccess.map((x) => x.databaseName).includes(x),
            ).length
          }
        >
          <div class="absolute z-10 mt-4 w-full">
            <div
              class="mx-auto max-h-32 w-full overflow-auto rounded-lg bg-white p-2 shadow-md dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800"
              classList={{ [scrollBars()]: true }}
              data-id="addDBOptionsMenu"
            >
              <Index
                each={collection().filter(
                  (x) =>
                    !data.databaseAccess.map((x) => x.databaseName).includes(x),
                )}
              >
                {(item) => (
                  <button
                    class="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                    onClick={() => {
                      const tempObj = DBActions.reduce((o, x) => {
                        o[x] = false;
                        return o;
                      }, {});
                      tempObj.databaseName = item();
                      const tempArr = data.databaseAccess.filter(
                        (x) => x.databaseName != item(),
                      );
                      tempArr.push(tempObj);
                      setData("databaseAccess", tempArr);
                    }}
                  >
                    {capitalCase(sentenceCase(item()))}
                  </button>
                )}
              </Index>
            </div>
          </div>
        </Show>
      </div>
      <div class="mt-6 flex gap-4">
        <Switch>
          <Match when={state() === "disabled"}>
            <button
              type="button"
              class="ml-auto flex items-center gap-x-2 rounded-lg border border-transparent bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Delete
            </button>

            <button
              type="button"
              class="flex items-center gap-x-2 rounded-lg border border-transparent bg-yellow-500 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-yellow-600 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={() => {
                setState("confirm");
                setModalTitle(`Edit ${capitalCase(sentenceCase(data.name))}`);
              }}
            >
              Edit
            </button>
          </Match>

          <Match when={state() === "create" || state() === "confirm"}>
            <button
              type="button"
              class="ml-auto flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-semibold text-white disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              classList={{
                "bg-blue-600 hover:bg-blue-700": state() == "create",
                "bg-teal-600 hover:bg-teal-700": state() === "confirm",
              }}
              onclick={async () => {
                console.log(data);
                if (!data.name.trim()) {
                  alert("name field cannot be empty");
                } else if (!data.databaseAccess.length) {
                  alert("Add some database access to the list");
                }
                const res = await fetchData({
                  endPoint: "employeeTypes",
                  method: "POST",
                  body: { ...data },
                });
              }}
            >
              {state() === "confirm"
                ? "Confirm Changes"
                : "Add new Employee type"}
            </button>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
