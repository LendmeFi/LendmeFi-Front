import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>LendMe</h1>
        <h1 className={title({ color: "violet" })}>Fi&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern way borrow nft.
        </h2>
      </div>
    </section>
  );
}
