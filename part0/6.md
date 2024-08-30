```mermaid
sequenceDiagram;
    participant browser;
    participant server;

    activate browser;
    browser->>browser: redrawNotes();
    deactivate browser;

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa;
    Note right of browser: {content: "tetete", date: "2024-05-10T10:35:17.206Z"}
    activate server;
    server->>browser: HTTP 201;
    deactivate server;
    
```