migrate((db) => {
  const collection = new Collection({
    "id": "1pvts58uhlwqe73",
    "created": "2023-06-22 10:51:30.048Z",
    "updated": "2023-06-22 10:51:30.048Z",
    "name": "plots",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "n4bmfwot",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ook8xnx7",
        "name": "field",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73");

  return dao.deleteCollection(collection);
})
