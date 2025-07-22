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


