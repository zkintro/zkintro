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

Le Zero Knowledge Proofs (ZKP, dimostrazioni a conoscenza zero) sono pura magia. Ci permettono di realizzare cose che prima non avremmo nemmeno immaginato.

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

Le ZKP possono aiutare. Magari non per tutto, ovunque, o esattamente ora. Ma sono già applicabili a numerosi scenari, in vari contesti, e sempre di più lo saranno. Nel resto di questo articolo cercherò di convincerti del perché e del come. Seguiamo insieme la magia.
