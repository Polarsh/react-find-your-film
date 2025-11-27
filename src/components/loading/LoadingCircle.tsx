export default function LoadingCircle() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="rounded-full w-16 h-16 border-t-4 border-primary-main border-solid animate-spin" />
    </div>
  );
}
