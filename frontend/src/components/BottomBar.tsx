export default function BottomBar() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 border-t border-[#b77fd6]/45 bg-gradient-to-r from-[rgba(196,123,223,0.78)] to-[rgba(110,43,145,0.78)] backdrop-blur-2xl shadow-[0_-10px_28px_rgba(110,43,145,0.22)] supports-[backdrop-filter]:from-[rgba(196,123,223,0.62)] supports-[backdrop-filter]:to-[rgba(110,43,145,0.62)]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 via-white/5 to-transparent" />

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
            className="text-sm text-white leading-relaxed text-center hover:text-white/90 hover:underline cursor-pointer transition-colors"
          >
            За поръчки позвънете на тел. +359 889 342 781
          </a>
        </nav>
      </div>
    </footer>
  );
}
