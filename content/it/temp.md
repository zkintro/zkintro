---

title: 'Introduzione semplificata alla Zero Knowledge'
date: '2023-07-17'
tags: \['zero-knowledge']
draft: false
layout: PostSimple
slug: "/it/friendly-introduction-to-zero-knowledge"
images: \['../assets/01\_zkp-magic.png']
summary: "Le Zero Knowledge Proofs sono pura magia. Ci permettono di realizzare cose che prima non avremmo nemmeno immaginato. Questo è il primo di una serie di articoli sulle Zero Knowledge Proofs e le loro applicazioni. Vedremo cosa sono, perché dovrebbero interessarci, come funzionano e dove possono essere utilizzate."
---

![La magia della ZKP](../assets/01_zkp-magic.png "La magia della ZKP")

## Introduction

## Introduzione

Zero Knowledge Proofs are magic. They allow us to do things we couldn't dream of before.

Le Zero Knowledge Proofs (ZKPs, dimostrazioni a conoscenza zero) sono pura magia. Ci permettono di realizzare cose che prima non avremmo nemmeno immaginato.

Let me start with a few quotes to tickle your brain. Some might be familiar, while others might be new to you.

Cominciamo con alcune citazioni per stuzzicare la curiosità. Alcune vi saranno familiari, altre forse no.

> Any sufficiently advanced technology is indistinguishable from magic.
>
> - Arthur C. Clarke

> Ogni tecnologia sufficientemente avanzata è indistinguibile dalla magia.
>
> - Arthur C. Clarke

> Civilization advances by extending the number of operations we can perform without thinking about them.
>
> - Alfred North Whitehead

> La civiltà avanza aumentando il numero di operazioni che possiamo compiere senza pensarci.
>
> - Alfred North Whitehead

> I have made this longer than usual, only because I have not had the time to make it shorter.
>
> - Blaise Pascal

> L'ho reso più lungo del solito, soltanto perché non ho avuto il tempo per farlo più breve.
>
> - Blaise Pascal

> Privacy is the power to selectively reveal oneself to the world.
>
> - A Cypherpunk's Manifesto

> La privacy è il potere di rivelarsi al mondo in modo selettivo.
>
> - Un manifesto Cypherpunk

> The future is already here. It's just not evenly distributed yet.
>
> - William Gibson

> Il futuro è già qui, semplicemente non è ancora equamente distribuito.
>
> - William Gibson

Magic technology, advancing civilization, short letters, privacy, and a future that's already here. That's Zero Knowledge Proofs (ZKPs) in a nutshell. What's going on?

Tecnologie magiche, civiltà in avanzamento, lettere brevi, privacy, e un futuro già presente. Ecco, in sintesi, cosa sono le Zero Knowledge Proofs. Ma di cosa stiamo realmente parlando?

In the last century, computers and the Internet have taken over the world. These technologies are everywhere, in everything we do, for better or worse. On top of these, we build platforms, companies, empires. These are things like your MAMAA (Microsoft, Apple, Meta, Alphabet, Amazon). Then there's the belly of the beast - your payment networks, governmental services, and the plethora of B2B applications that silently run the world. Finally, there's a long tail of other things - your cute filter image app, language learning platform, or online community.

Nell'ultimo secolo, computer e internet hanno conquistato il mondo. Queste tecnologie sono ovunque, in tutto quello che facciamo, nel bene e nel male. Su queste basi abbiamo costruito piattaforme, aziende, veri e propri imperi. Parliamo dei giganti MAMAA (Microsoft, Apple, Meta, Alphabet, Amazon). Poi c'è il ventre della bestia: le reti di pagamento, i servizi governativi e l'enorme quantità di applicazioni B2B che regolano silenziosamente il mondo. Infine, troviamo una miriade di altre piccole realtà: app con filtri simpatici, piattaforme per imparare le lingue, o comunità online.

You expect to achieve a specific goal when you input data into yet another online service. It might be a small goal, like reaching out to a friend, distracting yourself from work, or something big like applying for a mortgage. But what happens to all this data? This includes the data you consciously know about and the iceberg of hidden data you are unaware of. Will what you are trying to achieve actually happen, or will there be some problem, either straight away or a year from now?

Quando inserisci dei dati in un qualsiasi servizio online, ti aspetti di ottenere qualcosa in cambio. Può essere un piccolo obiettivo, come contattare un amico o distrarti dal lavoro, oppure qualcosa di importante come richiedere un mutuo. Ma cosa succede veramente con tutti questi dati? Non parliamo solo di quelli di cui sei consapevole, ma anche della montagna sommersa di dati nascosti. Quello che desideri accadrà davvero, o ci sarà qualche problema, oggi o magari fra un anno?

Who actually understands these systems and the consequences of how we use them? And how they, in turn, use us? While some people might understand some systems better than others, no one understands all of them, and even less how they interact together to create unforeseen consequences.

Chi comprende davvero questi sistemi e le conseguenze del nostro uso? E soprattutto, come questi sistemi usano noi? Certo, qualcuno può avere una comprensione maggiore di certi aspetti, ma nessuno li conosce tutti, tantomeno come interagiscono tra loro generando conseguenze impreviste.

What's a human to do? Trust. But who do you trust? And why?

Come può reagire una persona? Fidandosi. Ma di chi? E perché?

This is a hard problem. Our human brains have not evolved to think about this. The Internet, great as it is in connecting us and making things easier, has created a bit of a mess in this regard. In the past, when you had a private conversation with someone, the wind would blow away the sounds you made. When you were locked out of your house, you could get a locksmith, or break the lock yourself. Who do you talk to when you are locked out of your Google account and stare at an "Access denied" screen? No one, you are standing in front of an invisible and impenetrable castle.

È un problema difficile. Il nostro cervello non si è evoluto per gestire questioni simili. Internet, con tutti i suoi meriti nel connetterci e semplificarci la vita, ha anche creato un discreto caos. In passato, se avevi una conversazione privata, il vento disperdeva le parole. Se restavi chiuso fuori casa, chiamavi un fabbro, o rompevi tu stesso la serratura. Ma con chi parli quando resti fuori dal tuo account Google davanti alla scritta "Accesso negato"? Con nessuno. Sei davanti a un castello invisibile e inespugnabile.

ZKPs can help. Perhaps not for everything, everywhere, or at this precise moment. But it applies to numerous things, in various places, and increasingly so. In the rest of this article, I'll try to convince you why and how. Let's follow the magic.

Le ZKPs possono aiutare. Magari non per tutto, ovunque, o esattamente ora. Ma sono già applicabili a numerosi scenari, in vari contesti, e sempre di più lo saranno. Nel resto di questo articolo cercherò di convincerti del perché e del come. Seguiamo insieme la magia.


---

## What is a Zero Knowledge Proof?

## Cos'è una Zero Knowledge Proof?

_This section introduces the notion of a Zero Knowledge Proof_

_Questa sezione introduce il concetto di Zero Knowledge Proof_

This is the first in a series of posts on Zero Knowledge Proofs and their application. We'll look at what Zero Knowledge Proofs are, why you should care, how they work, and see where they can be used.

Questo è il primo di una serie di articoli sulle Zero Knowledge Proofs e le loro applicazioni. Vedremo cosa sono le Zero Knowledge Proofs, perché dovrebbero interessarci, come funzionano e dove possono essere utilizzate.

Imagine you go to a bar and can prove you are over 18 without revealing anything else, including your ID with personal information on it. Or you can prove that you've paid your taxes correctly, without revealing the details of your income or assets to anyone. These are the kind of things Zero Knowledge Proofs (ZKPs) enables. The term _zero knowledge_ simply means we don't reveal any more information beyond what is intended.

Immagina di entrare in un bar e dimostrare di avere più di 18 anni senza rivelare nient’altro, nemmeno il tuo documento con tutte le informazioni personali. Oppure immagina di dimostrare di aver pagato correttamente le tasse, senza rivelare dettagli sul tuo reddito o patrimonio. Questi sono esempi di quello che le Zero Knowledge Proofs (ZKPs) consentono di fare. Il termine _zero knowledge_ ("conoscenza zero") significa semplicemente che non viene rivelata alcuna informazione oltre quella strettamente necessaria.

ZKPs allow you to prove something without revealing anything but that the statement is true.

Le ZKPs consentono di dimostrare che un’asserzione (statement) è vera senza rivelare nient’altro.

What does this mean? Let's take the classic example of "Where's Waldo". The game is about finding Waldo in a big picture. I can prove to you that I know where Waldo is without revealing the location of Waldo. How?

Cosa significa in pratica? Consideriamo l’esempio classico di "Dov’è Wally". Lo scopo del gioco è trovare Wally in un’immagine grande e affollata. Io posso dimostrarti di sapere dov’è Wally senza rivelarti la sua posizione. Ma come?

Imagine I have a picture of "Where's Waldo" and a large piece of paper four times the size of that picture. I make a small hole in the paper and put this paper in front of the "Where's Waldo" picture, carefully positioning it so that Waldo is visible through the hole. This means you can see Waldo, but only Waldo and nothing else. You thus know that I know where Waldo is, but I haven't revealed anything about where Waldo actually is located in the picture.

Immagina di avere l’immagine di "Dov’è Wally" e un grande foglio di carta quattro volte più grande dell’immagine stessa. Faccio un piccolo foro nella carta e poi la sovrappongo all’immagine, posizionandola con cura in modo che Wally sia visibile solo attraverso il foro. Così facendo, tu puoi vedere Wally, ma soltanto lui e nient’altro. In questo modo capisci che io conosco la posizione di Wally, senza però rivelarti dove precisamente si trovi all’interno dell’immagine.

![Where's Waldo](../assets/01_waldo.jpg "Dov’è Wally")

This is obviously a toy example, but hopefully it gives some intuition for how such a proof is even possible. But what does this mean? What are we proving more precisely? We'll dive deeper into this down the line, but for now let's see what ZKPs gives us more generally.

Questo è chiaramente un esempio giocattolo, ma speriamo dia almeno un’intuizione su come una simile dimostrazione sia possibile. Cosa significa esattamente? Cosa stiamo dimostrando con precisione? Lo approfondiremo in seguito; per ora vediamo più in generale cosa ci permettono le ZKPs.

With ZKPs you can prove arbitrary statements in a general-purpose fashion. More specifically, ZKPs allow us to prove something in a private and succinct way.

Le ZKPs consentono di dimostrare affermazioni arbitrarie in modo generale. Più nello specifico, le ZKPs permettono di dimostrare qualcosa in modo privato e conciso.

This is extremely powerful as we'll see next.

Come vedremo, questa proprietà è incredibilmente potente.

## Why should you care?

## Perché dovrebbero interessarti?

_This section explains why someone might care about ZKPs, including going into detail on privacy, compression, and the general-purpose nature of ZKPs_

_Questa sezione spiega perché qualcuno potrebbe interessarsi alle ZKPs, approfondendo aspetti come privacy, compressione e la loro natura general-purpose._

Reading the above section you might think, "ok, that's kinda neat I guess, but why should I care". That's a completely reasonable take. In fact, you probably shouldn't! Just like you shouldn't care about how computers work, where AI is going, or any of these things.

Dopo aver letto la sezione precedente potresti pensare: "Va bene, carino, ma perché dovrebbe interessarmi?". È un pensiero più che ragionevole. Anzi, forse non dovrebbe proprio interessarti! Così come potresti non interessarti di come funzionano i computer, dove ci porterà l’intelligenza artificiale o cose simili.

Why _might you care_? Because you are curious and want to understand how ZKPs work, and what type of interactions it unlocks. The mechanism is very general, and the intuition for many people working in the space is that it is fundamentally a new paradigm that unlocks a lot of new things. We are seeing this already, and it seems like we are just at the very beginning of this. In the rest of this section, I'll give you some intuition as to why and how.

Perché allora _potrebbe_ interessarti? Perché sei curioso, vuoi capire come funzionano le ZKPs e quali tipi di interazioni possono abilitare. Si tratta di un meccanismo molto generale, e per molti di coloro che lavorano in questo ambito rappresenta fondamentalmente un nuovo paradigma che rende possibili molte cose nuove. È un cambiamento che sta già avvenendo, e sembra che siamo soltanto agli inizi. Nel resto di questa sezione proverò a fornirti qualche intuizione sul perché e sul come.

Before going deeper into that, let's understand what ZKPs give us at a higher level. ZKPs give us primarily one or both of the following properties:

Prima di approfondire, cerchiamo di capire cosa ci offrono le ZKPs ad alto livello. Le ZKPs garantiscono principalmente una, o entrambe, di queste proprietà:

1. Privacy (more formally known as zero-knowledge)

2. Compression (more formally known as succinctness)

1. Privacy (formalmente nota come conoscenza zero, zero-knowledge)

2. Compressione (formalmente nota come sinteticità, succinctness)

What do we mean by these two notions? Here are some ways to think about these properties.

Ma cosa intendiamo con questi due concetti? Ecco alcuni modi per comprendere meglio queste proprietà.

### Privacy

### Privacy

There are a lot of things we want to keep private. Here's the definition of "private" in the Oxford Dictionary:

Ci sono tante cose che desideriamo mantenere private. Ecco la definizione di "privato" secondo l’Oxford Dictionary:

> belonging to or for the use of one particular person or group of people only.

> appartenente o destinato esclusivamente all'uso di una determinata persona o gruppo di persone.

We have private conversations, private bathrooms, private parts. Business secrets, sensitive personal information, in the privacy of your own home. Keys, doors and locks.

Abbiamo conversazioni private, bagni privati, parti intime (private). Segreti aziendali, informazioni personali sensibili, la privacy della nostra casa. Chiavi, porte e serrature.

Privacy is normal, and it is all around us. It is closely related to notions of self-sovereignty, self-determination, and independence. These notions come so naturally to us that many important documents, such as the _US Bill of Rights_ and the _United Nations Charter_ recognize them as fundamental rights for individuals and nations, respectively. [^1] Privacy is a prerequisite for freedom.

La privacy è normale e ci circonda continuamente. È strettamente legata a concetti come sovranità individuale, autodeterminazione e indipendenza. Questi principi sono così radicati nella nostra cultura che documenti fondamentali come la _Carta dei Diritti degli Stati Uniti_ e lo _Statuto delle Nazioni Unite_ li riconoscono rispettivamente come diritti essenziali per individui e nazioni. [^1] La privacy è un presupposto fondamentale per la libertà.

More formally, the privacy property in ZKPs is often called _zero knowledge_ or _data hiding_. [^2] A ZKP hides data that is irrelevant for some application to function, and this data is then _bound_ together with the relevant application data. These notions are a bit more formal, and they enable privacy. Privacy is a broader and more generally applicable concept, so we'll keep focusing on that for now.

In termini più formali, la proprietà di privacy nelle ZKPs è spesso definita _zero knowledge_ (conoscenza zero) o _data hiding_ (occultamento dei dati). [^2] Una ZKP nasconde dati che risultano irrilevanti per il funzionamento di una certa applicazione, vincolandoli (_bound_) ai dati rilevanti dell’applicazione stessa. Queste nozioni, essendo un po' più formali, permettono di tutelare la privacy. Dato che quest'ultima è un concetto più ampio e versatile, per ora continueremo a concentrarci su di essa.

In the digital world, also known as cyberspace, as opposed to meatspace, privacy is essential too, but often neglected. Here's the definition of privacy given in _A Cypherpunk's Manifesto_:

Nel mondo digitale, chiamato anche cyberspazio (contrapposto allo spazio fisico, detto _meatspace_), la privacy è altrettanto fondamentale, ma spesso trascurata. Ecco la definizione di privacy secondo _A Cypherpunk's Manifesto_:

> Privacy is the power to selectively reveal oneself to the world.
>
> - A Cypherpunk's Manifesto [^3]

> La privacy è il potere di rivelarsi al mondo in modo selettivo.
>
> - A Cypherpunk's Manifesto [^3]

Conversations, passwords, credit card information. These are examples of things we want to keep private online. The Internet is a fantastic tool that connects us all, but it is also an open and wild sea. There are a lot of strangers and predators, and keeping certain information private is vital. Without it, things like online shopping or private messaging would be impossible.

Conversazioni, password, informazioni delle carte di credito. Questi sono esempi di cose che vogliamo mantenere private online. Internet è uno strumento straordinario che ci connette tutti, ma è anche un mare aperto e pericoloso. Ci sono molti estranei e malintenzionati, e mantenere private certe informazioni è vitale. Senza privacy, attività come lo shopping online o la messaggistica privata sarebbero impossibili.

You might think, "We can already keep things like passwords private, what's the big deal?". In a limited sense, you are correct for these specific examples. We'll have to use more imagination to truly understand what general-purpose programmable privacy enables.

Potresti pensare: "Possiamo già mantenere private informazioni come le password, dov'è la novità?". In un certo senso, hai ragione per questi esempi specifici. Ma dobbiamo sforzarci di immaginare qualcosa di più per comprendere appieno cosa renda possibile la privacy programmabile di natura general-purpose.

As an example, consider how Augustine, in his _Confessions (400 AD)_ found the act of "silent reading" by St Ambrose, a bishop, out of the ordinary. At the time, most people would read out loud. [^4]

Ad esempio, considera come Agostino, nelle sue _Confessioni (400 d.C.)_, trovasse insolito il fatto che il vescovo Ambrogio praticasse la "lettura silenziosa". All'epoca era normale leggere ad alta voce. [^4]

> When [Ambrose] read, his eyes scanned the page and his heart sought out the meaning, but his voice was silent and his tongue was still. Anyone could approach him freely and guests were not commonly announced, so that often, when we came to visit him, we found him reading like this in silence, for he never read aloud.

> Quando [Ambrogio] leggeva, gli occhi percorrevano le pagine e il cuore ne coglieva il significato, ma la voce taceva e la lingua restava immobile. Chiunque poteva avvicinarsi liberamente, e gli ospiti non venivano comunemente annunciati. Spesso quindi, quando andavamo a trovarlo, lo sorprendevamo assorto in silenzio in tale lettura, poiché non leggeva mai ad alta voce.

![Silent reading](../assets/01_silent-reading.jpg "Lettura silenziosa")

Nowadays, everyone takes silent reading for granted. It is even hard to imagine that it had to be invented. The idea that what you read was something for your eyes only used to be foreign. What other similar inventions are possible in our modern era? Things that most of us are currently unable to imagine.

Oggi diamo per scontata la lettura silenziosa, al punto da faticare a immaginare che sia stato necessario inventarla. Un tempo, l’idea che ciò che si legge potesse essere riservato ai soli occhi del lettore era inconcepibile. Quali altre invenzioni simili saranno possibili nella nostra era moderna? Cose che oggi molti di noi non riescono ancora neanche a immaginare.

In future sections, we'll get a glimpse of what such inventions using ZKPs, both existing and upcoming, look like.

Nelle prossime sezioni daremo uno sguardo a come potrebbero apparire queste invenzioni basate su ZKPs, sia quelle già esistenti sia quelle in arrivo.


### Compression

### Compressione

> I have made this longer than usual, only because I have not had the time to make it shorter.
>
> - Blaise Pascal [^5]

> L'ho reso più lungo del solito, soltanto perché non ho avuto il tempo per farlo più breve.
>
> - Blaise Pascal [^5]

To compress something is defined as:

La definizione di comprimere qualcosa è:

> to press something into a smaller space

> spingere qualcosa in uno spazio più piccolo

Similarly, succinctness is defined as:

Allo stesso modo, la sinteticità è definita come:

> the act of expressing something clearly in a few words

> l'atto di esprimere qualcosa in modo chiaro e conciso

ZKPs having the property of compression means we can prove that something is true with a very short statement. For example, that all the steps in some computation have been executed correctly. This is most immediately useful when some resource is in high demand and expensive. This is true in the case of the Ethereum blockchain, but it is also a very useful property in other circumstances. What is more remarkable, is that the size of this proof stays the same regardless of how complex the thing we are trying to prove is!

Quando diciamo che le ZKPs possiedono la proprietà di compressione, intendiamo che possiamo dimostrare la veridicità di qualcosa con una dichiarazione molto breve (succinct). Per esempio, che tutti i passaggi di un certo calcolo sono stati eseguiti correttamente. Questo è particolarmente utile quando una risorsa è molto richiesta e costosa. È il caso della blockchain di Ethereum, ma si tratta di una proprietà utile anche in molti altri contesti. E ciò che colpisce è che la dimensione della prova rimane invariata indipendentemente dalla complessità di ciò che si sta dimostrando!

What do we mean by "proof" and the "size of the proof"? These are mathematically precise notions that possess a great deal of nuance. In future sections, we'll go deeper into this notion of a proof in the context of ZKPs. For now, we can think of it as a short statement that we know is true, or can somehow verify is true.

Cosa intendiamo con "prova" e "dimensione della prova"? Si tratta di concetti matematicamente ben definiti e ricchi di sfumature. Nelle prossime sezioni approfondiremo cosa significa prova nel contesto delle ZKPs. Per ora possiamo considerarla come una dichiarazione breve che sappiamo essere vera, o che possiamo verificare come tale.

![Sherlock Holmes](../assets/01_sherlock-holmes.jpg "Sherlock Holmes")

In a typical whodunit like a Sherlock Holmes murder mystery, the detective gathers evidence until they can prove that the perpetrator has committed the murder. They then prove exactly how they know this in a grand finale. We can think of this final statement as the proof. [^6]

In un classico giallo alla Sherlock Holmes, il detective raccoglie indizi finché non può dimostrare chi ha commesso l’omicidio. E poi, nel gran finale, spiega esattamente come è arrivato a questa conclusione. Possiamo considerare questa dichiarazione finale come la prova. [^6]

More formally, we call this property _succinctness_. [^7] This is what keeps the size of the proof the same regardless of what we are trying to prove. In the context of public blockchains, this also relates to the notion of _scalability_. For public blockchains like Ethereum, where block space is limited and expensive, ZKPs can make transactions a lot cheaper and faster. How? We create a proof that some set of transactions have taken place and put that tiny proof on-chain, as opposed to having all transactions take up space on the blockchain. With ZKPs, this can be made very secure.

In termini più tecnici, questa proprietà si chiama _succinctness_ (sinteticità). [^7] È ciò che consente alla prova di mantenere la stessa dimensione indipendentemente da ciò che vogliamo dimostrare. Nel contesto delle blockchain pubbliche, questa proprietà è legata anche al concetto di _scalabilità_. Per blockchain come Ethereum, dove lo spazio nei blocchi è limitato e costoso, le ZKPs possono rendere le transazioni molto più economiche e rapide. Come? Creando una prova che certi insiemi di transazioni sono avvenuti, e registrando solo quella prova sintetica sulla blockchain, anziché l’intero contenuto delle transazioni. Con le ZKPs, questo processo può essere realizzato in modo estremamente sicuro.

Succinctness is a general property and orthogonal to "blockchains" - they just happen to be a good fit, for many reasons. More generally, having a short proof that something is true is very useful. There are a few ways to see why.

La sinteticità è una proprietà generale e indipendente dalle blockchain: semplicemente, queste ne traggono particolare beneficio per molte ragioni. In generale, avere una prova breve che qualcosa è vero è estremamente utile. Vediamo alcuni motivi.

One way of looking at it is to consider _transaction costs_. [^8] Generally speaking, the lower these are, the more value and wealth is created. If there are fewer things to verify, or it is easier to do, then we can do things more freely and with ease.

Un modo per comprenderlo è pensare ai _costi di transazione_. [^8] In linea generale, più questi sono bassi, più valore e ricchezza si generano. Se ci sono meno cose da verificare, o se è più facile farlo, possiamo agire con maggiore libertà ed efficienza.

Sometimes when we fill in a form we are asked to write our email twice to confirm it is correct. The idea is to protect against human errors and make the transmission of data more robust. There are also things like checksums, where an extra digit in your UPS package code, credit card number, or ISBN code for books acts as a simple check that all the numbers are probably correct. All of these are - obviously - not meant to protect against malicious use, but only against innocent mistakes.  [^9]

A volte, quando compiliamo un modulo online, ci viene chiesto di inserire due volte l’email per confermare che sia corretta. L’obiettivo è prevenire errori umani e rendere la trasmissione dei dati più affidabile. Esistono anche strumenti come i checksum: un numero extra nei codici dei pacchi UPS, nei numeri delle carte di credito o nei codici ISBN dei libri, che serve da controllo semplificato per verificare che tutto sia probabilmente corretto. Tutti questi meccanismi non servono – ovviamente – a proteggere da attacchi malevoli, ma solo da errori involontari. [^9]

In computer file systems, a _hash_ is often used to ensure the integrity of files. If something happens to just a small part of a file, corrupting it, the hash changes completely. Because the hash is succinct (say, a 64 character string), it is easy to keep around and check even if the underlying file is huge. In this case, hash functions ensure integrity in a secure way. If we checked the integrity of a file by just keeping a copy of the file it'd be a lot more impractical. Big file, small file, it doesn't matter; the hash stays the same size. The succinctness of a hash enables this use case.

Nei file system dei computer, un _hash_ viene spesso usato per garantire l’integrità dei file. Se anche solo una piccola parte del file viene alterata, l’hash cambia completamente. Poiché un hash è sintetico (per esempio, una stringa di 64 caratteri), è facile da conservare e verificare anche quando il file originale è molto grande. In questo caso, le funzioni hash assicurano l’integrità in modo sicuro. Se dovessimo verificare l’integrità di un file conservandone una copia completa, sarebbe molto più complesso. File grande o piccolo, non importa: l’hash mantiene sempre la stessa dimensione. È proprio la sinteticità dell’hash a rendere possibile tutto questo.


### What do you know?

### Cosa sai davvero?

Let's take a step back from compression, succinctness, and proofs. We'll go on a little detour into knowledge, mental overhead, and trust. We'll then connect this back with ZKPs at the end of the section.

Facciamo un passo indietro rispetto a compressione, sinteticità e prove. Prendiamoci una breve deviazione per parlare di conoscenza, carico cognitivo e fiducia. Alla fine della sezione, collegheremo tutto questo di nuovo alle ZKPs.

In your everyday life, what do you know is true, and why? If you see the sun rise every day, you likely expect it to rise again tomorrow. In the modern world, we are largely protected from the harsh environment in nature, but on the flip side, we have a lot of other, more modern, concerns. Many of these are related to various institutions we deal with on a daily basis.

Nella vita quotidiana, cosa sai essere vero e perché? Se vedi il sole sorgere ogni giorno, probabilmente ti aspetti che sorga anche domani. Nel mondo moderno siamo in gran parte protetti dalla costanza che ci da la natura, ma in compenso abbiamo tante altre preoccupazioni, più moderne. Molte di queste hanno a che fare con le istituzioni con cui interagiamo ogni giorno.

If you are able to withdraw cash from your bank every day, do you expect to be able to withdraw it again the next day? Most people would probably say yes, but not everyone all the time. This depends on a lot of factors: if the bank is trustworthy, if you're living in a safe jurisdiction, if something major has happened in the world economy recently, what your personal circumstances are like etc. All of these things together make up some data points, and based on that you make a determination.

Se riesci a prelevare contanti dalla tua banca ogni giorno, ti aspetti di poterlo fare anche domani? La maggior parte delle persone probabilmente direbbe di sì, ma non è sempre così per tutti. Dipende da diversi fattori: se la banca è affidabile, se vivi in una giurisdizione stabile, se recentemente ci sono stati eventi importanti nell’economia globale, o qual è la tua situazione personale. Tutti questi elementi forniscono indizi, e su quella base prendi una decisione.

This is obviously a trivial example, but life is full of such interactions. All of this can be seen as a form of mental overhead. The extent to which this is a concern can depend on your personal situation and the complexity of your day-to-day dealings. For instance, a business might give these factors a lot more thought when entering into a contract with another party.

Questo è ovviamente un esempio banale, ma la vita ne è piena. Tutto ciò può essere visto come una forma di carico cognitivo. Quanto questo incida dipende dalla tua situazione personale e dalla complessità delle tue interazioni quotidiane. Per esempio, un’azienda prenderà in seria considerazione questi fattori quando stipula un contratto con un’altra parte.

We create mechanisms and rules to counteract this uncertainty, such as using reputation services, independent auditing, imposing fines to discourage bad behavior, seeking accreditation by some trusted institutions, etc. All these measures are basically duct tape, trying to get to the crux of the matter. Is something what it claims to be? Does it follow the rules we have established? And is it trustworthy and usable?

Creiamo meccanismi e regole per gestire questa incertezza: servizi di reputazione, audit indipendenti, sanzioni per scoraggiare comportamenti scorretti, richiesta di accreditamento presso alcune istituzioni fidate, ecc. Tutte queste misure sono in sostanza dei cerotti, tentativi di arrivare al cuore del problema. È davvero ciò che dichiara di essere? Rispetta le regole che abbiamo stabilito? È affidabile e utilizzabile?

All of this mental overhead gets compounded when you are dealing with multiple institutions, jurisdictions, companies, and people. You can get cascading effects, such as your bank failing and you being unable to pay your employees, thus leading to your business being unable to service its customers. [^10] More control measures are needed. More pauses to consider if things are right and what can go wrong.

Questo carico cognitivo aumenta drasticamente quando si interagisce con più istituzioni, giurisdizioni, aziende e persone. Possono verificarsi effetti a catena: la tua banca fallisce, non riesci a pagare i dipendenti, e di conseguenza la tua attività non riesce a servire i clienti. [^10] Servono più controlli. Più momenti per chiedersi se tutto stia funzionando e cosa potrebbe andare storto.

I'll end this section with a quote:

Concludo questa sezione con una citazione:

> Civilization advances by extending the number of operations we can perform without thinking about them.
>
> - Alfred North Whitehead [^11]

> La civiltà avanza aumentando il numero di operazioni che possiamo compiere senza pensarci.
>
> - Alfred North Whitehead [^11]

For example, when you light the stove to make dinner, you don't even have to think about making a fire. This is very different from having to gather wood, keep it dry, create a fire, and keep it going, a very time-consuming process. In mathematics, without calculus, we wouldn't be able to go to the moon.

Per esempio, quando accendi il fornello per cucinare, non devi nemmeno pensare a come accendere un fuoco. È ben diverso da raccogliere legna, mantenerla asciutta, accendere la fiamma e tenerla viva, un processo che richiede tempo. In matematica, senza il calcolo infinitesimale, non saremmo mai andati sulla Luna.

![Aldrin, Apollo 11](../assets/01_apollo-aldrin.jpg "Aldrin, Apollo 11")

With ZKPs and succinct proofs, we are able to introduce more certainty and clarity into opaque systems. This gets even more powerful when we consider _composing_ ZKPs. That is combining multiple proofs into one in some fashion, such as with aggregation or recursion.

Grazie alle ZKPs e alle prove sintetiche, possiamo introdurre maggiore certezza e trasparenza in sistemi opachi. Questo diventa ancora più potente quando consideriamo la _composizione_ delle ZKPs: ovvero la possibilità di combinare più prove in una sola, ad esempio tramite aggregazione o ricorsione.

All of this presumes we can translate some of the mechanisms or rules mentioned above - which are often messy and inconsistent - into a form that ZKPs can comprehend. How can we do that?

Tutto questo presuppone che possiamo tradurre almeno alcune delle regole o dei meccanismi citati, spesso confusi e incoerenti, in una forma che le ZKPs possano comprendere. Come possiamo riuscirci?


### General-purpose

### General-purpose

Recall that ZKPs allow us to prove arbitrary statements in a general-purpose fashion. Why does this matter and how is this powerful?

Ricordiamo che le ZKPs ci permettono di dimostrare asserzioni arbitrarie in modo general-purpose (generico). Perché questo è importante e in che modo rappresenta un vantaggio?

The difference between similar existing tools and ZKPs is like the difference between a calculator and a computer. One is meant for a very specific task, and the other is general-purpose. It is the difference between this calculating machine [^12] and a modern computer:

La differenza tra strumenti esistenti simili e le ZKPs è paragonabile alla differenza tra una calcolatrice e un computer. Una è pensata per un compito molto specifico, l’altro è general-purpose. È la differenza tra questa macchina calcolatrice [^12] e un computer moderno:

![Pascal's calculator](../assets/01_pascals-calculator2.jpg "Calcolatrice di Pascal")

Recall the specific examples we gave above to represent privacy and succinctness more concretely. A password is a private piece of information that allows you to log in to some service [^13]. In the case of a hash of some input data, such as a file, it gives us something succinct to check equality to.

Ricorda gli esempi specifici che abbiamo usato prima per rappresentare in modo concreto privacy e sinteticità. Una password è un'informazione privata che ti permette di accedere a un servizio [^13]. Un hash di un dato in ingresso, come un file, ci offre invece un riferimento sintetico per verificarne l’identità.

We can visualize a hash function as follows:

Possiamo rappresentare graficamente una funzione di hash in questo modo:

![Hash function](../assets/01_graphviz-hash.png "Funzione di hash")

We apply a specific hash function, such as SHA256 [^14], on some known input data. For example, using the sentence "The quick brown fox jumps over the lazy dog" (without quotation marks) as input and applying the SHA256 hash function results in the hash `d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592`. Adding a "." at the end of the sentence gives a completely different hash value: "The quick brown fox jumps over the lazy dog." hashes to `ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c`.

Applichiamo una specifica funzione di hash, come SHA256 [^14], su un dato noto. Ad esempio, usando come input la frase "The quick brown fox jumps over the lazy dog" (senza virgolette) e applicando la funzione SHA256, otteniamo l’hash `d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592`. Basta aggiungere un punto alla fine della frase per ottenere un hash completamente diverso: "The quick brown fox jumps over the lazy dog." produce `ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c`.

Even though the sentence just changed a tiny bit, the resulting hashes are very different [^15]. Hash functions that are secure are hard to "break" and have some nice properties. For example, if you have the hash value, you can't recreate the initial input. You also can't easily construct a message that hashes to a specific, predetermined hash value. These hash functions are called _cryptographic hash functions_ [^16].

Anche se la frase cambia solo di poco, gli hash risultanti sono completamente diversi [^15]. Le funzioni di hash sicure sono difficili da “rompere” e hanno proprietà interessanti. Ad esempio, dato un hash non si può risalire all’input originale. Inoltre, non è facile costruire un messaggio che produca un hash specifico prestabilito. Queste funzioni sono dette _funzioni di hash crittografiche_ [^16].

The SHA256 hash function we used above is a specific cryptographic hash function that took a lot of time and many people to make secure. The hash itself also doesn't prove anything. It only makes sense when compared with something else, such as having direct access to the message or file.

La funzione SHA256 usata sopra è una funzione di hash crittografica specifica, il cui sviluppo ha richiesto molto tempo e lavoro collettivo. Ma l’hash in sé non dimostra nulla. Ha senso solo se confrontato con qualcos’altro, come l’accesso diretto al messaggio o al file originale.

Informally, we can think of a hash function as providing a proof that some specific message corresponds to a particular hash. We can only verify this with the original message. Sometimes people use this to prove they wrote something and make predictions - they write "On April 1, 2040, aliens will land on top of Big Ben in London, and the lottery number 25742069 will win a jackpot." and then post the hash of this message publicly ahead of time, say on Twitter. When it turns out they are right, they can reveal the original message, and people can be convinced that they did predict the future and are the next Nostradamus.

In modo informale, possiamo considerare una funzione di hash come una prova che un certo messaggio corrisponde a un dato hash. Ma possiamo verificarlo solo conoscendo il messaggio originale. A volte, le persone usano questa tecnica per dimostrare di aver scritto qualcosa in anticipo e fare previsioni, scrivono frasi tipo "Il 1° aprile 2040, gli alieni atterreranno sul Big Ben a Londra e il numero 25742069 vincerà la lotteria", e poi pubblicano l’hash di quel messaggio, ad esempio su Twitter. Se poi si rivelano avere ragione, possono mostrare il messaggio originale e convincere tutti di essere i nuovi Nostradamus.

In contrast, we can visualize a ZKP as follows:

Al contrario, possiamo rappresentare una ZKP in questo modo:

![ZKP](../assets/01_graphviz-zkp.png "ZKP")

Unlike in the hash function above, there are a few big differences:

A differenza della funzione di hash vista prima, ci sono alcune differenze fondamentali:

- We have multiple private and public inputs as opposed to only a single (public) input
- Possiamo avere più input pubblici e privati, non solo un singolo input pubblico
- We can use any program, not just a cryptographic hash function
- Possiamo usare qualsiasi programma, non solo una funzione crittografica di hash
- We produce a self-contained proof that can be verified
- Otteniamo una prova autosufficiente che può essere verificata

In the hash function example above, we need to make the input public in order to verify that the message corresponds to the hash. For ZKPs, we can also have _private input_. Private input is something that only you can see. That is, you don't need to reveal it to anyone in order to produce a proof.

Nel caso dell’hash, dobbiamo rendere pubblico l’input per verificare che corrisponda all’hash. Con le ZKPs invece possiamo avere anche un _input privato_. L’input privato è qualcosa che solo tu conosci, e che non devi rivelare a nessuno per generare una prova.

For example, in the "Where's Waldo" case at the beginning of this article, the public input would be the picture of Where's Waldo. The private input is the actual location of Waldo. I can produce a proof that I know where Waldo is without revealing the private input, the location of Waldo, to you.

Ad esempio, nel caso di "Dov’è Wally" visto all’inizio, l’input pubblico è l’immagine. L’input privato è la posizione di Wally. Posso generare una prova che dimostra che so dove si trova Wally senza rivelarti la posizione.

Similarly, if I have a Sudoku puzzle (a popular logic puzzle), I can prove to you that I know a solution to the puzzle without revealing the solution to you. In this case, the public input is the initial puzzle, and the private input is the solution to the puzzle.

Allo stesso modo, se ho un Sudoku (un popolare rompicapo logico), posso dimostrarti di conoscere la soluzione senza rivelartela. In questo caso, l’input pubblico è il puzzle iniziale e quello privato è la soluzione.

You might have noticed that Where's Waldo and solving a Sudoku puzzle are two very different problems. Yet we can write a simple program that expresses how either of these works and uses ZKP to create a proof. That is because the logic inside this special program is general-purpose and can compute anything a computer can.

Avrai notato che "Dov’è Wally" e risolvere un Sudoku sono due problemi molto diversi. Eppure possiamo scrivere un semplice programma che descrive entrambi e usare una ZKP per creare la prova. Questo è possibile perché la logica del programma è general-purpose e può calcolare qualsiasi cosa sia computabile da un computer.

We have turned what was originally a problem of cryptography or math - defining and making a cryptographic hash function secure - into one of programming. To see why this is extremely powerful, consider some of the following examples.

Abbiamo trasformato quello che era un problema di crittografia o matematica (definire e rendere sicura una funzione di hash) in un problema di programmazione. Per capire perchè questo è estremamente potente, considera i seguenti esempi.

We can now prove that we know the private data that results in a certain hash [^17]. This means you can prove that you are in possession of a certain message, such as an important document, without revealing the message itself.

Ora possiamo dimostrare di conoscere il dato privato che genera un determinato hash [^17]. Questo significa che puoi provare di avere un certo messaggio, come un documento importante, senza mostrarlo.

To better understand the power of doing general-purpose computing, let's take a closer look at group signature. Group signatures are a way for a group of individuals to sign a document together, without revealing who they are. For example, the Federalist Papers were signed by the pseudonym Publius which represented multiple individuals [^18]. Just like in the case of the SHA256 hash function, there's a way to express group signatures with cryptography and math. This is very impressive and took a lot of cryptographic engineering to develop. But with general-purpose ZKPs anyone can express the same thing in just a few dozen lines of Circom, a programming language for ZKPs, code [^19].

Per capire meglio la potenza della computazione general-purpose, guardiamo più da vicino le firme di gruppo. Le _group signature_ permettono a più persone di firmare un documento insieme, senza rivelare chi sono. Ad esempio, i Federalist Papers furono firmati dallo pseudonimo "Publius", che rappresentava più autori [^18]. Come per la funzione SHA256, è possibile rappresentare le firme di gruppo tramite crittografia e matematica. È un risultato straordinario, frutto di grande ingegneria crittografica. Ma con ZKPs general-purpose, chiunque può esprimere lo stesso concetto con poche decine di righe in Circom, un linguaggio di programmaione per scrivere ZKPs [^19].

Due to its general nature, we can easily make ad hoc constructions. For example, you might have an ID card that has your full name, address, and other personal information. To enter an event, you might need to be over 18 and have a valid ticket. You might not want a random person or online system to see your address or risk having your ID stolen. With ZKPs you can prove that:

Grazie alla loro natura generale, possiamo costruire facilmente soluzioni su misura. Ad esempio, potresti avere una carta d’identità con nome, indirizzo e altri dati personali. Per accedere a un evento potresti dover dimostrare di avere più di 18 anni e un biglietto valido. Ma potresti non voler mostrare il tuo indirizzo o rischiare che ti venga rubato il documento. Con le ZKPs puoi dimostrare che:

- Possiedi un documento valido
- Il documento è stato emesso da un ente autorizzato negli ultimi 5 anni
- Il documento non è stato revocato o denunciato come rubato nell'ultimo periodo
- Hai più di 18 anni
- Hai acquistato un biglietto valido per l’evento
- Il biglietto non è già stato usato

All without revealing any single fact about yourself other than what is listed above.

Tutto ciò senza rivelare nessuna informazione personale oltre a quelle elencate.

With ZKPs, we now have a _better tool_ for people to coordinate in various ways, especially when it comes to systems where you want _privacy_ and _succinctness_. We'll see even more examples in the application section.

Con le ZKPs abbiamo ora uno _strumento migliore_ per coordinare persone e sistemi, soprattutto in contesti dove servono _privacy_ e _sinteticità_. Vedremo altri esempi nella sezione dedicata alle applicazioni.

Often, it is your imagination that is the limit in terms of what you can express.

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

Tornando al nostro protocollo, abbiamo un prover (dimostratore) e un verifier (verificatore). Il prover crea una prova usando una _prover key_, l’input privato e l’input pubblico. Il verifier verifica la prova utilizzando una _verification key_ e l’input pubblico, e restituisce come risultato `true` o `false`.

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
