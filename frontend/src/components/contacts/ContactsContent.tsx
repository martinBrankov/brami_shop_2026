import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactsContent() {
  return (
    <main className="bg-[#f5f7fa] pt-6 pb-10">
      <div className="page-shell">
        <div className="surface-card p-6 text-purple-900 md:p-8">
          <h1 className="mb-6 text-2xl font-semibold text-center md:text-3xl">
            Свържете се с нас
          </h1>

          <div className="grid gap-6 text-sm leading-relaxed md:grid-cols-3 md:text-base">
            <div className="flex items-start gap-3 rounded-xl bg-purple-50/70 p-4">
              <MapPin className="mt-0.5 h-5 w-5 text-purple-700" />
              <p>
                Гр. София, кв. Кривина
                <br />
                ул. „Демокрация“ 13
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-purple-50/70 p-4">
              <Phone className="h-5 w-5 text-purple-700" />
              <a href="tel:+359889342781" className="hover:underline">
                +359 889 342 781
              </a>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-purple-50/70 p-4">
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

          <div className="mt-8 text-center text-sm text-purple-600">
            Можете да се свържете с нас в работни дни от
            <br />
            09:00 до 18:00
          </div>
        </div>
      </div>
    </main>
  );
}
