"use client"

import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "@/components/ui/button"

export default function QRCodePage() {
  const [text, setText] = useState("")
  const [size, setSize] = useState(200)
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas")
    if (canvas) {
      const url = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = url
      link.click()
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">二维码生成器</h1>

        <div className="bg-white border border-border rounded-lg p-6 space-y-6">
          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              输入文本或链接
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入要转换为二维码的内容..."
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Size Slider */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              二维码尺寸: {size}px
            </label>
            <input
              type="range"
              min="100"
              max="400"
              step="10"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100px</span>
              <span>400px</span>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={qrRef}
              className="p-4 bg-white border border-border rounded-lg"
            >
              {text ? (
                <QRCodeCanvas
                  value={text}
                  size={size}
                  level="M"
                  marginSize={2}
                />
              ) : (
                <div
                  className="flex items-center justify-center bg-muted text-muted-foreground text-sm"
                  style={{ width: size, height: size }}
                >
                  输入内容后显示二维码
                </div>
              )}
            </div>

            <Button onClick={downloadQRCode} disabled={!text} className="w-full">
              下载二维码
            </Button>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          二维码在本地生成，内容不会上传到服务器
        </p>
      </div>
    </div>
  )
}
