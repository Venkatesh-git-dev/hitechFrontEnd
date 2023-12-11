const debounceRateSec = 1;
let debounceTimer;

export default function debounce({ fn, str }) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fn, debounceRateSec * 1000, str);
}
