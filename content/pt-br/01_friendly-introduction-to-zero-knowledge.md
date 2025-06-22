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

![ZKP Magic](../assets/01_zkp-magic.png 'Magia dos ZKPs')

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

No jogo de Sudoku, o objetivo é encontrar uma solução para o tabuleiro que satisfaça determinadas restrições. Cada linha deve conter os números de 1 a 9, mas apenas uma vez. O mesmo vale para cada coluna e cada subgrade 3x3. Recebemos uma configuração inicial, e o desafio é preencher o restante de forma que todas essas restrições sejam respeitadas. O difícil é encontrar números que satisfaçam todas as restrições ao mesmo tempo.

![Sudoku](../assets/01_sudoku.png 'Desafio de Sudoku')

Com ZKPs, o provador pode construir uma prova de que conhece a solução de um determinado quebra-cabeça. Nesse caso, a prova é construída usando uma entrada pública — a configuração inicial do tabuleiro — e uma entrada privada — a solução do quebra-cabeça — além de um circuito. Esse circuito é composto por todas as restrições que definem o quebra-cabeça.

Chamamos isso de circuito porque as restrições se conectam entre si, como os componentes de um circuito elétrico. Mas nesse caso o circuito não conduz corrente elétrica, e sim valores. Por exemplo, não podemos inserir algo como "banana" numa restrição de linha — o valor precisa ser numérico e estar entre 1 e 9, entre outras condições.

O verificador recebe o mesmo circuito e a entrada pública, e consegue verificar a prova enviada pelo provador. Se a prova for válida, o verificador se convence de que o provador possui uma solução para aquele quebra-cabeça específico.

Acontece que muitos problemas podem ser expressos como um conjunto de restrições. Na verdade, qualquer problema que possamos resolver com um computador pode ser representado dessa forma.

### Sudoku example

Let's apply what we learned about the various parts of a ZKP to the Sudoku example above.

For Sudoku, our special program, the circuit, takes two inputs:

- A Sudoku puzzle as public input
- A solution to a Sudoku puzzle as private input

The circuit is made up of a set of constraints. All of these constraints have to be true. The constraints look like this:

- All digits in the puzzle and solution have to be between 1 and 9
- The solution has to be equal to the puzzle in all the places where digits are already placed
- All rows must contain digits 1 through 9 exactly once
- All columns must contain digits 1 through 9 exactly once
- All subsquares must contain digits 1 through 9 exactly once

If all of these constraints are true for a puzzle and its solution, we know that it is a valid solution.

A prover Peggy uses her magic prover key, the puzzle and the solution, combines it with the special program and creates a proof. The proof is very short, less than 1000 characters. The proof is self-contained and with it the verifier has all information they need to verify the proof. You can think of it as a magic spell that does what you want, without you having to understand the details of it [^35].

Here's a spell from a book of magic spells, written by a Welsh physician in the 19th century:

![Magic spell](../assets/01_magic-spell.png 'Magic Spells')

Here's an example of a Zero Knowledge Proof produced by the Circom/snarkjs library:

![Circom proof](../assets/01_circom-proof.png 'Circom proof')

Except in this case, the magic actually works.

Victor the verifier uses his verifier key, the original puzzle input, and verifies that the proof Peggy sent is indeed correct. If it is, the output is "true", and if it isn't, the output is "false". The spell either works or it doesn't. With this, Victor is convinced that Peggy knows a solution to that specific puzzle, without actually having seen the solution. Et voilà. [^36]

### Some properties

We say that a ZKP has certain technical properties:

- Completeness - if the statement is true, then the verifier will be convinced by the proof
- Soundness - if the statement is false, the verifier won't be convinced by the proof, except with a negligible probability
- Zero Knowledge - if the statement is true, it won't reveal anything but the fact that it is true

Additionally, for zk-SNARKs, the proof is succinct, meaning it basically doesn't get bigger as the program gets more complex [^37].

There are many other properties we care about when it comes to practical ZKPs:

- What mathematical assumptions is the system making?
- How secure is it?
- Does it require a trusted setup?
- How hard is it to generate the proof? In time and other resources
- How hard is it to verify the proof? In time and other resources
- Does the ZKP system allow for aggregating and combining multiple proofs together?
- Are there any good libraries for a ZKP system that can be used by programmers?
- How expressive is the language used to write programs for a particular ZKP system?
- And so on

As you can see, there are quite a lot of considerations and different variations of ZKPs. Don't worry though, the gist is basically the same, and depending on where your interest lies you can remain blissfully unaware of many of the technical details involved. Going back to the zoo metaphor, just like with animals, you might not want to become a biologist. Instead, you might want to work with some animals, or maybe you just want a pet, or even just pet your friend's dog.

## Applications

_This section gives examples of current and future applications of ZK_

There are many applications of ZKPs. Generally speaking, we are still in the early stages. A lot of the focus is still on the underlying protocols and infrastructure, as well as blockchain-specific applications. To better appreciate the blockchain-specific examples, it is useful to have some understanding of how public blockchains work and the challenges they have. However, this isn't a requirement. In this section we'll look at some of the more interesting applications. We'll start by looking at applications that are live now and then look at those on the horizon.

> The future is already here. It's just not evenly distributed yet.
>
> - William Gibson [^38]

![ZKP Magic](../assets/01_zkp-magic.png 'ZKP Magic')

### Live now

**Electronic cash**. To make a cash-like payments systems online it needs to be fungible and private like physical cash. Fungibility refers to the property of a commodity being replaceable by another identical item. That is, there's no difference between your money and my money; they are equally valid forms of payment. We can use ZK to make the transaction graph private, unlike in Bitcoin or Ethereum. This way, your transaction history remains private, ensuring that electronic cash is fungible. This is currently live in systems like Zcash, and related systems like Tornado Cash [^39].

**Anonymous signaling.** Often, we might need to prove our affiliation with a group that possesses certain characteristics, without revealing our identities. One such example is proving that you are part of some group of people; another is voting. This means you don't tie your identity to sensitive actions such as which party you voted for, or reveal other unnecessary information. Currently live in systems like Semaphore [^40], and similar mechanisms with many variations exist.

**ZK Rollup.** Allow for more, cheaper and faster transactions. The Ethereum blockchain space is limited and expensive with a lot of demand. We use a so-called Layer 2 (L2) rollup, that does transactions separate from the main blockchain (L1). Once a certain number of transactions have hit the L2, it "rolls it up" to the L1. ZKPs are great for this because we can (i) prove that transactions are executed correctly and (ii) create a succinct proof that takes up a small amount of space on the L1. This makes transactions cheaper and faster for users, with near-equal security. Due to the complexity of proving the execution of the entire Ethereum Virtual Machine (EVM) many ZK Rollup solutions only focus on the exchange of simple commodities and assets. Currently live in systems like Loopring, zkSync Lite, dYdX, and Starknet. [^41]

**ZK-EVM.** Similar to ZK Rollup, but universal, since any type of transaction or program can be executed. Ethereum has an EVM that acts as a worldwide globally shared, general purpose computer (that anyone can write to). By writing the logic of this machine using ZKPs we can prove the correct execution of any program written on Ethereum and construct a succinct proof that it was executed correctly. This has several use cases, but most immediately for scaling and allowing for cheaper and faster transactions. Currently live in systems like Polygon zkEVM, zkSync Era, with several others on their way. [^42]

**ZK-VM.** Partially due to the complexity of targeting a "snark-unfriendly" [^43] platform like the EVM, many projects have chosen to do a new blockchain, separate from Ethereum. This means they can optimize the VM to work better with ZK in the first place. Depending on the specific system, this allows for privacy and succinct verification of the blockchain state. Mina is live, and systems like Aleo are under active development. [^44]

**Dark Forest**. Dark Forest is an incomplete information real-time-strategy game. Incomplete information games based on ZK have a "cryptographic fog of war" where players can only see part of the world, as enforced by ZK. Compared to traditional games like Starcraft, not even a central server has access to all the information. Due to its programmatic nature this enables novel ways of playing a game. [^45]

**ZK Bridges**. Bridges allow you to move assets between different blockchains and systems. These bridges can be hard to make secure, and they often get hacked. With ZK, we can bridge assets more securely and faster, without relying on trusted third parties or error-prone approaches. Currently live with zkBridge and also being worked on by projects such as Succinct Labs. [^46]

**Private identity**. As more siloed systems require and host our online identities [^47], it is desirable for individuals to be able to own, aggregate and keep these fragmented online identities private. Currently live projects like Sismo enable this, and other projects are working on similar systems. [^48]

These are just a few examples and by no means complete. We didn't talk about things like private non-repudiable reputation, exporting web2 reputation, sybil-resistant denial-of-service protection, coercion-resistant proving, proof of replication, anonymous airdrops, proving degrees of separation, etc. [^49]

### On the horizon

**ZK-EVM (Ethereum-equivalence)**. There are different types of ZK-EVM, and the more challenging ones to implement are the ones that are fully Ethereum-equivalent. Other ZK-EVM takes some shortcuts to make it easier to generate proofs. With a fully Ethereum-equivalent ZK-EVM there's no difference with the current Ethereum system. This means we can prove the correct execution of every single block in existence in a succinct proof. You can use a phone to verify the integrity of the entire chain, relying solely on mathematics, without needing to trust third parties or use expensive machines. Currently being worked on by the ZK-EVM Community Edition team. [^50]

**General purpose provable computation**. Most computation in the world doesn't happen in the EVM, but in other systems. WASM and LLVM-based programs are very common [^51]. We can leverage the same approach in ZK-EVM to do general-purpose private provable computation. For example, we can prove that a database contains a specific record, without revealing any other information. Currently being worked on by many different teams, for example Delphinus Labs, RISC Zero, Orochi Network, and nil.foundation. [^52]

**ZK Machine Learning (ZK ML)**. We can prove that some computation was done correctly privately, off-chain, and then publish a proof that the computation was done correctly. This means we can use private data for training better models, without revealing that data. For example, sensitive documents, voice or even things like DNA to find health problems. This improves both scalability and privacy for users. Current proof of concept (PoC) exists for things like MNIST, a common test used in Machine Learning to recognize handwritten digits, and people are working on more complex things like neural networks inside ZKPs. [^53]

**Photo authenticity**. Prove provenance of content such as photos and videos, including standard post-processing edits. That is, prove that a photo was taken at a certain time and place, and has only been edited with basic resizing, cropping, and use of greyscale (AP approved list of operations). Some work has been done, including a PoC. [^54]

**Compliance**. Prove that a private transaction is compliant with some regulation, or that an asset isn't on a specific blacklist. Prove that an exchange is solvent without revealing its assets. Some work has been done by systems such as Espresso Labs, and some systems have simple versions of this already.

**Shielded and private intents.** Users of public blockchains have specific goals they want to achieve, which can be expressed as _intents_. For example, a user might have the intent to exchange one token for another. A user can tell other users about their intents and be matched with a suitable counterparty. It is desirable to keep these intents shielded (hiding the "who" but not the "what", similar to shielded transactions in Zcash) or completely private. Currently worked on by Anoma, starting with shielded intent-matching. To make intents-matching fully private likely requires breakthrough advances in cryptography, similar to the last example in this section.

**Autonomous worlds**. A continuation of things like Dark Forest. A world can be physical or conceptual, like The World of Narnina, Christianity, The World of the US Dollar, Bitcoin or Commonwealth law. Depending on where these worlds run, these can be autonomous if anyone can change the rules without damaging its objectivity. Currently being explored by the 0xPARC Foundation in the context of games and creating these worlds. [^55]

**Proof of data authenticity**. Export data from web applications and prove facts about it in a private way. Uses the TLS protocol which means it works on any modern website. Currently being worked on by TLSNotary. [^56]

**Nuclear disarmament.** Allow people inspecting nuclear sites to confirm that an object is or isn't a nuclear weapon without inspecting any of the sensitive internal workings of said object. Paper with physical simulation work exists. [^57]

**Peace talks and high-stakes negotiation**. Often in negotiations people have certain hard limits that they do not wish to reveal to their counterparty to weaken their ability to negotiate. By explicitly encoding these, two parties can negotiate over some highly complex domain and reach an agreement without revealing the details of their precise parameters and limits. This allows people who do not trust each other to fruitfully come to some agreement. Likely requires some breakthroughs in Multi-Party Computation (MPC), which allows us to do computation on shared secrets. [^58]

Again, this didn't mention all the types of things people are working on or thinking about. There will surely be many more things in the future. As you can tell there are a lot of things we can do with ZK.

You might wonder why many of these applications involve a blockchain. This was partially answered in the previous section "Why now?". ZK is an orthogonal technology to blockchains like Ethereum and we can do without the blockchain, but quite often it is simply a good tool that makes sense to leverage.

Similarly, the group of people working on these things and the immediate problems they care about are often overlapping. As the space matures, we can expect the "blockchain" part of ZK applications to disappear as simply an implementation detail, and this has already happened to some degree. Looking further, the "ZK" part will likely also fall into the background and it'll simply be an application that happens to use ZKP.

Finally, when cryptography for online messaging and similar was developed, it was used and developed by the military and Internet companies. It was not something that was innovated on by the post office or some company involved in the secure transport of physical goods, even if in theory that was a possibility. [^59].

I'll end this section with a quote from Barry Whitehat, a well-known ZK researcher who works with the Privacy and Scalability Explorations (PSE) team at the Ethereum Foundation, when asked for predictions on the future of ZK:

> "By 2040, someone will have won a Nobel Peace Prize for using Zero Knowledge Proofs." [^60]

Outlandish and bold? Certainly. Will it turn out to be true? Maybe not. But could it? Absolutely. It is an intriguing prospect to consider. What is the difference between the mental model that sees this as a real possibility, versus one that writes it off immediately? What would have to happen for such an event to be a realistic outcome?

ZKPs represent a new and incredibly potent tool. Often, it's our imagination about its potential applications that limits us.

## Conclusion

_This section summarizes the article and provides next steps_

In this article, we've looked at what ZKPs are, why we should care about them and when they are useful. We've also looked at how they work and what properties they give us. Finally, we looked at some applications, both current and future ones.

I hope this has led you to better understand the nature of ZKPs, and perhaps led to some aha moments and inspired some new ways of thinking about things. Perhaps it even helps you follow the magic of ZKPs in the future.

In future posts, we'll go even deeper into some of these aspects, and we'll also look at more technical aspects to better understand how ZKPs work and where they can be used.

If something specific piqued your interest, or there is something specific you'd like to see in future articles, feel free to contact me on Twitter or by email. I'll include the best comments as footnotes!

## Acknowledgements

Thanks to Michelle Lai, Chih-Cheng Liang, Jenny Lin, Anna Lindegren and Eve Ko for reading drafts and providing feedback on this.

### Images

- _Where's Waldo_ - Unknown source, Where's Waldo originally created by [Martin Handford](https://en.wikipedia.org/wiki/Where%27s_Wally%3F)
- _Silent Reading_ - Jorge Royan, CC BY-SA 3.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Austria_-_Heiligenkreuz_Abbey_-_1726.jpg)
- _Sherlock Holmes_ - Sidney Paget, Public domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Strand_paget.jpg)
- _Moon landing_ - Neil A. Armstrong, Public domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11.jpg)
- _Pascal's Calculator_ - kitmasterbloke, CC-BY 2.0, via [Openverse](https://openverse.org/image/0feadae2-6b51-4dc7-8838-18c157f7f0ce)
- _Moore's law_ - Max Roser, Hannah Ritchie, CC-BY 4.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moore%27s_Law_Transistor_Count_1970-2020.png)
- _Sudoku puzzle_ - Tim Stellmach, CC0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg)
- _Magic spell_ - National Library of Wales, CC0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Book_of_incantations_f.7v.png)
- _Cyberpunk_ - bloodlessbaron, Public Domain, via [Openverse](https://openverse.org/image/3d3d3cd9-7df6-4781-9778-cdb1e1738de1)

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
