---
title: '理解零知識證明背後的數學'
date: '2025-02-21'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "/zh/understanding-math-behind-zkps"
images: ['../assets/03_zkboo_headshot.png']
summary: "本文將解釋零知識證明（ZKPs）背後的數學原理。內容適合聰明的中學生或生疏的理工科畢業生閱讀。我們將直觀地理解底層運作原理，並建立關鍵概念的基礎框架。文章附帶不到100行程式碼的玩具實作，無需多項式或橢圓曲線知識。"
---

本文由 Nicole、PinHao 和 Anton 翻譯

![ZKBoo](../assets/03_zkboo_headshot.png 'ZKBoo')

## 前言

本文將解釋零知識證明（ZKPs）背後的數學原理。內容適合聰明的高中生（或是很久沒碰數學的理工畢業生）。我們將直觀地理解底層運作原理，並建立關鍵概念的基礎框架。文章附帶不到 100 行程式碼的實作，完全不需要對多項式或橢圓曲線的先備知識。

### 先備知識

我們假設兩件事：

- **你熟悉零知識證明的基本概念**：了解高層次概念即可，例如閱讀過[零知識證明的友善介紹](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge)。
- **不害怕數學符號**：本文假設讀者要麼是（a）很久以前修過數學課的理工科(STEM[^1])畢業生，要麼是（b）喜歡數學的聰明高中生。不需要電腦科學、數學或密碼學的相關背景。

閱讀本文的主要要求是有學習的好奇心與動力。若遇到特定主題知識不足，可以隨時上網查閱[^2]。另外，雖然建議閱讀前兩篇文章，但嚴格來說只需第一篇。數學背景方面，我們盡量只使用基礎數學，你只需要對以下概念有基本理解：

- 方程組（同時解多個方程式）
- 模運算（時鐘數學）
- 布林函數（AND、OR）
- 雜湊函數（如SHA256）
- 隨機性概念（隨機數）
- 基礎機率（隨機拋硬幣）
- 質數（知道其存在）
- 基礎數學符號（檢查等式；$a_i$ 表示第 $i$ 個下標）

即使不熟悉上述內容，也能透過閱讀逐步掌握。

### 概述

以下是我們的學習路線。所有概念將在相應章節介紹，現在不理解術語也沒關係。

首先介紹關鍵概念，這些是基礎概念：電路（circuits）、功能完備性（functional completeness）、承諾（commitments）、秘密分享（secret sharing）和 Sigma 協議（sigma protocols）。

接著看具體的 ZKP 協議：ZKBoo[^3]。ZKBoo 是非常簡單的協議，不需要橢圓曲線密碼學等進階數學，能幫助你直觀的理解底層運作。

我們會先從使用秘密分享來證明簡單的限制式開始，逐步加上：透過 Sigma 協議實現互動性、功能完備性，以及證明多個限制式。透過多輪執行提升安全性（健全性），最後用 Fiat-Shamir 轉換把它變成非互動式。

你將了解如何向驗證者（verifier）證明這組限制式，同時滿足健全性、非互動性，並保持某些變數的零知識性：

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

完成基本的 ZKBoo 協議後，我們會看看它與其他你聽過的 zkSNARK 有什麼關聯，並指出 ZKBoo 缺少哪些要素，為之後比較各種現代 ZKP 協議奠定基礎。

最後，附錄收錄了一些延伸主題。附錄 A 示範如何用 SageMath [^4] 在大約 50 行程式碼內實作 ZKBoo 核心程式；整個玩具版的協議也不到 100 行，並附上 GitHub 程式碼倉庫供進一步探索。

附錄 B 說明如何把布林電路（boolean circuit）通用化成算術電路（arithmetic circuit），附錄 C 則列出 zkSNARK 更正式的數學定義。

那就讓我們開始吧。

## 關鍵概念

_以下章節介紹關鍵概念，如電路、功能完備性、承諾、秘密分享和 Sigma 協議。_

### 電路 

在ZKP中，我們證明知道某個秘密，使得對其進行某些計算會產生特定輸出，同時不揭露秘密本身。這些計算由一組必須滿足的 「限制式」 組成，我們可以將其建模為 「電路」。

例如，我們可以用「符合以下限制式」，來表達一個計算：

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

這裡 $a, b, d$ 是私有輸入，$e$ 是公開輸出[^5]。$c$ 由 $a, b$ 決定，屬於中間變數。

可視化為以下電路：

![Circuit](../assets/03_circuit.png 'Circuit')

與普通電腦程式不同，限制式是無序的，或者說順序不重要，因為所有限制式都必須滿足[^6]。 這意味著公開輸入和公開輸出在數學上沒有區別[^7]。

我們通常將不同類型變數分為：

- _見證變數（witness variables）_ - 私有變數，僅證明者（prover）知道
- _實例變數（instance variables）_ - 公開變數，輸入或輸出，證明者和驗證者都知道

不同社群或文章對這些變數的稱呼不盡相同，了解多種說法十分有用。數學上，我們希望用下列方式表達一個電路：

$$
C(x,w) = 0
$$

其中 $x$ 是公開變數（$e$），$w$ 是見證變數 $(a, b, d)$。因此我們將上面的算式轉換為：

$$
\begin{aligned}
a \cdot b - c = 0 \\
c + d - e = 0
\end{aligned}
$$

在 ZKP 中，我們要做的是證明一組方程同時成立，但不洩漏見證變數的任何資訊。[^8]

### 功能完備性

如何將我們要解的方程式或限制式與電腦程式連結起來？最簡單的理解方式是從最原始的例子開始：**布林電路（boolean circuit）**。

若所有值都是布林值 $0$ 或 $1$，則稱為「布林電路」。在布林代數中，所有值都是 0 或 1。我們可以定義簡單的邏輯閘，就像電子電路。例如，XOR是「互斥或」，其真值表如下：

$$
\begin{array}{|c|c|c|c|}
\hline
a & b & \text{XOR} \\
\hline
0 & 0 & 0 \\
0 & 1 & 1 \\
1 & 0 & 1 \\
1 & 1 & 0 \\
\hline
\end{array}
$$

事實上，我們只需要兩個邏輯閘 `XOR` 和 `AND` 就能表達任何可能的計算。這稱為「功能完備性」[^9]，意味著我們可以用這兩個操作表達任何真值表。

前一節的電路依賴加法和乘法。如果改成操作布林值，會發現這些是等價的：

$$
\begin{array}{|c|c|c|c|}
\hline
a & b & \text{XOR/(ADD)} & \text{AND/(MUL)} \\
\hline
0 & 0 & 0 & 0 \\
0 & 1 & 1 & 0 \\
1 & 0 & 1 & 0 \\
1 & 1 & 0 & 1 \\
\hline
\end{array}
$$

即`XOR` 行為像 `ADD`，`AND` 行為像`MUL`。例如，在布林代數中 $1+1 = 0$（模 2）。同樣，我們可以輕鬆表達`OR`和`NAND`（NOT-AND）閘：

$$
\begin{aligned}
\text{OR(a,b)} &= a + b - (a \cdot b) \\
\text{NAND(a,b)} &= 1 - (a \cdot b)
\end{aligned}
$$

用這樣的簡單布林閘，我們可以建造現代電腦。想了解如何實現，可參考《From Nand to Tetris》 這本書，展示如何從簡單的 `NAND` 布林閘從零開始建造現代電腦[^10]。

我們將看的 ZKP 系統叫 ZKBoo，它定義的對象正是布林電路。

下文中，我們將假設能夠以此類推，用 「算術電路」 操作「普通整數」[^11]。附錄 B 探討如何從數學上「合理化」算術電路。現在只需知道我們可以推廣上述內容，並將使用像 $1, 4, 7$ 等普通整數作為變數值。

### 承諾（Commitment）

我們在《Programming ZKPs: From Zero To Hero》[^12]中介紹過承諾，這裡簡單回顧一下。

承諾讓我們能在不揭露內容的情況下「鎖定」某個值，而且日後無法反悔。承諾有很多種類型，最簡單的是對單一訊息承諾，並使用像 `SHA256` 的「雜湊函數」[^13]。

承諾有兩個關鍵屬性：

- **綁定性（Binding）**：一旦承諾，就無法改變承諾的值
- **隱藏性（Hiding）**：承諾不洩漏關於承諾值的任何資訊

它們允許兩種操作：

- **承諾（Commit）**：對特定值承諾同時保持隱藏
- **揭露（Reveal）**：揭露值以驗證正確性（與先前承諾匹配）
 
密碼學文獻中，揭露有時也叫作「開啟」（open）。

承諾訊息時，我們會添加一些隨機性，這是為了提高暴力破解訊息的難度（尤其是當訊息相對好猜的時候）。例如，若知道訊息是 1 到 100 的數字，如果沒有隨機性，只需嘗試所有組合直到重現出一樣的承諾就好。

使用雜湊函數的承諾可能如下：

$$
\text{com} = \text{SHA256}(m||r)
$$

這裡我們將訊息 $m$ 與一些隨機值 $r$ 連接（$||$）。使用像 `SHA256` 的雜湊函數確保我們無法輕易從 $\text{com}$ 反推出訊息。

更具體的例子：

```
SHA256('foobar213151') = '419d....1611'
```

這將訊息 `foobar` 加上一些隨機性，得到承諾（雜湊值`419d...1611`）。若將此承諾給他人，之後可選擇揭露值 $m, r$。對方可驗證承諾是否與原始訊息 $m$ 匹配。

承諾在密碼協議中非常常見，因為它們允許我們（a）綁定值（b）隱藏它們。它也是 ZKBoo 的關鍵組件之一。

### 秘密分享（secret sharing）

ZKBoo的另一關鍵組件是_秘密分享_。核心思想是將秘密分成多部分，沒有所有部分就無法重建。

若有值$x$，可如下拆分：
$$x = x_1 + x_2 + x_3$$
其中$x_1, x_2, x_3$是隨機選擇的值，加總為$x$。若將$x_2$和$x_3$給某人，這不會告訴我們$x$或$x_1$是什麼。例如，若有$7 = 4 + 2 +1$，其中$x=7, x_1=4$，給了你$2$和$1$，你也無法求出$x$。我們也可以用（$x=4, x_1 = 1$），（$x = 5, x_1=2$）等其他組合[^14]。

在ZKBoo中，這種變數的秘密分享也稱為_MPC-In-The-Head_。MPC代表多方計算[^15]， 傳統上由多個參與者（人、伺服器）共同進行某些計算。雖然MPC可能很複雜，但這裡我們只是「In the head」，也就是在自己腦中模擬：可以想像腦中有三個參與者，每人分到秘密的一部分。可將這些小部分想像為拼圖塊，需要全部拿到才能看到完整圖像[^16]：

![Puzzle](../assets/03_puzzle.png 'Puzzle')

### Sigma協議（sigma protocol）


將「承諾」和「秘密分享」結合到所謂的「Sigma協議」中，這樣我們就擁有建構 ZKBoo 所需的所有要素。Sigma 協議由兩方組成，證明者和驗證者，交換三條訊息：承諾、挑戰和回應。

$$
\begin{array}{c}
\textbf{Sigma 協議} \\[10pt]
\text{證明者} \xrightarrow{\text{1. 承諾}} \text{驗證者} \\[10pt]
\text{證明者} \xleftarrow{\text{2. 挑戰}} \text{驗證者} \\[10pt]
\text{證明者} \xrightarrow{\text{3. 回應}} \text{驗證者} \\[15pt]
\end{array}
$$

因為涉及兩方互動，所以也是「互動協議」 （interactive protocol）。稱為 Sigma 協議是因為互動類似希臘字母 $\Sigma$ [^17]。Sigma 協議允許證明者以互動方式說服驗證者某陳述為真，同時不揭露秘密資訊。我們可以把它視為基礎的 ZKP。

透過先「承諾」某些值，證明者無法改變它的答案。之後，驗證者提出挑戰。證明者回應，如果驗證者滿意了，則流程結束，驗證者被說服。

Sigma 協議也存在諸多版本與變形[^18]， 但它們都有以下關鍵屬性[^19]：

- **完備性（Completeness）**：若證明者知道限制式的解，總能說服驗證者
- **健全性（Soundness）**：僅當證明者確實知道秘密時，驗證者才會被說服；若證明者試圖作弊，成功機率低到可忽略
- **零知識性（Zero-Knowledge）**：驗證者不會得到關於證明者秘密的任何資訊，除了證明者擁有有效解

儘管現在聽起來有些抽象，但待會看到 ZKBoo 的實際例子後會更具體一點。

以下是一些簡單練習題，可以試著回答看看，確保自己有理解：

### 練習

1. 在 $x + 1 = y; y + 5 = z$ 中，若 $x$ 是證明者想保密的，什麼是見證變數和公開輸出？
2. 為什麼限制式順序不重要？若交換上述兩個限制式的順序會怎樣？
3. Alice 用 `SHA256(x || r)` 對數字承諾。若她後來聲稱承諾的是 42，如何證明？
4. 若 Bob 將 `x=12` 分成 3 份，舉例一組 $x_1 + x_2 + x_3 = x$，$(x_1, x_2, x_3)$ 的可能值是什麼？為何只公開 $x_2$ 與 $x_3$ 仍無法得知 $x$？
5. 在 Sigma 協議中，為什麼證明者必須在驗證者發送挑戰前承諾？

## ZKBoo

_本節將解釋 ZKBoo 的工作原理。我們從單一加法限制式逐步構建到多個限制式，再到完整的互動協議。然後使其達到統計上的健全性，最後使其非互動化。_

ZKBoo 是簡單的 ZKP 協議。它基於布林電路、承諾、秘密分享（MPC-in-the-Head）和 Sigma 協議。目前在實際場景中不太使用，主要是因為現在已經有了證明大小(Proof Size)更小的證明系統[^20]。那為什麼還要學它？

ZKBoo 在概念上非常簡單，初學者們理解其背後的所有數學，且不需要進階數學或大量密碼學知識就能掌握並實作。這使其成為直觀理解 ZKP 數學實際運作的理想選擇。一旦我們徹底理解第一個 ZKP 協議，就更容易與其他 ZKP 協議比較。我們將在文章末尾和未來文章中探討這點，幫助你根據具體情況選擇其他 ZKP協議。

### 用秘密分享拆分變數

回想之前的方程式組：

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

為簡化，先專注於證明 $c + d = e$，其中 $c,d$ 是私有的，$e$ 是公開的。我們先使用秘密分享，將每個變數拆分為三個隨機份額：

$$
\begin{aligned}
c &= c_1 + c_2 + c_3 \\
d &= d_1 + d_2 + d_3 \\
e &= e_1 + e_2 + e_3 \\
\end{aligned}
$$

份額必須保持關係 $c + d = e$，即每個 $i$ 滿足 $c_i + d_i = e_i$。在 MPC-in-the-Head 的範式中，下標 $_1, _2, _3$ 的每一 column 對應腦中的一個「參與者」，持有部分秘密。我們可以用以下表格來可視化秘密份額：

$$
\begin{array}{c|ccc}
 & \text{第 1 行} & \text{第 2 行} & \text{第 3 行} \\ \hline
\text{第 1 列} & c_1 & c_2 & c_3 \\
\text{第 2 列} & d_1 & d_2 & d_3 \\
\text{第 3 列} & e_1 & e_2 & e_3 \\
\end{array}
$$

以下是拆分這些變數的方法：

- 對第 1 列，隨機生成 $c_1, c_2, c_3$ 使 $c_1 + c_2 + c_3 =c$
- 對第 2 列，同樣處理 $d_1, d_2, d_3$ 和 $d$
- 對第 3 列，設 $e_1 = c_1 + d_1$，$e_2 = c_2 + d_2$，$e_3 = c_3 + d_3$，確保 $e = e_1 + e_2 + e_3$

若驗證者「挑戰」證明者揭露兩個隨機行，如$(2,3)$，他們檢查：

$$
\begin{aligned}
c_2 + d_2 \stackrel{?}{=} e_2 \\
c_3 + d_3 \stackrel{?}{=} e_3
\end{aligned}
$$

由於份額是隨機生成的，揭露任兩欄並不會提供關於 $c, d$ 的任何資訊，同時仍證明關係成立。

接下來我們不會再畫出表格的行或列，但你隨時想畫可以自己畫，只要記住「一行」對應一個份額。

### ZKBoo 的 Sigma 協議

作為證明者，你想說服驗證者你知道滿足上述等式的 $c$ 和 $d$，但同時不揭露它們。我們可以透過 Sigma 協議來實現：

1. 證明者對每欄 $1..3$ 承諾，並發送給驗證者
2. 驗證者挑戰證明者，要求揭露兩行 $(i, j)$
3. 證明者回應驗證者要求的行裡面的值

驗證者獲得這些值後，執行兩項檢查：

- 一致性檢查：驗證值相加，如 $c_i + d_i = e_i$
- 承諾檢查：驗證承諾與證明者回應的值匹配

若兩項檢查通過，驗證者有理由相信[^21]證明者知道 $c$ 和 $d$。承諾時，證明者也使用一些隨機性確保值無法暴力破解。透過承諾的隱藏性和秘密分享，證明者不揭露關於 $c$ 和 $d$ 本身的任何資訊。

以下是此 Sigma 協議的圖示：

$$
\begin{array}{c}
\textbf{Prover \hspace{4cm} Verifier} \\
\xrightarrow{\text{承諾： } \{\text{com}_1, \text{com}_2, \text{com}_3\}\ \text{其中 } \text{com}_k = \text{hash}(c_k, d_k, e_k, r_k) \text{ 對 } k =1,2,3} \\
\xleftarrow{\text{挑戰：揭露兩個 comluns } (i, j)} \\
\xrightarrow{\text{回應： } (c_i, d_i, e_i, r_i), (c_j, d_j, e_j, r_j)} \\
\text{驗證者檢查：} \\
\begin{aligned}
4. &\quad c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j, \\
5. &\quad \text{com}_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, \text{com}_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j).
\end{aligned}
\end{array}
$$

這實現了我們關心的三個屬性：

- 完備性 - 證明者知道解，總能說服驗證者
- 健全性 - 只有當證明者確實知道秘密時，驗證者才會被說服（我們待會馬上將看到證明者作弊的情況）
- 零知識性 - 驗證者不會學到關於 $c$ 和 $d$ 的任何資訊（除了它們加總為 $e$）

雖然對每個 column 承諾意味著證明者之後無法改變這些 column 的內容，但上述流程仍有一些問題。若證明者猜測驗證者將挑戰哪些欄位呢？這裡只有三種可能：$(1,2), (1,3), (2,3)$。若如此，他們可以作弊，只要確保那些欄位加總正確，而無需知道 $c$ 和 $d$。這意味著有高達 $\frac{1}{3}$ 的作弊成功機率！

這觸及「健全性」的統計性質。密碼學實作中，機率常常在確保安全性中發揮作用。目標是將作弊風險降低到可忽略的的水平（$\frac{1}{2^n}, n= big\ number$）。我們很快會看到如何透過協議的多輪執行實現這點。

但首先，看看如何處理乘法和多個限制式。

### 支持乘法

回到原始的限制式：

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

像 $c+d=e$ 這樣的加法很簡單。乘法呢？我們想將關係 $a \cdot b = c$ 分解為秘密份額。如何實現？

首先注意以下。如果我們單純地拆分 $a, b, c$ 並設 $c_i = a_i \cdot b_i$，這行不通。為什麼？

$$
\begin{aligned}
a \cdot b & = (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) \\
&= a_1 b_1 + a_1 b_2 + a_1 b_3  + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 \\
&\neq a_1 b_1 + a_2 b_2 + a_3 b_3
\end{aligned}
$$

這是因為乘法不是線性的，所以計算結果包含交叉項：

$$
a_1b_2, a_1b_3, a_2b_1, a_2b_3, a_3b_1, a_3b_2
$$

我們需要找到更好方法來拆解 $c_i$。其中一招便是透過將交叉項均勻分配到每個份額[^22]：

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 \\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 \\
\end{aligned}
$$

現在關係依然成立。我們得到：

$$
\begin{aligned}
a \cdot b &= (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) = \dots = c_1 + c_2 + c_3 = c
\end{aligned}
$$

然而這有新問題。當我們揭露兩個 column，如 $(1,2)$ 時，會透過因子 $a_2 b_3 +a_3 b_2$ 洩漏第三個 column 的資訊。根據值的含義，驗證者可能推斷出 $a_3$ 和 $b_3$。

因此我們再次透過添加隨機性解決：

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 + r_1 - r_2\\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 + r_2 - r_3 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 + r_3 - r_1 \\
\end{aligned}
$$

現在 $c = c_1 + c_2 + c_3$ 仍然成立，因為所有隨機變數抵消：

$$
r_1 - r_2 + r_2 - r_3 + r_3 - r_1 =0
$$

透過添加隨機性，我們就不會透露關於第三個 column 的資訊。這裡我們用隨機性掩蓋敏感資訊，這是密碼學中的常見技巧。

$r_1, r_2, r_3$「屬於」哪裡？我們將其作為另一個變數添加。視為帶行列的表格：

$$
\begin{array}{c|ccc}
 & \text{第 1 col.} & \text{第 2 col.} & \text{第 3 col.} \\ \hline
a & a_1 & a_2 & a_3 \\
b & b_1 & b_2 & b_3 \\
r & r_1 & r_2 & r_3 \\[6pt]
c & c_1 & c_2 & c_3 \\
\end{array}
$$

其中 $c_1$、$c_2$ 和 $c_3$ 如上設置。注意揭露的 column $(1,2)$ 會洩漏 $r_1$ 和 $r_2$，但 $r_3$ 未知，從而掩蓋第三個 column 的值。

### 整合所有內容

最後，將上述與原始限制式結合：

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

作為證明者，我們：

- 隨機設置 $a, b, d$ 的份額，如上
- 設置 $c$ 使 $a \cdot b = c$，所有份額同樣按照這個方式
- 設置 $e$ 使 $c+d=e$，所有份額也是按照一樣的方式

以下是更完整的 Sigma 協議：

$$
\begin{array}{c}
\textbf{證明者 \hspace{4cm} 驗證者} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{其中 } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ 對 } k = 1,2,3} \\
\xleftarrow{\text{揭露兩 col. } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

驗證者將進行（a）一致性檢查 和（b）承諾檢查，兩項檢查：
(a). 一致性檢查：
- 驗證 $a \cdot b = c$ 的份額：
  - $c_i \stackrel{?}{=} (a_i b_i + a_i b_j + a_j b_i) + (r_i - r_j)$,
  - $c_j \stackrel{?}{=} (a_j b_j + a_j b_k + a_k b_j) + (r_j - r_k)$
  - 注意 $r$ 的下標 $i, j, k$ 是 $\mod 3$
- 驗證 $c + d = e$ 的份額：$c_i + d_i \stackrel{?}{=} e_i, \quad  c_j + d_j \stackrel{?}{=} e_j$

(b). 承諾檢查：

- $com_i \stackrel{?}{=} \text{hash}(a_i, b_i, c_i, d_i, e_i, r_i), \quad com_j \stackrel{?}{=} \text{hash}(a_j, b_j, c_j, d_j, e_j, r_j)$

上述 $r_k$ 對應第 $k$ column，未揭露。根據多輪執行方式，這可能揭露或不揭露。我們仍檢查 $c_i$，因為 $i$ 和 $j$ column 已揭露。

至此，我們用加法和乘法證明了一組限制式，展示了功能完備性。我們以保持私有值私密的方式實現，並說服驗證者證明者知道它們。接下來，我們將透過多輪執行協議來提升健全性。

### 提升健全性

仔細看完上述 Sigma 協議很容易產生一個疑惑：如果證明者作弊呢？假設她猜驗證者會選 $(2,3)$ column。那她實際上不需要知道這些私有值。例如，在 $c +d =e$ 中，她不需要知道 $c$ 或 $d$、$c_1$ 或 $d_1$。她可以捏造一組讓「一致性檢查」成功的值。這是因為驗證者只檢查第二和第三個 column。

回想一下驗證者的檢查：

- 一致性檢查：$c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j$
- 承諾檢查：$com_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, com_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j)$

更具體地說，我們可以只為 $c_2, d_2$ 選擇隨機值使得 $c_2 + d_2 = e_2$，對 $c_3, d_3$ 同理。這不需要任何關 $c$ 或 $d$ 的知識。假設證明者成功預判驗證者會選 $(2,3)$，驗證者也真的只檢查 $c_2 + d_2 = e_2$ 和 $c_3 + d_3 = e_3$，這就作弊成功了。

當然，由於承諾，證明者無法改變原本的值。若沒有承諾檢查，他們每次都能作弊。這就是為什麼我們需要承諾的綁定性，以及為什麼承諾在驗證者決定查看哪些份額前就要先傳給驗證者。

而證明者猜中的機率是多少？這個例子中有兩種選擇 column 的方式：$(1,2), (1,3), (2,3)$。意味著作弊機率是$\frac{1}{3}$[^23]。我們稱此為「健全性誤差」 (soundness error) 。我們希望盡可能降低這個機率。

這可以透過多輪執行 Sigma 協議來達成：每一輪的驗證中，驗證者都選擇新的兩份隨機份額。當然，驗證者選過 $(1,2)$ 和 $(2,3)$ 後，他們就知道所有三個份額的值，可以輕鬆重建原始 $c$ 和 $d$，這肯定不好。

因此我們透過每輪創建新的秘密份額來解決此問題，同時保持作弊的機率低。對給定變數，我們拆分為 $x = x_1 + x_2 + x_3$，其中 $x_1, x_2, x_3$ 是使等式成立的隨機值。對每個變數都這樣做。驗證者執行挑戰，要求兩份額，並執行一致性和承諾檢查。下一輪，我們再次用新的隨機份額拆分變數。這樣，驗證者無法合併不同輪的資訊，因為他們看到的是不同的隨機份額。

這樣作弊機率是多少？對上述加法限制式，每輪 $\frac{1}{3}$，執行 $n$ 輪得到：

$$
\left(\frac{1}{3}\right)^n
$$

若 $n$ 足夠大，作弊的機率就可以忽略。例如執行100輪得到的機率為$(\frac{1}{3})^{100} \approx 10^{-48}$，這機率非常低。如果想要更安全，我們只需執行更多輪就可以了。（關於健全性誤差的更多細節請見註腳[^24]。）

雖然這安全得多，但需要證明者和驗證者間大量互動。每輪需發送 3 條訊息，100 輪就是3 00 條來回訊息！現實中不太實用。為了解決這點，看看如何透過「Fiat-Shamir轉換」來讓協議非互動化，將訊息量減少到 1。

### Fiat-Shamir 轉換

我們透過多輪執行使協議統計上安全後。以下是單輪 Sigma 協議：

$$
\begin{array}{c}
\textbf{證明者 \hspace{4cm} 驗證者} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{其中 } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ 對 } k = 1,2,3} \\
\xleftarrow{\text{揭露兩 column } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

「Fiat-Shamir 轉換」的目標是將此「互動協議」轉為「非互動」的，證明者發送單條訊息（證明），驗證者擁有驗證所需的所有資訊。

回顧一下多輪的證明流程：為什麼驗證者要在證明者承諾後才發送挑戰？因為他不希望證明者改變主意並透過自行選擇 column 作弊。這會破壞「健全性」。從證明者角度看，這個選擇是隨機的。我們能否從其他地方獲得此隨機性？無需驗證者生成？

這就是「Fiat Shamir 轉換」。核心思想是用確定性的雜湊函數（deterministic hash function）取代驗證者原有的隨機性。由於雜湊函數是偽隨機的[^25]，我們可以用其生成隨機數，然後用於隨機選擇兩欄。

大致上來說，我們原本流程如下：

$$
\begin{array}{c}
\textbf{Sigma協議} \\[10pt]
\text{證明者} \xrightarrow{\text{1. 承諾}} \text{驗證者} \\[10pt]
\text{證明者} \xleftarrow{\text{2. 挑戰}} \text{驗證者} \\[10pt]
\text{證明者} \xrightarrow{\text{3. 回應}} \text{驗證者} \\[15pt]
\end{array}
$$

我們想這樣做來取代它：

$$
\begin{array}{c}
\textbf{非互動協議} \\[10pt]
\text{證明者} \xrightarrow{\text{\{承諾、挑戰和回應\}}} \text{驗證者} \\[15pt]
\end{array}
$$

挑戰應該透過雜湊來產生，並包含承諾及一些公開資訊。這是證明者和驗證者都同意的內容，而不是證明者自行決定。事實上，我們甚至不需要發送挑戰，因為雙方都能自行計算。證明者本地創建承諾、計算挑戰和回應，並發送給驗證者。驗證者記錄承諾，自行重新計算挑戰，並驗證回應和承諾。

如何計算挑戰？為什麼這有效？作為雜湊的輸入，我們使用一些公開資訊，這作為「隨機種子」(random seed)[^26]，證明者和公開都無法控制輸出。這意味著我們無需交流該資訊，雙方可以自行計算這個隨機性來源。實際的挑戰可能如下：

$$
\text{挑戰} = \text{hash}(com_1, com_2, com_3, \text{<公開資訊>})
$$

通過添加一些公開資訊`<公開資訊>`，如電路名稱（如`zkboo-example`）和公開輸入（如 e 的值`5`），證明者自己無法控制雜湊函數的所有輸入。關鍵是我們將所有承諾作為此雜湊函數的輸入，因此證明者無法回頭改變「承諾」的內容。由於像 SHA256 的雜湊函數是確定性的，驗證者將能夠透過相同輸入，重新創建相同的挑戰。

在我們的案例中，驗證者從 3 個 column中選 2 個 $(i,j)$。有三種可能性，因此我們可以簡單地對隨機雜湊取 $\mod 3$ 來確定性的選擇 column。

若只執行一輪，證明者很容易透過猜測將選的 coulmn 來作弊，創建承諾並計算挑戰。若挑戰結果「猜對」，他們可以創造假證明。若沒猜對，他可以調整輸入，創建稍微不同的承諾，賭賭看下一次雜湊的運算結果。畢竟這些運算都在本地完成，驗證者不知情。


這就是為什麼必須執行「多輪」的協議，而且更具體來說，我們需要使用每輪作為下一輪挑戰的輸入。只有這樣才能實現相同的健全性保證[^27]。

為確保健全性，每輪的挑戰必須依賴所有先前承諾。這防止證明者「回溯」生成有利結果。就像下面的方式來計算第 $k$ 輪的挑戰：

$$
\text{挑戰}_k = \text{hash}(com_{1,1}, com_{1,2}, com_{1,3}, \dots, com_{k,3}, \text{<公開資訊>}, k) \mod 3
$$

其中 $com_{k,i}$ 是 $k$ 輪第 $i$ 份額的承諾，`<公開資訊>`是預定的共享公開知識占位符。通過添加 $k$ 確保即使承諾和公開資訊重複，每輪也有唯一挑戰。公開資訊作為固定的隨機性來源，意味著證明者和驗證者都無法控制雜湊輸出。最後取 $\mod 3$ 對應的 column 選擇 $(i, j)$。

證明者發送所有輪的承諾和回應。所有這些資訊構成證明 $\Pi$。驗證者重新計算每輪的挑戰，驗證回應和承諾，然後接受或拒絕證明。

$$
\begin{array}{c}
\text{證明者} \xrightarrow{\Pi = \{\text{承諾： } \{com_{k,1}, com_{k,2}, com_{k,3}\}, \text{回應： } \{(c_{k,i_k}, \dots)\}} \text{驗證者} \\[15pt]
\end{array}
$$

為什麼這有效？我們使用承諾的「綁定」性確保證明者無法在生成挑戰後更改早期的輸入。所有挑戰依賴先前承諾，且因執行 $k$ 輪，我們有極高的機率來保證健全性。

這很棒，現在只需要單條訊息就能說服驗證者。但仍有問題，這需要大量數據。注意每個證明需要 $3 \cdot k$ 承諾，以及 $n \cdot k$ 回應，其中 $n$ 是變數的數量，$k$ 是輪數。若有大量變數，且 $k$ 約100，會導致證明相當大。

不幸的是，以現有工具無法使證明更「精簡」。為此，我們會需要擴充我們的工具箱。但那是以後的事。我們將在文章末尾簡要提及。

若對如何從布林電路跳到算術電路感興趣，見附錄 B。接下來看看 ZKBoo 如何融入更廣的 ZKP 領域。

### 練習

1. 在 3 個 sharing 中揭露 2 sharing 的 Sigma 協議中，作弊證明者單輪說服驗證者的機率是多少？多輪執行如何幫助？
2. 若證明者預知驗證者將選哪些 Column，如何作弊？
3. 在 Fiat-Shamir 中，為何在生成挑戰前雜湊所有承諾會使作弊更難？

## zkSNARKs

_解釋上述 ZKP 與 zkSNARKs（零知識精簡非互動知識論證）的關聯。我們分解每個屬性並看看這些屬性與 ZKBoo 的關聯。_

你可能注意到我們稱 ZKBoo 為 ZKP（零知識證明）而非 zkSNARK，這是你可能聽過的術語。雖然並非所有人都正確使用術語[^28]，但了解每個屬性的含義還是很有用。

通常，我們稱 ZKP 為「證明」。技術上講，它們是知識論證（ARguments of Knowledge）。區別在於「健全性」。我們之前看到如何用 Sigma 協議獲得完備性、健全性和零知識性。結合起來，完備性和健全性屬性給我們「知識論證」。實踐中，我們依賴_計算健全性_，技術上使其成為知識論證而非證明[^29]。

零知識屬性我們已介紹過；我們不向驗證者揭露見證的任何資訊。有趣的是，許多「ZK」項目和「zkSNARKs」實際上並未在實踐中提供「零知識」屬性。更準確的術語可能是「可驗證計算」和(S)NARKs，但這聽起來不夠潮。

非互動屬性（zkSNARKs中的「N」）我們已精介紹。事實證明，我們基本上可以透過 Fiat-Shamir 轉換使任何 ZKP 非互動化。通常先定義互動式 Sigma 協議，然後用 Fiat-Shamir 使其非互動化。

最後，我們尚未談論的屬性是「精簡性」。這意味兩件事：(a) 證明簡短，(b) 證明驗證快速。不幸的是，這是 ZKBoo 缺少的屬性。要獲得此屬性，我們需要更進階的數學工具，特別是需多項式和橢圓曲線密碼學。我們將在未來文章中深入探討。

更多（仍非正式）數學細節見附錄 C。

讓我們更詳細看看精簡性和 ZKBoo，以更好地理解情況。

### 精簡性

為什麼 ZKBoo 不精簡？談論精簡性時，我們指兩個獨立屬性：

- 精簡的證明尺寸：證明簡短
- 精簡的驗證時間：證明驗證快速

通常這些屬性共存，但我們分開分析[^30]。

先關注證明有多大。我們之前提到每個證明需要與限制式數量 $n$（或電路大小 $|C|$ ）成比例的承諾和回應。說證明簡短時，我們主要關心大小如何隨著限制式數量變化。這裡的大小指的是需要發送的數據量，實際情況中與表示證明所需的總字節數相關。

我們常用「Big O」描述函數性能隨操作元素數量增加的表現[^31]。ZKBoo 案例中，證明大小隨著限制式數量線性增長，大概是 Big O 中的 $O(n)$。例如，假設電路有 $n = 1000$ 個限制式，證明需要約 1000 個承諾和回應。

用 Big O，我們可以談論近似階數而不用糾結細節[^32]。以下是常見複雜度類別的圖示：

![Big Oh Complexity](../assets/03_bigoh.png 'Big Oh Complexity')

理想情況下，精簡證明需「次線性」 (sublinear)。次線性是什麼意思？任何嚴格「低於」上圖中 $O(n)$ 的。例如 $O(\log n)$（對數）或 $O(1)$（常數）[^31][^33]。

直觀上，這表示增加更多限制式時，證明大小的增長會趨緩。最佳性能是 $O(1)$，無論限制式數量多少，證明尺寸都保持不變。

驗證證明所需的時間呢？驗證者需對所有限制式執行一致性檢查。這基本上等同於重新評估整個電路。這意味驗證時間是線性的，或 $O(n)$，其中 $n$ 是限制式數量 $|C|$。因此，ZKBoo 沒有次線性驗證時間。時間這裡對應到的是驗證者需執行的操作數量，實際情況中與實際的「Clock Cycle」相關。因此，ZKBoo 沒有精簡的驗證時間。

我們通常希望精簡性，因為這意味著我們可以在小空間中（且快速）證明任意計算。為什麼 ZKBoo 不提供這點，如何解決？

根本問題在於我們使用的工具太原始。用現有的承諾方案和秘密分享，我們必須表示和評估所有的限制式。相較起來，我們可以用「多項式」將限制式壓縮到更小空間。這引出「多項式承諾方案」的想法。但那是以後的故事了。

### 下一步

_提示下一步：多項式、精簡性、PCS、IOP、比較；要嘛去喝杯咖啡，要嘛去讀下一篇文章。_

我們已經看到如何利用 ZKBoo 端到端建構非互動 ZKP，這為理解更廣的 zkSNARKs 領域奠定了優秀基礎。

以下是接下來的一些內容：

- 理解多項式的重要性，它們如何實現精簡性
- 將承諾推廣到多項式承諾方案（PCS）
- 將 Sigma 協議推廣到多項式互動 Oracle 證明（IOP）
- 理解現代 ZKP 系統的 PCS + Poly-IOPs 框架
- 不同的 PCS：KZG/FRI/IPA
- 理解不同領域：伺服器端與客戶端證明
- 掌握維度：域的大小、後量子、設定、安全假設
- 如何用公鏈驗證證明
- 為什麼 STARKs 是 SNARKs
- 結構化與非結構化電路
- 其他新穎的 ZKPs

我們不會像本文那樣深入這些主題，但會提供足夠資源，讓你自信地（a）學習更多或（b）根據具體需求選擇 zkSNARK。

### 練習

4. ZKBoo 提供哪些屬性？
5. 直觀上，為什麼 ZKBoo 不精簡？

### 問題

這些是可選問題，需更多努力。

6. 在 SageMath 中實作多輪（見附錄A）
7. 在 SageMath 中實作 Fiat-Shamir（見附錄A）
8. 找出你聽過的幾個證明系統。識別它們的相似與不同之處。與 ZKBoo 做比較。

### 結論

_回顧我們涵蓋的內容。_

本文從 ZKP 的基本理解和數學背景知識開始。接著介紹關鍵概念，如電路、功能完備性、承諾、秘密分享和Sigma協定。

然後用這些關鍵概念製作 ZKBoo ZKP。我們看到了一組限制式，從簡單加法開始，如何證明它們。接著我們看如何處理多個限制式，以及如何在乘法限制式中利用隨機性。分析協議的安全性，並透過多次執行提升健全性。然後用 Fiat-Shamir 使整個過程非互動化。

接著我們深入一些特定主題，看到如何用有限域將布林電路推廣到算術電路，並介紹 zkSNARKs 的屬性及其如何應用於 ZKBoo。我們直觀的理解了為什麼 ZKBoo 未實現精簡性。最後，我們提到了一些更進階的主題供大家未來探索。

若想加深理解，可查看程式碼片段（附錄 A），看如何擴展或修改。如果感到困惑，歡迎聯繫！祝你的 ZK 之旅順利，下次見。

## 致謝

感謝 Hanno Cornelius、dmpierre、Aayush Gupta、Adrian Li、Chih-Cheng Liang 和 r4bbit 為本文草稿提供反饋。

感謝 Nicole、PinHao 和 Anton 協助翻譯。

### 圖片

- _Big 0 Cheatsheet_ - Eric Rowell，公有領域，來自[維基共享資源](https://commons.wikimedia.org/wiki/File:Big-O_Cheatsheet.png)

## 附錄 A：ZKBoo 程式碼

_以下是 SageMath 中精簡實作 ZKBoo 的程式碼範例。_

Repo 在此：https://github.com/oskarth/zkintro-math

展示上文數學方程到實際程式碼的映射。非必需，但有助於理解數學與程式碼的關聯。實作使用 SageMath，這是基於 Python 的數學軟體。基本上可視為虛擬碼(Pseudocode)，讓我們精簡地用程式表達數學。

程式庫中有以下範例：

- `commitments_shares.sage` - 基礎承諾和秘密分享
- `zkboo_add.sage` - ZKBoo 中的基礎加法限制式
- `zkboo_mul.sage` - ZKBoo 中的基礎加法和乘法限制式

擴展上述以支持多輪和 Fiat-Shamir 轉換目前留作讀者練習。

總體來說，ZKBoo 協議可輕鬆用不到 100 行程式表達[^34]。一旦 Sage 中的數學原型存在，就更容易「移植」到 Python、JavaScript、Rust 或 Go等語言供實際使用。

以下片段（`zkboo_mul.sage`）展示互動式 ZKBoo 一輪功能完備性的 60 行帶註解的程式碼。可擴展到多輪並用 Fiat-Shamir 非互動化，仍不到 100 行。

```python
import random, hashlib
from sage.all import GF

p = 101  # Prime field modulus
F = GF(p)  # Finite field

def secret_share(v):
    """Split 'v' into 3 random shares mod p."""
    s1, s2 = F.random_element(), F.random_element()
    return [s1, s2, (v - s1 - s2) % p]

def commit(vals):
    """Hash tuple of values to produce a commitment."""
    return hashlib.sha256(",".join(map(str, vals)).encode()).hexdigest()

def multiply_shares(a, b):
    """Compute c_i for a single gate a*b=c with offsets r_i."""
    r = [F.random_element() for _ in range(3)]
    c = [(a[i] * b[i] + a[i] * b[(i + 1) % 3] +
          a[(i + 1) % 3] * b[i] + r[i] - r[(i + 1) % 3]) % p
         for i in range(3)]
    assert sum(c) % p == (sum(a) * sum(b)) % p
    return c, r

def zkboo_prover(a, b, d):
    """Generate shares for a,b,d and compute c=a*b, e=c+d with random offsets."""
    a_sh, b_sh, d_sh = secret_share(a), secret_share(b), secret_share(d)
    c_sh, r_sh = multiply_shares(a_sh, b_sh)
    e_sh = [(c_sh[i] + d_sh[i]) % p for i in range(3)]
    commits = [commit((a_sh[i], b_sh[i], c_sh[i], d_sh[i],
                       e_sh[i], r_sh[i])) for i in range(3)]
    return a_sh, b_sh, c_sh, d_sh, e_sh, commits, r_sh

def zkboo_verifier_challenge():
    """Pick two random shares to reveal."""
    return random.sample(range(3), 2)

def zkboo_prover_response(ch, a, b, c, d, e, r):
    """Reveal the requested two shares with all data."""
    return [{"a": a[i], "b": b[i], "c": c[i], "d": d[i],
             "e": e[i], "r": r[i]} for i in ch]

def zkboo_verify(ch, resp, commits):
    """Check commitments and verify correctness of revealed shares."""
    if any(commit((resp[i]["a"], resp[i]["b"], resp[i]["c"],
                   resp[i]["d"], resp[i]["e"], resp[i]["r"]))
           != commits[ch[i]] for i in range(2)):
        return False

    def check_c(sh_i, sh_j):
        """Ensure multiplication consistency of revealed shares."""
        return (sh_i["a"] * sh_i["b"] + sh_i["a"] * sh_j["b"] +
                sh_j["a"] * sh_i["b"] + (sh_i["r"] - sh_j["r"])) % p == sh_i["c"]

    # Check correct share pairs are used for verification
    if (ch[0] + 1) % 3 == ch[1] and not check_c(resp[0], resp[1]):
        return False
    if (ch[1] + 1) % 3 == ch[0] and not check_c(resp[1], resp[0]):
        return False
    return all((share["c"] + share["d"]) % p == share["e"] for share in resp)

def test_zkboo_single_round():
    """Test a single-round reveal for a,b,d = 3,4,5."""
    a, b, d = F(3), F(4), F(5)
    a_sh, b_sh, c_sh, d_sh, e_sh, commits, r_sh = zkboo_prover(a, b, d)
    ch = zkboo_verifier_challenge()
    resp = zkboo_prover_response(ch, a_sh, b_sh, c_sh, d_sh, e_sh, r_sh)
    assert zkboo_verify(ch, resp, commits), "ZKBoo single-round failed"
    print("Single-round test passed!")

test_zkboo_single_round()
```

## 附錄 B：算術電路

_本節將說明如何將上述布林電路推廣至算術電路。_

在數學中，有一個領域稱為「抽象代數」(Abstract Algebra)，它研究不同的代數結構及其運算。例如，我們有「自然數集」或「整數集」這樣的結構：

$$
\begin{aligned}
\mathbb{N} &= \{1, 2, 3, \dots\} \\
\mathbb{Z} &= \{\dots, -2, -1 ,0, 1, 2, \dots\}
\end{aligned}
$$

我們會將這些集合與某些運算（如「加法」或「乘法」）結合，這些運算以特定方式運作。由此我們可以討論「集合」、「群」、「環」和「域」等結構。這些結構的具體定義目前並不重要，關鍵在於每個結構都增加了更多功能：

$$
Set \subset Group \subset Ring \subset Field
$$

特別是「域」允許進行「除法」（除零除外），因為域中的每個元素都存在乘法反元素。值得注意的是，這對於以加法和乘法表示的整數集 $(\mathbb{Z}, +, \cdot)$ 並不成立[^35]。

例如，$3$ 的乘法反元素是 $\frac{1}{3}$（因為 $3 \cdot \frac{1}{3} = 1$），但 $\frac{1}{3}$ 並不存在於 $\mathbb{Z}$ 中，因為它不是整數[^36]。如果我們討論實數集 $\mathbb{R}$，這就沒有問題，因為 $0.33...$ 屬於實數集，所以 $(\mathbb{R}, +, \cdot)$ 是一個域。

然而，計算機基於硬體運作，我們處理的是有限數字。因此在密碼學中，我們感興趣的是「有限域」，即具有有限成員的域。例如：

$$
\mathbb{F}_5 = \{{0, 1, 2, 3, 4}\}
$$

許多密碼協議需要除法與明確定義的模運算。事實證明，我們可以簡單地通過限制為 $\mod p$（其中 $p$ 為質數）來構造有限域[^37]。我們將其寫為 $\mathbb{F}_p$ 或 $\mathbb{GF}(p)$。$\mathbb{GF}$ 代表「伽羅瓦域」（Galois Field），這是有限域的另一個名稱[^38]。

在上面的例子中，如果我們排除 $0$（因為不允許除以 $0$；以 $^*$ 表示），則有：

$$
\mathbb{F}^*_5 = \mathbb{GF}^*(5) = \{{1,2,3,4}\}
$$

我們可以看到，集合中的每個元素都有乘法反元素。例如，$2 \cdot 3 \mod 5 \equiv 1$。

在 ZKBoo 中，我們使用最簡單的有限域 $\mathbb{GF}(2)$ 來處理布林電路。算術電路將其推廣至 $\mathbb{GF}(p)$（其中 $p$ 為質數），這意味著所有加法與乘法運算都以 $\mod p$ 進行，確保值保持在該域內。這使我們能夠處理大於 0 和 1 的數字。在這個域中，加法與乘法運作良好，因此我們可以進行明確定義的模運算。只要整數小於某個特定質數，我們就可以按預期使用它們。實際上，我們通常使用非常大的質數[^39]，這意味著我們可以用明確定義的方式表達非常大的數字及其運算。

## 附錄 C：zkSNARK 數學定義

讓我們稍微精確地定義前面關於 zkSNARK 的內容，同時仍保持數學上的非正式性[^40]。如果你對主文內容已感到滿意，可以跳過此附錄。

**完整性（Completeness）** - 對於所有滿足 $C(x,w)$ 的 $x, w$，驗證者 V 接受證明者 P 的證明 $P(x,w)$ 的機率為 1。即：

$$
\forall x, w: C(x,w) = 0 \implies Pr[V(x, P(x, w)) = \text{接受 }] = 1
$$

**健全性（Soundness）** - V 接受證明 $\pi$ $\implies$ P「知道」滿足 $C(x,w) = 0$ 的 $w$；如果證明 $\pi$ 為假，則 $Pr[\text{V 接受 } \pi] \leq \text{可忽略的機率，例如 }2^{-80}$[^41]

**零知識性（Zero-Knowledge）** - 帶有證明 $\pi$ 的 $C(x, \pi$) 不會洩露任何關於 $w$ 的資訊

**精簡性（Succinctness）** - 證明 $\pi$ 是「短的」，且 $V(x, \pi)$ 的驗證是「快速的」。

「短」有不同的定義，但通常意味著 $\text{len}(\pi) = \text{sublinear}(|w|)$，其中 $|w|$ 是見證的大小[^33]。

「快速驗證」意味著 $\text{time}(V) = O_{\lambda}(|x|, \text{sublinear}(|C|))$，其中 $O_{\lambda}$ 表示以大 O 符號表示的「階數」[^31]，而 $|C|$ 是電路的大小。有的時後準線性（例如 $O(n \log n)$）也被認為是「足夠精簡」。

**非互動性（Non-interactive）** - 證明者只需將 $\pi$ 發送給驗證者即可說服對方，驗證者可以通過 $x$ 和 $\pi$ 驗證證明[^42]。


### References

[^1]: STEM graduate means someone who studied Science, Technology, Engineering or Mathematics at a University or equivalent.
[^2]: For example by using a search engine, LLM (Large Language Model, e.g. using AI tools such as ChatGPT), or a friend. For example, you could ask a LLM to ELI5 (Explain Like I'm Five) a specific concept.
[^3]: Credit to Aayush Gupta for the idea of using ZKBoo to explain ZKPs, based on his [previous experience (video)](https://www.youtube.com/watch?v=CGWjjEiLN9w). You can also read the [original paper](https://eprint.iacr.org/2016/163.pdf), though it is a bit difficult to penetrate. Geometry Research also has a [post](https://geometry.xyz/notebook/paper-speedrun-zkboo) explaining the protocol, but it requires more background knowledge to understand.
[^4]: [SageMath](https://www.sagemath.org/) is a math system built on top of Python that allows us to focus on the essentials. It reads like pseudo code, naturally translating mathematical symbols into code.
[^5]: If $a, b$ are large prime numbers, then it is very hard to get these from the public output $e$.
[^6]: Assuming intermediate variables are set, but this is an implementation detail; as a system of equations it is just another unknown variable that gets determined by the other constraints. For example, we could equally well write the set of constraints above as $c+d=e; a \cdot b = c$.
[^7]: Intermediate variables are also sometimes called internal variables, and are more of an implementation detail. It is worth noting that these are only known to the Prover, as they might leak information about the private inputs.
[^8]: There are different ways of expressing these set of equations, such as R1CS, Plonkish, etc. We call this _arithmetization_.
[^9]: While not identical, [functional completeness](https://en.wikipedia.org/wiki/Functional_completeness) is related to the concept of [Turing completeness](https://en.wikipedia.org/wiki/Turing_completeness).
[^10]: See the book _Elements of Computing Systems (Nisan, 2005_) and the accompanying course [From Nand to Tetris](https://www.nand2tetris.org). There's also a book called _But How Do It Know? (Scott, 2009)_ that explains how computers work starting from boolean algebra.
[^11]: Integers bounded by $\mod{p}$ for some prime number $p$. See Appendix B for more details.
[^12]: See [Programming ZKPs: From Zero to Hero](https://zkintro.com/articles/programming-zkps-from-zero-to-hero). This is not a requirement, but it might make the connection between math and code more clear.
[^13]: See [cryptographic hash functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function) for more details. There are many different such hash functions, but SHA256 is a commonly used one.
[^14]: Technically speaking, given only $x_2$ and $x_3$ both $x$ and $x_1$ remain undetermined, meaning we have two [degrees of freedom](https://en.wikipedia.org/wiki/Degrees_of_freedom). The equation is [underdetermined](https://en.wikipedia.org/wiki/Underdetermined_system), because there are more unknowns than known values.
[^15]: [Multi-party computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) is in fact a separate area from ZK. One useful mental model is that MPC deals with shared secrets among multiple participants, whereas ZK deals with one person's secrets.
[^16]: Alternatively, in $x = x_1 + x_2 + x_3$, if you know $x$ and two of the other parts you can reconstruct the third part, since $x - x_1 - x_2 = x_3$. In the puzzle metaphor, this would correspond to having two out of three puzzle pieces and knowing what the final picture should look like, even though one piece is missing.
[^17]: You might have to squint to see it; the top and bottom arrow heads form the top and bottom part of the Sigma, and the middle arrow-head the middle part.
[^18]: Probably the most canonical example of a [sigma protocol](https://en.wikipedia.org/wiki/Proof_of_knowledge#Sigma_protocols) is proving knowledge of the [discrete log](https://en.wikipedia.org/wiki/Discrete_logarithm). While it is "simpler", it requires a bit more math background to understand. It also doesn't get us closer to understanding ZKBoo, so we are omitting this example.
[^19]: Most sigma protocols have all three properties, but some don't have the zero knowledge property.
[^20]: Two reasons for this: ZKBoo arrived later than other protocols, and proofs are not succinct. We'll see more on this at the end of the article.
[^21]: We'll look more at the notion of _soundness_ soon.
[^22]: With all calculations done $\mod p$. See Appendix B for details.
[^23]: In the multiplication constraint example, since only one column is effectively checked, this means the probability for cheating, assuming multiplication constraints only, is $\frac{2}{3}$. Intuitively, most real-world examples would have a mix of addition and multiplication, and it is enough for one consistency check to fail to be caught. See the original paper for more precise soundness analysis.
[^24]: In practice, we often talk about soundness error in terms of _bits of security_ a protocol has. This indicates how hard it is to break a protocol and thus how secure it is. For ZKBoo, if we want to have 80 bits of security, we have to do 137 rounds. This can be calculated using $n = \frac{\sigma}{\log_2(3) - 1}$. See the paper for details.
[^25]: That is, they appear statistically random despite being generated by a deterministic process. See [pseudorandomness](https://en.wikipedia.org/wiki/Pseudorandomness).
[^26]: See [random seed](https://en.wikipedia.org/wiki/Random_seed).
[^27]: There are many ways to trip up on Fiat-Shamir in practice, see [Fiat-Shamir in the Wild (paper)](https://orbilu.uni.lu/handle/10993/62161), and [How to Prove False Statements (paper)](https://eprint.iacr.org/2025/118).
[^28]: Of the "technically correct, the best kind of correct" variety. For example, a lot of "ZK" projects don't actually use the zero-knowledge property!
[^29]: Computational soundness means a scheme is secure against an adversary with limited computational resources. A statistically sound proof would hold up against an "unbounded" adversary. The latter is rarer in real-world cryptography. This can get quite complex in the academic literature, with different notions of soundness - computational, statistical, simulated, extractability etc. The subtleties of these distinctions are out of scope of this article, and not something most people have to care about, unless you want to become a full-time cryptographer.
[^30]: While less common, there are proof systems that is only succinct in one of these dimensions. E.g. Bulletproofs have succinct proofs but linear verification time.
[^31]: This is a term from computational complexity theory. We talk about how fast or slow something is as a function of its input. We might say O(1) means it is "constant", or O(n) means it is "linear", etc. Sublinear means less than linear, e.g. $\sqrt{n}$. See [Big O notation](https://en.wikipedia.org/wiki/Big_O_notation) and [Big O Notation Tutorial](https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/) for more details.
[^32]: E.g. it doesn't matter if it is we have to do $2 \cdot n$ operations or $20 \cdot n$ operations, these functions are both $O(n)$, or _on the order of $n$_.
[^33]: In practice a lot of proofs are logarithmic, $O(\log n)$. Sometimes quasi-linear, $O(n \log n)$ can also be fine and are still considered "succinct enough". Best case is $O(1)$, but it often comes with some other trade-offs. Examples of proof systems that are succinct are Groth16 and Plonk. Constants matter too, especially when it comes to on-chain verification. But this is out of scope of this article. See e.g. rationale for why Groth16 or KZG commitments are often used in Ethereum.
[^34]: Expressing the core algorithms, not with complete error handling or a great API, performance etc.
[^35]: $(\mathbb{Z}, +, \cdot)$ is a _ring_; more precisely it is an _commutative (or abelian) ring_ since multiplication is commutative ($a \cdot b = b \cdot a$).
[^36]: We call $1$ here the identity element $e$. It exists for both addition (usually 0), and multiplication (usually 1). See [definition of a field](<https://en.wikipedia.org/wiki/Field_(mathematics)#Definition>) for more.
[^37]: And what's called prime extension fields, like $p^n$.
[^38]: In applied cryptography and computer science, the $\mathbb{GF}(p)$ notation is more common, whereas in pure mathematics $\mathbb{F}_p$ is more common. The name Galois Field in honor of the french mathematician Galois who discovered them. He laid the foundations for abstract algebra, and he died in a duel at age 20.
[^39]: E.g. $2^{255} - 19$. The precise choice of prime number is a deeper topic, with notions such as _pairing-friendliness_, especially when it comes to cryptographic systems. See for example why BN254 was chosen in Zcash.
[^40]: In this explanation we skip the notion of a preprocessing setup step $\text{Setup}(C) \rightarrow (pp, vp)$, with Prover parameters ($pp$) and Verifier parameters ($vp)$. Usually this is included in definitions, but we don't need this in ZKBoo.
[^41]: We won't go into the precise details of what "knowing" witness here means, because it requires understanding notions such as adaptive knowledge soundness and extractors, which aren't necessary for having a conceptual grasp of the notion of statistical soundness. If you want to understand more, Thaler's book or Boneh's classes are good resources. Also see footnote 29.
[^42]: As well as some other pre-determined information, such as the Fiat-Shamir challenge algorithm, and possibly some "verification keys" (though not in the case of ZKBoo).