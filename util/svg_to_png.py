"""Convert svg's from weather-icon to pngs for Electric Sign compatability."""
import glob
from pathlib import Path
import os
import cairosvg

SVG_PATH = "../node_modules/weather-icons/svg/"
PNG_PATH = "../src/static/png/"

PNG_HEIGHT_WIDTH = 150  # in px


SVG_FILES = glob.glob(SVG_PATH + "*.svg")


def parse_filename(filepath):
    """Base filename without extension"""
    return os.path.splitext(os.path.basename(filepath))[0]


# Ensure PNG path exists
Path(PNG_PATH).mkdir(parents=False, exist_ok=True)

# convert SVG files to PNG
for svg_file in SVG_FILES:
    png_file = PNG_PATH + parse_filename(svg_file) + ".png"
    print(svg_file, png_file)
    cairosvg.svg2png(
        file_obj=open(svg_file, "rb"),
        write_to=png_file,
        parent_width=PNG_HEIGHT_WIDTH,
        parent_height=PNG_HEIGHT_WIDTH,
    )
