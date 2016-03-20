#pragma strict
// buttonScripts

private var toggleQuit : boolean = false;

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

function resetGame() {
	PlayerPrefs.DeleteAll();
	startScreen();
}


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

function quitWindow() {
	var gui = GameObject.FindGameObjectWithTag("GUI").GetComponent(guiScript);
	if(toggleQuit) {
		gui.menu.SetActive(false);
		toggleQuit = false;
	}else {
		gui.menu.SetActive(true);
		toggleQuit = true;
	}
}

function characterSelection(character : String) {
	PlayerPrefs.SetString("characterSelection", character);
	//Debug.Log(character);
	Application.LoadLevel("LevelSelectScreen");
}

function levelSelection(level : String) {
	PlayerPrefs.SetString("game", "true");
	PlayerPrefs.SetString("levelSelection", level);
	Debug.Log(level);
	Application.LoadLevel(level);
}

function loadGame() {
	var checkSaved = PlayerPrefs.GetString("game");
	if(checkSaved == "true") {
		var levelSelection = PlayerPrefs.GetString("levelSelection");
		Application.LoadLevel(levelSelection);
	}else {
		var start = GameObject.Find("SceneManager").GetComponent(startScript);
		start.saveMsg.SetActive(true);
		start.setMsg();
	}
}
