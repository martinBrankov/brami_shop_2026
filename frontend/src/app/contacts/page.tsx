import { Mail, MapPin, Phone } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex  justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-md border border-purple-100 max-w-md w-full p-6 text-purple-900">
        <h1 className="text-2xl font-semibold mb-4 text-center">Свържете се с нас</h1>

        <div className="space-y-4 text-sm leading-relaxed">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-purple-700 mt-0.5" />
            <p>
              Гр. София, кв. Кривина<br />
              ул. „Демокрация“ 13
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-purple-700" />
            <a href="tel:+359889342781" className="hover:underline">
              +359 889 342 781
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-purple-700" />
            <div className="flex flex-col">
              <a href="mailto:info@brami-trade.com" className="hover:underline">
                info@brami-trade.com
              </a>
              <a href="mailto:sales@brami-trade.com" className="hover:underline">
                sales@brami-trade.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-purple-600">
          Можете да се свържете с нас в работни дни от<br/>09:00 до 18:00
        </div>
      </div>
    </main>
  );
}
