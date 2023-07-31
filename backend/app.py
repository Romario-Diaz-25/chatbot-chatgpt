from flask import Flask, request, jsonify
from flask_cors import CORS

from process import process_files, query_collection

app = Flask(__name__)
CORS(app)


@app.route('/process', methods=['POST'])
def process():
    print("me esta llegando estos documentos ? ", request.files)
    documents = request.files.getlist('documents')
    print("me va a traer los documentos : 0", documents)
    process_files(documents)
    response = {'success': True}
    return jsonify(response)


@app.route('/query', methods=['GET'])
def query():
    query = request.args.get('text')
    results = query_collection(query)
    
    print("este es mi resutado : ", results)

    return jsonify(results)


if __name__ == '__main__':
    app.run()
