#pragma strict

private var attack : boolean = false;
public var strength : int = 10;

function Update () {
	//Debug.Log('working');

	if(Input.GetKey('a')) {
		attack = true;
	}


}

function OnCollisionEnter(other : Collision) { 

	if(attack && other.transform.tag == 'Enemy') {
		Debug.Log('enemy hit');
		var enemy = other.gameObject;
		enemy.GetComponent.<AudioSource>().Play();
        enemy.GetComponent(WayPoint).looseHealth(strength);
        attack = false;
    }

}