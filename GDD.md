***R.A.T. Protocol***

## Game Design Document

Un juego diseñado por: Alejandro Cuaxiloa, Daniel Borges, Javier Borriño Carnerero y David Benitez Vázquez.

# 

# *ÍNDICE.*

**[1\. Introducción.	2](#1.-introducción.)**

[1.1. Título.	2](#1.1.-título.)

[1.2. Concepto principal.	2](#1.2.-concepto-principal.)

[1.3. Características principales.	2](#1.3.-características-principales.)

[1.4. Propósito y público objetivo.	2](#1.4.-propósito-y-público-objetivo.)

[1.5. Jugabilidad.	3](#1.5.-jugabilidad.)

[1.6. Estilo visual.	3](#1.6.-estilo-visual.)

[1.7. Plataforma.	3](#1.7.-plataforma.)

[1.8. Licencia.	3](#1.8.-licencia.)

[**2\. Jugabilidad.	4**](#2.-jugabilidad.)

[2.1. Estructura del juego.	4](#2.1.-estructura-del-juego.)

[2.2. Eventos.	4](#heading=h.uzvlv04l8u3e)

[2.3. Combate.	4](#2.3.-combate.)

[2.4. Logros	4](#heading=h.jawcrf33duir)

[2.5: Recursos.	4](#heading=h.ih4wfmgx65bi)

[2.6: Estados del juego.	4](#2.4.-estados-del-juego-y-diagrama-de-flujo)

[2.7. Controles	4](#2.5.-controles)

[**3\. Historia.	5**](#3.-historia.)

[3.1. Trasfondo y lore.	5](#3.1.-trasfondo-y-lore.)

[3.2. Trama.	5](#3.2.-trama.)

[3.3. Personajes.	5](#3.3.-personajes.)

[**4\. Arte, concept art y sonido.	5**](#4.-arte,-concept-art-y-sonido.)

[4.1. Arte.	5](#4.1.-arte.)

[4.2. Música.	5](#4.2.-música.)

[4.3. Efectos de sonido.	5](#4.3.-efectos-de-sonido.)

# **1\. Introducción.** {#1.-introducción.}

## **1.1. Título.**  {#1.1.-título.}

R.A.T Protocol. Rat es el acrónimo de Rapid-Assault Tactics. La intención del título está en que los enemigos del jeugo son ratas mutantes.

## **1.2. Concepto principal.** {#1.2.-concepto-principal.}

El concepto principal del juego consiste en un juego de disparos 2D de vista cenital, en el que un jugador, o dos en cooperativo, deberán adentrarse en mega fábricas y alcantarillas de un mundo de estilo “Dieselpunk” para exterminar y contener hordas de rata-hombres mutantes.

## **1.3. Características principales.** {#1.3.-características-principales.}

* El juego se divide en varios niveles con objetivos propios, la progresión será lineal y habrá que superarlos todos para completar el juego.  
    
* En cada nivel, el / los jugadores tendrán que cumplir ciertos objetivos antes de encontrar una salida para poder pasar de pantalla.  
    
* El principal desafío del juego consiste en la abrumadora cantidad de enemigos a los que los jugadores se enfrentarán, las rata-hombres pueden salir de agujeros y alcantarillas constantemente.  
    
* Habrán diferentes armas y objetos repartidos por los niveles que los jugadores podrán recoger y que serán útiles para hacerse paso por éstos.

  ## **1.4. Propósito y público objetivo.** {#1.4.-propósito-y-público-objetivo.}

El propósito del juego es crear una experiencia cooperativa y entretenida siguiendo el gameloop de los “horde shooters” pero en un ambiente 2D, creando un entorno multijugador enfocado a jóvenes de entre 12 y 25 años, que les gusten los “horde shooters” como Left 4 Dead 2 o Darktide, y quieran experimentarlo en una nueva vista parecida a juegos como Hotline Miami.

## **1.5. Jugabilidad.** {#1.5.-jugabilidad.}

Los jugadores controlan las fuerzas armadas del protocolo R.A.T., soldados en armadura pesada equipados con armas poco ortodoxas destinadas a eliminar la plaga de las ratas en megafábricas como la del juego. El jugador puede moverse en cuatro direcciones por el escenario, recoger e interactuar con objetos o puntos de interés y atacar en una dirección apuntada ya sea con su arma cuerpo a cuerpo o a distancia. También podrá recargar, arreglar su armadura o curar a su compañero para aguantar la ola de rata-hombres que les acecharan durante la partida.  
Con esto, los jugadores deberán no solo sobrevivir las hordas, sino también llegar a puntos objetivos donde llevar a cabo su misión que ayudará poco a poco a la completa erradicación de la plaga. Una vez la misión esté cumplida, los jugadores deberán hacer una última travesía climática hacia un punto de extracción.

## **1.6. Estilo visual.** {#1.6.-estilo-visual.}

Estilo de dibujo pixel art con temática dieselpunk y escenarios de maquinaria interminable y en perpetuo movimiento aunque decrépita, los enemigos varían entre animales antropomórficos, algunos en ropas harapientas mientras que otros pueden estar bien armados y protegidos, y ratas gigantes, además de enemigos especiales que están hechos para resaltar entre ellos y distinguirlos del escenario.  
**Concept art:**

## **1.7. Plataforma.** {#1.7.-plataforma.}

El juego estará destinado a ser jugado en navegador web (HTML5) y así ser fácil de entrar e iniciar una partida rápida además de cooperativa en línea o en local.

## **1.8. Licencia.** {#1.8.-licencia.}

El proyecto tendrá la licencia Creative Commons-Attribution-Noncommercial (CC-BY-NC). Que significa que se podrá modificar y redistribuir el trabajo siempre que se dé crédito a los creadores originales. Además de que no se podrá hacer lo anterior con fines lucrativos o comerciales. La razón por la que se ha elegido esta licencia es por el fin académico del proyecto, pero que a su vez en un futuro podría ser vendido por sus creadores.

# 

# **2\. Jugabilidad.** {#2.-jugabilidad.}

## **2.1. Estructura del juego.** {#2.1.-estructura-del-juego.}

El juego se divide en un número de niveles predeterminados. Cada nivel tiene un objetivo que completar durante la misión, y completar un nivel exitosamente desbloquea el siguiente.  
Dentro de una misión, los jugadores deben de completar un objetivo específico mientras se abren paso por hordas de rata-hombres. Al completar ese objetivo los jugadores podrán escapar por una zona de extracción a la que tendrán que llegar de forma rápida mientras una horda interminable amenaza.  
Los jugadores pueden elegir si especializarse en rango o en cuerpo a cuerpo. Y a lo largo del nivel podrán encontrar objetos que ayuden durante la misión como munición para armas, placas de armadura, o utensilios médicos para recuperarse de heridas y curar al compañero.

## **2.2. Eventos.**

A lo largo de un nivel pueden ocurrir muchas cosas y la mayoría sucederá cuando menos se lo espere el jugador. Aunque los niveles sean lineales, la probabilidad de que aparezca una horda o la cantidad de esta puede ser aleatoria, influenciada por el avance o habilidad del jugador. Hay zonas donde obligatoriamente ocurriría una horda, como en zonas objetivos que los jugadores deberán defender, ciertas secciones en mitad del nivel o al completar la misión e intentar extraer. Las hordas se definen como un periodo de tiempo limitado donde la aparición de los enemigos es extremadamente alta y casi interminable, todas las zonas de las que pueden salir saldrán enemigos e inmediatamente irán a por el jugador. Durante una horda hay poco descanso pero una vez esta termine asegura un periodo de tranquilidad donde, a no ser que se fuerce, no sucederá otra horda, y de hacerlo será más débil que la anterior. Cuanto más tiempo entre horda y horda, o más preparados estén los jugadores, más potente puede ser la horda, e incluso tener cualidades especiales.  
Algunas hordas pueden ser ligeramente menos brutales que una horda normal pero incluir enemigos especiales, ya sean más enemigos blindados, uno o dos enemigos muy grandes y fuertes, enemigos incapacitantes o enemigos que amenacen desde la distancia. 

Enemigos especiales también pueden aparecer fuera de una horda y puede ser algo de lo que mantenerse alerta pues algunos resultan ser un peligro si no se tienen en cuenta.

## **2.3. Combate.** {#2.3.-combate.}

### **2.3.1 Selección de personaje**

Los jugadores deciden si quieren tener un arma a distancia o una cuerpo a cuerpo. El jugador que tenga el arma a distancia deberá de usar el ratón para poder apuntar correctamente, mientras que el jugador cuerpo a cuerpo, en caso de no poder usar un ratón o estar jugando en local, puede usar perfectamente 4 teclas adicionales para apuntar en 8 direcciones, que con el arco de su ataque podrá cubrir cualquier peligro, por lo demás los controles son los mismos.

### **2.3.2 Enemigos**

Los jugadores deben de acertar con sus ataques a los enemigos en frente suya, la mayoría de enemigos son **carne de cañón** y de un golpe o una sola bala los mata, cuya fuerza viene en números, intentan rodear al jugador y atacar con sus manos o dientes, intentando derruir su armadura y eventualmente su vida mordisco a mordisco, estos ataques no suponen algo preocupante, pero, como ya mencionado, es la cantidad lo que lo vuelve peligroso.  
También pueden haberlos **acorazados** que aguantan un poco más y están hechos para  atraer la atención a un punto específico en vez de rociar toda la zona de ataques sin pensar.  
Los enemigos **pesados** son como los acorazados pero apareciendo de forma singular y con una cantidad muy superior, además de ataques mucho más dañinos, por lo que muestran una amenaza considerable, por suerte tienen de punto débil su zona trasera, por lo que un dúo bien coordinado podría franquear y derribarlo antes de que suponga un peligro.   
Entre los enemigos acorazados, algunos **rangers** van equipados con armas rudimentarias y mantienen las distancias con el jugador en vez de lanzarse con él, por lo que primero habrá que limpiar los enemigos que rodean al jugador o al ranger para llegar a este.  
Las ocasionales **Ratas de caza** tienen una apariencia resaltante y sonido característico que indica su presencia. Esto es importante porque en vez de atacar como lo hacen sus compañeras, las Ratas de caza se lanzan encima del jugador, incapacitando su movimiento y armas mientras les despieza con sus garras y cuchillas afiladas. Aunque lo recomendable es que un compañero se las quite de encima al otro, en caso de no poder, los jugadores pueden intentar zafarse de estas ratas machacando las teclas de movimiento, el jugador de armas a distancia le costará un rato y no conseguirá matar a la rata de caza, mientras que el jugador cuerpo a cuerpo puede hacerlo mucho más rápido y acabando con la vida de la Rata.

### **2.3.3 Vida, armadura y curación**

Los jugadores tienen una barra de vida y otra de armadura, cuando la barra de vida llega a 0, el jugador es derribado, significa que los enemigos lo ignoraran e irán a por el otro jugador, en caso de jugar solo será como haber muerto. Se puede revivir a un compañero caído simplemente interactuando con él por unos segundos, pero volver al juego de esta forma tiene un coste.   
Los jugadores tienen un total de 100 unidades de vida máxima que pueden recuperar siendo curados con botiquines, dividida en 4 “heridas” que pueden tener, al ser derribado y levantado, el jugador pierde una de estas heridas, perdiendo con ella 25 unidades de vida máxima que no podrá recuperar a no ser que se cure en una estación médica encontrada algunas veces por el nivel. Si un jugador es derribado cuando solo le queda una herida, muere, solo podrá volver a la partida si el otro jugador llega a un punto seguro donde salvarlo.  
Si se juega solo o ambos jugadores mueren o están derribados, se considera Game Over y tendrán que volver a intentar desde el último checkpoint.  
Para ayudar, los jugadores también tienen una armadura que sirve de barra de vida adicional, una unidad de armadura vale lo mismo que una unidad de vida, el jugador con armas a distancia tiene 50 de armadura máximo mientras que el jugador con armas cuerpo a cuerpo tiene un total de 100 unidades de armadura, y siempre mantendrá ese máximo de vida a lo largo del nivel. De normal, la armadura se consume antes que la vida al recibir daño.

A lo largo de los niveles, el jugador podrá encontrar **botiquines** y **placas de armadura** para recuperar vida o armadura, los botiquines recuperan 50\* de vida y las placas de armadura 25\* de armadura. También en zonas seguras se pueden encontrar **estaciones médicas** que curan el total de la vida y recuperan 2 heridas al jugador.  
Un jugador puede llevar como máximo la suma de 10 botiquines y placas todo junto. Al curarse, si tiene botiquines, se curará la vida hasta el máximo o hasta no tener más, entonces al curarse arreglará su propia armadura.  
También se puede curar al compañero, con una animación más corta que si se curase uno solo se puede administrar ya sea botiquines o placas de armadura al compañero, si el compañero está derribado en vez de simplemente curarlo lo levantara (todo con el mismo botón).

## **2.4. Estados del juego y Diagrama de flujo** {#2.4.-estados-del-juego-y-diagrama-de-flujo}

### **2.4.1. Menú principal**

Del menú principal se puede cerrar el juego, abrir las opciones o ir al selector de nivel (indicado como “JUGAR”).

En el menú de opciones se puede controlar el audio del juego así como revisar los controles de los jugadores.

### **2.4.2. Selector de niveles**

Antes de llegar al selector de niveles al jugador se le presenta la opción de jugar en línea o en local, si decide jugar en línea, el jugador cliente no verá el selector de nivel si no que simplemente esperará a que el jugador huésped elija nivel.  
El selector de niveles deja elegir cualquiera de los niveles disponibles al jugador además de un primer nivel tutorial.

Antes de comenzar un nivel se deja elegir a los jugadores cuál de los dos personajes quieren ser. Una vez hayan elegido comenzará el nivel.

### **2.4.3. Misión / Nivel**

Al comenzar una misión ambos jugadores tendrán el mismo HUD, en local verán exactamente lo mismo mientras que en línea cada uno tendrá su cámara enfocada en sí mismo.  
Los jugadores veran el nivel de forma cenital, será facil distinguir el fondo / suelo del nivel con enemigos y objetivos u objetos de interes y entre zona y zona habra una breve transición de fundido a negro.  
En el HUD se podrá ver la vida, armadura y munición de cada jugador, la del jugador 1 a la izquierda y el jugador 2 a la derecha, mientras que arriba de la pantalla vendrá información de si hay una horda activa o cual es el siguiente objetivo.

### **2.4.4. Game Over / Pantalla final**

En caso de que ambos jugadores mueran o estén incapacitados al mismo tiempo, tendrá una pantalla de GAME OVER. en la que podrán elegir si volver al selector de nivel o repetir el nivel.

Si consiguen completar la misión y extraer tendrán una pantalla de victoría donde podrán ver estadísticas como daño recibido, cuántas veces han revivido, o cuantas alimañas han exterminado. Después volverán al selector de nivel.

### **2.4.5. Diagrama de flujo**

![][image1]  
\* Referencia: “Img Flowchart.png”  
formato Mermaid:  
**flowchart TB**  
**PCI\[Pantalla\_de\_carga\_inicial\] \--\> Menú**  
**Menú \--\> |iniciar partida|SJ\[Selector de jugar en línea o en local\]**  
**Menú \<--\> OP\[opciones\]**  
**SJ \--\> SN\[Selector de niveles\]**  
**SN \<--\> OP**  
**SN \--\> Menú**  
**SN \--\> |Seleccionar nivel| SP\[Selector de personaje\]**  
**SP \--\> N\[Nivel\]**  
**N \<--\> OP**  
**N \--\> |Ambos jugadores muertos o incapacitados al mismo tiempo|GO\[Game Over\]**  
**N \--\> |Seleccionar salir del nivel en el menú| SN**  
**N \--\> |completar misión| V\[Pantalla de victoria\]**  
**GO \--\>|volver a intentar| N**  
**GO \--\> |Salir al menú| SN**  
**V \--\> SN**

## **2.5. Controles** {#2.5.-controles}

Los controles pueden variar si se juega en línea o en local, uno de los personajes está diseñado para poder ser jugado con los controles adaptados para local para que no haya una desventaja entre los jugadores.

### **2.5.1 Controles en línea**

Estos controles son idénticos para ambos jugadores cuando se juega en línea. En este caso cada jugador apuntaría con el ratón, moviendo el ratón por la pantalla su personaje apuntaría hacia donde ellos tienen el cursor.

Acción \-\> “tecla”  
Moverse hacia arriba 			\-\> “W”  
Moverse hacia abajo			\-\> “S”  
Moverse hacia la derecha		\-\> “D”  
Moverse hacia izquierda 		\-\> “A”  
Disparar					\-\> “Click izquierdo”  
Recargar arma / cambiar de modo	\-\> “R”  
Interactuar					\-\> “Espacio”  
Curarse (a uno mismo)			\-\> “Q”  
Curar (al compañero)			\-\> “F”

### **2.5.2 Controles en local**

Estos son los controles en local, se recomendará al jugador que juegue sin ratón a ser el jugador con arma cuerpo a cuerpo. El jugador 1 en este caso apunta con el ratón como si jugase en línea, mientras que el jugador 2 en vez de apuntar, ataca directamente con nuevos controles direccionales para golpear con su arma de cuerpo a cuerpo.

Jugador 1 (jugador a distancia)  
Moverse hacia arriba 			\-\> “↑”  
Moverse hacia abajo			\-\> “↓”  
Moverse hacia la derecha		\-\> “→”  
Moverse hacia izquierda 		\-\> “←”  
Disparar					\-\> “Click izquierdo”  
Recargar arma / cambiar de modo	\-\> “Click derecho”  
Interactuar					\-\> “Numpad 0”  
Curarse (a uno mismo)			\-\> “Ctrl derecho”  
Curar (al compañero)			\-\> “Shift derecho”

Jugador 2 (jugador cuerpo a cuerpo)  
Moverse hacia arriba 			\-\> “W”  
Moverse hacia abajo			\-\> “S”  
Moverse hacia la derecha		\-\> “D”  
Moverse hacia izquierda 		\-\> “A”  
Atacar hacia arriba			\-\> “Y”  
Atacar hacia abajo			\-\> “H”  
Atacar hacia la derecha			\-\> “J”  
Atacar hacia la izquierda		\-\> “G”

Recargar arma / cambiar de modo	\-\> “R”  
Interactuar					\-\> “Espacio”  
Curarse (a uno mismo)			\-\> “Q”  
Curar (al compañero)			\-\> “F”

# **3\. Historia.** {#3.-historia.}

## **3.1. Trasfondo y lore.** {#3.1.-trasfondo-y-lore.}

En una realidad alterna, un futuro distante donde la sociedad se ha expandido a todo rincón de este planeta. Megafábricas, la vértebra de la sociedad, se alzan hasta donde alcanza el horizonte, incontables trabajadores viven y mueren a diario para crear maquinaria o mantener la electricidad de los millones que viven alrededor de estas fábricas como si fuesen el corazón de toda ciudad, y en algunos casos llegan a ser ciudades en sí mismas dada su inmensa magnitud. Tales behemoths de la tecnología moderna se mantienen en pie por interés de su función, no necesariamente de sus trabajadores. Es por eso que solo cuando la producción realmente se ve afectada es cuando agencias de seguridad privadas pueden entrar en juego para arreglar cualquier problema inhumano que se pueda hallar en los pulmones que mantiene el mundo en movimiento.

En el sector E-40400, la megafábrica “Queek-HT” sufre de una enfermedad capaz de destruir las sociedades cónyuges, una sociedad nueva, hostil y salvaje. Los extraños químicos y residuos que estas máquinas producen en su profundidad, mucho por debajo de la línea marítima, puede llevar a mutaciones dolorosas y el nacimiento de verdaderas aberraciones de la naturaleza, entre los más comunes son las **Ratas-hombre**, probablemente creados por un proceso lento pero seguro donde las ratas que hayan hogar en una mega fábrica sufren poco a poco de una evolución veloz pero brutal, donde se crea una segunda sociedad por debajo de las narices de todo trabajador o ciudadano, hasta que un día sean tan numeroso y tan inteligentes que aislar secciones de la fábrica no es una opción pues los números llegan a la sexta cifra a lo largo de las profundidades de la fábrica. Solo una opción parece viable, la exterminación.

## **3.2. Trama.** {#3.2.-trama.}

Una compañía conocida como A.N.I.M.A.L. Solutions es contratada para limpiar las temibles profundidades de Queek-HT antes de que la plaga de ratas-hombre llegue a niveles superiores. El **protocolo de Tácticas de Asalto Rápidas (Rapid Assault Tactics)** es activado, y tropas de choque son movilizadas por todas las kilométricas hectáreas de Queek para frenar y exterminar a cualquier alimaña que encuentren.  
Los jugadores asumen el puesto de dos de estas tropas, reforzadas con armadura, entrenadas como soldados y armados con tecnología punta, hacen frente a las Ratas humanoides que se retuercen entre las sombras y alcantarillas de Queek-HT, ya sea con planes de contingencia que erradique sus números en masa como acribillando y rebanando criaturas no humanas que hagan contacto con ellos.

## **3.3. Personajes.** {#3.3.-personajes.}

Los únicos personajes con los que el jugador llegará a interactuar serán los mismos personajes jugables y una comandante de campo que les hablará por radio.  
La comandante de campo Katherine “Kat”, representada por una foto suya con armadura y casco de batalla con motivos felinos. No se llegará a conocer mucho de su personalidad a parte de su odio hacia las alimañas y despreocupación hacía la integridad de la fábrica en sí más allá de la permitida por superiores y clientes. La comandante de campo se comunicará con los jugadores durante momentos clave como el tutorial, el inicio de un nivel, al empezar un objetivo principal, y a la extracción. Sirve de guía y narradora para que el jugador pueda situarse y saber a dónde ir.

Los personajes jugables no tienen nombre, lo único que se ve de ellos son sus armaduras y armamento. Uno de ellos va armado con lo que parece una ametralladora de cargador de plato como una ametralladora DP baidu pero adaptada al estilo del juego, la armadura de este personaje es más ligera y móvil, además de tener una máscara con cara de zorro. El segundo personaje está enfocado al combate cuerpo a cuerpo, lleva una Espada Rojo Blanco Mk.IV, su armadura es mucho más pesada y tosca, lo distingue un casco con forma de lechuza.

# **4\. Arte, concept art y sonido.** {#4.-arte,-concept-art-y-sonido.}

## **4.1. Arte.** {#4.1.-arte.}

Todo el arte se encuentra en la carpeta “img” de este trabajo. Se encuentran presentes:  
1er Boceto Tirador (Conejo) \- ske\_1\_shooter.png  
2º Boceto Tirador (Zorro) \- ske\_2\_shooter.png  
Boceto Final Tirador (Zorro) \- ske\_final\_shooter.png  
Boceto Cuerpo a Cuerpo (Lechuza) \- ske\_final\_melee.png  
Boceto Hombre-Rata Base \- ske\_ratman.png  
Logo \- logo.png  
Pantalla Principal \- title\_screen.png  
UI y gameplay mockup \- mockup.png

## **4.2. Música.**  {#4.2.-música.}

La música del juego busca meter al jugador en el ambiente del mundo sin entorpecer o distraer mucho del flujo de la partida. Por ello se optará por componer música ambiental de un tono oscuro y ominoso a la vez que sutil y ligero.
Para corresponder mejor con la temática dieselpunk del juego. Se hará énfasis en instrumentos correspondientes a los géneros musicales del rock y el jazz -surgidos tras la segunda revolución industrial, que es en lo que se basa el steampunk-. Además se usarán percusiones metálicas que recuerden a ruidos de una fábrica y posiblemente habrá presencia de sintetizadores.
Para la banda sonora se compondrán temas correspondientes a las siguientes pantallas del juego:

Pantalla de título.
Escena de introducción.
Opciones y selección de nivel / personaje.
Niveles (un tema distinto por nivel)

## **4.3. Efectos de sonido.** {#4.3.-efectos-de-sonido.}

Para complementar el estilo visual, los efectos de sonido buscan tener ese sabor crunchy que el pixel art y la ambientación cruda ofrecen, por lo que la dirección de estos viene muy ligada al uso de bitcrush, con el enfoque de ayudar a la banda sonora a crear dicha atmósfera.
Se implementarán efectos de sonido para:
Disparar, Atacar a Melée y similares
Recargar
Moverse
Eliminar enemigos 
Recoger botiquines, armadura y loot
Curar, revivir a alguien
Recibir daño
Ser derribado, morir
Sonidos de los enemigos y del entorno
Interacciones con los diferentes elementos del entorno
Interactuar con los botones del menú

[image1]: <data:image/png;base64,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ricLhFU55RlW+r/84u901ON+vfcOnn/+pYpz0s7fuHFT4voPP/y4y2vij4+YelIwaMC+FddLI6xah7n4F63qJfm8y/VkgbAqp7zDqpp4uJhtafsvv/xquFV/cGweUwYO6PyDZMXs+60334mOSSOsWoe5+Bet6iX5vMv1ZIGwKqdmh9WLL/41KsU85+PVnyTCRrnv3jnRYyV+zoYNG4O9Rx6Seiz+tfJAWEGCT3MtORa5niwQVuWUd1jNuuqWYJcenR93pNuUXfuOrdhXRgw9MFi4cFn4j8nK4VNODJY+82zF9Vo8kFTAjRh2UPDs9g/OrTj2cfu2/6r8U3SdNMIKEnyaa8mxyPVkgbAqp7zDyoVmfl3CChJ8mmvJscj1ZIGwKqc8w6pfnzFmU+4G9B9nNuWKsIIEn+ZacixyPVkgrMopz7BqBYQVJPg015JjkevJAmFVToRVNoQVJPg015JjkevJAmFVToRVNoQVJPg015JjkevJAmFVToRVNoQVJPg015JjkevJAmFVToRVNoQVJPg015JjkevJAmFVToRVNoQVJPg015JjkevJAmFVToRVNoQVJPg015JjkevJAmFVTmqxpbIVYYWsfJprybHI9WSBsCo3veD6VureMdt8rbLhdds8Ps215FjkerJAWJWbufD6UoSVO7xum8enuZYci1xPFggruMC94w5z3zw+zbXkWOR6skBYwQXuHXeY++bxaa4lxyLXkwXCCi5w77jD3DePT3MtORa5niwQVnCBe8cd5r55fJprybHI9WSBsIIL3DturFmzJthxxx3NZuTEp/tccixyPVkgrOAC944bxx57bDBuXHP/32CtzKf7XHIscj1ZIKzgAveOG8x7c/k035JjkevJAmEFF2666abw/unTp0/wyiuvmIdzM3PmzODggw8Ov24rlZprVTNmzDCnBDnyaY2UHItcTxYIK7i0aNGiaCHNk/4a//zP/xx+zVaqd99915wONEne97UNybHI9WSBsIIP8r6X8u4fSOPTfSc5FrmeLBBW8EGe91KefQNd8enekxyLXE8WCCu4pH88F6//+q//Mk/LhPsUrvh070mORa4nC4QVXDKDKo97Ko8+gXr4dO9JjkWuJwuEFVzLM6iUvPoFavHp3pMci1xPFggruDZ79mzCCqXk070nORa5niwQVvBBnvdSnn0DXfHp3pMci1xP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>
