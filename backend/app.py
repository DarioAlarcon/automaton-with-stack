from flask import Flask, request, render_template, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__, template_folder='')


app.config['DEBUG'] = True
CORS(app, resources={r"/obtener_historial": {"origins": "*"}})
CORS(app, resources={r"/guardar_historial": {"origins": "*"}})

# Crear la base de datos y la tabla
def create_database():
    conn = sqlite3.connect('historial.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS historial (
            userWord TEXT,
            isValidate BOOLEAN
        )
    ''')
    conn.commit()
    conn.close()

create_database()

@app.route("/prueba")
def prueba():
    return "Hello world!"

@app.route('/')
def index():
    return render_template('index.html')

# Ruta para guardar el historial
@app.route('/guardar_historial', methods=['POST'])
def guardar_historial():
    userWord = request.form.get('userWord')
    isValidate = request.form.get('isValidate')
    conn = sqlite3.connect('historial.db')
    c = conn.cursor()
    c.execute("INSERT INTO historial (userWord, isValidate) VALUES (?, ?)", (userWord, isValidate))
    conn.commit()
    conn.close()
    return "Historial guardado con éxito"

# Ruta para obtener el historialF
@app.route('/obtener_historial', methods=['GET'])
def obtener_historial():
    conn = sqlite3.connect('historial.db')
    c = conn.cursor()
    c.execute("SELECT userWord, isValidate FROM historial")
    historial = c.fetchall()
    conn.close()
    return jsonify(historial)

if __name__ == '__main__':
    app.run()
