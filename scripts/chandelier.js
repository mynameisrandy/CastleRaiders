#pragma strict

//here im gibing the chandelier a damage value.
//so IF i did get a console , and DID go further,,, atleast there would be this to work with after,
//so when the chandelier would fall. kill enemy...

public var damage: int = 50;
public var enemyHealth: int = 50;
public var attack = false;
public var canrun = true;
public var dieAnimName : String;

function OnCollisionEnter(other : Collision) {
	if(other.transform.tag == 'Enemy'){
		enemyHealth = 0;
		enemyDie();
	}
}

function enemyDie() {
    canrun = false;
    attack = false;
    GetComponent.<Animation>().Play(dieAnimName);
    yield WaitForSeconds(2);
    Destroy(gameObject);
}