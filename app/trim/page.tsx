"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type TrimMode = "all" | "leading" | "trailing" | "multiple" | "lines"

export default function TrimPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<TrimMode>("all")
  const [copied, setCopied] = useState(false)

  const trimModes: { value: TrimMode; label: string; description: string }[] = [
    { value: "all", label: "去除所有空格", description: "删除文本中的所有空格" },
    { value: "leading", label: "去除行首空格", description: "删除每行开头的空格" },
    { value: "trailing", label: "去除行尾空格", description: "删除每行结尾的空格" },
    { value: "multiple", label: "合并连续空格", description: "将多个连续空格合并为一个" },
    { value: "lines", label: "去除空行", description: "删除文本中的空白行" },
  ]

  const processText = () => {
    let result = input

    switch (mode) {
      case "all":
        result = input.replace(/\s/g, "")
        break
      case "leading":
        result = input
          .split("\n")
          .map((line) => line.trimStart())
          .join("\n")
        break
      case "trailing":
        result = input
          .split("\n")
          .map((line) => line.trimEnd())
          .join("\n")
        break
      case "multiple":
        result = input.replace(/[ \t]+/g, " ")
        break
      case "lines":
        result = input
          .split("\n")
          .filter((line) => line.trim() !== "")
          .join("\n")
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
        <h1 className="text-2xl font-bold text-foreground mb-6">文本去空格</h1>

        <div className="bg-white border border-border rounded-lg p-6 space-y-6">
          {/* Mode Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">处理模式</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trimModes.map((m) => (
                <label
                  key={m.value}
                  className={`flex items-start gap-2 p-3 border rounded-md cursor-pointer transition-colors ${
                    mode === m.value
                      ? "border-primary bg-accent"
                      : "border-input hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={m.value}
                    checked={mode === m.value}
                    onChange={(e) => setMode(e.target.value as TrimMode)}
                    className="mt-1 accent-primary"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">输入文本</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在这里粘贴需要处理的文本..."
              rows={6}
              className="w-full px-3 py-2 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring font-mono"
            />
          </div>

          {/* Process Button */}
          <Button onClick={processText} className="w-full">
            处理文本
          </Button>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">处理结果</label>
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
              placeholder="处理后的文本将显示在这里..."
              rows={6}
              className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm resize-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
