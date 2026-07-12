import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Direction = "next" | "prev";
type Role = "center" | "left" | "right" | "back";

type CharacterItem = {
  src: string;
  bg: string;
  panel: string;
  name: string;
  subName: string;
  slogan: string;
  intro: string;
};


const CHARACTERS: CharacterItem[] = [
  {
    src: "ip/role-1-akejie.png",
    bg: "#5578A8",
    panel: "#7392BF",
    name: "阿客姐",
    subName: "A KE JIE",
    slogan: "美味触手可及，温暖常伴左右",
    intro:
      "她是客家美食文化的温柔化身，身着蓝色大襟衫与红色腰带，将坚韧、智慧与亲切融入一颦一笑，用传统与现代交融的方式，把客家味道与人间温暖传递给更多人。",
  },
  {
    src: "ip/role-2-xiaoguangguang.png",
    bg: "#F25549",
    panel: "#F77D73",
    name: "小广光",
    subName: "XIAO GUANG GUANG",
    slogan: "创意有我正青春，灵感闪耀每一天",
    intro:
      "她是第十七届大广赛的创意形象代表，象征新时代大学生在广告艺术中的青春能量与表达热情，也是陪伴参赛者不断探索、持续发想的灵感伙伴。",
  },
  {
    src: "ip/role-3-awei.png",
    bg: "#D3A56E",
    panel: "#E2BE90",
    name: "阿围",
    subName: "A WEI",
    slogan: "阿围在，家就在，守护团圆与归属",
    intro:
      "他以关西新围这一经典围屋文化为灵感原型，象征团结、防御与传承，也承载着客家人坚韧不拔、守望相助、崇文重教的精神气质。",
  },
  {
    src: "ip/role-4-lingyao.png",
    bg: "#F24A42",
    panel: "#FF857F",
    name: "灵曜",
    subName: "LINGYAO",
    slogan: "灵感被点亮，创意正发生",
    intro:
      "他是第十八届大广赛“AI无界·创意赋新章”主题下诞生的官方创意伙伴，象征AI协同创作时代的灵感能量与青春表达，陪伴创作者把想法一步步变成作品。",
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    CHARACTERS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const roles = useMemo(() => {
    return {
      center: activeIndex,
      left: (activeIndex + 3) % 4,
      right: (activeIndex + 1) % 4,
      back: (activeIndex + 2) % 4,
    };
  }, [activeIndex]);

  const navigate = (direction: Direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setActiveIndex((prev) =>
      direction === "next" ? (prev + 1) % 4 : (prev + 3) % 4
    );

    window.setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getRole = (index: number): Role => {
    if (index === roles.center) return "center";
    if (index === roles.left) return "left";
    if (index === roles.right) return "right";
    return "back";
  };

  const getItemStyle = (role: Role): CSSProperties => {
    const base: CSSProperties = {
      position: "absolute",
      aspectRatio: "0.72 / 1",
      transition:
        "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)",
      willChange: "transform, filter, opacity",
    };

    if (role === "center") {
      return {
        ...base,
        left: "50%",
        bottom: isMobile ? "17%" : "2%",
        height: isMobile ? "56%" : "82%",
        transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.08})`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
      };
    }

    if (role === "left") {
      return {
        ...base,
        left: isMobile ? "18%" : "32%",
        bottom: isMobile ? "31%" : "13%",
        height: isMobile ? "18%" : "26%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.78,
        zIndex: 10,
      };
    }

    if (role === "right") {
      return {
        ...base,
        left: isMobile ? "82%" : "68%",
        bottom: isMobile ? "31%" : "13%",
        height: isMobile ? "18%" : "26%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.78,
        zIndex: 10,
      };
    }

    return {
      ...base,
      left: "50%",
      bottom: isMobile ? "33%" : "14%",
      height: isMobile ? "15%" : "22%",
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 0.85,
      zIndex: 5,
    };
  };

  const activeCharacter = CHARACTERS[activeIndex];

  const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: activeCharacter.bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            backgroundImage: grainSvg,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            opacity: 0.4,
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{ zIndex: 2, top: "18%" }}
        >
          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(90px, 28vw, 380px)",
              fontWeight: 900,
              color: "white",
              opacity: 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            IP WORLD
          </div>
        </div>

        <div
          className="absolute left-4 top-6 text-xs font-semibold uppercase text-white sm:left-8"
          style={{
            zIndex: 60,
            opacity: 0.9,
            letterSpacing: "0.18em",
          }}
        >
          GAVI&apos;S IP
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {CHARACTERS.map((item, index) => {
            const role = getRole(index);

            return (
              <div key={item.src} style={getItemStyle(role)}>
                <img
                  src={item.src}
                  alt={`${item.name} ${item.subName}`}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: "360px" }}
        >
          <p
            className="mb-2 text-base font-bold uppercase tracking-widest text-white sm:mb-3 sm:text-[22px]"
            style={{
              opacity: 0.95,
              letterSpacing: "0.02em",
            }}
          >
            {activeCharacter.name} {activeCharacter.subName}
          </p>

          <div className="mb-4 hidden text-white sm:mb-5 sm:block">
            <p
              className="text-xs sm:text-sm"
              style={{
                opacity: 0.92,
                lineHeight: 1.6,
                fontWeight: 600,
              }}
            >
              {activeCharacter.slogan}
            </p>

            <p
              className="mt-2 text-xs sm:text-sm"
              style={{
                opacity: 0.8,
                lineHeight: 1.75,
              }}
            >
              {activeCharacter.intro}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("prev")}
              aria-label="Previous character"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white sm:h-16 sm:w-16"
              style={{
                backgroundColor: "transparent",
                transition: "transform 150ms, background-color 150ms",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "scale(1.08)";
                event.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "scale(1)";
                event.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={() => navigate("next")}
              aria-label="Next character"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white sm:h-16 sm:w-16"
              style={{
                backgroundColor: "transparent",
                transition: "transform 150ms, background-color 150ms",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "scale(1.08)";
                event.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "scale(1)";
                event.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a
          href="#"
          className="absolute bottom-6 right-4 flex items-center text-white no-underline sm:bottom-20 sm:right-10"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            opacity: 0.95,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            transition: "opacity 200ms",
            gap: "10px",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.opacity = "0.95";
          }}
        >
          DISCOVER MORE
          <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}

export default App;