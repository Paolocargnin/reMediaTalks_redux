# Introduction to Redux.
Redux is a predictable state container for JavaScript apps.

Hi mates.

Partendo da Emil
3 min

Detto questo, vi avverto che andrò molto nel pratico e ciò che spiegherò sarà fortemente legato alla logica di questa applicazione.
Visto come è finito il talk della settimana precedente, dove _ci fu una grande battaglia di idee e alla fine non ci furono né vincitori né vinti né idee_ , l'idea è quella di farvi vedere velocemente come strutturare questo progetto per poi parlare insieme della logica dell'architettura di flux e dei metodi reali di utilizzo in cui potremmo inserirla in reMedia.

### 1 - Let's Start!
Start the app. Usiamo il generatore ufficiale di react. 
> npm install -g create-react-app
> create-react-app redux-rocks
> cd redux-rocks
> npm install --save  redux react-redux redux thunk
E poi perché siamo dei frontendisti e non ci facciamo mancare una implementazione senza altri framework aggiungiamo:
> npm install --save lodash seamless-immutable

seamless-immutable è una libreria che ci permette di creare Reduces  immutabili.

In index.js inizializziamo Redux e importiamo redux-thunk

Il flusso di un applicazione strutturata con l'architettura Flux è: 
![alt tag](img1.png)

Una delle difficoltà maggiori nell'iniziare a usare redux non è tanto capire il flusso qui sopra, ma gestire tutti i termini che prevede. Inseriamoli in questo grafico, ma non fermiamoci troppo qui perché poi vi sarà tutto più chiaro.
![alt tag](img2.png)

### 2 - Let's structure!
Non è sicuramente una struttua che potrebbe andare bene per enormi applicazioni. 

> mkdir src/components
  Metteremo qui tutti i componenti di React che non hanon niente a che fare con Redux
> mkdir src/containers
  Per container si intendono i componenti di React che sono collegati con le store di Redux
> mkdir src/services
  Mh. Servizi. 
> src/store
 Tutto il codice di Redux va qui, compresa la business-logic del progetto.

Organizziamo quindi la cartella store per domains, cioè qualcosa come: 
> src/store/{domain}/reducer.js
Reducer as a default export with all selectors as named exports
> src/store/{domain}/actions.js
All the domain action handlers (thunks and plain object creators)

So, we create : 
> src/store/remediapoll.com/reducer.js
> src/store/remediapoll.com/actions.js

Right?!

Per dominio si intende una collezzione di dati, quindi nel nostro caso: 
> subl src/store/polls/reducer.js
> subl src/store/polls/actions.js

### 3 - Let's look at the code!

In più, creiamo il componente collegato al reducer, e il servizio che ci collega all'app di Gio
> subl src/containers/PollsScreen.js
> subl src/services/pollService.js

Piccolo appunto, i servizi devono essere StateLess. Questo significa che funzionano a prescidere dello stato dell'applicazione.
Per esempio, se dovessimo autenticarci potremmo essere tentanti ad inserire l'autenticazione direttamente nel servizio, mentre bisognerebbe gestire un altra store con un altro service di autenticazione.



#### Notes

