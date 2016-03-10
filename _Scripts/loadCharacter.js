#pragma strict

private var wizard : GameObject;
private var knight : GameObject;
private var warrior : GameObject;

function Awake () {
wizard = gameObject.Find("wizard");
knight = gameObject.Find("knight");
warrior = gameObject.Find("warrior");

wizard.SetActive(false);
knight.SetActive(false);
warrior.SetActive(false);

//var characterSelection = PlayerPrefs.GetString("characterSelection");
//var character = gameObject.Find(characterSelection);

loadCharacter();

}

function loadCharacter() {

	var characterSelection = PlayerPrefs.GetString("characterSelection");
	Debug.Log(characterSelection);

	if(characterSelection == "wizard") {
		wizard.SetActive(true);
	}else if(characterSelection == "knight") {
		knight.SetActive(true);
	}else {
		warrior.SetActive(true);
	}

	var character = gameObject.Find(characterSelection);

	var camera = gameObject.FindGameObjectWithTag('MainCamera');
	camera.GetComponent(cameraFollow).target = character;

}