#pragma strict

// import UnityEngine.UI;

var healthField : GameObject; // Health Text
var healthBar:UI.RawImage; 
// var slider : UI.Slider;
var coinField : GameObject;
var help: GameObject; 
var menu : GameObject;
var timerField : GameObject;
var timer : int;
var coinTotal : int;
private var toggle : boolean = false;

function Start() {
	help.SetActive(false);
	menu.SetActive(false);
	timer = 0;
	InvokeRepeating("startTimer", 0, 1);
}

function Update() {
	// Health Bar
	var player = GameObject.FindGameObjectWithTag("Player").GetComponent(controller);
	var health = player.getHealth();

	// Health Text 
	var healthValue : String = player.health.ToString();
	healthField = gameObject.FindGameObjectWithTag('healthTxt');
	healthField.GetComponent(UI.Text).text = "Health: " + healthValue + "/100";
	// Debug.Log(healthValue);
	
	// Health Bar
	healthBar.transform.localScale.x = health/100;
	healthBar.transform.localPosition.x = (-142) + (100 - health);
	// slider.transform.localScale.x = health/100;
	// slider.transform.localPosition.x = (-850) + (health - 100);


	// Coin
	var coinValue : String = player.coins.ToString();
	//Debug.Log(coinValue);
	coinField = gameObject.FindGameObjectWithTag('pointsTxt');
	coinField.GetComponent(UI.Text).text = "Points: " + coinValue;
	//Debug.Log(coinField);
	coinTotal = player.coins;

	if(Input.GetAxis('Vertical')) {
		transform.Translate(Vector3.forward * Time.deltaTime);
	}

	if(Input.GetButtonUp('Help')){
		Debug.Log('help key');
		helpWindow();
	}

	if(Input.GetButtonUp('Quit')){
		Debug.Log('quit key');
		quitWindow();
	}

}

function startTimer() {
	timer++;
	var timerValue : String = timer.ToString();
	timerField = gameObject.FindGameObjectWithTag('timerTxt');
	timerField.GetComponent(UI.Text).text = "Timer: " + timerValue;
}

function addPoints() {
	var timerTotal = timer;
	var points = coinTotal * timerTotal;
	PlayerPrefs.SetInt("lvlPoints",points);

}

function helpWindow() {
	//Debug.Log('help');
	var gui = GameObject.FindGameObjectWithTag("GUI").GetComponent(guiScript);

	if(toggle){
		Time.timeScale = 1;
		gui.help.SetActive(false);
		toggle = false;
	}else {
		Time.timeScale = 0;
		gui.help.SetActive(true);
		toggle = true;
	}
}

function quitWindow() {
	var gui = GameObject.FindGameObjectWithTag("GUI").GetComponent(guiScript);
	if(toggle) {
		Time.timeScale = 1;
		gui.menu.SetActive(false);
		toggle = false;
	}else {
		Time.timeScale = 0;
		gui.menu.SetActive(true);
		toggle = true;
	}
}

function toggleFix() {
	Time.timeScale = 1;
}