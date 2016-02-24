#pragma strict

// buttonScripts


function startScreen() {
	Application.LoadLevel("StartScreen");
}

function startStory() {
	Application.LoadLevel("BackgroundStory");
}

function levelSelect() {
	Application.LoadLevel("LevelSelectScreen");
}

function characterSelect() {
	Application.LoadLevel("CharacterSelect");
}

function savedScreen() {
	Application.LoadLevel("SaveScreen");
}

function LevelOne() {
	Application.LoadLevel("LevelOne");
}

function LevelTwo() {
	Application.LoadLevel("LevelTwo");
}

function LevelThree() {
	Application.LoadLevel("LevelThree");
}

function quitGame() {
	Application.Quit();
}

function helpWindow() {
	var gui = GameObject.FindGameObjectWithTag("GUI").GetComponent(guiScript);
	gui.help.enabled = !gui.help.enabled;
}