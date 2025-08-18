import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const foods = [
  {
    emoji: "🍕",
    name: "Pizza",
    color: "from-yellow-400 to-orange-500",
    accent: "#f59e0b",
  },
  {
    emoji: "🍔",
    name: "Burger",
    color: "from-orange-400 to-red-500",
    accent: "#ea580c",
  },
  {
    emoji: "🍣",
    name: "Sushi",
    color: "from-green-400 to-emerald-500",
    accent: "#059669",
  },
  {
    emoji: "🥤",
    name: "Drink",
    color: "from-pink-400 to-rose-500",
    accent: "#e11d48",
  },
  {
    emoji: "🍰",
    name: "Dessert",
    color: "from-purple-400 to-violet-500",
    accent: "#7c3aed",
  },
  {
    emoji: "🌮",
    name: "Taco",
    color: "from-amber-400 to-yellow-500",
    accent: "#d97706",
  },
  {
    emoji: "🍜",
    name: "Ramen",
    color: "from-blue-400 to-cyan-500",
    accent: "#0891b2",
  },
  {
    emoji: "🥗",
    name: "Salad",
    color: "from-lime-400 to-green-500",
    accent: "#16a34a",
  },
];

const LeftAside = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const asideRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!asideRef.current) return;
    const bounds = asideRef.current.getBoundingClientRect(); // ✅ Correct
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const container = asideRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl border border-white/10">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #ff6b6b 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #4ecdc4 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, #45b7d1 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, #f9ca24 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #ff6b6b 0%, transparent 50%)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      {/* Dynamic mesh background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`mesh-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: 100 + Math.random() * 100,
              height: 200 + Math.random() * 100,
              background: `radial-gradient(circle, ${
                [
                  "#ff6b6b",
                  "#4ecdc4",
                  "#45b7d1",
                  "#f9ca24",
                  "#f0932b",
                  "#e056fd",
                ][i % 6]
              }40, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + Math.random() * 4,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Floating particles with physics */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 6,
            height: 2 + Math.random() * 6,
            background: `linear-gradient(45deg, ${
              [
                "#ff6b6b",
                "#4ecdc4",
                "#45b7d1",
                "#f9ca24",
                "#f0932b",
                "#e056fd",
              ][Math.floor(Math.random() * 6)]
            }, white)`,
            boxShadow: `0 0 10px ${
              [
                "#ff6b6b",
                "#4ecdc4",
                "#45b7d1",
                "#f9ca24",
                "#f0932b",
                "#e056fd",
              ][Math.floor(Math.random() * 6)]
            }`,
          }}
          initial={{
            x: Math.random() * 500,
            y: Math.random() * 500,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 500,
            y: Math.random() * 500,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Central energy core */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 20, ease: "linear" },
          scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="w-96 h-96 rounded-full border border-white/20 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm"
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0.2), inset 0 0 0px rgba(255,255,255,0.1)",
              "0 0 40px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.2)",
              "0 0 0px rgba(255,255,255,0.2), inset 0 0 0px rgba(255,255,255,0.1)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Premium food items with advanced physics */}
      {foods.map((food, i) => {
        const angle = i * 45 + Date.now() / 100;
        const radius = 140;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={`food-${i}`}
            className="absolute z-20"
            style={{
              x: x + mousePosition.x * (0.5 + i * 0.1),
              y: y + mousePosition.y * (0.5 + i * 0.1),
            }}
            initial={{
              scale: 0,
              rotate: -180,
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: i * 0.15,
              duration: 1.5,
              ease: [0.68, -0.55, 0.265, 1.55],
            }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{
                background: `conic-gradient(from ${i * 45}deg, ${
                  food.accent
                }, transparent, ${food.accent})`,
                width: 120,
                height: 120,
                left: -10,
                top: -10,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                opacity: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: i * 0.2,
                },
              }}
            />

            {/* Main food container */}
            <motion.div
              className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${food.color} shadow-2xl border border-white/30 backdrop-blur-sm flex items-center justify-center cursor-pointer overflow-hidden`}
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  `0 10px 25px rgba(0,0,0,0.3), 0 0 0px ${food.accent}`,
                  `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${food.accent}`,
                  `0 10px 25px rgba(0,0,0,0.3), 0 0 0px ${food.accent}`,
                ],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 2 + Math.random(),
                  ease: "easeInOut",
                  delay: i * 0.1,
                },
                rotate: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: i * 0.2,
                },
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: i * 0.3,
                },
              }}
              whileHover={{
                scale: 1.3,
                rotate: [0, 360],
                transition: {
                  duration: 0.6,
                  ease: [0.68, -0.55, 0.265, 1.55],
                },
              }}
              whileTap={{
                scale: [1, 0.8, 1.2],
                rotate: [0, 180],
                transition: { duration: 0.3 },
              }}
            >
              {/* Inner shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-100, 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />

              {/* Food emoji with micro animations */}
              <motion.div
                className="text-3xl lg:text-4xl z-10 filter drop-shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, -2, 0],
                  textShadow: [
                    `0 0 0px ${food.accent}`,
                    `0 0 20px ${food.accent}`,
                    `0 0 0px ${food.accent}`,
                  ],
                }}
                transition={{
                  scale: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                  textShadow: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  },
                }}
              >
                {food.emoji}
              </motion.div>

              {/* Orbiting sparkles */}
              {[...Array(3)].map((_, sparkleI) => (
                <motion.div
                  key={`sparkle-${i}-${sparkleI}`}
                  className="absolute w-2 h-2 rounded-full bg-white shadow-lg"
                  style={{
                    boxShadow: `0 0 10px ${food.accent}`,
                  }}
                  animate={{
                    x:
                      Math.cos(
                        ((sparkleI * 120 + Date.now() / 20) * Math.PI) / 180
                      ) * 40,
                    y:
                      Math.sin(
                        ((sparkleI * 120 + Date.now() / 20) * Math.PI) / 180
                      ) * 40,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    x: { repeat: Infinity, duration: 3, ease: "linear" },
                    y: { repeat: Infinity, duration: 3, ease: "linear" },
                    scale: {
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: sparkleI * 0.5,
                    },
                    opacity: {
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: sparkleI * 0.5,
                    },
                  }}
                />
              ))}
            </motion.div>

            {/* Food name label */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-semibold tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 + 1 }}
            >
              {food.name}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Central premium branding */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl lg:text-6xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 40px rgba(255,107,107,0.8)",
                "0 0 20px rgba(255,255,255,0.5)",
              ],
              scale: [1, 1.02, 1],
            }}
            transition={{
              textShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            }}
          >
            FOODIE
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 font-light tracking-widest"
            animate={{
              opacity: [0.7, 1, 0.7],
              y: [0, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            PREMIUM FLAVORS
          </motion.p>
        </div>
      </motion.div>

      {/* Professional light rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute w-1 bg-gradient-to-t from-transparent via-white/20 to-transparent"
          style={{
            height: "200%",
            left: "50%",
            top: "-50%",
            transformOrigin: "bottom center",
            rotate: i * 45,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default LeftAside;
