export default function GdprContent() {
  return (
    <section className="page-shell bg-[#f5f7fa] pt-2 pb-6">
      <div className="surface-card space-y-4 p-6 text-purple-900 md:p-8">
        <h1 className="text-3xl font-semibold">GDPR И Защита На Личните Данни</h1>
        <p className="leading-relaxed text-purple-800">
          Ние обработваме личните Ви данни единствено за целите на приемане,
          обработка и изпълнение на поръчките, комуникация с Вас и спазване на
          законовите ни задължения.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Какви данни събираме</h2>
          <p className="leading-relaxed text-purple-800">
            Име, телефон, имейл адрес, адрес за доставка и информация,
            необходима за администриране на поръчката.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">За какво ги използваме</h2>
          <p className="leading-relaxed text-purple-800">
            За потвърждение на поръчката, организация на доставката,
            счетоводни нужди и обслужване при запитвания, рекламации или
            последваща комуникация, свързана с поръчката.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Вашите права</h2>
          <p className="leading-relaxed text-purple-800">
            Имате право на достъп, корекция, ограничаване, изтриване и
            възражение срещу обработването на личните Ви данни съгласно
            приложимото законодателство.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Контакт</h2>
          <p className="leading-relaxed text-purple-800">
            За въпроси относно обработването на лични данни можете да се
            свържете с нас на{" "}
            <a href="mailto:info@brami-trade.com" className="underline">
              info@brami-trade.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
