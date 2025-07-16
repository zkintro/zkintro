---
title: 'A Friendly Introduction to Zero Knowledge'
date: '2023-07-17'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "friendly-introduction-to-zero-knowledge"
images: ['../assets/01_zkp-magic.png']
summary: "Zero Knowledge Proofs are magic. They allow us to do things we couldn't dream of before. This is the first in a series of posts on Zero Knowledge Proofs and their application. In it we'll look at what Zero Knowledge Proofs are, why you should care, how they work, and see where they can be used."
---

![ZKP Magic](../assets/01_zkp-magic.png 'ZKP Magic')

## Introducción

Las pruebas de conocimiento cero（Zero Knowledge Proofs）son mágicas. Nos permiten hacer cosas que antes ni siquiera podíamos imaginar.

Déjame empezar con algunas frases para estimular tu mente. Tal vez reconozcas algunas, y otras te resulten nuevas.

> Cualquier tecnología suficientemente avanzada es indistinguible de la magia.
>
> - Arthur C. Clarke

> La civilización avanza al extender la cantidad de operaciones que podemos realizar sin pensar en ellas.
> 
> - Alfred North Whitehead

> Hice esto más largo de lo normal solo porque no tuve tiempo de hacerlo más corto.
>
> - Blaise Pascal

> La privacidad es el poder de revelarse selectivamente ante el mundo.
> 
> - A Cypherpunk's Manifesto

> El futuro ya está aquí. Solo que aún no está distribuido de manera equitativa.
> 
> - William Gibson

Tecnología mágica, avance civilizatorio, cartas breves, privacidad y un futuro que ya llegó. Eso resume las pruebas de conocimiento cero（Zero Knowledge Proofs, ZKPs）. ¿Qué está pasando?

Durante el último siglo, las computadoras e Internet se adueñaron del mundo. Estas tecnologías están en todas partes, en todo lo que hacemos, para bien o para mal. Sobre ellas construimos plataformas, empresas, imperios. Hablamos de cosas como MAMAA (Microsoft, Apple, Meta, Alphabet, Amazon). Luego está el núcleo de la bestia: redes de pago, servicios gubernamentales y una infinidad de aplicaciones B2B que operan el mundo en silencio. Y por último, una larga cola de otras cosas: tu app de filtros de fotos, la plataforma para aprender idiomas o esa comunidad online.

Cuando usás un servicio online, esperás lograr un objetivo específico. Puede ser algo chico, como hablar con una amiga, distraerte del trabajo, o algo más importante, como solicitar una hipoteca. Pero ¿qué pasa con todos esos datos? Incluye tanto los datos que sabés que estás compartiendo como ese iceberg oculto del que no tenés idea. ¿Se cumplirá tu objetivo o algo fallará —ya mismo o dentro de un año?

¿Quién entiende realmente estos sistemas y las consecuencias de cómo los usamos? ¿Y de cómo ellos, a su vez, nos usan a nosotros? Aunque algunas personas entienden algunos sistemas mejor que otras, nadie comprende todo el panorama, y mucho menos cómo esas partes interactúan entre sí para generar consecuencias inesperadas.

¿Qué puede hacer una persona? Confiar. Pero ¿en quién confiás? ¿Y por qué?

Este es un problema difícil. Nuestro cerebro humano no evolucionó para lidiar con esto. Internet, por más increíble que sea para conectarnos y facilitarnos la vida, trajo bastante desorden en este aspecto. Antes, cuando tenías una conversación privada con alguien, el viento se llevaba tus palabras. Si te quedabas fuera de tu casa, podías llamar a un cerrajero o romper la cerradura. ¿Pero a quién recurres cuando te bloquean la cuenta de Google y solo ves una pantalla que dice "Access denied"? A nadie. Estás frente a un castillo invisible e impenetrable.

Las ZKPs pueden ayudar. Tal vez no para todo, ni en todas partes, ni ahora mismo. Pero sí aplican a muchas cosas, en muchos lugares, y cada vez más. En el resto de este artículo, voy a tratar de convencerte del porqué y del cómo. Sigamos la magia.

## ¿Qué es una Zero Knowledge Proof?

_Esta sección introduce el concepto de una Zero Knowledge Proof_

Este es el primero de una serie de artículos sobre las pruebas de conocimiento cero（Zero Knowledge Proofs）y sus aplicaciones. Vamos a ver qué son, por qué importan, cómo funcionan y dónde se pueden aplicar.

Imaginá que vas a un bar y podés probar que sos mayor de 18 años sin mostrar nada más, ni siquiera tu documento con datos personales. O que podés demostrar que pagaste tus impuestos correctamente, sin revelar a nadie los detalles de tus ingresos o patrimonio. Estas son las cosas que permiten las pruebas de conocimiento cero（ZKPs）. El término _conocimiento cero_ significa simplemente que no se revela más información que la necesaria.

Las ZKPs te permiten probar algo sin revelar nada más que el hecho de que la declaración es verdadera.

¿Qué significa esto? Tomemos el ejemplo clásico de “¿Dónde está Waldo?”. El juego consiste en encontrar a Waldo dentro de una imagen grande. Yo puedo probarte que sé dónde está Waldo sin revelarte su ubicación exacta. ¿Cómo?

Imaginá que tengo una imagen de “¿Dónde está Waldo?” y una hoja grande de papel, cuatro veces más grande que la imagen. Hago un agujero pequeño en el papel y lo coloco encima de la imagen, posicionándolo cuidadosamente para que solo Waldo sea visible a través del agujero. Eso te permite ver a Waldo, pero solo a Waldo y nada más. Así, sabes que sé dónde está, pero no te revelé su ubicación en la imagen.

![Where's Waldo](../assets/01_waldo.jpg "¿Dónde está Waldo?")

Obviamente este es un ejemplo sencillo, pero sirve para darnos una idea de cómo puede funcionar una prueba así. Pero ¿qué significa exactamente? ¿Qué estamos probando exactamente? Más adelante vamos a profundizar, pero por ahora veamos qué nos ofrecen las ZKPs a nivel general.

Con ZKPs podemos probar declaraciones arbitrarias de forma general. Más específicamente, las ZKPs nos permiten demostrar algo de forma privada y concisa.

Esto es extremadamente poderoso, como veremos a continuación.

## ¿Por qué debería importarte?

_Esta sección explica por qué podrían interesarte las ZKPs, incluyendo detalles sobre privacidad, compresión y su carácter generalista_

Después de leer la sección anterior tal vez pensás: "ok, está bueno supongo, pero ¿por qué debería importarme?". Es una reacción totalmente válida. De hecho, probablemente no debería importarte! Al igual que no tienes que preocuparte por cómo funcionan las computadoras, hacia dónde va la IA o cosas por el estilo.

¿Por qué _sí_ podría interesarte? Porque eres curioso y querés entender cómo funcionan las ZKPs y qué tipo de interacciones hacen posibles. Es un mecanismo muy general, y la intuición de mucha gente que trabaja en este campo es que representa un nuevo paradigma que desbloquea muchísimas cosas nuevas. Ya lo estamos viendo, y parece que apenas estamos empezando. En lo que queda de esta sección, voy a darte una idea de por qué y cómo.

Antes de profundizar, veamos qué propiedades nos ofrecen las ZKPs a un nivel más alto. Principalmente, nos dan una o ambas de las siguientes características:

1. Privacidad（formalmente conocida como zero-knowledge)
2. Compresión（formalmente conocida como succinctness)

¿Qué queremos decir con estos dos conceptos? Veamos algunas formas de entenderlos.

### Privacidad

Hay muchas cosas que queremos mantener en privado. Esta es la definición de “privado” según el Diccionario de Oxford:

> que pertenece o está destinado al uso de una persona o grupo específico.

Tenemos conversaciones privadas, baños privados, partes privadas. Secretos comerciales, información personal sensible, todo en la privacidad del hogar. Llaves, puertas y cerraduras.

La privacidad es algo normal y está presente en todos lados. Está estrechamente ligada a conceptos como soberanía personal, autodeterminación e independencia. Estas ideas nos resultan tan naturales que muchos documentos importantes, como la _Carta de Derechos de EE. UU._ y la _Carta de las Naciones Unidas_, las reconocen como derechos fundamentales para individuos y naciones, respectivamente. [^1] La privacidad es un requisito previo para la libertad.

Formalmente, la propiedad de privacidad en las ZKPs suele llamarse _conocimiento cero_ o _ocultamiento de datos_ [^2]. Una ZKP oculta información que no es relevante para que una aplicación funcione, y esta información queda _vinculada_ con los datos relevantes de la aplicación. Estos conceptos son un poco más formales, y son los que hacen posible la privacidad. Pero la privacidad es un concepto más amplio y aplicable de forma general, así que por ahora vamos a centrarnos en ella.

En el mundo digital, también conocido como ciberespacio —en contraposición al mundo físico—, la privacidad también es esencial, aunque a menudo se descuida. Esta es la definición de privacidad que aparece en el _Manifiesto Cypherpunk_:

> La privacidad es el poder de revelarse al mundo de forma selectiva.  
>
> - Manifiesto Cypherpunk [^3]

Conversaciones, contraseñas, información de tarjetas de crédito. Son ejemplos de cosas que queremos mantener privadas en línea. Internet es una herramienta fantástica que nos conecta a todos, pero también es un mar abierto y salvaje. Hay muchos desconocidos y depredadores, y mantener cierta información privada es vital. Sin privacidad, cosas como comprar online o enviar mensajes privados serían imposibles.

Quizás pensés: “Ya podemos mantener cosas como las contraseñas en privado, ¿cuál es el problema?”. Y tienes razón en un sentido limitado, al menos para esos casos puntuales. Pero vamos a necesitar más imaginación para entender lo que habilita una privacidad programable de propósito general.

Como ejemplo, pensemos en cómo Agustín, en sus _Confesiones (400 d.C.)_, encontraba extraño que San Ambrosio —un obispo— leyera en silencio. En esa época, la mayoría de la gente leía en voz alta. [^4]

> Cuando [Ambrosio] leía, sus ojos recorrían la página y su corazón buscaba el sentido, pero su voz estaba en silencio y su lengua quieta. Cualquiera podía acercarse libremente y los visitantes no solían ser anunciados, así que a menudo, cuando íbamos a verlo, lo encontrábamos leyendo así, en silencio, pues nunca leía en voz alta.

![Silent reading](../assets/01_silent-reading.jpg 'Lectura silenciosa')

Hoy en día, damos por hecho que leemos en silencio. Incluso cuesta imaginar que eso tuvo que ser inventado. La idea de que lo que lees es solo para tus ojos antes era impensable. ¿Qué otras invenciones similares son posibles en nuestra era? Cosas que, por ahora, la mayoría ni siquiera puede imaginar.

En las próximas secciones, vamos a echar un vistazo a cómo son esas invenciones con ZKPs, tanto las que ya existen como las que están por venir.

### Compresión

> Hice esto más largo de lo habitual solo porque no tuve tiempo de hacerlo más corto.  
>
> - Blaise Pascal [^5]

Comprimir algo se define como:

> reducir algo a un espacio más pequeño

De forma similar, la concisión se define como:

> el acto de expresar algo claramente con pocas palabras

El hecho de que las ZKPs tengan la propiedad de compresión significa que podemos probar que algo es verdadero con una declaración muy corta. Por ejemplo, que todos los pasos de una cierta computación fueron ejecutados correctamente. Esto es especialmente útil cuando hay un recurso muy demandado y costoso. Ese es el caso de la blockchain de Ethereum, pero también es útil en otros contextos. Lo más sorprendente es que el tamaño de la prueba se mantiene igual, sin importar cuán complejo sea lo que queremos probar.

¿Qué queremos decir con “prueba” y “tamaño de la prueba”? Son conceptos con definiciones matemáticas precisas y llenas de matices. En las próximas secciones vamos a profundizar en la noción de prueba dentro del contexto de las ZKPs. Por ahora, podemos pensarla como una afirmación breve que sabemos que es verdadera, o que podemos verificar de alguna forma.

![Sherlock Holmes](../assets/01_sherlock-holmes.jpg 'Sherlock Holmes')

En una típica historia de misterio al estilo Sherlock Holmes, el detective junta evidencia hasta poder probar que el culpable cometió el crimen. Luego, en el gran final, explica exactamente cómo llegó a esa conclusión. Podemos pensar en esa declaración final como la prueba. [^6]

Formalmente, a esta propiedad la llamamos _concisión_（succinctness）[^7]. Es lo que permite que el tamaño de la prueba no cambie, sin importar qué tan complejo sea lo que se quiere probar. En el contexto de blockchains públicas, esto también se relaciona con la _escalabilidad_. En blockchains como Ethereum, donde el espacio en bloques es limitado y costoso, las ZKPs pueden hacer que las transacciones sean mucho más baratas y rápidas. ¿Cómo? Generamos una prueba de que cierto conjunto de transacciones ocurrió y colocamos esa pequeña prueba on-chain, en lugar de almacenar todas las transacciones dentro de la blockchain. Con ZKPs, esto se puede hacer de forma muy segura.

La concisión es una propiedad general y no exclusiva de las blockchains; simplemente encaja muy bien con ellas por varias razones. De forma más general, tener una prueba corta de que algo es verdadero resulta muy útil. Hay varias maneras de entender por qué.

Una forma de verlo es a través de los _costos de transacción_ [^8]. En general, cuanto más bajos son estos costos, más valor y riqueza se genera. Si hay menos cosas que verificar —o si es más fácil hacerlo—, podemos actuar con mayor libertad y eficiencia.

A veces, cuando llenamos un formulario, nos piden escribir el correo dos veces para confirmar que es correcto. La idea es protegernos contra errores humanos y hacer más robusta la transmisión de datos. También existen los checksums, donde un dígito adicional en tu código de paquete de UPS, número de tarjeta de crédito o código ISBN de un libro funciona como verificación simple de que el resto de los números probablemente estén bien. Todo esto —claramente— no está pensado para proteger contra usos maliciosos, sino contra errores involuntarios. [^9]

En los sistemas de archivos de computadoras, un _hash_ suele usarse para garantizar la integridad de los archivos. Si se corrompe incluso una pequeña parte del archivo, el hash cambia por completo. Como el hash es conciso (por ejemplo, una cadena de 64 caracteres), es fácil de almacenar y verificar, incluso si el archivo original es enorme. En este caso, las funciones de hash garantizan la integridad de forma segura. Si tuviéramos que verificar la integridad de un archivo guardando una copia entera, sería mucho más impráctico. Archivo grande o pequeño, no importa: el hash mantiene el mismo tamaño. La concisión del hash es lo que hace posible este uso.

### ¿Qué sabes?

Tomémonos un respiro de la compresión, la concisión y las pruebas. Vamos a hacer una pequeña excursión hacia el conocimiento, la carga mental y la confianza. Al final de la sección, conectaremos todo esto de nuevo con las ZKPs.

En tu vida cotidiana, ¿qué sabés que es verdad y por qué? Si ves salir el sol todos los días, probablemente esperas que vuelva a salir mañana. En el mundo moderno, estamos bastante protegidos del entorno natural hostil, pero a cambio tenemos muchas preocupaciones modernas. Muchas de ellas están relacionadas con instituciones con las que interactuamos a diario.

Si puedes retirar efectivo de tu banco todos los días, ¿esperas poder hacerlo mañana también? La mayoría diría que sí, pero no todas las personas, ni en todo momento. Depende de muchos factores: si el banco es confiable, si vives en una jurisdicción segura, si pasó algo importante en la economía global recientemente, cuál es tu situación personal, etc. Todos estos factores funcionan como datos que te permiten tomar una decisión.

Obviamente, este es un ejemplo trivial, pero la vida está llena de este tipo de interacciones. Todo esto puede verse como una forma de carga mental. El grado en que esto te preocupa depende de tu situación personal y de cuán complejas sean tus actividades diarias. Por ejemplo, una empresa probablemente analice todos estos factores mucho más cuidadosamente al firmar un contrato con otra parte.

Creamos mecanismos y reglas para contrarrestar esta incertidumbre: servicios de reputación, auditorías independientes, multas para desalentar el mal comportamiento, acreditaciones emitidas por instituciones confiables, etc. Todas estas medidas son, en esencia, parches que intentan ir al fondo de la cuestión: ¿algo es lo que dice ser? ¿Cumple con las reglas que definimos? ¿Es confiable y utilizable?

Toda esta carga mental se multiplica cuando estás tratando con múltiples instituciones, jurisdicciones, empresas y personas. Pueden darse efectos en cascada: por ejemplo, si tu banco quiebra, no pruedes pagarle a tus empleados, y entonces tu empresa no puede atender a sus clientes [^10]. Se necesitan más mecanismos de control. Más momentos para frenar y preguntarse si todo está bien y qué puede salir mal.

Voy a cerrar esta sección con una cita:

> La civilización avanza al extender la cantidad de operaciones que podemos realizar sin pensar en ellas.  
>
> - Alfred North Whitehead [^11]

Por ejemplo, cuando encendés la cocina para preparar la cena, ni siquiera pensás en hacer fuego. Es muy distinto de tener que juntar leña, mantenerla seca, encenderla y mantenerla viva, un proceso que consume mucho tiempo. En matemáticas, sin el cálculo diferencial, no podríamos haber llegado a la Luna.

![Aldrin, Apollo 11](../assets/01_apollo-aldrin.jpg 'Alunizaje')

Con ZKPs y pruebas concisas, podemos introducir más certeza y claridad en sistemas opacos. Esto se vuelve aún más poderoso cuando consideramos la _composición_ de ZKPs. Es decir, combinar múltiples pruebas en una sola, ya sea mediante agregación o recursión.

Todo esto parte de la idea de que podemos traducir algunos de los mecanismos o reglas mencionados —que muchas veces son desordenados e inconsistentes— a una forma que las ZKPs puedan entender. ¿Cómo lo hacemos?

### De propósito general

Recuerda que las ZKPs nos permiten probar declaraciones arbitrarias de forma general. ¿Por qué importa esto y por qué es tan poderoso?

La diferencia entre herramientas similares que ya existen y las ZKPs es como la diferencia entre una calculadora y una computadora. Una sirve para tareas muy específicas, la otra es de propósito general. Es como comparar esta máquina de calcular [^12] con una computadora moderna:

![Pascal's calculator](../assets/01_pascals-calculator2.jpg "Calculadora de Pascal")

Recuerda los ejemplos anteriores que usamos para ilustrar la privacidad y la concisión de forma más concreta. Una contraseña es un dato privado que te permite acceder a un servicio [^13]. En el caso del hash de algún dato de entrada —como un archivo—, nos da algo conciso para verificar igualdad.

Podemos visualizar una función hash de la siguiente manera:

![Hash function](../assets/01_graphviz-hash.png 'Función hash')

Aplicamos una función hash específica, como SHA256 [^14], sobre un dato de entrada conocido. Por ejemplo, usar la frase “The quick brown fox jumps over the lazy dog” (sin comillas) como entrada y aplicar SHA256 da como resultado el hash `d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592`. Si le agregamos un punto al final de la frase, obtenemos un hash completamente distinto: “The quick brown fox jumps over the lazy dog.” da `ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c`.

Aunque la frase cambió solo un poquito, los hashes resultantes son muy distintos [^15]. Las funciones hash seguras son difíciles de romper y tienen propiedades muy útiles. Por ejemplo, si tienes solo el hash, no puedes reconstruir el mensaje original. Tampoco puedes generar fácilmente un mensaje que produzca un hash específico. Estas funciones se conocen como _funciones hash criptográficas_. [^16]

La función SHA256 que usamos arriba es una función hash criptográfica particular que tomó mucho tiempo y muchas personas para lograr que fuera segura. El hash por sí solo no prueba nada. Solo tiene sentido cuando se compara con otra cosa, como el mensaje o archivo original.

Informalmente, podemos pensar que una función de hash sirve para demostrar que un mensaje específico corresponde a un hash particular. Pero solo podemos verificarlo si tenemos el mensaje original. A veces la gente usa esto para demostrar que escribió algo o hizo una predicción: escriben, por ejemplo, "El 1 de abril de 2040, alienígenas aterrizarán sobre el Big Ben en Londres, y el número 25742069 ganará la lotería", y publican el hash de ese mensaje en Twitter. Si llega a cumplirse, revelan el mensaje original y convencen a todos de que son el nuevo Nostradamus.

En cambio, una ZKP se puede visualizar así:

![ZKP](../assets/01_graphviz-zkp.png 'ZKP')

A diferencia de la función hash anterior, hay varias diferencias importantes:

- Podemos tener múltiples entradas privadas y públicas, no solo una entrada pública  
- Podemos usar cualquier programa, no solo una función hash  
- Generamos una prueba autónoma que se puede verificar

En el ejemplo anterior con hash, necesitamos hacer pública la entrada para verificar que el mensaje corresponde al hash. En las ZKPs, también podemos tener _entradas privadas_. Una entrada privada es algo que solo tu puedes ver. No necesitas revelarla a nadie para generar la prueba.

Por ejemplo, en el caso de “¿Dónde está Waldo?” del inicio del artículo, la entrada pública sería la imagen de Waldo. La entrada privada es la ubicación exacta. Yo puedo generar una prueba de que sé dónde está Waldo sin revelarte esa ubicación.

De forma similar, si tengo un Sudoku (un popular juego de lógica), puedo demostrar que tengo una solución válida sin mostrarte la solución. En este caso, la entrada pública es el Sudoku inicial y la privada es la solución.

Quizás notaste que “¿Dónde está Waldo?” y resolver un Sudoku son problemas muy distintos. Sin embargo, podemos escribir un programa que exprese cómo funciona cualquiera de los dos y use ZKPs para generar una prueba. Esto es posible porque la lógica de este tipo de programas es de propósito general y puede computar cualquier cosa que pueda hacer una computadora.

Transformamos lo que originalmente era un problema de criptografía o matemática —definir y asegurar una función hash— en un problema de programación. Para ver por qué esto es tan poderoso, veamos algunos ejemplos.

Ahora podemos probar que conocemos los datos privados que producen cierto hash [^17]. Es decir, podemos demostrar que tenemos un mensaje —como un documento importante— sin revelar el contenido del mensaje.

Para entender mejor el poder del cómputo de propósito general, veamos el caso de las firmas de grupo. Son una forma de que un grupo de personas firme un documento sin revelar quiénes son. Por ejemplo, los _Federalist Papers_ fueron firmados por el seudónimo Publius, que representaba a varias personas [^18]. Al igual que con SHA256, hay una forma de expresar estas firmas grupales con criptografía y matemática. Eso es muy impresionante y requirió mucha ingeniería criptográfica. Pero con ZKPs de propósito general cualquiera puede expresar lo mismo con apenas unas pocas decenas de líneas de código en Circom, un lenguaje para ZKPs [^19].

Gracias a su naturaleza general, podemos construir soluciones ad hoc con facilidad. Por ejemplo, posiblemente poseas un DNI con tu nombre completo, dirección y otros datos personales. Para ingresar a un evento, solo necesitas probar que tienes más de 18 años y un ticket válido. No quieres que cualquier persona o sistema vea tu dirección ni arriesgarte a que te roben la identidad. Con ZKPs podés demostrar que:

- Tenés una identificación válida  
- Fue emitida por una institución aprobada en los últimos 5 años  
- No ha sido revocada ni reportada como robada
- Eres mayor de 18 años  
- Pagaste un ticket válido para el evento  
- El ticket no fue usado antes

Todo eso sin revelar ni un solo dato más sobre ti que los indicados arriba.

Con ZKPs, ahora tenemos una _mejor herramienta_ para que las personas puedan coordinar de diversas formas, especialmente en sistemas donde se necesita _privacidad_ y _concisión_. Veremos más ejemplos en la sección de aplicaciones.

Muchas veces, el límite está en tu imaginación y en lo que puedas llegar a expresar.

### ¿Por qué ahora?

¿Por qué las ZKPs están cobrando relevancia justo ahora? Hay razones tanto técnicas como sociales para esto.

Técnicamente, las ZKPs son bastante nuevas. Matemáticamente, existen desde hace solo unas pocas décadas [^20]. Al igual que pasó con la computación misma, tomó tiempo hasta que fueran eficientes y prácticas, incluso en teoría [^21].

Después, alguien tenía que tomar esos papers y protocolos criptográficos y convertirlos en algo práctico. El primer ejemplo notable fue Zcash, la criptomoneda orientada a la privacidad, en 2016. Comenzó como un paper escrito por cypherpunks e investigadores [^22]. La primera versión fue un logro impresionante de investigación e ingeniería aplicada a un producto y sistema reales. Aunque el sistema tenía muchos problemas y estaba lejos de ser óptimo, fue el primer ejemplo práctico y funcional del uso de ZKPs en el mundo real. Eso demostró que no solo era posible, sino también útil. Desde entonces, la investigación y el desarrollo en ZKPs se dispararon, especialmente en los últimos años.

Blockchains públicas como Ethereum y Zcash, una criptomoneda que preserva la privacidad, jugaron un rol clave en este proceso. Las blockchains se destacan por su resistencia a la censura y su transparencia [^23]. Pero esto suele venir con un costo: la falta de privacidad y escalabilidad —exactamente donde brillan las ZKPs. Por eso son una combinación natural. Súmale a eso el entusiasmo de la comunidad cripto por la criptografía avanzada [^24], y no sorprende que mucha de la innovación esté ocurriendo en la intersección entre blockchain y ZKPs [^25]. Además, los muchos proyectos de blockchain bien financiados llevaron a que se invierta más en investigación e ingeniería, algo que antes estaba limitado al ámbito académico.

Teniendo en cuenta toda la complejidad que involucra —matemática aplicada, criptografía, papers sobre sistemas de prueba concretos, implementación de nuevos esquemas, herramientas y aplicaciones en dominios técnicos—, el avance es increíblemente rápido. Cada año —incluso cada mes— aparecen nuevos papers con técnicas novedosas, herramientas mejoradas y aplicaciones concretas. El ciclo entre investigación, implementación y uso se acorta cada vez más. Aunque sigue siendo un tema difícil, cada vez es más accesible empezar. A medida que las herramientas mejoran, los desarrolladores necesitan entender cada vez menos la matemática detrás de las ZKPs.

En cuanto al rendimiento de las ZKPs, está ocurriendo una especie de ley de Moore. La ley de Moore observa que la cantidad de transistores se duplica aproximadamente cada dos años, lo que impulsó la revolución informática. En ZKPs, proyectos que hace apenas unos años parecían imposibles o imprácticos —como _zkVM_ o _zkML_— hoy se están ejecutando. Como regla general, se ha observado que en el mundo de las ZKPs todo mejora en un orden de magnitud cada dos años aproximadamente [^26]. Esto se debe a que es una tecnología nueva, y es posible optimizar agresivamente muchas capas del stack: desde los programas que escribimos, hasta los sistemas que usamos y el hardware mismo. No hay señales de que esta tendencia vaya a frenarse pronto.

![Moore's Law](../assets/01_moores-law.png "Ley de Moore")

## ¿Cómo funciona?

_Esta sección explica cómo funcionan las pruebas de conocimiento cero desde una perspectiva general_

Esta sección ofrece una visión general de cómo funcionan las ZKPs. No incluye matemáticas ni código.

### Conceptos básicos

We start by introducing some terminology. There'll be a few new terms to learn, but as we go along, you'll get the hang of it.

Empecemos con algo de terminología. Vas a encontrarte con algunos términos nuevos, pero a medida que avancemos, te vas a ir acostumbrando.

- **Protocolo**: sistema de reglas que define la conducta correcta a seguir  
- **Prueba**: argumento que establece la verdad de una declaración  
- **Demostrador**: quien prueba o demuestra algo  
- **Verificador**: quien valida que una declaración es correcta  
- **Entrada privada**: input que solo el demostrador puede ver, también llamado **testigo**  
- **Entrada pública**: input que tanto el demostrador como el verificador pueden ver, también llamado **instancia**

Aunque es útil aprender la terminología del área, algunas metáforas pueden ayudarte a entender mejor de qué se trata todo esto. Vamos a ir presentando más términos a lo largo del texto.

Los protocolos están en todos lados y pueden ser implícitos o explícitos. En el ajedrez, el protocolo es que dos jugadores se turnan para mover piezas según las reglas del juego hasta que uno gana o hay un empate. En teoría, no importa cuánto tiempo tarde cada jugada, pero en la práctica, tratamos de reducir al mínimo la fricción en la comunicación entre las partes. Podés pensar en esto como una partida de ajedrez rapidísima.

Podemos imaginar a Sherlock Holmes como el demostrador: en su discurso final presenta una elegante cadena de argumentos, una prueba, que demuestra quién es el asesino. Esa prueba debe ser verificada por un verificador —como un juez o un jurado— y debe ser convincente _más allá de toda duda razonable_ [^27]. El “demostrador” es la entidad —en este caso Holmes— que presenta la prueba, y luego debe ser verificada. Como la prueba es autónoma, cualquiera puede ser verificador, incluso tu como lector, que necesitas creer en el razonamiento para que la historia funcione. [^28]

La entrada privada sería información que solo Holmes conoce, como algún secreto que alguien le susurró al oído. A esto se lo llama testigo (witness), aunque el nombre puede confundir: se refiere al hecho de que, en un juicio, un testigo tiene datos privados que se suman a la evidencia. En el caso de las ZKPs, esta información privada no se comparte con el verificador —ni con el juez o el jurado en este ejemplo.

Las ZKPs establecen un _protocolo_ entre un _demostrador_ y un _verificador_. Este protocolo es _no interactivo_ cuando no hace falta que el demostrador y el verificador se comuniquen directamente, como en una partida de ajedrez o en un baile. En su lugar, el demostrador genera una prueba autónoma y, más adelante, alguien la verifica. La mayoría de las ZKPs empiezan siendo _interactivas_ —es decir, requieren varios intercambios— y después se transforman en no interactivas usando ciertos trucos matemáticos [^29]. Podés pensar en la no interactividad como si dos jugadores de ajedrez supieran, con solo decir unas palabras, exactamente cómo jugará el otro. Entonces ni siquiera hacen falta las jugadas, porque ya saben cómo terminará la partida.

Hay muchos tipos de ZKPs. A menudo hablamos de *zk-SNARKs*, que significa _Zero Knowledge Succinct Non-Interactive ARguments of Knowledge_. “Zero Knowledge” y “Succinct” se corresponden con los conceptos de privacidad y compresión que vimos antes. “Non-Interactive” ya lo explicamos. “ARguments of Knowledge” es básicamente otra forma de decir prueba [^30]. Hay muchos tipos distintos de zk-SNARKs.

Un buen modelo mental es imaginar que las ZKPs son como un zoológico. Hay muchos animales distintos, y podemos agruparlos de varias formas: estos tienen cuatro patas, aquellos tienen rayas, estos los trajo Bob el año pasado [^31], etc. Algunas categorías son más útiles que otras. De hecho, algunos de estos sistemas ni siquiera tienen la propiedad de Zero Knowledge. A esos usualmente se los llama simplemente SNARKs. En la comunidad, solemos llamar ZK a todo este zoológico, aunque muchos de estos sistemas no usan realmente la propiedad de conocimiento cero [^32].

### Protocolo

Volviendo a nuestro protocolo, tenemos un demostrador y un verificador. El demostrador genera una prueba usando una _clave del demostrador_, una entrada privada y una entrada pública. El verificador valida esa prueba usando una _clave del verificador_ y la entrada pública, y devuelve como resultado “verdadero” o “falso”.

Hay dos elementos nuevos: la clave del demostrador y la clave del verificador. Son las que permiten que el demostrador y el verificador hagan su magia. Puedes pensarlas como una llave común que te deja entrar a algún lugar y hacer algo, o como una varita mágica que te permite ejecutar una acción. Estas llaves se obtienen a partir de una ceremonia especial llamada _configuración confiable_ (trusted setup), que es una fase de preparación inicial que no vamos a detallar en este artículo [^33].

Fíjate que solo el demostrador tiene acceso a la entrada privada. ¿Cómo hace para usar su clave, la entrada privada y la pública para convertir todo eso en una prueba?

Recuerda la ilustración anterior de una ZKP:

![ZKP](../assets/01_graphviz-zkp.png 'ZKP')

Usamos un programa especial (formalmente conocido como _circuito_) que representa la lógica que nos interesa probar. Por ejemplo, demostrar que conocemos los datos que producen cierto valor hash. A diferencia de un programa tradicional, este programa está compuesto por _restricciones_ [^34]. Lo que estamos probando es que todas las restricciones se cumplen al combinar la entrada privada con la pública.

Finalmente, el verificador toma esta prueba breve, la combina con la clave de verificación, la entrada pública y el programa especial con todas sus restricciones, y se convence _más allá de toda duda razonable_ de que la prueba es válida, devolviendo “verdadero”. Si no es válida, devuelve “falso”.

Esta es una versión algo simplificada, pero capta la esencia de lo que está pasando.

### Restricciones

¿Qué son estas restricciones que forman parte del programa especial que mencionamos antes? Una restricción es una limitación o condición. Por ejemplo, “un número entre 1 y 9” es una restricción. El número 7 la cumple, pero el número 11 no. ¿Cómo escribimos un programa como un conjunto de restricciones? Esto es casi un arte, pero empecemos con un ejemplo simple: el Sudoku.

En el juego del Sudoku, el objetivo es encontrar una solución para el tablero que cumpla con ciertas restricciones. Cada fila debe incluir los números del 1 al 9, pero solo una vez. Lo mismo aplica para cada columna y para cada subcuadro de 3x3. Se nos da una posición inicial con algunos números, y el desafío consiste en completar el resto de forma que se cumplan todas esas restricciones. Lo difícil es encontrar valores que las cumplan todas al mismo tiempo.

![Sudoku](../assets/01_sudoku.png 'Sudoku puzzle')

Con ZKPs, un demostrador puede construir una prueba de que conoce la solución a un determinado rompecabezas. En este caso, demostrar significa usar una entrada pública —la posición inicial del tablero—, una entrada privada —la solución completa— y un circuito. El circuito está compuesto por todas las restricciones que definen el rompecabezas.

Se lo llama circuito porque estas restricciones están conectadas entre sí, como los componentes de un circuito eléctrico. Pero en este caso, el circuito no transporta corriente, sino valores. Por ejemplo, no podemos meter cualquier cosa como “banana” en una fila: tiene que ser un número, y ese número debe estar entre 1 y 9, etc.

El verificador tiene el mismo circuito y la misma entrada pública, y puede verificar la prueba que el demostrador le envió. Si la prueba es válida, el verificador queda convencido de que el demostrador tiene una solución para ese rompecabezas específico.

Resulta que muchos problemas pueden expresarse como un conjunto de restricciones. De hecho, cualquier problema que podamos resolver con una computadora puede expresarse de esa forma.

### Ejemplo de Sudoku

Apliquemos lo que aprendimos sobre las distintas partes de una ZKP al ejemplo del Sudoku.

Para el Sudoku, nuestro programa especial —el circuito— recibe dos entradas:

- Un tablero de Sudoku como entrada pública  
- Una solución al Sudoku como entrada privada

El circuito está compuesto por un conjunto de restricciones. Todas deben cumplirse. Las restricciones se ven así:

- Todos los dígitos del tablero y la solución deben estar entre 1 y 9  
- La solución debe coincidir con el tablero en todas las casillas donde ya hay números  
- Cada fila debe contener los números del 1 al 9 exactamente una vez  
- Cada columna debe contener los números del 1 al 9 exactamente una vez  
- Cada subcuadro de 3x3 debe contener los números del 1 al 9 exactamente una vez

Si todas estas restricciones se cumplen para un tablero y una solución, sabemos que es una solución válida.

A prover Peggy uses her magic prover key, the puzzle and the solution, combines it with the special program and creates a proof. The proof is very short, less than 1000 characters. The proof is self-contained and with it the verifier has all information they need to verify the proof. You can think of it as a magic spell that does what you want, without you having to understand the details of it [^35].

La demostradora Peggy usa su clave mágica de demostrador, el tablero y la solución, los combina con el programa especial y genera una prueba. La prueba es muy breve, menos de 1000 caracteres. Es autónoma, y con ella el verificador tiene toda la información necesaria para comprobar que la prueba es válida. Puedes pensarla como un hechizo mágico que hace lo que necesitas, sin que tengas que entender todos los detalles [^35].

Este es un hechizo sacado de un libro de magia escrito por un médico galés en el siglo XIX:

![Magic spell](../assets/01_magic-spell.png 'Hechizos mágicos')

Este es un ejemplo de una prueba de conocimiento cero generada con la biblioteca Circom/snarkjs:

![Circom proof](../assets/01_circom-proof.png 'Prueba con Circom')

Solo que en este caso, la magia realmente funciona.

Víctor, el verificador, usa su clave de verificador, la entrada pública (el tablero original), y verifica que la prueba que le envió Peggy sea correcta. Si lo es, el resultado es “verdadero”; si no, “falso”. El hechizo funciona o no. Así, Víctor queda convencido de que Peggy conoce una solución válida para ese tablero, sin haber visto jamás la solución. Et voilà. [^36]

### Algunas propiedades

Decimos que una ZKP tiene ciertas propiedades técnicas:

- Completitud (completeness) - si la declaración es verdadera, el verificador se convencerá con la prueba  
- Solvencia (soundness) - si la declaración es falsa, el verificador no se convencerá con la prueba, salvo con una probabilidad despreciable  
- Conocimiento cero (Zero Knowledge) - si la declaración es verdadera, no se revela nada más que el hecho de que es verdadera

Además, en el caso de los zk-SNARKs, la prueba es concisa, lo que significa que prácticamente no crece en tamaño aunque el programa se vuelva más complejo [^37].

También hay muchas otras propiedades importantes en las ZKPs prácticas:

- ¿Qué supuestos matemáticos hace el sistema?  
- ¿Qué tan seguro es?  
- ¿Requiere una configuración confiable（trusted setup）?  
- ¿Qué tan costoso es generar la prueba? En tiempo y otros recursos  
- ¿Qué tan costoso es verificar la prueba? En tiempo y otros recursos  
- ¿Permite el sistema de ZKPs agregar o combinar múltiples pruebas en una sola?  
- ¿Existen buenas librerías disponibles que puedan usar los programadores?  
- ¿Qué tan expresivo es el lenguaje para escribir programas en ese sistema de ZKPs?  
- Y así sucesivamente

Como ves, hay muchas cosas a tener en cuenta y muchas variantes de ZKPs. Pero no te preocupes: lo esencial es básicamente lo mismo, y según tu interés, puedes ignorar felizmente muchos de los detalles técnicos. Volviendo a la metáfora del zoológico: como con los animales, no tienes que ser biólogo para interactuar con ellos. Tal vez quieras trabajar con algunos, o simplemente tener una mascota, o incluso solo acariciar el perro de tu amiga.

## Aplicaciones

_Esta sección presenta ejemplos de aplicaciones actuales y futuras de ZK_

Existen muchas aplicaciones de las ZKPs. En términos generales, todavía estamos en una etapa temprana. Mucho del trabajo actual sigue enfocado en los protocolos base y la infraestructura, así como en aplicaciones específicas para blockchain. Para entender mejor los ejemplos ligados a blockchain, ayuda tener una idea general de cómo funcionan las blockchains públicas y los desafíos que enfrentan. Pero no es un requisito. En esta sección vamos a ver algunas de las aplicaciones más interesantes. Empezaremos con las que ya están activas hoy y luego exploraremos las que vienen en camino.

> El futuro ya está aquí. Solo que aún no está distribuido de forma equitativa.  
>
> - William Gibson [^38]

![ZKP Magic](../assets/01_zkp-magic.png 'Magia ZKP')

### Aplicaciones actuales

**Dinero electrónico.** Para que un sistema de pagos online se parezca al efectivo, debe ser fungible y privado, igual que el dinero físico. La fungibilidad significa que una unidad puede reemplazarse por otra idéntica: no hay diferencia entre tu dinero y el mío; ambos valen lo mismo. Con ZK podemos hacer que el grafo de transacciones sea privado, a diferencia de Bitcoin o Ethereum. Así, tu historial de transacciones permanece oculto y el efectivo digital sigue siendo fungible. Esto ya funciona en sistemas como Zcash y otros similares como Tornado Cash [^39].

**Señalización anónima.** A veces necesitamos probar que pertenecemos a un grupo con ciertas características, sin revelar nuestra identidad. Un ejemplo es demostrar que formás parte de un grupo; otro, votar sin que se sepa a qué partido. Esto permite separar tu identidad de acciones sensibles. Ya está en uso en sistemas como Semaphore [^40], y existen muchas variantes similares.

**ZK Rollup.** Permite realizar más transacciones, de forma más rápida y barata. El espacio en la blockchain de Ethereum es limitado y costoso debido a la alta demanda. Un rollup de Capa 2 (L2) procesa transacciones fuera de la cadena principal (L1) y luego las “empaqueta” para subirlas a la L1. Las ZKPs son ideales porque permiten (i) probar que las transacciones se ejecutaron correctamente y (ii) generar una prueba concisa que ocupa poco espacio en la L1. Esto reduce costos y mejora la velocidad sin comprometer la seguridad. Debido a la complejidad de probar toda la ejecución de la EVM, muchos ZK Rollups actuales solo se enfocan en el intercambio de activos simples. Ya está funcionando en sistemas como Loopring, zkSync Lite, dYdX y Starknet [^41].

**ZK-EVM.** Similar a los ZK Rollups, pero de propósito general: permite ejecutar cualquier tipo de transacción o programa. Ethereum tiene una EVM que actúa como una computadora global compartida a la que cualquiera puede escribir. Al expresar la lógica de esa máquina con ZKPs, podemos probar que cualquier programa en Ethereum se ejecutó correctamente y generar una prueba concisa de ello. Tiene múltiples aplicaciones, pero la más inmediata es escalar la red y abaratar transacciones. Ya está activo en Polygon zkEVM, zkSync Era y hay otros en camino [^42].

**ZK-VM.** Debido a que la EVM no es muy compatible con SNARKs [^43], muchos proyectos optaron por crear nuevas blockchains separadas de Ethereum. Esto les permite optimizar su máquina virtual (VM) desde el inicio para trabajar mejor con ZK. Según el sistema, esto permite privacidad y verificación concisa del estado de la cadena. Mina ya está en funcionamiento, y sistemas como Aleo están en desarrollo activo [^44].

**Dark Forest.** Es un juego de estrategia en tiempo real con información incompleta. Gracias a las ZKPs, se implementa una “niebla criptográfica” de guerra: los jugadores solo pueden ver parte del mundo del juego, y ni siquiera el servidor central tiene acceso completo. Esta naturaleza programática permite nuevas formas de jugar que no son posibles en los juegos tradicionales como Starcraft [^45].

**ZK Bridges.** Los bridges permiten mover activos entre distintas blockchains y sistemas. Es difícil hacerlos seguros, y a menudo son blanco de ataques. Con ZK, podemos hacer puentes más seguros y rápidos, sin depender de terceros confiables ni soluciones propensas a errores. Ya existen implementaciones como zkBridge, y otros proyectos como Succinct Labs están trabajando en ello [^46].

**Identidad privada.** A medida que más sistemas fragmentados requieren y alojan nuestras identidades online [^47], es deseable que los usuarios puedan controlar, unificar y mantener privada su identidad digital. Ya existen proyectos como Sismo que permiten esto, y otros están desarrollando soluciones similares [^48].

Estos son solo algunos ejemplos, y de ninguna manera es una lista completa. No mencionamos cosas como reputación privada e irrefutable, exportación de reputación desde web2, protección contra ataques Sybil, pruebas resistentes a coerción, pruebas de replicación, airdrops anónimos, pruebas de grados de separación, etc. [^49]

### En el horizonte

**ZK-EVM (equivalente a Ethereum)**. Existen distintos tipos de ZK-EVM, y los más difíciles de implementar son los que son completamente equivalentes a Ethereum. Otros ZK-EVM hacen algunos atajos para facilitar la generación de pruebas (proofs). Con un ZK-EVM totalmente equivalente, no hay diferencia con el sistema actual de Ethereum. Esto significa que se puede probar la ejecución correcta de cada bloque existente mediante una prueba sucinta. Incluso se podría usar un celular para verificar la integridad de toda la cadena, basándose únicamente en matemáticas, sin depender de terceros ni de máquinas costosas. Actualmente lo está desarrollando el equipo de ZK-EVM Community Edition. [^50]

**Cómputo demostrable de propósito general**. La mayor parte del cómputo en el mundo no ocurre en la EVM, sino en otros sistemas. Los programas basados en WASM y LLVM son muy comunes [^51]. Podemos aplicar el mismo enfoque de ZK-EVM para realizar cómputo privado demostrable de propósito general. Por ejemplo, se puede probar que una base de datos contiene un registro específico sin revelar ninguna otra información. Actualmente están trabajando en esto varios equipos, como Delphinus Labs, RISC Zero, Orochi Network y nil.foundation. [^52]

**ZK Machine Learning (ZK ML)**. Podemos probar que cierto cómputo se realizó correctamente de forma privada, fuera de la cadena, y luego publicar una prueba（proof）de que fue correcto. Esto permite usar datos privados para entrenar mejores modelos sin revelar esa información. Por ejemplo, documentos sensibles, voz o incluso ADN para detectar problemas de salud. Esto mejora tanto la escalabilidad como la privacidad para los usuarios. Ya existe una prueba de concepto (PoC) para casos como MNIST, un test común en Machine Learning para reconocer dígitos escritos a mano, y hay equipos trabajando en redes neuronales dentro de pruebas de conocimiento cero（ZKPs）. [^53]

**Autenticidad de fotos**. Probar la procedencia de contenido como fotos y videos, incluyendo ediciones estándar de postproducción. Es decir, demostrar que una foto fue tomada en un lugar y momento determinados, y que solo ha sido editada con operaciones básicas como redimensionado, recorte o escala de grises (según la lista aprobada por AP). Ya se han hecho avances, incluyendo una prueba de concepto. [^54]

**Cumplimiento normativo**. Probar que una transacción privada cumple con cierta regulación, o que un activo no está en una lista negra específica. Probar que un exchange es solvente sin revelar sus activos. Algunos sistemas como Espresso Labs ya han trabajado en esto, y existen versiones simples en producción.

**Intenciones privadas y protegidas**. Los usuarios de blockchains públicas tienen metas específicas que pueden expresarse como _intenciones_. Por ejemplo, un usuario puede tener la intención de intercambiar un token por otro. Puede comunicar su intención a otros usuarios y ser emparejado con una contraparte adecuada. Es deseable que estas intenciones sean protegidas (ocultando el “quién” pero no el “qué”, como en las transacciones protegidas de Zcash) o completamente privadas. Anoma está trabajando actualmente en esto, empezando por el emparejamiento protegido de intenciones. Lograr que sea completamente privado probablemente requiera avances significativos en criptografía, similares al último ejemplo de esta sección.

**Mundos autónomos**. Una continuación de proyectos como Dark Forest. Un mundo puede ser físico o conceptual, como el Mundo de Narnia, el cristianismo, el dólar estadounidense, Bitcoin o el derecho del Commonwealth. Dependiendo de dónde se ejecuten, estos mundos pueden ser autónomos si cualquiera puede cambiar sus reglas sin afectar su objetividad. Actualmente lo está explorando la Fundación 0xPARC en el contexto de juegos y creación de mundos. [^55]

**Prueba de autenticidad de datos**. Exportar datos de aplicaciones web y probar hechos sobre ellos de forma privada. Usa el protocolo TLS, lo cual permite que funcione con cualquier sitio moderno. Actualmente lo desarrolla TLSNotary. [^56]

**Desarme nuclear.** Permitir que inspectores de sitios nucleares confirmen si un objeto es o no un arma nuclear sin examinar sus mecanismos internos sensibles. Existe un artículo con simulaciones físicas sobre esto. [^57]

**Negociaciones de paz y acuerdos de alto riesgo**. En negociaciones, las partes suelen tener límites que no quieren revelar para no debilitar su posición. Si esos límites se codifican de forma explícita, dos partes pueden negociar en dominios muy complejos y llegar a un acuerdo sin revelar los detalles de sus parámetros. Esto permite que personas que no confían entre sí logren acuerdos fructíferos. Probablemente requiera avances en Computación Multipartita (MPC), que permite realizar cómputos sobre secretos compartidos. [^58]

Esto no cubre todos los tipos de aplicaciones en las que la gente está trabajando o pensando. Seguramente habrá muchas más en el futuro. Como ves, hay muchas cosas que podemos hacer con ZK.

Quizás te preguntes por qué muchas de estas aplicaciones involucran una blockchain. Parte de la respuesta está en la sección anterior “¿Por qué ahora?”. ZK es una tecnología ortogonal a blockchains como Ethereum y no siempre se necesita una blockchain, pero muchas veces es una herramienta útil que vale la pena aprovechar.

De forma similar, las personas que trabajan en estos temas suelen compartir intereses y problemas inmediatos. A medida que este campo madura, es probable que la parte “blockchain” de las aplicaciones ZK desaparezca como un simple detalle de implementación (y en algunos casos ya sucede). Y más adelante, incluso la parte “ZK” quedará en segundo plano: será simplemente una aplicación que utiliza ZKP.

Finalmente, cuando se desarrolló criptografía para mensajería en línea y similares, quienes la adoptaron fueron el ejército y empresas de internet. No fue algo impulsado por el correo tradicional ni por empresas de transporte seguro de bienes físicos, aunque en teoría podrían haberlo hecho. [^59]

Cierro esta sección con una frase de Barry Whitehat, un reconocido investigador de ZK que trabaja en el equipo Privacy and Scalability Explorations (PSE) de la Ethereum Foundation, cuando se le preguntó sobre el futuro de ZK:

> “Para 2040, alguien habrá ganado el Premio Nobel de la Paz por usar pruebas de conocimiento cero（Zero Knowledge Proofs）.” [^60]

¿Exagerado y audaz? Sin dudas. ¿Se cumplirá? Tal vez no. ¿Pero es posible? Totalmente. Es una idea fascinante. ¿Cuál es la diferencia entre una mentalidad que lo ve como algo posible, y otra que lo descarta de entrada? ¿Qué tendría que pasar para que ese escenario fuera realista?

Las pruebas de conocimiento cero（ZKPs）son una herramienta nueva y extremadamente poderosa. Muchas veces, lo único que limita su uso es nuestra imaginación sobre lo que podrían lograr.

## Conclusión

_Esta sección resume el artículo y ofrece próximos pasos_

En este artículo vimos qué son las pruebas de conocimiento cero (ZKPs), por qué deberíamos prestarles atención y cuándo resultan útiles. También exploramos cómo funcionan y qué propiedades nos ofrecen. Finalmente, analizamos algunas de sus aplicaciones actuales y futuras.

Espero que esto te haya ayudado a comprender mejor la naturaleza de las ZKPs, y que haya despertado algunos momentos de “ajá” o nuevas formas de ver ciertos problemas. Tal vez incluso te sirva para seguirle la pista a la magia de las ZKPs en el futuro.

En próximas publicaciones profundizaremos en varios de estos temas, y también abordaremos aspectos más técnicos para entender mejor cómo funcionan las ZKPs y dónde pueden aplicarse.

Si hubo algo que te llamó especialmente la atención, o hay algún tema que te gustaría ver en futuros artículos, no dudes en escribirme por Twitter o por email. ¡Voy a incluir los mejores comentarios como notas al pie!

## Agradecimientos

Gracias a Michelle Lai, Chih-Cheng Liang, Jenny Lin, Anna Lindegren y Eve Ko por leer los borradores y dar su valioso feedback.

### Images

- _¿Dónde está Waldo?_ - Unknown source, Where's Waldo originally created by [Martin Handford](https://en.wikipedia.org/wiki/Where%27s_Wally%3F)
- _Lectura silenciosa_ - Jorge Royan, CC BY-SA 3.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Austria_-_Heiligenkreuz_Abbey_-_1726.jpg)
- _Sherlock Holmes_ - Sidney Paget, Public domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Strand_paget.jpg)
- _Alunizaje_ - Neil A. Armstrong, Public domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11.jpg)
- _Calculadora de Pascal_ - kitmasterbloke, CC-BY 2.0, via [Openverse](https://openverse.org/image/0feadae2-6b51-4dc7-8838-18c157f7f0ce)
- _Ley de Moore_ - Max Roser, Hannah Ritchie, CC-BY 4.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moore%27s_Law_Transistor_Count_1970-2020.png)
- _Sudoku puzzle_ - Tim Stellmach, CC0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg)
- _Hechizos mágicos_ - National Library of Wales, CC0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Book_of_incantations_f.7v.png)
- _Cyberpunk_ - bloodlessbaron, Public Domain, via [Openverse](https://openverse.org/image/3d3d3cd9-7df6-4781-9778-cdb1e1738de1)

## References  
## Referencias

[^1]: Aunque los conceptos están relacionados, existe cierta controversia legal sobre si el “derecho a la privacidad” está protegido en muchas jurisdicciones del mundo. Ver el artículo en Wikipedia sobre el [derecho a la privacidad](https://es.wikipedia.org/wiki/Derecho_a_la_privacidad) para más información.
[^2]: Conocimiento cero tiene una definición matemática precisa, pero no entraremos en eso en este artículo. Ver [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) para una definición más técnica.
[^3]: Ver el [Manifiesto Cypherpunk](https://nakamotoinstitute.org/static/docs/cypherpunk-manifesto.txt) para el texto completo. También puedes consultar Wikipedia sobre los [Cypherpunks](https://es.wikipedia.org/wiki/Cypherpunk).
[^4]: Algunas personas interpretan de forma distinta este pasaje, pero lo cierto es que en algún momento no tan lejano los humanos pasamos de contar historias oralmente a leer en silencio. Ver Wikipedia sobre la [historia de la lectura silenciosa](https://en.wikipedia.org/wiki/Silent_reading#History_of_silent_reading) para más detalles.
[^5]: Cita original en francés: _Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte._ Ver [Quote Investigator](https://quoteinvestigator.com/2012/04/28/shorter-letter) para más contexto.
[^6]: Créditos a Juraj Bednar por [sugerir](https://twitter.com/jurbed/status/1650782361590669313) usar un misterio de asesinato para explicar el concepto de una prueba（proof）.
[^7]: La concisión tiene una definición matemática específica, pero no entraremos en eso aquí. Consultá la [ZKProof Community Reference](https://docs.zkproof.org/reference.pdf) para una explicación más precisa.
[^8]: Los costos de transacción son un concepto económico. Ver el artículo en Wikipedia sobre [costos de transacción](https://es.wikipedia.org/wiki/Coste_de_transacci%C3%B3n).
[^9]: En un [checksum](https://en.wikipedia.org/wiki/Checksum), se realizan operaciones básicas como sumar o restar dígitos, y si el dígito final no coincide, algo salió mal. Dato curioso: a diferencia de otros sistemas de identificación, el número de seguro social (SSN) en EE. UU. [no tiene un checksum](https://en.wikipedia.org/wiki/Social_Security_number#Valid_SSNs). Si tiene solo un dígito, también se lo llama [digito verificador](https://en.wikipedia.org/wiki/Check_digit).
[^10]: Aunque es más común en países menos desarrollados, esto ocurrió recientemente con quiebras bancarias en EE. UU. Ver el artículo en Wikipedia sobre el [colapso del Silicon Valley Bank](https://en.wikipedia.org/wiki/Collapse_of_Silicon_Valley_Bank#Effects).
[^11]: Cita completa: “Es un lugar común profundamente erróneo, repetido en libros de texto y discursos, que debemos cultivar el hábito de pensar en lo que estamos haciendo. En realidad es todo lo contrario. **La civilización avanza al aumentar la cantidad de operaciones importantes que podemos realizar sin pensar en ellas.** Las operaciones mentales son como cargas de caballería: limitadas en número, requieren caballos frescos y deben usarse solo en momentos decisivos.” Ver [Wikiquote](<https://en.wikiquote.org/wiki/Alfred_North_Whitehead#An_Introduction_to_Mathematics_(1911)>).

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
