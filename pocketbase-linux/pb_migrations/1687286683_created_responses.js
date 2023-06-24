migrate((db) => {
  const collection = new Collection({
    "id": "3bjsayj8b0slmst",
    "created": "2023-06-20 18:44:43.763Z",
    "updated": "2023-06-20 18:44:43.763Z",
    "name": "responses",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tknxx5ma",
        "name": "message",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("3bjsayj8b0slmst");

  return dao.deleteCollection(collection);
})
