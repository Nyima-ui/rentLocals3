import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchHomeListingsAction } from "@/lib/action";

const seedCardData = [
  {
    id: 1,
    title: "Cleolight LED mask",
    price: 20,
    image: "/fake/flash.jpeg",
  },
  {
    id: 2,
    title: "VL utltrabrig Light",
    price: 40,
    image: "/fake/headLight.png",
  },
  {
    id: 3,
    title: "Mannequins heads",
    price: 50,
    image: "/fake/mannequins.jpg",
  },
  {
    id: 4,
    title: "G2132 Logitech mouse,G2132 Logitech mouse,G2132 Logitech mouse",
    price: 75,
    image: "/fake/mouse.avif",
  },
  {
    id: 5,
    title: "Some toolkit",
    price: 90,
    image: "/fake/screwtool.jpg",
  },
  {
    id: 6,
    title: "Cleolight LED mask",
    price: 20,
    image: "/fake/flash.jpeg",
  },
  {
    id: 7,
    title: "VL utltrabrig Light",
    price: 40,
    image: "/fake/headLight.png",
  },
  {
    id: 8,
    title: "Mannequins heads",
    price: 50,
    image: "/fake/mannequins.jpg",
  },
  {
    id: 9,
    title: "G2132 Logitech mouse",
    price: 75,
    image: "/fake/mouse.avif",
  },
  {
    id: 10,
    title: "Some toolkit",
    price: 90,
    image: "/fake/screwtool.jpg",
  },
];

const ListingsGrid = async () => {
  const listings = await fetchHomeListingsAction();
  return (
    <section className="mt-[32px]">
      <ul className="grid grid-cols-5 gap-x-[15px] gap-y-[24px] max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {listings.map((item) => (
          <li key={item.id}>
            <Link href={"/listings"}>
              <article className="rounded-md overflow-hidden bg-primary-100 p-[4px]">
                <div className="h-[244px] max-xl:h-[220px] max-lg:h-[210px] max-sm:h-[300px] overflow-hidden rounded-md">
                  <Image
                    height={244}
                    width={244}
                    src={item.pictures[0]}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-[8px] space-y-[2px] px-1">
                  <p className="font-medium">
                    ${item.price_day}
                    <span className="text-sm">/day</span>
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="leading-snug line-clamp-1 text-sm">
                      {item.title}
                    </p>
                    {/* <span>
                      <ArrowRight strokeWidth={1} size={20} />
                    </span> */}
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      <button className="mx-auto block mt-[60px] cursor-pointer bg-primary-100 rounded-md px-[15px] py-[10px] shadow-primary-200 text-sm font-medium hover:shadow-sm transition-shadow duration-150 ease-in">
        Show more
      </button>
    </section>
  );
};

export default ListingsGrid;
