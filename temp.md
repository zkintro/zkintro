

[^31]: Alice and Bob are commonly used characters in cryptographic systems, see [Wikipedia](https://en.wikipedia.org/wiki/Alice_and_Bob).

[^31]: Alice e Bob são personagens comumente usados em sistemas criptográficos — veja [Wikipedia](https://en.wikipedia.org/wiki/Alice_and_Bob).

[^32]: There are also zk-STARKs, so one could argue a more accurate name might be (zk)S(T|N)ARKs. This is obviously a bit of a mouthful, so people tend to use ZK as a shorthand. See for example the name of the ZK podcast, the ZK proof standard, etc. ZK is the most magical property of ZKPs, in the author's opinion.

[^32]: Também existem os zk-STARKs, então alguém poderia argumentar que um nome mais preciso seria (zk)S(T|N)ARKs. Obviamente isso é um pouco difícil de pronunciar, então as pessoas tendem a usar apenas ZK como abreviação. Veja por exemplo o nome do podcast ZK, o padrão de provas ZK, etc. Na opinião do autor, ZK é a propriedade mais mágica das ZKPs.

[^33]: Setups are multi-faceted and a big part of the security assumptions of a ZKP. They are a bit involved mathematically, and to give them full justice would need a dedicated article. There's a great layman's podcast on The Ceremony Zcash held in 2016 that you can listen to [here](https://radiolab.org/podcast/ceremony).

[^33]: Configurações são multifacetadas e uma grande parte das suposições de segurança de uma ZKP. Elas envolvem matemática considerável, e para tratá-las adequadamente seria necessário um artigo dedicado. Há um ótimo podcast introdutório sobre a cerimônia da Zcash realizada em 2016, que você pode ouvir [aqui](https://radiolab.org/podcast/ceremony).

[^34]: Technically speaking this is an _arithmetic circuit_ (dealing with numbers), but we won't introduce details of this in this article. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for more.

[^34]: Tecnicamente falando, isso é um _circuito aritmético_ (que lida com números), mas não vamos entrar nos detalhes disso neste artigo. Veja mais na [Referência da Comunidade ZKProof](https://docs.zkproof.org/reference.pdf).

[^35]: Unless you want to! ZK is sometimes called "Magic Moon Math", but if you really study it the mathematics you need to get an intuition for how they actually work under the hood isn't as complex as you might think. We won't go into it in this article, though. Here's a [presentation](https://www.youtube.com/watch?v=W1ZkhWNka-c) by the author on some of the mathematical foundations of ZKPs.

[^35]: A não ser que você queira! ZK às vezes é chamado de "matemática mágica da lua", mas se você realmente estudar, verá que a matemática necessária para ter uma intuição de como tudo funciona por baixo dos panos não é tão complexa quanto parece. Mesmo assim, não abordaremos isso neste artigo. Aqui está uma [apresentação](https://www.youtube.com/watch?v=W1ZkhWNka-c) do autor sobre algumas das bases matemáticas das ZKPs.

[^36]: French for here you go, presto, bingo, ta-da, and Bob's your uncle.

[^36]: Francês para “aí está”, “voilà”, “bingo”, “pronto” e expressões similares.

[^37]: There are different notions of succinctness, and this depends on the specific proof system. Technically, we call proofs succinct if they are sublinear in time complexity.

[^37]: Existem diferentes noções de *succinctness*, e isso depende do sistema de prova específico. Tecnicamente, chamamos uma prova de *succinct* quando sua complexidade temporal é sublinear.

[^38]: Allegedly a quote by William Gibson, see [here](https://www.nytimes.com/2012/01/15/books/review/distrust-that-particular-flavor-by-william-gibson-book-review.html).

[^38]: Supostamente uma citação de William Gibson, veja [aqui](https://www.nytimes.com/2012/01/15/books/review/distrust-that-particular-flavor-by-william-gibson-book-review.html).

[^39]: With many new versions being developed, like [Aztec](https://aztec.network/) and [Railgun](https://railgun.org/). [Tornado Cash (archive)](https://web.archive.org/web/20220808144431/https://tornado.cash/) works quite differently from [Zcash](https://z.cash), acting more as a mixer. Tornado Cash was also recently [sanctioned](https://en.wikipedia.org/wiki/Tornado_Cash) by the US government. As of this writing there are still a lot of unknowns about this case, but it was a [controversial](https://www.eff.org/deeplinks/2022/08/code-speech-and-tornado-cash-mixer) event that lead to [lawsuits](https://www.coincenter.org/coin-center-is-suing-ofac-over-its-tornado-cash-sanction/]). Some see this as a sequel to the [Crypto Wars](https://en.wikipedia.org/wiki/Crypto_Wars) in the 1990s. There are other alternatives like [Monero](https://www.getmonero.org/) and [Wasabi Wallet](https://wasabiwallet.io/), that are not based on ZKP but have similar design goals. Read more about the [Case for Electronic Cash](https://www.coincenter.org/app/uploads/2020/05/the-case-for-electronic-cash-coin-center.pdf) by Coin Center.

[^39]: Com o desenvolvimento de várias novas versões, como [Aztec](https://aztec.network/) e [Railgun](https://railgun.org/). O [Tornado Cash (arquivo)](https://web.archive.org/web/20220808144431/https://tornado.cash/) funciona de forma bem diferente do [Zcash](https://z.cash), atuando mais como um mixer. O Tornado Cash foi recentemente [sancionado](https://en.wikipedia.org/wiki/Tornado_Cash) pelo governo dos EUA. No momento em que este texto é escrito, ainda há muitas incertezas sobre o caso, mas foi um evento [controverso](https://www.eff.org/deeplinks/2022/08/code-speech-and-tornado-cash-mixer) que levou a [processos judiciais](https://www.coincenter.org/coin-center-is-suing-ofac-over-its-tornado-cash-sanction/]). Alguns veem isso como uma continuação das [Guerras Cripto](https://en.wikipedia.org/wiki/Crypto_Wars) dos anos 1990. Existem outras alternativas como [Monero](https://www.getmonero.org/) e [Wasabi Wallet](https://wasabiwallet.io/), que não são baseadas em ZKP, mas têm objetivos de design semelhantes. Leia mais sobre o [Caso do Dinheiro Eletrônico](https://www.coincenter.org/app/uploads/2020/05/the-case-for-electronic-cash-coin-center.pdf) do Coin Center.

[^40]: See [Semaphore](https://semaphore.appliedzkp.org) by the [Privacy & Scaling Explorations team](https://www.appliedzkp.org/).

[^40]: Veja o [Semaphore](https://semaphore.appliedzkp.org), desenvolvido pela equipe de [Privacy & Scaling Explorations](https://www.appliedzkp.org/).

[^41]: This is similar to how the traditional banking system works too, where there are multiple layers of settlement happening. It is just hidden from most end users. See [L2Beat](https://l2beat.com/scaling/summary) for an overview of different Layer 2 solutions, including ZK Rollups. Also see [Loopring](https://loopring.org/#/), [dYdX](https://dydx.exchange/faq). and [Starknet](https://www.starknet.io/en).

[^41]: Isso é semelhante ao funcionamento do sistema bancário tradicional, onde também ocorrem múltiplas camadas de liquidação. A diferença é que isso fica oculto da maioria dos usuários finais. Veja o [L2Beat](https://l2beat.com/scaling/summary) para uma visão geral das diferentes soluções de camada 2, incluindo os ZK Rollups. Veja também [Loopring](https://loopring.org/#/), [dYdX](https://dydx.exchange/faq) e [Starknet](https://www.starknet.io/en).

[^42]: There are different types of zkEVM, and the difference can be quite subtle. See [this post](https://vitalik.ca/general/2022/08/04/zkevm.html) by Vitalik for more on the difference. Also see [Polygon zkEVM](https://polygon.technology/polygon-zkevm), [zkSync Era](https://zksync.io/).

[^42]: Existem diferentes tipos de zkEVM, e a diferença entre eles pode ser bastante sutil. Veja [esta postagem](https://vitalik.ca/general/2022/08/04/zkevm.html) do Vitalik para entender melhor. Veja também [Polygon zkEVM](https://polygon.technology/polygon-zkevm) e [zkSync Era](https://zksync.io/).

[^43]: SNARK-unfriendly platforms or functions refer to the fact that most modern computer primitives were designed for a specific computer architecture. This architecture is very different from what is natural when writing constraints. For example, the SHA256 hash function is a typical example of a SNARK-unfriendly hash. Some people create SNARK or ZK-friendly functions, such as the [Poseidon hash function](https://www.poseidon-hash.info/), that are designed specifically to be used in ZKPs. These are much easier to implement in ZKPs, and can be 100 or more times more efficient, but they come with other trade-offs.

[^43]: Plataformas ou funções *SNARK-unfriendly* se referem ao fato de que a maioria dos primitivos computacionais modernos foi projetada para uma arquitetura computacional específica. Essa arquitetura é muito diferente do que é natural ao escrever restrições. Por exemplo, a função de hash SHA256 é um exemplo típico de um hash *SNARK-unfriendly*. Algumas pessoas criam funções *SNARK* ou *ZK-friendly*, como a [função de hash Poseidon](https://www.poseidon-hash.info/), projetada especificamente para uso em ZKPs. Elas são muito mais fáceis de implementar em ZKPs e podem ser 100 vezes mais eficientes ou mais, mas também envolvem outros trade-offs.

[^44]: Mina allows for succinct verification of the whole chain, whereas Aleo focuses more on privacy. Also see [Mina](https://minaprotocol.com/) and [Aleo](https://www.aleo.org/).

[^44]: Mina permite a verificação *succinct* de toda a cadeia, enquanto Aleo foca mais em privacidade. Veja também [Mina](https://minaprotocol.com/) e [Aleo](https://www.aleo.org/).

[^45]: In [Dark Forest](https://zkga.me/), some people write very complex bots that play the game on its own. They even form private DAOs and create smart contracts that play the game semi-autonomously.

[^45]: No [Dark Forest](https://zkga.me/), algumas pessoas criam bots extremamente complexos que jogam sozinhos. Eles chegam a formar DAOs privadas e desenvolver contratos inteligentes que jogam o jogo de forma semi-autônoma.

[^46]: Succinct Labs made [Telepathy](https://docs.telepathy.xyz/) is one such project. [zkBridge](https://zkbridge.com/) is another. There are likely many others.

[^46]: A Succinct Labs criou o [Telepathy](https://docs.telepathy.xyz/), que é um desses projetos. O [zkBridge](https://zkbridge.com/) é outro. Provavelmente existem muitos outros.

[^47]: A weird, but surprisingly accurate, statement.

[^47]: Uma afirmação estranha, mas surpreendentemente precisa.

[^48]: Proof Carrying Data by 0xPARC, is one such example. See [PCD](https://pcd.team). Also see [Sismo](https://www.sismo.io/).

[^48]: O Proof Carrying Data, da 0xPARC, é um exemplo disso. Veja [PCD](https://pcd.team). Veja também [Sismo](https://www.sismo.io/).

[^49]: We won't go into these here, but I encourage the curious reader to search the web to find out how various projects are using or thinking about using ZKPs to achieve their design goals. Example: [Unirep](https://developer.unirep.io/docs/welcome), [Interep](https://interep.link/), [RLN](https://rate-limiting-nullifier.github.io/rln-docs/), [RLNP2P](https://rlnp2p.vac.dev/), [MACI](https://privacy-scaling-explorations.github.io/maci/), [Filecoin](https://docs.filecoin.io/basics/the-blockchain/proofs/), [Stealthdrop](https://github.com/stealthdrop/stealthdrop), [ETHDos](https://ethdos.xyz/), and many more.

[^49]: Não vamos entrar nesses casos aqui, mas incentivo o leitor curioso a pesquisar na web para descobrir como diferentes projetos estão usando — ou planejando usar — ZKPs para atingir seus objetivos de design. Exemplos: [Unirep](https://developer.unirep.io/docs/welcome), [Interep](https://interep.link/), [RLN](https://rate-limiting-nullifier.github.io/rln-docs/), [RLNP2P](https://rlnp2p.vac.dev/), [MACI](https://privacy-scaling-explorations.github.io/maci/), [Filecoin](https://docs.filecoin.io/basics/the-blockchain/proofs/), [Stealthdrop](https://github.com/stealthdrop/stealthdrop), [ETHDos](https://ethdos.xyz/) e muitos outros.


[^50]: See [^42] above for more on this distinction.

[^50]: Veja a nota [^42] acima para mais detalhes sobre essa distinção.

[^51]: LLVM and WASM are compiler and toolchain technologies. Very roughly speaking, they allow you to write code in different programming languages that run in different types of environments, such as in different web browsers and on different types of computers. Understanding the specifics of these systems isn't important for our purposes, just that they allow us to write and use programs in many different environments. See [LLVM](https://en.wikipedia.org/wiki/LLVM), [WASM](https://en.wikipedia.org/wiki/WebAssembly).

[^51]: LLVM e WASM são tecnologias de compilador e cadeia de ferramentas. De forma bastante simplificada, elas permitem escrever código em diferentes linguagens de programação que funcionam em diversos tipos de ambientes, como navegadores diferentes e vários tipos de computadores. Entender os detalhes específicos desses sistemas não é essencial para o nosso propósito — basta saber que eles permitem criar e usar programas em muitos contextos distintos. Veja [LLVM](https://en.wikipedia.org/wiki/LLVM), [WASM](https://en.wikipedia.org/wiki/WebAssembly).

[^52]: See [Delphinus Labs](https://delphinuslab.com/zk-wasm/), [RISC Zero](https://www.risczero.com/), [Orochi Network](https://orochi.network/), [nil.foundation](https://orochi.network/).

[^52]: Veja [Delphinus Labs](https://delphinuslab.com/zk-wasm/), [RISC Zero](https://www.risczero.com/), [Orochi Network](https://orochi.network/) e [nil.foundation](https://orochi.network/).

[^53]: See [zk-MNIST](https://0xparc.org/blog/zk-mnist) and [EZKL](https://docs.ezkl.xyz/). There are also projects doing things like [neural networks](https://github.com/lyronctk/zator) in more modern efficient proof systems like [Nova](https://github.com/microsoft/Nova).

[^53]: Veja [zk-MNIST](https://0xparc.org/blog/zk-mnist) e [EZKL](https://docs.ezkl.xyz/). Também existem projetos que implementam coisas como [redes neurais](https://github.com/lyronctk/zator) em sistemas de prova（proof）mais modernos e eficientes como o [Nova](https://github.com/microsoft/Nova).

[^54]: See article on [fighting disinformation with ZK](https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f).

[^54]: Veja o artigo sobre [como combater desinformação com ZK](https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f).

[^55]: See [this essay](https://0xparc.org/blog/autonomous-worlds) by ludens at 0xPARC for more details on this idea.

[^55]: Veja [este ensaio](https://0xparc.org/blog/autonomous-worlds) de ludens, do 0xPARC, para mais detalhes sobre essa ideia.

[^56]: See [TLS Notary](https://tlsnotary.org)

[^56]: Veja o [TLS Notary](https://tlsnotary.org)

[^57]: See [article (archive)](https://web.archive.org/web/20170703142802/https://www.pppl.gov/news/2016/09/pppl-and-princeton-demonstrate-novel-technique-may-have-applicability-future-nuclear)

[^57]: Veja [este artigo (arquivo)](https://web.archive.org/web/20170703142802/https://www.pppl.gov/news/2016/09/pppl-and-princeton-demonstrate-novel-technique-may-have-applicability-future-nuclear)

[^58]: Unlike Zero Knowledge Proofs, which allow you to make statements about private data, [Multi-Party Computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC) generalizes this concept and allows us to do computation on shared secrets. That is, if Alice and Bob have their own secret, we can write a program that combines these two secrets in some non-trivial way, without revealing anyone's secrets. This is what we want in a negotiation setting, because we want to compare stakeholder's private information in some way to reach an acceptable compromise. Most MPCs that exist today are quite limited and inefficient, but it is an exciting area of research with a lot of potential.

[^58]: Diferente das Zero Knowledge Proofs（provas de conhecimento zero）, que permitem fazer declarações sobre dados privados, a [Computação Multi-Parte](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC) generaliza esse conceito e permite executar computações sobre segredos compartilhados. Ou seja, se Alice e Bob têm segredos próprios, é possível escrever um programa que combine esses segredos de forma não trivial, sem revelar os segredos de ninguém. Esse modelo é ideal em contextos de negociação, pois queremos comparar informações privadas dos envolvidos para chegar a um compromisso aceitável. A maioria das soluções de MPC existentes hoje é bastante limitada e ineficiente, mas trata-se de uma área de pesquisa empolgante com muito potencial.

[^59]: A familiar story: see [Sears vs Amazon](https://fortune.com/longform/sears-couldve-been-amazon/).

[^59]: Uma história familiar: veja [Sears vs Amazon](https://fortune.com/longform/sears-couldve-been-amazon/).

[^60]: Quote from a [panel at Devcon5](https://www.youtube.com/watch?v=hBupNf1igbY&t=1897s).

[^60]: Citação de um [painel na Devcon5](https://www.youtube.com/watch?v=hBupNf1igbY&t=1897s).