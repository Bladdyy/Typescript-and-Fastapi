# 3 assignments from Typescript and Fastapi
# First assigment (lab 8)

### Zadanie
Dzisiejsze zadanie polega na napisaniu programu w TypeScript, który będzie umożliwiał następujące funkcje:

Dodawanie nowego prostokąta do obrazka
* kolor wypełnienia prostokąta powinien być wybierany na podstawie formularza, który jest wyświetlany poza obszarem obrazka
* dodawanie można zrobić dodawanie za pomocą “przeciągnij i upuść” czyli wybieramy pierwszy róg prostokąta, klikamy i przeciągamy do drugiego rogu, a następnie zwalniamy przycisk myszy
* dodawanie można też zrobić prościej, poprzez wpisanie wartości (x_1, y_1, x_2, y_2) w formularzu i kliknięcie przycisku “Dodaj”
Usuwanie prostokąta z obrazka
* usuwanie odbywa się poprzez kliknięcie na prostokąt, który chcemy usunąć (w formularzu pojawia się informacja o usuwanym prostokącie) a następnie kliknięcie przycisku usuń
### Informacje dodatkowe
* Kod powinien być napisany w TypeScript
* Dobrze by było, gdyby stan (obrazek) był przechowywany w formie obiektu, który będzie mógł być łatwo serializowany do formatu JSON, bo na kolejnych zajęciach będziemy zapisywać obrazki na serwerze

# Second assignment (lab 9)

### Zadanie
Dzisiejsze zadanie polega na napisaniu programu w TypeScript, który będzie komunikował się z serwerem i ściągał obrazki.

Zadanie jest sztuczne, gdyż prawdopodobnie nie ma sensu ściągać obrazków z opóźnieniem z serwera, ale ma na celu pokazanie jak można zaimplementować takie rozwiązanie.

Po stronie serwerowej należy napisać (najlepiej w fastAPI) prosty serwer, który będzie zwracał obrazki (najlepiej jako JSONy).

Uwagi:

* Raz na jakiś czas (losowo) serwer powinien zwracać błąd np. 500
* Raz na jakiś czas (losowo) serwer powinien zwracać obrazek, który jest zbyt duży (np. 10MB)
* Raz na jakiś czas (losowo) serwer powinien zwracać obrazek, który jest długo generowany (np. 10s), i to nie powinno blokować działania serwera (użyj async)
Po stronie klienta, należy napisać program, który będzie ściągał obrazki z serwera i wyświetlał je na stronie.

* Program powinien wyświetlać listę “pustych miejsc” na obrazki, które będą się ładowały.
* Początkowo w pustym miejscu powinna się wyświetlać animacja ładowania (np. obracający się spinner)
* Po załadowaniu obrazka, animacja powinna zniknąć, a obrazek powinien się wyświetlić
* Jeśli obrazek nie może zostać załadowany (np. zwrócono błąd 500), to w miejscu obrazka powinien pojawić się komunikat o błędzie i przycisk “Spróbuj ponownie”

# Third assignment (lab 10)
### Zadanie
Dzisiejsze zadanie polega na wykorzystaniu WebSocketu do komunikacji z serwisem obrazków, który budowaliśmy przez ostatnie dwa tygodnie.

Należy:

* Zainstalować wsprawcie do websockets, najlepiej w FastAPI, instalując bibliotekę websockets za pomocą pip install websockets.
* Po stronie klienta przygotować oddzielną stronę, która będzie wyświetlała ostatnio dodane obrazki.
* Po stronie serwera przygotować WebSocket, który będzie emitował informacje o dodanych obrazkach.
### Uwagi
* Warto zacząć od prostego przykładu, który będzie emitował co sekundę informację o aktualnym czasie.
* https://fastapi.tiangolo.com/advanced/websockets/ zawiera przykłady użycia WebSocketów w FastAPI.
To zadanie nie jest duże (rzędu 100 linii kodu), ale wymaga zrozumienia działania WebSocketów.

Nie zapomnijcie o funkcji onclose i onerror w WebSocketach, które mogą być przydatne do ponownego połączenia z serwerem w przypadku przerwania połączenia.
