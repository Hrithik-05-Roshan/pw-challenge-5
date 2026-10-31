export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      <p className="text-xs font-semibold text-[var(--muted-foreground)]">
        Loading Gatherly AI workspace...
      </p>
    </div>
  );
}
