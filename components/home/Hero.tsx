import Image from "next/image";
import Link from "next/link";
import { Fish, Drumstick, Truck, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
      relative
      overflow-hidden
      bg-gradient-to-r
      from-sky-700
      via-sky-700
      to-sky-500
      text-white
    "
    >
      <div
        className="
  mx-auto
  flex
  max-w-7xl
  flex-col
  gap-4
  px-5
  py-5

  lg:grid
  lg:grid-cols-2
  lg:items-center
  lg:gap-10
  lg:px-8
  lg:py-10
"
      >
        {/* LEFT CONTENT */}

        <div
          className="
          text-center
          lg:text-left
        "
        >
          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white/20
            px-4
            py-2
            text-xs
            font-medium

            sm:text-sm
          "
          >
            🐟 Fresh Seafood & 🍗 Fresh Chicken
          </span>

          <h1
            className="
            mt-5
            text-3xl
            font-extrabold
            leading-tight

            sm:text-4xl
            lg:text-6xl
          "
          >
            Bale Juku' Ta'
          </h1>

          <p
            className="
            mx-auto
            mt-4
            max-w-xl
            text-sm
            leading-relaxed
            text-sky-100

            sm:text-base
            lg:mx-0
            lg:text-xl
          "
          >
            Ikan Segar, Ikan Frozen, Ayam Fresh dan Ayam Frozen langsung dari
            supplier terpercaya.
          </p>

          {/* BUTTON */}

          <div
            className="
            mt-6
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:justify-center

            lg:justify-start
          "
          >
            <Link
              href="/produk"
              className="
                rounded-2xl
                bg-white
                px-6
                py-3
                text-sm
                font-bold
                text-sky-700
                shadow-lg
                transition
                hover:scale-105

                sm:text-base
              "
            >
              Lihat Produk
            </Link>

            <a
              href="https://wa.me/6285111202275"
              target="_blank"
              className="
                rounded-2xl
                border
                border-white
                px-6
                py-3
                text-sm
                font-bold
                transition
                hover:bg-white
                hover:text-sky-700

                sm:text-base
              "
            >
              Hubungi Kami
            </a>
          </div>

          {/* FEATURE */}

          <div
            className="
            mt-8
            grid
            grid-cols-2
            gap-3

            lg:mt-10
            lg:gap-5
          "
          >
            <Feature
              icon={<Fish size={22} />}
              title="Ikan Fresh"
              desc="Siap Masak"
            />

            <Feature
              icon={<Drumstick size={22} />}
              title="Ayam Fresh"
              desc="Dibersihkan"
            />

            <Feature
              icon={<Truck size={22} />}
              title="Pengiriman"
              desc="Cepat"
            />

            <Feature
              icon={<ShieldCheck size={22} />}
              title="Kualitas"
              desc="Terjamin"
            />
          </div>
        </div>

        {/* IMAGE */}

        <div
          className="
  relative
  mx-auto
  mt-4
  w-full
  max-w-[430px]

  sm:mt-6
  sm:max-w-[520px]

  lg:mt-0
  lg:max-w-none
  "
        >
          <Image
            src="/hero-5.png"
            alt="Bale Juku' Ta'"
            width={3000}
            height={2000}
            priority
            className="
  h-auto
  w-full
  object-contain

  scale-110
  sm:scale-115
  lg:scale-125
"
          />
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-xl
      bg-white/10
      p-3

      sm:p-4
    "
    >
      <div>{icon}</div>

      <div className="text-left">
        <p
          className="
          text-xs
          font-bold

          sm:text-sm
        "
        >
          {title}
        </p>

        <p
          className="
          text-[11px]
          text-sky-100

          sm:text-xs
        "
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
