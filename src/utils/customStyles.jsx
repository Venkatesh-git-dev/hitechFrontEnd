function scrollBars() {
  return `lg:[&::-webkit-scrollbar-thumb]:rounded-full
  lg:[&::-webkit-scrollbar-thumb]:bg-gray-300
  lg:dark:[&::-webkit-scrollbar-thumb]:bg-slate-500
  lg:[&::-webkit-scrollbar-track]:rounded-full
  lg:[&::-webkit-scrollbar-track]:bg-gray-100
  lg:dark:[&::-webkit-scrollbar-track]:bg-slate-700
  lg:[&::-webkit-scrollbar]:h-2 lg:[&::-webkit-scrollbar]:w-2`;
}

export { scrollBars };
