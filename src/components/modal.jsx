import { createEffect } from "solid-js";

export default function Modal(props) {
  /**
   * @param  show={{ showModal, setShowModal }}
   * @param  closeOnOverlayClick={false || true}
   * @param  title={modalTitle()}
   * @param  prop.children
   */

  props.closeOnOverlayClick =
    props.closeOnOverlayClick === false ? false : true;
  function close(e) {
    if (e.key === "Escape") props.show.setShowModal(false);
  }

  createEffect(() => {
    if (props.show.showModal()) document.addEventListener("keydown", close);
    else document.removeEventListener("keydown", close);
  });

  return (
    <div
      class="fixed left-0 top-0 z-[60] flex h-screen w-screen flex-col items-center justify-center px-8 pb-24 pt-12"
      classList={{ hidden: !props.show.showModal() }}
    >
      <div
        class="absolute left-0 top-0 -z-10 h-full w-full bg-black bg-opacity-60"
        onClick={() => props.show.setShowModal(!props.closeOnOverlayClick)}
      ></div>

      <div class="flex max-h-full w-full max-w-2xl flex-col rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
        <div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {props.title}
          </h3>

          <button
            type="button"
            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => props.show.setShowModal(false)}
          >
            <ion-icon name="close-outline" class="h-5 w-5"></ion-icon>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <Show when={props.show.showModal()}>{props.children}</Show>
      </div>
    </div>
  );
}
