---
title: 'Capire la matematica alla base delle ZKP'
date: '2025-02-21'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "understanding-math-behind-zkps"
images: ['../assets/03_zkboo_headshot.png']
summary: "In questo articolo spieghiamo la matematica alla base delle Zero Knowledge Proofs (ZKP, dimostrazioni a conoscenza zero), in modo accessibile a uno studente brillante delle superiori o a un laureato STEM (Scienza, Tecnologia, Ingegneria e Matematica) con le nozioni un po' arrugginite. Svilupperai l'intuizione su come funzionano le cose sotto il cofano e costruirai un quadro di riferimento di base per i concetti chiave coinvolti, il tutto accompagnato da un'implementazione giocattolo in meno di 100 righe di codice. Non servono polinomi né curve ellittiche."
translator: 'Silvio Meneguzzo'
---

_Questo libro è stato tradotto e adattato da Silvio Meneguzzo_

![ZKBoo](../assets/03_zkboo_headshot.png 'ZKBoo')

## Introduzione

In questo articolo spieghiamo la matematica alla base delle Zero Knowledge Proofs (ZKP, dimostrazioni a conoscenza zero), in modo accessibile a uno studente brillante delle superiori o a un laureato STEM (Scienza, Tecnologia, Ingegneria e Matematica) con le nozioni un po' arrugginite. Svilupperai l'intuizione su come funzionano le cose sotto il cofano e costruirai un quadro di riferimento di base per i concetti chiave coinvolti, il tutto accompagnato da un'implementazione giocattolo in meno di 100 righe di codice. Non servono polinomi né curve ellittiche.

### Prerequisiti

Diamo per scontate due cose:

- **Hai familiarità con le basi delle ZKP.** Va bene anche un livello generale, per esempio leggendo [un'introduzione semplificata alla Zero Knowledge](https://zkintro.com/it/articles/friendly-introduction-to-zero-knowledge).
- **Non hai paura dei simboli strani (ossia della matematica)**. Questo testo presuppone che tu sia (a) un laureato STEM [^1] che ha seguito un corso di matematica molto tempo fa, oppure (b) uno studente brillante delle superiori a cui piace la matematica. Non ti serve una preparazione formale in informatica, matematica o crittografia.

Il requisito principale è la curiosità e la voglia di imparare. Se ti manca la conoscenza su un argomento specifico, puoi facilmente cercarla [^2]. Manteniamo deliberatamente ridotti i prerequisiti matematici e ci limitiamo a nozioni di base.

Anche se è utile aver letto entrambi gli articoli precedenti, in senso stretto è richiesto solo il primo.

Quanto alle conoscenze matematiche, ecco le cose di cui idealmente dovresti avere una comprensione di base:

- Sistemi di equazioni (risolvere più di un'equazione alla volta)
- Aritmetica modulare (la matematica dell'orologio)
- Funzioni booleane (AND, OR)
- Funzioni di hash (come SHA256)
- Nozione di casualità (numero casuale)
- Probabilità di base (lancio casuale di una moneta)
- Numeri primi (sapere che esistono)
- Notazione matematica di base (verificare l'uguaglianza; $a_i$ indica l'$i$-esimo pedice)

Anche se non hai dimestichezza con quanto sopra, probabilmente assorbirai i concetti per osmosi.

### Panoramica

Ecco una panoramica di come procederemo. Tutti questi concetti saranno introdotti nelle rispettive sezioni, quindi non preoccuparti se per ora questi termini non ti dicono nulla.

Inizieremo passando in rassegna alcuni concetti chiave. Si tratta di mattoni fondamentali come circuiti, completezza funzionale, commitment (impegno crittografico), condivisione del segreto e protocolli sigma.

Dopodiché ci concentreremo su un protocollo ZKP specifico: ZKBoo [^3]. ZKBoo è un protocollo molto semplice ed è perfetto per sviluppare l'intuizione su come funzionano le cose sotto il cofano. Lo fa senza richiedere una matematica più avanzata, come la crittografia su curve ellittiche.

Inizieremo usando la condivisione del segreto per dimostrare un semplice vincolo (constraint), per poi costruirci sopra, rendendo il protocollo interattivo con un protocollo sigma, rendendolo funzionalmente completo e dimostrando più vincoli. Ne miglioreremo la sicurezza, cioè la solidità, eseguendo il protocollo su più round. Poi lo renderemo non interattivo usando la trasformazione di Fiat-Shamir.

Capirai esattamente come possiamo dimostrare questo insieme di vincoli a un Verifier (verificatore), in un modo che sia solido, non interattivo e che mantenga la conoscenza zero su alcune variabili:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

Dopo aver completato il nostro protocollo ZKBoo di base, vedremo come ZKBoo si collega ad altri zkSNARK di cui potresti aver sentito parlare. Vedremo cosa manca a ZKBoo e getteremo le basi per confrontarlo con diversi protocolli ZKP moderni.

Infine, ci sono alcuni argomenti correlati in appendice. Nell'Appendice A vediamo come il nucleo di ZKBoo possa essere implementato in appena ~50 righe di codice usando SageMath [^4]: incredibilmente compatto. Una versione giocattolo dell'intero protocollo sta comunque in meno di 100 righe. C'è anche un link a un repository di codice su GitHub per approfondire.

L'Appendice B mostra come generalizzare i nostri circuiti booleani in circuiti aritmetici. Nell'Appendice C includiamo alcune definizioni matematiche aggiuntive degli zkSNARK.

Iniziamo.

## Concetti chiave

_Nella sezione seguente presentiamo alcuni concetti chiave, come circuiti, completezza funzionale, commitment, condivisione del segreto e protocolli sigma._

### Circuiti

In una ZKP dimostriamo di conoscere un segreto tale che, applicandovi un certo calcolo, si ottenga uno specifico output, senza rivelare il segreto stesso. Il calcolo è costituito da un _insieme di vincoli_ che devono essere tutti soddisfatti. Possiamo modellarlo come un _circuito_.

Per esempio, possiamo esprimere un calcolo come il soddisfacimento del seguente insieme di vincoli:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

In questo caso, $a, b, d$ sono input privati, mentre $e$ è l'output pubblico [^5]. $c$ è determinato da $a, b$, ed è quindi una variabile intermedia.

Possiamo visualizzarlo come il seguente circuito:

![Circuito](../assets/03_circuit.png 'Circuito')

A differenza di un normale programma per computer, i vincoli non sono ordinati. Non importa in quale ordine i vincoli vengano definiti, poiché devono essere tutti soddisfatti [^6]. Questo significa che, dal punto di vista matematico, non c'è una vera differenza tra input pubblico e output pubblico.

Spesso suddividiamo i diversi tipi di variabili come segue [^7]:

- _Variabili witness_ (testimone) - variabili private, note solo al Prover (dimostratore)
- _Variabili di istanza_ - variabili pubbliche, di input o di output, note sia al Prover sia al Verifier

Persone diverse usano parole diverse, quindi è utile essere consapevoli dei diversi modi in cui ci si riferisce a queste variabili. Dal punto di vista matematico, possiamo esprimere il circuito qui sopra come:

$$
C(x,w) = 0
$$

Dove $x$ è la variabile pubblica ($e$) e $w$ sono le variabili witness ($a, b, d$). Ovvero, abbiamo:

$$
\begin{aligned}
a \cdot b - c = 0 \\
c + d - e = 0
\end{aligned}
$$

Ciò che facciamo quando dimostriamo una ZKP è dimostrare che un insieme di equazioni è valido, senza rivelare informazioni su un insieme di variabili private o sul witness. [^8]

### Completezza funzionale

In che modo colleghiamo le equazioni o i vincoli che stiamo risolvendo a un programma per computer? Il modo più semplice per capirlo è partire dall'esempio più elementare: i _circuiti booleani_.

Se tutti i valori sono booleani, $0$ o $1$, lo chiamiamo _circuito booleano_. Nell'algebra booleana tutti i valori sono 0 o 1. Possiamo definire semplici gate logici, proprio come in un circuito elettronico (da cui il nome "circuito"). Per esempio, XOR è l'OR esclusivo e può essere illustrato dalla seguente tabella di verità:

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

Si scopre che ci servono solo due gate logici, `XOR` e `AND`, per poter esprimere qualsiasi calcolo possibile. Questo si chiama _completezza funzionale_ [^9] e significa che possiamo esprimere qualsiasi tabella di verità con queste sole due operazioni.

Nel circuito menzionato nella sezione precedente ci basiamo su addizione e moltiplicazione. Se operiamo su valori booleani, si scopre che queste sono equivalenti:

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

Cioè, `XOR` si comporta come `ADD` e `AND` si comporta come `MUL`. Per esempio, $1+1 = 0$ nell'algebra booleana (modulo 2). Analogamente, possiamo esprimere facilmente i gate `OR` e `NAND` (NOT-AND) così:

$$
\begin{aligned}
\text{OR(a,b)} &= a + b - (a \cdot b) \\
\text{NAND(a,b)} &= 1 - (a \cdot b)
\end{aligned}
$$

Con semplici gate booleani come questi possiamo costruire un computer moderno. Per capire come sia possibile, esistono un libro e un corso chiamati _From Nand to Tetris_ che mostrano come costruire un computer moderno da zero con un semplice gate booleano `NAND`. [^10]

Il sistema ZKP che esamineremo si chiama ZKBoo, definito originariamente per circuiti booleani. Nel testo che segue assumeremo invece _circuiti aritmetici_ che operano su "numeri interi normali" [^11]. Nell'Appendice B vediamo come possiamo "giustificare" i circuiti aritmetici dal punto di vista matematico. Per ora tutto quello che devi sapere è che possiamo generalizzare quanto sopra, e useremo numeri interi normali ($1, 4, 7$ ecc.) come valori delle nostre variabili.

### Commitment

Abbiamo già introdotto i commitment in _Programmare le ZKP: From Zero to Hero_ [^12]. Qui li ripassiamo brevemente.

I commitment ci permettono di impegnarci ("promettere") su un valore senza rivelarlo. Ci impegniamo in modo tale da non poter cambiare idea su ciò a cui ci siamo impegnati. Esistono molti tipi di commitment, ma il più semplice consiste nell'impegnarsi su un singolo messaggio e nell'usare una _funzione di hash_ come `SHA256` per farlo [^13].

I commitment hanno due proprietà chiave:

- **Binding (vincolante)**: una volta che ti sei impegnato, non puoi più cambiare idea su ciò a cui ti sei impegnato
- **Hiding (occultamento)**: il commitment non lascia trapelare alcuna informazione sul valore a cui ci siamo impegnati

Ci permettono di eseguire due operazioni:

- **Commit (impegno)**: impegnarsi su un valore specifico mantenendolo nascosto
- **Reveal (rivelazione)**: rivelare il valore in modo che possa essere verificato come corretto (corrispondente a ciò su cui ci eravamo impegnati in precedenza)

Reveal è talvolta chiamato anche "open" nella letteratura crittografica.

Quando ci impegniamo su un messaggio, gli aggiungiamo un po' di casualità. Questo rende più difficile risalire per forza bruta al messaggio sottoposto a hash, nel caso in cui il messaggio sia facile da indovinare. Per esempio, se sai che il messaggio è un numero compreso tra 1 e 100, puoi semplicemente provare tutte le combinazioni finché non ricrei il commitment.

Impegnarsi tramite una funzione di hash potrebbe apparire così:

$$
\text{com} = \text{SHA256}(m||r)
$$

Qui concateniamo ($||$) il messaggio $m$ con un po' di casualità $r$. Usare una funzione di hash, come `SHA256`, garantisce che non possiamo recuperare facilmente il messaggio a partire da $\text{com}$.

Più concretamente, potremmo avere:

```
SHA256('foobar213151') = '419d....1611'
```

Prendiamo il messaggio `foobar`, gli aggiungiamo un po' di casualità e otteniamo un commitment, un hash `419d...1611`, come risultato. Se diamo questo commitment a qualcun altro, possiamo poi scegliere di rivelare i valori $m, r$. Quella persona potrà quindi verificare che il nostro commitment corrisponda al nostro messaggio originale $m$.

I commitment sono molto comuni nei protocolli crittografici perché ci permettono di (a) vincolarci ai valori e (b) nasconderli. In particolare, sono una delle componenti chiave di ZKBoo.

### Condivisione del segreto

Un'altra componente chiave di ZKBoo è la _condivisione del segreto_. L'idea chiave è dividere un segreto in più parti, in modo da non poterlo ricostruire senza avere tutte le parti.

Se abbiamo un valore $x$, possiamo dividerlo come segue:
$$x = x_1 + x_2 + x_3$$
Dove $x_1, x_2, x_3$ sono valori scelti casualmente la cui somma è $x$.

Se diamo i valori $x_2$ e $x_3$ a qualcuno, questo non ci rivela nulla su cosa siano $x$ o $x_1$. Per esempio, se ho $7 = 4 + 2 +1$ con $x=7, x_1=4$ e ti do $2$ e $1$, non c'è modo per te di scoprire quale sia x. Potremmo avere $x=4, x_1 = 1$, $x = 5, x_1=2$, ecc. [^14]

Nel contesto di ZKBoo, questo tipo di condivisione del segreto delle variabili è chiamato anche _MPC-in-the-Head_. MPC sta per multi-party computation (calcolo multi-party) [^15], e tradizionalmente è composto da più attori (persone, server) che si riuniscono per eseguire insieme un calcolo. Anche se l'MPC può diventare piuttosto complesso, in questo caso è "in the head" ("nella testa"), quindi lo stiamo semplicemente simulando nella nostra testa. Puoi immaginare di avere tre attori dentro la tua testa, a ciascuno dei quali dai una quota (share) del segreto. Puoi visualizzare queste quote del segreto come pezzi di un puzzle, e te ne servono tutte per vedere l'immagine completa [^16]:

![Puzzle](../assets/03_puzzle.png 'Puzzle')

### Protocollo sigma

Combinando i commitment e la condivisione del segreto in un cosiddetto _protocollo sigma_, abbiamo tutti gli ingredienti di cui abbiamo bisogno per ZKBoo. Un protocollo sigma è un protocollo composto da due parti, un Prover e un Verifier. Si scambiano tre messaggi, nel seguente ordine: commitment, challenge (sfida) e risposta.

$$
\begin{array}{c}
\textbf{Un protocollo sigma} \\[10pt]
\text{Prover} \xrightarrow{\text{1. Commitment}} \text{Verifier} \\[10pt]
\text{Prover} \xleftarrow{\text{2. Challenge}} \text{Verifier} \\[10pt]
\text{Prover} \xrightarrow{\text{3. Risposta}} \text{Verifier} \\[15pt]
\end{array}
$$

Poiché consiste in interazioni fra due parti, è anche un _protocollo interattivo_. Si chiama protocollo sigma perché l'interazione ricorda la lettera greca sigma, $\Sigma$ [^17]. Un protocollo sigma permette a un Prover di convincere, in modo interattivo, un Verifier che una certa asserzione è vera, senza rivelare alcuna informazione segreta. Puoi pensarlo come una ZKP primitiva.

Impegnandosi prima su alcuni valori, il Prover non può più cambiare idea su quei valori. Successivamente, il Verifier sfida il Prover con una domanda insidiosa. Il Prover risponde, e se il Verifier è soddisfatto della risposta, ne è convinto.

Esistono molti protocolli sigma diversi [^18]. In generale, hanno tutti le seguenti proprietà chiave [^19]:

- **Completezza**: se un Prover conosce la soluzione di un insieme di vincoli, può sempre convincere il Verifier
- **Solidità**: il Verifier è convinto solo se il Prover conosce davvero il segreto; se il Prover tenta di imbrogliare, la probabilità di riuscirci è trascurabile
- **Conoscenza zero:** il Verifier non apprende nulla sul segreto del Prover, se non che ha una soluzione valida

Quanto detto sopra potrebbe sembrare un po' astratto, ma diventerà molto più concreto una volta che avremo visto come viene usato in pratica per ZKBoo.

Seguono alcuni semplici esercizi per verificare la tua comprensione.

### Esercizi

1. In $x + 1 = y; y + 5 = z$, se $x$ è qualcosa che il Prover vuole mantenere segreto, qual è la variabile witness e l'output pubblico?
2. Perché l'ordine dei vincoli non ha importanza? Cosa succede se scambiamo l'ordine dei due vincoli riportati sopra?
3. Alice si impegna su un numero usando `SHA256(x || r)`. Se in seguito afferma di essersi impegnata su 42, come può dimostrarlo?
4. Se Bob divide `x=12` in 3 quote tali che $x_1 + x_2 + x_3 = x$, qual è un possibile insieme di valori per $(x_1, x_2, x_3)$? Perché rivelare $x_2$ e $x_3$ non ci dà alcuna informazione su $x$?
5. In un protocollo sigma, perché il Prover deve impegnarsi prima che il Verifier invii il challenge?

## ZKBoo

_In questa sezione spieghiamo come funziona ZKBoo. Costruiamo gradualmente: da un singolo vincolo di addizione, a più vincoli, fino a un protocollo interattivo completo. Poi lo rendiamo statisticamente solido e, infine, lo rendiamo non interattivo._

ZKBoo è un semplice protocollo ZKP. Si basa su circuiti booleani, commitment, condivisione del segreto (MPC-in-the-Head) e protocolli sigma. Attualmente non è molto usato in pratica, principalmente perché si preferiscono sistemi di dimostrazione con prove più piccole [^20]. Allora perché impararlo?

È concettualmente molto semplice. Questo significa che puoi capire tutta la matematica che c'è dietro e implementarlo tu stesso. Non richiede né matematica avanzata né molta crittografia per essere compreso a fondo. Questo lo rende ideale per sviluppare l'intuizione su come funziona in pratica la matematica alla base delle ZKP. Una volta compreso un protocollo ZKP nel dettaglio, è molto più facile confrontarlo con altri protocolli ZKP. Lo vedremo verso la fine dell'articolo e nei prossimi articoli. Questo ti aiuterà a prendere decisioni informate su quale protocollo ZKP usare e in quali circostanze.

### Dividere le nostre variabili con la condivisione del segreto

Ricorda il sistema di equazioni visto in precedenza:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

Per semplificare, concentriamoci sulla dimostrazione di $c + d = e$, dove $c,d$ sono privati, mentre $e$ è pubblico. Usando la condivisione del segreto, dividiamo ogni variabile in tre quote casuali:

$$
\begin{aligned}
c &= c_1 + c_2 + c_3 \\
d &= d_1 + d_2 + d_3 \\
e &= e_1 + e_2 + e_3 \\
\end{aligned}
$$

Le quote devono preservare la relazione $c + d = e$, ossia $c_i + d_i = e_i$ per ogni $i$. Nel paradigma MPC-in-the-Head, ogni colonna con pedice $_1, _2, _3$ corrisponde a un "attore" nella tua testa, che detiene parte del segreto. Possiamo visualizzare le quote del segreto nel seguente formato tabellare:

$$
\begin{array}{c|ccc}
 & \text{Colonna 1} & \text{Colonna 2} & \text{Colonna 3} \\ \hline
\text{Riga 1} & c_1 & c_2 & c_3 \\
\text{Riga 2} & d_1 & d_2 & d_3 \\
\text{Riga 3} & e_1 & e_2 & e_3 \\
\end{array}
$$

Ecco come dividiamo queste variabili per ottenere questo risultato:

- Per la prima riga, generiamo casualmente $c_1, c_2, c_3$ tali che $c_1 + c_2 + c_3 =c$
- Per la seconda riga, facciamo lo stesso per $d_1, d_2, d_3$ e $d$
- Per la terza riga, poniamo $e_1 = c_1 + d_1$, $e_2 = c_2 + d_2$ ed $e_3 = c_3 + d_3$, garantendo che $e = e_1 + e_2 + e_3$

Se il Verifier sfida il Prover a rivelare due colonne casuali, per esempio $(2,3)$, verifica che:

$$
\begin{aligned}
c_2 + d_2 \stackrel{?}{=} e_2 \\
c_3 + d_3 \stackrel{?}{=} e_3
\end{aligned}
$$

Poiché le quote sono generate casualmente, rivelare due colonne non fornisce alcuna informazione su $c, d$, pur dimostrando che la relazione è valida.

D'ora in poi non costruiremo più esplicitamente la tabella con righe e colonne, ma potrai sempre disegnarla da solo. Ricorda soltanto che una colonna corrisponde a una quota.

### Protocollo sigma per ZKBoo

In quanto Prover, vuoi convincere il Verifier che conosci $c$ e $d$ che soddisfano l'equazione riportata sopra, senza rivelarli. Ecco come ci riusciremo, con un protocollo sigma.

6. Il Prover si impegna su ciascuna colonna, $1..3$, e invia i commitment al Verifier
7. Il Verifier sfida il Prover chiedendogli di rivelare due colonne, $(i, j)$
8. Il Prover risponde con i valori delle colonne richieste dal Verifier

Una volta che il Verifier dispone di questi valori, effettua due verifiche:

- Verifica di coerenza: controlla che i valori tornino, ad es. $c_i + d_i = e_i$
- Verifica del commitment: controlla che i commitment corrispondano ai valori forniti dal Prover nella risposta

Se entrambe le verifiche vanno a buon fine, il Verifier è ragionevolmente convinto [^21] che il Prover conosca $c$ e $d$. Quando si impegna, il Prover usa anche un po' di casualità per garantire che non si possa risalire per forza bruta ai valori. Sfruttando le proprietà di hiding dei commitment e della condivisione del segreto, il Prover non rivela nulla su $c$ e $d$ stessi.

Ecco un diagramma di questo protocollo sigma:

$$
\begin{array}{c}
\textbf{Prover \hspace{4cm} Verifier} \\
\xrightarrow{\text{Commitment: } \{\text{com}_1, \text{com}_2, \text{com}_3\}\ \text{ dove } \text{com}_k = \text{hash}(c_k, d_k, e_k, r_k) \text{ per } k =1,2,3} \\
\xleftarrow{\text{Challenge: Rivelare due colonne } (i, j)} \\
\xrightarrow{\text{Risposta: } (c_i, d_i, e_i, r_i), (c_j, d_j, e_j, r_j)} \\
\text{Il Verifier verifica:} \\
\begin{aligned}
9. &\quad c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j, \\
10. &\quad \text{com}_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, \text{com}_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j).
\end{aligned}
\end{array}
$$

In questo modo otteniamo le tre proprietà a cui teniamo:

- Completezza - il Prover conosce una soluzione e può sempre convincere il Verifier
- Solidità - il Verifier è convinto solo se il Prover conosce davvero il segreto (vedremo tra poco il caso in cui il Prover sta imbrogliando)
- Conoscenza zero - il Verifier non apprende nulla su $c$ e $d$ (a parte che sommati danno $e$)

Sebbene impegnarsi sui valori colonna per colonna significhi che il Prover non può cambiare idea in seguito sul contenuto di quelle colonne, restano comunque alcuni problemi. E se il Prover indovinasse con quali colonne lo sfiderà il Verifier? Ci sono solo tre opzioni possibili: $(1,2), (1,3), (2,3)$. Se così fosse, potrebbe imbrogliare assicurandosi soltanto che quelle colonne tornino, senza conoscere $c$ e $d$. Questo significa che c'è una probabilità di ben $\frac{1}{3}$ di imbrogliare!

Questo riguarda la natura statistica della _solidità_. Nella pratica crittografica, le probabilità svolgono spesso un ruolo nel garantire la sicurezza. L'obiettivo è ridurre il rischio di imbroglio a un livello trascurabile (anzi, astronomicamente trascurabile). Vedremo presto come farlo, usando più round del protocollo.

Ma prima, vediamo come gestiamo la moltiplicazione e i vincoli multipli.

### Supportare la moltiplicazione

Torniamo al nostro insieme originale di vincoli:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

L'addizione, come $c+d=e$, era abbastanza semplice. E la moltiplicazione? Vogliamo scomporre la relazione $a \cdot b = c$ in quote del segreto. Come possiamo farlo?

Notiamo innanzitutto quanto segue. Se dividiamo ingenuamente $a, b, c$ e poniamo $c_i = a_i \cdot b_i$, questo non funziona. Perché?

$$
\begin{aligned}
a \cdot b & = (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) \\
&= a_1 b_1 + a_1 b_2 + a_1 b_3  + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 \\
&\neq a_1 b_1 + a_2 b_2 + a_3 b_3
\end{aligned}
$$

Questo accade perché la moltiplicazione non è lineare, quindi otteniamo termini incrociati:

$$
a_1b_2, a_1b_3, a_2b_1, a_2b_3, a_3b_1, a_3b_2
$$

Dobbiamo trovare un modo migliore di assegnare $c_i$ per mantenere coerenti le relazioni. Possiamo farlo distribuendo in modo uniforme i termini incrociati su ciascuna quota [^22]:

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 \\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 \\
\end{aligned}
$$

Ora la relazione vale. Abbiamo:

$$
\begin{aligned}
a \cdot b &= (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) = \dots = c_1 + c_2 + c_3 = c
\end{aligned}
$$

C'è però un nuovo problema. Rivelando due colonne, diciamo $(1,2)$, lasciamo trapelare informazioni sulla terza. Con $(1,2)$ riveliamo alcune informazioni sulla terza colonna attraverso i fattori $a_2 b_3 +a_3 b_2$. A seconda di cosa rappresentano i valori, il Verifier potrebbe essere in grado di dedurre quali siano $a_3$ e $b_3$.

Possiamo aggirare il problema aggiungendo un po' di casualità:

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 + r_1 - r_2\\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 + r_2 - r_3 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 + r_3 - r_1 \\
\end{aligned}
$$

Ora, abbiamo ancora $c = c_1 + c_2 + c_3$, perché tutte le variabili casuali si annullano a vicenda:

$$
r_1 - r_2 + r_2 - r_3 + r_3 - r_1 =0
$$

Aggiungendo un po' di casualità, non riveliamo alcuna informazione sulla terza colonna. Stiamo quindi usando la casualità per mascherare informazioni sensibili, un trucco comune nella crittografia.

Dove "appartengono" $r_1, r_2, r_3$? Li aggiungiamo come un'altra variabile. In forma di tabella con righe e colonne, abbiamo:

$$
\begin{array}{c|ccc}
 & \text{Colonna 1} & \text{Colonna 2} & \text{Colonna 3} \\ \hline
a & a_1 & a_2 & a_3 \\
b & b_1 & b_2 & b_3 \\
r & r_1 & r_2 & r_3 \\[6pt]
c & c_1 & c_2 & c_3 \\
\end{array}
$$

dove $c_1$, $c_2$ e $c_3$ sono impostati come sopra. Nota come rivelare le colonne $(1,2)$ riveli $r_1$ e $r_2$ ma lasci $r_3$ sconosciuto, mascherando così il valore della terza colonna.

### Mettere tutto insieme

Infine, per combinare quanto visto sopra con l'insieme originale di vincoli:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

In quanto Prover:

- Impostiamo casualmente le quote di $a, b, d$, come sopra
- Impostiamo $c$ in modo che $a \cdot b = c$, e lo stesso vale per tutte le quote
- Impostiamo $e$ in modo che $c+d=e$, e analogamente per tutte le sue quote

Ecco il nostro protocollo sigma aggiornato con commitment-challenge-risposta:

$$
\begin{array}{c}
\textbf{Prover \hspace{4cm} Verifier} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{ dove } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ per } k = 1,2,3} \\
\xleftarrow{\text{Rivelare due colonne } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

Il Verifier esegue (a) verifiche di coerenza e (b) verifiche del commitment.

Verifica di coerenza per ogni vincolo:

- Verifica $a \cdot b = c$ per le quote:
  - $c_i \stackrel{?}{=} (a_i b_i + a_i b_j + a_j b_i) + (r_i - r_j)$,
  - $c_j \stackrel{?}{=} (a_j b_j + a_j b_k + a_k b_j) + (r_j - r_k)$
  - Nota che i pedici $i, j, k$ di $r$ sono $\mod 3$
- Verifica $c + d = e$ per le quote: $c_i + d_i \stackrel{?}{=} e_i, \quad  c_j + d_j \stackrel{?}{=} e_j$

Verifiche del commitment:

- $com_i \stackrel{?}{=} \text{hash}(a_i, b_i, c_i, d_i, e_i, r_i), \quad com_j \stackrel{?}{=} \text{hash}(a_j, b_j, c_j, d_j, e_j, r_j)$

Qui sopra, $r_k$ corrisponde alla $k$-esima colonna, che non viene rivelata. A seconda di come eseguiamo più round del protocollo, questo valore può essere rivelato oppure no. Verifichiamo comunque $c_i$, poiché le colonne $i$-esima e $j$-esima vengono rivelate.

Con questo, abbiamo dimostrato un insieme di vincoli usando addizione e moltiplicazione, mostrando così la completezza funzionale. L'abbiamo fatto in un modo che ha mantenuto privati i valori privati e ha convinto il Verifier che il Prover li conosce. Vedremo ora come migliorare la solidità, eseguendo il protocollo su più round.

### Migliorare la solidità

Diamo un'occhiata più critica al protocollo sigma che abbiamo specificato sopra. E se il Prover imbrogliasse? Supponiamo che indovini che il Verifier sceglierà le colonne $(2,3)$. A quel punto non deve realmente conoscere i valori privati. Per esempio, in $c +d =e$ non deve conoscere $c$ o $d$, $c_1$ o $d_1$. Può semplicemente inventarsi dei valori che facciano passare la _verifica di coerenza_. Questo perché il Verifier controlla solo la seconda e la terza colonna.

Ricorda le verifiche che il Verifier esegue:

- Verifica di coerenza: $c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j$
- Verifica del commitment: $com_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, com_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j)$

Più concretamente, possiamo semplicemente scegliere valori casuali per $c_2, d_2$ tali che $c_2 + d_2 = e_2$, e lo stesso per $c_3, d_3$. Questo non richiede alcuna conoscenza di $c$ o $d$. Supponendo che il Prover pensi che verrà scelta $(2,3)$, allora il Verifier verifica solo che $c_2 + d_2 = e_2$ e $c_3 + d_3 = e_3$. Questo non va bene.

Naturalmente, grazie ai commitment, il Prover non può cambiare idea. Se non avessimo questa verifica del commitment, potrebbe imbrogliare ogni singola volta. È per questo che abbiamo bisogno della proprietà di binding dei commitment, ed è per questo che il commitment viene comunicato _prima_ che il Verifier decida quali quote esaminare.

Qual è la probabilità di indovinare correttamente? Ci sono tre modi di scegliere due colonne: $(1,2), (1,3), (2,3)$. Questo significa che c'è una probabilità di $\frac{1}{3}$ di imbrogliare [^23]. È quello che chiamiamo _errore di solidità_. Vorremmo ridurre questo errore a una probabilità molto più piccola.

Come possiamo farlo? Si scopre che possiamo farlo eseguendo il protocollo sigma su più round. Ogni volta il Verifier sceglie un nuovo insieme di due quote casuali. Naturalmente, dopo che il Verifier ha scelto, ad esempio, $(1,2)$ e $(2,3)$, conosce i valori di tutte e tre le quote e può facilmente ricostruire i valori originali di $c$ e $d$, il che non va bene.

Il modo in cui aggiriamo questo problema, mantenendo comunque bassa la probabilità di imbrogliare, è creare nuove quote del segreto a ogni round. Per una data variabile, la dividiamo come $x = x_1 + x_2 + x_3$, dove $x_1, x_2, x_3$ sono valori casuali che soddisfano l'equazione. Facciamo questo per ogni variabile. Il Verifier invia il challenge, chiedendo due quote, ed esegue le verifiche di coerenza e del commitment. Nel round successivo, usiamo ancora nuove quote casuali per dividere le nostre variabili. In questo modo, il Verifier non può combinare le informazioni ricevute nei diversi round, perché tutto ciò che vede sono quote casuali diverse.

Con questo, qual è la probabilità di imbrogliare? Per il vincolo di addizione sopra, a ogni esecuzione la probabilità è $\frac{1}{3}$, e se facciamo $n$ esecuzioni otteniamo:

$$
\left(\frac{1}{3}\right)^n
$$

Se $n$ è sufficientemente grande, la probabilità di imbrogliare è trascurabile. Per esempio, se eseguiamo 100 round otteniamo una probabilità di $(\frac{1}{3})^{100} \approx 10^{-48}$. Questo è estremamente basso. Per maggiore sicurezza, possiamo semplicemente eseguire più round. Per maggiori dettagli sull'errore di solidità, vedi la nota [^24].

Sebbene questo sia molto più sicuro, richiede molte interazioni tra il Prover e il Verifier. Per ogni round dobbiamo inviare 3 messaggi, e per 100 round sono 300 messaggi avanti e indietro! Questo non è molto pratico nel mondo reale. Per affrontare il problema, vediamo come possiamo rendere questo protocollo non interattivo, riducendolo a un singolo messaggio con l'uso della _trasformazione di Fiat-Shamir_.

### Trasformazione di Fiat-Shamir

Siamo riusciti a rendere il protocollo statisticamente sicuro eseguendo più round. Ecco il protocollo sigma che avevamo per un singolo round:

$$
\begin{array}{c}
\textbf{Prover \hspace{4cm} Verifier} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{ dove } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ per } k = 1,2,3} \\
\xleftarrow{\text{Rivelare due colonne } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

L'obiettivo della _trasformazione di Fiat-Shamir_ è trasformare questo _protocollo interattivo_ in uno _non interattivo_, in cui il Prover invia un unico messaggio, una prova, e il Verifier ha tutte le informazioni di cui ha bisogno per verificare la prova.

Perché mai il Verifier invia il challenge dopo i commitment? Perché non vuole che il Prover cambi idea e imbrogli scegliendo le colonne autonomamente. Questo comprometterebbe la _solidità_. Dal punto di vista del Prover, questa selezione è casuale. Possiamo ottenere questa casualità da qualche altra parte? Senza che sia il Verifier a generarla?

Entra in gioco la _trasformazione di Fiat-Shamir_. L'idea chiave è sostituire la casualità utilizzata dal Verifier con una funzione di hash deterministica. Poiché le funzioni di hash sono pseudo-casuali [^25], possiamo usarle per generare un numero casuale, che viene poi utilizzato per selezionare casualmente due colonne.

A grandi linee, invece di questo:

$$
\begin{array}{c}
\textbf{Un protocollo sigma} \\[10pt]
\text{Prover} \xrightarrow{\text{1. Commitment}} \text{Verifier} \\[10pt]
\text{Prover} \xleftarrow{\text{2. Challenge}} \text{Verifier} \\[10pt]
\text{Prover} \xrightarrow{\text{3. Risposta}} \text{Verifier} \\[15pt]
\end{array}
$$

Facciamo così:

$$
\begin{array}{c}
\textbf{Un protocollo non interattivo} \\[10pt]
\text{Prover} \xrightarrow{\text{\{Commitment, Challenge e Risposta\}}} \text{Verifier} \\[15pt]
\end{array}
$$

Il challenge dovrebbe essere prodotto con un hash e includere i commitment oltre a qualche informazione pubblica. È qualcosa su cui Prover e Verifier concordano silenziosamente, non qualcosa che il Prover può decidere da solo. Anzi, non abbiamo nemmeno bisogno di inviare il challenge, dato che può essere calcolato da entrambe le parti. Il Prover crea i commitment, calcola i challenge e le risposte (tutto localmente) e li invia al Verifier. Il Verifier annota quindi i commitment, ricalcola il challenge da solo e verifica risposte e commitment.

Come viene calcolato il challenge? Perché funziona? Come input per il nostro hash usiamo alcune informazioni pubbliche, che fungono da "seed (seme) casuale" [^26], il cui output non è controllato né dal Prover né dal pubblico. Questo significa che non dobbiamo comunicare questa informazione, ma possiamo semplicemente calcolare questa fonte di casualità in autonomia. Ecco come potrebbe apparire il challenge in pratica:

$$
\text{challenge} = \text{hash}(com_1, com_2, com_3, \text{<public info>})
$$

Aggiungendo alcune informazioni pubbliche `<public info>`, come il nome del circuito (ad es. `zkboo-example`) e l'input pubblico (ad es. il valore di e, `5`), il Prover non controlla da sé tutto l'input della funzione di hash. È inoltre fondamentale includere tutti i commitment come input di questa funzione di hash, in modo che il Prover non possa cambiare idea su ciò a cui si è impegnato. Poiché le funzioni di hash come SHA256 sono deterministiche, il Verifier ricreerà lo stesso challenge, purché abbia accesso a tutto il suo input.

Nel nostro caso, il Verifier sceglie due colonne $(i,j)$ su 3. Ci sono tre possibilità, quindi possiamo semplicemente prendere il nostro hash casuale ed eseguire $\mod 3$ su di esso per ottenere una selezione delle colonne in modo deterministico.

Se eseguiamo un solo round, per il Prover è piuttosto facile imbrogliare semplicemente indovinando quali colonne verranno scelte, creando i commitment e calcolando il challenge. Se il challenge fa sì che "indovini correttamente", allora può creare una prova falsa. Se non ci riesce, può modificare gli input per creare commitment leggermente diversi, e sperare di essere fortunato alla prossima esecuzione dell'hash. Dopotutto, tutto questo avviene in locale, quindi il Verifier non ne è al corrente.

Ecco perché è fondamentale eseguire più round del protocollo. Nello specifico, dobbiamo usare ogni round precedente come input per il challenge del round successivo. Solo così possiamo ottenere le stesse garanzie di solidità [^27].

Per garantire la solidità, il challenge di ogni round deve dipendere da tutti i commitment precedenti. Questo impedisce al Prover di fare "backtracking" per generare risultati favorevoli. Calcoliamo il challenge per il round $k$ come segue:

$$
\text{challenge}_k = \text{hash}(com_{1,1}, com_{1,2}, com_{1,3}, \dots, com_{k,3}, \text{<public info>}, k) \mod 3
$$

Dove $com_{k,i}$ è il commitment per il round $k$-esimo della quota $i$, e `<public info>` è un segnaposto per una conoscenza pubblica condivisa e predeterminata. Aggiungendo $k$ garantiamo che ogni round abbia un challenge univoco, anche se i commitment e le informazioni pubbliche si ripetono. Le informazioni pubbliche fungono da fonte fissa di casualità, il che significa che né il Prover né il Verifier controllano l'output dell'hash. Infine prendiamo $\mod 3$ per farlo corrispondere a una scelta di colonne $(i, j)$.

Il Prover invia i commitment e le risposte per tutti i round. Tutte queste informazioni compongono la prova $\Pi$. Il Verifier ricalcola i challenge per ogni round, verifica le risposte e i commitment, e accetta o rifiuta la prova.

$$
\begin{array}{c}
\text{Prover} \xrightarrow{\Pi = \{\text{Commitment: } \{com_{k,1}, com_{k,2}, com_{k,3}\}, \text{Risposte: } \{(c_{k,i_k}, \dots)\}} \text{Verifier} \\[15pt]
\end{array}
$$

Perché funziona? Stiamo usando la proprietà di _binding_ dei commitment per garantire che il Prover non possa cambiare gli input precedenti una volta generato il challenge. Tutti i challenge dipendono dai commitment precedenti e, poiché eseguiamo il protocollo per $k$ round, garantiamo la solidità con altissima probabilità.

Questo è fantastico, e ora ci basta un solo messaggio per convincere un Verifier. C'è però ancora un problema: questo richiede parecchi dati. Nota come ogni prova richieda $3 \cdot k$ commitment, oltre a $n \cdot k$ risposte, dove n è il numero di variabili e $k$ è il numero di round. Se abbiamo un numero significativo di variabili, e se $k$ è all'incirca 100, il risultato è una prova piuttosto grande.

Sfortunatamente, con gli strumenti che abbiamo a disposizione non riusciremo a rendere questa prova più _succinta_. Per farlo, dovremo aggiungere altri strumenti alla nostra cassetta degli attrezzi. Ma questo è un discorso per un'altra volta. Ne parleremo verso la fine dell'articolo.

Se sei interessato a come si passa dai circuiti booleani ai circuiti aritmetici, consulta l'Appendice B. Ora vediamo come ZKBoo si inserisce nel più ampio panorama delle ZKP.

### Esercizi

1. In un protocollo sigma con 3 quote, dove due quote vengono rivelate, qual è la probabilità che un Prover che imbroglia riesca a convincere un Verifier in un singolo round? In che modo eseguire più round aiuta?
2. Se il Prover sapesse in anticipo quali colonne un Verifier sceglierebbe, come potrebbe imbrogliare?
3. In Fiat-Shamir, perché fare l'hash di tutti i commitment prima di generare il challenge rende più difficile imbrogliare?

## zkSNARK

_Spiega il collegamento tra la ZKP di cui sopra e gli zkSNARK (Zero-Knowledge Succinct Non-Interactive ARguments of Knowledge, argomenti di conoscenza succinti, non interattivi, a conoscenza zero). Analizziamo ogni proprietà e vediamo come si collega a ZKBoo._

Potresti aver notato che abbiamo chiamato ZKBoo una ZKP (Zero Knowledge Proof, dimostrazione a conoscenza zero) e non uno zkSNARK, un termine che forse hai già sentito nominare. Anche se non tutti usano questi termini in modo corretto [^28], è utile capire a cosa si riferisce ciascuna di queste proprietà.

Colloquialmente chiamiamo le ZKP "prove". Tecnicamente parlando, sono ARgomenti di Conoscenza. La distinzione ha a che fare con la natura della solidità. Abbiamo visto in precedenza come i protocolli sigma ci abbiano dato completezza, solidità e conoscenza zero. Insieme, le proprietà di completezza e solidità ci danno gli "ARgomenti di Conoscenza". In pratica, ci affidiamo alla _solidità computazionale_, il che tecnicamente ne fa un argomento di conoscenza e non una prova. [^29]

Abbiamo già trattato la proprietà di Conoscenza zero: non riveliamo nulla del nostro witness al Verifier. Curiosamente, molti progetti "ZK" e "zkSNARK" in pratica non offrono davvero la proprietà di "conoscenza zero". Un termine più accurato da usare, allora, sarebbe probabilmente _calcolo verificabile_ e (S)NARK, ma suona meno sexy.

Abbiamo già trattato la proprietà non interattiva (la "N" di zkSNARK). Si scopre che possiamo prendere praticamente qualsiasi ZKP e renderla non interattiva usando la trasformazione di Fiat-Shamir. È comune iniziare definendo un protocollo sigma interattivo, per poi renderlo non interattivo in un secondo momento usando Fiat-Shamir.

Infine, la proprietà di cui non abbiamo ancora parlato è la _succintezza_. Questo significa due cose: (a) la prova è breve, e (b) la prova è veloce da verificare. Sfortunatamente, questa è una proprietà che manca a ZKBoo. Per ottenere questa proprietà, avremo bisogno di strumenti matematici più avanzati. In particolare, avremo bisogno di polinomi e di crittografia su curve ellittiche. Approfondiremo questo aspetto in un articolo futuro.

Per maggiori dettagli matematici (ancora informali), vedi l'Appendice C.

Diamo un'occhiata un po' più da vicino alla succintezza e a ZKBoo, per capire meglio cosa sta succedendo.

### Sulla succintezza

Perché ZKBoo non è succinto? Quando parliamo di succintezza, ci riferiamo a due proprietà distinte:

- Dimensione succinta della prova: la prova è breve
- Tempo di verifica succinto: la prova è veloce da verificare

Di solito queste proprietà si presentano insieme, ma le analizziamo separatamente [^30].

Concentriamoci prima su quanto è grande la prova. Abbiamo notato in precedenza che ogni prova richiede alcuni commitment e risposte proporzionali a $n$, dove n è il numero di vincoli, ovvero la dimensione del circuito, $|C|$. Quando diciamo che una prova è breve, ci interessa soprattutto come la dimensione cambi in funzione del numero di vincoli. Per dimensione intendiamo quanti dati devono essere inviati, il che in pratica è correlato al numero totale di byte necessari per rappresentare una prova.

Spesso usiamo la notazione _Big-Oh_ (scritta anche _Big-O_, o "O grande") per descrivere quanto bene si comporta una funzione al crescere del numero di elementi su cui opera [^31]. Nel caso di ZKBoo, la dimensione della prova cresce linearmente con il numero di vincoli, ovvero $O(n)$ in notazione Big-Oh. Per esempio, se il circuito ha $n = 1000$ vincoli, la prova richiede all'incirca 1000 commitment e risposte.

Con la notazione Big-Oh possiamo parlare di ordine di approssimazione senza impantanarci nei dettagli [^32]. Ecco un'illustrazione di alcune classi comuni di complessità:

![Complessità Big-O](../assets/03_bigoh.png 'Complessità Big-O')

Affinché una prova sia succinta, deve idealmente essere "sublineare". Cosa significa sublineare? Tutto ciò che è strettamente "al di sotto" di $O(n)$ nel grafico qui sopra . Per esempio, $O(\log n)$ (logaritmico) oppure $O(1)$ (costante) [^31], [^33].

Intuitivamente, questo significa che, man mano che aggiungiamo altri vincoli, la dimensione della prova aumenta sempre meno. La prestazione migliore è $O(1)$, dove la dimensione della prova resta la stessa indipendentemente dal numero di vincoli.

Che dire del tempo necessario per verificare la prova? Il Verifier deve eseguire verifiche di coerenza per tutti i vincoli. Questo equivale essenzialmente a rivalutare l'intero circuito. Questo significa che il tempo di verifica è lineare, ovvero O$(n)$ dove n è il numero di vincoli $|C|$ . Quindi, ZKBoo non ha un tempo di verifica sublineare. Qui il tempo corrisponde al numero di operazioni che un Verifier deve eseguire, e in pratica è correlato all'effettivo "clock time". Perciò, ZKBoo non ha un tempo di verifica succinto.

Spesso vogliamo la succintezza, perché significa che possiamo dimostrare un calcolo arbitrario in poco spazio (e rapidamente). Perché ZKBoo non ce la offre, e cosa si può fare al riguardo?

Fondamentalmente, il problema è che gli strumenti che stiamo usando sono troppo primitivi. Con il nostro attuale schema di commitment e la condivisione del segreto, dobbiamo rappresentare e valutare tutti i vincoli. Ciò che possiamo fare, invece, è usare i _polinomi_ per comprimere i nostri vincoli in uno spazio più piccolo. Questo porta all'idea degli _schemi di commitment polinomiale_. Ma questa è una storia per un'altra volta.

### Prossimi passi

_Anticipazioni su cosa viene dopo, con polinomi, succintezza, PCS, IOP, confronto; il tutto per una lunga pausa caffè oppure per il prossimo articolo._

Abbiamo visto come costruire una ZKP non interattiva end-to-end con ZKBoo. Questo ci offre un'ottima base per comprendere il panorama più ampio degli zkSNARK.

Ecco alcune cose che ci aspettano più avanti:

- Capire l'importanza dei polinomi e come questi permettano la succintezza
- Generalizzare i commitment in schemi di commitment polinomiale (PCS)
- Generalizzare il protocollo sigma in una polynomial interactive oracle proof (IOP)
- Capire il quadro di riferimento PCS + Poly-IOP per i sistemi ZKP moderni
- Diversi PCS: KZG/FRI/IPA
- Capire i diversi domini: dimostrazione lato server vs lato client
- Comprendere a fondo i diversi assi di valutazione: dimensione del campo, post-quantistico, setup, assunzioni di sicurezza
- Come le blockchain pubbliche possono essere usate per verificare le prove
- Perché gli STARK sono SNARK
- Circuiti strutturati vs non strutturati
- Altre ZKP innovative

Non approfondiremo questi argomenti allo stesso livello, ma ti forniremo risorse sufficienti per sentirti sicuro di poter (a) approfondire ulteriormente, oppure (b) scegliere uno zkSNARK adatto alle tue esigenze specifiche.

### Esercizi

4. Quali proprietà otteniamo da ZKBoo?
5. Perché ZKBoo non è succinto? Intuitivamente parlando.

### Problemi

Questi sono problemi opzionali che richiederanno un po' più di impegno.

6. Implementa più round in SageMath (vedi Appendice A)
7. Implementa Fiat-Shamir in SageMath (vedi Appendice A)
8. Trova alcuni sistemi di dimostrazione di cui hai sentito parlare. Individua in cosa si somigliano e in cosa differiscono tra loro. Confrontali con ZKBoo.

### Conclusione

_Riepilogo di quanto abbiamo trattato._

In questo articolo siamo partiti da una comprensione di base delle ZKP e da un bagaglio matematico minimo. Abbiamo poi introdotto concetti chiave come i circuiti, la completezza funzionale, i commitment, la condivisione del segreto e i protocolli sigma.

Abbiamo poi preso questi concetti chiave e visto come usarli per costruire una ZKP ZKBoo. Abbiamo esaminato un insieme di vincoli e visto come dimostrarli, partendo da un semplice vincolo di addizione. Abbiamo visto come farlo funzionare per più vincoli, e come sfruttiamo la casualità nei vincoli di moltiplicazione. Abbiamo analizzato la sicurezza del protocollo e migliorato la sua solidità eseguendolo più volte. Poi abbiamo reso il tutto non interattivo usando Fiat-Shamir.

Successivamente, siamo entrati un po' più a fondo in alcuni argomenti specifici. Abbiamo visto come generalizzare i circuiti booleani in circuiti aritmetici usando campi finiti, e abbiamo passato in rassegna le proprietà degli zkSNARK e come si applicano a ZKBoo. Abbiamo sviluppato un'intuizione sul perché ZKBoo non raggiunge la succintezza. Infine, abbiamo accennato ad alcuni argomenti più avanzati che potremo esplorare più avanti.

Se vuoi approfondire la tua comprensione, una buona idea è dare un'occhiata agli snippet di codice (Appendice A) e vedere come puoi estenderli o modificarli. Se qualcosa non ti è stato chiaro, non esitare a contattarci! Buona fortuna per il tuo percorso nel mondo ZK, e a presto.

## Ringraziamenti

Grazie a Hanno Cornelius, dmpierre, Aayush Gupta, Adrian Li, Chih-Cheng Liang e r4bbit per aver letto le bozze e aver fornito un riscontro su questo articolo.

### Immagini

- _Big O cheatsheet_ - Eric Rowell, Pubblico dominio, tramite [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Big-O_Cheatsheet.png)

## Appendice A: codice ZKBoo

_Quanto segue è un esempio di codice che implementa ZKBoo in modo conciso in SageMath._

È disponibile un repository di codice qui: https://github.com/oskarth/zkintro-math

Mostra un'implementazione dei vari costrutti specificati sopra in questo articolo. Anche se non è necessario, può essere utile mappare le equazioni matematiche al codice vero e proprio. È implementato in SageMath, un software matematico basato su Python. Si legge sostanzialmente come pseudocodice e ci permette di esprimere in modo conciso la matematica come codice.

Nel repository abbiamo i seguenti esempi:

- `commitments_shares.sage` - commitment e condivisione del segreto di base
- `zkboo_add.sage` - vincolo di addizione di base in ZKBoo
- `zkboo_mul.sage` - vincolo di addizione e moltiplicazione di base in ZKBoo

Estendere quanto sopra per supportare più round e la trasformazione di Fiat-Shamir è per ora lasciato come esercizio al lettore.

Nel complesso, il protocollo ZKBoo può essere espresso comodamente in meno di 100 righe di codice [^34]. Una volta che esiste un prototipo matematico in Sage, diventa molto più facile poi "portarlo" su qualcosa come Python, JavaScript, Rust o Go per un uso nel mondo reale.

Lo snippet di codice seguente (`zkboo_mul.sage`) mostra la completezza funzionale per un round di ZKBoo interattivo in 60 righe di codice con i commenti. Può essere esteso per usare più round e reso non interattivo con Fiat-Shamir in meno di 100 righe di codice.

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

## Appendice B: circuiti aritmetici

_Questa sezione spiega come generalizzare i circuiti booleani visti sopra ai circuiti aritmetici._

In matematica esiste un ramo chiamato _algebra astratta_. Si occupa di diverse strutture algebriche e delle operazioni definite su di esse. Per esempio, abbiamo cose come l'_insieme dei numeri naturali_ o l'_insieme dei numeri interi_:

$$
\begin{aligned}
\mathbb{N} &= \{1, 2, 3, \dots\} \\
\mathbb{Z} &= \{\dots, -2, -1 ,0, 1, 2, \dots\}
\end{aligned}
$$

Combiniamo questi insiemi con alcune operazioni, come l'_addizione_ o la _moltiplicazione_, che funzionano in un modo particolare. Con questo possiamo parlare di strutture come _insiemi_, _gruppi_, _anelli_ e _campi_. Le definizioni precise di queste strutture per ora non sono così importanti. L'idea chiave è che ogni struttura aggiunge nuove possibilità:

$$
Insieme \subset Gruppo \subset Anello \subset Campo
$$

I campi, in particolare, permettono la _divisione_ (tranne che per lo zero). Questo perché esiste un inverso moltiplicativo per ogni elemento di un campo. Da notare che questo non vale per l'insieme dei numeri interi con addizione e moltiplicazione, indicato con $(\mathbb{Z}, +, \cdot)$ [^35].

Per esempio, l'inverso moltiplicativo di $3$ è $\frac{1}{3}$ (poiché $3 \cdot \frac{1}{3} = 1$), che non esiste in $\mathbb{Z}$, perché non è un numero intero [^36]. Se parlassimo dell'insieme dei numeri reali, $\mathbb{R}$, andrebbe bene perché $0.33...$ vi appartiene, quindi $(\mathbb{R}, +, \cdot)$ è un campo.

I computer, tuttavia, funzionano su hardware e noi operiamo su numeri finiti. Quindi, quando si parla di crittografia, siamo interessati ai _campi finiti_. Cioè, un campo con un insieme finito di elementi. Per esempio:

$$
\mathbb{F}_5 = \{{0, 1, 2, 3, 4}\}
$$

Molti protocolli crittografici richiedono la divisione e un'aritmetica modulare ben definita. Si scopre che possiamo costruire un campo finito restringendolo semplicemente $\mod p$, dove $p$ è un numero primo [^37]. Lo scriviamo sia come $\mathbb{F}_p$ sia come $\mathbb{GF}(p)$. $\mathbb{GF}$ sta per Galois Field (campo di Galois), un altro nome per i campi finiti [^38].

Nell'esempio sopra, se escludiamo $0$ (poiché la divisione per $0$ non è permessa; indicato con $^*$), abbiamo:

$$
\mathbb{F}^*_5 = \mathbb{GF}^*(5) = \{{1,2,3,4}\}
$$

Possiamo vedere che ogni elemento ha un inverso moltiplicativo nell'insieme. Per esempio, $2 \cdot 3 \mod 5 \equiv 1$.

Nel protocollo ZKBoo visto sopra, usiamo $\mathbb{GF}(2)$, il campo finito più semplice, per i circuiti booleani. I circuiti aritmetici generalizzano questo a $\mathbb{GF}(p)$, dove $p$ è un numero primo. Questo significa che tutte le operazioni, addizione e moltiplicazione, vengono eseguite $\mod p$, garantendo che i valori restino all'interno di quel campo. Questo ci permette di lavorare con numeri maggiori di 0 e 1. In questo campo, addizione e moltiplicazione funzionano bene, quindi possiamo eseguire un'aritmetica modulare ben definita. Possiamo usare i numeri interi come ci aspettiamo, purché siano limitati, cioè minori di un numero primo specifico. In pratica, usiamo spesso numeri primi molto grandi [^39]. Questo significa che possiamo esprimere numeri molto grandi e la relativa aritmetica in modo ben definito.

## Appendice C: definizioni matematiche degli zkSNARK

Rendiamo un po' più precisa la sezione qui sopra sugli zkSNARK, pur mantenendola matematicamente informale [^40]. Sentiti libero di saltare questa appendice se sei soddisfatto del testo principale.

**Completezza** - per tutti gli $x, w$ in $C(x,w)$ la probabilità che il Verifier V accetti la prova $P(x,w)$ del Prover è 1. Ovvero:

$$
\forall x, w: C(x,w) = 0 \implies Pr[V(x, P(x, w)) = \text{accept }] = 1
$$

**Solidità** - V accetta la prova $\pi$ $\implies$ P "conosce" $w$ tale che $C(x,w) = 0$, e se la prova $\pi$ è falsa, $Pr[\text{V accetta } \pi] \leq \text{probabilità trascurabile, per esempio }2^{-80}$ [^41]

**Conoscenza zero** - $C(x, \pi$) con la prova $\pi$ non rivela nulla su $w$

**Succintezza** - la prova $\pi$ è "breve" e $V(x, \pi)$ è "veloce" da verificare.

"Breve" ha definizioni diverse, ma di solito significa $\text{len}(\pi) = \text{sublinear}(|w|)$, dove $|w|$ è la dimensione del witness [^33].

"Veloce da verificare" significa $\text{time}(V) = O_{\lambda}((|x|, \text{sublinear}(|C|))$, dove $O_{\lambda}$ significa "ordine di" nella notazione Big-Oh [^31], e $|C|$ è la dimensione del circuito.

A volte un andamento quasi-lineare, per esempio $O(n \log n)$, è accettato come "abbastanza succinto".

**Non interattivo** - È sufficiente che il Prover invii $\pi$ al Verifier per convincerlo; il Verifier può verificare la prova con $x$ e $\pi$. [^42]

## Riferimenti

[^1]: Per laureato STEM si intende chi ha studiato Scienza, Tecnologia, Ingegneria o Matematica in un'università o istituto equivalente.
[^2]: Per esempio usando un motore di ricerca, un LLM (Large Language Model, modello linguistico di grandi dimensioni; per esempio strumenti di IA come ChatGPT), oppure un amico. Per esempio, potresti chiedere a un LLM di spiegarti un concetto specifico con un ELI5 (Explain Like I'm Five, letteralmente "spiegamelo come se avessi cinque anni").
[^3]: L'idea di usare ZKBoo per spiegare le ZKP si deve ad Aayush Gupta, sulla base della sua [precedente esperienza (video)](https://www.youtube.com/watch?v=CGWjjEiLN9w). Puoi anche leggere il [paper originale](https://eprint.iacr.org/2016/163.pdf), anche se risulta un po' ostico. Anche Geometry Research ha un [post](https://geometry.xyz/notebook/paper-speedrun-zkboo) che spiega il protocollo, ma richiede più conoscenze di base per essere compreso.
[^4]: [SageMath](https://www.sagemath.org/) è un sistema matematico costruito sopra Python che ci permette di concentrarci sull'essenziale. Si legge come pseudocodice, traducendo in modo naturale i simboli matematici in codice.
[^5]: Se $a, b$ sono numeri primi grandi, allora è molto difficile ricavarli a partire dall'output pubblico $e$.
[^6]: Si presume che le variabili intermedie siano definite, ma si tratta di un dettaglio implementativo; come sistema di equazioni, è semplicemente un'altra variabile incognita che viene determinata dagli altri vincoli. Per esempio, potremmo scrivere altrettanto bene l'insieme di vincoli sopra come $c+d=e; a \cdot b = c$.
[^7]: Le variabili intermedie sono a volte chiamate anche variabili interne (internal variables), e sono più che altro un dettaglio implementativo. Vale la pena notare che sono note solo al Prover, poiché potrebbero lasciare trapelare informazioni sugli input privati.
[^8]: Esistono diversi modi di esprimere questo insieme di equazioni, come R1CS, Plonkish, ecc. Chiamiamo questo processo _aritmetizzazione_.
[^9]: Anche se non è identico, il concetto di [completezza funzionale](https://en.wikipedia.org/wiki/Functional_completeness) è collegato a quello di [completezza di Turing](https://en.wikipedia.org/wiki/Turing_completeness).
[^10]: Vedi il libro _Elements of Computing Systems (Nisan, 2005_) e il corso associato [From Nand to Tetris](https://www.nand2tetris.org). C'è anche un libro chiamato _But How Do It Know? (Scott, 2009)_ che spiega come funzionano i computer partendo dall'algebra booleana.
[^11]: Interi delimitati da $\mod{p}$ per un certo numero primo $p$. Vedi l'Appendice B per maggiori dettagli.
[^12]: Vedi [Programmare le ZKP: From Zero to Hero](https://zkintro.com/it/articles/programming-zkps-from-zero-to-hero). Non è un requisito, ma potrebbe rendere più chiaro il collegamento tra matematica e codice.
[^13]: Vedi [funzioni di hash crittografiche](https://en.wikipedia.org/wiki/Cryptographic_hash_function) per maggiori dettagli. Esistono molte funzioni di hash di questo tipo, ma SHA256 è una delle più utilizzate.
[^14]: Tecnicamente parlando, dati solo $x_2$ e $x_3$, sia $x$ sia $x_1$ restano indeterminati, il che significa che abbiamo due [gradi di libertà](https://en.wikipedia.org/wiki/Degrees_of_freedom). L'equazione è [sottodeterminata](https://en.wikipedia.org/wiki/Underdetermined_system), perché ci sono più incognite che valori noti.
[^15]: Il [calcolo multi-party](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC) è in realtà un'area distinta dalla ZK. Un modello mentale utile è che l'MPC si occupa di segreti condivisi tra più partecipanti, mentre la ZK si occupa dei segreti di una singola persona.
[^16]: In alternativa, in $x = x_1 + x_2 + x_3$, se conosci $x$ e due delle altre parti puoi ricostruire la terza, dato che $x - x_1 - x_2 = x_3$. Nella metafora del puzzle, questo corrisponderebbe ad avere due pezzi su tre e sapere che aspetto dovrebbe avere l'immagine finale, anche se manca un pezzo.
[^17]: Potresti dover strizzare gli occhi per vederlo: le punte delle frecce in alto e in basso formano la parte superiore e inferiore della Sigma, e la punta della freccia al centro forma la parte centrale.
[^18]: Probabilmente l'esempio più canonico di [protocollo sigma](https://en.wikipedia.org/wiki/Proof_of_knowledge#Sigma_protocols) è la dimostrazione della conoscenza del [logaritmo discreto](https://en.wikipedia.org/wiki/Discrete_logarithm). Anche se è "più semplice", richiede un po' più di basi matematiche per essere compreso. Inoltre non ci avvicina alla comprensione di ZKBoo, quindi omettiamo questo esempio.
[^19]: La maggior parte dei protocolli sigma possiede tutte e tre le proprietà, ma alcuni non hanno la proprietà di conoscenza zero.
[^20]: Le ragioni sono due: ZKBoo è arrivato più tardi rispetto ad altri protocolli, e le sue prove non sono succinte. Ne vedremo di più verso la fine dell'articolo.
[^21]: Vedremo presto più nel dettaglio la nozione di _solidità_.
[^22]: Con tutti i calcoli eseguiti $\mod p$. Vedi l'Appendice B per i dettagli.
[^23]: Nell'esempio del vincolo di moltiplicazione, dato che viene effettivamente verificata una sola colonna, questo significa che la probabilità di imbrogliare, assumendo solo vincoli di moltiplicazione, è $\frac{2}{3}$. Intuitivamente, la maggior parte degli esempi del mondo reale avrebbe un mix di addizione e moltiplicazione, ed è sufficiente che una sola verifica di coerenza fallisca per essere scoperti. Vedi il paper originale per un'analisi più precisa della solidità.
[^24]: Nella pratica, spesso parliamo dell'errore di solidità in termini di _bit di sicurezza_ di un protocollo. Questo indica quanto sia difficile violare un protocollo e quindi quanto sia sicuro. Per ZKBoo, se vogliamo avere 80 bit di sicurezza, dobbiamo eseguire 137 round. Questo può essere calcolato usando $n = \frac{\sigma}{\log_2(3) - 1}$. Vedi il paper per i dettagli.
[^25]: Cioè, appaiono statisticamente casuali nonostante siano generati da un processo deterministico. Vedi [pseudocasualità](https://en.wikipedia.org/wiki/Pseudorandomness).
[^26]: Vedi [seed casuale](https://en.wikipedia.org/wiki/Random_seed).
[^27]: Esistono molti modi per commettere errori con Fiat-Shamir nella pratica, vedi [Fiat-Shamir in the Wild (paper)](https://orbilu.uni.lu/handle/10993/62161), e [How to Prove False Statements (paper)](https://eprint.iacr.org/2025/118).
[^28]: Del tipo "tecnicamente corretto, il miglior tipo di corretto". Per esempio, molti progetti "ZK" non usano effettivamente la proprietà di conoscenza zero!
[^29]: La solidità computazionale significa che uno schema è sicuro contro un avversario con risorse computazionali limitate. Una prova statisticamente solida reggerebbe anche contro un avversario "illimitato". Quest'ultimo caso è più raro nella crittografia del mondo reale. Questo può diventare piuttosto complesso nella letteratura accademica, con diverse nozioni di solidità - computazionale, statistica, simulata, estraibilità ecc. Le sottigliezze di queste distinzioni esulano dall'ambito di questo articolo, e non sono qualcosa di cui la maggior parte delle persone deve preoccuparsi, a meno che tu non voglia diventare un crittografo a tempo pieno.
[^30]: Anche se meno comune, esistono sistemi di dimostrazione che sono succinti solo in una di queste dimensioni. Per esempio, Bulletproofs ha prove succinte ma un tempo di verifica lineare.
[^31]: Questo è un termine della teoria della complessità computazionale. Parliamo di quanto qualcosa sia veloce o lento in funzione del suo input. Potremmo dire che O(1) significa che è "costante", oppure che O(n) significa che è "lineare", ecc. Sublineare significa meno che lineare, per esempio $\sqrt{n}$. Vedi [notazione Big-O](https://en.wikipedia.org/wiki/Big_O_notation) e [Big O Notation Tutorial](https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/) per maggiori dettagli.
[^32]: Per esempio, non importa se dobbiamo eseguire $2 \cdot n$ operazioni oppure $20 \cdot n$ operazioni: queste funzioni sono entrambe $O(n)$, ovvero _dell'ordine di $n$_.
[^33]: Nella pratica, molte prove sono logaritmiche, $O(\log n)$. A volte va bene anche un andamento quasi-lineare, $O(n \log n)$, e viene comunque considerato "abbastanza succinto". Il caso migliore è $O(1)$, ma spesso comporta altri compromessi. Esempi di sistemi di dimostrazione succinti sono Groth16 e Plonk. Anche le costanti contano, specialmente quando si tratta di verifica on-chain. Ma questo esula dall'ambito di questo articolo. Vedi ad esempio le motivazioni per cui Groth16 o i commitment KZG sono spesso usati in Ethereum.
[^34]: Nel senso di esprimere gli algoritmi principali, non di offrire una gestione degli errori completa, una buona API, buone prestazioni ecc.
[^35]: $(\mathbb{Z}, +, \cdot)$ è un _anello_; più precisamente è un _anello commutativo (o abeliano)_ poiché la moltiplicazione è commutativa ($a \cdot b = b \cdot a$).
[^36]: Qui chiamiamo $1$ l'elemento neutro $e$. Esiste sia per l'addizione (di solito 0), sia per la moltiplicazione (di solito 1). Vedi [definizione di campo](<https://en.wikipedia.org/wiki/Field_(mathematics)#Definition>) per saperne di più.
[^37]: E quelli che vengono chiamati campi di estensione primi (prime extension fields), come $p^n$.
[^38]: Nella crittografia applicata e nell'informatica, la notazione $\mathbb{GF}(p)$ è più comune, mentre in matematica pura è più comune $\mathbb{F}_p$. Il nome Galois Field (campo di Galois) è in onore del matematico francese Galois, che li scoprì. Gettò le fondamenta dell'algebra astratta, e morì in duello all'età di 20 anni.
[^39]: Per esempio $2^{255} - 19$. La scelta precisa del numero primo è un argomento più approfondito, con nozioni come la _pairing-friendliness_ (compatibilità con il pairing), specialmente quando si tratta di sistemi crittografici. Vedi per esempio perché è stato scelto BN254 in Zcash.
[^40]: In questa spiegazione saltiamo la nozione di un passaggio di setup di preprocessing $\text{Setup}(C) \rightarrow (pp, vp)$, con i parametri del Prover ($pp$) e i parametri del Verifier ($vp)$. Di solito questo è incluso nelle definizioni, ma non ci serve in ZKBoo.
[^41]: Non entreremo nei dettagli precisi di cosa significhi "conoscere" il witness qui, perché richiede la comprensione di nozioni come la solidità della conoscenza adattiva (adaptive knowledge soundness) e gli estrattori, che non sono necessarie per avere una comprensione concettuale della nozione di solidità statistica. Se vuoi approfondire, il libro di Thaler o i corsi di Boneh sono buone risorse. Vedi anche la nota 29.
[^42]: Così come altre informazioni predeterminate, come l'algoritmo di challenge di Fiat-Shamir, ed eventualmente alcune "verification key", cioè chiavi di verifica (anche se non nel caso di ZKBoo).
