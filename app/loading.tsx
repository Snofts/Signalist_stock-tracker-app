export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center text-gray-400"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className="inline-block h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
        <span className="text-sm md:text-base">Loading…</span>
      </div>
    </div>
  );
}
