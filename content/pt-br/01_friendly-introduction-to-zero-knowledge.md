---
title: 'Uma Introdução Amigável ao Conhecimento Zero'
date: '2023-07-17'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "/pt-br/friendly-introduction-to-zero-knowledge"
images: ['../assets/01_zkp-magic.png']
summary: "As Provas de Conhecimento Zero (ZKPs) são mágicas. Elas nos permitem fazer coisas que não podíamos sonhar antes. Esta é a primeira de uma série de postagens sobre Provas de Conhecimento Zero e sua aplicação. Nela, veremos o que são as Provas de Conhecimento Zero, por que você deve se importar, como elas funcionam e onde podem ser usadas."
translator: 'Thiago Rocha Duarte'
---

![Magia do ZKP](../assets/01_zkp-magic.png 'Magia do ZKP')

## Introdução

As Provas de Conhecimento Zero (ZKPs) são mágicas. Elas nos permitem fazer coisas que não podíamos sonhar antes.

Deixe-me começar com algumas citações para aguçar sua mente. Algumas podem ser familiares, enquanto outras podem ser novas para você.

> Qualquer tecnologia suficientemente avançada é indistinguível de magia.
>
> - Arthur C. Clarke

> A civilização avança ao aumentar o número de operações que conseguimos realizar sem pensar nelas.
>
> - Alfred North Whitehead

> Fiz isto mais longo do que o habitual, apenas porque não tive tempo de fazê-lo mais curto.
>
> - Blaise Pascal

> Privacidade é o poder de se revelar seletivamente ao mundo.
>
> - A Cypherpunk's Manifesto

> O futuro já está aqui. Só não está uniformemente distribuído ainda.
>
> - William Gibson

Tecnologia mágica, avanço da civilização, cartas curtas, privacidade e um futuro que já está aqui. Isso é o que são as Provas de Conhecimento Zero (ZKPs) em poucas palavras. O que está acontecendo?

No último século, computadores e a Internet dominaram o mundo. Essas tecnologias estão em toda parte, em tudo o que fazemos, para o bem ou para o mal. Por cima delas, construímos plataformas, empresas, impérios. São coisas como suas MAMAA (Microsoft, Apple, Meta, Alphabet, Amazon). Depois, há o cerne da questão - suas redes de pagamento, serviços governamentais e a infinidade de aplicações B2B que silenciosamente comandam o mundo. Finalmente, há uma longa cauda de outras coisas - seu aplicativo fofo de filtro de imagem, plataforma de aprendizado de idiomas ou comunidade online.

Você espera alcançar um objetivo específico ao inserir dados em mais um serviço online. Pode ser um objetivo pequeno, como falar com um amigo, distrair-se do trabalho, ou algo grande como solicitar uma hipoteca. Mas o que acontece com todos esses dados? Isso inclui os dados que você conhece conscientemente e o iceberg de dados ocultos dos quais você não tem conhecimento. O que você está tentando alcançar realmente acontecerá, ou haverá algum problema, seja imediatamente ou daqui a um ano?

Quem realmente entende esses sistemas e as consequências de como os usamos? E como eles, por sua vez, nos usam? Embora algumas pessoas possam entender alguns sistemas melhor do que outras, ninguém entende todos eles, e menos ainda como eles interagem para criar consequências imprevistas.

O que um humano deve fazer? Confiar. Mas em quem você confia? E por quê?

Este é um problema difícil. Nossos cérebros humanos não evoluíram para pensar sobre isso. A Internet, por melhor que seja em nos conectar e facilitar as coisas, criou uma certa bagunça nesse aspecto. No passado, quando você tinha uma conversa privada com alguém, o vento levava os sons que você fazia. Quando você estava trancado fora de sua casa, você podia chamar um chaveiro ou arrombar a fechadura. Com quem você fala quando está impedido de acessar sua conta do Google e encara uma tela de "Acesso negado"? Com ninguém, você está diante de um castelo invisível e impenetrável.

ZKPs podem ajudar. Talvez não para tudo, em todo lugar, ou neste exato momento. Mas se aplica a inúmeras coisas, em vários lugares, e cada vez mais. No restante deste artigo, tentarei convencê-lo do porquê e como. Vamos seguir a magia.

## O que é uma Prova de Conhecimento Zero?

_Esta seção introduz a noção de uma Prova de Conhecimento Zero_

Esta é a primeira de uma série de postagens sobre Provas de Conhecimento Zero e sua aplicação. Veremos o que são as Provas de Conhecimento Zero, por que você deveria se importar, como elas funcionam e onde podem ser usadas.

Imagine que você vai a um bar e pode provar que tem mais de 18 anos sem revelar mais nada, incluindo sua identidade com informações pessoais. Ou você pode provar que pagou seus impostos corretamente, sem revelar os detalhes de sua renda ou bens a ninguém. Esses são os tipos de coisas que as Provas de Conhecimento Zero (ZKPs) possibilitam. O termo _conhecimento zero (zero knowledge)_ simplesmente significa que não revelamos nenhuma informação além do que é pretendido.

ZKPs permitem que você prove algo sem revelar nada além do fato de que a declaração é verdadeira.

O que isso significa? Vamos pegar o exemplo clássico de "Onde está o Wally?". O jogo consiste em encontrar o Wally em uma imagem grande. Posso provar a você que sei onde o Wally está sem revelar a localização do Wally. Como?

Imagine que tenho uma imagem de "Onde está o Wally?" e um grande pedaço de papel quatro vezes maior que essa imagem. Faço um pequeno buraco no papel e coloco este papel na frente da imagem de "Onde está o Wally?", posicionando-o cuidadosamente para que o Wally fique visível através do buraco. Isso significa que você pode ver o Wally, mas apenas o Wally e mais nada. Assim, você sabe que eu sei onde o Wally está, mas eu não revelei nada sobre onde o Wally está realmente localizado na imagem.

![Where's Waldo](../assets/01_waldo.jpg "Onde está o Wally?")

Este é obviamente um exemplo lúdico, mas espero que dê alguma intuição de como tal prova é possível. Mas o que isso significa? O que estamos provando mais precisamente? Vamos nos aprofundar nisso mais adiante, mas por enquanto vamos ver o que os ZKPs nos oferecem de forma mais geral.

Com ZKPs, você pode provar declarações (statements) arbitrárias de forma generalista. Mais especificamente, os ZKPs nos permitem provar algo de forma privada e sucinta.

Isso é extremamente poderoso, como veremos a seguir.

## Por que você deveria se importar?

_Esta seção explica por que alguém pode se importar com ZKPs, incluindo detalhes sobre privacidade, compressão e a natureza de propósito geral dos ZKPs_

Lendo a seção acima, você pode pensar: "ok, isso é até meio legal, mas por que eu deveria me importar?". Essa é uma perspectiva completamente razoável. Na verdade, você provavelmente não deveria! Assim como você não deveria se importar com como os computadores funcionam, para onde a IA está indo, ou qualquer uma dessas coisas.

Por que _você poderia se importar_? Porque você é curioso e quer entender como os ZKPs funcionam e que tipo de interações eles desbloqueiam. O mecanismo é muito geral, e a intuição para muitas pessoas que trabalham na área é que se trata fundamentalmente de um novo paradigma que desbloqueia muitas coisas novas. Já estamos vendo isso, e parece que estamos apenas no começo. No restante desta seção, darei a você alguma intuição sobre o porquê e como.

Antes de aprofundar, vamos entender o que os ZKPs nos oferecem em um nível superior. Os ZKPs nos fornecem principalmente uma ou ambas as seguintes propriedades:

1. Privacidade (mais formalmente conhecida como conhecimento zero)
2. Compressão (mais formalmente conhecida como _succinctness_)

O que queremos dizer com essas duas noções? Aqui estão algumas maneiras de pensar sobre essas propriedades.

### Privacidade

Há muitas coisas que queremos manter privadas. Aqui está a definição de "privado" no Dicionário Oxford:

> pertencente ou para uso de uma pessoa ou grupo de pessoas em particular.

Temos conversas privadas, banheiros privados, partes íntimas. Segredos comerciais, informações pessoais sensíveis, na privacidade de sua própria casa. Chaves, portas e fechaduras.

Privacidade é normal e está ao nosso redor. Ela está intimamente relacionada às noções de auto-soberania, autodeterminação e independência. Essas noções nos são tão naturais que muitos documentos importantes, como a _Declaração de Direitos dos EUA_ e a _Carta das Nações Unidas_, as reconhecem como direitos fundamentais para indivíduos e nações, respectivamente. [^1] A privacidade é um pré-requisito para a liberdade.

Mais formalmente, a propriedade de privacidade (privacy) em ZKPs é frequentemente chamada de _conhecimento zero (zero-knowledge)_ ou _ocultação de dados_ [^2]. Um ZKP oculta dados que são irrelevantes para o funcionamento de alguma aplicação, e esses dados são então _ligados (bound)_ juntamente com os dados relevantes da aplicação. Essas noções são um pouco mais formais e possibilitam a privacidade. Privacidade é um conceito mais amplo e de aplicação mais geral, então continuaremos focando nele por enquanto.

No mundo digital, também conhecido como ciberespaço, em oposição ao espaço físico, a privacidade também é essencial, mas frequentemente negligenciada. Aqui está a definição de privacidade dada em _A Cypherpunk's Manifesto_:

> Privacidade é o poder de se revelar seletivamente ao mundo.
>
> - A Cypherpunk's Manifesto [^3]

Conversas, senhas, informações de cartão de crédito. Esses são exemplos de coisas que queremos manter privadas online. A Internet é uma ferramenta fantástica que nos conecta a todos, mas também é um mar aberto e selvagem. Há muitos estranhos e predadores, e manter certas informações privadas é vital. Sem isso, coisas como compras online ou mensagens privadas seriam impossíveis.

Você pode pensar, "Já conseguimos manter coisas como senhas privadas, qual é o grande problema?". Em um sentido limitado, você está correto para esses exemplos específicos. Teremos que usar mais imaginação para realmente entender o que a privacidade programável de propósito geral possibilita.

Como um exemplo, considere como Agostinho, em suas _Confissões (400 d.C.)_, achou o ato de "leitura silenciosa" de Santo Ambrósio, um bispo, incomum. Naquela época, a maioria das pessoas lia em voz alta. [^4]

> Quando [Ambrósio] lia, seus olhos examinavam a página e seu coração buscava o significado, mas sua voz estava em silêncio e sua língua estava imóvel. Qualquer um podia se aproximar dele livremente e os convidados não eram comumente anunciados, de modo que muitas vezes, quando o visitávamos, o encontrávamos lendo assim em silêncio, pois ele nunca lia em voz alta.

![Silent reading](../assets/01_silent-reading.jpg 'Leitura silenciosa')

Hoje em dia, todos consideram a leitura silenciosa algo natural. É até difícil imaginar que ela precisou ser inventada. A ideia de que o que você lê era algo apenas para seus olhos costumava ser estranha. Que outras invenções semelhantes são possíveis em nossa era moderna? Coisas que a maioria de nós atualmente não consegue imaginar.

Nas próximas seções, teremos um vislumbre de como são essas invenções usando ZKPs, tanto as existentes quanto as futuras.

### Compressão

> Fiz isto mais longo do que o habitual, apenas porque não tive tempo de fazê-lo mais curto.
>
> - Blaise Pascal [^5]

Comprimir algo é definido como:

> pressionar algo para caber em um espaço menor

De forma semelhante, _succinctness_ (concisão) é definida como:

> o ato de expressar algo de forma clara com poucas palavras

ZKPs com a propriedade de compressão significam que podemos provar que algo é verdadeiro com uma declaração（statement）muito curta. Por exemplo, que todas as etapas de um determinado cálculo foram executadas corretamente. Isso é especialmente útil quando algum recurso está em alta demanda e é caro. É o caso da blockchain da Ethereum, mas essa também é uma propriedade útil em diversos outros contextos. O mais impressionante é que o tamanho dessa prova（proof）permanece o mesmo, não importa o quão complexo seja o que estamos tentando provar!

O que queremos dizer com “prova” e “tamanho da prova”? Esses são conceitos matematicamente bem definidos e cheios de nuances. Em seções futuras, vamos aprofundar essa noção de prova no contexto dos ZKPs. Por enquanto, podemos pensar nisso como uma declaração curta que sabemos que é verdadeira — ou que conseguimos verificar de alguma forma.

![Sherlock Holmes](../assets/01_sherlock-holmes.jpg 'Sherlock Holmes')

Em um típico mistério de assassinato como os de Sherlock Holmes, o detetive reúne evidências até poder provar que o culpado cometeu o crime. Ele então mostra exatamente como sabe disso no _grand finale_. Podemos pensar nessa declaração final como a prova. [^6]

Mais formalmente, chamamos essa propriedade de _succinctness_（concisão）[^7]. É isso que mantém o tamanho da prova constante, independentemente do que estamos tentando provar. No contexto de blockchains públicas, isso também está ligado à ideia de _escalabilidade_. Em blockchains públicas como a Ethereum, onde o espaço em bloco é limitado e caro, os ZKPs podem tornar as transações muito mais baratas e rápidas. Como? Criamos uma prova de que um conjunto de transações ocorreu e colocamos essa pequena prova na blockchain, em vez de registrar cada transação individualmente. Com ZKPs, isso pode ser feito de forma muito segura.

_Succinctness_ é uma propriedade geral e independente de “blockchains” — elas apenas acabam sendo uma boa combinação, por vários motivos. De forma mais ampla, ter uma prova curta de que algo é verdadeiro é extremamente útil. Existem algumas maneiras de entender o porquê.

Uma maneira de ver isso é considerar os _custos de transação_ [^8]. Em geral, quanto menores esses custos, mais valor e riqueza são gerados. Se há menos coisas para verificar, ou se o processo é mais fácil, então conseguimos fazer mais com maior liberdade e fluidez.

Às vezes, ao preencher um formulário, somos solicitados a digitar nosso e-mail duas vezes para garantir que está correto. A ideia é proteger contra erros humanos e tornar a transmissão de dados mais robusta. Existem também mecanismos como _checksums_, onde um dígito extra em códigos de rastreio, cartões de crédito ou ISBNs serve como verificação simples de que os números provavelmente estão certos. Todos esses mecanismos — obviamente — não têm como objetivo impedir usos maliciosos, mas sim evitar erros inocentes. [^9]

Em sistemas de arquivos de computador, um _hash_ é frequentemente usado para garantir a integridade dos arquivos. Se algo acontece com uma parte do arquivo, corrompendo-o, o hash muda completamente. Como o hash é sucinto (por exemplo, uma string de 64 caracteres), é fácil de armazenar e verificar, mesmo que o arquivo original seja enorme. Nesse caso, as funções de hash garantem a integridade de forma segura. Se fôssemos verificar a integridade mantendo uma cópia completa do arquivo, isso seria muito mais impraticável. Arquivo grande, arquivo pequeno — não importa; o hash continua do mesmo tamanho. A _succinctness_ de um hash torna esse caso de uso possível.

### O que você sabe?

Vamos dar um passo atrás em relação à compressão, à _succinctness_ e às provas. Vamos fazer um pequeno desvio para falar sobre conhecimento, carga mental e confiança. Depois, vamos conectar tudo isso aos ZKPs no final da seção.

No seu dia a dia, o que você sabe que é verdade, e por quê? Se você vê o sol nascer todos os dias, provavelmente espera que ele vá nascer de novo amanhã. No mundo moderno, estamos amplamente protegidos dos ambientes hostis da natureza, mas, por outro lado, lidamos com muitas outras preocupações — mais modernas. Muitas delas estão relacionadas às instituições com as quais interagimos diariamente.

Se você consegue sacar dinheiro do banco todos os dias, espera conseguir fazer isso de novo no dia seguinte? A maioria das pessoas provavelmente diria que sim — mas não todo mundo, nem o tempo todo. Isso depende de muitos fatores: se o banco é confiável, se você vive em uma jurisdição segura, se houve algum evento importante na economia global recentemente, como está sua situação pessoal, etc. Todos esses elementos funcionam como pontos de dados, e com base neles você toma uma decisão.

Esse é obviamente um exemplo trivial, mas a vida está cheia de interações desse tipo. Tudo isso pode ser visto como uma forma de carga mental. O quanto isso te afeta depende da sua situação pessoal e da complexidade do seu cotidiano. Por exemplo, uma empresa pode considerar todos esses fatores com muito mais atenção ao firmar um contrato com outra parte.

Criamos mecanismos e regras para lidar com essa incerteza, como serviços de reputação, auditorias independentes, multas para desincentivar comportamentos ruins, busca por certificações de instituições confiáveis, etc. Todas essas medidas são como fita adesiva, tentando resolver o problema principal. Algo é realmente o que diz ser? Segue as regras que estabelecemos? É confiável e utilizável?

Essa carga mental se multiplica quando você lida com várias instituições, jurisdições, empresas e pessoas. Os efeitos podem ser em cascata: seu banco quebra, você não consegue pagar seus funcionários, e sua empresa não consegue atender os clientes [^10]. Isso exige mais medidas de controle. Mais momentos de pausa para refletir se tudo está certo — e o que pode dar errado.

Vou encerrar esta seção com uma citação:

> A civilização avança ao aumentar o número de operações que conseguimos realizar sem pensar nelas.
>
> - Alfred North Whitehead [^11]

Por exemplo, ao acender o fogão para fazer o jantar, você nem precisa pensar em fazer fogo. Isso é bem diferente de ter que catar lenha, mantê-la seca, acender e manter o fogo aceso — um processo demorado. Em matemática, sem o cálculo, não teríamos chegado à Lua.

![Aldrin, Apollo 11](../assets/01_apollo-aldrin.jpg 'Aldrin, Apollo 11')

Com ZKPs e provas sucintas (_succinct proofs_), conseguimos trazer mais certeza e clareza a sistemas opacos. Isso se torna ainda mais poderoso quando consideramos a *composição* de ZKPs — ou seja, combinar múltiplas provas em uma só, por meio de agregação ou recursão, por exemplo.

Tudo isso parte do princípio de que conseguimos traduzir alguns dos mecanismos ou regras citados acima — que muitas vezes são confusos e inconsistentes — para uma forma que os ZKPs consigam compreender. Como podemos fazer isso?

### Propósito geral

Lembre-se de que os ZKPs permitem provar declarações（statements）arbitrárias de forma genérica. Por que isso importa e por que isso é poderoso?

A diferença entre ferramentas similares já existentes e os ZKPs é como a diferença entre uma calculadora e um computador. Uma serve para tarefas bem específicas, enquanto a outra tem propósito geral. É a diferença entre esta máquina de calcular [^12] e um computador moderno:

![Calculadora de Pascal](../assets/01_pascals-calculator2.jpg "Calculadora de Pascal")

Relembre os exemplos específicos que demos acima para representar de forma concreta a privacidade e a *succinctness*. Uma senha é uma informação privada que permite fazer login em um serviço [^13]. Já um hash de algum dado de entrada, como um arquivo, nos oferece algo sucinto para verificar igualdade.

Podemos visualizar uma função de hash da seguinte forma:

![Função de hash](../assets/01_graphviz-hash.png 'Função de hash')

Aplicamos uma função de hash específica, como a SHA256 [^14], em algum dado de entrada conhecido. Por exemplo, usar a frase "A rápida raposa marrom pula sobre o cachorro preguiçoso" (sem aspas) como entrada e aplicar SHA256 resulta no hash `00296116c7a8aca0e95a928b38a871a6c4d13b5fa28f436a5eef8205a46756d1`. Adicionar um "." no final da frase gera um hash completamente diferente: "A rápida raposa marrom pula sobre o cachorro preguiçoso." gera `c8be62e59f566c2a1193d48a41c5c46530776ac4b86c6c5d45b82177378086aa`.

Mesmo que a frase mude muito pouco, os hashes resultantes são totalmente diferentes [^15]. Funções de hash seguras são difíceis de "quebrar" e possuem propriedades interessantes. Por exemplo, se você tem o valor do hash, não consegue reconstruir a entrada original. Também não é fácil construir uma mensagem que gere um hash específico e predeterminado. Essas funções são chamadas de _funções de hash criptográficas_. [^16]

A função SHA256 que usamos acima é uma função de hash criptográfica específica, que levou muito tempo e esforço coletivo para ser considerada segura. O hash, por si só, não prova nada. Ele só faz sentido quando comparado com alguma outra coisa, como ter acesso direto à mensagem ou ao arquivo.

De forma informal, podemos pensar em uma função de hash como algo que oferece uma prova（proof）de que uma determinada mensagem corresponde a um hash específico. Só conseguimos verificar isso com a mensagem original. Às vezes, as pessoas usam isso para provar que escreveram algo e fizeram uma previsão — elas escrevem, por exemplo: "Em 1º de abril de 2040, alienígenas pousarão no Big Ben, em Londres, e o número da loteria 25742069 será o vencedor", e então publicam o hash dessa mensagem com antecedência, digamos, no Twitter. Quando a previsão se concretiza, elas revelam a mensagem original, e as pessoas ficam convencidas de que previram o futuro, e são o novo Nostradamus.

Por outro lado, podemos visualizar um ZKP assim:

![ZKP](../assets/01_graphviz-zkp.png 'ZKP')

Diferente da função de hash acima, há algumas diferenças importantes:

- Temos várias entradas públicas e privadas, em vez de apenas uma entrada (pública)
- Podemos usar qualquer programa, não apenas uma função de hash criptográfica
- Produzimos uma prova（proof）autônoma que pode ser verificada

No exemplo da função de hash, precisamos tornar a entrada pública para verificar que a mensagem corresponde ao hash. Já nos ZKPs, podemos ter uma entrada privada _(private input)_. Entrada privada é algo que só você vê. Ou seja, não precisa revelar nada a ninguém para gerar uma prova（proof）.

Por exemplo, no caso do "Onde Está o Wally" mencionado no início deste artigo, a entrada pública seria a imagem do Wally. A entrada privada seria a localização exata do Wally. Eu posso gerar uma prova de que sei onde ele está sem revelar a localização para você.

Da mesma forma, se eu tiver um Sudoku (um quebra-cabeça popular), posso provar que conheço a solução sem revelá-la para você. Neste caso, a entrada pública é o quebra-cabeça inicial, e a entrada privada é a solução.

Você deve ter notado que encontrar o Wally e resolver um Sudoku são problemas bem diferentes. Mesmo assim, podemos escrever um programa simples que represente qualquer um deles e gere uma prova usando ZKP. Isso porque a lógica desse tipo de programa é de propósito geral — e pode computar qualquer coisa que um computador consegue.

Transformamos o que antes era um problema de criptografia ou matemática — definir e tornar uma função de hash criptográfica segura — em um problema de programação. Para entender por que isso é tão poderoso, veja alguns exemplos a seguir.

Agora podemos provar que conhecemos os dados privados que resultam em um hash específico [^17]. Isso significa que é possível provar que você possui determinada mensagem, como um documento importante, sem revelar o conteúdo.

Para entender melhor o poder da computação de propósito geral (_general-purpose computing_), vamos observar o conceito de assinatura em grupo. Assinaturas em grupo permitem que várias pessoas assinem um documento sem revelar suas identidades. Por exemplo, os *Federalist Papers* foram assinados com o pseudônimo "Publius", que representava vários autores [^18]. Assim como no caso do SHA256, é possível implementar assinaturas em grupo com criptografia e matemática — o que é impressionante, e exige bastante engenharia criptográfica. Mas com ZKPs de propósito geral, qualquer pessoa pode expressar isso em poucas dezenas de linhas de código em Circom, uma linguagem para ZKPs [^19].

Graças à sua natureza genérica, podemos construir soluções ad hoc com facilidade. Por exemplo, imagine que você tem um documento de identidade com seu nome completo, endereço e outras informações pessoais. Para entrar em um evento, é necessário ter mais de 18 anos e um ingresso válido. Você pode não querer que qualquer pessoa ou sistema online veja seu endereço ou corra o risco de ter seu documento roubado. Com ZKPs, você pode provar que:

- Você possui um documento de identidade válido
- O documento foi emitido por uma instituição aprovada nos últimos 5 anos
- O documento não foi revogado nem está registrado como roubado
- Você tem mais de 18 anos
- Você pagou por um ingresso válido para o evento
- O ingresso ainda não foi utilizado

Tudo isso sem revelar nenhum outro dado pessoal além do que está listado acima.

Com os ZKPs, agora temos uma _ferramenta melhor_ para que as pessoas se coordenem de várias formas — especialmente em sistemas onde a _privacidade_ e a _succinctness_ são importantes. Veremos mais exemplos na seção de aplicações.

Na maioria das vezes, o único limite para o que você pode expressar é sua imaginação.

### Por que agora?

Por que os ZKPs estão ganhando destaque agora? Existem razões tanto técnicas quanto sociais para isso.

Tecnicamente, os ZKPs são relativamente novos. Do ponto de vista matemático, eles existem há apenas algumas décadas [^20]. Assim como a computação, levou um tempo até se tornarem eficientes e práticos — mesmo que apenas na teoria [^21].

Depois disso, alguém precisou pegar esses artigos e protocolos criptográficos e transformá-los em algo prático. O primeiro exemplo notável disso foi o Zcash, a criptomoeda focada em privacidade, lançada em 2016. Ela nasceu a partir de um artigo escrito por cypherpunks e pesquisadores [^22]. A primeira versão foi uma conquista impressionante de pesquisa e engenharia aplicada a um produto e sistema final. Apesar de apresentar muitos problemas e estar longe do ideal, foi o primeiro exemplo prático real do uso de ZKPs no mundo real. Isso mostrou que era possível e viável usar ZKPs de forma concreta, o que levou a uma explosão de esforços em pesquisa e engenharia na área, especialmente nos últimos anos.

Blockchains públicas como Ethereum e Zcash, essa última uma criptomoeda com foco em privacidade, tiveram um papel fundamental nesse processo. As blockchains se destacam em aspectos como resistência à censura e transparência [^23], mas isso vem ao custo de pouca privacidade e escalabilidade — pontos em que os ZKPs se sobressaem. Nesse sentido, ZKPs e blockchains formam uma combinação natural. Somado a isso, há o grande apetite da comunidade de blockchain por criptografia avançada [^24], o que explica por que tanta inovação está surgindo justamente na interseção entre blockchain e ZKPs [^25]. Com tantos projetos bem financiados no ecossistema, também houve um aumento significativo de investimentos em pesquisa e engenharia — áreas que antes eram mais restritas ao meio acadêmico.

Considerando toda a complexidade envolvida — desde matemática aplicada e criptografia até artigos sobre sistemas específicos de ZKP, implementação de novos sistemas de prova, ferramentas e aplicações que envolvem outros domínios igualmente complexos — o avanço tem sido extremamente rápido. Todo ano, e até mesmo todo mês, surgem novos artigos com técnicas inovadoras, ferramentas aprimoradas e novas aplicações. O ciclo entre pesquisa, implementação e uso está cada vez mais curto. Apesar de ainda ser desafiador, está ficando cada vez mais fácil começar. Com a melhoria das ferramentas, os desenvolvedores precisam entender cada vez menos da matemática por trás dos ZKPs.

Em termos de desempenho, os ZKPs estão passando por uma espécie de Lei de Moore. A Lei de Moore observa que o número de transistores dobra aproximadamente a cada dois anos — e isso impulsionou a revolução dos computadores. No mundo dos ZKPs, projetos que até poucos anos atrás pareciam impossíveis — como _zkVM_ e _zkML_ — agora estão se tornando realidade. De forma geral, tem-se observado que o progresso nos ZKPs melhora em uma ordem de magnitude a cada dois anos, aproximadamente [^26]. Isso acontece porque a tecnologia é nova e ainda há muito espaço para otimização em várias camadas da stack: desde os programas que escrevemos até os sistemas e o próprio hardware. Não há motivos para acreditar que esse ritmo vá desacelerar tão cedo.

![Lei de Moore](../assets/01_moores-law.png "Lei de Moore")

## Como funciona?

_Esta seção explica como funcionam as Zero Knowledge Proofs em um nível conceitual_

Esta seção oferece uma visão geral de alto nível sobre como os ZKPs funcionam. Não haverá matemática nem código.

### Conceitos básicos

Vamos começar apresentando algumas terminologias. Haverá alguns termos novos para aprender, mas com o tempo você vai se acostumar.

- **Protocolo**: conjunto de regras que define a conduta correta a ser seguida
- **Prova (proof)**: argumento que estabelece a veracidade de uma declaração
- **Provador (prover)**: quem demonstra ou comprova algo
- **Verificador (verifier)**: quem confirma a veracidade de uma declaração
- **Entrada privada**: dado que apenas o provador pode ver, geralmente chamado de **testemunha (witness)**
- **Entrada pública**: dado visível tanto para o provador quanto para o verificador, geralmente chamado de **instância**

Embora seja útil conhecer a terminologia da área, algumas metáforas ajudam a entender melhor o que está acontecendo. Vamos apresentar mais termos ao longo do caminho.

Protocolos estão por toda parte e podem ser implícitos ou explícitos. No jogo de xadrez, o protocolo é que dois jogadores alternam jogadas seguindo as regras até o jogo acabar com vitória de um ou empate. Em teoria, o tempo de cada jogada não importa, mas na prática tentamos minimizar os custos de comunicação entre os dois lados. Podemos pensar nisso como um jogo de xadrez jogado em alta velocidade.

Podemos imaginar Sherlock Holmes como o provador e, em sua declaração final, ele apresenta uma série de argumentos elegantes — uma prova de que alguém é o assassino. Essa prova precisa ser verificada por um verificador, como um juiz ou júri, _além de qualquer dúvida razoável_ [^27]. O termo "provador" refere-se à entidade — aqui, Holmes — que constrói a prova, que então será verificada. Como a prova é autocontida, qualquer pessoa pode ser um verificador — inclusive você, leitor, que deve se convencer do raciocínio para que a história faça sentido [^28].

A entrada privada seria algum conhecimento que só Sherlock Holmes possui — por exemplo, uma informação secreta que alguém sussurrou para ele. Esse dado é chamado de testemunha, provavelmente em referência à testemunha em um tribunal, que possui informações privadas que se somam às evidências. No caso dos ZKPs, essa informação privada não seria compartilhada com o verificador — ou seja, o juiz e o júri, neste exemplo.

ZKPs estabelecem um _protocolo_ entre um _provador_ e um _verificador_. Esse protocolo é _não interativo_ quando o provador e o verificador não precisam se comunicar diretamente — como em um jogo de xadrez ou numa dança coreografada. Em vez disso, o provador gera uma única prova autônoma, que será verificada mais tarde. A maioria dos ZKPs começa como _interativa_ — ou seja, requer múltiplas trocas entre as partes — e depois usamos truques matemáticos para torná-los não interativos [^29]. Você pode pensar na não interatividade como dois jogadores de xadrez que, após trocar poucas palavras, já sabem todos os movimentos um do outro, e por isso nem precisam jogar, pois já sabem como o jogo termina.

Existem vários tipos de ZKPs. Frequentemente falamos sobre *zk-SNARKs*, que significa *Zero Knowledge Succinct Non-Interactive ARguments of Knowledge*. "Zero Knowledge" e "Succinct" correspondem, respectivamente, à privacidade e à compressão mencionadas anteriormente. Já falamos sobre a não interatividade. "ARguments of knowledge" é basicamente a mesma coisa que uma prova [^30]. Também existem diferentes tipos de zk-SNARKs.

Um bom modelo mental é imaginar os ZKPs como um zoológico. Há muitos animais por lá, e podemos classificá-los de várias formas: esses animais têm quatro patas, aqueles têm listras, o Bob trouxe estes no ano passado [^31], etc. Algumas categorias são mais úteis que outras. Na verdade, alguns desses sistemas nem possuem a propriedade de *Zero Knowledge*! Esses geralmente são chamados apenas de SNARKs. Como comunidade, muitas vezes chamamos esse zoológico de sistemas diferentes simplesmente de ZK — mesmo que vários deles não utilizem, de fato, a propriedade de conhecimento zero [^32].

### Protocolo

Voltando ao nosso protocolo, temos um provador e um verificador. O provador cria uma prova usando uma _chave do provador (prover key)_, uma entrada privada e uma entrada pública. O verificador verifica a prova usando uma _chave de verificação (verifier key)_ e a entrada pública, e retorna verdadeiro ou falso.

Temos dois elementos novos: a chave do provador e a chave de verificação (ou chave do verificador). Elas são o que permite ao provador e ao verificador fazerem sua mágica. Você pode pensar nelas como uma chave comum que te permite entrar em algum lugar e realizar uma ação — ou como uma varinha mágica. Obtemos essas chaves a partir de uma cerimônia especial chamada _setup (configuração confiável)_, que é uma fase inicial de preparação que não será detalhada neste artigo [^33].

Repare que apenas o provador tem acesso à entrada privada. Como ele usa a chave do provador, a entrada privada e a entrada pública para gerar uma prova?

Relembre a ilustração de um ZKP que vimos anteriormente:

![ZKP](../assets/01_graphviz-zkp.png 'ZKP')

Temos um programa especial (formalmente chamado de _circuito_) que codifica a lógica de interesse do usuário. Por exemplo, provar que ele conhece os dados que geram um determinado valor de hash. Diferente de um programa comum, esse é composto por _restrições (constraints)_ [^34]. A prova mostra que todas essas restrições são satisfeitas com as entradas pública e privada.

Por fim, o verificador pega essa prova compacta, combina com a chave de verificação, a entrada pública e o programa especial com todas as restrições, e se convence, além de qualquer dúvida razoável, de que a prova está correta e retorna “verdadeiro”. Caso contrário, retorna “falso”.

Essa é uma visão um pouco simplificada, mas captura a essência do que está acontecendo.

### Restrições

O que são essas restrições que compõem o programa especial? Uma _restrição (constraint)_ é uma limitação ou condição. Por exemplo, "um número entre 1 e 9" é uma restrição. O número 7 satisfaz essa restrição, enquanto o número 11 não. Como transformamos um programa em um conjunto de restrições? Isso é uma arte por si só, mas vamos começar com um exemplo simples: Sudoku.

No jogo de Sudoku, o objetivo é encontrar uma solução para o tabuleiro que satisfaça determinadas restrições. Cada linha deve conter os números de 1 a 9, mas apenas uma vez. O mesmo vale para cada coluna e cada subquadrado 3x3. Recebemos uma configuração inicial, e o desafio é preencher o restante de forma que todas essas restrições sejam respeitadas. O difícil é encontrar números que satisfaçam todas as restrições ao mesmo tempo.

![Sudoku](../assets/01_sudoku.png 'Desafio de Sudoku')

Com ZKPs, o provador pode construir uma prova de que conhece a solução de um determinado quebra-cabeça. Nesse caso, a prova é construída usando uma entrada pública — a configuração inicial do tabuleiro — e uma entrada privada — a solução do quebra-cabeça — além de um circuito. Esse circuito é composto por todas as restrições que definem o quebra-cabeça.

Chamamos isso de circuito porque as restrições se conectam entre si, como os componentes de um circuito elétrico. Mas nesse caso o circuito não conduz corrente elétrica, e sim valores. Por exemplo, não podemos inserir algo como "banana" numa restrição de linha — o valor precisa ser numérico e estar entre 1 e 9, entre outras condições.

O verificador recebe o mesmo circuito e a entrada pública, e consegue verificar a prova enviada pelo provador. Se a prova for válida, o verificador se convence de que o provador possui uma solução para aquele quebra-cabeça específico.

Acontece que muitos problemas podem ser expressos como um conjunto de restrições. Na verdade, qualquer problema que possamos resolver com um computador pode ser representado dessa forma.

### Exemplo do Sudoku

Vamos aplicar o que aprendemos sobre as diferentes partes de um ZKP ao exemplo do Sudoku acima.

No caso do Sudoku, nosso programa especial — o circuito — recebe duas entradas:

- Um tabuleiro de Sudoku como entrada pública
- Uma solução para o Sudoku como entrada privada

O circuito é composto por um conjunto de restrições. Todas essas restrições devem ser verdadeiras. Elas são, por exemplo:

- Todos os dígitos no tabuleiro e na solução devem estar entre 1 e 9
- A solução deve manter os mesmos dígitos do tabuleiro nos locais onde eles já estão preenchidos
- Todas as linhas devem conter os dígitos de 1 a 9 exatamente uma vez
- Todas as colunas devem conter os dígitos de 1 a 9 exatamente uma vez
- Todos os subquadrados 3x3 devem conter os dígitos de 1 a 9 exatamente uma vez

Se todas essas restrições forem verdadeiras para um tabuleiro e sua solução, sabemos que a solução é válida.

A provadora Peggy usa sua chave mágica de provador (prover key), o tabuleiro e a solução, combina isso com o programa especial e cria uma prova. A prova é bem curta, com menos de 1000 caracteres. Ela é autocontida e fornece ao verificador todas as informações necessárias para validá-la. Você pode pensar nisso como um feitiço mágico que faz o que você quer — sem precisar entender os detalhes [^35].

Aqui está um feitiço de um livro de magia, escrito por um médico galês no século XIX:

![Feitiço mágico](../assets/01_magic-spell.png 'Feitiços mágicos')

Aqui está um exemplo de uma prova de conhecimento zero (Zero Knowledge Proof) gerada pela biblioteca Circom/snarkjs:

![Prova Circom](../assets/01_circom-proof.png 'Prova Circom')

Exceto que, nesse caso, a mágica realmente funciona.

Victor, o verificador, usa sua chave de verificação, a entrada pública (o tabuleiro original) e valida se a prova enviada por Peggy está correta. Se estiver, o resultado será "verdadeiro"; se não estiver, será "falso". O feitiço funciona — ou não. Com isso, Victor se convence de que Peggy conhece a solução para aquele quebra-cabeça específico, sem nunca ter visto a solução. Et voilà. [^36]

### Algumas propriedades

Dizemos que um ZKP possui certas propriedades técnicas:

- **Completude** — se a declaração for verdadeira, o verificador será convencido pela prova
- **Solidez** — se a declaração for falsa, o verificador não será convencido pela prova, exceto com uma probabilidade desprezível
- **Conhecimento zero** — se a declaração for verdadeira, nada além desse fato é revelado

Além disso, nos zk-SNARKs, a prova é *succinct*, ou seja, ela praticamente não cresce mesmo que o programa fique mais complexo [^37].

Há várias outras propriedades importantes quando falamos de ZKPs aplicáveis na prática:

- Quais suposições matemáticas o sistema está fazendo?
- Quão seguro ele é?
- Ele exige uma configuração confiável (trusted setup)?
- Quão difícil é gerar a prova? Em tempo e outros recursos
- Quão difícil é verificar a prova? Em tempo e outros recursos
- O sistema de ZKP permite agregar e combinar múltiplas provas?
- Existem boas bibliotecas desse sistema de ZKP para uso por programadores?
- Quão expressiva é a linguagem usada para escrever programas nesse sistema de ZKP?
- E assim por diante

Como você pode ver, há muitas variações e considerações possíveis nos ZKPs. Mas não se preocupe: o essencial continua o mesmo, e dependendo do seu interesse, você pode ignorar boa parte dos detalhes técnicos sem problemas. Voltando à metáfora do zoológico: assim como com os animais, talvez você não queira virar biólogo. Talvez queira trabalhar com alguns bichos, ter um de estimação — ou apenas fazer carinho no cachorro de um amigo.

## Aplicações

_Esta seção traz exemplos de aplicações atuais e futuras de ZK_

Existem muitas aplicações para ZKPs. De modo geral, ainda estamos nos estágios iniciais. Grande parte do foco está nos protocolos fundamentais e na infraestrutura, além das aplicações específicas para blockchain. Para aproveitar melhor os exemplos voltados a blockchain, é útil ter alguma noção de como funcionam blockchains públicas e os desafios envolvidos — mas isso não é obrigatório. Nesta seção, vamos explorar algumas das aplicações mais interessantes, começando pelas que já estão ativas e depois olhando para as que estão no horizonte.

> O futuro já está aqui. Só não está uniformemente distribuído ainda.
>
> - William Gibson [^38]

![Magia do ZKP](../assets/01_zkp-magic.png 'Magia do ZKP')

### Já ativas

**Dinheiro eletrônico.** Para criar um sistema de pagamento online semelhante ao dinheiro em espécie, ele precisa ser fungível e privado como o dinheiro físico. Fungibilidade significa que um item pode ser trocado por outro idêntico — ou seja, não há diferença entre o meu dinheiro e o seu. Com ZK, podemos tornar o grafo de transações privado, diferente do que acontece no Bitcoin ou Ethereum. Assim, seu histórico de transações permanece privado, garantindo a fungibilidade do dinheiro eletrônico. Isso já está ativo em sistemas como o Zcash e similares como o Tornado Cash [^39].

**Sinalização anônima.** Frequentemente, precisamos provar que pertencemos a um grupo com certas características — sem revelar nossa identidade. Um exemplo é provar que você faz parte de um determinado grupo de pessoas; outro é votar. Isso permite que você não associe sua identidade a ações sensíveis, como em quem votou, e evita expor informações desnecessárias. Essa funcionalidade já está ativa em sistemas como o Semaphore [^40], com diversas variações semelhantes.

**ZK Rollup.** Permite transações mais rápidas, baratas e em maior volume. O espaço da blockchain da Ethereum é limitado, caro e muito disputado. Com o uso de um rollup de segunda camada (Layer 2 ou L2), as transações ocorrem fora da blockchain principal (L1). Quando acumula um número suficiente de transações, a L2 as “comprime” e envia para a L1. ZKPs são ideais para isso, pois (i) provam que as transações foram executadas corretamente e (ii) geram uma prova sucinta que ocupa pouco espaço na L1. Isso barateia e acelera as transações, mantendo segurança quase igual à da L1. Devido à complexidade de provar a execução completa da Ethereum Virtual Machine (EVM), muitas soluções de ZK Rollup se limitam à troca de ativos e mercadorias simples. Hoje, estão ativos projetos como Loopring, zkSync Lite, dYdX e Starknet. [^41]

**ZK-EVM.** Semelhante ao ZK Rollup, mas universal, pois permite executar qualquer tipo de transação ou programa. A Ethereum possui uma EVM que funciona como um computador global de uso geral e compartilhado (que qualquer um pode programar). Ao descrever a lógica dessa máquina com ZKPs, conseguimos provar que qualquer programa executado na Ethereum foi corretamente executado, com uma prova sucinta. Isso habilita muitos casos de uso, especialmente para escalar a rede e reduzir o custo e tempo das transações. Atualmente, está disponível em sistemas como Polygon zkEVM e zkSync Era, com vários outros a caminho. [^42]

**ZK-VM.** Por conta da complexidade de adaptar uma plataforma "SNARKs-unfriendly" [^43] como a EVM, muitos projetos preferem criar novas blockchains, separadas da Ethereum. Assim, podem otimizar a máquina virtual desde o início para funcionar melhor com ZK. Dependendo do sistema, isso permite mais privacidade e verificação sucinta do estado da blockchain. O Mina já está ativo, e projetos como o Aleo estão em desenvolvimento ativo. [^44]

**Dark Forest.** Dark Forest é um jogo de estratégia em tempo real com informação incompleta. Jogos com informação incompleta baseados em ZK usam uma "névoa de guerra criptográfica", onde os jogadores só podem ver parte do mundo — garantido por ZK. Diferente de jogos como Starcraft, nem mesmo o servidor central tem acesso a tudo. Isso possibilita formas novas e programáveis de jogar. [^45]

**ZK Bridges.** Bridges permitem mover ativos entre blockchains e sistemas diferentes. Mas são difíceis de tornar seguras e frequentemente sofrem ataques. Com ZK, podemos criar bridges mais rápidas e seguras, sem depender de terceiros confiáveis nem soluções frágeis. Já existem implementações como o zkBridge, e projetos como o Succinct Labs também estão trabalhando nisso. [^46]

**Identidade privada.** À medida que mais sistemas isolados exigem e armazenam nossas identidades online [^47], é desejável que os indivíduos possam controlar, agregar e manter essas identidades fragmentadas em sigilo. Projetos como o Sismo já permitem isso, e outros estão desenvolvendo soluções semelhantes. [^48]

Esses são apenas alguns exemplos — há muitos outros. Não mencionamos coisas como reputação privada com não-repúdio, exportar reputação da web2, proteção contra ataques sybil em negação de serviço (denial-of-service), provas resistentes à coerção, prova de replicação, airdrops anônimos, provas de graus de separação, etc. [^49]

### No horizonte

**ZK-EVM (Equivalente à Ethereum).** Existem diferentes tipos de ZK-EVM, e os mais difíceis de implementar são aqueles totalmente equivalentes à Ethereum. Outros ZK-EVMs fazem alguns atalhos para facilitar a geração de provas. Com um ZK-EVM totalmente equivalente, não há diferença em relação ao sistema atual da Ethereum. Isso significa que podemos provar a execução correta de cada bloco existente com uma prova sucinta. Você pode usar um celular para verificar a integridade de toda a cadeia, confiando apenas em matemática, sem precisar confiar em terceiros ou usar máquinas caras. Atualmente está sendo desenvolvido pela equipe do ZK-EVM Community Edition. [^50]

**Computação verificável de propósito geral.** A maior parte das computações no mundo não acontece na EVM, mas em outros sistemas. Programas baseados em WASM e LLVM são muito comuns [^51]. Podemos aplicar a mesma abordagem do ZK-EVM para realizar computações privadas verificáveis de uso geral. Por exemplo, podemos provar que um banco de dados contém um determinado registro, sem revelar nenhuma outra informação. Equipes como Delphinus Labs, RISC Zero, Orochi Network e nil.foundation estão trabalhando nisso. [^52]

**ZK Machine Learning (ZK ML).** Podemos provar que uma computação foi realizada corretamente de forma privada, fora da blockchain, e então publicar uma prova de que foi corretamente executada. Isso permite usar dados privados para treinar modelos melhores, sem expor esses dados. Por exemplo: documentos sensíveis, voz ou até DNA para detectar problemas de saúde. Isso melhora tanto a escalabilidade quanto a privacidade dos usuários. Já existem provas de conceito (PoC) para tarefas como MNIST — teste comum em aprendizado de máquina para reconhecer dígitos escritos à mão — e há pesquisas em coisas mais complexas como redes neurais dentro de ZKPs. [^53]

**Autenticidade de fotos.** Provar a origem de conteúdos como fotos e vídeos, incluindo edições padrão de pós-processamento. Ou seja, provar que uma foto foi tirada em determinado tempo e lugar, e que só foi editada com operações básicas como redimensionamento, corte e escala de cinza (lista aprovada pela Associated Press). Já há trabalhos e uma PoC desenvolvida. [^54]

**Compliance.** Provar que uma transação privada está em conformidade com alguma regulamentação, ou que um ativo não está em uma lista negra. Provar que uma exchange é solvente sem revelar seus ativos. Alguns sistemas, como o Espresso Labs, já trabalham nisso, e versões simples já estão em funcionamento.

**Intenções protegidas e privadas.** Usuários de blockchains públicas têm objetivos específicos, que podem ser expressos como _intenções (intents)_. Por exemplo, alguém pode querer trocar um token por outro. O usuário pode divulgar sua intenção e ser pareado com uma contraparte adequada. É desejável que essas intenções sejam protegidas (ocultando o "quem", mas não o "o quê", como nas transações protegidas _(shielded transactions)_ do Zcash) ou completamente privadas. A Anoma está trabalhando nisso, começando com correspondência de intenções protegidas. Para atingir total privacidade na correspondência de intenções, serão necessários avanços significativos em criptografia, semelhantes ao último exemplo desta seção.

**Mundos autônomos.** Uma continuação de ideias como o Dark Forest. Um mundo pode ser físico ou conceitual, como o Mundo de Nárnia, o Cristianismo, o Mundo do Dólar Americano, o Bitcoin ou o Direito da Commonwealth. Dependendo de onde esses mundos "rodam", eles podem ser autônomos se qualquer um puder mudar as regras sem comprometer sua objetividade. A 0xPARC Foundation está explorando isso no contexto de jogos e criação de mundos. [^55]

**Prova de autenticidade de dados.** Exportar dados de aplicações web e provar fatos sobre eles de forma privada. Usa o protocolo TLS, o que permite funcionar em qualquer site moderno. Atualmente está sendo desenvolvido pelo projeto TLSNotary. [^56]

**Desarmamento nuclear.** Permitir que inspetores em locais nucleares confirmem se um objeto é ou não uma arma nuclear sem precisar examinar os mecanismos internos sensíveis desse objeto. Já existe artigo com simulação física sobre isso. [^57]

**Negociações de paz e acordos sensíveis.** Em negociações, as partes geralmente têm limites rígidos que não desejam revelar para não enfraquecer sua posição. Ao codificar esses limites explicitamente, duas partes podem negociar em um domínio altamente complexo e chegar a um acordo sem revelar detalhes dos parâmetros envolvidos. Isso permite que mesmo pessoas que não confiam umas nas outras cheguem a um consenso. Isso provavelmente exigirá avanços em Computação Multipartidária (MPC), que permite computações sobre segredos compartilhados. [^58]

Mais uma vez, isso não cobre tudo o que está sendo explorado ou pensado. Com certeza teremos muitas outras aplicações no futuro. Como você pode ver, há muito o que fazer com ZK.

Você pode estar se perguntando por que tantas dessas aplicações envolvem blockchain. Isso foi parcialmente respondido na seção anterior “Por que agora?”. ZK é uma tecnologia ortogonal a blockchains como Ethereum, e é possível usá-la sem blockchain — mas muitas vezes a blockchain é uma boa ferramenta para se aproveitar.

De forma similar, as pessoas que trabalham nessas áreas e os problemas que as motivam muitas vezes se sobrepõem. À medida que o setor amadurece, é provável que a parte "blockchain" nas aplicações com ZK desapareça como mero detalhe técnico — e isso já começou a acontecer. Olhando mais adiante, até mesmo o “ZK” pode se tornar invisível: será apenas uma aplicação que, por acaso, usa ZKP.

Por fim, quando a criptografia para mensagens online e similares foi desenvolvida, ela foi usada e impulsionada por militares e empresas de Internet. Não foi o correio ou alguma transportadora de objetos físicos quem liderou essa inovação, embora teoricamente pudessem tê-lo feito. [^59]

Vou encerrar esta seção com uma citação de Barry Whitehat, pesquisador conhecido na área de ZK e membro da equipe Privacy and Scalability Explorations (PSE) da Ethereum Foundation, quando perguntado sobre o futuro da ZK:

> "Até 2040, alguém terá vencido o Prêmio Nobel da Paz por usar Zero Knowledge Proofs." [^60]

Fora da realidade e ousado? Com certeza. Vai acontecer? Talvez não. Mas poderia? Sem dúvida. É uma ideia intrigante de se considerar. Qual a diferença entre o modelo mental que vê isso como uma possibilidade real e aquele que descarta na hora? O que teria que acontecer para que isso se tornasse um resultado plausível?

ZKPs representam uma ferramenta nova e extremamente poderosa. Muitas vezes, é nossa imaginação sobre como aplicá-la que nos limita.

## Conclusão

_Esta seção resume o artigo e aponta os próximos passos_

Neste artigo, vimos o que são os ZKPs（Zero-Knowledge Proofs）, por que eles são importantes e em quais situações são úteis. Também exploramos como funcionam e quais propriedades oferecem. Por fim, analisamos algumas aplicações atuais e futuras.

Espero que isso tenha te ajudado a compreender melhor a natureza dos ZKPs, talvez até provocado alguns momentos “eureka” e inspirado novas formas de pensar sobre certos problemas. Quem sabe, até te ajude a acompanhar a mágica dos ZKPs daqui pra frente.

Nos próximos artigos, vamos aprofundar ainda mais alguns desses pontos e abordar aspectos mais técnicos para entender melhor como os ZKPs funcionam e onde podem ser aplicados.

Se algo específico despertou seu interesse, ou se você gostaria de ver algum tema em particular nos próximos artigos, fique à vontade para me contatar pelo Twitter ou por e-mail. Os melhores comentários serão incluídos como notas de rodapé!

## Agradecimentos

Obrigado a Michelle Lai, Chih-Cheng Liang, Jenny Lin, Anna Lindegren e Eve Ko por lerem os rascunhos e oferecerem feedbacks valiosos.

### Imagens

- _Where's Waldo_ - Fonte desconhecida, Where's Waldo criado originalmente por [Martin Handford](https://en.wikipedia.org/wiki/Where%27s_Wally%3F)
- _Leitura silenciosa_ - Jorge Royan, CC BY-SA 3.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Austria_-_Heiligenkreuz_Abbey_-_1726.jpg)  
- _Sherlock Holmes_ - Sidney Paget, Domínio público, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Strand_paget.jpg)  
- _Pouso na Lua_ - Neil A. Armstrong, Domínio público, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11.jpg)  
- _Calculadora de Pascal_ - kitmasterbloke, CC-BY 2.0, via [Openverse](https://openverse.org/image/0feadae2-6b51-4dc7-8838-18c157f7f0ce)  
- _Lei de Moore_ - Max Roser, Hannah Ritchie, CC-BY 4.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moore%27s_Law_Transistor_Count_1970-2020.png)  
- _Desafio de Sudoku_ - Tim Stellmach, CC0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg)  
- _Feitiço mágico_ - Biblioteca Nacional do País de Gales, CC0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Book_of_incantations_f.7v.png)  
- _Cyberpunk_ - bloodlessbaron, Domínio público, via [Openverse](https://openverse.org/image/3d3d3cd9-7df6-4781-9778-cdb1e1738de1)

## References

[^1]: While the concepts are related, there's some legal controversy around if the "the right to privacy" itself is protected in many jurisdictions around the world. See the Wikipedia article on [Right to privacy](https://en.wikipedia.org/wiki/Right_to_privacy) for more.
[^2]: Zero knowledge has a precise mathematical definition, but we won't go into this in this article. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for a more precise definition.
[^3]: See [A Cypherpunk Manifesto](https://nakamotoinstitute.org/static/docs/cypherpunk-manifesto.txt) for the full text. Also see Wikipedia on [Cypherpunks](https://en.wikipedia.org/wiki/Cypherpunk).
[^4]: Some people have different interpretations of this specific passage, but it is still the case that humans made the transition from primarily oral storytelling to silent reading at some point not too long ago. See Wikipedia on [History of silent reading](https://en.wikipedia.org/wiki/Silent_reading#History_of_silent_reading) for more on silent reading.
[^5]: Original quote in French: _Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte._ See [Quote Investigator ](https://quoteinvestigator.com/2012/04/28/shorter-letter) on this quote.
[^6]: Kudos to Juraj Bednar for [suggesting](https://twitter.com/jurbed/status/1650782361590669313) using murder mystery as a way to explain the notion of a proof.
[^7]: Succinctness has a precise mathematical definition, but we won't go into this in this article. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for a more precise definition.
[^8]: Transaction costs is an economic concept. See this Wikipedia article on [transaction costs](https://en.wikipedia.org/wiki/Transaction_cost).
[^9]: In a [checksum](https://en.wikipedia.org/wiki/Checksum), we do some basic operations like adding and subtracting the initial digits, and if the final digit isn't the same we know something went wrong. Fun fact: Unlike most similar ID systems, a Social Security Number (SSN) in the US [does not have a checksum](https://en.wikipedia.org/wiki/Social_Security_number#Valid_SSNs). If a checksum is just one digit long it is sometimes just called a [check digit](https://en.wikipedia.org/wiki/Check_digit).
[^10]: While more common in less developed countries, this happened recently with bank failures in the US. See Wikipedia article on effects of [Collapse of Silicon Valley Bank](https://en.wikipedia.org/wiki/Collapse_of_Silicon_Valley_Bank#Effects).
[^11]: Full quote: "It is a profoundly erroneous truism, repeated by all copy-books and by eminent people when they are making speeches, that we should cultivate the habit of thinking of what we are doing. The precise opposite is the case. **Civilization advances by extending the number of important operations which we can perform without thinking about them.** Operations of thought are like cavalry charges in a battle — they are strictly limited in number, they require fresh horses, and must only be made at decisive moments." See [Wikiquote](<https://en.wikiquote.org/wiki/Alfred_North_Whitehead#An_Introduction_to_Mathematics_(1911)>).
[^12]: Pascal's calculator, the _Pascaline_, is a mechanical calculator. It was very impressive when it came out in 1642. See [Pascal's calculator](https://en.wikipedia.org/wiki/Pascal%27s_calculator).
[^13]: In well-designed authentication schemes the provider doesn't see your password either, just a salted hash of it. See Wikipedia on [form of stored passwords](https://en.wikipedia.org/wiki/Password#Form_of_stored_passwords).
[^14]: SHA256 is a an often used cryptographic hash function. See [SHA2](https://en.wikipedia.org/wiki/SHA-2).
[^15]: You can verify this yourself with a [SHA256 calculator online](https://www.movable-type.co.uk/scripts/sha256.html) or do it yourself at your computer with the `sha256sum` utility.
[^16]: Cryptography studies how to keep information safe and hide it from adversaries. It is a blend of mathematics, computer science and engineering. You can also read more about cryptographic hash functions and their purpose [here](https://en.wikipedia.org/wiki/Cryptographic_hash_function).
[^17]: Technically this is called proving knowledge of the _pre-image_ of a hash.
[^18]: See the [Federalist Papers](https://en.wikipedia.org/wiki/The_Federalist_Papers).
[^19]: See this article on [group signatures](https://0xparc.org/blog/zk-group-sigs) by 0xPARC. Includes the relevant Circom code.
[^20]: Zero Knowledge Proofs have [existed since 1985](https://en.wikipedia.org/wiki/Zero-knowledge_proof#History), and the authors later won a Gödel Prize for their work. We can compare this to [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography#History), which took many decades until it was used for things like [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security), a now indispensable building block for secure Internet usage.
[^21]: For example, Lambda calculus with [Church numerals](https://en.wikipedia.org/wiki/Church_encoding#Church_numerals) and Lisp were initially theoretical and largely unpractical when first proposed. Dan Boneh and others have made the [observation](https://zk-learning.org/) that making prover time quasilinear is what really made ZKPs practical, even in theory.
[^22]: See the origins of Zcash, the [Zerocoin paper](https://eprint.iacr.org/2014/349.pdf).
[^23]: Censorship-resistance means anyone can transact on a public blockchain without permission as long as they follow the basic rules of the protocol. It also means it is very costly for an attacker to alter or disrupt the operation of the system. Transparency refers to transactions being publicly auditable and immutable on the blockchain forever. These notions are closely related to decentralization and security, and are a big part of the value proposition of public blockchains compared to other systems.
[^24]: BLS signatures used in the [Ethereum Consensus Layer](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/keys/) were deployed and used to secure billions of dollars just a few years after it was [developed](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-04). See Wikipedia for more on [BLS Signatures](https://en.wikipedia.org/wiki/BLS_digital_signature).
[^25]: Dan Boneh, an applied cryptography professor at Stanford, is a great example of this in terms of his involvement in various cryptocurrency-related projects.
[^26]: Thee author heard about this from gubsheep at [0xPARC](https://0xparc.org/), but it has popped up a few times. This also matches the author's own experience, working on RLN and noticing 1-2 order of magnitude improvements in things like prover time in a few years.
[^27]: In a legal setting, false positives do happen, see for example the [Innocence Project](https://en.wikipedia.org/wiki/Innocence_Project). In a mathematical setting we can make this false positive rate very precise, and it isn't even close to a fair game. That's the power of mathematics. We'll look at this more in future articles on probabilistic proofs.
[^28]: You'd probably want to ask Sherlock Holmes some follow-up questions first though, before throwing our prospective murderer in jail. It is possible Sherlock Holmes is trying to fool you! In ZKPs we assume the prover is untrusted.
[^29]: This is done using the [Fiat-Shamir heuristic](https://en.wikipedia.org/wiki/Fiat%E2%80%93Shamir_heuristic).
[^30]: Sometimes people make a distinction between these two, but it is a technical one (computational vs statistical soundness) and not something we have to concern ourselves with right now. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for more.
[^31]: Alice and Bob are commonly used characters in cryptographic systems, see [Wikipedia](https://en.wikipedia.org/wiki/Alice_and_Bob).
[^32]: There are also zk-STARKs, so one could argue a more accurate name might be (zk)S(T|N)ARKs. This is obviously a bit of a mouthful, so people tend to use ZK as a shorthand. See for example the name of the ZK podcast, the ZK proof standard, etc. ZK is the most magical property of ZKPs, in the author's opinion.
[^33]: Setups are multi-faceted and a big part of the security assumptions of a ZKP. They are a bit involved mathematically, and to give them full justice would need a dedicated article. There's a great layman's podcast on The Ceremony Zcash held in 2016 that you can listen to [here](https://radiolab.org/podcast/ceremony).
[^34]: Technically speaking this is an _arithmetic circuit_ (dealing with numbers), but we won't introduce details of this in this article. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for more.
[^35]: Unless you want to! ZK is sometimes called "Magic Moon Math", but if you really study it the mathematics you need to get an intuition for how they actually work under the hood isn't as complex as you might think. We won't go into it in this article, though. Here's a [presentation](https://www.youtube.com/watch?v=W1ZkhWNka-c) by the author on some of the mathematical foundations of ZKPs.
[^36]: French for here you go, presto, bingo, ta-da, and Bob's your uncle.
[^37]: There are different notions of succinctness, and this depends on the specific proof system. Technically, we call proofs succinct if they are sublinear in time complexity.
[^38]: Allegedly a quote by William Gibson, see [here](https://www.nytimes.com/2012/01/15/books/review/distrust-that-particular-flavor-by-william-gibson-book-review.html).
[^39]:
    With many new versions being developed, like [Aztec](https://aztec.network/) and [Railgun](https://railgun.org/). [Tornado Cash (archive)](https://web.archive.org/web/20220808144431/https://tornado.cash/) works quite differently from [Zcash](https://z.cash), acting more as a mixer. Tornado Cash was also recently [sanctioned](https://en.wikipedia.org/wiki/Tornado_Cash) by the US government. As of this writing there are still a lot of unknowns about this case, but it was a [controversial](https://www.eff.org/deeplinks/2022/08/code-speech-and-tornado-cash-mixer) event that lead to [lawsuits](https://www.coincenter.org/coin-center-is-suing-ofac-over-its-tornado-cash-sanction/]). Some see this as a sequel to the [Crypto Wars](https://en.wikipedia.org/wiki/Crypto_Wars) in the 1990s. There are other alternatives like [Monero](https://www.getmonero.org/) and [Wasabi Wallet](https://wasabiwallet.io/), that are not based on ZKP but have similar design goals. Read more about the [Case for Electronic Cash](https://www.coincenter.org/app/uploads/2020/05/the-case-for-electronic-cash-coin-center.pdf) by Coin Center.
    [^40]: See [Semaphore](https://semaphore.appliedzkp.org) by the [Privacy & Scaling Explorations team](https://www.appliedzkp.org/).
    [^41]: This is similar to how the traditional banking system works too, where there are multiple layers of settlement happening. It is just hidden from most end users. See [L2Beat](https://l2beat.com/scaling/summary) for an overview of different Layer 2 solutions, including ZK Rollups. Also see [Loopring](https://loopring.org/#/), [dYdX](https://dydx.exchange/faq). and [Starknet](https://www.starknet.io/en).
    [^42]: There are different types of zkEVM, and the difference can be quite subtle. See [this post](https://vitalik.ca/general/2022/08/04/zkevm.html) by Vitalik for more on the difference. Also see [Polygon zkEVM](https://polygon.technology/polygon-zkevm), [zkSync Era](https://zksync.io/).
    [^43]: SNARK-unfriendly platforms or functions refer to the fact that most modern computer primitives were designed for a specific computer architecture. This architecture is very different from what is natural when writing constraints. For example, the SHA256 hash function is a typical example of a SNARK-unfriendly hash. Some people create SNARK or ZK-friendly functions, such as the [Poseidon hash function](https://www.poseidon-hash.info/), that are designed specifically to be used in ZKPs. These are much easier to implement in ZKPs, and can be 100 or more times more efficient, but they come with other trade-offs.
    [^44]: Mina allows for succinct verification of the whole chain, whereas Aleo focuses more on privacy. Also see [Mina](https://minaprotocol.com/) and [Aleo](https://www.aleo.org/).
    [^45]: In [Dark Forest](https://zkga.me/), some people write very complex bots that play the game on its own. They even form private DAOs and create smart contracts that play the game semi-autonomously.
    [^46]: Succinct Labs made [Telepathy](https://docs.telepathy.xyz/) is one such project. [zkBridge](https://zkbridge.com/) is another. There are likely many others.
    [^47]: A weird, but surprisingly accurate, statement.
    [^48]: Proof Carrying Data by 0xPARC, is one such example. See [PCD](https://pcd.team). Also see [Sismo](https://www.sismo.io/).
    [^49]: We won't go into these here, but I encourage the curious reader to search the web to find out how various projects are using or thinking about using ZKPs to achieve their design goals. Example: [Unirep](https://developer.unirep.io/docs/welcome), [Interep](https://interep.link/), [RLN](https://rate-limiting-nullifier.github.io/rln-docs/), [RLNP2P](https://rlnp2p.vac.dev/), [MACI](https://privacy-scaling-explorations.github.io/maci/), [Filecoin](https://docs.filecoin.io/basics/the-blockchain/proofs/), [Stealthdrop](https://github.com/stealthdrop/stealthdrop), [ETHDos](https://ethdos.xyz/), and many more.
    [^50]: See [^42] above for more on this distinction.
    [^51]: LLVM and WASM are compiler and toolchain technologies. Very roughly speaking, they allow you to write code in different programming languages that run in different types of environments, such as in different web browsers and on different types of computers. Understanding the specifics of these systems isn't important for our purposes, just that they allow us to write and use programs in many different environments. See [LLVM](https://en.wikipedia.org/wiki/LLVM), [WASM](https://en.wikipedia.org/wiki/WebAssembly).
    [^52]: See [Delphinus Labs](https://delphinuslab.com/zk-wasm/), [RISC Zero](https://www.risczero.com/), [Orochi Network](https://orochi.network/), [nil.foundation](https://orochi.network/).
    [^53]: See [zk-MNIST](https://0xparc.org/blog/zk-mnist) and [EZKL](https://docs.ezkl.xyz/). There are also projects doing things like [neural networks](https://github.com/lyronctk/zator) in more modern efficient proof systems like [Nova](https://github.com/microsoft/Nova).
    [^54]: See article on [fighting disinformation with ZK](https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f).
    [^55]: See [this essay](https://0xparc.org/blog/autonomous-worlds) by ludens at 0xPARC for more details on this idea.
    [^56]: See [TLS Notary](https://tlsnotary.org)
    [^57]: See [article (archive)](https://web.archive.org/web/20170703142802/https://www.pppl.gov/news/2016/09/pppl-and-princeton-demonstrate-novel-technique-may-have-applicability-future-nuclear)
    [^58]: Unlike Zero Knowledge Proofs, which allow you to make statements about private data, [Multi-Party Computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC) generalizes this concept and allows us to do computation on shared secrets. That is, if Alice and Bob have their own secret, we can write a program that combines these two secrets in some non-trivial way, without revealing anyone's secrets. This is what we want in a negotiation setting, because we want to compare stakeholder's private information in some way to reach an acceptable compromise. Most MPCs that exist today are quite limited and inefficient, but it is an exciting area of research with a lot of potential.
    [^59]: A familiar story: see [Sears vs Amazon](https://fortune.com/longform/sears-couldve-been-amazon/).
    [^60]: Quote from a [panel at Devcon5](https://www.youtube.com/watch?v=hBupNf1igbY&t=1897s).
