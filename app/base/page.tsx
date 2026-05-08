"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

type Base = "2" | "8" | "10" | "16"

export default function BasePage() {
  const [inputBase, setInputBase] = useState<Base>("10")
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState({
    binary: "",
    octal: "",
    decimal: "",
    hex: "",
  })
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const baseNames: Record<Base, string> = {
    "2": "二进制",
    "8": "八进制",
    "10": "十进制",
    "16": "十六进制",
  }

  const basePlaceholders: Record<Base, string> = {
    "2": "例如: 1010",
    "8": "例如: 12",
    "10": "例如: 10",
    "16": "例如: A",
  }

  useEffect(() => {
    if (!inputValue.trim()) {
      setResults({ binary: "", octal: "", decimal: "", hex: "" })
      setError("")
      return
    }

    try {
      const decimal = parseInt(inputValue, parseInt(inputBase))

      if (isNaN(decimal)) {
        throw new Error("无效的数字")
      }

      if (decimal < 0) {
        throw new Error("请输入非负整数")
      }

      setResults({
        binary: decimal.toString(2),
        octal: decimal.toString(8),
        decimal: decimal.toString(10),
        hex: decimal.toString(16).toUpperCase(),
      })
      setError("")
    } catch {
      setError("输入的数字格式不正确")
      setResults({ binary: "", octal: "", decimal: "", hex: "" })
    }
  }, [inputValue, inputBase])

  const copyToClipboard = async (value: string, key: string) => {
    if (value) {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  const resultItems: { key: keyof typeof results; base: Base; label: string }[] = [
    { key: "binary", base: "2", label: "二进制 (BIN)" },
    { key: "octal", base: "8", label: "八进制 (OCT)" },
    { key: "decimal", base: "10", label: "十进制 (DEC)" },
    { key: "hex", base: "16", label: "十六进制 (HEX)" },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">进制换算</h1>

        <div className="bg-white border border-border rounded-lg p-6 space-y-6">
          {/* Input Base Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">输入进制</label>
            <div className="grid grid-cols-4 gap-2">
              {(["2", "8", "10", "16"] as Base[]).map((base) => (
                <button
                  key={base}
                  onClick={() => {
                    setInputBase(base)
                    setInputValue("")
                  }}
                  className={`py-2 text-sm rounded-md transition-colors ${
                    inputBase === base
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-accent"
                  }`}
                >
                  {baseNames[base]}
                </button>
              ))}
            </div>
          </div>

          {/* Input Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              输入{baseNames[inputBase]}数值
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              placeholder={basePlaceholders[inputBase]}
              className="w-full px-3 py-2 border border-input rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          {/* Results */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">转换结果</label>
            <div className="space-y-2">
              {resultItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 p-3 bg-muted rounded-md"
                >
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">
                      {item.label}
                    </div>
                    <div className="font-mono text-foreground break-all">
                      {results[item.key] || "-"}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(results[item.key], item.key)}
                    disabled={!results[item.key]}
                  >
                    {copied === item.key ? "已复制" : "复制"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          支持二进制、八进制、十进制、十六进制之间的相互转换
        </p>
      </div>
    </div>
  )
}
