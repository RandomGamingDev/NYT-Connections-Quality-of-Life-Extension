const SVG_NS = "http://www.w3.org/2000/svg";

const USER_AGENT = navigator.userAgent||navigator.vendor||window.opera;
const ON_MOBILE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(USER_AGENT)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(USER_AGENT.substr(0,4));

const IS_DEFAULT_DARK_MODE = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function replaceFavicon(filename) {
  const faviconUrl = chrome.runtime.getURL(filename);
  const head = document.head || document.getElementsByTagName("head")[0];

  const existing = head.querySelectorAll("link[rel~='icon']");
  existing.forEach(link => head.removeChild(link));

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = faviconUrl;

  head.appendChild(link);
}
replaceFavicon("icons/icon-48.png");
document.title = "Connections+ [QOL] — The New York Times";

function setCookie(cname, cvalue, exdays = 16 * 365) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}
function getCookie(cname) {
  let name = `${cname}=`;
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ')
      c = c.substring(1);
    if (c.indexOf(name) == 0)
      return c.substring(name.length, c.length);
  }
  return "";
}

if (getCookie("usersetting-highlighter").length == 0)
	setCookie("usersetting-highlighter", true);
if (getCookie("usersetting-tile-dragging").length == 0)
	setCookie("usersetting-tile-dragging", true);
if (getCookie("usersetting-dark-theme").length == 0)
	setCookie("usersetting-dark-theme", IS_DEFAULT_DARK_MODE);

const get_user_settings_from_cookies = () => ({
	highlighter: getCookie("usersetting-highlighter") == "true",
	tile_dragging: getCookie("usersetting-tile-dragging") == "true",
	dark_theme: getCookie("usersetting-dark-theme") == "true"
});
const UserSettings = get_user_settings_from_cookies();

if (UserSettings.dark_theme)
	document.body.classList.add("dark-theme");

const add_css = (css) => document.head.appendChild(document.createElement("style")).innerHTML = css;
const HIGHLIGHTER_CLASS = "highlighter";
add_css(`
	:root {
		--connections-helper-color-mode: 0, 0, 0;
		--connections-helper-opposite-color-mode: 255, 255, 255;
	}

	body.dark-theme {
		--connections-helper-color-mode: 255, 255, 255;
		--connections-helper-opposite-color-mode: 0, 0, 0;
	}
	
	body.dark-theme,
	body.dark-theme dialog {
		filter: invert(1) hue-rotate(180deg);
	}

	body.dark-theme .connections,
	body.dark-theme .pz-ad {
		filter: invert(1) hue-rotate(180deg);
	}

	body.dark-theme #connections-container {
		background-color: white !important;
		margin-top: 0;
	}

	body.dark-theme .${HIGHLIGHTER_CLASS} {
		filter: invert(1) hue-rotate(180deg);
	}

	body.dark-theme, .SolvedCategory-module_solvedCategory___8phN {
		filter: invert(1) hue-rotate(180deg);
	}

	body.dark-theme, .css-awz80j {
		filter: invert(1) hue-rotate(180deg);
	}

	body.dark-theme .word-cell.highlighted {
		filter: invert(1) hue-rotate(180deg);
	}

	.${HIGHLIGHTER_CLASS} {
		opacity: ${ ON_MOBILE ? 1 : 0 };
		transition: opacity 0.3s ease;
		position: absolute;
		border-radius: 2px;
	}

	label:hover .${HIGHLIGHTER_CLASS} {
		opacity: 1;
	}

	.highlighter-disabled > label > .${HIGHLIGHTER_CLASS} {
		display: none;
	}

	#settings-overlay[open] {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(var(--connections-helper-color-mode), 0.5);

		border: none;
		outline: none;

		min-width: 100vw;
		min-height: 100vh;
		width: 100vw;
		height: 100vh;
	}

	#settings-menu {
		position: relative;
		display: block;

		background-color: white;
		box-shadow: 0 4px 23px 0 rgba(var(--connections-helper-opposite-color-mode), 0.2);

		border-radius: 8px;

		padding: 16px;
		
		max-width: 520px;
		max-height: 100%;
		width: 520px;

		font: "nyt-franklin";
		font-weight: 700;
		font-size: 16px;
		text-align: center;
	}

	#settings-menu > h1 {
		width: 100%;
	}

	#settings-menu > button {
		position: absolute;
		top: 16px;
		right: 16px;
	}

	#settings-close {
		background-color: rgba(var(--connections-helper-opposite-color-mode), 0);
		border: none;
		outline: none;
	}

	.setting-row {
		display: flex;

		padding-top: 16px;
		padding-bottom: 16px;

		align-items: center;

		border-bottom: 1px solid rgba(0, 0, 0, 0.2);

		text-align: left;
	};

	.setting-row > .setting-row-text-div {
		display: block;
	}

	.setting-row > .setting-row-text-div > h3 {
		font-size: 18px;
	}

	.setting-row > .setting-row-text-div > p {
		font-size: 12px;
		font-weight: normal;
	}

	.setting-row > .setting-row-toggle-div {
		display: flex;

		margin-left: auto;

		justify-content: space-between;
	}

	.setting-row > .setting-row-toggle-div > .setting-row-toggle {
		position: relative;

		background-color: rgba(0, 0, 0, 0.34);

		width: 32px;
		height: 20px;

		border: none;
		outline: none;

		border-radius: 999px;

		transition: background 0.3s ease;
	}

	.setting-row > .setting-row-toggle-div > .setting-row-toggle.setting-row-toggle-active {
		background-color: rgba(0, 255, 0, 1);
	}

	.setting-row > .setting-row-toggle-div > .setting-row-toggle > span {
		position: absolute;

		top: 2px;
		left: 2px;

		display: block;

		background-color: rgba(255, 255, 255, 1);

		width: 16px;
		height: 16px;

		border-radius: 8px;

		transition: transform 0.3s ease;
	}

	.setting-row > .setting-row-toggle-div > .setting-row-toggle.setting-row-toggle-active > span {
		transform: translateX(12px);
	}
`);

const settings_element = document.createElement("dialog");
{
	settings_element.id = "settings-overlay";
	settings_element.addEventListener("click", (e) => {
		if (e.target != settings_element)
			return;
			settings_element.close();
	});

	const settings_menu = document.createElement("div");
	{
		settings_menu.id = "settings-menu";

		const settings_heading = document.createElement("h1");
		settings_heading.textContent = "SETTINGS";
		settings_menu.appendChild(settings_heading);


		const close_settings_button = document.createElement("button");
		{
			close_settings_button.id = "settings-close";
			close_settings_button.setAttribute("aria-label", "close");
			close_settings_button.addEventListener("click", (e) => {
				settings_element.close();
			});

			const close_settings_svg = document.createElementNS(SVG_NS, "svg");
			close_settings_svg.setAttribute("height", "30");
			close_settings_svg.setAttribute("width", "30");
			close_settings_svg.setAttribute("viewBox", "0 0 24 24");

			const close_settings_path = document.createElementNS(SVG_NS, "path");
			close_settings_path.setAttribute('d', "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
			close_settings_svg.appendChild(close_settings_path);

			close_settings_button.appendChild(close_settings_svg);
		}
		settings_menu.append(close_settings_button);

		const gen_setting_row = (title, description, on_toggle, toggle_on = false) => {
			const setting_row = document.createElement("div");
			{
				setting_row.className = "setting-row"
				
				const setting_row_text_div = document.createElement("div");
				{
					setting_row_text_div.className = "setting-row-text-div"

					const setting_row_title = document.createElement("h3");
					setting_row_title.textContent = title;
					const setting_row_desc = document.createElement("p");
					setting_row_desc.textContent = description;

					setting_row_text_div.appendChild(setting_row_title);
					setting_row_text_div.appendChild(setting_row_desc);
				}
				setting_row.appendChild(setting_row_text_div);


				const toggle_div = document.createElement("div");
				{
					toggle_div.className = "setting-row-toggle-div";

					const toggle = document.createElement("button");
					{
						toggle.className = "setting-row-toggle";

						const toggle_span = document.createElement("span");
						if (toggle_on)
							toggle.classList.toggle("setting-row-toggle-active");
						toggle.appendChild(toggle_span);

						toggle.addEventListener("click", (e) => {
							toggle.classList.toggle("setting-row-toggle-active");
							on_toggle(toggle.classList.contains("setting-row-toggle-active"));
						});
					}

					toggle_div.appendChild(toggle);
				}
				setting_row.appendChild(toggle_div);
			}
			settings_menu.appendChild(setting_row);
		}

		gen_setting_row("Highlighter", "Highlight specific tiles to remember which are which before you guess", (toggle_on) => {
			setCookie("usersetting-highlighter", toggle_on);
			UserSettings.highlighter = toggle_on;
			if (UserSettings.highlighter)
				CELL_CONTAINER.classList.remove("highlighter-disabled");
			else
				CELL_CONTAINER.classList.add("highlighter-disabled");
		}, UserSettings.highlighter);
		gen_setting_row("Tile Dragging", "Drag tiles to where you want them to better associate similar tiles", (toggle_on) => {
			setCookie("usersetting-tile-dragging", toggle_on);
			UserSettings.tile_dragging = toggle_on;
		}, UserSettings.tile_dragging);
		gen_setting_row("Dark Theme", "", (toggle_on) => {
			setCookie("usersetting-dark-theme", toggle_on);
			UserSettings.dark_theme = toggle_on;
			if (UserSettings.dark_theme)
				document.body.classList.add("dark-theme");
			else
				document.body.classList.remove("dark-theme");

		}, UserSettings.dark_theme);
	}
	settings_element.appendChild(settings_menu);
}
document.body.appendChild(settings_element);

const trigger = (e, t, c = null) => e.dispatchEvent(c ?? new Event(t, { bubbles: true }));

const get_distance = (x1, y1, x2, y2) => {
	const dx = x1 - x2;
	const dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
}
const get_pointer_distance = (e1, e2) => get_distance(e1.clientX, e1.clientY, e2.clientX, e2.clientY);

const clear_children = (e) => {
	while (e.firstChild)
		e.removeChild(e.firstChild);
};

const get_cell_checkbox = (c) => document.getElementById(c.getAttribute("for"));
const get_cell_checked = (c) => get_cell_checkbox(c).checked;

const Difficulty = {
	Straightforward: 0,
	Easy: 1,
	Medium: 2,
	Tricky: 3,
};
const DIFFICULTY_STRINGS = ["Straightforward", "Easy", "Medium", "Tricky"];
const get_dif_color = (d) => `var(--bg-connections-${DIFFICULTY_STRINGS[d].toLowerCase()})`;
let BG_COLOR;
const BG_SEL_COLOR = "var(--bg-tile-connections-selected)";
const get_cell_bg_color = (c) => get_cell_checked(c) ? BG_SEL_COLOR : BG_COLOR;
const get_cell_after_toggle_bg_color = (c) => get_cell_checked(c) ? BG_COLOR : BG_SEL_COLOR;
let BG_UNSEL_COLOR;
const get_cell_highlighted = (c) => c.style.backgroundColor != "" && c.style.backgroundColor != BG_COLOR && c.style.backgroundColor != BG_SEL_COLOR && c.style.backgroundColor != BG_UNSEL_COLOR;

let CELL_CONTAINER;
let EMPTY_CELL;

const get_hovered_cell = (e) => {
	const container_dims_cell = Math.sqrt(CELL_CONTAINER.childElementCount);
	const bound = CELL_CONTAINER.getBoundingClientRect();
	const x = e.clientX - bound.x;
	const y = e.clientY - bound.y;
	const cell_width = bound.width / container_dims_cell;
	const cell_height = bound.height / container_dims_cell;

	const i = Math.floor(x / cell_width) + container_dims_cell * Math.floor(y / cell_height);
	return i < 0 || i >= CELL_CONTAINER.childElementCount ? null : CELL_CONTAINER.children[i];
}

let selected_cell;
let selected_cell_bound;
let cell_selection;

const when = (b, v) => b ? v : null;
let last_dif_highlighter = null;
let last_highlighter_dif = null;
const gen_dif_highlighter = (cell, dif) => {
	const highlighter = document.createElement("span");
	{
		highlighter.id = `${cell.getAttribute("for")}-highlighter-${DIFFICULTY_STRINGS[dif].toLowerCase()}`
		highlighter.className = HIGHLIGHTER_CLASS;
		const size = "16px";
		const pad = "4px";
		const color = get_dif_color(dif);
		const is_left = dif % 2 == 0;
		const is_bottom = Math.floor(dif / 2) == 0;
		Object.assign(highlighter.style, {
			backgroundColor: color,
			width: size,
			height: size,
			bottom: when(!is_bottom, pad),
			top: when(is_bottom, pad),
			left: when(is_left, pad),
			right: when(!is_left, pad)
		});
		highlighter.addEventListener("pointerdown", (e) => {
			cell.setAttribute(HIGHLIGHTER_CLASS, highlighter.id);

			e.stopImmediatePropagation();

			const is_color = highlighter.parentElement.style.backgroundColor == color;
			if (is_color)
				cell.classList.remove("highlighted");
			else
				cell.classList.add("highlighted");
			const cell_bg_color = get_cell_bg_color(cell);
			highlighter.style.backgroundColor = is_color ? color : cell_bg_color;
			highlighter.parentElement.style.backgroundColor = is_color ? cell_bg_color : color;
			if (last_dif_highlighter != null && last_dif_highlighter != highlighter)
				last_dif_highlighter.style.backgroundColor = last_highlighter_dif;

			last_dif_highlighter = highlighter;
			last_highlighter_dif = color;
		}, { capture: true });
	}

	return highlighter;
};
const add_dif_highlighter = (c, d) => c.appendChild(gen_dif_highlighter(c, d));
const add_highlighters = (c) => Object.values(Difficulty).forEach((v) => add_dif_highlighter(c, v));

let prev_pointer_move = null;

let last_hovered_cell = null;
let last_hovered_cell_bg = null;
function cell_drag(e) {
	if (selected_cell == null)
		return;

	if (get_pointer_distance(e, cell_selection) < 10)
		return;

	const hovered_cell = get_hovered_cell(e);
	if (hovered_cell != null && hovered_cell != last_hovered_cell && hovered_cell != selected_cell) {
		if (last_hovered_cell != null)
			last_hovered_cell.style.backgroundColor = last_hovered_cell_bg;
		last_hovered_cell = hovered_cell;
		last_hovered_cell_bg = hovered_cell.style.backgroundColor;

		hovered_cell.style.backgroundColor = BG_UNSEL_COLOR;
	}

	if (selected_cell.style.position == "fixed") {
		document.body.appendChild(selected_cell);
		selected_cell.style.top = `${e.clientY - selected_cell_bound.height / 2}px`;
		selected_cell.style.left = `${e.clientX - selected_cell_bound.width / 2}px`;
	} else {
		CELL_CONTAINER.insertBefore(EMPTY_CELL, selected_cell);
		selected_cell.style.position = "fixed";
		selected_cell.style.width = `${selected_cell_bound.width}px`;
		selected_cell.style.height = `${selected_cell_bound.height}px`;
	}
}
function cell_free(e) {
	if (selected_cell == null)
		return;

	selected_cell.style.position = "relative";
	selected_cell.style.width = "";
	selected_cell.style.height = "";
	selected_cell.style.top = "";
	selected_cell.style.left = "";

	const hovered_cell = get_hovered_cell(e);

	if (EMPTY_CELL.parentElement != CELL_CONTAINER)
		return;

	if (hovered_cell == null) {
		CELL_CONTAINER.insertBefore(selected_cell, EMPTY_CELL);
		EMPTY_CELL.remove();
		return;
	}

	CELL_CONTAINER.insertBefore(selected_cell, hovered_cell);
	CELL_CONTAINER.insertBefore(hovered_cell, EMPTY_CELL);
	EMPTY_CELL.remove();

	if (hovered_cell != null)
		hovered_cell.style.backgroundColor = last_hovered_cell_bg;
}

document.addEventListener("pointermove", (e) => {
	cell_drag(e);

	prev_pointer_move = e;
});
document.addEventListener("pointerup", (e) => {
	cell_free(e);

	selected_cell = null;
	cell_selection = null;
	hovered_cell = null;
});

let is_click_check = -1;
const observer = new MutationObserver((mutations) => {
	const cell0 = document.querySelector("[for=\"inner-card-0\"]");
	if (cell0 == null)
		return;

	EMPTY_CELL = cell0.cloneNode();
	clear_children(EMPTY_CELL);
	EMPTY_CELL.style.opacity = "0";

	CELL_CONTAINER = cell0.parentElement;
	{
		if (!UserSettings.highlighter)
			CELL_CONTAINER.classList.add("highlighter-disabled");
	}
	{
		BG_COLOR = window.getComputedStyle(cell0).getPropertyValue("background-color");
		BG_UNSEL_COLOR = window.getComputedStyle(document.querySelector("[data-testid=\"deselect-btn\"]")).getPropertyValue("color");
	}

	for (const cell of CELL_CONTAINER.children) {
		cell.classList.add("word-cell");

		cell.style.touchAction = "none";
		add_highlighters(cell);
		cell.addEventListener("pointerdown", (e) => {
			if (UserSettings.tile_dragging) {
				selected_cell = cell;
				selected_cell_bound = selected_cell.getBoundingClientRect();
				cell_selection = e;
			}

			if (is_click_check != 1) {
				e.stopImmediatePropagation();
				return;
			}
			is_click_check--;

			const cell_bg_color = get_cell_after_toggle_bg_color(cell);
			if (get_cell_highlighted(cell))
				document.getElementById(cell.getAttribute(HIGHLIGHTER_CLASS)).style.backgroundColor = cell_bg_color;
			else
				cell.style.backgroundColor = cell_bg_color;
		});

		cell.addEventListener("click", (e) => {
			if (e.target.classList.contains(HIGHLIGHTER_CLASS)) {
				e.preventDefault();
				return;
			}

			if (is_click_check == 0) {
				is_click_check = -1;
				return;
			}

			is_click_check = 1;
			trigger(cell, "pointerdown");
			trigger(cell, "pointerup");
		})
	}

	const toolbar = document.querySelector("[data-testid=\"toolbar\"]");
	const settings_div = toolbar.lastChild.cloneNode(true);
	{
		const settings_button = settings_div.firstChild;
		settings_button.id = "settings-button";
		settings_button.addEventListener("click", (e) => {
			settings_element.showModal();
		})

		const settings_button_div = settings_button.firstChild;

		const settings_button_svg = settings_button_div.firstChild;
		settings_button_svg.setAttribute("width", "32");
		settings_button_svg.setAttribute("height", "32");
		settings_button_svg.setAttribute("viewBox", "0 0 32 32");
		settings_button_svg.setAttribute("data-testid", "icon-settings");

		const settings_button_path = settings_button_svg.firstChild;
		settings_button_path.setAttribute('d', "M26.8666 17.3372C26.918 16.9086 26.9523 16.4629 26.9523 16C26.9523 15.5371 26.918 15.0914 26.8494 14.6628L29.7466 12.3999C30.0038 12.1942 30.0724 11.8171 29.9181 11.5256L27.1752 6.77693C27.0037 6.46836 26.6437 6.3655 26.3351 6.46836L22.9236 7.83982C22.2036 7.29123 21.4493 6.84551 20.6093 6.50264L20.095 2.86827C20.0436 2.52541 19.7521 2.2854 19.4093 2.2854H13.9234C13.5806 2.2854 13.3063 2.52541 13.2548 2.86827L12.7405 6.50264C11.9005 6.84551 11.1291 7.30838 10.4262 7.83982L7.01469 6.46836C6.70611 6.34835 6.3461 6.46836 6.17467 6.77693L3.43175 11.5256C3.26031 11.8342 3.32889 12.1942 3.60318 12.3999L6.50039 14.6628C6.43182 15.0914 6.38039 15.5543 6.38039 16C6.38039 16.4457 6.41467 16.9086 6.48325 17.3372L3.58603 19.6001C3.32889 19.8058 3.26031 20.183 3.4146 20.4744L6.15752 25.2231C6.32896 25.5317 6.68896 25.6345 6.99754 25.5317L10.4091 24.1602C11.1291 24.7088 11.8834 25.1545 12.7234 25.4974L13.2377 29.1317C13.3063 29.4746 13.5806 29.7146 13.9234 29.7146H19.4093C19.7521 29.7146 20.0436 29.4746 20.0779 29.1317L20.5921 25.4974C21.4322 25.1545 22.2036 24.6916 22.9065 24.1602L26.318 25.5317C26.6266 25.6517 26.9866 25.5317 27.158 25.2231L29.9009 20.4744C30.0724 20.1658 30.0038 19.8058 29.7295 19.6001L26.8666 17.3372V17.3372ZM16.6663 21.143C13.8377 21.143 11.5234 18.8286 11.5234 16C11.5234 13.1714 13.8377 10.857 16.6663 10.857C19.495 10.857 21.8093 13.1714 21.8093 16C21.8093 18.8286 19.495 21.143 16.6663 21.143Z");
	}
	toolbar.appendChild(settings_div);

	observer.disconnect();
});

observer.observe(document, { childList: true, subtree: true });

// Add AI reviewer if interest shows
// Add connections unlimited with # system to choose specific games?
// Add additional settings like seeing how many are wrong
// Make it so that colors for the difficulties in general stay the same despite the negation
// Uses classes in the body to handle light and dark mode