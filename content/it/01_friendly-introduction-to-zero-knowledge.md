---

title: 'Introduzione semplificata alla Zero Knowledge'
date: '2023-07-17'
tags: \['zero-knowledge']
draft: false
layout: PostSimple
slug: "/it/friendly-introduction-to-zero-knowledge"
images: \['../assets/01\_zkp-magic.png']
summary: "Le Zero Knowledge Proofs sono pura magia. Ci permettono di realizzare cose che prima non avremmo nemmeno immaginato. Questo è il primo di una serie di articoli sulle Zero Knowledge Proofs e le loro applicazioni. Vedremo cosa sono, perché dovrebbero interessarci, come funzionano e dove possono essere utilizzate."
translator: 'Silvio Meneguzzo'
------------------------------

_Questo libro è stato tradotto e adattato da Silvio Meneguzzo_

![La magia della ZKP](../assets/01_zkp-magic.png "La magia della ZKP")

## Introduzione

Le Zero Knowledge Proofs (ZKPs, dimostrazioni a conoscenza zero) sono pura magia. Ci permettono di realizzare cose che prima non avremmo nemmeno immaginato.

Cominciamo con alcune citazioni per stuzzicare la curiosità. Alcune vi saranno familiari, altre forse no.

> Ogni tecnologia sufficientemente avanzata è indistinguibile dalla magia.
>
> - Arthur C. Clarke

> La civiltà avanza aumentando il numero di operazioni che possiamo compiere senza pensarci.
>
> - Alfred North Whitehead

> L'ho reso più lungo del solito, soltanto perché non ho avuto il tempo di farlo più breve.
>
> - Blaise Pascal

> La privacy è il potere di rivelarsi al mondo in modo selettivo.
>
> - Un manifesto Cypherpunk

> Il futuro è già qui, semplicemente non è ancora equamente distribuito.
>
> - William Gibson

Tecnologie magiche, progresso della civiltà, brevità di espressione, privacy e un futuro già presente. Ecco, in sintesi, cosa sono le Zero Knowledge Proofs. Ma di cosa stiamo realmente parlando?

Nell'ultimo secolo, computer e internet hanno conquistato il mondo. Queste tecnologie sono ovunque, in tutto quello che facciamo, nel bene e nel male. Su queste fondamenta abbiamo costruito piattaforme, aziende e veri e propri imperi. Parliamo dei giganti MAMAA (Microsoft, Apple, Meta, Alphabet, Amazon). Poi c'è il cuore pulsante del sistema: reti di pagamento, servizi governativi e una miriade di applicazioni B2B che regolano silenziosamente il mondo. Infine, troviamo una moltitudine di altre piccole realtà: app divertenti per modificare immagini, piattaforme per imparare lingue straniere o comunità online.

Quando inserisci dei dati in un qualsiasi servizio online, ti aspetti di ottenere qualcosa in cambio. Può trattarsi di un piccolo obiettivo, come contattare un amico o distrarti dal lavoro, oppure di qualcosa di importante come richiedere un mutuo. Ma che fine fanno davvero questi dati? Non parliamo solo di quelli di cui sei consapevole, ma anche della montagna sommersa di informazioni nascoste. Ciò che desideri accadrà davvero, o ci saranno delle complicazioni, magari oggi o fra un anno?

Chi comprende realmente questi sistemi e le conseguenze del nostro utilizzo? E soprattutto, in che modo questi sistemi utilizzano noi? Certamente qualcuno ne avrà una comprensione maggiore, ma nessuno li conosce tutti fino in fondo, né tantomeno riesce a prevedere come interagiranno, generando conseguenze impreviste.

Come può reagire una persona? Fidandosi. Ma di chi? E perché?

È un problema complesso. Il nostro cervello non si è evoluto per gestire questioni simili. Internet, pur avendoci connesso e semplificato la vita in tanti modi, ha anche creato un discreto caos. In passato, se avevi una conversazione privata, il vento disperdeva le tue parole. Se restavi chiuso fuori casa, chiamavi un fabbro, o al limite forzavi la serratura. Ma con chi parli quando resti escluso dal tuo account Google davanti alla scritta "Accesso negato"? Con nessuno. Ti trovi davanti a un castello invisibile e impenetrabile.

Le ZKPs possono aiutarci. Magari non sempre, non ovunque, e forse non proprio in questo preciso momento. Ma già oggi possono essere applicate in numerosi contesti, e in futuro lo saranno sempre di più. Nel resto di questo articolo cercherò di convincerti del perché e del come. Seguiamo insieme questa magia.

---

## Cos'è una Zero Knowledge Proof?

_Questa sezione introduce il concetto di Zero Knowledge Proof_

Questo è il primo di una serie di articoli sulle Zero Knowledge Proofs e le loro applicazioni. Vedremo cosa sono le Zero Knowledge Proofs, perché dovrebbero interessarci, come funzionano e dove possono essere utilizzate.

Immagina di entrare in un bar e dimostrare di avere più di 18 anni senza rivelare nient’altro, nemmeno il tuo documento con tutte le informazioni personali. Oppure immagina di poter dimostrare di aver pagato correttamente le tasse, senza rivelare dettagli sul tuo reddito o patrimonio. Questi sono esempi concreti di ciò che le Zero Knowledge Proofs (ZKPs) permettono di fare. Il termine _zero knowledge_ ("conoscenza zero") indica semplicemente che non viene rivelata alcuna informazione al di là di quella strettamente necessaria.

Le ZKPs consentono di dimostrare che un’asserzione (statement) è vera senza rivelare nient’altro.

Ma cosa significa in pratica? Consideriamo il classico esempio di "Dov’è Wally". Lo scopo del gioco è trovare Wally in un’immagine grande e affollata. Posso dimostrarti di sapere esattamente dov’è Wally senza rivelarti la sua posizione. Ma come?

Immagina di avere l’immagine di "Dov’è Wally" e un grande foglio di carta, quattro volte più grande dell’immagine stessa. Pratico un piccolo foro nella carta e poi la sovrappongo con cura all’immagine, in modo che Wally sia visibile soltanto attraverso quel foro. In questo modo tu riesci a vedere Wally, ma soltanto lui e nient’altro. Così facendo, capisci che io conosco davvero la posizione di Wally, senza però rivelarti il punto esatto in cui si trova nell’immagine.

![Dov’è Wally](../assets/01_waldo.jpg "Dov’è Wally")

Ovviamente questo è soltanto un esempio giocattolo, ma speriamo possa offrire un’intuizione di come una simile dimostrazione sia possibile. Che cosa stiamo provando, esattamente? E cosa significa questo concretamente? Lo approfondiremo in seguito. Per ora, vediamo più in generale cosa ci permettono le ZKPs.

Le ZKPs consentono di dimostrare affermazioni arbitrarie in modo molto generale. Più nello specifico, permettono di dimostrare qualcosa in modo privato e sintetico.

Come vedremo tra poco, questa caratteristica è incredibilmente potente.

## Perché dovrebbero interessarti?

_Questa sezione spiega perché qualcuno potrebbe interessarsi alle ZKPs, approfondendo aspetti come privacy, compressione e la loro natura general-purpose._

Dopo aver letto la sezione precedente potresti pensare: "Va bene, carino, ma perché dovrebbe interessarmi?". È una reazione più che comprensibile. Anzi, forse non dovrebbe interessarti affatto! Esattamente come potrebbe non interessarti sapere come funzionano i computer, dove ci porterà l’intelligenza artificiale o argomenti simili.

Perché allora _potrebbe_ interessarti? Magari perché sei curioso e vuoi capire come funzionano le ZKPs e quali nuove interazioni possono abilitare. Si tratta di un meccanismo molto generale, e per molte persone che lavorano in questo settore rappresenta un paradigma completamente nuovo, capace di aprire le porte a moltissime possibilità ancora inesplorate. È qualcosa che sta già avvenendo, e sembra proprio che siamo soltanto agli inizi. Nel resto di questa sezione proverò a darti qualche intuizione sul perché e sul come.

Prima di entrare più nel dettaglio, cerchiamo di capire cosa ci offrono le ZKPs ad alto livello. Le ZKPs garantiscono principalmente una o entrambe queste proprietà:

1. Privacy (formalmente nota come conoscenza zero, zero-knowledge)

2. Compressione (formalmente nota come sinteticità, succinctness)

Ma cosa intendiamo esattamente con questi due concetti? Ecco alcuni esempi per comprenderli meglio queste proprietà.

### Privacy

Ci sono tante cose che desideriamo mantenere private. Ecco la definizione di "privato" secondo l’Oxford Dictionary:

> appartenente o destinato esclusivamente all'uso di una determinata persona o gruppo di persone.

Abbiamo conversazioni private, bagni privati, parti intime (private). Segreti aziendali, informazioni personali sensibili, la privacy della nostra casa. Chiavi, porte e serrature.

La privacy è qualcosa di normale che ci accompagna ogni giorno. È strettamente collegata a concetti come sovranità personale, autodeterminazione e indipendenza. Questi principi sono così radicati nella nostra cultura che documenti fondamentali come la _Carta dei Diritti degli Stati Uniti_ e lo _Statuto delle Nazioni Unite_ li riconoscono come diritti essenziali per individui e nazioni. [^1] La privacy è un presupposto fondamentale per la libertà.

In termini più formali, la proprietà della privacy nelle ZKPs viene spesso indicata come _zero knowledge_ (conoscenza zero) o _data hiding_ (occultamento dei dati). [^2] Una ZKP nasconde i dati non essenziali al funzionamento di un’applicazione, vincolandoli (_bound_) esclusivamente ai dati rilevanti per quella specifica applicazione. Questi concetti sono più formali e tecnici, e consentono di garantire la privacy. Dato però che quest'ultima è un concetto più ampio e versatile, per ora continueremo a concentrarci principalmente su di essa.

Nel mondo digitale, chiamato anche cyberspazio (in contrapposizione allo spazio fisico, detto _meatspace_), la privacy è altrettanto essenziale, anche se spesso trascurata. Ecco la definizione di privacy fornita da _A Cypherpunk's Manifesto_:

> La privacy è il potere di rivelarsi al mondo in modo selettivo.
>
> - A Cypherpunk's Manifesto [^3]

Conversazioni, password, informazioni delle carte di credito. Questi sono esempi di ciò che desideriamo mantenere privato quando siamo online. Internet è uno strumento straordinario che ci connette tutti, ma è anche un mare aperto e pericoloso. Ci sono molti estranei e malintenzionati, e mantenere private certe informazioni è vitale. Senza privacy, attività quotidiane come lo shopping online o la messaggistica privata sarebbero impossibili.

Potresti pensare: "Possiamo già mantenere private informazioni come le password, dov'è la novità?". In un certo senso, hai ragione per questi esempi specifici. Dobbiamo però sforzarci di immaginare qualcosa di più per capire fino in fondo quali possibilità apra la privacy programmabile di tipo general-purpose.

Ad esempio, considera come Agostino, nelle sue _Confessioni (400 d.C.)_, trovasse insolito il fatto che il vescovo Ambrogio praticasse la "lettura silenziosa". All'epoca era normale leggere ad alta voce. [^4]

> Quando [Ambrogio] leggeva, gli occhi percorrevano le pagine e il cuore ne coglieva il significato, ma la voce taceva e la lingua restava immobile. Chiunque poteva avvicinarsi liberamente, e gli ospiti non venivano comunemente annunciati. Spesso quindi, quando andavamo a trovarlo, lo sorprendevamo assorto in silenzio in tale lettura, poiché non leggeva mai ad alta voce.

![Lettura silenziosa](../assets/01_silent-reading.jpg "Lettura silenziosa")

Oggi diamo per scontata la lettura silenziosa, al punto da non riuscire quasi a immaginare che sia stato necessario inventarla. In passato, l’idea che ciò che si leggeva potesse essere riservato esclusivamente ai propri occhi era qualcosa di estraneo. Quali altre invenzioni simili potranno emergere nella nostra epoca moderna? Cose che attualmente la maggior parte di noi non riesce neanche lontanamente a immaginare.

Nelle prossime sezioni daremo uno sguardo a come potrebbero apparire queste invenzioni basate sulle ZKPs, sia quelle già esistenti, sia quelle che emergeranno in futuro.

### Compressione

> L'ho reso più lungo del solito, soltanto perché non ho avuto il tempo di farlo più breve.
>
> - Blaise Pascal [^5]

La definizione di comprimere qualcosa è:

> spingere qualcosa in uno spazio più piccolo

Allo stesso modo, la sinteticità è definita come:

> the act of expressing something clearly in a few words

> l'atto di esprimere qualcosa in modo chiaro e conciso

Quando diciamo che le ZKPs possiedono la proprietà di compressione, intendiamo dire che è possibile dimostrare la veridicità di qualcosa con una dichiarazione molto breve (succinct). Ad esempio, possiamo dimostrare che tutti i passaggi di un certo calcolo sono stati eseguiti correttamente. Questo è particolarmente utile quando una risorsa è molto richiesta e costosa. È il caso della blockchain di Ethereum, ma si tratta di una proprietà utile anche in molti altri contesti. Ancora più notevole è il fatto che la dimensione della prova rimanga invariata indipendentemente dalla complessità di ciò che vogliamo dimostrare!

Cosa intendiamo con "prova" e "dimensione della prova"? Si tratta di concetti matematicamente ben definiti e ricchi di sfumature. Nelle prossime sezioni approfondiremo meglio cosa significa una "prova" nel contesto delle ZKPs. Per ora, possiamo considerarla semplicemente come una dichiarazione breve che sappiamo essere vera, o che possiamo in qualche modo verificare come tale.

![Sherlock Holmes](../assets/01_sherlock-holmes.jpg "Sherlock Holmes")

In un classico giallo alla Sherlock Holmes, il detective raccoglie indizi finché non riesce a dimostrare con certezza chi sia l’assassino. Nel gran finale, espone esattamente come è arrivato a questa conclusione. Possiamo considerare questa dichiarazione finale come la "prova". [^6]

In termini più tecnici, questa proprietà si chiama _succinctness_ (sinteticità). [^7] È ciò che consente alla prova di mantenere la stessa dimensione indipendentemente dalla complessità di ciò che vogliamo dimostrare. Nel contesto delle blockchain pubbliche, questa proprietà è legata anche al concetto di _scalabilità_. In blockchain come Ethereum, dove lo spazio disponibile nei blocchi è limitato e costoso, le ZKPs possono rendere le transazioni molto più economiche e veloci. Come? Creando una prova che certifichi che un insiemi di transazioni sono avvenute, e registrando solo quella prova sintetica sulla blockchain, anziché l’intero contenuto delle transazioni. Con le ZKPs, questo processo può essere realizzato in modo estremamente sicuro.

La sinteticità è una proprietà generale e indipendente dal concetto stesso di "blockchain": semplicemente, queste ne traggono particolare beneficio per molte ragioni. In generale, avere una prova breve che qualcosa è vero è estremamente utile. Vediamo alcuni punti di vista per capirne meglio il motivo.

Un modo per comprenderlo è pensare ai _costi di transazione_. [^8] In generale, più bassi sono, maggiore sarà il valore e la ricchezza che possiamo generare. Se le cose da verificare sono poche, o se verificarle diventa più semplice, possiamo agire con maggiore libertà e facilità.

A volte, quando compiliamo un modulo online, ci viene chiesto di inserire due volte la nostra email per confermare che sia corretta. Questo serve a prevenire errori umani e a rendere più affidabile la trasmissione dei dati. Esistono anche meccanismi come i checksum: una cifra aggiuntiva presente nei codici dei pacchi UPS, nei numeri delle carte di credito o nei codici ISBN dei libri, che funziona come un semplice controllo per verificare che tutti i numeri inseriti siano corretti. Ovviamente, questi metodi non proteggono da usi malevoli, ma solo da errori involontari. [^9]

Nei file system dei computer, un _hash_ viene spesso usato per garantire l’integrità dei file. Se anche solo una piccola parte del file viene alterata, l’hash cambia completamente. Essendo sintetico (ad esempio, una stringa di 64 caratteri), l’hash è semplice da conservare e verificare anche se il file originale è molto grande. In questo caso, le funzioni hash garantiscono l’integrità in modo sicuro. Se invece verificassimo l’integrità di un file conservandone una copia completa, il processo sarebbe estremamente inefficiente. Che il file sia grande o piccolo non importa: l’hash mantiene sempre la stessa dimensione. È proprio la sinteticità dell’hash a rendere possibile tutto questo.

### Che cosa sai?

Facciamo un passo indietro rispetto a compressione, sinteticità e prove. Prendiamoci una breve deviazione per parlare di conoscenza, carico cognitivo e fiducia. Alla fine della sezione, collegheremo tutto questo di nuovo alle ZKPs.

Nella vita quotidiana, cosa sai essere vero e perché? Se vedi il sole sorgere ogni giorno, probabilmente ti aspetti che sorga anche domani. Nel mondo moderno siamo perlopiù protetti dalle avversità della natura, ma al contempo dobbiamo affrontare altre preoccupazioni, più moderne. Molte di queste hanno a che fare con le istituzioni con cui interagiamo ogni giorno.

Se riesci a prelevare contanti dalla tua banca ogni giorno, ti aspetti di poterlo fare anche domani? La maggior parte delle persone probabilmente direbbe di sì, ma non è sempre così per tutti. Dipende da molti fattori: dall'affidabilità della banca, dalla stabilità del paese in cui vivi, da eventuali eventi rilevanti nell’economia globale, o dalla tua situazione personale. Tutti questi elementi forniscono indizi, e su quella base prendi una decisione.

Questo è ovviamente un esempio banale, ma la vita ne è piena. Tutto ciò può essere visto come una forma di carico cognitivo. Quanto questo incida dipende dalla tua situazione personale e dalla complessità delle tue interazioni quotidiane. Per esempio, un’azienda prenderà in seria considerazione questi fattori quando stipula un contratto con un’altra parte.

Creiamo meccanismi e regole per gestire questa incertezza: servizi di reputazione, audit indipendenti, sanzioni per scoraggiare comportamenti scorretti, richiesta di accreditamento presso alcune istituzioni fidate, ecc. Tutte queste misure sono in sostanza dei cerotti, tentativi di arrivare al cuore del problema. È davvero ciò che dichiara di essere? Rispetta le regole che abbiamo stabilito? È affidabile e utilizzabile?

Questo carico cognitivo aumenta drasticamente quando si interagisce con più istituzioni, giurisdizioni, aziende e persone. Possono verificarsi effetti a catena: la tua banca fallisce, non riesci a pagare i dipendenti, e di conseguenza la tua attività non riesce a servire i clienti. [^10] Servono più controlli. Più momenti per chiedersi se tutto stia funzionando e cosa potrebbe andare storto.

Concludo questa sezione con una citazione:

> La civiltà avanza aumentando il numero di operazioni che possiamo compiere senza pensarci.
>
> - Alfred North Whitehead [^11]

Per esempio, quando accendi il fornello per cucinare, non devi nemmeno pensare a come accendere un fuoco. È ben diverso dal dover raccogliere la legna, mantenerla asciutta, accendere la fiamma e tenerla viva: un processo lungo e faticoso. In matematica, senza il calcolo infinitesimale, non saremmo mai andati sulla Luna.

![Aldrin, Apollo 11](../assets/01_apollo-aldrin.jpg "Aldrin, Apollo 11")

Grazie alle ZKPs e alle prove sintetiche, possiamo introdurre maggiore certezza e trasparenza in sistemi opachi. Questo diventa ancora più potente quando consideriamo la _composizione_ delle ZKPs: ovvero la possibilità di combinare più prove in una sola, ad esempio tramite aggregazione o ricorsione.

Tutto ciò presuppone che almeno alcune delle regole o dei meccanismi citati, spesso confusi e incoerenti, possano essere tradotti in una forma comprensibile alle ZKPs. Come possiamo riuscirci?

### General-purpose

Ricordiamo che le ZKPs ci permettono di dimostrare asserzioni arbitrarie in maniera general-purpose (generica). Perché questo è importante e in che modo rappresenta un vantaggio?

La differenza tra strumenti esistenti simili e le ZKPs è paragonabile alla differenza tra una calcolatrice e un computer. Una è pensata per svolgere un compito molto specifico, l’altro è general-purpose. È la differenza tra questa macchina calcolatrice [^12] e un computer moderno:

![Pascal's calculator](../assets/01_pascals-calculator2.jpg "Calcolatrice di Pascal")

Ricorda gli esempi specifici che abbiamo usato prima per rappresentare in modo concreto privacy e sinteticità. Una password è un'informazione privata che ti permette di accedere a un servizio [^13]. Nel caso di un hash di un dato in ingresso, come un file, ci offre invece un riferimento sintetico per verificarne l’integrità.

Possiamo rappresentare graficamente una funzione di hash in questo modo:

![Funzione di hash](../assets/01_graphviz-hash.png "Funzione di hash")

Applichiamo una specifica funzione di hash, come SHA256 [^14], su un dato noto. Ad esempio, usando come input la frase "The quick brown fox jumps over the lazy dog" (senza virgolette) e applicando la funzione SHA256, otteniamo l’hash `d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592`. Basta aggiungere un semplice punto alla fine della frase per ottenere un hash completamente diverso: "The quick brown fox jumps over the lazy dog." produce `ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c`.

Anche se la frase cambia solo di poco, gli hash risultanti sono completamente diversi [^15]. Le funzioni di hash sicure sono difficili da “rompere” e possiedono proprietà interessanti. Ad esempio, dato un hash non si può risalire all’input originale. Inoltre, non è facile costruire un messaggio che produca un hash specifico prestabilito. Queste funzioni sono dette _funzioni di hash crittografiche_ [^16].

La funzione SHA256 usata nell’esempio è una funzione crittografica di hash specifica, il cui sviluppo ha richiesto molto tempo e sforzi collettivi. Ma l’hash in sé non dimostra nulla. Ha senso solo se confrontato con qualcos’altro, come l’accesso diretto al messaggio o al file originale.

In modo informale, possiamo considerare una funzione di hash come una prova che un certo messaggio corrisponde a un dato hash. Ma possiamo verificarlo solo conoscendo il messaggio originale. A volte, le persone usano questa tecnica per dimostrare in anticipo di aver scritto qualcosa e fare previsioni. Ad esempio, potrebbero scrivere la frase: "Il 1° aprile 2040, gli alieni atterreranno sul Big Ben a Londra e il numero 25742069 vincerà la lotteria", per poi pubblicare l’hash di quel messaggio, ad esempio su Twitter. Se poi si rivelano avere ragione, possono mostrare il messaggio originale e convincere tutti di essere i nuovi Nostradamus.

Al contrario, possiamo rappresentare una ZKP in questo modo:

![ZKP](../assets/01_graphviz-zkp.png "ZKP")

A differenza della funzione di hash vista prima, ci sono alcune differenze fondamentali:

- Possiamo avere più input pubblici e privati, non solo un singolo input pubblico
- Possiamo usare qualsiasi programma, non solo una funzione crittografica di hash
- Otteniamo una prova autosufficiente che può essere verificata

Nel caso dell’hash, dobbiamo rendere pubblico l’input per verificare che corrisponda all’hash. Con le ZKPs invece possiamo anche usare un _input privato_. L’input privato è qualcosa che solo tu conosci, e che non devi rivelare a nessuno per generare una prova.

Ad esempio, nel caso di "Dov’è Wally" visto all’inizio, l’input pubblico è l’immagine. L’input privato è la posizione di Wally. Posso generare una prova che dimostra che so dove si trova Wally senza rivelarti la posizione.

Allo stesso modo, se ho un Sudoku (un popolare rompicapo logico), posso dimostrarti di conoscere la soluzione senza rivelartela. In questo caso, l’input pubblico è il puzzle iniziale e quello privato è la soluzione.

Avrai notato che "Dov’è Wally" e risolvere un Sudoku sono due problemi molto diversi. Eppure possiamo scrivere un semplice programma che descrive entrambi e usare una ZKP per creare la prova. Questo è possibile perché la logica del programma è general-purpose e può calcolare qualsiasi cosa sia computabile da un computer.

Abbiamo trasformato quello che era un problema di crittografia o matematica (definire e rendere sicura una funzione di hash) in un problema di programmazione. Per capire perchè questo è estremamente potente, considera i seguenti esempi.

Ora possiamo dimostrare di conoscere il dato privato che genera un determinato hash [^17]. Questo significa che puoi dimostrare di possedere un certo messaggio, ad esempio un documento importante, senza rivelarne il contenuto.

Per capire meglio la potenza della computazione general-purpose, guardiamo più da vicino le firme di gruppo. Le _group signature_ permettono a più persone di firmare un documento insieme, senza rivelare chi sono. Ad esempio, i Federalist Papers furono firmati dallo pseudonimo "Publius", che rappresentava più autori [^18]. Come per la funzione SHA256, è possibile rappresentare le firme di gruppo tramite crittografia e matematica. È un risultato straordinario, frutto di grande ingegneria crittografica. Ma con le ZKPs general-purpose, chiunque può esprimere la stessa cosa con poche dozzine di righe in Circom, un linguaggio di programmaione per scrivere ZKPs [^19].

Grazie alla loro natura generale, possiamo costruire facilmente soluzioni su misura. Ad esempio, potresti avere una carta d’identità con nome, indirizzo e altri dati personali. Per accedere a un evento potresti dover dimostrare di avere più di 18 anni e un biglietto valido. Ma potresti non voler mostrare il tuo indirizzo o rischiare che ti venga rubato il documento. Con le ZKPs puoi dimostrare che:

- Possiedi un documento valido
- Il documento è stato emesso da un ente autorizzato negli ultimi 5 anni
- Il documento non è stato revocato o denunciato come rubato nell'ultimo periodo
- Hai più di 18 anni
- Hai acquistato un biglietto valido per l’evento
- Il biglietto non è già stato usato

Tutto ciò senza rivelare nessuna informazione personale oltre a quelle elencate.

Con le ZKPs ora abbiamo a disposizione uno _strumento migliore_ per coordinare persone e sistemi, soprattutto in contesti dove servono _privacy_ e _sinteticità_. Vedremo altri esempi nella sezione dedicata alle applicazioni.

Spesso, il limite di ciò che puoi esprimere è solo la tua immaginazione.


### Why now?

### Perché proprio ora?

Why are ZKPs becoming a thing now? There are both technical and social reasons for this.

Perché le ZKPs stanno diventando così rilevanti proprio adesso? Ci sono motivi sia tecnici che sociali.

Technically, ZKPs are fairly new. Mathematically they've only existed for a few decades [^20]. Similar to computing itself, it then took a while to become performant and practical, even in theory [^21].

Dal punto di vista tecnico, le ZKPs sono piuttosto recenti. Matematicamente esistono solo da qualche decennio [^20]. Come accaduto per l’informatica in generale, ci è voluto del tempo perché diventassero efficienti e praticabili, anche solo a livello teorico [^21].

After that, someone had to take these papers and cryptographic protocols and turn them into something practical. The first notable example of this was Zcash, the privacy-preserving cryptocurrency, in 2016. It started as a paper written by cypherpunks and researchers [^22]. The first version was an impressive feat of research and engineering applied to an end product and system. While the system had many issues and was far from optimal, it was the first real practical example of using ZKPs in the real world. This showed people that it was possible and practical to use ZKPs in the real world. This has led to an explosion of research and engineering efforts in ZKP, especially in recent years.

Successivamente, qualcuno ha dovuto trasformare quei paper e quei protocolli crittografici in qualcosa di pratico. Il primo esempio degno di nota è stato Zcash, la criptovaluta orientata alla privacy, nel 2016. Il progetto nacque da un paper scritto da cypherpunk e ricercatori [^22]. La prima versione fu un’impresa notevole di ricerca e ingegneria applicata a un prodotto e sistema reale. Anche se presentava molte criticità ed era ben lontana dall’essere ottimale, fu il primo esempio concreto di uso delle ZKPs nel mondo reale. Questo dimostrò che era davvero possibile e pratico utilizzare le ZKPs. Da lì è esplosa la ricerca e lo sviluppo in questo campo, specialmente negli ultimi anni.

Public blockchains like Ethereum and Zcash, a privacy-preserving cryptocurrency, had a big role to play in this. What blockchains excel at are things like censorship resistance and transparency[^23]. This comes at the cost of a lack of privacy and scalability, something that ZKPs excel at. In this sense, they are a natural fit. Couple that with the blockchain community's appetite for advanced cryptography [^24], and it is no wonder a lot of the innovation is happening at the intersection between blockchain and ZKPs [^25]. Due to the many well-capitalized blockchain projects, this has also led to more investment into research and engineering in a traditionally more academic space.

Le blockchain pubbliche come Ethereum e Zcash, una criptovaluta orientata alla privacy, hanno avuto un ruolo fondamentale in questo. Le blockchain eccellono in caratteristiche come la resistenza alla censura e la trasparenza [^23]. Tuttavia, tutto questo avviene a scapito della privacy e della scalabilità, esattamente i punti forti delle ZKPs. Da questo punto di vista, la combinazione è naturale. Aggiungiamo anche la forte propensione della community blockchain verso la crittografia avanzata [^24], e non sorprende che molta dell’innovazione si stia concentrando proprio nell’intersezione tra blockchain e ZKPs [^25]. Inoltre, i numerosi progetti blockchain ben finanziati hanno portato a nuovi investimenti in ricerca e sviluppo in un ambito storicamente più accademico.

Considering the complexity involved, spanning applied mathematics, cryptography, papers on specific ZKP systems, implementing novel proof systems, tooling, and applications that touch other complex domains, things are moving extremely fast. Every year - even every month - there are new research papers with novel techniques, improved tooling, and applications. The feedback loop between new research and it being implemented and then used is getting tighter. While still difficult, it is getting easier and easier to get started. As tooling is improved, developers need to understand the math behind ZKPs less and less.

Considerando la complessità in gioco, che spazia tra matematica applicata, crittografia, articoli su sistemi ZKP specifici, implementazione di nuovi sistemi di prova, strumenti di sviluppo e applicazioni che vanno a toccare altri domini complessi, i progressi sono rapidissimi. Ogni anno, persino ogni mese, vengono pubblicati nuovi articoli con tecniche inedite, strumenti migliori e nuove applicazioni. Il ciclo tra ricerca, implementazione e utilizzo si sta facendo sempre più corto. Anche se resta difficile, iniziare oggi è molto più facile di qualche anno fa. E man mano che gli strumenti migliorano, agli sviluppatori è richiesto di comprendere sempre meno la matematica che sta alla base delle ZKPs.

In terms of the performance of ZKPs, there's a form of Moore's law happening. Moore's law is the observation that the number of transistors doubles about every two years. This is what led to the computer revolution. In ZKPs, projects that were just pipe dreams a few years ago, seen as completely unpractical, are now being executed on, things like _zkVM_ and _zkML_. As a rule of thumb, it has been observed in the ZKP world that things improve by an order of magnitude every other year or so [^26]. This is because it is a new technology, and it is possible to aggressively optimize on many layers of the stack, from the programs we write, to the systems we use, to the hardware itself. We have no reason to believe this will stop any time soon.

In termini di prestazioni, nel mondo delle ZKPs sta avvenendo una sorta di legge di Moore. La legge di Moore osserva che il numero di transistor raddoppia circa ogni due anni. Questo è ciò che ha reso possibile la rivoluzione informatica. Nelle ZKPs, progetti che pochi anni fa sembravano pura fantasia, sono oggi eseguiti su cose come _zkVM_ e _zkML_. In linea di massima, si è osservato che i progressi nel campo delle ZKPs migliorano di un ordine di grandezza ogni anno circa [^26]. Questo perché si tratta di una tecnologia nuova, in cui è possibile ottimizzare in modo aggressivo su ogni livello dello stack: dai programmi che scriviamo, ai sistemi che usiamo, fino all’hardware stesso. Non abbiamo motivo di credere che questa tendenza si fermerà a breve.

![Moore's Law](../assets/01_moores-law.png "Legge di Moore")

## How does it work?

## Come funziona?

_This section explains how Zero Knowledge Proofs work at a high level_

_Questa sezione spiega a grandi linee come funzionano le Zero Knowledge Proofs_

This section provides a high-level overview of how ZKPs work. It will not include any mathematics or code.

Questa sezione fornisce una panoramica generale sul funzionamento delle ZKPs. Non conterrà matematica né codice.


### Basics

### Concetti fondamentali

We start by introducing some terminology. There'll be a few new terms to learn, but as we go along, you'll get the hang of it.

Iniziamo introducendo un po' di terminologia. Ci saranno alcuni termini nuovi da imparare, ma li padroneggerai rapidamente man mano che procediamo.

- **Protocol**: system of rules that explain the correct conduct to be followed

- **Protocollo**: sistema di regole che definisce la condotta corretta da seguire

- **Proof**: argument establishing the truth of a statement

- **Prova (Proof)**: argomentazione che dimostra la verità di un’asserzione

- **Prover**: someone who proves or demonstrates something

- **Dimostratore (Prover)**: colui che dimostra o prova qualcosa

- **Verifier**: someone who vouches for the correctness of a statement

- **Verificatore (Verifier)**: colui che verifica la correttezza di un’asserzione

- **Private input**: Input that only the prover can see, often called **witness**

- **Input privato**: input che soltanto il prover può vedere, spesso chiamato **witness** (informazione privata utilizzata nella dimostrazione)

- **Public input**: Input that both prover and verifier can see, often called **instance**

- **Input pubblico**: input che sia prover che verifier possono vedere, spesso chiamato **instance** (istanza)

While it is useful to learn the terminology used in the field, some metaphors can be helpful in getting a better sense of what's going on. We'll introduce more terms as we go.

Pur essendo utile apprendere la terminologia tecnica, a volte le metafore aiutano a capire meglio cosa sta succedendo. Introdurremo ulteriori termini man mano che procediamo.

Protocols exist everywhere and can be implicit or explicit. In the game of chess, the protocol is that you have two players who take turns to play a move according to the rules of the game until the game ends, and one person wins, or there is a draw. In theory, the time it takes to make a move doesn't matter, but in practice, we try to minimize the communication costs between the two parties interacting. We can thus think of it as a really fast game of chess.

I protocolli esistono ovunque e possono essere impliciti o espliciti. Negli scacchi, il protocollo prevede due giocatori che effettuano mosse a turno seguendo le regole fino alla fine della partita, quando uno vince o si raggiunge una situazione di parità. In teoria, il tempo per effettuare una mossa non ha importanza, ma nella pratica si cerca di minimizzare i costi di comunicazione tra le due parti coinvolte. Potremmo quindi immaginare una partita a scacchi rapidissima.

We can think of Sherlock Holmes as the prover, and in his final statement he produces an elegant series of arguments, a proof, that someone is the murderer. This must then be verified by a verifier to be true, for example by a judge or jury, _beyond a reasonable doubt_ [^27]. The 'prover' refers to an entity, here Holmes, producing the proof, which must then be verified. Because the proof is self-contained, anyone can be a verifier, including you as the reader, who must be convinced of the reasoning provided to make the story believable. [^28]

Possiamo immaginare Sherlock Holmes come il prover (dimostratore), che nella sua dichiarazione finale presenta una serie di argomentazioni eleganti, ovvero una prova (proof), per dimostrare chi sia l'assassino. Questa prova deve poi essere verificata da un verificatore (verifier), ad esempio un giudice o una giuria, _oltre ogni ragionevole dubbio_ [^27]. Il dimostratore è colui che produce la prova, in questo caso Holmes, la quale deve poi essere verificata. Poiché la prova è autosufficiente, chiunque può assumere il ruolo di verificatore, incluso tu lettore, che devi essere convinto dalla logica esposta per rendere credibile la storia. [^28]

The private input would be some knowledge that only Sherlock Holmes knows, for example some secret information someone whispered in his ears. This is often confusingly called witness, presumably because a witness in a courtroom has some private information, and this is added to the pile of evidence. In the case of ZKPs, this private information would not be shared with the verifier, or judge and jury in this example.

L'input privato potrebbe essere una conoscenza esclusiva di Sherlock Holmes, ad esempio un'informazione segreta sussurratagli da qualcuno. Questo tipo di informazione è spesso chiamata witness, il che può generare confusione perché richiama il concetto di testimone in tribunale, che possiede informazioni private aggiunte poi al cumulo di prove. Nel caso delle ZKPs, quest'informazione privata non verrebbe condivisa con il verificatore (verifier), ovvero con il giudice e la giuria nel nostro esempio.

ZKPs establish a _protocol_ between a _prover_ and a _verifier_. This protocol is _non-interactive_ if the prover and verifier don't have to interact or communicate directly, like in a game of chess or in a dance. Instead, the prover produces a single self-contained proof, and at some later point, this gets verified. Most ZKPs start off as _interactive_ - that is, requiring multiple back and forths - and we then use some mathematical tricks to make it non-interactive [^29]. You can think of non-interactivity kind of as two chess players who, after uttering a few words, know every single move the other player will play, so they don't even start the game because they already know how it will end.

Le ZKPs stabiliscono un _protocollo_ tra un _dimostratore_ (prover) e un _verificatore_ (verifier). Tale protocollo è _non interattivo_ se prover e verifier non hanno bisogno di comunicare direttamente, come avviene invece in una partita di scacchi o in una danza. Invece, il prover produce una singola prova autosufficiente, che viene verificata successivamente. La maggior parte delle ZKPs iniziano come _interattive_, cioè richiedono uno scambio continuo, ma poi vengono utilizzati alcuni trucchi matematici per renderle non interattive [^29]. Puoi immaginare la non interattività come due giocatori di scacchi che, dopo poche parole, sanno esattamente quali mosse giocherà l'altro, al punto da non iniziare nemmeno la partita perché conoscono già come finirà.

There are many types of ZKPs. We often talk about *zk-SNARK*s, which stands for Zero Knowledge Succinct Non-Interactive ARguments of Knowledge. Zero Knowledge and Succinctness correspond to privacy and compression above, respectively. Non-interactive was mentioned. "ARguments of knowledge" is basically the same thing as a proof [^30]. There are many different types of zk-SNARKs too.

Esistono molte tipologie di ZKPs. Spesso parliamo di *zk-SNARK*s, acronimo di Zero Knowledge Succinct Non-Interactive ARguments of Knowledge. Zero Knowledge e Succinctness corrispondono rispettivamente alla privacy e alla compressione descritte sopra. La non interattività è già stata menzionata. "ARguments of knowledge" corrisponde sostanzialmente a una prova (proof) [^30]. Anche di zk-SNARKs ne esistono numerose varianti.

A good mental model is to think of ZKPs as a zoo. There are a lot of animals there, and we can categorize them in various ways: these animals have four legs, these have stripes, Bob brought these in last year [^31], etc. Some categories are more useful than others. In fact, some of these systems don't even have Zero Knowledge! These are usually called just SNARKs. As a community, we often call this zoo of different animals ZK, even if there are many systems that don't actually use the Zero Knowledge property. [^32]

Un buon modello mentale è pensare alle ZKPs come a uno zoo. Ci sono molti animali diversi e possiamo classificarli in vari modi: questi hanno quattro zampe, questi altri hanno strisce, questi li ha portati Bob l’anno scorso [^31], ecc. Alcune categorie sono più utili di altre. Infatti, alcuni di questi sistemi non hanno nemmeno la proprietà di Zero Knowledge! Questi vengono chiamati semplicemente SNARK. Come comunità, chiamiamo spesso questo variegato insieme di animali semplicemente ZK, anche se molti sistemi in realtà non sfruttano la proprietà Zero Knowledge. [^32]

### Protocol

### Protocollo

Going back to our protocol, we have a prover and verifier. The prover creates a proof using a _prover key_, private input and public input. The verifier verifies the proof using a _verification key_ and public input, and outputs true or false.

Tornando al nostro protocollo, abbiamo un prover (dimostratore) e un verifier (verificatore). Il prover crea una prova usando una _prover key_, l’input privato e l’input pubblico. Il verifier verifica la prova utilizzando una _verification key_ e l’input pubblico, e restituisce come risultato true o false.

We have two new things, a prover key and a verifier key. This is what allows the prover and verifier to do their magic. You can think of them as a regular key that allows you to enter somewhere and do something, or you can think of them as a magic wand that allows you to do something. We get these keys from a special ceremony called a _setup_, which is an initial preparation phase that we won't go into detail about in this article [^33].

Abbiamo introdotto due nuovi concetti: la _prover key_ e la _verifier key_. Queste consentono al prover e al verifier di compiere la loro magia. Puoi immaginarle come chiavi normali che permettono di entrare in un luogo e svolgere un'azione, oppure come bacchette magiche che abilitano determinate operazioni. Queste chiavi derivano da una cerimonia speciale chiamata _setup_, una fase iniziale di preparazione su cui non entreremo nei dettagli in questo articolo [^33].

Notice that only the prover has access to the private input. How does the prover use the prover key, private input and public input to turn it into a proof?

Nota che solo il prover ha accesso all’input privato. In che modo il prover utilizza la prover key, l’input privato e quello pubblico per generare una prova?

Recall the illustration of a ZKP from before:

Ricorda l’illustrazione precedente di una ZKP:

![ZKP](../assets/01_graphviz-zkp.png "ZKP")

We have a special program (formally known as a _circuit_) that encodes the logic a user cares about. For example, proving that they know the data that results in a certain hash value. Unlike a normal computer program, this program is made up of _constraints_ [^34]. We are proving that all the constraints hold together with the private and public input.

Abbiamo un programma speciale (formalmente chiamato _circuit_) che codifica la logica di interesse per l’utente. Per esempio, potrebbe dimostrare di conoscere i dati che generano un determinato valore di hash. Diversamente da un normale programma per computer, questo programma è composto da _vincoli_ (constraints) [^34]. La prova consiste nel dimostrare che tutti questi vincoli vengono soddisfatti insieme all’input privato e pubblico.

Finally, the verifier takes this short proof, combines it with the verification key, public input and the special program with all the constraints and convinces itself beyond a reasonable doubt that the proof is correct and outputs "true". If it isn't correct it'll output "false".

Alla fine, il verifier prende questa prova breve, la combina con la verification key, l’input pubblico e il programma speciale contenente tutti i vincoli, convincendosi _oltre ogni ragionevole dubbio_ che la prova sia corretta e restituisce come risultato "true". In caso contrario restituirà "false".

This is a somewhat simplified view but it captures the essence of what is going on.

Questa visione è leggermente semplificata, ma coglie l’essenza di quello che sta accadendo.


### Constraints

### Vincoli

What are these constraints that make up the special program above? A constraint is a limitation or restriction. For example, "a number between 1 and 9" is a constraint. The number 7 satisfies this constraint, and the number 11 doesn't. How do we write a program as a set of constraints? This is an art on its own, but let's start by looking at a simple example: Sudoku.

Cosa sono questi vincoli (constraints) che compongono il programma speciale di cui abbiamo parlato sopra? Un vincolo è una limitazione o una restrizione. Ad esempio, “un numero compreso tra 1 e 9” è un vincolo. Il numero 7 soddisfa questo vincolo, mentre il numero 11 no. Come si scrive un programma sotto forma di vincoli? Questa è una vera e propria arte, ma partiamo con un esempio semplice: il Sudoku.

In the game of Sudoku the goal is to find a solution to a board that satisfies some constraints. Each row should include the numbers 1 to 9 but only once. The same goes for each column and each 3x3 subsquare. We are given some initial starting position, and then our job is to fill in the rest in a way that satisfies all these constraints. The tricky part is finding numbers that satisfy all the constraints at once.

Nel Sudoku l’obiettivo è trovare una soluzione per una griglia che soddisfi alcuni vincoli. Ogni riga deve contenere i numeri da 1 a 9 esattamente una volta. Lo stesso vale per ogni colonna e per ciascun quadrante 3x3. Viene fornita una configurazione iniziale parziale e il nostro compito è completarla soddisfacendo tutti questi vincoli. La parte difficile sta nel trovare dei numeri che soddisfino contemporaneamente tutti i vincoli.

![Sudoku](../assets/01_sudoku.png "Rompicapo Sudoku")

With ZKPs, a prover can construct a proof that they know the solution to a certain puzzle. In this case, the proving consists of using some public input, the initial board position, and some private input, their solution to the puzzle, and a circuit. The circuit consists of all the constraints that express the puzzle.

Con le ZKPs, il prover può costruire una prova (proof) che dimostri di conoscere la soluzione di un determinato rompicapo. In questo caso, la dimostrazione utilizza come input pubblico la configurazione iniziale della griglia e come input privato la soluzione completa, insieme a un circuito (circuit). Il circuito è costituito da tutti i vincoli che esprimono le regole del rompicapo.

It is called a circuit because these constraints are related to each other, and we wire these constraints together, kind of like an electric circuit. In this case the circuit isn't dealing with current, but with values. For example, we can't stick any value like "banana" in our row constraint, it has to be a number, and the number has to be between 1 and 9, and so on.

Viene chiamato circuito perché questi vincoli sono correlati fra loro e vengono "collegati" insieme, un po’ come in un circuito elettrico. In questo caso il circuito non gestisce corrente elettrica, ma valori. Ad esempio, non possiamo inserire valori casuali come "banana" nel vincolo della riga: deve trattarsi di un numero e quel numero deve essere compreso tra 1 e 9.

The verifier has the same circuit and public input, and can verify the proof the prover sent them. Assuming the proof is valid, the verifier is convinced that the prover has a solution to that specific puzzle.

Il verifier possiede lo stesso circuito e lo stesso input pubblico e può verificare la prova ricevuta dal prover. Se la prova è valida, il verifier sarà convinto che il prover abbia realmente una soluzione al rompicapo.

It turns out that a lot of problems can be expressed as a set of constraints. In fact, any problem we can solve with a computer can be expressed as a set of constraints.

Risulta che molti problemi possano essere espressi come un insieme di vincoli. Infatti, qualsiasi problema risolvibile da un computer può essere espresso come un insieme di vincoli.


### Sudoku example

### Esempio con il Sudoku

Let's apply what we learned about the various parts of a ZKP to the Sudoku example above.

Applichiamo ora quello che abbiamo imparato sulle diverse parti delle ZKPs all’esempio del Sudoku visto sopra.

For Sudoku, our special program, the circuit, takes two inputs:

Per il Sudoku, il nostro programma speciale, ovvero il circuito, prende in ingresso due input:

- A Sudoku puzzle as public input

- Un puzzle Sudoku come input pubblico

- A solution to a Sudoku puzzle as private input

- Una soluzione al Sudoku come input privato

The circuit is made up of a set of constraints. All of these constraints have to be true. The constraints look like this:

Il circuito è composto da una serie di vincoli. Tutti questi vincoli devono essere soddisfatti contemporaneamente. I vincoli sono i seguenti:

- All digits in the puzzle and solution have to be between 1 and 9

- Tutte le cifre nel puzzle e nella soluzione devono essere comprese tra 1 e 9

- The solution has to be equal to the puzzle in all the places where digits are already placed

- La soluzione deve corrispondere al puzzle in tutti i punti in cui le cifre erano già state inserite

- All rows must contain digits 1 through 9 exactly once

- Tutte le righe devono contenere le cifre da 1 a 9 esattamente una volta

- All columns must contain digits 1 through 9 exactly once

- Tutte le colonne devono contenere le cifre da 1 a 9 esattamente una volta

- All subsquares must contain digits 1 through 9 exactly once

- Tutti i quadranti devono contenere le cifre da 1 a 9 esattamente una volta

If all of these constraints are true for a puzzle and its solution, we know that it is a valid solution.

Se tutti questi vincoli sono soddisfatti per un puzzle e la sua soluzione, sappiamo che la soluzione è valida.

A prover Peggy uses her magic prover key, the puzzle and the solution, combines it with the special program and creates a proof. The proof is very short, less than 1000 characters. The proof is self-contained and with it the verifier has all information they need to verify the proof. You can think of it as a magic spell that does what you want, without you having to understand the details of it [^35].

Una dimostratrice (prover) chiamata Peggy utilizza la sua magica prover key, il puzzle e la soluzione, li combina con il programma speciale e crea una prova (proof). La prova è molto breve, meno di 1000 caratteri. È autosufficiente e contiene tutte le informazioni necessarie al verificatore (verifier) per poterla controllare. Puoi pensarla come una formula magica che fa esattamente quello che desideri, senza che tu debba comprenderne i dettagli [^35].

Here's a spell from a book of magic spells, written by a Welsh physician in the 19th century:

Ecco una formula magica tratta da un libro di incantesimi, scritto da un medico gallese nel XIX secolo:

![Magic spell](../assets/01_magic-spell.png "Formula magica")

Here's an example of a Zero Knowledge Proof produced by the Circom/snarkjs library:

Ecco invece un esempio reale di Zero Knowledge Proof generata dalla libreria Circom/snarkjs:

![Circom proof](../assets/01_circom-proof.png "Prova generata con Circom")

Except in this case, the magic actually works.

Solo che in questo caso, la magia funziona davvero.

Victor the verifier uses his verifier key, the original puzzle input, and verifies that the proof Peggy sent is indeed correct. If it is, the output is "true", and if it isn't, the output is "false". The spell either works or it doesn't. With this, Victor is convinced that Peggy knows a solution to that specific puzzle, without actually having seen the solution. Et voilà. [^36]

Victor, il verificatore, usa la sua verifier key e il puzzle originale per verificare che la prova inviata da Peggy sia effettivamente corretta. Se lo è, il risultato (output) sarà "true", altrimenti sarà "false". La formula magica funziona o non funziona, non c’è via di mezzo. In questo modo, Victor è convinto che Peggy conosca la soluzione del puzzle, pur non avendola mai effettivamente vista. Et voilà. [^36]


### Some properties

### Alcune proprietà

We say that a ZKP has certain technical properties:

Diciamo che una ZKP possiede alcune proprietà tecniche fondamentali:

- Completeness - if the statement is true, then the verifier will be convinced by the proof

- Completezza (Completeness): se l’asserzione è vera, allora il verifier sarà convinto dalla prova.

- Soundness - if the statement is false, the verifier won't be convinced by the proof, except with a negligible probability

- Solidità (Soundness): se l’asserzione è falsa, il verifier non sarà convinto dalla prova, tranne che con una probabilità trascurabile.

- Zero Knowledge - if the statement is true, it won't reveal anything but the fact that it is true

- Conoscenza zero (Zero Knowledge): se l’asserzione è vera, non verrà rivelato nulla oltre al fatto che sia vera.

Additionally, for zk-SNARKs, the proof is succinct, meaning it basically doesn't get bigger as the program gets more complex [^37].

Inoltre, nel caso degli zk-SNARK, la prova è succinta (succinct), il che significa che praticamente non aumenta di dimensione anche quando il programma diventa più complesso [^37].

There are many other properties we care about when it comes to practical ZKPs:

Ci sono anche altre proprietà che consideriamo importanti nel caso pratico delle ZKPs:

- What mathematical assumptions is the system making?

- Quali ipotesi matematiche fa il sistema?

- How secure is it?

- Quanto è sicuro?

- Does it require a trusted setup?

- Richiede una trusted setup (fase iniziale fidata per generare parametri di sistema)?

- How hard is it to generate the proof? In time and other resources

- Quanto è complesso generare la prova, in termini di tempo e risorse?

- How hard is it to verify the proof? In time and other resources

- Quanto è complesso verificare la prova, in termini di tempo e risorse?

- Does the ZKP system allow for aggregating and combining multiple proofs together?

- Il sistema ZKP permette di aggregare o combinare più prove tra loro?

- Are there any good libraries for a ZKP system that can be used by programmers?

- Esistono buone librerie per un determinato sistema ZKP che possono essere usate dagli sviluppatori?

- How expressive is the language used to write programs for a particular ZKP system?

- Quanto è espressivo il linguaggio utilizzato per scrivere programmi per un determinato sistema ZKP?

- And so on

- E così via.

As you can see, there are quite a lot of considerations and different variations of ZKPs. Don't worry though, the gist is basically the same, and depending on where your interest lies you can remain blissfully unaware of many of the technical details involved. Going back to the zoo metaphor, just like with animals, you might not want to become a biologist. Instead, you might want to work with some animals, or maybe you just want a pet, or even just pet your friend's dog.

Come puoi vedere, ci sono molte considerazioni da fare e numerose varianti di ZKP. Non preoccuparti troppo, però: il concetto di base rimane sempre lo stesso, e a seconda dei tuoi interessi puoi tranquillamente ignorare molti dettagli tecnici. Tornando alla metafora dello zoo, proprio come con gli animali, potresti non voler diventare un biologo. Magari vorrai semplicemente lavorare con alcuni animali, oppure adottarne uno come animale domestico, o magari soltanto accarezzare il cane di un tuo amico.

## Applications

## Applicazioni

_This section gives examples of current and future applications of ZK_

_Questa sezione fornisce esempi di applicazioni presenti e future delle ZKPs_

There are many applications of ZKPs. Generally speaking, we are still in the early stages. A lot of the focus is still on the underlying protocols and infrastructure, as well as blockchain-specific applications. To better appreciate the blockchain-specific examples, it is useful to have some understanding of how public blockchains work and the challenges they have. However, this isn't a requirement. In this section we'll look at some of the more interesting applications. We'll start by looking at applications that are live now and then look at those on the horizon.

Ci sono molte applicazioni delle ZKPs. In generale, siamo ancora nelle fasi iniziali. Gran parte dell’attenzione è rivolta ai protocolli e all’infrastruttura sottostante, così come alle applicazioni specifiche della blockchain. Per apprezzare meglio gli esempi specifici della blockchain è utile avere qualche nozione sul funzionamento delle blockchain pubbliche e sui problemi che esse affrontano. Questo, però, non è un prerequisito obbligatorio. In questa sezione esamineremo alcune delle applicazioni più interessanti. Inizieremo con quelle già attive oggi e poi esploreremo quelle che si intravedono all’orizzonte.

> The future is already here. It's just not evenly distributed yet.
>
> - William Gibson [^38]

> Il futuro è già qui. Semplicemente non è ancora distribuito in modo uniforme.
>
> - William Gibson [^38]

![ZKP Magic](../assets/01_zkp-magic.png "Magia delle ZKP")


### Live now

### Applicazioni già attive

**Electronic cash**. To make a cash-like payments systems online it needs to be fungible and private like physical cash. Fungibility refers to the property of a commodity being replaceable by another identical item. That is, there's no difference between your money and my money; they are equally valid forms of payment. We can use ZK to make the transaction graph private, unlike in Bitcoin or Ethereum. This way, your transaction history remains private, ensuring that electronic cash is fungible. This is currently live in systems like Zcash, and related systems like Tornado Cash [^39].

**Contante elettronico (Electronic cash)**. Per creare sistemi di pagamento online simili al contante fisico, è necessario che siano fungibili e riservati. La fungibilità è la proprietà di un bene di essere sostituibile con un altro identico. In altre parole, non c'è differenza tra il mio denaro e il tuo: entrambi sono forme di pagamento altrettanto valide. Possiamo utilizzare le ZKPs per mantenere privato il grafico delle transazioni, diversamente da quanto avviene in Bitcoin o Ethereum. In questo modo, la tua cronologia delle transazioni rimane privata, garantendo la fungibilità del denaro elettronico. Sistemi di questo tipo sono attualmente attivi con Zcash e servizi analoghi come Tornado Cash [^39].

**Anonymous signaling.** Often, we might need to prove our affiliation with a group that possesses certain characteristics, without revealing our identities. One such example is proving that you are part of some group of people; another is voting. This means you don't tie your identity to sensitive actions such as which party you voted for, or reveal other unnecessary information. Currently live in systems like Semaphore [^40], and similar mechanisms with many variations exist.

**Segnalazione anonima (Anonymous signaling)**. Spesso è necessario dimostrare la propria appartenenza a un gruppo che possiede certe caratteristiche, senza però rivelare la propria identità. Un esempio è provare che fai parte di un determinato gruppo di persone; un altro è il voto. Ciò significa che non colleghi la tua identità ad azioni sensibili, come dichiarare per quale partito hai votato, né riveli informazioni non necessarie. Attualmente attivo in sistemi come Semaphore [^40], esistono anche molti altri meccanismi simili con diverse varianti.

**ZK Rollup.** Allow for more, cheaper and faster transactions. The Ethereum blockchain space is limited and expensive with a lot of demand. We use a so-called Layer 2 (L2) rollup, that does transactions separate from the main blockchain (L1). Once a certain number of transactions have hit the L2, it "rolls it up" to the L1. ZKPs are great for this because we can (i) prove that transactions are executed correctly and (ii) create a succinct proof that takes up a small amount of space on the L1. This makes transactions cheaper and faster for users, with near-equal security. Due to the complexity of proving the execution of the entire Ethereum Virtual Machine (EVM) many ZK Rollup solutions only focus on the exchange of simple commodities and assets. Currently live in systems like Loopring, zkSync Lite, dYdX, and Starknet. [^41]

**ZK Rollup**. Permette di effettuare transazioni più numerose, economiche e veloci. Lo spazio della blockchain Ethereum è limitato e costoso, con una domanda molto alta. Si usa allora una soluzione cosiddetta di tipo Layer 2 (L2) rollup, che esegue transazioni separate dalla blockchain principale (L1). Quando un certo numero di transazioni è stato completato sul L2, queste vengono "aggregate" (rollup) e inviate sul L1. Le ZKPs sono ideali perché consentono di (i) dimostrare che le transazioni sono state eseguite correttamente e (ii) creare una prova succinta che occupa poco spazio sul L1. Ciò rende le transazioni più economiche e veloci per gli utenti, con un livello di sicurezza quasi equivalente. A causa della complessità nel dimostrare l’esecuzione completa della Ethereum Virtual Machine (EVM), molte soluzioni di ZK Rollup si concentrano esclusivamente sullo scambio di beni e asset semplici. Sistemi di questo tipo sono già attivi, come Loopring, zkSync Lite, dYdX e Starknet [^41].

**ZK-EVM.** Similar to ZK Rollup, but universal, since any type of transaction or program can be executed. Ethereum has an EVM that acts as a worldwide globally shared, general purpose computer (that anyone can write to). By writing the logic of this machine using ZKPs we can prove the correct execution of any program written on Ethereum and construct a succinct proof that it was executed correctly. This has several use cases, but most immediately for scaling and allowing for cheaper and faster transactions. Currently live in systems like Polygon zkEVM, zkSync Era, with several others on their way. [^42]

**ZK-EVM**. Simile al concetto di ZK Rollup, ma universale, perché può eseguire qualsiasi tipo di transazione o programma. Ethereum possiede una EVM che funge da computer globale e condiviso per scopi generali (su cui chiunque può scrivere). Implementando la logica di questa macchina utilizzando le ZKPs, è possibile dimostrare l’esecuzione corretta di qualsiasi programma scritto su Ethereum e creare una prova succinta di tale esecuzione. Questo ha diverse applicazioni, soprattutto per migliorare la scalabilità e permettere transazioni più economiche e veloci. Sistemi già attivi comprendono Polygon zkEVM e zkSync Era, con numerosi altri progetti in arrivo [^42].


**ZK-VM.** Partially due to the complexity of targeting a "snark-unfriendly" [^43] platform like the EVM, many projects have chosen to do a new blockchain, separate from Ethereum. This means they can optimize the VM to work better with ZK in the first place. Depending on the specific system, this allows for privacy and succinct verification of the blockchain state. Mina is live, and systems like Aleo are under active development. [^44]

**ZK-VM.** A causa, in parte, della difficoltà di lavorare con una piattaforma poco adatta agli SNARK (snark-unfriendly) [^43] come la EVM, molti progetti hanno scelto di creare una blockchain completamente nuova, separata da Ethereum. Ciò consente di ottimizzare la macchina virtuale (VM) direttamente per le ZK. A seconda del sistema specifico, questo permette privacy e verifica succinta dello stato della blockchain. Mina è già attiva, mentre sistemi come Aleo sono in fase di sviluppo. [^44]

**Dark Forest**. Dark Forest is an incomplete information real-time-strategy game. Incomplete information games based on ZK have a "cryptographic fog of war" where players can only see part of the world, as enforced by ZK. Compared to traditional games like Starcraft, not even a central server has access to all the information. Due to its programmatic nature this enables novel ways of playing a game. [^45]

**Dark Forest**. Dark Forest è un gioco strategico in tempo reale con informazione incompleta. I giochi di questo tipo basati su ZK hanno una "nebbia di guerra crittografica" (cryptographic fog of war), in cui i giocatori possono vedere solo una parte limitata del mondo di gioco, restrizione garantita dalle ZK. A differenza dei giochi tradizionali come Starcraft, nemmeno un server centrale può accedere a tutte le informazioni. Grazie alla sua natura programmabile, questo approccio abilita modalità di gioco innovative. [^45]

**ZK Bridges**. Bridges allow you to move assets between different blockchains and systems. These bridges can be hard to make secure, and they often get hacked. With ZK, we can bridge assets more securely and faster, without relying on trusted third parties or error-prone approaches. Currently live with zkBridge and also being worked on by projects such as Succinct Labs. [^46]

**ZK Bridges**. I bridge (ponti) consentono di spostare asset tra blockchain e sistemi diversi. Tali bridge sono spesso difficili da mettere in sicurezza e sono frequentemente oggetto di attacchi hacker. Grazie alle ZK, possiamo trasferire asset in modo più sicuro e veloce, senza affidarci a terze parti fidate o a metodi soggetti a errori. Soluzioni di questo tipo sono già attive con zkBridge, e altri progetti simili sono in fase di sviluppo, come ad esempio Succinct Labs. [^46]

**Private identity**. As more siloed systems require and host our online identities [^47], it is desirable for individuals to be able to own, aggregate and keep these fragmented online identities private. Currently live projects like Sismo enable this, and other projects are working on similar systems. [^48]

**Identità privata (Private identity)**. Poiché un numero sempre maggiore di sistemi chiusi ospita e richiede le nostre identità online [^47], è importante che gli utenti possano controllare, aggregare e mantenere private queste identità frammentate. Progetti attualmente attivi come Sismo permettono di ottenere questo risultato, e altri progetti stanno sviluppando sistemi simili. [^48]

These are just a few examples and by no means complete. We didn't talk about things like private non-repudiable reputation, exporting web2 reputation, sybil-resistant denial-of-service protection, coercion-resistant proving, proof of replication, anonymous airdrops, proving degrees of separation, etc. [^49]

Questi sono solo alcuni esempi e non una lista esaustiva. Non abbiamo parlato di altri utilizzi come la reputazione privata e non ripudiabile, l’esportazione della reputazione da Web2, la protezione da attacchi sybil-resistant, prove resistenti alla coercizione, la proof of replication, gli airdrop anonimi, la dimostrazione di gradi di separazione, ecc. [^49]



### On the horizon

### Applicazioni all'orizzonte

**ZK-EVM (Ethereum-equivalence)**. There are different types of ZK-EVM, and the more challenging ones to implement are the ones that are fully Ethereum-equivalent. Other ZK-EVM takes some shortcuts to make it easier to generate proofs. With a fully Ethereum-equivalent ZK-EVM there's no difference with the current Ethereum system. This means we can prove the correct execution of every single block in existence in a succinct proof. You can use a phone to verify the integrity of the entire chain, relying solely on mathematics, without needing to trust third parties or use expensive machines. Currently being worked on by the ZK-EVM Community Edition team. [^50]

**ZK-EVM equivalente a Ethereum (Ethereum-equivalence)**. Esistono diverse tipologie di ZK-EVM, e quelle più difficili da realizzare sono quelle totalmente equivalenti a Ethereum. Altre ZK-EVM adottano scorciatoie per semplificare la generazione delle prove. Con una ZK-EVM totalmente equivalente a Ethereum, non c'è alcuna differenza rispetto al sistema Ethereum attuale. Ciò permette di dimostrare l’esecuzione corretta di ogni singolo blocco tramite una prova succinta. Potresti addiririttura usare uno smartphone per verificare l'integrità di tutta la blockchain, basandoti esclusivamente sulla matematica, senza necessità di affidarti a terze parti o di utilizzare macchine costose. Attualmente in fase di sviluppo da parte del team ZK-EVM Community Edition. [^50]

**General purpose provable computation**. Most computation in the world doesn't happen in the EVM, but in other systems. WASM and LLVM-based programs are very common [^51]. We can leverage the same approach in ZK-EVM to do general-purpose private provable computation. For example, we can prove that a database contains a specific record, without revealing any other information. Currently being worked on by many different teams, for example Delphinus Labs, RISC Zero, Orochi Network, and nil.foundation. [^52]

**Computazione dimostrabile general-purpose (General purpose provable computation)**. Gran parte delle computazioni al mondo non avviene sulla EVM, bensì su altri sistemi. Programmi basati su WASM e LLVM sono molto diffusi [^51]. Possiamo utilizzare lo stesso approccio della ZK-EVM per svolgere computazioni private dimostrabili di uso generale. Ad esempio, è possibile dimostrare che un database contiene un determinato record senza rivelare altre informazioni. Attualmente questa tecnologia è oggetto di sviluppo da parte di diversi team, tra cui Delphinus Labs, RISC Zero, Orochi Network e nil.foundation. [^52]

**ZK Machine Learning (ZK ML)**. We can prove that some computation was done correctly privately, off-chain, and then publish a proof that the computation was done correctly. This means we can use private data for training better models, without revealing that data. For example, sensitive documents, voice or even things like DNA to find health problems. This improves both scalability and privacy for users. Current proof of concept (PoC) exists for things like MNIST, a common test used in Machine Learning to recognize handwritten digits, and people are working on more complex things like neural networks inside ZKPs. [^53]

**ZK Machine Learning (ZK ML)**. È possibile dimostrare privatamente che una determinata computazione sia stata svolta correttamente fuori dalla blockchain (off-chain), pubblicando successivamente soltanto la prova della sua corretta esecuzione. Questo consente di utilizzare dati privati per addestrare modelli migliori senza rivelare tali dati, ad esempio documenti sensibili, registrazioni vocali o persino sequenze di DNA per individuare problemi di salute. Tutto ciò migliora sia la scalabilità sia la privacy degli utenti. Attualmente esistono prove di concetto (PoC) per applicazioni semplici come MNIST, un noto test usato nel Machine Learning per riconoscere cifre scritte a mano, e si sta lavorando su applicazioni più complesse, come reti neurali implementate nelle ZKPs. [^53]

**Photo authenticity**. Prove provenance of content such as photos and videos, including standard post-processing edits. That is, prove that a photo was taken at a certain time and place, and has only been edited with basic resizing, cropping, and use of greyscale (AP approved list of operations). Some work has been done, including a PoC. [^54]

**Autenticità di foto e video (Photo authenticity)**. È possibile dimostrare l’origine e l'autenticità di contenuti come foto e video, incluse modifiche standard di post-elaborazione. In altre parole, dimostrare che una foto sia stata scattata in un determinato luogo e momento, e che abbia subito soltanto modifiche basilari come il ridimensionamento, il ritaglio e la conversione in scala di grigi (operazioni approvate dall’agenzia AP). Alcuni progressi sono già stati fatti, compresa una prova di concetto (PoC). [^54]

**Compliance**. Prove that a private transaction is compliant with some regulation, or that an asset isn't on a specific blacklist. Prove that an exchange is solvent without revealing its assets. Some work has been done by systems such as Espresso Labs, and some systems have simple versions of this already.

**Conformità normativa (Compliance)**. È possibile dimostrare che una transazione privata rispetta determinate normative o che un determinato asset non sia incluso in una lista nera. Inoltre, si può dimostrare che una piattaforma di scambio (exchange) è solvibile senza rivelarne gli asset. Alcuni sistemi come Espresso Labs hanno già sviluppato soluzioni in questo ambito, e alcune piattaforme dispongono già di versioni semplificate.


**Shielded and private intents.** Users of public blockchains have specific goals they want to achieve, which can be expressed as _intents_. For example, a user might have the intent to exchange one token for another. A user can tell other users about their intents and be matched with a suitable counterparty. It is desirable to keep these intents shielded (hiding the "who" but not the "what", similar to shielded transactions in Zcash) or completely private. Currently worked on by Anoma, starting with shielded intent-matching. To make intents-matching fully private likely requires breakthrough advances in cryptography, similar to the last example in this section.

**Intenzioni schermate e private.** Gli utenti delle blockchain pubbliche hanno spesso obiettivi precisi, che possono essere espressi come _intenzioni_ (intents). Ad esempio, un utente potrebbe voler scambiare un token con un altro. Queste intenzioni possono essere condivise con altri utenti per trovare controparti adatte. È auspicabile che tali intenzioni siano schermate (shielded), cioè nascondano il “chi” ma non il “cosa”, in modo simile alle transazioni schermate di Zcash, oppure completamente private. Attualmente in sviluppo da parte del progetto Anoma, iniziando con un sistema di matching schermato. Rendere completamente privato il matching delle intenzioni richiederà probabilmente avanzamenti significativi nella crittografia, analogamente all’ultimo esempio di questa sezione.

**Autonomous worlds.** A continuation of things like Dark Forest. A world can be physical or conceptual, like The World of Narnia, Christianity, The World of the US Dollar, Bitcoin or Commonwealth law. Depending on where these worlds run, these can be autonomous if anyone can change the rules without damaging its objectivity. Currently being explored by the 0xPARC Foundation in the context of games and creating these worlds. [^55]

**Mondi autonomi (Autonomous worlds)**. Un’estensione di concetti come Dark Forest. Un "mondo" può essere fisico o concettuale, come il mondo di Narnia, il Cristianesimo, il dollaro statunitense, Bitcoin o il diritto anglosassone (Commonwealth). A seconda dell’ambiente in cui operano, questi mondi possono diventare autonomi se chiunque può modificarne le regole senza comprometterne l’oggettività. Attualmente esplorato dalla 0xPARC Foundation nel contesto dei giochi e della creazione di questi mondi. [^55]

**Proof of data authenticity.** Export data from web applications and prove facts about it in a private way. Uses the TLS protocol which means it works on any modern website. Currently being worked on by TLSNotary. [^56]

**Prova di autenticità dei dati (Proof of data authenticity)**. Consente di esportare dati da applicazioni web e dimostrare privatamente certe informazioni. Sfrutta il protocollo TLS, funzionando pertanto con qualsiasi sito web moderno. Attualmente in sviluppo da parte di TLSNotary. [^56]

**Nuclear disarmament.** Allow people inspecting nuclear sites to confirm that an object is or isn't a nuclear weapon without inspecting any of the sensitive internal workings of said object. Paper with physical simulation work exists. [^57]

**Disarmo nucleare (Nuclear disarmament)**. Consente agli ispettori di siti nucleari di confermare se un determinato oggetto sia o meno un’arma nucleare, senza dover ispezionare i dettagli sensibili della struttura interna. Sono già stati pubblicati articoli scientifici con simulazioni fisiche in proposito. [^57]

**Peace talks and high-stakes negotiation.** Often in negotiations people have certain hard limits that they do not wish to reveal to their counterparty to weaken their ability to negotiate. By explicitly encoding these, two parties can negotiate over some highly complex domain and reach an agreement without revealing the details of their precise parameters and limits. This allows people who do not trust each other to fruitfully come to some agreement. Likely requires some breakthroughs in Multi-Party Computation (MPC), which allows us to do computation on shared secrets. [^58]

**Trattative di pace e negoziazioni ad alto rischio (Peace talks and high-stakes negotiation)**. Spesso nelle trattative esistono limiti invalicabili che ciascuna parte preferisce non rivelare per non indebolire la propria posizione negoziale. Codificando esplicitamente questi limiti, due parti possono trattare questioni estremamente complesse e giungere a un accordo senza rivelare dettagli specifici dei loro parametri e limiti. Ciò consente a parti che non si fidano reciprocamente di raggiungere accordi fruttuosi. Probabilmente richiederà avanzamenti significativi nella Multi-Party Computation (MPC), che consente calcoli su segreti condivisi. [^58]

Again, this didn't mention all the types of things people are working on or thinking about. There will surely be many more things in the future. As you can tell there are a lot of things we can do with ZK.

Ancora una volta, questa non è una panoramica completa di tutte le idee e progetti attualmente in corso. Sicuramente ne emergeranno molti altri in futuro. Come puoi intuire, ci sono davvero molte possibilità offerte dalla ZK.

You might wonder why many of these applications involve a blockchain. This was partially answered in the previous section "Why now?". ZK is an orthogonal technology to blockchains like Ethereum and we can do without the blockchain, but quite often it is simply a good tool that makes sense to leverage.

Potresti chiederti perché molte di queste applicazioni coinvolgano la blockchain. Questo punto è stato parzialmente chiarito nella sezione precedente "Perché proprio ora?". Le ZK sono una tecnologia ortogonale rispetto alle blockchain come Ethereum e possono essere usate anche senza blockchain, ma spesso quest’ultima rappresenta semplicemente uno strumento utile da sfruttare.

Similarly, the group of people working on these things and the immediate problems they care about are often overlapping. As the space matures, we can expect the "blockchain" part of ZK applications to disappear as simply an implementation detail, and this has already happened to some degree. Looking further, the "ZK" part will likely also fall into the background and it'll simply be an application that happens to use ZKP.

Analogamente, le persone che lavorano a queste applicazioni e i problemi che affrontano sono spesso sovrapponibili. Man mano che il settore maturerà, possiamo aspettarci che il concetto di "blockchain" nelle applicazioni ZK finisca per diventare un semplice dettaglio implementativo, cosa che in parte è già successa. In un futuro ancora più lontano, anche la componente "ZK" potrebbe diventare meno visibile, fino al punto in cui si tratterà semplicemente di un’applicazione che utilizza le ZKP come elemento secondario.

Finally, when cryptography for online messaging and similar was developed, it was used and developed by the military and Internet companies. It was not something that was innovated on by the post office or some company involved in the secure transport of physical goods, even if in theory that was a possibility. [^59].

Infine, quando è stata sviluppata la crittografia per la messaggistica online e simili, è stata sfruttata e perfezionata principalmente dai militari e dalle aziende Internet. Non è stato qualcosa di innovato dalle poste o da aziende coinvolte nel trasporto sicuro di beni fisici, anche se teoricamente ciò sarebbe stato possibile. [^59]

I'll end this section with a quote from Barry Whitehat, a well-known ZK researcher who works with the Privacy and Scalability Explorations (PSE) team at the Ethereum Foundation, when asked for predictions on the future of ZK:

Termino questa sezione con una citazione di Barry Whitehat, un noto ricercatore ZK che lavora con il team Privacy and Scalability Explorations (PSE) della Ethereum Foundation, quando gli è stato chiesto di fare previsioni sul futuro delle ZK:

> "By 2040, someone will have won a Nobel Peace Prize for using Zero Knowledge Proofs." [^60]

> "Entro il 2040, qualcuno avrà vinto il Premio Nobel per la Pace per aver utilizzato le Zero Knowledge Proofs." [^60]

Outlandish and bold? Certainly. Will it turn out to be true? Maybe not. But could it? Absolutely. It is an intriguing prospect to consider. What is the difference between the mental model that sees this as a real possibility, versus one that writes it off immediately? What would have to happen for such an event to be a realistic outcome?

Stravagante e audace? Sicuramente. Accadrà davvero? Forse no. Ma potrebbe? Assolutamente sì. È una prospettiva intrigante da considerare. Qual è la differenza tra il modello mentale di chi la considera una possibilità concreta e quello di chi invece la scarta immediatamente? Cosa dovrebbe accadere affinché tale evento diventi un esito realistico?

ZKPs represent a new and incredibly potent tool. Often, it's our imagination about its potential applications that limits us.

Le ZKP rappresentano uno strumento nuovo e incredibilmente potente. Spesso, è solo la nostra immaginazione riguardo alle possibili applicazioni che ci limita.

## Conclusion

## Conclusione

_This section summarizes the article and provides next steps_

_Questa sezione riassume l’articolo e indica i passi successivi_

In this article, we've looked at what ZKPs are, why we should care about them and when they are useful. We've also looked at how they work and what properties they give us. Finally, we looked at some applications, both current and future ones.

In questo articolo abbiamo esplorato cosa sono le ZKPs, perché dovremmo interessarcene e quando possono risultare utili. Abbiamo inoltre analizzato il loro funzionamento e le proprietà che offrono. Infine, abbiamo visto alcune applicazioni, sia attuali che future.

I hope this has led you to better understand the nature of ZKPs, and perhaps led to some aha moments and inspired some new ways of thinking about things. Perhaps it even helps you follow the magic of ZKPs in the future.

Mi auguro che tutto ciò ti abbia aiutato a comprendere meglio la natura delle ZKPs, magari facendoti vivere qualche momento di illuminazione e ispirandoti nuove prospettive su questi temi. Forse ti aiuterà anche a seguire più da vicino la magia delle ZKPs in futuro.

In future posts, we'll go even deeper into some of these aspects, and we'll also look at more technical aspects to better understand how ZKPs work and where they can be used.

Nei prossimi articoli, approfondiremo ulteriormente alcuni di questi aspetti e analizzeremo dettagli più tecnici per capire meglio come funzionano le ZKPs e in quali contesti possono essere utilizzate.

If something specific piqued your interest, or there is something specific you'd like to see in future articles, feel free to contact me on Twitter or by email. I'll include the best comments as footnotes!

Se qualcosa in particolare ha attirato la tua attenzione, o se c’è qualche argomento che vorresti vedere trattato in futuro, non esitare a contattarmi su Twitter o via email. Includerò i commenti migliori come note a piè di pagina!

## Acknowledgements

## Ringraziamenti

Thanks to Michelle Lai, Chih-Cheng Liang, Jenny Lin, Anna Lindegren and Eve Ko for reading drafts and providing feedback on this.

Grazie a Michelle Lai, Chih-Cheng Liang, Jenny Lin, Anna Lindegren e Eve Ko per aver letto le bozze e aver fornito preziosi suggerimenti.

Vorrei ringraziare in modo particolare [Silvio Meneguzzo](https://meneguzzo.eth.limo/) per aver tradotto e adattato questo articolo. Ci auguriamo che questo contenuto sia utile e fonte di ispirazione per la comunità italiana e per tutti gli italiani interessati alla ZK e alla crittografia.


### Images

### Immagini

- _Dov'è Wally?_ - Fonte sconosciuta, Where's Waldo creato originariamente da [Martin Handford](https://en.wikipedia.org/wiki/Where%27s_Wally%3F)
- _Lettura Silenziosa_ - Jorge Royan, CC BY-SA 3.0, tramite [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Austria_-_Heiligenkreuz_Abbey_-_1726.jpg)
- _Sherlock Holmes_ - Sidney Paget, Pubblico dominio, tramite [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Strand_paget.jpg)
- _Allunaggio_ - Neil A. Armstrong, Pubblico dominio, tramite [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11.jpg)
- _Calcolatrice di Pascal_ - kitmasterbloke, CC-BY 2.0, tramite [Openverse](https://openverse.org/image/0feadae2-6b51-4dc7-8838-18c157f7f0ce)
- _Legge di Moore_ - Max Roser, Hannah Ritchie, CC-BY 4.0, tramite [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moore%27s_Law_Transistor_Count_1970-2020.png)
- _Sudoku puzzle_ - Tim Stellmach, CC0, tramite [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg)
- _Incantesimo_ - National Library of Wales, CC0, tramite [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Book_of_incantations_f.7v.png)
- _Cyberpunk_ - bloodlessbaron, Pubblico dominio, tramite [Openverse](https://openverse.org/image/3d3d3cd9-7df6-4781-9778-cdb1e1738de1)

## References

## Riferimenti

[^1]: While the concepts are related, there's some legal controversy around if the "the right to privacy" itself is protected in many jurisdictions around the world. See the Wikipedia article on [Right to privacy](https://en.wikipedia.org/wiki/Right_to_privacy) for more.

[^1]: Sebbene i concetti siano collegati, esiste controversia legale sul fatto che il "diritto alla privacy" sia effettivamente tutelato in molte giurisdizioni nel mondo. Vedi la voce Wikipedia sul [Right to privacy](https://en.wikipedia.org/wiki/Right_to_privacy) per approfondire.

[^2]: Zero knowledge has a precise mathematical definition, but we won't go into this in this article. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for a more precise definition.

[^2]: Il concetto di Zero Knowledge ha una definizione matematica precisa, ma non entreremo nei dettagli in questo articolo. Vedi [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) per una definizione più rigorosa.

[^3]: See [A Cypherpunk Manifesto](https://nakamotoinstitute.org/static/docs/cypherpunk-manifesto.txt) for the full text. Also see Wikipedia on [Cypherpunks](https://en.wikipedia.org/wiki/Cypherpunk).

[^3]: Vedi [A Cypherpunk Manifesto](https://nakamotoinstitute.org/static/docs/cypherpunk-manifesto.txt) per il testo completo. Consulta anche Wikipedia sulla voce [Cypherpunks](https://en.wikipedia.org/wiki/Cypherpunk).

[^4]: Some people have different interpretations of this specific passage, but it is still the case that humans made the transition from primarily oral storytelling to silent reading at some point not too long ago. See Wikipedia on [History of silent reading](https://en.wikipedia.org/wiki/Silent_reading#History_of_silent_reading) for more on silent reading.

[^4]: Alcune persone interpretano diversamente questo passaggio specifico, ma è comunque vero che gli esseri umani sono passati dalla narrazione orale alla lettura silenziosa solo in tempi relativamente recenti. Vedi Wikipedia su [History of silent reading](https://en.wikipedia.org/wiki/Silent_reading#History_of_silent_reading) per approfondire.

[^5]: Original quote in French: _Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte._ See [Quote Investigator](https://quoteinvestigator.com/2012/04/28/shorter-letter) on this quote.

[^5]: Citazione originale in francese: _Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte._ Consulta [Quote Investigator](https://quoteinvestigator.com/2012/04/28/shorter-letter) per ulteriori informazioni.

[^6]: Kudos to Juraj Bednar for [suggesting](https://twitter.com/jurbed/status/1650782361590669313) using murder mystery as a way to explain the notion of a proof.

[^6]: Ringraziamenti a Juraj Bednar per aver [suggerito](https://twitter.com/jurbed/status/1650782361590669313) di usare il mistero di un omicidio come modo per spiegare il concetto di prova.

[^7]: Succinctness has a precise mathematical definition, but we won't go into this in this article. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for a more precise definition.

[^7]: La proprietà della sinteticità (succinctness) ha una definizione matematica precisa, ma non approfondiremo in questo articolo. Vedi [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) per maggiori dettagli.

[^8]: Transaction costs is an economic concept. See this Wikipedia article on [transaction costs](https://en.wikipedia.org/wiki/Transaction_cost).

[^8]: I costi di transazione sono un concetto economico. Vedi la voce Wikipedia sui [transaction costs](https://en.wikipedia.org/wiki/Transaction_cost).

[^9]: In a [checksum](https://en.wikipedia.org/wiki/Checksum), we do some basic operations like adding and subtracting the initial digits, and if the final digit isn't the same we know something went wrong. Fun fact: Unlike most similar ID systems, a Social Security Number (SSN) in the US [does not have a checksum](https://en.wikipedia.org/wiki/Social_Security_number#Valid_SSNs). If a checksum is just one digit long it is sometimes just called a [check digit](https://en.wikipedia.org/wiki/Check_digit).

[^9]: In un [checksum](https://en.wikipedia.org/wiki/Checksum), eseguiamo alcune operazioni basilari come addizioni e sottrazioni sulle cifre iniziali, e se il risultato finale non coincide sappiamo che qualcosa è andato storto. Curiosità: a differenza della maggior parte dei sistemi di identificazione, il Social Security Number (SSN) negli Stati Uniti [non ha un checksum](https://en.wikipedia.org/wiki/Social_Security_number#Valid_SSNs). Se un checksum è composto da una sola cifra, è chiamato [check digit](https://en.wikipedia.org/wiki/Check_digit).

[^10]: While more common in less developed countries, this happened recently with bank failures in the US. See Wikipedia article on effects of [Collapse of Silicon Valley Bank](https://en.wikipedia.org/wiki/Collapse_of_Silicon_Valley_Bank#Effects).

[^10]: Anche se più comune nei paesi meno sviluppati, ciò è successo recentemente anche con fallimenti bancari negli Stati Uniti. Vedi la voce Wikipedia sugli effetti del [Collapse of Silicon Valley Bank](https://en.wikipedia.org/wiki/Collapse_of_Silicon_Valley_Bank#Effects).

[^11]: Full quote: "It is a profoundly erroneous truism, repeated by all copy-books and by eminent people when they are making speeches, that we should cultivate the habit of thinking of what we are doing. The precise opposite is the case. **Civilization advances by extending the number of important operations which we can perform without thinking about them.** Operations of thought are like cavalry charges in a battle — they are strictly limited in number, they require fresh horses, and must only be made at decisive moments." See [Wikiquote](https://en.wikiquote.org/wiki/Alfred_North_Whitehead#An_Introduction_to_Mathematics_%281911%29).

[^11]: Citazione completa: "È un errore profondo, ripetuto da tutti i libri di testo e dalle persone eminenti nei loro discorsi, quello di coltivare l'abitudine di pensare a ciò che facciamo. È vero esattamente il contrario. **La civiltà avanza aumentando il numero di operazioni importanti che possiamo eseguire senza pensarci.** Le operazioni mentali sono come le cariche di cavalleria in una battaglia: sono rigorosamente limitate nel numero, richiedono cavalli "freschi" e vanno utilizzate solo nei momenti decisivi." Vedi [Wikiquote](https://en.wikiquote.org/wiki/Alfred_North_Whitehead#An_Introduction_to_Mathematics_%281911%29).

[^12]: Pascal's calculator, the _Pascaline_, is a mechanical calculator. It was very impressive when it came out in 1642. See [Pascal's calculator](https://en.wikipedia.org/wiki/Pascal%27s_calculator).

[^12]: La calcolatrice di Pascal, la _Pascalina_, è una calcolatrice meccanica che suscitò grande ammirazione al suo lancio nel 1642. Vedi [Pascal's calculator](https://en.wikipedia.org/wiki/Pascal%27s_calculator).

[^13]: In well-designed authentication schemes the provider doesn't see your password either, just a salted hash of it. See Wikipedia on [form of stored passwords](https://en.wikipedia.org/wiki/Password#Form_of_stored_passwords).

[^13]: Nei sistemi di autenticazione ben progettati, nemmeno il provider vede la tua password, ma soltanto un hash salato. Vedi Wikipedia sulla [form of stored passwords](https://en.wikipedia.org/wiki/Password#Form_of_stored_passwords).

[^14]: SHA256 is an often-used cryptographic hash function. See [SHA2](https://en.wikipedia.org/wiki/SHA-2).

[^14]: SHA256 è una funzione di hash crittografica molto utilizzata. Vedi [SHA2](https://en.wikipedia.org/wiki/SHA-2).

[^15]: You can verify this yourself with a [SHA256 calculator online](https://www.movable-type.co.uk/scripts/sha256.html) or do it yourself at your computer with the `sha256sum` utility.

[^15]: Puoi verificare personalmente questa operazione con un [SHA256 calculator online](https://www.movable-type.co.uk/scripts/sha256.html) o sul tuo computer tramite il comando `sha256sum`.

[^16]: Cryptography studies how to keep information safe and hide it from adversaries. It is a blend of mathematics, computer science and engineering. You can also read more about cryptographic hash functions and their purpose [here](https://en.wikipedia.org/wiki/Cryptographic_hash_function).

[^16]: La crittografia studia come proteggere le informazioni e nasconderle agli avversari. È una disciplina che combina matematica, informatica e ingegneria. Puoi approfondire la funzione e lo scopo degli hash crittografici [qui](https://en.wikipedia.org/wiki/Cryptographic_hash_function).

[^17]: Technically this is called proving knowledge of the _pre-image_ of a hash.

[^17]: Tecnicamente, questa operazione si chiama dimostrare la conoscenza della _pre-immagine_ di un hash.

[^18]: See the [Federalist Papers](https://en.wikipedia.org/wiki/The_Federalist_Papers).

[^18]: Vedi i [Federalist Papers](https://en.wikipedia.org/wiki/The_Federalist_Papers).

[^19]: See this article on [group signatures](https://0xparc.org/blog/zk-group-sigs) by 0xPARC. Includes the relevant Circom code.

[^19]: Vedi questo articolo sulle [group signatures](https://0xparc.org/blog/zk-group-sigs) scritto da 0xPARC. Include il codice Circom corrispondente.

[^20]: Zero Knowledge Proofs have [existed since 1985](https://en.wikipedia.org/wiki/Zero-knowledge_proof#History), and the authors later won a Gödel Prize for their work. We can compare this to [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography#History), which took many decades until it was used for things like [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security), a now indispensable building block for secure Internet usage.

[^20]: Le Zero Knowledge Proofs [esistono dal 1985](https://en.wikipedia.org/wiki/Zero-knowledge_proof#History), e i loro autori hanno successivamente ricevuto il Premio Gödel per il loro lavoro. Possiamo fare un confronto con la [crittografia a chiave pubblica](https://en.wikipedia.org/wiki/Public-key_cryptography#History), che impiegò decenni prima di essere utilizzata in tecnologie come il [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security), ora elemento fondamentale per un utilizzo di Internet sicuro.

[^21]: For example, Lambda calculus with [Church numerals](https://en.wikipedia.org/wiki/Church_encoding#Church_numerals) and Lisp were initially theoretical and largely unpractical when first proposed. Dan Boneh and others have made the [observation](https://zk-learning.org/) that making prover time quasilinear is what really made ZKPs practical, even in theory.

[^21]: Ad esempio, il Lambda calcolo con i [numeri di Church](https://en.wikipedia.org/wiki/Church_encoding#Church_numerals) e il Lisp erano inizialmente teorici e poco pratici quando proposti. Dan Boneh e altri hanno fatto notare che rendere quasi-lineare il tempo del prover è ciò che ha reso pratiche le ZKPs, anche teoricamente. Vedi [qui](https://zk-learning.org/).

[^22]: See the origins of Zcash, the [Zerocoin paper](https://eprint.iacr.org/2014/349.pdf).

[^22]: Vedi le origini di Zcash nel [paper Zerocoin](https://eprint.iacr.org/2014/349.pdf).

[^23]: Censorship-resistance means anyone can transact on a public blockchain without permission as long as they follow the basic rules of the protocol. It also means it is very costly for an attacker to alter or disrupt the operation of the system. Transparency refers to transactions being publicly auditable and immutable on the blockchain forever. These notions are closely related to decentralization and security, and are a big part of the value proposition of public blockchains compared to other systems.

[^23]: La resistenza alla censura significa che chiunque può effettuare transazioni su una blockchain pubblica senza permessi, a patto che rispetti le regole del protocollo. Significa anche che è molto costoso per un attaccante alterare o interrompere il funzionamento del sistema. La trasparenza indica che le transazioni sono pubblicamente verificabili e immutabili sulla blockchain per sempre. Questi concetti sono strettamente legati alla decentralizzazione e alla sicurezza, e rappresentano gran parte del valore delle blockchain pubbliche rispetto ad altri sistemi.

[^24]: BLS signatures used in the [Ethereum Consensus Layer](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/keys/) were deployed and used to secure billions of dollars just a few years after it was [developed](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-04). See Wikipedia for more on [BLS Signatures](https://en.wikipedia.org/wiki/BLS_digital_signature).

[^24]: Le firme BLS utilizzate nell'[Ethereum Consensus Layer](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/keys/) sono state implementate per proteggere miliardi di dollari pochi anni dopo il loro [sviluppo](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-04). Vedi Wikipedia per approfondimenti sulle [BLS Signatures](https://en.wikipedia.org/wiki/BLS_digital_signature).

[^25]: Dan Boneh, an applied cryptography professor at Stanford, is a great example of this in terms of his involvement in various cryptocurrency-related projects.

[^25]: Dan Boneh, professore di crittografia applicata a Stanford, è un ottimo esempio di questo, vista la sua partecipazione a numerosi progetti legati alle criptovalute.

[^26]: The author heard about this from gubsheep at [0xPARC](https://0xparc.org/), but it has popped up a few times. This also matches the author's own experience, working on RLN and noticing 1-2 order of magnitude improvements in things like prover time in a few years.

[^26]: L’autore ne ha sentito parlare da gubsheep di [0xPARC](https://0xparc.org/), ma il concetto è emerso più volte. Questo rispecchia anche l’esperienza personale dell'autore, che lavorando su RLN ha notato miglioramenti di uno o due ordini di grandezza nel tempo di generazione delle prove in pochi anni.

[^27]: In a legal setting, false positives do happen, see for example the [Innocence Project](https://en.wikipedia.org/wiki/Innocence_Project). In a mathematical setting we can make this false positive rate very precise, and it isn't even close to a fair game. That's the power of mathematics. We'll look at this more in future articles on probabilistic proofs.

[^27]: In ambito giuridico, i falsi positivi possono capitare: vedi ad esempio l’[Innocence Project](https://en.wikipedia.org/wiki/Innocence_Project). Tuttavia, in ambito matematico possiamo definire con precisione la probabilità di questi falsi positivi, rendendo il gioco decisamente impari. È il potere della matematica. Approfondiremo questo aspetto nei prossimi articoli dedicati alle prove probabilistiche.

[^28]: You'd probably want to ask Sherlock Holmes some follow-up questions first though, before throwing our prospective murderer in jail. It is possible Sherlock Holmes is trying to fool you! In ZKPs we assume the prover is untrusted.

[^28]: Probabilmente vorresti porre qualche domanda aggiuntiva a Sherlock Holmes prima di gettare il sospettato in prigione. Potrebbe infatti essere che Sherlock Holmes stia tentando di ingannarti! Nelle ZKP si assume sempre che il dimostratore (prover) non sia fidato.

[^29]: This is done using the [Fiat-Shamir heuristic](https://en.wikipedia.org/wiki/Fiat%E2%80%93Shamir_heuristic).

[^29]: Questo risultato si ottiene utilizzando l’euristica di [Fiat-Shamir](https://en.wikipedia.org/wiki/Fiat%E2%80%93Shamir_heuristic).

[^30]: Sometimes people make a distinction between these two, but it is a technical one (computational vs statistical soundness) and not something we have to concern ourselves with right now. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for more.

[^30]: A volte si fa una distinzione tecnica tra i due concetti (solidità computazionale vs statistica), ma non è qualcosa di cui dobbiamo occuparci adesso. Vedi [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) per approfondire.

[^31]: Alice and Bob are commonly used characters in cryptographic systems, see [Wikipedia](https://en.wikipedia.org/wiki/Alice_and_Bob).

[^31]: Alice e Bob sono personaggi comunemente utilizzati nei sistemi crittografici. Vedi [Wikipedia](https://en.wikipedia.org/wiki/Alice_and_Bob).

[^32]: There are also zk-STARKs, so one could argue a more accurate name might be (zk)S(T|N)ARKs. This is obviously a bit of a mouthful, so people tend to use ZK as a shorthand. See for example the name of the ZK podcast, the ZK proof standard, etc. ZK is the most magical property of ZKPs, in the author's opinion.

[^32]: Esistono anche gli zk-STARK, quindi un nome più accurato potrebbe essere (zk)S(T|N)ARKs. Ovviamente è un po' complicato da pronunciare, quindi si preferisce semplicemente la sigla ZK. Ad esempio, vedi il nome del podcast ZK, lo standard ZK proof, ecc. Secondo l’autore, la Zero Knowledge è la proprietà più "magica" delle ZKP.

[^33]: Setups are multi-faceted and a big part of the security assumptions of a ZKP. They are a bit involved mathematically, and to give them full justice would need a dedicated article. There's a great layman's podcast on The Ceremony Zcash held in 2016 that you can listen to [here](https://radiolab.org/podcast/ceremony).

[^33]: Le fasi iniziali (setup) sono complesse e rappresentano una parte importante delle ipotesi di sicurezza nelle ZKP. Richiedono nozioni matematiche avanzate e meriterebbero un articolo dedicato per essere approfondite adeguatamente. Esiste un ottimo podcast divulgativo sulla cerimonia svolta da Zcash nel 2016 che puoi ascoltare [qui](https://radiolab.org/podcast/ceremony).

[^34]: Technically speaking this is an *arithmetic circuit* (dealing with numbers), but we won't introduce details of this in this article. See [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) for more.

[^34]: Tecnicamente, si tratta di un *circuito aritmetico* (arithmetic circuit) che gestisce operazioni numeriche, ma non introdurremo dettagli in questo articolo. Per approfondimenti vedi [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf).

[^35]: Unless you want to! ZK is sometimes called "Magic Moon Math", but if you really study it, the mathematics you need to get an intuition for how they actually work under the hood isn't as complex as you might think. We won't go into it in this article, though. Here's a [presentation](https://www.youtube.com/watch?v=W1ZkhWNka-c) by the author on some of the mathematical foundations of ZKPs.

[^35]: A meno che tu non lo voglia! Le ZK sono a volte chiamate "Magic Moon Math" (matematica lunare magica), ma se studi veramente l'argomento, la matematica necessaria per intuire il funzionamento non è così complessa come si potrebbe pensare. Non approfondiremo in questo articolo, ma puoi vedere una [presentazione](https://www.youtube.com/watch?v=W1ZkhWNka-c) dell’autore sulle basi matematiche delle ZKPs.

[^36]: French for here you go, presto, bingo, ta-da, and Bob's your uncle.

[^36]: Dal francese: eccoti servito, voilà, ta-da, ed ecco fatto.

[^37]: There are different notions of succinctness, and this depends on the specific proof system. Technically, we call proofs succinct if they are sublinear in time complexity.

[^37]: Esistono diverse definizioni di "succinctness" (sinteticità), e dipendono dal sistema di prova specifico. Tecnicamente, chiamiamo succinta una prova se la sua complessità temporale è sublineare.

[^38]: Allegedly a quote by William Gibson, see [here](https://www.nytimes.com/2012/01/15/books/review/distrust-that-particular-flavor-by-william-gibson-book-review.html).

[^38]: Attribuita a William Gibson, vedi [qui](https://www.nytimes.com/2012/01/15/books/review/distrust-that-particular-flavor-by-william-gibson-book-review.html).

[^39]: With many new versions being developed, like [Aztec](https://aztec.network/) and [Railgun](https://railgun.org/). [Tornado Cash (archive)](https://web.archive.org/web/20220808144431/https://tornado.cash/) works quite differently from [Zcash](https://z.cash), acting more as a mixer. Tornado Cash was also recently [sanctioned](https://en.wikipedia.org/wiki/Tornado_Cash) by the US government. As of this writing there are still a lot of unknowns about this case, but it was a [controversial](https://www.eff.org/deeplinks/2022/08/code-speech-and-tornado-cash-mixer) event that lead to [lawsuits](https://www.coincenter.org/coin-center-is-suing-ofac-over-its-tornado-cash-sanction/]). Some see this as a sequel to the [Crypto Wars](https://en.wikipedia.org/wiki/Crypto_Wars) in the 1990s. There are other alternatives like [Monero](https://www.getmonero.org/) and [Wasabi Wallet](https://wasabiwallet.io/), that are not based on ZKP but have similar design goals. Read more about the [Case for Electronic Cash](https://www.coincenter.org/app/uploads/2020/05/the-case-for-electronic-cash-coin-center.pdf) by Coin Center.

[^39]: Con diverse nuove versioni in sviluppo, come [Aztec](https://aztec.network/) e [Railgun](https://railgun.org/). [Tornado Cash (archivio)](https://web.archive.org/web/20220808144431/https://tornado.cash/) funziona in modo molto diverso da [Zcash](https://z.cash), agendo principalmente come un mixer. Tornado Cash è stato recentemente [sanzionato](https://en.wikipedia.org/wiki/Tornado_Cash) dal governo statunitense. Nel momento in cui scriviamo ci sono ancora molte incertezze sul caso, ma è stato un evento [controverso](https://www.eff.org/deeplinks/2022/08/code-speech-and-tornado-cash-mixer) che ha portato a diverse [cause legali](https://www.coincenter.org/coin-center-is-suing-ofac-over-its-tornado-cash-sanction/]). Alcuni lo vedono come il seguito delle [Crypto Wars](https://en.wikipedia.org/wiki/Crypto_Wars) degli anni '90. Ci sono altre alternative come [Monero](https://www.getmonero.org/) e [Wasabi Wallet](https://wasabiwallet.io/), che non si basano su ZKP ma perseguono obiettivi simili. Puoi approfondire leggendo [Case for Electronic Cash](https://www.coincenter.org/app/uploads/2020/05/the-case-for-electronic-cash-coin-center.pdf) del Coin Center.

[^40]: See [Semaphore](https://semaphore.appliedzkp.org) by the [Privacy & Scaling Explorations team](https://www.appliedzkp.org/).

[^40]: Vedi [Semaphore](https://semaphore.appliedzkp.org) del [Privacy & Scaling Explorations team](https://www.appliedzkp.org/).

[^41]: This is similar to how the traditional banking system works too, where there are multiple layers of settlement happening. It is just hidden from most end users. See [L2Beat](https://l2beat.com/scaling/summary) for an overview of different Layer 2 solutions, including ZK Rollups. Also see [Loopring](https://loopring.org/#/), [dYdX](https://dydx.exchange/faq). and [Starknet](https://www.starknet.io/en).

[^41]: Questo approccio è simile al funzionamento del sistema bancario tradizionale, in cui esistono molteplici livelli di regolamento nascosti all'utente finale. Vedi [L2Beat](https://l2beat.com/scaling/summary) per una panoramica delle diverse soluzioni Layer 2, incluse le ZK Rollups. Consulta anche [Loopring](https://loopring.org/#/), [dYdX](https://dydx.exchange/faq) e [Starknet](https://www.starknet.io/en).

[^42]: There are different types of zkEVM, and the difference can be quite subtle. See [this post](https://vitalik.ca/general/2022/08/04/zkevm.html) by Vitalik for more on the difference. Also see [Polygon zkEVM](https://polygon.technology/polygon-zkevm), [zkSync Era](https://zksync.io/).

[^42]: Esistono diversi tipi di zkEVM, con differenze anche piuttosto sottili. Vedi [questo articolo](https://vitalik.ca/general/2022/08/04/zkevm.html) di Vitalik per ulteriori dettagli. Consulta anche [Polygon zkEVM](https://polygon.technology/polygon-zkevm), [zkSync Era](https://zksync.io/).

[^43]: SNARK-unfriendly platforms or functions refer to the fact that most modern computer primitives were designed for a specific computer architecture. This architecture is very different from what is natural when writing constraints. For example, the SHA256 hash function is a typical example of a SNARK-unfriendly hash. Some people create SNARK or ZK-friendly functions, such as the [Poseidon hash function](https://www.poseidon-hash.info/), that are designed specifically to be used in ZKPs. These are much easier to implement in ZKPs, and can be 100 or more times more efficient, but they come with other trade-offs.

[^43]: Piattaforme o funzioni "SNARK-unfriendly" si riferiscono al fatto che la maggior parte delle primitive informatiche moderne sono state progettate per architetture specifiche, molto diverse da ciò che risulta naturale quando si scrivono vincoli per circuiti. Ad esempio, la funzione hash SHA256 è tipicamente considerata SNARK-unfriendly. Per ovviare a questo problema, alcuni progettano funzioni SNARK o ZK-friendly come la [funzione hash Poseidon](https://www.poseidon-hash.info/), pensata specificatamente per essere usata nelle ZKPs. Queste funzioni sono più facili da implementare nei circuiti ZKPs e possono essere 100 volte o più efficienti, anche se introducono altri compromessi.

[^44]: Mina allows for succinct verification of the whole chain, whereas Aleo focuses more on privacy. Also see [Mina](https://minaprotocol.com/) and [Aleo](https://www.aleo.org/).

[^44]: Mina permette una verifica succinta di tutta la blockchain, mentre Aleo si concentra di più sulla privacy. Vedi anche [Mina](https://minaprotocol.com/) e [Aleo](https://www.aleo.org/).

[^45]: In [Dark Forest](https://zkga.me/), some people write very complex bots that play the game on its own. They even form private DAOs and create smart contracts that play the game semi-autonomously.

[^45]: In [Dark Forest](https://zkga.me/), alcune persone scrivono bot molto complessi che giocano autonomamente. Alcuni gruppi formano persino DAO private e creano smart contract che giocano semi-autonomamente.

[^46]: Succinct Labs made [Telepathy](https://docs.telepathy.xyz/) is one such project. [zkBridge](https://zkbridge.com/) is another. There are likely many others.

[^46]: [Telepathy](https://docs.telepathy.xyz/) di Succinct Labs è un esempio di questo tipo di progetto. Anche [zkBridge](https://zkbridge.com/) ne è un altro, e probabilmente ne esistono molti altri ancora.

[^47]: A weird, but surprisingly accurate, statement.

[^47]: Un'affermazione insolita, ma sorprendentemente accurata.

[^48]: Proof Carrying Data by 0xPARC is one such example. See [PCD](https://pcd.team). Also see [Sismo](https://www.sismo.io/).

[^48]: Proof Carrying Data di 0xPARC è uno di questi esempi. Vedi [PCD](https://pcd.team). Vedi anche [Sismo](https://www.sismo.io/).

[^49]: We won't go into these here, but I encourage the curious reader to search the web to find out how various projects are using or thinking about using ZKPs to achieve their design goals. Example: [Unirep](https://developer.unirep.io/docs/welcome), [Interep](https://interep.link/), [RLN](https://rate-limiting-nullifier.github.io/rln-docs/), [RLNP2P](https://rlnp2p.vac.dev/), [MACI](https://privacy-scaling-explorations.github.io/maci/), [Filecoin](https://docs.filecoin.io/basics/the-blockchain/proofs/), [Stealthdrop](https://github.com/stealthdrop/stealthdrop), [ETHDos](https://ethdos.xyz/), and many more.

[^49]: Non approfondiremo qui questi progetti, ma invito i lettori curiosi a cercare online per scoprire come diversi progetti utilizzano o stanno pensando di utilizzare le ZKP per raggiungere i propri obiettivi. Alcuni esempi: [Unirep](https://developer.unirep.io/docs/welcome), [Interep](https://interep.link/), [RLN](https://rate-limiting-nullifier.github.io/rln-docs/), [RLNP2P](https://rlnp2p.vac.dev/), [MACI](https://privacy-scaling-explorations.github.io/maci/), [Filecoin](https://docs.filecoin.io/basics/the-blockchain/proofs/), [Stealthdrop](https://github.com/stealthdrop/stealthdrop), [ETHDos](https://ethdos.xyz/) e molti altri.

[^50]: See [^42] above for more on this distinction.

[^50]: Vedi [^42] sopra per maggiori informazioni su questa distinzione.

[^51]: LLVM and WASM are compiler and toolchain technologies. Very roughly speaking, they allow you to write code in different programming languages that run in different types of environments, such as in different web browsers and on different types of computers. Understanding the specifics of these systems isn't important for our purposes, just that they allow us to write and use programs in many different environments. See [LLVM](https://en.wikipedia.org/wiki/LLVM), [WASM](https://en.wikipedia.org/wiki/WebAssembly).

[^51]: LLVM e WASM sono tecnologie relative a compilatori e toolchain. In estrema sintesi, consentono di scrivere codice in linguaggi di programmazione diversi che possono essere eseguiti in ambienti differenti, come vari browser web o tipologie diverse di computer. Comprendere i dettagli di questi sistemi non è rilevante ai nostri fini; ciò che conta è che ci permettono di scrivere ed eseguire programmi in ambienti molto eterogenei. Vedi [LLVM](https://en.wikipedia.org/wiki/LLVM) e [WASM](https://en.wikipedia.org/wiki/WebAssembly).

[^52]: See [Delphinus Labs](https://delphinuslab.com/zk-wasm/), [RISC Zero](https://www.risczero.com/), [Orochi Network](https://orochi.network/), [nil.foundation](https://nil.foundation/).

[^52]: Vedi [Delphinus Labs](https://delphinuslab.com/zk-wasm/), [RISC Zero](https://www.risczero.com/), [Orochi Network](https://orochi.network/) e [nil.foundation](https://nil.foundation/).

[^53]: See [zk-MNIST](https://0xparc.org/blog/zk-mnist) and [EZKL](https://docs.ezkl.xyz/). There are also projects doing things like [neural networks](https://github.com/lyronctk/zator) in more modern efficient proof systems like [Nova](https://github.com/microsoft/Nova).

[^53]: Vedi [zk-MNIST](https://0xparc.org/blog/zk-mnist) ed [EZKL](https://docs.ezkl.xyz/). Ci sono anche progetti dedicati a [reti neurali](https://github.com/lyronctk/zator) utilizzando sistemi di prova più moderni ed efficienti come [Nova](https://github.com/microsoft/Nova).

[^54]: See article on [fighting disinformation with ZK](https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f).

[^54]: Vedi l’articolo sull’[uso delle ZK per combattere la disinformazione](https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f).

[^55]: See [this essay](https://0xparc.org/blog/autonomous-worlds) by ludens at 0xPARC for more details on this idea.

[^55]: Vedi [questo saggio](https://0xparc.org/blog/autonomous-worlds) di ludens su 0xPARC per ulteriori dettagli su quest’idea.

[^56]: See [TLS Notary](https://tlsnotary.org).

[^56]: Vedi [TLS Notary](https://tlsnotary.org).

[^57]: See [article (archive)](https://web.archive.org/web/20170703142802/https://www.pppl.gov/news/2016/09/pppl-and-princeton-demonstrate-novel-technique-may-have-applicability-future-nuclear).

[^57]: Vedi [questo articolo (archivio)](https://web.archive.org/web/20170703142802/https://www.pppl.gov/news/2016/09/pppl-and-princeton-demonstrate-novel-technique-may-have-applicability-future-nuclear).

[^58]: Unlike Zero Knowledge Proofs, which allow you to make statements about private data, [Multi-Party Computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC) generalizes this concept and allows us to do computation on shared secrets. That is, if Alice and Bob have their own secret, we can write a program that combines these two secrets in some non-trivial way, without revealing anyone's secrets. This is what we want in a negotiation setting, because we want to compare stakeholder's private information in some way to reach an acceptable compromise. Most MPCs that exist today are quite limited and inefficient, but it is an exciting area of research with a lot of potential.

[^58]: A differenza delle Zero Knowledge Proofs, che consentono di dimostrare affermazioni su dati privati, la [Multi-Party Computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC) generalizza questo concetto permettendo calcoli su segreti condivisi. Ad esempio, se Alice e Bob hanno ciascuno un segreto, si può scrivere un programma che combina questi segreti senza rivelarli. È ciò che si vuole in un contesto negoziale, dove è necessario confrontare informazioni private per raggiungere un compromesso accettabile. La maggior parte degli MPC esistenti oggi è piuttosto limitata e inefficiente, ma si tratta di un ambito di ricerca entusiasmante con grande potenziale.

[^59]: A familiar story: see [Sears vs Amazon](https://fortune.com/longform/sears-couldve-been-amazon/).

[^59]: Una storia familiare: vedi [Sears vs Amazon](https://fortune.com/longform/sears-couldve-been-amazon/).

[^60]: Quote from a [panel at Devcon5](https://www.youtube.com/watch?v=hBupNf1igbY&t=1897s).

[^60]: Citazione tratta da un [panel a Devcon5](https://www.youtube.com/watch?v=hBupNf1igbY&t=1897s).
