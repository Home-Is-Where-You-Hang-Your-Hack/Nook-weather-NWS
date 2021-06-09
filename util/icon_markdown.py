"""Generate markdown table showing the NWS icon and Weather-icon equivilent to stdout."""
from pynws.const import API_WEATHER_CODE

NWS_ICON_URL = "https://api.weather.gov/icons/"
NWS_ICON_DAY_URL = NWS_ICON_URL + "land/day/"
NWS_ICON_NIGHT_URL = NWS_ICON_URL + "land/night/"

NWS_WEATHER_ICON_MAP = {
    "bkn": {"day": "wi-cloud"},
    "blizzard": {"day": "wi-day-snow", "night": "wi-night-snow"},
    "cold": {"day": "wi-thermometer-exterior"},
    "dust": {"day": "wi-dust"},
    "few": {"day": "wi-day-cloudy", "night": "wi-night-alt-cloudy"},
    "fog": {"day": "wi-fog", "night": "wi-night-fog"},
    "fzra": {"day": "wi-day-rain-mix", "night": "wi-night-alt-rain-mix"},
    "haze": {"day": "wi-day-haze"},
    "hot": {"day": "wi-hot"},
    "hurricane": {"day": "wi-hurricane"},
    "ovc": {"day": "wi-cloudy"},
    "rain_fzra": {"day": "wi-day-rain-mix", "night": "wi-night-alt-rain-mix"},
    "rain_showers_hi": {"day": "wi-day-sprinkle", "night": "wi-night-alt-sprinkle"},
    "rain_showers": {"day": "wi-day-showers", "night": "wi-night-alt-showers"},
    "rain_sleet": {"day": "wi-day-sleet", "night": "wi-night-alt-sleet"},
    "rain_snow": {"day": "wi-day-rain-mix", "night": "wi-night-alt-rain-mix"},
    "rain": {"day": "wi-day-rain", "night": "wi-night-alt-rain"},
    "sct": {"day": "wi-day-cloudy", "night": "wi-night-alt-cloudy"},
    "skc": {"day": "wi-day-sunny", "night": "wi-night-clear"},
    "sleet": {"day": "wi-day-hail", "night": "wi-night-alt-hail"},
    "smoke": {"day": "wi-smoke"},
    "snow_fzra": {"day": "wi-day-rain-mix", "night": "wi-night-alt-rain-mix"},
    "snow_sleet": {"day": "wi-day-sleet", "night": "wi-night-alt-sleet"},
    "snow": {"day": "wi-day-snow", "night": "wi-night-snow"},
    "tornado": {"day": "wi-tornado"},
    "tropical_storm": {"day": "wi-storm-warning"},
    "tsra_hi": {"day": "wi-day-storm-showers", "night": "wi-night-alt-storm-showers"},
    "tsra_sct": {"day": "wi-thunderstorm"},
    "tsra": {"day": "wi-thunderstorm"},
    "wind_bkn": {"day": "wi-cloudy-gusts", "night": "wi-cloudy-gusts"},
    "wind_few": {"day": "wi-day-cloudy-gusts", "night": "wi-night-alt-cloudy-gusts"},
    "wind_ovc": {"day": "wi-cloudy-gusts", "night": "wi-cloudy-gusts"},
    "wind_sct": {"day": "wi-day-cloudy-gusts", "night": "wi-night-alt-cloudy-gusts"},
    "wind_skc": {"day": "wi-day-windy", "night": "wi-strong-wind"},
}


def join_md_table_line(line):
    """Markdown table line from array."""
    return "|" + "|".join(line) + "|"


def generate_nws_day_link(description, icon):
    """Markdown NWS day image."""
    return "![" + description + "](" + NWS_ICON_DAY_URL + icon + "?size=medium)"


def generate_nws_night_link(description, icon):
    """Markdown NWS night image."""
    return "![" + description + "](" + NWS_ICON_NIGHT_URL + icon + "?size=medium)"


def generate_wi_day_link(description, icon):
    """Markdown weather-icon day image."""
    return (
        "!["
        + description
        + "](./png/"
        + NWS_WEATHER_ICON_MAP[icon]["day"]
        + ".png)"
    )


def generate_wi_night_link(description, icon):
    """Markdown weather-icon night image."""
    if "night" not in NWS_WEATHER_ICON_MAP[icon]:
        return generate_wi_day_link(description, icon)

    return (
        "!["
        + description
        + "](./static/png/"
        + NWS_WEATHER_ICON_MAP[icon]["night"]
        + ".png)"
    )


def generate_markdown():
    """Generate Markdown."""
    header = [
        "Description",
        "Key",
        "NWS Day Icon",
        "NWS Night",
        "Weather Icon Day",
        "Weather Icon Night",
    ]
    markdown = []

    markdown.append(join_md_table_line(header))
    markdown.append(join_md_table_line(["---", ":--:", ":--:", ":--:", ":--:", ":--:"]))

    for key, description in API_WEATHER_CODE.items():
        line = []
        line.append(description)
        line.append("`" + key + "`")
        line.append(generate_nws_day_link(description, key))
        line.append(generate_nws_night_link(description, key))
        line.append(generate_wi_day_link(description, key))
        line.append(generate_wi_night_link(description, key))
        markdown.append(join_md_table_line(line))

    print("\n".join(markdown))


generate_markdown()
