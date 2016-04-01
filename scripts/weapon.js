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
        enemy.GetComponent(enemies).looseHealth(strength);
        attack = false;
    }
    
    //look man, im attacking the light,,, nothing consoles out...
    //i cant even get that.!...
    //on the chandelier, the tag is light, it has a box collider with a rigid body.
    //nothing happens on trigger. 
    if(attack && other.transform.tag == 'light'){
		Debug.Log('Light was Hit');
		//transform.eulerAngles = Vector3(200, 0, 0);
	}

}