import logging

import requests
import os

from flask import Flask, request, jsonify, render_template, send_from_directory
from app.utils.token_util import get_and_update_token
from app.utils.log_util import logger_init

TOKEN = ""
headers = {}
search_url = "https://api.artsy.net/api/search"
get_artist_details_url = "https://api.artsy.net/api/artists/"

logger = logger_init("main.py", level=logging.DEBUG)
app = Flask(__name__)

@app.route('/')
def root():
    logger.info('Start serving...')
    global TOKEN, headers
    TOKEN = get_and_update_token()
    logger.debug(f"Get a token: {TOKEN}")
    logger.info(f"Get a token!")
    headers = {"X-XAPP-Token": TOKEN}
    logger.info("Rendering main page...")
    return render_template('index.html')

@app.route('/search/<string:q>', defaults={"type": "artist", "size": 10, "offset": 0}, methods=['GET'])
@app.route('/search/<string:q>/<string:type>', defaults={"size": 10, "offset": 0}, methods=['GET'])
@app.route('/search/<string:q>/<string:type>/<int:size>', defaults={"offset": 0}, methods=['GET'])
@app.route('/search/<string:q>/<string:type>/<int:size>/<int:offset>', methods=['GET'])
def search(q, type, size, offset):
    logger.info(f'Searching {q}...')
    params = {"q": q, "type": type, "size": size, "offset": offset}
    return search_body(params)

def search_body(params):
    response = requests.get(search_url, headers=headers, params=params)

    if response.status_code == 200:
        logger.info(f"Successful search!")
        response_data = response.json()
        total_count = response_data.get("total_count")
        offset = response_data.get("offset")
        size = params.get("size")
        results = response_data.get("_embedded", {}).get("results", [])
        logger.debug(f"Offset/Total Count: {offset}/{total_count}")
        logger.info(f"Found {total_count} result{'s' if total_count > 1 else ''}!")
        filtered_results = []

        for result in results:
            filtered_result = {"id": result["_links"]["self"]["href"].split("/")[-1], "name": result["title"],
                               "thumbnail": result["_links"].get("thumbnail", {}).get("href", "")}
            logger.debug(filtered_result)
            filtered_results.append(filtered_result)

        diff = total_count - offset
        has_next = diff > size

        filtered_response_data = {"q" : params.get("q"),
                                  "size" : params.get("size"),
                                  "total_count": response_data.get("total_count"),
                                  "offset": response_data.get("offset", 0),
                                  "has_next": has_next,
                                  "_embedded": filtered_results}
        logger.info("Finished the request! Responding...")
        logger.debug(filtered_response_data);
        return jsonify(filtered_response_data)
    else:
        logger.error(f"Error Code: {response.status_code}")
        return jsonify({"error": f"Error code: {response.status_code}"})


@app.route('/artists/<string:artist_id>', methods=['GET'])
def get_artist_details(artist_id):
    logger.info(f'Requesting the details of the artist whose id is {artist_id}...')
    params = {"id": artist_id}
    return get_artist_details_body(params)

def get_artist_details_body(params):

    response = requests.get(get_artist_details_url + params['id'], headers=headers)
    if response.status_code == 200:
        logger.info(f"Successfully getting the details of the artist!")
        response_data = response.json()
        name = response_data.get("name", "")
        id = response_data.get("id", "")
        biography = response_data.get("biography", "")
        birthday = response_data.get("birthday", "")
        deathday = response_data.get("deathday", "")
        nationality = response_data.get("nationality", "")

        filtered_response_data = {"name": name, "id": id, "nationality": nationality,
                                  "birthday": birthday, "deathday": deathday,
                                  "biography": biography}
        logger.debug(filtered_response_data)
        logger.info("Finished the request! Responding...")
        return jsonify(filtered_response_data)
    else:
        logger.error(f"Error code: {response.status_code}")
        return jsonify({"error": f"Error code: {response.status_code}"})


@app.route('/templates/<path:filename>')
def send_template_file(filename):
    logger.info(f'Requesting the template for {filename}...')
    return send_from_directory(os.path.join(app.root_path, 'templates'), filename)

if __name__ == "__main__":
    # Debug Mode
    app.run(host="127.0.0.1", port=5000, debug=True)
    # Deployment Mode
    # app.run(debug=True)
