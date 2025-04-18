export default function FormSubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className="mt-10 text-xl py-2 rounded-xl bg-white shadow-lg cursor-pointer | hover:bg-gray-100 hover:shadow-md transition-all duration-150">
      {children}
    </button>
  );
}
