import logging

def logger_init(name, level=logging.INFO):
    logger = logging.getLogger(name)
    console_handler = logging.StreamHandler()

    formatter = logging.Formatter('[%(levelname)s][%(asctime)s][%(name)s]: %(message)s', datefmt='%Y-%m-%d %H:%M:%S %z')
    console_handler.setFormatter(formatter)
    console_handler.setLevel(level)

    logger.addHandler(console_handler)
    logger.setLevel(level)

    return logger

