---
title: 'ZKPs 的程式教學: From Zero to Hero'
date: '2024-08-30'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "programming-zkps-from-zero-to-hero"
images: ['../assets/02_combined.png']
summary: "學習從零開始撰寫和修改 Zero Knowledge Proof！你會用 hash-based commitment 實作一個數位簽章系統，整個過程會幫助你建立對 ZKP 的直覺和實作能力。到最後，你會有足夠的工具可以實作像是 group signatures 這類的東西。"
---

本文由 Nicole、PinHao 和 Anton 翻譯

_給程式開發者的學習教材。_


你知道斑馬為什麼有條紋嗎？其中一種理論表示這是一種偽裝方式。當斑馬聚在一起時，獅子就難以分辨目標獵物。獅子必須先將目標獵物從群體中隔離出來才能進行獵補。[^1]

人類也喜歡隱藏在人群之中。一個具體的例子是多人使用一個共同的名稱寫文章，例如促成美國憲法批准的《聯邦論》（Federalist Papers）——多位作者共同使用 「Publius」這個筆名撰寫文章。[^2] 另一個例子是「Bourbaki」，這是一群活躍於1930年代法國數學家的共同筆名。他們專注於嚴謹和公理化方法並推動了現代數學的大規模重寫。[^3]

![Bourbaki Congress](../assets/02_bourbaki.png "Bourbaki Congress")

_1938 年的 Bourbaki 研討會_

在數位時代，假設你在群組聊天室中想發送敏感或是具爭議性的訊息，你想證明自己是群組成員之一，但不想透露自己是誰。我們要如何使用密碼學來達成這個目標呢？我們可以使用一種稱為「群簽章」（group signatures）的密碼學技術。

傳統來說，群簽章用到非常複雜的數學且實作困難；但透過零知識證明（Zero Knowledge Proofs，ZKP），這個數學難題將轉化為比較直觀的程式開發任務。閱讀完本文後，你將能親手實作自己的群簽章系統。

## Introduction 介紹

_本文將示範如何從零開始編寫基礎的零知識證明（ZKP）。_

學習一項新技術時，我們希望可以盡快掌握「編寫－建構－執行（edit-build-run）循環」。只有這樣，我們才能開始從自身的經驗中學習。

首先，我們會帶你設定環境、撰寫簡單程式、執行所謂的信任設定（trusted setup），盡快產生證明及驗證它。之後，我們會找出一些改進程式的方法，實作這些改進並進行測試。在此過程中，我們將逐步建立一個更清晰的心智模型，以理解實際編寫 ZKP 時所涉及的各個部分。最終，你將會熟悉（其中一種）從零開始編寫 ZKP 的方法。

我們會循序漸進，最終實作一個簡易簽章方案，讓你可以證明你傳送了某個特定的訊息。你將能夠理解以下程式碼的作用與原理：

```javascript
template SignMessage () {
  signal input identity_secret;
  signal input identity_commitment;
  signal input message;
  signal output signature;

  component identityHasher = Poseidon(1);
  identityHasher.inputs[0] <== identity_secret;
  identity_commitment === identityHasher.out;

  component signatureHasher = Poseidon(2);
  signatureHasher.inputs[0] <== identity_secret;
  signatureHasher.inputs[1] <== message;
  signature <== signatureHasher.out;
}

component main {public [identity_commitment, message]} = SignMessage();
```

你同時也會學習到所有必要的工具和技術，來將上述程式碼擴充為前面提到的群簽章方案。

### 先備知識

我們假設你是一位熟悉多種程式語言、並能操作 Unix 風格指令列界面的軟體工程師；同時對數位簽章（digital signatures）、公鑰密碼學（public-key cryptography）與雜湊函數（hash functions）等概念有初步的了解。

關於零知識證明，我們假設你已閱讀過我之前的文章 [_A Friendly Introduction to Zero Knowledge_](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge)。如果你尚未閱讀該文章，我們先來快速回顧一下最重要的內容。為了更佳好的理解，建議你先閱讀該文章。如果已閱讀過，則可以跳過以下內容。

### ZKP 回顧

ZKP 是相對新穎的密碼學形式，近年來已經有許多實際應用。傳統密碼學可實現簽章與加密等功能，而 ZKP 則讓我們以通用的方式來證明任意敘述為真。

除了能證明任意敘述，ZKP 具備兩大特性：隱私（privacy，又稱 zero knowledge）與壓縮（compression，又稱 succinctness 精簡性）。隱私代表我們可以在不洩漏其他資訊的情況下完成證明；壓縮則是在說無論計算多複雜，其證明的大小幾乎是固定的。ZKP 同時也是通用的。這就像是計算機（為特定任務而生）和電腦（能計算任何事物）之間的區別。

ZKP 的兩個具體例子：

- 我們可以使用數位身份證明自己年滿 18 歲
  - 而不必透露姓名、地址等其他資訊
- 我們可以證明所有的狀態轉換都有正確執行
  - 例如在公鏈中產生非常小的證明


我們可以透過撰寫稱為「電路（circuits）」的特殊程式來實現大部分常見的 ZKP。這讓一方（證明者 Prover）能針對某個敘述產生證明，另一方（驗證者 Verifier）則可驗證該證明。跟一般程式一樣，電路也可以接收輸入並產生輸出；我們可指定輸入為私有或公開，私有輸入只有證明者自己知道。撰寫電路時，我們透過限制式（constraints）來描述規則，例如「在數獨中，每一列 1 到 9 只會各出現一次」。

ZKP 雖然很新，但已經在公鏈中被廣泛應用，例如實現隱私支付或提升交易的吞吐量。

每天都有越來越多的應用被發現和開發出來。ZKP 也有許多不同的類型，各有取捨，這是一個非常活躍的研究領域。這些不同類型的 ZKP 技術正快速發展，帶來更高的效率與其他優勢。

## 概覽

我們將使用 Circom 和 Groth16。Circom 是一種用來編寫 ZKP 電路的特定域語言（Domain-Specific Language，DSL）。Groth16 則是一種常見且廣受歡迎的證明系統（proving system）。簡單來說，證明系統只是可以用來編寫 ZKP 的其中一種方法。也存在其他的 DSL 和證明系統。

我們將從安裝一些工具和套件開始。之後，我們將大致按照以下步驟進行：

* Write（撰寫電路）
* Build（編譯電路）
* Setup (信任設定)
* Prove (產生證明)
* Verify (驗證證明)

走過一次這個流程後，我們會回頭檢視現在這個方法存在的一些問題。然後，我們會一步一步的改進來建立出前面所提到的簽章機制。過程中，我們會解釋必要的概念和語法。

每節最後會附上一些簡單的練習來檢驗你的理解程度，建議你先完成這些簡單的練習。在本文的最後，我們會提供額外需要投入更多時間和心力的進階題。

### 準備工作

首先，我們需要安裝相關工具與相依套件。我們已準備好一份 [github repo](https://github.com/oskarth/zkintro-tutorial)，可協助你快速開始，避免陷入繁瑣細節。如果不想安裝軟體，請參考本節末尾的說明。

需要先安裝下列工具：

- `rust`（程式語言）
- `just`（現代化版的 `make`）
- `npm`（JavaScript 套件管理器）

實際使用的 ZKP 工具包括：

- `circom`（編譯我們的電路）
- `snarkjs`（執行 setup 與產生／驗證證明）
- `just` tasks (to simplify common operations related to above)
- `just` 任務（簡化上述工具的常用操作）

為安裝上述工具並簡化建置與執行流程，你可以透過 clone [github repo](https://github.com/oskarth/zkintro-tutorial)。此方法適用於 MacOS、Linux 等 Unix-like 系統；若是使用 Windows，建議透過 Linux VM、WSL 等方式開發。

```shell
# Clone 此 repo 並執行 prepare 腳本
git clone git@github.com:oskarth/zkintro-tutorial.git
cd zkintro-tutorial

# 執行前請先查看此檔案內容
less ./scripts/prepare.sh
./scripts/prepare.sh
```

建議先查看 `./scripts/prepare.sh` 來瞭解安裝內容，或自行手動安裝。執行成功後，終端機應該會顯示 `Installation complete` 且沒有跳出錯誤。

如果遇到問題，可以參考 Circon 官方最新文件 [連結](https://docs.circom.io/getting-started/installation/)。完成後，系統應該會安裝以下版本（或更高）：

```shell
> circom --version
circom compiler 2.1.8

> snarkjs | head -n 1
snarkjs@0.7.4
```

repo 中包含 `justfile`，定義了一系列常用的指令。透過 `just` 指令可以簡化 ZKP 操作流程，讓你專注在理解核心的步驟，降低新手易犯錯的機率。

如果想了解實際執行的指令，可以查看 `justfile` 與 `scripts` 目錄下的腳本。

我們強烈建議安裝上述軟體，以便跟著教學來更直觀的理解和操作。但如果不想安裝，可以使用線上 REPL 工具（如 [zkrepl.dev](https://zkrepl.dev)）進行學習；或是如果不想安裝 `just`，偏好自己執行所有指令，也可以透過附帶的 shell 腳本實現，只需要稍微手動調整即可。

## 第一輪實作

我們現在準備好開始寫程式了。為了建構前面提到的簽章機制，我們將從一個非常簡單的程式開始，相當於其他程式語言中的「Hello World」。

我們將撰寫一個特殊的程式，幫助我們證明「我們知道兩個秘密數字的知識，而這兩個數字的乘積是一個公開的數字，且證明過程中完全不洩漏這兩個秘密數字本身」。舉例來說，公開數字可能是「33」，而秘密數字是「11」和「3」。這是實現數位簽章的重要基石，也有助於建立對零知識證明更直覺的理解。如果你學過或知道非對稱密碼學，你可以將秘密數字想像成是「私鑰」，將公開數字當作「公鑰」。

由於這是一種涉及許多新概念的不同程式設計方式，如果一開始有些東西看不懂也別擔心。你可以隨時繼續前進，專注於程式碼、產生證明等，之後再回來看特定的部分。

### 撰寫特殊程式

與大多數其他程式設計不同，寫這些特殊的程式，也就是電路（circuit），看起來有點不一樣。我們感興趣的是證明一組限制式（constraint），[^4] 這組限制式就只有一條限制式。[^5] 這條限制式的內容是「兩個數字相乘等於第三個數字」。

前往上方 `zkintro-tutorial repo` 中的 `example1` 資料夾。在 `example1.circom` 中有一個小程式。將它修改成如下所示：


```javascript
pragma circom 2.0.0;

template Multiplier2 () {
  signal input a;
  signal input b;
  signal output c;
  c <== a * b;
}

component main = Multiplier2();
```

這就是我們的特殊程式，或是叫作電路。[^6] 一行一行來看：

- `pragma circom 2.0.0;` - 定義正在使用的 Circom 版本
- `template Multiplier()` - 模板（template）相當於大多數程式語言中的物件，是一種常見的抽象化形式
- `signal input a;` - 第一個輸入 `a`；輸入預設為私有的
- `signal input b;` - 第二個輸入 `b`；一樣預設為私有的
- `signal output c;` - 輸出 `c`；輸出永遠是公開的
- `c <== a * b;` - 這行做了兩件事：將信號 `c` 賦值*並*限制 `c` 必須等於 `a` 和 `b` `的乘積
- `component main = Multiplier2()` - 實例化我們的主要元件

最重要的一行是 `c <== a * b`;。我們在這裡實際宣告了我們的限制式。這個表達式實際上是兩個運算子的組合：`<--`（賦值）和 `===`（相等限制式）。[^7] 在 Circom 中的限制式只能使用涉及常數、加法或乘法的運算。它強制要求等式兩邊必須相等。[^8]

### 關於限制式

限制式是如何運作的呢？在像數獨（Sudoku）這樣的場景中，我們可能會說一個限制式是「一個介於 1 和 9 之間的數字」。然而，在 Circom 的脈絡下，這不是單一一個限制式，而是必須用一組更簡單的相等限制式（`===`）來表達的東西。[^9]

為什麼會這樣呢？這與底層的數學運算有關。基本上，大多數 ZKP 使用「算術電路」，它代表了對「多項式（polynomial)」的計算。在處理多項式時，你可以簡單的帶入常數、將它們相加、相乘，並檢查它們是否相等。[^10] 其他運算都必須用這些基本運算來表達。你不需要深入了解這些細節才能撰寫 ZKP，但對於底層發生了什麼事有一些直覺會很有幫助。[^11]

我們可以將電路視覺化如下

![example1 circuit](../assets/02_example1_circuit.png 'example1 circuit')

### 建構我們的電路

供參考，最終的檔案可以在 `example1-solution.circom` 中找到。關於語法的更多細節，請參閱[官方文件](https://docs.circom.io/circom-language/signals/)。

我們可以透過執行以下指令來編譯我們的電路：
```
just build example1
```

這是一個輕量的 wrap，用來呼叫 `circom` 來建立一個 `example1.r1cs` 和 `example1.wasm` 檔案。你應該會看到類似以下的輸出：

```shell
template instances: 1
non-linear constraints: 1
linear constraints: 0
public inputs: 0
private inputs: 2
public outputs: 1
wires: 4
labels: 4
Written successfully: example/target/example1.r1cs
Written successfully: example/target/example1_js/example1.wasm
```

在這種情況下，我們會得到：

* 兩個私有輸入 `a` 和 `b`
* 一個公開輸出 `c`
* 一個（非線性）限制式 `c <== a * b`

我們暫時忽略上述輸出的其他部分。[^12] 現在我們有兩個檔案：`example1.r1cs` 和 `example1.wasm`。

`r1cs` 代表 「一階限制式系統（Rank 1 Constraint System）」。這個檔案以二進位格式包含我們的電路，並對應到我們在數學上定義限制式的方式。[^13]

`.wasm` 檔案包含 WebAssembly，這是我們產生「見證（witness）」所需要的東西。「見證」（witness）是我們用來指定需要保密的輸入，同時會運用這些輸入來產生證明。

不過，我們還沒準備好製作證明。首先，我們需要執行一個 Setup 來取得我們的證明者金鑰和驗證金鑰。

如果這一切還沒完全弄懂，別擔心。這是一種新的做事方式，需要一些時間來適應。

### 信任設定

利用我們上面產生的資料，我們可以執行一個 「信任設定（trusted setup）」。

信任設定是是我們在預處理階段只需要執行一次的步驟。這會產生所謂的 「通用參考字串（Common Reference String，CRS）」，它包含一個「證明金鑰」和一個「驗證金鑰」。我們會使用這些金鑰來產生或驗證證明。

![Trusted setup](../assets/02_example1_setup1.png 'Trusted setup')

為什麼我們需要這些金鑰，又該由誰存取它們呢？證明者（prover）金鑰嵌入了為該特定電路保持零知識特性所需的資訊。同樣地，驗證者（verifier）金鑰嵌入了驗證該證明所需的資訊。這些並不是私鑰，而是可以也應該公開分發的資訊。任何需要產生或驗證證明的參與方都應該能夠存取它們。[^14]


為什麼我們稱之為信任設定？執行設定是涉及多方參與的過程，有時也被稱為「儀式（ceremony）」。[^15] 所有參與者合作創建一個密碼學上的「秘密」，這是建構證明金鑰和驗證金鑰的基礎。如果這個過程被操縱，從密碼學上來說，就有可能製造出假的證明，或將無效的證明錯誤地聲稱為已驗證。因此，這裡有一個信任假設，即至少有一些參與者在設定過程中是誠實的，這也正是「信任設定」一詞的由來。

首先，我們將自己來執行信任設定。執行以下指令：

`just trusted_setup example1`

![example1 trusted setup](../assets/02_example1_setup2.png 'example1 trusted setup')

系統會要求你提供兩次隨機文本或熵。[^16] 完成後，你應該會看到「Trusted setup completed.」以及金鑰的位置。以 `.zkey` 結尾的檔案就是我們的證明金鑰。雖然深入探討信任設定的細節超出了本文的範圍，但有幾件事值得我們了解。

首先，上述方法有什麼問題？由於我們只有一個參與者，其他所有使用該設定產生的金鑰的人，都在信任那個人以及他們的電腦環境，這在現實情況中是行不通的。實際上，我們會希望最大化參與者人數，來讓設定更值得相信。如果我們有 100 個人參與，因為這個密碼學秘密的產生方式，只要其中有一個人是誠實的就夠了。[^17]

另外值得一提的是，不同的 ZKP 系統在安全性、性能和功能方面有不同的特性。雖然所有 ZKP 系統都需要某種形式的設定，但並非所有系統都需要信任設定。而在需要信任設定的系統中，在要求上也有所不同。

我們使用 Circom 時，採用的是 Groth16 證明系統，它確實需要一個信任設定。具體來說，該設定分為兩個階段：階段 1 和階段 2。階段 1 與電路無關，可以被任何特定大小內的 ZKP 程式使用，而階段 2 則是「針對特定電路」的。當我們執行上述指令時，我們同時執行了這兩個階段。

你可能會好奇，如果可以避免，為什麼還要使用信任設定呢？很多人都同意這種說法。然而，人們仍有充分理由使用這些系統——例如更成熟的工具鏈與生態系，以及便宜的驗證成本。便宜的驗證成本在傳統上非常重要，尤其是當我們在像以太坊這樣的公鏈上驗證證明時。根據不同的使用情境，你的選擇可能會有所不同。在另一篇文章中，我們將更深入地探討信任設定及其權衡，以及不同的證明系統。

### 產生證明

完成上述的信任設定後，我們就有了一個證明金鑰和驗證金鑰。現在我們可以產生一個證明，證明我們知道兩個秘密值，它們的乘積是另一個公開數字。

讓我們來證明我們知道 33 可以由數字 3 和 11 相乘構成。回想一下，我們的私有輸入包含信號 a 和 b。我們在 `example1/input.json` 檔案中如下指定：

```json
{
  "a": "3",
  "b": "11"
}
```

也就是說，我們將輸入指定為一個 JSON 映射，其中鍵是信號名稱，值是我們想要賦予它的值。請注意，這個值是一個字串，儘管它在概念上是一個數字。這是 Circom 及其 JS API 的一個奇特之處。由於 ZKP 的特性，我們經常處理需要使用 BigInt 的非常大的數字。在 JSON 檔案中指定這樣一個大數最簡單的方法就是用一個字串，之後再將其轉換為 BigInt。

我們可以使用我們編譯好的電路（以 WASM 形式）、我們的證明金鑰和輸入，透過執行以下指令來建立一個證明：

`just generate_proof example1`

![example1 generate proof](../assets/02_example1_generate_proof.png 'example1 generate proof')

深入來看，這個指令會接收輸入並為我們的特定電路生成「見證」（witness）[^18]。通常，所謂的見證就是我們用來生成證明的私有輸入。而在 Circom 的上下文裡，見證是指所有信號（包括私有和公開信號）的完整賦值，並以證明者（prover）軟體能夠處理的形式存在，這種形式實際上是一種二進位格式的內部表示法[^19]。

有了這個產生的見證，我們就可以使用 `snarkjs` 來建立一個證明。最終，我們會得到一個證明和一些公開輸出。

這個證明看起來像這樣：

```json
{
  "pi_a": ["15932[...]3948", "66284[...]7222", "1"],
  "pi_b": [
    ["17667[...]0525", "13094[...]1600"],
    ["12020[...]5738", "10182[...]7650"],
    ["1", "0"]
  ],
  "pi_c": ["18501[...]3969", "13175[...]3552", "1"],
  "protocol": "groth16",
  "curve": "bn128"
}
```

上面的內容指定了證明的數學表達形式（由三個橢圓曲線的元素組成），`pi_a`、`pi_b` 和 `pi_c`。[^20] 其中還包含了一些關於 「證明系統」（groth16） 和「曲線」（bn128，這個數學實作細節，我們暫且忽略）的元資料。這些資訊可以讓驗證者知道該如何正確處理這個證明並完成驗證。


請注意這個證明有多麼簡短；無論我們的特殊程式有多複雜，它的大小都只會是這樣。這展示了我們在《零知識證明友善入門》中提到的 ZKP 的「精簡性（succinctness）」。

上述指令也輸出了我們的「公開輸出」：

```json
["33"]
```

這是一個對應於我們見證和電路的所有公開輸出列表。在這個例子中，只有一個公開輸出對應於 `c`：33。[^21]

我們證明了什麼？我們證明了我們知道兩個秘密值 `a` 和 `b`，它們的乘積是 33。這展示了我們在上一篇文章中討論的「隱私性（privacy）」。

請注意，證明本身單獨存在是沒有用的，它需要附帶的公開輸出。

### 驗證證明

接下來，讓我們來驗證這個證明。執行：

`just verify_proof example1`

![example1 verify proof](../assets/02_example1_verify_proof.png 'example1 verify proof')

這個指令會接收驗證金鑰、公開輸出和證明。有了這些，我們就能夠驗證證明。它應該會印出「Proof verified」。請注意，驗證者從未接觸到任何私有輸入。


如果我們改變輸出會發生什麼事？打開 `example1/target/public.json` 並將 33 改為 34，然後再次執行上述指令。


你會發現證明不再被驗證了。這是因為我們的證明並不能證明我們擁有兩個乘積為 34 的數字。


恭喜，你現在已經撰寫了你的第一個 ZKP 程式、執行了信任設定、產生了證明，並最終驗證了它！

### 練習

1. ZKP 的兩個關鍵特性是什麼，它們分別代表什麼意思？
2. 證明者的角色是什麼，需要什麼輸入？那驗證者呢？
3. 解釋 `c <== a * b;` 這一行做了什麼。
4. 為什麼我們需要執行信任設定？我們如何使用它的產物？
5. 程式：完成 `example1`，直到你產生並驗證了一個證明。

## 第二輪

透過上面的電路，我們證明我們知道兩個（秘密）數字的乘積。這與「質因數分解」問題密切相關，而質因數分解是許多密碼學的基礎。[^22] 其概念是，如果你有一個非常大的數字，很難找到兩個質數，使其乘積等於那個大數。另一方面，檢查兩個數字的乘積是否等於另一個數字則非常容易。[^23]

然而，我們的電路有一個大問題。你看出來了嗎？

我們可以輕易地將輸入改成「1」和「33」。也就是說，任何數字 `c` 永遠是 1 和 `c` 的乘積。這一點也不厲害，對吧？

我們想要做的是新增另一個「限制式」，即 `a` 和 `b` 都不能等於 1。這樣一來，我們就被迫進行真正的整數分解。

我們要如何新增這個限制式，又需要做哪些改變呢？

### 更新我們的電路

我們將在 `example2` 資料夾中進行這些更改。不幸的是，我們不能單純寫 `a !== 1`，因為這不是一個有效的限制式。[^24] 有效的限制式只由常數、加法、乘法和相等檢查組成的。我們該如何表達「某值不等於」呢？

這不是馬上就能直覺想到的，而這類問題正是編寫電路被視為「藝術」的地方。培養這項技能需要時間，也超出了本入門教學的範圍；幸運的是，這方面有很多好的資源可以參考。[^25]

有一些常見的慣用手法，基本的想法是使用一個 `IsZero()` 模板，它會檢查一個表達式是否等於零。如果等於零，它輸出 1（真），否則輸出 0（假）。

使用真值表 [^26] 來顯示可能的值通常很有幫助。這是 `IsZero()` 的真值表：
| in  | out |
| --- | --- |
| 0   | 1   |
| n   | 0   |

這是一個非常有用的功能，因此它被包含在 Circom 的函式庫 `circomlib` 中。在 `circomlib` 裡還有許多其他有用的組件。[^27]

我們可以透過建立一個 `npm`（JavaScript）專案並將其作為相依套件加入來包含它。在 `example2` 資料夾中，我們已經為你做好了這件事。要匯入相關模組，只要在 `example2.circom` 的頂部添加以下這一行：

`include "circomlib/circuits/comparators.circom";`

使用 `IsZero()`，我們可以檢查 `a` 或 `b` 是否等於 1。修改 `example2.circom` 檔案，使其包含以下幾行：

```javascript
component isZeroCheck = IsZero();
isZeroCheck.in <== (a - 1) * (b - 1);
isZeroCheck.out === 0;
```

在上面的程式碼片段中，我們建立了一個新組件 `isZeroCheck`，實例化了 `IsZero()` 模板。如果 `a` 或 `b` 其中任一個等於 1，`isZeroCheck.in` 將被賦值為 0，而 `isZeroCheck.out` 將變為 1。由於我們有一個限制式規定 `isZeroCheck.out === 0`，這個限制式將會失敗。這表示我們再也無法提供 `a` 或 `b` 等於 1 的輸入。

我鼓勵你在腦中或用紙筆（或許用真值表？）來說服自己這是正確的。如果你想挑戰一下，可以試著弄清楚 `IsZero()` 是如何實現的。它只有幾行程式碼。你可以在 `circomlib` 的 `comparators.circom` 檔案中看到程式碼。[^28]

供你參考，最終的檔案可以在 `example2-solution.circom` 中找到。完成上述更改後，我們可以安裝 `npm` 的 `circomlib` 依賴套件，並用以下指令建構我們的電路：

`just build example2`

### 重新執行我們的信任設定

使用 Circom 和 Groth16，每當我們更改電路時，就必須重新執行信任設定。這代表在發布電路之前，你最好確定它是穩定的。特別是當你要舉行一個涉及多方參與的儀式（Ceremony）。

更具體地說，我們只需要再次執行針對特定電路的（階段 2）信任設定。這是因為階段 1 對於「任何」用 Circom 編寫的、在特定大小內的 Groth16 電路都是通用的。當我們執行上述的信任設定時，我們同時進行了階段 1 和階段 2，但為了簡單說明，省略了階段 1 的細節。以下是關於階段 1 的更多細節，以提供一個更完整的畫面。

![Trusted setup (both phases)](../assets/02_example2_setup_both.png 'Trusted setup (both phases)')

階段 1 信任設定的結果保存在一個 `.ptau` 檔案中，其中 ptau 代表 tau 的冪次（powers of tau）。[^29] 從數學上講，這個檔案包含了一些隨機秘密值的冪。這使得我們能夠「容納」一定數量的限制式。我們不需要從數學上理解其運作原理，但有兩個關鍵事實很有用：(a) `.ptau` 與電路無關 (b) 其大小表示其容量。給定 ptau 的「容量」是 `2^n - 1` 個限制式，其中 `n` 是某個數字。例如，`pot12.ptau` 表示它能容納的限制式數量是 2^12 - 1，即略多於 4000 個限制式。

因為我們不想再次執行階段 1，我們只想執行階段 2。這將使用先前產生的 `pot12.ptau`（儲存在 ptau 目錄中）作為輸入。我們可以用以下指令執行我們的階段 2 信任設定：

```
just trusted_setup_phase2 example2
```
![example2 trusted setup](../assets/02_example2_setup2.png 'example2 trusted setup')

### 測試我們的變更

完成後，我們可以執行：

```
just generate_proof example2
just verify_proof example2
```

它一樣如我們的預期可以產生並驗證證明。

如果我們將 `example2/input.json` 的輸入改成 1 和 33，然後嘗試執行上述指令，我們會看到一個斷言錯誤。也就是說，Circom 甚至不讓我們產生證明，因為輸入違反了我們的限制式。

### 完整流程圖
既然我們已經走完了整個流程兩次，讓我們退一步，看看所有的部分是如何組合在一起的。

![example2 complete flow](../assets/02_example2_complete_flow.png 'example2 complete flow')

希望事情開始變得有點道理了。接下來，讓我們再提升一個層次，讓我們的電路更有用。

### 練習
6. 為什麼對於 `example2`，我們需要執行信任設定的階段 2，但不需要執行階段 1？
7. 上一個例子的主要問題是什麼，我們是如何修正它的？
8. 程式：完成 `example2`，直到你無法成功產生一個證明為止。

## 第三輪

透過上面的電路，我們已經證明了我們知道兩個秘密值的乘積。但這本身並不是很有用。在現實世界中有用的東西是「數位簽章機制」。有了它，你可以向別人證明你寫了一則特定的訊息。我們要如何使用 ZKP 來實現這一點呢？要達到這個目標，我們必須先涵蓋一些基本概念。

現在是個好時機，休息一下，去泡杯你喜歡的飲料吧。

### 數位簽章

數位簽章已經存在一段時間了，並且在我們的數位時代中無所不在。沒有它們，現代網路將無法運作。通常，這些都是使用「公鑰密碼學」來實現的。在公鑰密碼學中，你有一個私鑰和一個公鑰。私鑰只給你自己使用，而公鑰則是公開分享的，代表你的身份。

一個數位簽章機制包含以下幾個部分：
- **金鑰生成（Key generation）**：生成一個私鑰和對應的公鑰
- **簽署（Signing）**：使用私鑰和訊息來創建一個簽章
- **簽章驗證（Signature verification）**：驗證訊息是否由對應的公鑰簽署

雖然具體細節看起來不太一樣，但我們寫的程式和上面的金鑰生成演算法有一個共同點：它們都使用「單向函數」，更具體地說，是「陷門函數」。陷門就像一個易進難出的陷阱（除非你能找到隱藏的梯子）。[^30]

![example3 trapdoor](../assets/02_example3_trapdoor.png 'example3 trapdoor')

對於公鑰密碼學來說，從私鑰建構出公鑰很容易，但反過來卻非常困難。這對於我們之前的程式也是如此。如果兩個秘密數字是非常大的質數，就很難將它們的乘積還原成原始值。現代的公開金鑰密碼學底層通常使用「橢圓曲線密碼學」。

傳統上，開發像數位簽章機制這樣的密碼學協定是一項非常困難的工作，需要想出一個涉及巧妙數學的特定協定。我們不想這麼做。相反地，我們想用 ZKP 寫一個程式來達到相同的結果。

而不是這樣：[^31]
![Signature verification](../assets/02_example3_sigverify.png 'Signature verification')

我們只想寫一個程式，為我們想要的東西產生一個證明，然後驗證這個證明。

### 雜湊函數與承諾

我們不使用橢圓曲線密碼學，而是使用兩個更簡單的工具：「雜湊（hash）函數」和「承諾（commitment）」。

雜湊函數也是一種單向函數。例如，在命令列上，我們可以像這樣使用 SHA-256 雜湊函數：

```shell
echo -n "foo" | shasum -a 256
```

來產生 "foo" 的雜湊值：`0beec7[...]a8a33`（縮寫）。[^32]

單獨來看，雜湊函數並不是一個陷門函數。沒有什麼特殊知識能讓我們取回原始值。它更像一台絞肉機，而不是一個帶有隱藏梯子的陷門。

那承諾呢？一個「承諾」只是一種對秘密值進行承諾（「保證」）的方式，這樣我們事後就不能改變秘密值。在我們的例子中，我們將使用一個承諾，透過某個秘密值來產生相當於公鑰的東西。我們可以用雜湊函數來做到這一點。

承諾機制是一種非常常見的密碼學原語。[^33] 它們讓我們能夠：

- **commit（承諾）**：對一個特定值進行承諾，同時保持其隱藏
- **reveal（揭示）**：揭示這個值，以便可以驗證其正確性

這給了我們兩個關鍵特性：

- **hiding（隱藏性）**：讓值保持隱藏
- **binding（綁定性）**：你不能對這個值改變主意

理解承諾的一種方式是，想像你給朋友一個上了鎖的盒子。你事後無法改變盒子裡的內容，但你的朋友也無法看到裡面。只有當你給他們鑰匙時，他們才能打開它。

![example3 lockbox](../assets/02_example3_lockbox.png 'example3 lockbox')

回到我們的數位簽章機制，我們有：

- **金鑰生成（Key generation）**：創建一個秘密字串並將其 hash 以創建一個承諾
- **簽署（Signing）**：將秘密與訊息一起 hash 以創建一個簽章
- **驗證（Verification）**：使用承諾、訊息和簽章（公開輸出）來驗證證明

在我們的電路中，我們想做的事情用虛擬代碼表示如下：

```python
commitment = hash(some_secret)
signature = hash(some_secret, message)
```

看到這裡，你可能有些問題。讓我們來解答一些你心中可能有的疑問。

首先，為什麼這樣的作法可行？又為什麼我們需要使用零知識證明（ZKP）來達成這件事？當驗證者在驗證證明時，他們只能看到承諾（commitment）、訊息以及簽章，並無法直接驗證這個承諾是否真的對應某個特定的秘密，除非這個秘密被揭露。而透過 ZKP，我們在產生證明時雖然使用了秘密，但在對外公開的過程中並不直接洩漏這個秘密，因此能讓驗證者相信這個承諾與秘密相符，同時也保護了秘密本身的隱私。

第二，為什麼在 ZKP 內部使用這些雜湊函數和承諾，而不是公鑰密碼學？你完全可以在 ZKP 內部使用公鑰密碼學，而且這樣做也有正當的理由。但就限制式的數量而言，它的實作成本比上述方法高得多。這使得它比上面那個更簡單的機制慢很多。正如我們將在下一節中看到的，雜湊函數的選擇是非常重要的。

最後，既然我們已經有了公鑰密碼學，為什麼還要使用 ZKP 呢？在這個簡單的例子中，確實不需要 ZKP。然而，它可作為建構有趣應用的基石，例如本文開頭提到的群簽章。畢竟，我們想要的是「用程式設計的方式建構密碼學」。

內容很多！幸運的是，我們已經度過最困難的部分了。我們來寫程式吧。如果上面並非所有內容你都第一時間完全理解，別擔心。要習慣這種推理方式需要一點時間。

### 回到程式碼

我們將從 `example3` 目錄開始。

要實現數位簽章，我們首先需要產生我們的金鑰。這些對應於公鑰密碼學中的私鑰和公鑰。因為這些金鑰對應到一個身份（你，也就是證明者），我們將分別稱之為 `identity_secret` 和 `identity_commitment`。它們共同構成一個身份金鑰對。

這些將與我們正在簽署的訊息一起，作為電路的輸入。公開輸出則會有簽章、承諾和訊息。這將允許某人驗證該簽章確實是正確的。

因為我們需要身份金鑰對作為電路的輸入，所以我們先分開產生它們：

`just generate_identity`

這會產生類似以下的輸出：

```shell
identity_secret: 43047[...]2270
identity_commitment: 21618[...]0684
```

為了確保秘密的安全，我們使用一個很大的隨機數字。與我們之前看到的不同，我們不是使用像 SHA-256 這樣的雜湊函數來創建承諾。相反地，我們使用的是所謂的 ZK 友善的雜湊函數。這是一種為在 ZKP 中使用而優化的特殊雜湊函數。當你進行大量雜湊運算時，這對性能影響很大。我們正在使用的 ZK 友善雜湊函數稱為 Poseidon hash 函數。[^34]

從技術實現層面來看，這使用了 `circomlibjs` 函式庫來包裝 `circomlib`。這是一個 JavaScript 函式庫，讓我們可以使用 Circom 電路。這確保了我們的 `identity_commitment` 在 JavaScript/命令列中的生成方式與在我們電路中的完全相同。如果你想閱讀該腳本的原始碼，可以在 `example3/generate_identity.js` 中找到。

就像我們之前對 `IsZero` 所做的一樣，我們需要引入 Poseidon 模板。我們透過以下 include 語句來完成：

```
include "circomlib/circuits/poseidon.circom";
```

Poseidon hash 模板的使用方式如下：

```javascript
component hasher = Poseidon(2);
hasher.inputs[0] = foo;
hasher.inputs[1] = bar;
quux <== hasher.out
```

我們指定 hasher 組件需要兩個參數，這兩個參數在 `.inputs[]` 陣列中指定。然後它將輸出信號賦值給 `.out`。在這個例子中，它接收 `foo` 和 `bar` 作為輸入，將它們一起雜湊，結果是 `quux`。[^35]

最後，我們介紹一個新的語法：

```javascript
component main {public [identity_commitment, message]} = SignMessage();
```

預設情況下，我們電路的所有輸入都是私有的。透過這個語法，我們明確地將 `identity_commitment` 和 `message` 標記為公開。這意味著它們將成為公開輸出的一部分。

有了這些資訊，你應該有足夠的能力來完成 `example3.circom` 電路了。如果你還是卡關，可以參考 `example3-solution.circom` 以取得完整程式碼。

和之前一樣，我們必須建構電路並執行信任設定的階段 2：

```shell
just build example3
just trusted_setup_phase2 example3
```

在建構電路時，你可能會注意到，與 `example2` 相比，限制式的數量增加了不少。這主要是因為使用了兩個 Poseidon 雜湊。[^36]

### 測試我們的電路

作為參考，這是我們完成的電路的圖示：

![example3 circuit](../assets/02_example3_circuit.png 'example3 circuit')

我們現在可以產生一個證明。我們在 `example3/input.json` 中有以下輸入：

```json
{
  "identity_secret": "21879[...]1709",
  "identity_commitment": "48269[...]7915",
  "message": "42"
}
```

請隨意將身份金鑰對更改成你自己用 `just generate_identity` 產生的那組。畢竟，身份秘密是你自己要保管好的！

你可能會注意到訊息只是一個被引號括起來的數字（"42"）。不幸的是，由於限制式在數學上的運作方式（使用線性代數和「算術電路」），我們只能使用數字而不能使用字串。在電路內部唯一支援的運算是像加法和乘法這樣的基本算術運算。[^37]

我們現在可以產生並驗證一個證明：

```
just generate_proof example3
just verify_proof example3
```

和以前一樣，即使我們做了更多的事情，證明的尺寸保持不變。在 `example3/target/public.json` 中找到的公開輸出是：

```json
["48968[...]5499", "48269[...]7915", "42"]
```

這分別對應於簽章、承諾和訊息。

讓我們來看看如果不小心，會如何出錯。[^38]

首先，如果我們在 `input.json` 中將身份承諾改成一個隨機值會發生什麼事？你會發現我們再也無法產生證明。這是因為我們在電路內部也在檢查身份承諾。維持身份秘密和承諾之間的這種關係至關重要。

第二，如果我們不在輸出中包含訊息會怎麼樣？我們確實能得到一個證明，而且它也能被驗證。但訊息可以是「任何東西」，所以這並不能真正證明你發送了一條特定的訊息。同樣地，如果我們不在公開輸出中包含身份承諾呢？這意味著身份承諾可以是任何東西，所以我們實際上不知道是「誰」簽署了這條訊息。

作為一個思維練習，說服你自己（或親自試試）如果我們省略以下任一關鍵限制式可能會出什麼問題：

- `identity_commitment === identityHasher.out`
- `signature <== signatureHasher.out`


恭喜你，你現在已經學會如何編寫密碼學程式了！[^39]

### 練習
9. 數位簽章機制的三個組成部分是什麼？
10. 使用像 Poseidon 這樣的「ZK 友善雜湊函數」的目的是什麼？
11. 什麼是承諾？我們如何將它們用於數位簽章機制？
12. 為什麼我們將身份承諾和訊息標記為公開？
13. 為什麼我們需要身份承諾和簽章的限制式？
14. 程式：完成 `example3`，直到你產生並驗證了一個證明。

## 下一步

有了上述的數位簽章機制，以及我們在文章前面看到的一些技巧，你手上就擁有了實現文章開頭提到的「群簽章機制」所需的工具。[^40]

`example4` 中已經有一些程式碼。你只需要 5-10 行程式碼。唯一的新語法是 for 迴圈，它的運作方式和大多數其他語言一樣。[^41]

這個電路將允許你：
- 簽署一則訊息
- 證明你是三個人（身份承諾）中的一員
- 但不透露是哪一位


你可以把它看作一個謎題。關鍵的想法基本上可以歸納到一個單一的算術表達式。如果可以的話，試著在紙上把它解出來。如果卡住了，可以像以前一樣查看解答。

最後，如果你想要一些額外的挑戰，這裡有幾種擴展它的方法：

1. 允許群組中有任意數量的人
2. 實現一個新的電路 `reveal`，用來證明你簽署了某個特定的訊息
3. 實現一個新的電路 `deny`，用來證明你沒有簽署某個特定的訊息

使用傳統工具創建像這樣的密碼學協議會是一項艱鉅的任務，需要大量專業知識。[^42] 而借助零知識證明，你可以在短時間內快速上手並實現，將這些複雜問題轉化為程式設計任務來處理。而這還只是我們能實現的冰山一角。

### 練習題

15. 相較於一般簽章，群簽章能做什麼？它們可以如何被使用？

## Problems

這些問題是自由回答的，需要付出更多的心力。

1. 弄清楚 `IsZero()` 是如何實現的。
2. 程式：完成上面的群簽章機制（見 `example4`）。
3. 程式：擴展上面的群簽章範例：允許更多人，並實現 `reveal` 和/或 `deny` 電路。
4. 你會如何設計一個「ZK 身份」系統來證明你已年滿 18 歲？你可能還想證明哪些其他屬性？在宏觀層面上，你會如何實現它，你看到了哪些挑戰？研究現有的解決方案，以更了解它們是如何實現的。
5. 對於像以太坊這樣的公鏈，有時會使用「第二層網路」（Layer 2, L2）來實現更快、更便宜和更多的交易。在宏觀層面上，你會如何使用 ZKP 設計一個 L2？解釋一下你看到的挑戰。研究現有的解決方案，以更了解它們是如何實現的。
 
## 結論

在這個入門教學中，我們學習了如何從頭開始編寫和修改基本的 ZKP。我們設定了程式設計環境，並編寫了一個基本的電路。然後，我們執行了信任設定、創建並驗證了證明。我們找出了一些問題並改進了我們的電路，並確保測試了我們的變更。之後，我們使用雜湊函數和承諾實現了一個基本的數位簽章機制。

我們也學到了足夠的技能和工具，能夠實現群簽章，這在沒有 ZKP 的情況下是很難實現的。

我希望你對於撰寫 ZKP 涉及的內容已經建立了一個更好的心智模型，並且對於編輯-執行-除錯的循環在實務中是什麼樣子有了更好的感覺。無論你使用哪種技術，這都會為你未來編寫的任何其他 ZKP 程式奠定良好的基礎。

## 致謝

感謝 Hanno Cornelius、Marc Köhlbrugge、Michelle Lai、lenilsonjr 與 Chih-Cheng Liang 閱讀初稿並提供寶貴建議。

感謝 Nicole、PinHao 和 Anton 協助翻譯。

### 圖片來源

- _Bourbaki Congress 1938_ - Unknown, Public domain, via [Wikimedia](https://commons.wikimedia.org/wiki/File:Bourbaki_congress1938.png)
- _Hartmann's Zebras_ - J. Huber, CC BY-SA 2.0, via [Wikimedia](https://commons.wikimedia.org/wiki/File:Hartmann_zebras_hobatereS.jpg)
- _Trapdoor Spider_ - P.S. Foresman, Public domain, via [Wikimedia](<https://commons.wikimedia.org/wiki/File:Trapdoor_(PSF).png>)
- _Kingsley Lockbox_ - P.S. Foresman, Public domain, via [Wikimedia](https://commons.wikimedia.org/wiki/File:Kingsley_lockbox.jpg)

## 參考資料

[^1]: While illustrative as a metaphor, this is just one of several theories. If you are curious, check out https://en.wikipedia.org/wiki/Zebra#Function.
[^2]: See [Federalist Papers (Wikipedia)](https://en.wikipedia.org/wiki/The_Federalist_Papers#Authorship).
[^3]: See [Bourbaki (Wikipedia)](https://en.wikipedia.org/wiki/Nicolas_Bourbaki#Membership).
[^4]: Unless you have done some form of declarative programming (as in: non-procedural, like Prolog, this is probably new to you. To some extent we do this in SQL too. We describe _what_ we want, not necessarily _how_ we want it done.
[^5]: Technically, zero constraint is also a set of constraints. While said in jest, under-constrained circuits are a big problem that can lead to many serious bugs. We will see an example of this later on.
[^6]: We call it a _circuit_, or more precisely an _arithmetic circuit_, because it connects inputs and outputs in a similar fashion to logical gates such as NAND, AND, NOT, XOR, etc gates. From this we can build a universal computer, or universal circuit.
[^7]: In general, using `<--` is not recommended and you should almost always avoid it by using `<==` instead.
[^8]: This makes writing constraints quite challenging, as you can imagine. See https://docs.circom.io/circom-language/constraint-generation/ for more details on constraints in Circom.
[^9]: To say "this number is between 1 and 9" we have to implement a _range check_. This includes decomposing the number into bits and performing equality checks on them them. Luckily, a lot of these types of constraints have already been written and be re-used, as we'll see later with _circomlib_.
[^10]: For example `p(x) = ax^2 + bx + c` can easily be added, multiplied together or compared with `q(x) = dx^2 + 2bx + e`. It is worth noting that in ZKPs we operate over finite fields, not real numbers. This is out of scope of this article, thoguh.
[^11]: While most ZKPs use _arithmetic circuits_, there are other proving systems work with other abstractions. For example, zkSTARKs and Bulletproofs.
[^12]: Linear constraint means it can be expressed as a linear combination using only addition. This is equivalent to using multiplications with constants. The main thing to be aware of is that linear constraints are less complex than non-linear ones. See [constraint generation](https://docs.circom.io/circom-language/constraint-generation/) for more details. Wires and labels refers to what the _arithmetic circuit_ looks like. This is not something you usually have to care about. See [arithmetic circuits](https://docs.circom.io/background/background/#arithmetic-circuits) for more details.
[^13]: Mathematically, what we are doing is making sure the equation `Az * Bz = Cz` holds, where `Z=(W,x,1)`. `A`, `B,` and `C` are matrices, `W` is the witness (private input), and `x` is public input/out. While useful to know, it is not necessary to understand this for writing circuits. See [Rank-1 constraint system](https://docs.circom.io/background/background/#rank-1-constraint-system) for more details.
[^14]: : A better, but less commonly used, term here would be "proving parameters" and "verification parameters", respectively. This would be a bit more intuitive as keys are usually meant to be private. We will keep using "key" as opposed to "parameter" because that is what you are most likely to run into in the wild.
[^15]: As [mentioned](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge#user-content-fn-33) in the _friendly introduction_ article, there's a great layman's podcast on The Ceremony Zcash held in 2016 that you can listen to [here](https://radiolab.org/podcast/ceremony). Since then, a lot has changed in terms of trusted setups, and they are much easier to run and participate in.
[^16]: This is because we rely on randomness to make the generation of proving and verification keys secure. In a real trusted setup, getting more sources of entropy is often desirable.
[^17]: We call this a 1-out-of N trust model. There are many other trust models; the one you are most familiar with is probably majority rule, where you trust the majority to make the right decision. This is basically how democracy and most voting works.
[^18]: Since we always generate the witness together with the proof, the resulting binary file `witness.wtns` is mostly an intermediate step and an implementation detail. We use it straight away to generate the proof, which is why it is omitted from the diagram.
[^19]: In the literature, a witness is just the `W` part of the vector `Z=(W,x,1)` used in R1CS, where `x` is all the public/input signals. In Circom, the whole vector is referred to as the witness. Also see note 13.
[^20]: The numbers have been abbreviated for brevity with `[...]`. Mathematically, these are elliptic curve points on the _bn128_ curve, with a field size of 254-bits. A 254-bit number can have up to 77 digits in its decimal representation.
[^21]: The output is a bit unintuitive in that it doesn't map to the original signal name like this: `{"c": "33"}`. This requires the developer to re-map the outputs according to the order they were defined in the circuit. This is due to the implementation of `snarkjs` where we lose the variable information for proof generation.
[^22]: Also known as a _cryptographic hardness assumption_. See [Computational hardness assumption (Wikipedia)](https://en.wikipedia.org/wiki/Computational_hardness_assumption#Common_cryptographic_hardness_assumptions).
[^23]: See https://en.wikipedia.org/wiki/Integer_factorization for more.
[^24]: While we can add _asserts_, these aren't actually constraints but only used for sanitizing input. See https://docs.circom.io/circom-language/code-quality/code-assertion/ for how that works and https://www.chainsecurity.com/blog/circom-assertions-misconceptions-and-deceptions for an example of how misusing asserts can go wrong. For more intuition on what constraints are, see the previous section _On constraints_.
[^25]: This resource by 0xPARC is excellent if you want to dive deeper into the art of writing (Circom) circuits: https://learn.0xparc.org/materials/circom/learning-group-1/circom-1/ (in particular the Circom workshops). Reading the standard library can also be illuminating, see note 26.
[^26]: Due to the nature of writing constraints, this comes up a lot. See https://en.wikipedia.org/wiki/Truth_table.
[^27]: See https://github.com/iden3/circomlib for more on circomlib.
[^28]: See https://github.com/iden3/circomlib/blob/master/circuits/comparators.circom.
[^29]: People usually share these `ptau` files across projects for increased security. See https://github.com/privacy-scaling-explorations/perpetualpowersoftau for details. You can also find a list of these ptau files, of various size, in https://github.com/iden3/snarkjs.
[^30]: Here the ladder represents some value that allows us to go the opposite, "hard" way. Another way to think about it is as a padlock. You can easily lock it, but hard to unlock it, unless you have a key. Trapdoor functions also have a more formal definition, see https://en.wikipedia.org/wiki/Trapdoor_function.
[^31]: Screenshot from Wikipedia. See [ECDSA (Wikipedia)](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm#Signature_verification_algorithm).
[^32]: This command should work on most Unix-style systems. We use `-n` to specify no newline character (`foo`, not `foo\n`), and `-a` to specify we want SHA256.
[^33]: See https://en.wikipedia.org/wiki/Commitment_scheme. Note that we don't always need the "hidden" property. For example, when it comes to using ZKPs to make Ethereum more scalable, we only want an efficient subset reveal of the state trie.
[^34]: We use Poseidon, but there are many others. Why is it faster? These ZK-friendly hash functions are implemented using arithmetic operations on prime fields, not bitwise operations like SHA256. it takes a lot fewer constraints to implement, which results in faster proving time. The performance difference between the two can be up to two orders of magnitude. On the flip side, a hash function like SHA256 has been studied more rigorously than most of these new ZK-friendly hash functions.
[^35]: In ZKPs, we often want to hash multiple things together. Unlike a traditional context, we can't just concatenate strings together ("foo bar"), so we instead specify how many inputs we have to our hash function.
[^36]: As mentioned in the note above, if this was using SHA-256 or doing some elliptic curve math the constraint count would be a lot higher. If we had more than 4000 constraints, we'd have to perform (or re-use) another phase 1 trusted setup with a higher capacity ptau.
[^37]: We can however encode our string as a byte array, using Unicode or ASCII. In a real application you'd probably use the hash of your message in its BigInt representation instead.
[^38]: In a real-world digital signature scheme, where multiple messages are exchange, we'd also probably want to introduce a cryptographic nonce. This is to avoid replay attacks, where someone could re-use the same signature at a later time. See https://en.wikipedia.org/wiki/Replay_attack.
[^39]: For real-world applications, try to re-use existing work and best practices as much as possible. There are a lot of things that can go wrong if you aren't careful. Luckily, this is getting easier and easier as the ZKP ecosystem mature. At a certain stage, a lot of high-risk applications do security audits to make sure their applications are secure (or at least not provably insecure).
[^40]: Implementing group signatures in ZKP was inspired by 0xPARC, see https://0xparc.org/blog/zk-group-sigs.
[^41]: See https://docs.circom.io/circom-language/control-flow/.
[^42]: In comparison, a paper implementing group signatures like https://eprint.iacr.org/2015/043.pdf involves some heavy cryptography and math.