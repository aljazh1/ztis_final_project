# Zanesljivost in testiranje IS - projekt

## Vsebina

- [Predpogoji](#predpogoji)
- [Začetek](#začetek)
  - [Kloniranje repozitorija](#kloniranje)
  - [Vzpostavitev Flask API](#flask)
  - [Vzpostavitev react API](#react)

<a name="predpogoji"></a>
## Predpogoji

Pred začetkom morate izpolnjevate naslednje zahteve:

- Nameščen [Python](https://www.python.org/downloads/) na vaš sistem.
- Nameščen [Node.js and npm](https://nodejs.org/) na vaš sistem.

<a name="začetek"></a>
## Začetek

V nadaljevanju so predstavljeni koraki za vzpostavitev projekta.

<a name="kloniranje"></a>
### Kloniranje repozitorija

Za vzpovstavitev projekta na vašem sistemu sledite naslednjim korakom:

1. Odprite terminal ali cmd

2. Navigirajte se do direktorija, kamor želite klonirati projekt

3. Zaženite naslednji ukaz:

   ```bash
   git clone https://github.com/your-username/your-repo.git

<a name="flask"></a>
### Vzpostavitev Flask API

1. Navigirajte se v API direktorij:
    ```bash
    cd project/API

2. Ustvarite virtualno okolje (opcijsko):
    ```bash
    python -m venv venv

3. Aktivirajte virtualno okolje
    - Windows:
        ```bash
        venv\Scripts\activate
    
    - MacOS in Linux:
        ```bash
        source venv/bin/activate

4. Namestite Python pakete:
    ```bash
    pip install -r requirements.txt

5. Zaženite Flask aplikacijo:
    ```bash
    python app.py

<a name="react"></a>
### Vzpostavitev React aplikacije:
1. Navigirajte se v web_app direktorij:
    ```bash
    cd project/web_app

2. Prenesite Node.js pakete:
    ```bash
    npm install

3. Zaženite React aplikacijo:
    ```bash
    npm start

Aplikacija bo dostopna na http://localhost:3000.






