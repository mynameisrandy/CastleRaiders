#pragma strict

private var delay : int = 1;

function Start () {
	GetComponent(UI.Text).enabled = false;
}

public function enable() {
	GetComponent(UI.Text).enabled  = true;
	yield WaitForSeconds(delay);
	GetComponent(UI.Text).enabled = false;
}