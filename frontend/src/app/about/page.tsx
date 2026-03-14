import Image from "next/image";
import gardenImage from "../../assets/images/about/garden.jpg";
import saffronImage from "../../assets/images/about/saffron.jpg";
import addelaSunny from "../../assets/images/about/addelaSunny.jpg";

export default function HomePage() {
  return (
    <section className="px-4 max-w-6xl mx-auto space-y-10">
      {/* Hero с мисия */}
      <div className="bg-purple-50 rounded-3xl p-6 text-purple-900 space-y-4">
        <div>
          <h1 className="text-3xl font-semibold text-purple-900 mb-3">
            Нашата мисия
          </h1>
          <p className="text-purple-800 leading-relaxed">
            Ние сме компания, обединена в мисията{" "}
            <strong>&quot;Здраве и красота с шафран&quot;</strong>. Шафранът,
            който влагаме в нашите продукти, отговаря на 1-во качество по
            ISO3632.
          </p>
        </div>

        {/* Картинка – без crop */}
        <div className="rounded-2xl overflow-hidden max-w-[800px]">
          <Image
            src={saffronImage}
            alt="Градини със шафран"
            className="w-full h-auto"
          />
        </div>
         <p className="text-purple-800 leading-relaxed">  
          Предлагаме продукти за лична хигиена и грижа с шафран.
         </p>
      </div>

      {/* Серията */}
      <div className="bg-purple-50 rounded-3xl p-5">
        <h2 className="text-xl font-semibold text-purple-900 mb-3">
          Серия „Saffron Adela Sunny“
        </h2>

        <p className="text-purple-800 leading-relaxed mb-3">
          Подбрани съставки за нежно, хидратиращо и ефективно почистване.
        </p>

        <ul className="list-disc ml-6 space-y-2 text-purple-800">
          <li>Суровини от естествен произход и отлична биосъвместимост.</li>
          <li>Меки почистващи агенти - идеални за чувствителна кожа.</li>
          <li>
            Подпомагат регенерацията благодарение на <em>Crocus sativus</em>.
          </li>
        </ul>
        <div className="rounded-2xl overflow-hidden mb-4 mt-4 max-w-[800px]">
          <Image
            src={addelaSunny}
            alt="Градини със шафран"
            className="w-full h-auto"
          />
        </div>
        <p className="text-purple-800 leading-relaxed mb-3">
          Създадохме серия за ежедневна грижа и хигиена с шафран, която нарекохме "Saffron Adela Sunny". Тя е с подбрани висококачествени съставки за нежно, хидратиращо почистващо действие, подходящи за ежедневна употреба.
        </p>
      </div>

      {/* Картички с ползи */}
       <div className="bg-purple-50 rounded-3xl p-5">
        {[
          {
            title: "Сертифицирано качество",
            text: "Предлагаме козметични продукти, в съответствие с регламент ЕС 1223/2009 и свързаните с него. Екипът ни е обучен в правилата по добри производствени практики, за което сме сертифицирани по ISO 22716 - GMP Cosmetics.",
          },
          {
            title: "Ежедневна грижа",
            text: "Продуктите ни могат да се използват ежедневно при разумни количества от мъже, жени и деца над 3 годишна възраст.",
          },
          {
            title: "Нежни към кожата",
            text: "Създадени за чувствителна и реактивна кожа.",
          },
        ].map((card) => (
          <div key={card.title} className="pb-4">
            <h3 className="font-semibold text-purple-900 mb-1">
              {card.title}
            </h3>
            <p className="text-purple-900 text-sm leading-relaxed">
              {card.text}
            </p>
          </div>
        ))}
      </div>

      {/* Callout с гаранции */}
      <div className="bg-purple-50 rounded-3xl p-6 text-purple-900 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Нашите гаранции</h3>
          <ul className="list-disc ml-6 space-y-2 text-purple-800">
            <li>Не съдържат компоненти класифицирани като канцерогени, мутагени и токсични за репродукцията.</li>
            <li>Не са тествани върху животни.</li>
            <li>100% чист шафран от нашите градини, отговаря на 1-во качество по ISO3632.</li>
          </ul>
        </div>

        {/* Картинка – без crop */}
        <div className="rounded-2xl overflow-hidden max-w-[800px]">
          <Image
            src={gardenImage}
            alt="Градини със шафран"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
