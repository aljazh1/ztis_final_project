import json
from flask import request
from app import app, base_url
from bson import json_util
from common import create_response
from items_controller import delete_item_by_id, get_all_items, get_item_by_id, crate_new_item, update_item
from users_controller import user_login, register_user
from orders_controller import add_new_order, delete_order_by_id, get_all_orders, get_order_by_id, add_new_order1


# error
@app.errorhandler(404)
def page_not_found(e):
    return create_response('error', 'resource not found', 404)


# dummy
@app.route(f'{base_url}/', methods=['GET'])
def hello_world():
    return create_response('success', 'This is my first API call!', 200)


# region login

@app.route(f'{base_url}/login', methods=['POST'])
def login():
    if not request.form:
        return create_response('error', 'No data!', 400)

    # body = json.loads(request.data)
    username = request.form['username']
    password = request.form['password']

    if not username or not password:
        return create_response('error', 'No username or password was given!', 400)

    user = user_login(username, password)

    if not user:
        return create_response('error', 'Incorrect username or password!', 401)
    else:
        return json.loads(json_util.dumps(user['_id']))


@app.route(f'{base_url}/register', methods=['POST'])
def register():
    if not request.form:
        return create_response('error', 'No data!', 400)

    # body = json.loads(request.data)

    username = request.form['username']
    password = request.form['password']

    if not username or not password:
        return create_response('error', 'No username or password was given!', 400)

    ret = register_user(username, password)

    if ret == True:
        return create_response('error', 'User already exists!', 400)

    return json.loads(json_util.dumps(ret)), 201


# endregion


# region items
route_items = 'items'


@app.route(f'{base_url}/{route_items}/get_items', methods=['GET'])
def get_items():
    res = get_all_items()

    return json.loads(json_util.dumps(res))


@app.route(f'{base_url}/{route_items}/get_item/<_id>', methods=['GET'])
def get_item(_id):
    if not _id:
        return create_response('error', 'No item ID was given!', 400)

    item = get_item_by_id(_id)

    if item is None:
        return create_response('error', 'No item with given ID exists!', 400)
    else:
        return json.loads(json_util.dumps(item))


@app.route(f'{base_url}/{route_items}/add_item', methods=['POST'])
def new_item():
    if not request.form:
        return create_response('error', 'No data!', 400)

    # body = json.loads(request.data)

    # ime = body.get('ime', None)
    # vrsta = body.get('vrsta', None)
    # slika = body.get('slika', None)
    # cena = body.get('cena', None)
    # zaloga = body.get('zaloga', None)

    ime = request.form['ime']
    vrsta = request.form['vrsta']
    slika = request.form['slika']
    cena = request.form['cena']
    zaloga = request.form['zaloga']

    if not ime:
        return create_response('error', 'No name of item was given', 400)
    if not vrsta:
        return create_response('error', 'No type of item was given', 400)
    if not slika:
        slika = 'https://cdn-icons-png.flaticon.com/512/86/86165.png'
    if not cena:
        return create_response('error', 'No price of item was given', 400)
    if not zaloga:
        zaloga = 0

    ret = crate_new_item(ime, vrsta, slika, cena, zaloga)

    if ret:
        return json.loads(json_util.dumps(ret)), 201
    else:
        return create_response('error', 'Error creating new item!', 500)


@app.route(f'{base_url}/{route_items}/update_item/<_id>', methods=['PUT'])
def update_item_by_id(_id):
    if not request.data:
        return create_response('error', 'No data!', 400)

    item = get_item_by_id(_id)
    if item is None:
        return create_response('error', f'Item with id:{_id} does not exist!', 400)

    body = json.loads(request.data)

    ime = body.get('ime', None)
    vrsta = body.get('vrsta', None)
    slika = body.get('slika', None)
    cena = body.get('cena', None)
    zaloga = body.get('zaloga', None)

    if ime:
        update_item(_id, 'ime', ime)
    if vrsta:
        update_item(_id, 'vrsta', vrsta)
    if slika:
        update_item(_id, 'slika', slika)
    if cena:
        update_item(_id, 'cena', cena)
    if zaloga:
        update_item(_id, 'zaloga', zaloga)

    return create_response('success', f'Item [{_id}] updated!', 200)


@app.route(f'{base_url}/{route_items}/delete_item/<_id>', methods=['DELETE'])
def delete_item(_id):
    item = get_item_by_id(_id)
    if item is None:
        return create_response('error', f'Item with id:{_id} does not exist!', 400)

    delete_item_by_id(_id)

    return create_response('success', f'Item {item["ime"]} deleted!', 200)


# endregion

# region orders
route_orders = 'orders'


@app.route(f'{base_url}/{route_orders}/all', methods=['GET'])
def all_orders():
    ret = get_all_orders()

    return json.loads(json_util.dumps(ret))


@app.route(f'{base_url}/{route_orders}/<_id>', methods=['GET'])
def get_order(_id):
    ret = get_order_by_id(_id)

    if not ret:
        return create_response('error', 'No order was found with given ID!', 400)

    return json.loads(json_util.dumps(ret))


@app.route(f'{base_url}/{route_orders}/new_order', methods=['POST'])
def new_order():
    if not request.form:
        return create_response('error', 'No data given!', 400)

    item_id = request.form['item_id']
    ime = request.form['ime']
    priimek = request.form['priimek']
    naslov = request.form['naslov']
    mesto = request.form['mesto']
    postna_stevilka = request.form['postna_stevilka']
    vrsta_placila = request.form['vrsta_placila']
    # body = json.loads(request.data)

    # item_id = body.get('izdelek_id', None)
    # naziv = body.get('naziv_placila', None)
    # metoda = body.get('metoda', None)
    # st_kartice = body.get('stevilka_kartice', None)
    # ime_na_kartici = body.get('ime_na_kartici', None)
    # datum_veljavnosti = body.get('datum_veljavnosti', None)

    if not item_id:
        return create_response('error', 'No data given!', 400)

    item = get_item_by_id(item_id)
    if not item:
        return create_response('error', 'Given item does not exist!', 400)

    # ret = add_new_order(item_id, naziv, metoda, st_kartice, ime_na_kartici, datum_veljavnosti)
    ret = add_new_order1(item_id, ime, priimek, naslov, mesto, postna_stevilka, vrsta_placila)

    return json.loads(json_util.dumps(ret))


@app.route(f'{base_url}/{route_orders}/finish_order/<_id>', methods=['DELETE'])
def finish_order(_id):
    order = get_order_by_id(_id)
    if order is None:
        return create_response('error', f'Order with id:{_id} does not exist!', 400)

    delete_order_by_id(_id)

    return create_response('success', f'Order {_id} finished!', 200)

# endregion
