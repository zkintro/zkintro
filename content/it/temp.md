---

title: 'Guida introduttiva alle Zero Knowledge Proofs'
date: '2023-07-17'
tags: \['zero-knowledge']
draft: false
layout: PostSimple
slug: "/it/friendly-introduction-to-zero-knowledge"
images: \['../assets/01\_zkp-magic.png']
summary: "Le Zero Knowledge Proofs sono pura magia. Ci permettono di realizzare cose che prima non avremmo nemmeno immaginato. Questo è il primo di una serie di articoli sulle Zero Knowledge Proofs e le loro applicazioni. Vedremo cosa sono, perché dovrebbero interessarci, come funzionano e dove possono essere utilizzate."
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

![La magia degli ZKP](../assets/01_zkp-magic.png "La magia degli ZKP")

## Introduction

## Introduzione

Zero Knowledge Proofs are magic. They allow us to do things we couldn't dream of before.

Le Zero Knowledge Proofs (ZKPs, dimostrazioni a conoscenza zero) sono pura magia. Ci permettono di realizzare cose che prima non avremmo nemmeno immaginato.

Let me start with a few quotes to tickle your brain. Some might be familiar, while others might be new to you.

Cominciamo con alcune citazioni per stuzzicare la curiosità. Alcune vi saranno familiari, altre forse no.

> Any sufficiently advanced technology is indistinguishable from magic.
>
> * Arthur C. Clarke

> Ogni tecnologia sufficientemente avanzata è indistinguibile dalla magia.
>
> * Arthur C. Clarke

> Civilization advances by extending the number of operations we can perform without thinking about them.
>
> * Alfred North Whitehead

> La civiltà avanza aumentando il numero di operazioni che possiamo compiere senza pensarci.
>
> * Alfred North Whitehead

> I have made this longer than usual, only because I have not had the time to make it shorter.
>
> * Blaise Pascal

> L'ho reso più lungo del solito, soltanto perché non ho avuto il tempo per farlo più breve.
>
> * Blaise Pascal

> Privacy is the power to selectively reveal oneself to the world.
>
> * A Cypherpunk's Manifesto

> La privacy è il potere di rivelarsi al mondo in modo selettivo.
>
> * Un manifesto Cypherpunk

> The future is already here. It's just not evenly distributed yet.
>
> * William Gibson

> Il futuro è già qui, semplicemente non è ancora equamente distribuito.
>
> * William Gibson

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

*This section introduces the notion of a Zero Knowledge Proof*

*Questa sezione introduce il concetto di Zero Knowledge Proof*

This is the first in a series of posts on Zero Knowledge Proofs and their application. We'll look at what Zero Knowledge Proofs are, why you should care, how they work, and see where they can be used.

Questo è il primo di una serie di articoli sulle Zero Knowledge Proofs e le loro applicazioni. Vedremo cosa sono le Zero Knowledge Proofs, perché dovrebbero interessarci, come funzionano e dove possono essere utilizzate.

Imagine you go to a bar and can prove you are over 18 without revealing anything else, including your ID with personal information on it. Or you can prove that you've paid your taxes correctly, without revealing the details of your income or assets to anyone. These are the kind of things Zero Knowledge Proofs (ZKPs) enables. The term *zero knowledge* simply means we don't reveal any more information beyond what is intended.

Immagina di entrare in un bar e dimostrare di avere più di 18 anni senza rivelare nient’altro, nemmeno il tuo documento con tutte le informazioni personali. Oppure immagina di dimostrare di aver pagato correttamente le tasse, senza rivelare dettagli sul tuo reddito o patrimonio. Questi sono esempi di quello che le Zero Knowledge Proofs (ZKPs) consentono di fare. Il termine *zero knowledge* ("conoscenza zero") significa semplicemente che non viene rivelata alcuna informazione oltre quella strettamente necessaria.

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

*This section explains why someone might care about ZKPs, including going into detail on privacy, compression, and the general-purpose nature of ZKPs*

*Questa sezione spiega perché qualcuno potrebbe interessarsi alle ZKPs, approfondendo aspetti come privacy, compressione e la loro natura general-purpose.*

Reading the above section you might think, "ok, that's kinda neat I guess, but why should I care". That's a completely reasonable take. In fact, you probably shouldn't! Just like you shouldn't care about how computers work, where AI is going, or any of these things.

Dopo aver letto la sezione precedente potresti pensare: "Va bene, carino, ma perché dovrebbe interessarmi?". È un pensiero più che ragionevole. Anzi, forse non dovrebbe proprio interessarti! Così come potresti non interessarti di come funzionano i computer, dove ci porterà l’intelligenza artificiale o cose simili.

Why *might you care*? Because you are curious and want to understand how ZKPs work, and what type of interactions it unlocks. The mechanism is very general, and the intuition for many people working in the space is that it is fundamentally a new paradigm that unlocks a lot of new things. We are seeing this already, and it seems like we are just at the very beginning of this. In the rest of this section, I'll give you some intuition as to why and how.

Perché allora *potrebbe* interessarti? Perché sei curioso, vuoi capire come funzionano le ZKPs e quali tipi di interazioni possono abilitare. Si tratta di un meccanismo molto generale, e per molti di coloro che lavorano in questo ambito rappresenta fondamentalmente un nuovo paradigma che rende possibili molte cose nuove. È un cambiamento che sta già avvenendo, e sembra che siamo soltanto agli inizi. Nel resto di questa sezione proverò a fornirti qualche intuizione sul perché e sul come.

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

Privacy is normal, and it is all around us. It is closely related to notions of self-sovereignty, self-determination, and independence. These notions come so naturally to us that many important documents, such as the *US Bill of Rights* and the *United Nations Charter* recognize them as fundamental rights for individuals and nations, respectively.\[^1] Privacy is a prerequisite for freedom.

La privacy è normale e ci circonda continuamente. È strettamente legata a concetti come sovranità individuale, autodeterminazione e indipendenza. Questi principi sono così radicati nella nostra cultura che documenti fondamentali come la *Carta dei Diritti degli Stati Uniti* e lo *Statuto delle Nazioni Unite* li riconoscono rispettivamente come diritti essenziali per individui e nazioni.\[^1] La privacy è un presupposto fondamentale per la libertà.

More formally, the privacy property in ZKPs is often called *zero knowledge* or *data hiding*.\[^2] A ZKP hides data that is irrelevant for some application to function, and this data is then *bound* together with the relevant application data. These notions are a bit more formal, and they enable privacy. Privacy is a broader and more generally applicable concept, so we'll keep focusing on that for now.

In termini più formali, la proprietà di privacy nelle ZKPs è spesso definita *zero knowledge* (conoscenza zero) o *data hiding* (occultamento dei dati).\[^2] Una ZKP nasconde dati che risultano irrilevanti per il funzionamento di una certa applicazione, vincolandoli (*bound*) ai dati rilevanti dell’applicazione stessa. Queste definizioni sono più tecniche, ma consentono la privacy. Siccome il concetto di privacy è più ampio e più facilmente applicabile, continueremo a concentrarci principalmente su questo.

In the digital world, also known as cyberspace, as opposed to meatspace, privacy is essential too, but often neglected. Here's the definition of privacy given in *A Cypherpunk's Manifesto*:

Nel mondo digitale, chiamato anche cyberspazio (contrapposto allo spazio fisico, detto *meatspace*), la privacy è altrettanto fondamentale, ma spesso trascurata. Ecco la definizione di privacy secondo *Un manifesto Cypherpunk*:

> Privacy is the power to selectively reveal oneself to the world.
>
> * A Cypherpunk's Manifesto\[^3]

> La privacy è il potere di rivelarsi al mondo in modo selettivo.
>
> * Un manifesto Cypherpunk\[^3]

Conversations, passwords, credit card information. These are examples of things we want to keep private online. The Internet is a fantastic tool that connects us all, but it is also an open and wild sea. There are a lot of strangers and predators, and keeping certain information private is vital. Without it, things like online shopping or private messaging would be impossible.

Conversazioni, password, informazioni delle carte di credito. Questi sono esempi di cose che vogliamo mantenere private online. Internet è uno strumento straordinario che ci connette tutti, ma è anche un mare aperto e pericoloso. Ci sono molti estranei e malintenzionati, e mantenere private certe informazioni è vitale. Senza privacy, attività come lo shopping online o la messaggistica privata sarebbero impossibili.

You might think, "We can already keep things like passwords private, what's the big deal?". In a limited sense, you are correct for these specific examples. We'll have to use more imagination to truly understand what general-purpose programmable privacy enables.

Potresti pensare: "Possiamo già mantenere private informazioni come le password, dov'è la novità?". In senso limitato, hai ragione se ci limitiamo a questi esempi specifici. Ma dobbiamo sforzarci di immaginare qualcosa di più per comprendere appieno cosa renda possibile la privacy programmabile di natura general-purpose.

As an example, consider how Augustine, in his *Confessions (400 AD)* found the act of "silent reading" by St Ambrose, a bishop, out of the ordinary. At the time, most people would read out loud.\[^4]

Ad esempio, considera come Agostino, nelle sue *Confessioni (400 d.C.)*, trovasse insolito il fatto che il vescovo Ambrogio praticasse la "lettura silenziosa". All'epoca era normale leggere ad alta voce.\[^4]

> When \[Ambrose] read, his eyes scanned the page and his heart sought out the meaning, but his voice was silent and his tongue was still. Anyone could approach him freely and guests were not commonly announced, so that often, when we came to visit him, we found him reading like this in silence, for he never read aloud.

> Quando \[Ambrogio] leggeva, gli occhi percorrevano le pagine e il cuore ne coglieva il significato, ma la voce taceva e la lingua restava immobile. Chiunque poteva avvicinarsi liberamente, e gli ospiti non venivano comunemente annunciati. Spesso quindi, quando andavamo a trovarlo, lo sorprendevamo assorto in silenzio in tale lettura, poiché non leggeva mai ad alta voce.

![Silent reading](../assets/01_silent-reading.jpg "Lettura silenziosa")

Nowadays, everyone takes silent reading for granted. It is even hard to imagine that it had to be invented. The idea that what you read was something for your eyes only used to be foreign. What other similar inventions are possible in our modern era? Things that most of us are currently unable to imagine.

Oggi diamo per scontata la lettura silenziosa, al punto da faticare a immaginare che sia stato necessario inventarla. Un tempo, l’idea che ciò che si legge potesse essere riservato ai soli occhi del lettore era inconcepibile. Quali altre invenzioni simili saranno possibili nella nostra era moderna? Cose che oggi molti di noi non riescono ancora neanche a immaginare.

In future sections, we'll get a glimpse of what such inventions using ZKPs, both existing and upcoming, look like.

Nelle prossime sezioni daremo uno sguardo a come potrebbero apparire queste invenzioni basate su ZKPs, sia quelle già esistenti sia quelle in arrivo.


### Compression

### Compressione

> I have made this longer than usual, only because I have not had the time to make it shorter.
>
> * Blaise Pascal\[^5]

> L'ho reso più lungo del solito, soltanto perché non ho avuto il tempo per farlo più breve.
>
> * Blaise Pascal\[^5]

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

In a typical whodunit like a Sherlock Holmes murder mystery, the detective gathers evidence until they can prove that the perpetrator has committed the murder. They then prove exactly how they know this in a grand finale. We can think of this final statement as the proof. \[^6]

In un classico giallo alla Sherlock Holmes, il detective raccoglie indizi finché non può dimostrare chi ha commesso l’omicidio. E poi, nel gran finale, spiega esattamente come è arrivato a questa conclusione. Possiamo considerare questa dichiarazione finale come la prova.\[^6]

More formally, we call this property *succinctness*.\[^7] This is what keeps the size of the proof the same regardless of what we are trying to prove. In the context of public blockchains, this also relates to the notion of *scalability*. For public blockchains like Ethereum, where block space is limited and expensive, ZKPs can make transactions a lot cheaper and faster. How? We create a proof that some set of transactions have taken place and put that tiny proof on-chain, as opposed to having all transactions take up space on the blockchain. With ZKPs, this can be made very secure.

In termini più tecnici, questa proprietà si chiama *succinctness* (sinteticità).\[^7] È ciò che consente alla prova di mantenere la stessa dimensione indipendentemente da ciò che vogliamo dimostrare. Nel contesto delle blockchain pubbliche, questa proprietà è legata anche al concetto di *scalabilità*. Per blockchain come Ethereum, dove lo spazio nei blocchi è limitato e costoso, le ZKPs possono rendere le transazioni molto più economiche e rapide. Come? Creando una prova che certi insiemi di transazioni sono avvenuti, e registrando solo quella prova sintetica sulla blockchain, anziché l’intero contenuto delle transazioni. Con le ZKPs, questo processo può essere realizzato in modo estremamente sicuro.

Succinctness is a general property and orthogonal to "blockchains" - they just happen to be a good fit, for many reasons. More generally, having a short proof that something is true is very useful. There are a few ways to see why.

La sinteticità è una proprietà generale e indipendente dalle blockchain: semplicemente, queste ne traggono particolare beneficio per molte ragioni. In generale, avere una prova breve che qualcosa è vero è estremamente utile. Vediamo alcuni motivi.

One way of looking at it is to consider *transaction costs*.\[^8] Generally speaking, the lower these are, the more value and wealth is created. If there are fewer things to verify, or it is easier to do, then we can do things more freely and with ease.

Un modo per comprenderlo è pensare ai *costi di transazione*.\[^8] In linea generale, più questi sono bassi, più valore e ricchezza si generano. Se ci sono meno cose da verificare, o se è più facile farlo, possiamo agire con maggiore libertà ed efficienza.

Sometimes when we fill in a form we are asked to write our email twice to confirm it is correct. The idea is to protect against human errors and make the transmission of data more robust. There are also things like checksums, where an extra digit in your UPS package code, credit card number, or ISBN code for books acts as a simple check that all the numbers are probably correct. All of these are - obviously - not meant to protect against malicious use, but only against innocent mistakes. \[^9]

A volte, quando compiliamo un modulo online, ci viene chiesto di inserire due volte l’email per confermare che sia corretta. L’obiettivo è prevenire errori umani e rendere la trasmissione dei dati più affidabile. Esistono anche strumenti come i checksum: un numero extra nei codici dei pacchi UPS, nei numeri delle carte di credito o nei codici ISBN dei libri, che serve da controllo semplificato per verificare che tutto sia probabilmente corretto. Tutti questi meccanismi non servono – ovviamente – a proteggere da attacchi malevoli, ma solo da errori involontari.\[^9]

In computer file systems, a *hash* is often used to ensure the integrity of files. If something happens to just a small part of a file, corrupting it, the hash changes completely. Because the hash is succinct (say, a 64 character string), it is easy to keep around and check even if the underlying file is huge. In this case, hash functions ensure integrity in a secure way. If we checked the integrity of a file by just keeping a copy of the file it'd be a lot more impractical. Big file, small file, it doesn't matter; the hash stays the same size. The succinctness of a hash enables this use case.

Nei file system dei computer, un *hash* viene spesso usato per garantire l’integrità dei file. Se anche solo una piccola parte del file viene alterata, l’hash cambia completamente. Poiché un hash è sintetico (per esempio, una stringa di 64 caratteri), è facile da conservare e verificare anche quando il file originale è molto grande. In questo caso, le funzioni hash assicurano l’integrità in modo sicuro. Se dovessimo verificare l’integrità di un file conservandone una copia completa, sarebbe molto più complesso. File grande o piccolo, non importa: l’hash mantiene sempre la stessa dimensione. È proprio la sinteticità dell’hash a rendere possibile tutto questo.


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

All of this mental overhead gets compounded when you are dealing with multiple institutions, jurisdictions, companies, and people. You can get cascading effects, such as your bank failing and you being unable to pay your employees, thus leading to your business being unable to service its customers.\[^10] More control measures are needed. More pauses to consider if things are right and what can go wrong.

Questo carico cognitivo aumenta drasticamente quando si interagisce con più istituzioni, giurisdizioni, aziende e persone. Possono verificarsi effetti a catena: la tua banca fallisce, non riesci a pagare i dipendenti, e di conseguenza la tua attività non riesce a servire i clienti.\[^10] Servono più controlli. Più momenti per chiedersi se tutto stia funzionando e cosa potrebbe andare storto.

I'll end this section with a quote:

Concludo questa sezione con una citazione:

> Civilization advances by extending the number of operations we can perform without thinking about them.
>
> * Alfred North Whitehead\[^11]

> La civiltà avanza aumentando il numero di operazioni che possiamo compiere senza pensarci.
>
> * Alfred North Whitehead\[^11]

For example, when you light the stove to make dinner, you don't even have to think about making a fire. This is very different from having to gather wood, keep it dry, create a fire, and keep it going, a very time-consuming process. In mathematics, without calculus, we wouldn't be able to go to the moon.

Per esempio, quando accendi il fornello per cucinare, non devi nemmeno pensare a come accendere un fuoco. È ben diverso da raccogliere legna, mantenerla asciutta, accendere la fiamma e tenerla viva — un processo che richiede tempo. In matematica, senza il calcolo infinitesimale, non saremmo mai andati sulla Luna.

![Aldrin, Apollo 11](../assets/01_apollo-aldrin.jpg "Aldrin, Apollo 11")

With ZKPs and succinct proofs, we are able to introduce more certainty and clarity into opaque systems. This gets even more powerful when we consider *composing* ZKPs. That is combining multiple proofs into one in some fashion, such as with aggregation or recursion.

Grazie alle ZKPs e alle prove sintetiche, possiamo introdurre maggiore certezza e trasparenza in sistemi opachi. Questo diventa ancora più potente quando consideriamo la *composizione* delle ZKPs: ovvero la possibilità di combinare più prove in una sola, ad esempio tramite aggregazione o ricorsione.

All of this presumes we can translate some of the mechanisms or rules mentioned above - which are often messy and inconsistent - into a form that ZKPs can comprehend. How can we do that?

Tutto questo presuppone che possiamo tradurre almeno alcune delle regole o dei meccanismi citati, spesso confusi e incoerenti, in una forma che le ZKPs possano comprendere. Come possiamo riuscirci?
