#pragma strict

public var saveMsg : GameObject;

function Start() {
	saveMsg = GameObject.FindGameObjectWithTag("savedMsg");
	saveMsg.SetActive(false);
}

function setMsg() {
	yield WaitForSeconds(2);
	saveMsg.SetActive(false);	
}