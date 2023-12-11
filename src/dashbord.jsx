import EmployeeTypes from "./menuItems/employeeTypes";

export default function Dashboard(props) {
  return (
    <>
      {/* SIDEBAR */}
      <div
        id="application-sidebar"
        class="hs-overlay fixed bottom-0 start-0 top-0 z-[60] hidden w-64 -translate-x-full transform overflow-y-auto border-e border-gray-200 bg-white pt-10 transition-all duration-300 hs-overlay-open:translate-x-0 dark:border-gray-700 dark:bg-gray-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
      >
        <div class="flex h-full w-full flex-col gap-4">
          {/* AVATAR */}
          <div class="flex w-full flex-col items-center px-6 text-center">
            <div class="flex aspect-square w-16 items-center  justify-center rounded-full bg-blue-100 text-2xl font-bold dark:bg-slate-700">
              <span>m.</span>
            </div>
            <h3 class="mt-2 w-full truncate font-semibold text-gray-800 dark:text-white">
              Mark Wanner
            </h3>
            <div class="hs-dropdown relative w-full">
              <button
                id="hs-dropdown-hover-event"
                type="button"
                class="hs-dropdown-toggle flex w-full items-center justify-center gap-2 text-center text-sm font-medium text-gray-400 transition-all hover:text-gray-500 dark:hover:text-gray-300"
              >
                <p>Admin</p>
                <ion-icon
                  name="ellipsis-vertical-outline"
                  class="text-xs"
                ></ion-icon>
              </button>

              <div
                class="hs-dropdown-menu duration mt-2 hidden min-w-[15rem] rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full hs-dropdown-open:opacity-100 dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800"
                aria-labelledby="hs-dropdown-hover-event"
              >
                <a
                  class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                  href="#"
                >
                  Newsletter
                </a>
                <a
                  class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                  href="#"
                >
                  Purchases
                </a>
                <a
                  class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                  href="#"
                >
                  Downloads
                </a>
                <a
                  class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                  href="#"
                >
                  Team Account
                </a>
              </div>
            </div>
          </div>

          {/* MENU */}
          <nav class="[&::-webkit-scrollbar]:w- flex h-full w-full flex-grow flex-col overflow-y-auto py-4 dark:border-gray-700 dark:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700">
            <ul class="flex flex-col gap-1.5 px-3">
              <li>
                <button
                  type="button"
                  class="inline-flex w-full gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Button
                </button>
              </li>
            </ul>
          </nav>

          {/* USER OPTIONS */}
          <div class="flex justify-between p-8 pb-4">
            <div class="hs-tooltip inline-block [--placement:top]">
              <button
                type="button"
                class="hs-tooltip-toggle inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <ion-icon
                  name="notifications-outline"
                  class="h-6 w-6"
                ></ion-icon>
                <span
                  class="hs-tooltip-content invisible absolute z-20 inline-block whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white opacity-0 hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 dark:bg-neutral-700"
                  role="tooltip"
                >
                  Notifications
                </span>
              </button>
            </div>
            <div class="hs-tooltip inline-block [--placement:top]">
              <button
                type="button"
                class="hs-tooltip-toggle inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <ion-icon name="settings-outline" class="h-6 w-6"></ion-icon>
                <span
                  class="hs-tooltip-content invisible absolute z-20 inline-block whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white opacity-0 hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 dark:bg-neutral-700"
                  role="tooltip"
                >
                  Settings
                </span>
              </button>
            </div>
            <div class="hs-tooltip inline-block [--placement:top]">
              <button
                type="button"
                class="hs-tooltip-toggle inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <ion-icon name="log-out-outline" class="h-6 w-6"></ion-icon>
                <span
                  class="hs-tooltip-content invisible absolute z-20 inline-block whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white opacity-0 hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 dark:bg-neutral-700"
                  role="tooltip"
                >
                  Sign out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="md:pr-18 z-20 flex w-full gap-3 border-y bg-white py-4 pl-4 pr-14 duration-300 dark:border-gray-700 dark:bg-gray-800 sm:pl-6 sm:pr-20 md:pl-8 lg:hidden">
        <div class="flex max-w-full gap-3">
          <button
            type="button"
            class="flex items-center text-gray-500 hover:text-gray-600"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Toggle navigation"
          >
            <span class="sr-only">Toggle Navigation</span>
            <ion-icon name="menu-outline" class="text-xl"></ion-icon>
          </button>
          <div class="truncate text-sm text-gray-800 dark:text-gray-400">
            Lab assistant
          </div>
          <div>
            <ion-icon
              name="chevron-forward-outline"
              class="text-gray-400 dark:text-gray-600"
            ></ion-icon>
          </div>
          <div class="truncate text-sm font-semibold text-gray-800 dark:text-gray-400">
            Test types
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main class="w-full flex-grow p-4 sm:px-6 md:px-8 lg:pl-72 lg:pt-16">
        <EmployeeTypes />
      </main>
    </>
  );
}
