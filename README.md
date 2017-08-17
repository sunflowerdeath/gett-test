Вторая версия в папке `gett_test2`, запуcкать также.

## Что я переделал

1. Использовал Flask-SQLAlchemy для работы с ORM
2. Заменил Server-sent events на Websockets, с использованием Flask-SocketIO
3. Добавил requirements.txt, теперь зависимости можно установить одной командой `pip install -r requirements.txt`
4. Улучшил структуру приложения, так чтобы все импорты были вверху файла
5. Исправил сортировку задач на клиенте

## Old

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

Для того чтобы работало добавление через curl нужно добавить еще 
 `-H "Content-type: application/json"`

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

