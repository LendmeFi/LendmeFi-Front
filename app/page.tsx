"use client";
import { title, subtitle } from "@/components/primitives";

import Nfts from "@/components/lendMeFiComponents/nft-listing";
import ActiveLoans from "@/app/ActiveLoans";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-8 py-12 md:py-16">
            <div className="inline-block max-w-lg xl:max-w-3xl text-center">
                <h1 className={title()}>Lendme</h1>
                <h1 className={title()} style={{ color: "#1637b7" }}>
                    Fi&nbsp;
                </h1>

                <br />
                <h2 className={subtitle({ class: "mt-6" })}>
                    Beautiful, fast and modern way to borrow NFTs
                </h2>
            </div>

            <div className="w-full max-w-4xl xl:max-w-full">
                <Tabs aria-label="Options" className="w-full">
                    <Tab
                        key="nfts"
                        title="NFTs"
                        className="text-xl font-semibold"
                    >
                        <Card className="p-8">
                            <CardBody>
                                <Nfts />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="activeLoans"
                        title="Active Loans"
                        className="text-xl font-semibold"
                    >
                        <Card className="p-8">
                            <CardBody>
                                <ActiveLoans />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}
