migrate((db) => {
  const collection = new Collection({
    "id": "2r37hjunza3tj97",
    "created": "2023-06-21 07:07:58.575Z",
    "updated": "2023-06-21 07:07:58.575Z",
    "name": "characters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0qkaj5b4",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "woocxnry",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 50,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qckmqlwy",
        "name": "birthdate",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "9uydeoyx",
        "name": "age",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "olrjvowx",
        "name": "core_cast",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("2r37hjunza3tj97");

  return dao.deleteCollection(collection);
})
