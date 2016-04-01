#pragma strict

public var moveSpeed : float;
private var direction : String = 'up';

function Update () {
	if(direction == 'up') {
		transform.Translate(Vector3.up * Time.deltaTime * moveSpeed);
	}else {
		transform.Translate(Vector3.down * Time.deltaTime * moveSpeed);
	}
}

function OnTriggerEnter(hit : Collider) {
	if(hit.gameObject.tag == "waypointUp") {
		//Debug.Log('up');
		//transform.Rotate(0, 180, 0);
		direction = 'down';
	}

	if(hit.gameObject.tag == "waypointDown") {
		//Debug.Log('down');
		//transform.Rotate(0, 180, 0);
		direction = 'up';
	}
}