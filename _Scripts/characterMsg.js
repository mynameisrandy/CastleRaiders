#pragma strict


function Start () {
	GetComponent(UI.Text).enabled = false;
}

public function enable() {
	GetComponent(UI.Text).enabled  = true;
}

public function disable() {
	GetComponent(UI.Text).enabled  = false;
}