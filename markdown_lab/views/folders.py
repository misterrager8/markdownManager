from pathlib import Path

from flask import Blueprint, redirect, render_template, request, url_for

from markdown_lab import config
from markdown_lab.models import Folder

folders = Blueprint("folders", __name__)


@folders.route("/create_folder", methods=["POST"])
def create_folder():
    folder_ = Folder(config.BASE_DIR / (request.form["name"] or "Untitled Folder"))
    folder_.create()
    return redirect(url_for("folders.folder", name=folder_.name))


@folders.route("/folder")
def folder():
    folder_ = Folder(config.BASE_DIR / request.args.get("name"))
    return render_template("folder.html", current_folder=folder_)


@folders.route("/delete_folder")
def delete_folder():
    folder_ = Folder(config.BASE_DIR / request.args.get("name"))
    folder_.delete()

    return redirect(url_for("index"))


@folders.route("/rename_folder", methods=["POST"])
def rename_folder():
    folder_ = Folder(config.BASE_DIR / request.args.get("folder"))
    folder_.rename(request.form["name"])

    return redirect(url_for("folders.folder", name=folder_.name))
