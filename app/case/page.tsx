"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type CaseMode = "upper" | "lower" | "capitalize" | "sentence" | "toggle"

export default function CasePage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const caseModes: { value: CaseMode; label: string; example: string }[] = [
    { value: "upper", label: "全部大写", example: "HELLO WORLD" },
    { value: "lower", label: "全部小写", example: "hello world" },
    { value: "capitalize", label: "首字母大写", example: "Hello World" },
    { value: "sentence", label: "句首大写", example: "Hello world. How are you?" },
    { value: "toggle", label: "大小写互换", example: "hELLO wORLD" },
  ]

  const convertCase = (mode: CaseMode) => {
    let result = ""

    switch (mode) {
      case "upper":
        result = input.toUpperCase()
        break
      case "lower":
        result = input.toLowerCase()
        break
      case "capitalize":
        result = input
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        break
      case "sentence":
        result = input
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        break
      case "toggle":
        result = input
          .split("")
          .map((char) =>
            char === char.toUpperCase()
              ? char.toLowerCase()
              : char.toUpperCase()
          )
          .join("")
        break
    }

    setOutput(result)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">大小写转换</h1>

        <div className="bg-white border border-border rounded-lg p-6 space-y-6">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">输入文本</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在这里输入需要转换大小写的文本..."
              rows={5}
              className="w-full px-3 py-2 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Conversion Buttons */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">选择转换模式</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {caseModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => convertCase(mode.value)}
                  className="p-3 border border-input rounded-md hover:border-primary hover:bg-accent transition-colors text-left"
                >
                  <div className="text-sm font-medium text-foreground">{mode.label}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {mode.example}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">转换结果</label>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                disabled={!output}
              >
                {copied ? "已复制" : "复制"}
              </Button>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="转换后的文本将显示在这里..."
              rows={5}
              className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm resize-none"
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          支持多种大小写转换模式，适用于英文文本处理
        </p>
      </div>
    </div>
  )
}
