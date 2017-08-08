Сервер использует flask, gevent и sqlalchemy
Я их устанавливал в virtualenv

```
python3 -m venv .
source ./bin/activate
pip install 'Flask'
pip install 'Gevent'
pip install 'SQLAlchemy'
```

Для запуска приложения нужно выполнить:
```
python run.py
```

Для обновления списка без перезагрузки я использовал Server Sent Events, потому что это
проще всего. Но не поддерживается в IE.

В папке frontend - приложение на реакте.
Для запуска нужно выполнить:
```
cd frontend
npm install

# Команда, которая собирает статику и кладет её в папку /static сервера
npm build

# Команда, которая запускает фронтенд без бэкенда.
# При этом вместо реального API используется fakeApi
npm start
```

