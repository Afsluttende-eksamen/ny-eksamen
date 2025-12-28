import Image from "next/image";
import Spotify from "../components/some/Spotify";
import SoMeEmbed from "../components/some/SoMeEmbed";
import Link from "next/link";
import Button from "../components/ui/Button";
import InstagramFeed from "../components/some/instaAPI";

export default function AboutPage() {
  return (
    <div>
      <h1 className="leading-none -mb-16 text-center ">OM OS </h1>

      <Image
        src="/images/img-omhero.webp"
        alt="Billede af Danser Med Piger"
        width={1728}
        height={946}
        className="lg:size-4/5 mx-auto"
      />
      <div className="px-8">
        <p className="max-w-[65ch] mx-auto">
          Vi er fem venner, der har delt kærligheden for musik siden barndommen.
          Vi voksede op med instrumenter i hænderne og et øvelokale, der hurtigt
          blev vores andet hjem. Gennem årene har venskabet været fundamentet
          for vores lyd - ærlig, energisk og fyldt med den glæde, der opstår,
          når man spiller musik med mennesker, man kender ud og ind. For os
          handler musik ikke kun om toner og tekster, men om fællesskab, nærvær
          og de øjeblikke, der opstår mellem os og publikum. Vi laver musik,
          fordi vi elsker det, og fordi det stadig føles lige så rigtigt, som da
          vi spillede vores første akkorder sammen.{" "}
        </p>

        <Image
          src="/svg/dmp2.svg"
          alt="Danser med piger signatur"
          width={400}
          height={370}
          className="mx-auto my-8"
        />
      </div>
      <br />

      <h2 className="py-8 px-4 text-left">Se hvad der sker bag scenen</h2>

      <div className="px-2 md:px-8">
        <SoMeEmbed />
      </div>
      <div className="text-center my-10">
        <h3>Lyt til vores musik</h3>
        <Spotify />
      </div>

      <InstagramFeed className="cursor-pointer" />
    </div>
  );
}
