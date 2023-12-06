from .app import UsersCollection

def user_login(UN, PW):
    user = UsersCollection.find_one({'username': UN, 'password': PW})
    return user

def register_user(UN, PW):
    user = UsersCollection.find_one({'username': UN})

    if user:
        return True
    
    user = {
        'username': UN, 
        'password': PW
    }

    user_id = UsersCollection.insert_one(user).inserted_id
    return user_id