from flask import current_app, send_from_directory, request


@current_app.route("/")
def index():
    return send_from_directory(current_app.static_folder, "index.html")


@current_app.route("/test_route")
def test_route():
    msg = ""
    success = True

    try:
        pass
    except Exception as e:
        msg = str(e)
        success = False

    return {"msg": msg, "success": success}



@current_app.route("/add_note")
def add_note():
    msg = ""
    success = True

    try:
        pass
    except Exception as e:
        msg = str(e)
        success = False

    return {"msg": msg, "success": success}
