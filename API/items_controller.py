from bson import json_util
from bson.objectid import ObjectId

from app import ItemsCollection

def get_all_items():
    items = ItemsCollection.find()

    res = {}
    _id = 0
    for x in items:
        res[_id] = json_util.loads(json_util.dumps(x))
        _id += 1

    return res

def get_item_by_id(_id):
    return ItemsCollection.find_one({'_id': ObjectId(_id)})

def crate_new_item(ime, vrsta, slika, cena, zaloga):
    item = {
        'ime': ime,
        'vrsta': vrsta,
        'slika': slika,
        'cena': cena,
        'zaloga': zaloga
    }

    item_id = ItemsCollection.insert_one(item).inserted_id
    return item_id

def update_item(_id, key, value):
    return ItemsCollection.update_one({'_id': ObjectId(_id)}, {'$set': {key: value}}).modified_count

def delete_item_by_id(_id):
    return ItemsCollection.delete_one({'_id': ObjectId(_id)}).deleted_count