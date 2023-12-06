from ..app import app
import pytest


def test_hello_world():
    response = app.test_client().get('/api/v1/')
    assert response.status_code == 200
    assert b"This is my first API call!" in response.data


def test_login():
    response = app.test_client().post('/api/v1/login', data={'username': 'test', 'password': '1234'})
    assert response.status_code == 200
    assert b"6556204f1a251d6e2075a36b" in response.data


def test_register():
    test_data = {'username': 'test_user', 'password': 'test_pass'}
    response = app.test_client().post('/api/v1/register', data=test_data)
    assert response.status_code in [201, 400]


def test_get_items():
    response = app.test_client().get('/api/v1/items/get_items')
    assert response.status_code == 200
    assert len(response.data) > 0


def test_get_item_by_id():
    test_id = '6542a528b420783997091fbe'
    response = app.test_client().get(f'/api/v1/items/get_item/{test_id}')
    assert response.status_code in [200, 400]


def test_add_item():
    test_data = {
        'ime': 'Test Item',
        'vrsta': 'Test Type',
        'slika': 'Test Image URL',
        'cena': '10',
        'zaloga': '10'
    }
    response = app.test_client().post('/api/v1/items/add_item', data=test_data)
    assert response.status_code == 201


def test_update_item():
    test_id = '6570a3c5a743a6e645a4febd'
    test_data = {
        'ime': 'Updated Name',
        'vrsta': 'Updated Type',
        'slika': 'Updated Image URL',
        'cena': '20',
        'zaloga': '20'
    }
    response = app.test_client().put(f'/api/v1/items/update_item/{test_id}', json=test_data)
    assert response.status_code in [200, 400]


def test_delete_item():
    test_id = '123456789123456789123456'
    response = app.test_client().delete(f'/api/v1/items/delete_item/{test_id}')
    assert response.status_code == 400
    assert b"error: Item with id:{123456789123456789123456} does not exist!" in response.data


def test_all_orders():
    response = app.test_client().get('/api/v1/orders/all')
    assert response.status_code == 200
    assert len(response.data) > 0


def test_get_order_by_id():
    test_id = '652bf7ecc1c75f7ec171f843'
    response = app.test_client().get(f'/api/v1/orders/{test_id}')
    assert response.status_code in [200, 400]


def test_new_order():
    test_data = {
        'item_id': '000000000000000000000000',
        'ime': 'Test Name',
        'priimek': 'Test Surname',
        'naslov': 'Test Address',
        'mesto': 'Test City',
        'postna_stevilka': '0000',
        'vrsta_placila': 'Placilo s kartico'
    }
    response = app.test_client().post('/api/v1/orders/new_order', data=test_data)
    assert response.status_code in [200, 400]


def test_finish_order():
    test_id = '000000000000000000000000'
    response = app.test_client().delete(f'/api/v1/orders/finish_order/{test_id}')
    assert response.status_code == 400
    assert b"error: Order with id:{000000000000000000000000} does not exist!" in response.data
