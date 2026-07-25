import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Check } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-16">
      <div
        className="
        mx-auto
        max-w-7xl
        overflow-hidden
        rounded-[40px]
        bg-gradient-to-r
        from-[#032b63]
        via-[#0757a5]
        to-[#12a6d8]
        px-6
        py-10
        shadow-2xl
        md:px-12
        lg:py-14
      "
      >
        <div
          className="
          grid
          items-center
          gap-10
          lg:grid-cols-2
        "
        >
          {/* TEXT */}

          <div className="text-white">
            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/20
              px-5
              py-2
              text-sm
              font-semibold
              backdrop-blur
            "
            >
              🐟 Ikan Fresh
              <span>•</span>
              🍗 Ayam Pilihan
            </div>

            <h2
              className="
              mt-6
              text-4xl
              font-black
              leading-tight
              md:text-5xl
            "
            >
              Segar Dari Laut
              <br />
              Berkualitas Untuk
              <br />
              Keluarga Anda
            </h2>

            <p
              className="
              mt-5
              max-w-lg
              text-sky-100
              md:text-lg
            "
            >
              Nikmati ikan fresh, frozen, ayam fresh dan ayam frozen dengan
              kualitas terbaik. Pesan mudah, kami siap antar.
            </p>

            <div
              className="
              mt-6
              space-y-3
              text-sm
            "
            >
              <div className="flex items-center gap-3">
                <span
                  className="
                  rounded-full
                  bg-white/20
                  p-1
                "
                >
                  <Check size={16} />
                </span>
                Produk pilihan berkualitas
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="
                  rounded-full
                  bg-white/20
                  p-1
                "
                >
                  <Check size={16} />
                </span>
                Fresh & Frozen tersedia
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="
                  rounded-full
                  bg-white/20
                  p-1
                "
                >
                  <Check size={16} />
                </span>
                Pengiriman cepat
              </div>
            </div>

            <div
              className="
              mt-8
              flex
              flex-wrap
              gap-4
            "
            >
              <Link
                href="/produk"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-8
                  py-4
                  font-bold
                  text-sky-700
                  shadow-xl
                  transition
                  hover:scale-105
                "
              >
                Mulai Belanja
                <ArrowRight size={18} />
              </Link>

              <Link
                href="https://wa.me/6285111202275"
                target="_blank"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/50
                  px-8
                  py-4
                  font-bold
                  text-white
                  transition
                  hover:bg-white/20
                "
              >
                <MessageCircle size={20} />
                Chat Admin
              </Link>
            </div>
          </div>

          {/* IMAGE */}

          <div
            className="
            relative
            flex
            justify-center
          "
          >
            <div
              className="
              absolute
              h-72
              w-72
              rounded-full
              bg-white/20
              blur-3xl
            "
            />

            <div
              className="
              relative
              rounded-[35px]
              border
              border-white/20
              bg-white/10
              p-3
              backdrop-blur
            "
            >
              <Image
                src="/images/cta-produk.jpg"
                alt="Produk Bale Juku Ta"
                width={450}
                height={450}
                className="
                  h-[360px]
                  w-[360px]
                  rounded-[30px]
                  object-cover
                  md:h-[430px]
                  md:w-[430px]
                "
              />
            </div>

            {/* CARD */}

            <div
              className="
              absolute
              bottom-5
              left-2
              rounded-2xl
              bg-white
              px-6
              py-4
              shadow-2xl
            "
            >
              <p className="text-xs text-gray-500">Tersedia</p>

              <p
                className="
                text-xl
                font-black
                text-gray-800
              "
              >
                Fresh & Frozen
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
