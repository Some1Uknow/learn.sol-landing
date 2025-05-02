"use client"

import { useEffect, useRef } from "react"

export default function AIAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation parameters
    const particles: Particle[] = []
    const particleCount = 50
    const colors = ["#14F195", "#9945FF", "#00C2FF"]
    const maxRadius = 3

    // Particle class
    class Particle {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number; y: number }
      alpha: number

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 1,
          y: (Math.random() - 0.5) * 1,
        }
        this.alpha = Math.random() * 0.8 + 0.2
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }

      update() {
        if (!canvas) return

        this.x += this.velocity.x
        this.y += this.velocity.y

        // Bounce off edges
        if (this.x + this.radius > canvas.width / window.devicePixelRatio || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x
        }

        if (this.y + this.radius > canvas.height / window.devicePixelRatio || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y
        }

        this.draw()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * maxRadius + 1
      const x = Math.random() * (canvas.width / window.devicePixelRatio - radius * 2) + radius
      const y = Math.random() * (canvas.height / window.devicePixelRatio - radius * 2) + radius
      const color = colors[Math.floor(Math.random() * colors.length)]

      particles.push(new Particle(x, y, radius, color))
    }

    // Draw chat bubble
    const drawChatBubble = () => {
      if (!ctx || !canvas) return

      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // Draw main bubble
      const bubbleWidth = width * 0.8
      const bubbleHeight = height * 0.6
      const bubbleX = width / 2 - bubbleWidth / 2
      const bubbleY = height / 2 - bubbleHeight / 2

      ctx.save()
      ctx.beginPath()
      ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 16)
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1
      ctx.fill()
      ctx.stroke()

      // Draw typing indicator
      const dotRadius = 4
      const dotSpacing = 8
      const startX = width / 2 - dotSpacing * 2
      const startY = height / 2

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(startX + i * dotSpacing * 2, startY, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = i === 0 ? "#14F195" : i === 1 ? "#9945FF" : "#00C2FF"
        ctx.fill()
      }

      // Draw code snippet
      const codeX = bubbleX + 20
      const codeY = bubbleY + 20
      const codeWidth = bubbleWidth - 40
      const codeHeight = 60

      ctx.beginPath()
      ctx.roundRect(codeX, codeY, codeWidth, codeHeight, 8)
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
      ctx.fill()

      // Draw code lines
      const lineHeight = 10
      const lineY = codeY + 15

      for (let i = 0; i < 3; i++) {
        const lineWidth = Math.random() * 100 + 50
        ctx.beginPath()
        ctx.roundRect(codeX + 15, lineY + i * 15, lineWidth, lineHeight, 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.fill()
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      drawChatBubble()

      particles.forEach((particle) => {
        particle.update()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="relative w-full max-w-md aspect-square">
      <canvas ref={canvasRef} className="w-full h-full rounded-xl" />
    </div>
  )
}
