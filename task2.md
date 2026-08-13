我审查的是当前 `main` 分支源码。整体判断是：**信息架构已经成功，视觉方向也找到了，但设计系统还停留在“有风格的 AI 原型”阶段。** 下一轮不应该继续加 feature，而应该进行一次比较彻底的 **visual consolidation / de-AI pass**。

### 总体评价

| 维度                   | 当前状态  |
| -------------------- | ----- |
| 信息架构                 | 很好    |
| 项目定位表达               | 很好    |
| 色彩方向                 | 好，有潜力 |
| 交互 Demo              | 好     |
| 页面节奏                 | 中等    |
| 品牌辨识度                | 中等偏低  |
| “AI 模板感”             | 明显    |
| Production readiness | 还早    |

我认为第一轮最成功的不是任何一个卡片，而是这几个元素形成的组合：

**米白底 + 墨黑 + 暗红强调 + 极细分隔线 + 编号章节 + terminal/canvas 实验性视觉。**

这套东西已经能发展成 ZeTermux 的官网语言。问题是，现在每当页面需要“装一段内容”，实现就自动回到了卡片。

---

## 1. 最大的问题：设计系统自己和自己冲突

CSS 开头把风格定义成：

> `grid-based minimalism / Swiss rules · flat blocks`

但紧接着实际组件大量是：

```css
.panel        border-radius: 12px
.th           border-radius: 8px
.tag          border-radius: 999px
.ime-chip     border-radius: 999px
.badge        border-radius: 999px
.chip         border-radius: 999px

.immersive-stage  border-radius: 14px
.graphics-frame   border-radius: 14px
.term-frame       border-radius: 14px

.principle    border-radius: 12px
.rm-phase     border-radius: 12px
.dl-card      border-radius: 14px
.doc-card     border-radius: 12px
```

而且源码甚至直接把一段命名为 `panels / bento blocks`。

这就是当前“AI 味”的主要来源。

不是因为圆角本身难看，而是：

> **card + 12px radius + thin gray border + pill tag + equal grid**

已经是现在 AI 生成 SaaS Landing Page 的默认语法。

你现在几乎把所有内容类型都翻译成了这一种视觉对象。

---

# 2. 下一轮应该首先制定“圆角禁令”

我会直接给设计系统一条比较激进的约束：

```text
Default radius: 0

Small controls:
0–3px

Actual device physical geometry:
can use larger radius

Pills:
forbidden by default

Cards:
forbidden unless the object is semantically a card
```

也就是说：

### 可以圆

手机实体 mockup：

```text
╭──────────────╮
│ Android      │
│ terminal     │
╰──────────────╯
```

因为手机确实是一个具有物理边界的对象。

### 不应该圆

```text
Terminal UX
Touch-first
Real fullscreen
```

这不是三个“卡片对象”，只是三个概念。

应该变成：

```text
A / TERMINAL UX
────────────────────────────────

Desktop:
mouse / keyboard / windows

Android:
touch / IME / constrained viewport


B / TOUCH FIRST
────────────────────────────────

Ctrl
Alt
Tab
Selection
Mouse
...


C / IMMERSIVE
────────────────────────────────

workspace > application chrome
```

用 **排版、线、留白、列关系** 做层级，而不是容器。

---

# 3. Hero 有一个很明显的概念冲突

Hero 的文案是：

> A terminal built for Android.

但是右边 Terminal Demo 顶部却有三个：

```text
● ● ●
```

典型 macOS desktop window traffic lights。

这是我第一批会删除的东西。

因为 ZeTermux 整个品牌核心明明是在说：

> 不要把 desktop interaction model 生搬到 Android。

结果官网第一屏自己却把 terminal 装进一个 Mac 风格窗口。

应该改成更 ZeTermux 的形式。

例如直接裸露 terminal：

```text
                   SESSION 01
                   ANDROID / ARM64

$ pkg update
$ neofetch

████████████████
████ ZETERMUX ███
████████████████

CTRL  ALT  ESC  TAB       80×24
──────────────────────────────
```

甚至可以让它突破正常页面网格。

这样第一屏马上就不像：

> developer SaaS landing page

而更像：

> 一个 terminal project 自己做的网页。

---

# 4. Section 组件正在制造“模板感”

现在几乎所有 section 都强制遵循：

```text
01
• LABEL

Large title
Lead paragraph

[content]
```

因为 `Section.tsx` 就是这么抽象的。

抽象在工程上是好的，但在视觉设计上造成了严重副作用：

```text
scroll

number
label
headline
paragraph
cards

scroll

number
label
headline
paragraph
cards

scroll

number
label
headline
paragraph
cards
```

用户很快就能预测下一屏是什么。

这也是 AI 网页常见问题：

> 每个 section 单独看都正确，组合起来却像组件样板展示页。

### 建议

`Section` 只负责：

```text
anchor
container width
vertical spacing
theme
```

不要让它决定完整标题结构。

然后允许不同章节有不同 composition。

例如：

### WHY

Editorial / manifesto layout

### TOUCH

巨大 phone + 一侧密集 annotation

### IMMERSIVE

全宽 Canvas

### IME

横向输入流

### GRAPHICS

几乎整屏 dark terminal

### COMPAT

package stream

### ROADMAP

vertical ledger

### DOCS

index

这样用户继续滚动时会不断看到新的信息组织方式。

---

# 5. 三等分卡片要大量删除

当前 Why：

```text
[ Terminal UX ]
[ Touch-first ]
[ Fullscreen ]
```

Principles 又是：

```text
[ 01 ]
[ 02 ]
[ 03 ]
```

Roadmap 又是：

```text
[ Foundation ]
[ Interaction ]
[ Immersion ]
[ Graphics ]
```

Docs 又是：

```text
[ Getting Started ]
[ Using ZeTermux ]
[ Terminal ]
[ Android ]
```

这些都用了相似的 card grid。

视觉上信息虽然不同，**构图却完全相同**。

我建议：

### Why → 三列 editorial typography

无边框或只有 vertical rules。

### Philosophy → 巨大数字

例如：

```text
01
TOUCH IS
NOT A
FALLBACK.
────────────────

02
POWER SHOULD
REMAIN
DISCOVERABLE.
────────────────
```

让数字本身成为视觉元素。

### Roadmap → 工程 ledger

类似：

```text
STATUS       SYSTEM                  STATE
────────────────────────────────────────────
████         FOUNDATION              SHIPPED
│
├─           architecture            released
├─           UI cleanup              released
└─           build toolchain         released

██░░         INTERACTION             ACTIVE
│
├─           touch controls          IN DEV
├─           gestures                IN DEV
└─           IME                     IN DEV
```

不是四张 Roadmap cards。

### Docs → 文档目录

```text
01  GETTING STARTED         Installation / First Launch       →
02  USING ZETERMUX          Touch / Keys / Gestures            →
03  TERMINAL                Sessions / Fonts / Graphics        →
04  ANDROID                 Storage / Permissions              →
```

这比四张圆角卡片更符合技术项目。

---

# 6. Pill 标签是第二大 AI 特征

现在这些：

```text
English
中文
日本語
한국어
Emoji
Third-party IMEs
```

全部是 pill。Graphics capability 也是 pill，Roadmap state 还是 pill。

这其实不需要。

IME 可以直接做成：

```text
INPUT SYSTEM
──────────────────────────────────

ENGLISH       中文       日本語
한국어        EMOJI      THIRD-PARTY

ANDROID IME PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         EXPERIMENTAL
```

Status 建议统一成 terminal / industrial notation：

```text
[SHIPPED]
[ACTIVE]
[EXPERIMENTAL]
[RESEARCH]
```

或者干脆：

```text
● ACTIVE
○ RESEARCH
× UNSUPPORTED
```

方形、小字体、强 tracking。

不要胶囊。

---

# 7. 现在的 Typography 也有一点“AI hacker site”

整个站全局：

```css
JetBrains Mono
```

甚至大标题、正文都是 JetBrains Mono。

`index.html` 还专门从 Google Fonts 加载整套 JetBrains Mono。

这第一眼当然很“terminal”，但是满屏 mono 后：

1. code 不再特别；
2. hierarchy 主要只能靠字号；
3. 长正文阅读效率下降；
4. 容易进入典型 hacker/dev landing page 风格。

我建议构造二元字体系统：

```text
DISPLAY / BODY
non-monospace grotesk

SYSTEM / LABEL / CODE
JetBrains Mono
```

比如：

```text
A terminal built
for Android.

ZETERMUX / SESSION 01 / ARM64
^^^^^^^^ mono
```

这样 Mono 变成 ZeTermux 的“机器语言”，而不是普通网页字体。

这比简单换一个新潮字体重要。

---

# 8. 暗红应该强化，而不是增加更多 UI 装饰

现在：

```css
--accent: #c83124;
--accent-bright: #ff5a3c;
```

我认为是不错的。

尤其和：

```text
#fafaf7
#14130f
```

组合后已经有一点印刷品 / Unix manual / industrial documentation 的感觉。

下一步反而应该更加克制：

```text
90% off-white / black
8% gray
2% red
```

Red 只出现于：

* cursor
* current state
* interaction focus
* active terminal stream
* logo mark
  -重要数字/标记

不要拿红色去填各种按钮和标签。

---

# 9. Dark Demo 应该从“黑色圆角卡片”升级成“另一个空间”

现在：

```text
immersive
graphics
compat
terminal
```

全都属于：

```css
background: dark
border: 1px
border-radius: 14px
overflow: hidden
```

于是它们长得很像一系列嵌入网页的 widgets。

我会让至少 Graphics / Interactive Terminal 直接突破 `.wrap`。

例如：

```text
website off-white
────────────────────────────

███████████████████████████████████
████████████ TERMINAL █████████████
███████████████████████████████████
███████████████████████████████████

────────────────────────────
website off-white
```

用户滚到这里会感觉自己真的“进入 terminal”。

这能形成非常明显的页面节奏转场。

---

# 10. Hero Canvas 本身是值得继续发展的

这部分反而不是“AI 默认模板”。

Hero 里自己画随机 code line、ASCII/glyph trail，并且不断产生红色 walker cell。

这是值得保留的原创方向。

但下一步不要让 Canvas 只是：

> 一个漂亮卡片里面的动画背景。

应该让它开始承担品牌行为。

例如鼠标/触屏经过时：

```text
glyph displacement
terminal cursor
touch trace
selection
escape sequence stream
```

甚至页面章节之间都可以通过同一种字符行为联系起来。

这样才会成为 **ZeTermux motion language**。

---

# 11. Interaction demo 的内容不错，但需要减少“假指标”

Touch Demo 当前甚至写了：

```text
Tap latency
< 16 ms key dispatch
```

如果这个数字不是 benchmark 得到的，我建议删掉。

官网上尤其不要出现这种非常精确但无来源的数据。

类似：

```text
v0.4.2
64 MB
Android 7.0+
200 MB storage
```

目前也全部 hard-code 在页面里。

这一点已经不仅仅是原型问题，而是上线前必须处理。

---

# 12. 当前存在两个严重的事实错误

这是我审查时发现最需要优先处理的部分。

## 其一：网站声称 v0.4.2 release

Hero 和 Download 都写：

```text
v0.4.2
64 MB
```

但我检查了当前 `JULESlois/ZeTermux` 的 GitHub Releases，`/releases/latest` 当前返回 **404，没有 latest release**。

所以在原型阶段应该：

```text
DEVELOPMENT BUILD
Preview
No stable release yet
```

而不是伪造正式 release。

未来直接让 GitHub Releases 成为 source of truth。

---

# 13. 更严重的是 License 写错了

ZemuxIntro 目前多处写：

```text
Apache License 2.0
```

例如 Hero meta、Project、Footer。

但当前 `JULESlois/ZeTermux` 仓库的 License 文件明确写的是：

> repository is released under **GPLv3 only**

而且该 License 文件目前仍然引用 `hanxinhao000/ZeroTermux`。

所以现在有一个项目迁移遗留问题：

```text
官网：
Termux-based
Apache-2.0

实际当前仓库：
仍含 ZeroTermux license lineage
GPLv3-only
```

在你完成“从 Termux 重新 fork / 整理代码来源 / License”之前，官网绝对不要声明 Apache 2.0。

这是 P0。

---

# 14. 导航现在还是 prototype wiring

例如 Nav 有：

```tsx
<a href="#features">Features</a>
```

但 Touch section 的 ID 实际是：

```tsx
id="touch"
```

另外：

```text
GitHub
Issues
Discussions
Contributing
Download APK
GitHub Releases
```

现在大量只是指向：

```text
#github
#download
#top
```

而不是真正 destination。

这作为 prototype 没问题，但上线前应该统一处理。

还有一个小错误：

```text
WHY ZETERMUX       01
TOUCH-FIRST        01
IMMERSIVE          02
...
```

所以章节编号重复。

我反而建议 **Why 不编号**，然后真正 feature 从 01 开始。

---

# 15. README 也说明它现在确实还只是第一轮

仓库 README 目前还是完整的：

> React + TypeScript + Vite

模板 README，没有任何 ZeTermuxIntro 内容。

package 本身倒很干净，目前只依赖 React / React DOM，没有堆 UI framework，这一点很好。

因此现在正是改设计系统的最好阶段。

没有 shadcn / Tailwind component ecosystem 的历史包袱。

---

# 我建议的第二轮视觉结构

不是重写信息架构，而是重构“表达方式”。

```text
NAV
────────────────────────────────────────


HERO

ZETERMUX / ANDROID TERMINAL / OSS

A TERMINAL BUILT
FOR ANDROID.

                    [raw terminal canvas]
                    [no desktop window]

DOWNLOAD                 GITHUB
────────────────────────────────────────


WHY ZETERMUX

A / DESKTOP MODEL            ANDROID MODEL
mouse                        touch
keyboard                     IME
window                       viewport
                             ↓
                     ZETERMUX INTERACTION


────────────────────────────────────────
TOUCH / 01

             huge phone
             │
annotation ──┤ CTRL
annotation ──┤ gestures
annotation ──┤ mouse
             │


████████████████████████████████████████
IMMERSIVE / 02

          FULL BLEED TERMINAL

████████████████████████████████████████


IME / 03

ENGLISH    中文    日本語    한국어
────────────────────────────────────────
ANDROID IME → COMPOSITION → TERMINAL


████████████████████████████████████████
GRAPHICS / 04

              SIXEL OUTPUT

████████████████████████████████████████


COMPATIBILITY / 05

pkg
apt
bash
zsh
fish
neovim
tmux
python
node
rust
clang
git
ssh

↑ live flowing package map


INTERACTIVE / 06

$ _


PHILOSOPHY

01                  02                  03
TOUCH               POWER               MOBILE
IS NOT              STAYS               ≠
FALLBACK             VISIBLE             DESKTOP


ROADMAP

engineering ledger / timeline


DOWNLOAD

VERSION / ARCH / RELEASE
────────────────────────────────────────


DOCS

01  Getting Started                           →
02  Using ZeTermux                            →
03  Terminal                                  →
04  Android                                   →


OPEN SOURCE
────────────────────────────────────────

GitHub / Issues / Contributing
```

---

## 可以把整个视觉规范浓缩成 8 条 Agent Rule

下一轮如果交给 agent，我会强制：

```text
1. No generic bento grids.
2. No pill-shaped tags or badges.
3. Default border-radius = 0.
4. Use borders/rules/spacing instead of containers.
5. Every major section must use a different composition.
6. JetBrains Mono is for system/code metadata, not all prose.
7. Canvas/terminal visuals may break out of the content grid.
8. Never imitate desktop window chrome on an Android-first product.
```

再加一个非常关键的：

```text
If removing a card does not make the information harder
to understand, remove the card.
```

这条基本能干掉 70% 的 AI 网站味。

---

## 优先级

我建议下一轮按照：

**P0 — correctness**

License、版本、release、下载地址、GitHub 地址、导航 anchor、项目 lineage。

**P1 — de-AI**

删除 pill、删除无意义圆角、删除 bento、删除 Mac window chrome。

**P2 — composition**

重新设计 Why / Philosophy / Roadmap / Docs，打破统一 Section 模板。

**P3 — identity**

加强 canvas、terminal transitions、ASCII/glyph/motion，建立真正属于 ZeTermux 的视觉语言。

**P4 — production**

SEO/OpenGraph、README、真实 release API、accessibility、移动性能、reduced motion、404/docs routing。

如果只让我选一个第二轮目标，我不会叫 agent “美化网站”，而会定义成：

> **ZeTermux Intro Phase 2 — Anti-Template Visual Consolidation**

也就是**保留第一轮全部有效的信息架构和 Canvas 工作，主动摧毁 card/pill/bento 视觉语法，并把网站从“terminal 风格的 landing page”推进成“ZeTermux 自己的界面/出版语言”。**
