#pragma strict


var healthBar:UI.RawImage;

function Update() {
	var player = GameObject.FindGameObjectWithTag("Player").GetComponent(controller);
	var health = player.getHealth();
	healthBar.transform.localScale.x = health/100;
}