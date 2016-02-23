#pragma strict


var healthBar:UI.RawImage;
var coinField:UI.Text;
var help:UI.RawImage;


function Awake() {
	help.enabled = false;
}

function Update() {
	// Health Bar
	var player = GameObject.FindGameObjectWithTag("Player").GetComponent(controller);
	var health = player.getHealth();
	healthBar.transform.localScale.x = health/100;
	// healthBar.transform.localPosition.x = (0) + (100 - health);

	// Coin
	var coinValue : String = player.coins.ToString();
	coinField.text = "Points:" + coinValue;
}