#pragma strict

public var moveSpeed : float;
private var direction : String = 'right';

function Update () {
	if(direction == 'right') {
		transform.Translate(Vector3.forward * Time.deltaTime * moveSpeed);
	}else {
		transform.Translate(Vector3.back * Time.deltaTime * moveSpeed);
	}
}

function OnTriggerEnter(hit : Collider) {
	if(hit.gameObject.tag == "waypointRight") {
		//Debug.Log('right');
		//transform.Rotate(0, 180, 0);
		direction = 'left';
	}

	if(hit.gameObject.tag == "waypointLeft") {
		//Debug.Log('left');
		//transform.Rotate(0, 180, 0);
		direction = 'right';
	}
}
