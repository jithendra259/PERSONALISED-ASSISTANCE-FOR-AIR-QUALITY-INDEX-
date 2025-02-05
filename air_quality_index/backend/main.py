from flask import Flask
from chatbotbackend.chatbot import chatbot
from map_component.map import map

app = Flask(__name__)
app.register_blueprint(chatbot)
app.register_blueprint(map)

if __name__ == '__main__':
    app.run(port=8000)
