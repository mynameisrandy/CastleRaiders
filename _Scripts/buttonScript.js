#pragma strict

// buttonScripts


function startScreen() {
	Application.LoadLevel("StartScreen");
}

function startStory() {
	Application.LoadLevel("BackgroundStory");
}

/*function levelSelect() {
	Application.LoadLevel("LevelSelectScreen");
}*/

function characterSelect() {
	Application.LoadLevel("CharacterSelect");
}

function savedScreen() {
	Application.LoadLevel("SaveScreen");
}

/*function LevelOne() {
	Application.LoadLevel("Level1");
}

function LevelTwo() {
	Application.LoadLevel("LevelTwo");
}

function LevelThree() {
	Application.LoadLevel("Level3");
}*/

function controls() {
	Application.LoadLevel("InstructionScreen");
}

function quitGame() {
	Application.Quit();
}

function helpWindow() {
	var gui = GameObject.FindGameObjectWithTag("GUI").GetComponent(guiScript);
	gui.help.enabled = !gui.help.enabled;
}

function characterSelection(character : String) {
	PlayerPrefs.SetString("characterSelection", character);
	//Debug.Log(character);
	Application.LoadLevel("LevelSelectScreen");
}

function levelSelection(level : String) {
	//PlayerPrefs.SetString("levelSelection", level);
	Debug.Log(level);
	Application.LoadLevel(level);
}
