import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  amplitude: number;
  phase: number;
  life: number;
  maxLife: number;
  fadeIn: number;
}

export function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const PETAL_COUNT = isMobile ? 10 : 25;

    const colors = [
      '#C17A5F',
      '#D4A853',
      '#8A9B7A',
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPetal = (): Petal => {
      const size = 6 + Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.2 + Math.random() * 0.4;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + size,
        size,
        color,
        opacity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        speedY: 0.3 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        amplitude: 30 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: canvas.height / (0.3 + Math.random() * 0.5),
        fadeIn: 0,
      };
    };

    const initPetals = () => {
      petalsRef.current = [];
      for (let i = 0; i < PETAL_COUNT; i++) {
        const petal = createPetal();
        petal.y = Math.random() * canvas.height;
        petal.life = Math.random() * petal.maxLife;
        petalsRef.current.push(petal);
      }
    };

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);

      let currentOpacity = petal.opacity;
      if (petal.fadeIn < 120) {
        currentOpacity *= petal.fadeIn / 120;
      }
      if (petal.life > petal.maxLife - 180) {
        currentOpacity *= (petal.maxLife - petal.life) / 180;
      }

      ctx.globalAlpha = currentOpacity;
      ctx.fillStyle = petal.color;

      // Draw teardrop/petal shape
      ctx.beginPath();
      ctx.moveTo(0, -petal.size);
      ctx.bezierCurveTo(
        petal.size * 0.6, -petal.size * 0.4,
        petal.size * 0.6, petal.size * 0.4,
        0, petal.size
      );
      ctx.bezierCurveTo(
        -petal.size * 0.6, petal.size * 0.4,
        -petal.size * 0.6, -petal.size * 0.4,
        0, -petal.size
      );
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal) => {
        petal.life++;
        petal.fadeIn++;
        petal.y -= petal.speedY;
        petal.rotation += petal.rotationSpeed;
        petal.x += petal.speedX + Math.sin(petal.life * 0.01 + petal.phase) * 0.3;

        if (petal.life >= petal.maxLife || petal.y < -petal.size * 2) {
          const newPetal = createPetal();
          Object.assign(petal, newPetal);
        }

        drawPetal(petal);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initPetals();
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
