export default function BottomBar() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40">
      <div className="relative bg-gradient-to-r from-[#C47BDF] to-[#6E2B91]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />

        <nav
          className="
            relative
            flex items-center justify-center
            px-5 pt-2
            pb-[calc(0.5rem+env(safe-area-inset-bottom))]
            text-xs text-white
          "
        >
          <a
            href="tel:+359889342781"
            className="text-sm text-white leading-relaxed text-center hover:underline cursor-pointer"
          >
            За поръчки позвънете на тел. +359 889 342 781
          </a>
        </nav>
      </div>
    </footer>
  );
}
