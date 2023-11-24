import { api } from "@hboictcloud/api";

try {
    //TODO: Pas het bestand .env en .env.production aan met de gegevens van HBO-ICT.Cloud
    api.configure({
        url: "https://api.hbo-ict.cloud",
        apiKey: "pb2b2324_mooruukaanuu54.kwqx3iW7cTgO7Fss",
        database: "pb2b2324_mooruukaanuu54_live",
        environment: "live",
    });
} catch (reason) {
    console.error(reason);
}
