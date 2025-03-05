import logging
import pytz
import os

from datetime import datetime
from tzlocal import get_localzone
from app.utils.log_util import logger_init

import requests
import json

logger = logger_init("token_util.py", level=logging.DEBUG)

# Setting Option 1
# Replace "your-client-id", "your-client-secret", and "your-current-token" with your Artsy client id, client secret and token.

CLIENT_ID = "your-client-id"
CLIENT_SECRET = "your-client-secret"
CURRENT_TOKEN = "your-current-token"

# Setting Option 2
# Get your Artsy client id, client secret and token from json files.
# Replace "your-client-id", "your-client-secret", and "your-current-token" in json files located under 'tmp' folder with your Artsy client id, client secret and token.
# Active codes marked with "Deprecated for Cloud Platform Writing Restrictions."

# Deprecated for Cloud Platform Writing Restrictions.
# TOKEN_PATH = os.getenv("TOKEN_PATH", "tmp/token.json")

# DDeprecated for Cloud Platform Writing Restrictions.
# def read_token():
#     try:
#         with open('./app/tmp/token.json', 'r') as token_json_file:
#             client_token = json.load(token_json_file)
#     except Exception as e:
#         raise Exception(f"Unexpected error occurs: {e}")
#     return client_token

# Deprecated for Cloud Platform Writing Restrictions.
# def read_client():
#     try:
#         with open('./app/tmp/client.json', 'r') as client_json_file:
#             client_json = json.load(client_json_file)
#     except Exception as e:
#         raise Exception(f"Unexpected error occurs: {e}")
#     return client_json

def request_token():
    auth_url = "https://api.artsy.net/api/tokens/xapp_token"
    auth_parameters = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    # Deprecated for Cloud Platform Writing Restrictions.
    # auth_parameters = read_client()

    response = requests.post(auth_url, json=auth_parameters)
    logger.info("Requesting token...")

    if response.status_code == 201:
        logger.info("Successfully requested a new token.")
        response_json = response.json()
        try:
            token = response_json["token"]
            logger.info("Updating token.json...")
            # Deprecated for Cloud Platform Writing Restrictions.
            # with open('./app/tmp/token.json', 'w') as token_json_file:
            #     json.dump(response_json, token_json_file, indent=4)
            #     logger.info("Successfully updated token.json.")
            global CURRENT_TOKEN
            CURRENT_TOKEN = token
            return token
        except Exception as e:
            raise Exception(f"Unexpected error occurs: {e}")
    else:
        logger.error(f"Network Status Code: {response.status_code}")

def is_token_expired(client_token):
    expired = False
    expired_time = datetime.fromisoformat(client_token["expires_at"]).astimezone(pytz.utc)
    local_time_zone = get_localzone()
    local_time = datetime.now(local_time_zone).astimezone(pytz.utc)

    logger.info(f"Local time: {local_time}")
    logger.info(f"Expired time: {expired_time}")

    if local_time > expired_time:
        expired = True
    return expired

def get_and_update_token():
    logger.info("Reading token...")
    client_token = CURRENT_TOKEN
    logger.info("Finished reading token.")
    if client_token is None:
        raise Exception("There is no available token. Try again later.")
    logger.info("Checking the validity of token...")
    if is_token_expired(client_token):
        logger.info("Invalid token. Attempt to request a new token...")
        return request_token()
    else:
        logger.info("Valid token. Nothing to do.")
        return client_token["token"]