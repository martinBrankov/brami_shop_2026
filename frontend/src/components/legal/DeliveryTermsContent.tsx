export default function DeliveryTermsContent() {
  return (
    <section className="page-shell bg-[#f5f7fa] pt-2 pb-6">
      <div className="surface-card space-y-4 p-6 text-purple-900 md:p-8">
        <h1 className="text-3xl font-semibold">Условия За Доставка</h1>
        <p className="leading-relaxed text-purple-800">
          Доставките се извършват на територията на България чрез избран от нас
          куриер до адрес или офис, посочен при завършване на поръчката.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Срок За Доставка</h2>
          <p className="leading-relaxed text-purple-800">
            Обичайният срок за обработка и изпращане на поръчка е от 1 до 3
            работни дни, освен ако изрично не е посочено друго.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Цена На Доставката</h2>
          <p className="leading-relaxed text-purple-800">
            Цената на доставката се определя спрямо тарифите на куриера и се
            уточнява при потвърждение на поръчката, когато е приложимо.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Получаване На Пратката</h2>
          <p className="leading-relaxed text-purple-800">
            Клиентът следва да провери видимото състояние на пратката при
            получаване. При установен проблем е необходимо това да бъде
            отбелязано пред куриера при приемането.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Невъзможност За Доставка</h2>
          <p className="leading-relaxed text-purple-800">
            При неточни или непълни данни за доставка си запазваме правото да се
            свържем с клиента за уточнение преди изпращане.
          </p>
        </div>
      </div>
    </section>
  );
}
