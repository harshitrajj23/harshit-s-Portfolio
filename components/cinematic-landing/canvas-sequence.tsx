"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const TOTAL_FRAMES = 224

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0")
  return `/animations/%20hero-sequence/ezgif-frame-${padded}.png`
}

interface CanvasSequenceProps {
  scrollProgress: number
}

export default function CanvasSequence({ scrollProgress }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const lastFrameRef = useRef(-1)
  const canvasSizeRef = useRef({ w: 0, h: 0 })
  const [loadedCount, setLoadedCount] = useState(0)

  // Preload all frames
  useEffect(() => {
    let count = 0
    const imgs: HTMLImageElement[] = []

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameSrc(i + 1)
      img.onload = () => {
        count++
        // Batch state updates to reduce re-renders
        if (count % 8 === 0 || count === TOTAL_FRAMES || count === 1) {
          setLoadedCount(count)
        }
      }
      imgs.push(img)
    }

    imagesRef.current = imgs

    return () => {
      imgs.forEach((img) => {
        img.onload = null
      })
    }
  }, [])

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const img = imagesRef.current[index]
    if (!img?.complete || !img.naturalWidth) {
      // Try to find the nearest loaded frame
      for (let offset = 1; offset < 10; offset++) {
        const tryIdx = index - offset
        if (tryIdx >= 0) {
          const tryImg = imagesRef.current[tryIdx]
          if (tryImg?.complete && tryImg.naturalWidth) {
            drawImageOnCanvas(ctx, canvas, tryImg)
            return
          }
        }
      }
      return
    }

    drawImageOnCanvas(ctx, canvas, img)
  }, [])

  const drawImageOnCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
      const w = window.innerWidth
      const h = window.innerHeight

      // Only resize canvas when dimensions change
      if (canvasSizeRef.current.w !== w || canvasSizeRef.current.h !== h) {
        canvas.width = w
        canvas.height = h
        canvasSizeRef.current = { w, h }
      }

      // Cover behavior — fill viewport without distortion
      const imgRatio = img.naturalWidth / img.naturalHeight
      const canvasRatio = w / h
      let dw: number, dh: number, dx: number, dy: number

      if (canvasRatio > imgRatio) {
        dw = w
        dh = w / imgRatio
        dx = 0
        dy = (h - dh) / 2
      } else {
        dh = h
        dw = h * imgRatio
        dx = (w - dw) / 2
        dy = 0
      }

      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(img, dx, dy, dw, dh)
    },
    []
  )

  // Render frame based on scroll progress
  useEffect(() => {
    const idx = Math.min(
      Math.max(Math.floor(scrollProgress * (TOTAL_FRAMES - 1)), 0),
      TOTAL_FRAMES - 1
    )

    if (idx !== lastFrameRef.current) {
      lastFrameRef.current = idx
      requestAnimationFrame(() => drawFrame(idx))
    }
  }, [scrollProgress, drawFrame])

  // Handle window resize
  useEffect(() => {
    const onResize = () => {
      canvasSizeRef.current = { w: 0, h: 0 } // force recalculation
      const idx = Math.max(lastFrameRef.current, 0)
      drawFrame(idx)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [drawFrame])

  const progress = loadedCount / TOTAL_FRAMES

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Loading progress */}
      {progress < 1 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-6">
            {/* Pulsing dot */}
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-white/60 animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-white/20 animate-ping" />
            </div>

            {/* Progress bar */}
            <div className="w-56 h-[1.5px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress * 100}%`,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.5))",
                }}
              />
            </div>

            <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-light">
              Loading
            </span>
          </div>
        </div>
      )}
    </>
  )
}
