"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

export default function PasswordPage() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let chars = ""
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) chars += "0123456789"
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (chars === "") {
      setPassword("请至少选择一种字符类型")
      return
    }

    let result = ""
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }
    setPassword(result)
    setCopied(false)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const copyToClipboard = async () => {
    if (password && password !== "请至少选择一种字符类型") {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">随机密码生成器</h1>

        <div className="bg-white border border-border rounded-lg p-6 space-y-6">
          {/* Password Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">生成的密码</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="点击下方按钮生成密码"
                className="flex-1 px-3 py-2 bg-muted border border-input rounded-md text-sm font-mono"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                disabled={!password || password === "请至少选择一种字符类型"}
              >
                {copied ? "已复制" : "复制"}
              </Button>
            </div>
          </div>

          {/* Length Slider */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              密码长度: {length}
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">包含字符</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">大写字母 (A-Z)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">小写字母 (a-z)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">数字 (0-9)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">特殊符号</span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={generatePassword} className="w-full">
            生成密码
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          使用加密安全的随机数生成器，密码仅在本地生成
        </p>
      </div>
    </div>
  )
}
