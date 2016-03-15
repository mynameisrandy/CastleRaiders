#pragma strict

public var character : String;
private var title : GameObject;

function OnMouseDown() {
	//Debug.Log(character);
	var characterClick = GameObject.Find("SceneManager").GetComponent(buttonScript);
	characterClick.characterSelection(character);
}

function OnMouseEnter() {
	//Debug.Log(character);
	title = gameObject.Find(character+"Title");
	title.GetComponent(characterMsg).enable();
}

function OnMouseExit() {
	//Debug.Log(character);
	//var title = gameObject.Find(character+"Title").GetComponent(characterMsg);
	title.GetComponent(characterMsg).disable();
}
