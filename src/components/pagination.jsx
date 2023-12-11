{
  /* <Pagination total,skip,limit
  data={paginationData}
  fn={(e, btn) => {
    if (btn === paginationData.skip) return;
    setPaginationData("skip", btn);
  }}
/>; */
}

import { Index, createEffect, createSignal } from "solid-js";

export default function Pagination(props) {
  const ellipsis = "...";

  const [paginationArr, setPaginationArr] = createSignal([]);

  createEffect(() => {
    const arrSize = Math.ceil(props.data.total / props.data.limit);
    const skip = props.data.skip;

    setPaginationArr(() =>
      Array.from({ length: arrSize }, (_, i) => i)
        .map((x) =>
          x === 0 ||
          x === arrSize - 1 ||
          x === skip - 1 ||
          x === skip ||
          x === skip + 1
            ? x
            : ellipsis,
        )
        .filter(
          (x, i, arr) => Number.isInteger(x) || Number.isInteger(arr[i - 1]),
        ),
    );
  });

  return (
    <Show when={props.data.total > props.data.limit}>
      <nav class="flex items-center justify-center gap-x-1">
        <Index each={paginationArr()}>
          {(x) => (
            <button
              type="button"
              classList={{
                "lex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg bg-blue-200 px-2.5 py-1.5 text-sm text-gray-900 focus:bg-gray-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-600 dark:text-white dark:focus:bg-gray-500":
                  x() === props.data.skip,
                "lex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg px-2.5 py-1.5 text-sm text-gray-800 hover:bg-blue-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10":
                  x() !== props.data.skip,
              }}
              disabled={x() === ellipsis}
              {...(x() === props.data.skip ? { "aria-current": "page" } : {})}
              onClick={(e) => props.fn(e, x())}
            >
              <Show when={!Number.isInteger(x())} fallback={x() + 1}>
                <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
              </Show>
            </button>
          )}
        </Index>
      </nav>
    </Show>
  );
}
