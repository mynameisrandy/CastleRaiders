#pragma strict


var healthBar:UI.RawImage;
// var coinField:UI.Text;

function Update() {
	// Health Bar
	var player = GameObject.FindGameObjectWithTag("Player").GetComponent(controller);
	var health = player.getHealth();
	healthBar.transform.localScale.x = health/100;

	// Coin
	// var coinValue : String = player.coins.ToString();
	// coinField.text = "Coins:" + coinValue;
}