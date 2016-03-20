#pragma strict

var healthBar:UI.RawImage;
var coinField : GameObject;
var help:UI.RawImage;
var menu : GameObject;
var timerField : GameObject;
var timer : int;


function Start() {
	help.enabled = false;
	menu.SetActive(false);
	timer = 0;
	InvokeRepeating("startTimer", 0, 1);
}

function Update() {
	// Health Bar
	var player = GameObject.FindGameObjectWithTag("Player").GetComponent(controller);
	var health = player.getHealth();
	healthBar.transform.localScale.x = health/100;
	// healthBar.transform.localPosition.x = (0) + (100 - health);

	// Coin
	var coinValue : String = player.coins.ToString();
	//Debug.Log(coinValue);
	coinField = gameObject.FindGameObjectWithTag('pointsTxt');
	coinField.GetComponent(UI.Text).text = "Points: " + coinValue;
	//Debug.Log(coinField);
	
}

function startTimer() {
	timer++;
	var timerValue : String = timer.ToString();
	timerField = gameObject.FindGameObjectWithTag('timerTxt');
	timerField.GetComponent(UI.Text).text = "Timer: " + timerValue;
}