"use client"

import { useState, useMemo } from "react"

export default function CountPage() {
  const [text, setText] = useState("")

  const stats = useMemo(() => {
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, "").length
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
    const lines = text === "" ? 0 : text.split("\n").length
    const nonEmptyLines = text === "" ? 0 : text.split("\n").filter((l) => l.trim() !== "").length
    const paragraphs = text === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim() !== "").length

    // 中文字符统计
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
    // 英文单词统计
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length
    // 数字统计
    const numbers = (text.match(/\d+/g) || []).length
    // 标点符号
    const punctuation = (text.match(/[，。！？、；：""''【】《》（）,.!?;:'"()\[\]{}<>]/g) || []).length

    return {
      chars,
      charsNoSpace,
      words,
      lines,
      nonEmptyLines,
      paragraphs,
      chineseChars,
      englishWords,
      numbers,
      punctuation,
    }
  }, [text])

  const statItems = [
    { label: "总字符数", value: stats.chars },
    { label: "字符数（不含空格）", value: stats.charsNoSpace },
    { label: "中文字符", value: stats.chineseChars },
    { label: "英文单词", value: stats.englishWords },
    { label: "数字个数", value: stats.numbers },
    { label: "标点符号", value: stats.punctuation },
    { label: "总行数", value: stats.lines },
    { label: "非空行数", value: stats.nonEmptyLines },
    { label: "段落数", value: stats.paragraphs },
    { label: "词语数", value: stats.words },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">字数统计</h1>

        <div className="bg-white border border-border rounded-lg p-6 space-y-6">
          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">输入文本</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="在这里输入或粘贴文本，实时统计字数..."
              rows={8}
              className="w-full px-3 py-2 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Statistics Grid */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">统计结果</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {statItems.map((item) => (
                <div
                  key={item.label}
                  className="p-3 bg-muted rounded-md text-center"
                >
                  <div className="text-2xl font-bold text-primary">{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          输入即可实时统计，支持中英文混合文本
        </p>
      </div>
    </div>
  )
}
