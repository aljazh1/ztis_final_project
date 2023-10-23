import json
from bson import json_util
from bson.objectid import ObjectId
from datetime import datetime

from app import OrdersCollection, PaymentCollection
from items_controller import get_item_by_id

def get_all_orders():
    orders = OrdersCollection.find()

    res = {}
    _id = 0
    for x in orders:
        res[_id] = json_util.loads(json_util.dumps(x))
        _id += 1

    return res

def get_order_by_id(_id):
    order = OrdersCollection.find_one({'_id' : ObjectId(_id)})

    if not order:
        return None

    item = get_item_by_id(order['izdelek_id'])
    order['izdelek'] = item

    return order

def add_new_order(item_id, naziv, metoda, st_kartice, ime_na_kartici, datum_veljavnosti):
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

    data = {
        "izdelek_id": ObjectId(item_id),
        "cas_narocila": dt_string
    }
    ret = OrdersCollection.insert_one(data).inserted_id

    data = {
        "naziv": naziv,
        "metoda": metoda,
        "stevilka_kartice": st_kartice,
        "ime_na_kartici": ime_na_kartici,
        "datum_veljavnosti": datum_veljavnosti,
        "narocilo_id": ObjectId(ret)
    }
    PaymentCollection.insert_one(data)

    return ret

def add_new_order1(item_id, ime, priimek, naslov, mesto, postna_stevilka, vrsta_placila):
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

    data = {
        "izdelek_id": ObjectId(item_id),
        "cas_narocila": dt_string
    }
    ret = OrdersCollection.insert_one(data).inserted_id

    data = {
        "ime": ime,
        "priimek": priimek,
        "naslov": naslov,
        "mesto": mesto,
        "postna_stevilka": postna_stevilka,
        "vrsta_placila": vrsta_placila,
        "narocilo_id": ObjectId(ret)
    }
    PaymentCollection.insert_one(data)

    return ret


def delete_order_by_id(_id):
    return OrdersCollection.delete_one({'_id': ObjectId(_id)}).deleted_count




