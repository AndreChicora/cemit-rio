export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-[#B91C1C]">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-xs font-semibold underline hover:no-underline"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
