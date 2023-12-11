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
</Show>;

<Show when={addDBBtnOpen()}>
  <div class="absolute z-10 mt-4 w-full">
    <div
      class="mx-auto max-h-32 max-w-xs overflow-auto rounded-lg bg-white p-2 shadow-md dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800"
      classList={{ [scrollBars()]: true }}
    >
      <Index
        each={collection().filter(
          (x) => !data.databaseAccess.map((x) => x.databaseName).includes(x),
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
</Show>;
