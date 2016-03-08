#pragma strict

public var speed : int = 4.0;
public var jumpheight : int = 6;
public var gravity : int = 15;
public var airTime : int = 10;
public var moveAnimName : String;
public var idleAnimName : String;
public var attackAnimName : String;
public var jumpAnimName : String;
public var dieAnimName : String;
public var life : int = 2;
public var health : float = 95;
//public var strength : int = 10;
private var canjump = true;
private var canrun = true;
private var attack = false;
private var idle = true;
private var jumpAmount : int = 0;
private var checkpoint : GameObject;
public var coins : int = 0;
//private var camera : GameObject;
//private var speedPot : int = 8.0;

function reduceHealth(enemyHit : int) {
	health -= enemyHit;
	if(health <= 0) {
		die();
	}
	//Debug.Log('loose');
}

// Health GUI
function getHealth() {
	return health;
}

/*function Update() {
	// Player dies, Game over
	if (life < 0) {
		Application.LoadLevel("LoseScreen");
	}
}*/

function Start () {
	//anim = GetComponent.<Animation>();
	GetComponent.<Rigidbody>().useGravity = false;
	checkpoint = GameObject.Find("checkpoint");
	var contParent = transform.parent;
	
	//USE TO CLEAR OUT PLAYER PREFS
	//Debug.Log(contParent);
	//PlayerPrefs.DeleteKey("lives");
	//PlayerPrefs.DeleteKey("checkpointPos");

	//Check for checkpoint saved
	if(PlayerPrefs.HasKey('checkpointPos')) {
		if(PlayerPrefs.GetString("checkpointPos") == 'true') {
			contParent.transform.parent = checkpoint.transform;
			contParent.transform.localPosition = new Vector3(0,0,0);
		}
	}

	//Check for set lives
	if(PlayerPrefs.HasKey("lives")){
		life = PlayerPrefs.GetInt("lives");
		var lifeStr1 = life.ToString();
		GameObject.FindGameObjectWithTag("lifeCount").GetComponent(UI.Text).text = lifeStr1;
	}
}

function FixedUpdate () {
	GetComponent.<Rigidbody>().AddForce(new Vector3(0, -gravity*GetComponent.<Rigidbody>().mass, 0));
	
	//CHECK LIFE/HEALTH COUNT
	if(life < 1) {
		GameObject.FindGameObjectWithTag("Life_UI").GetComponent(UI.RawImage).texture = Resources.Load("unpickup3", typeof(Texture)) as Texture;
	}else {
		GameObject.FindGameObjectWithTag("Life_UI").GetComponent(UI.RawImage).texture = Resources.Load("pickup4", typeof(Texture)) as Texture;
	}

	//MOVE RIGHT
	if(Input.GetKey('right')) {
		transform.Translate(Vector3.forward * speed * Time.deltaTime);
		transform.eulerAngles = Vector3(0, 90, 0);

		if(canrun) {
			GetComponent.<Animation>().Play(moveAnimName);
		}

		if(Input.GetKey('space') && canjump) {
			jumpAnim();
		}

		/*if(Input.GetKey('down')) {
			crouchAnim();
		}*/

	//MOVE LEFT
	}else if(Input.GetKey('left')) {
		transform.eulerAngles = Vector3(0, 270, 0);
		transform.Translate(Vector3.forward * speed * Time.deltaTime);

		if(canrun) {
			GetComponent.<Animation>().Play(moveAnimName);
		}

		if(Input.GetKey('space') && canjump) {
			jumpAnim();
		}

	//JUMP
	}else if(Input.GetKey('space') && canjump) {
        jumpAnim();

    //ATTACK
    }else if(Input.GetKey('a')) {
    	attackAnim();

    //IDLE
    }else if(idle) {
    	GetComponent.<Animation>().Play(idleAnimName);
    }

     /*var fwd = transform.TransformDirection(Vector3.forward);

      if(Physics.Raycast(transform.position, fwd, hit, 2) && hit.collider.gameObject.CompareTag("test")) {
		Debug.Log("spacedoor");
	}

	//Draw ray works different, requres direction and length in one variable.
	var forward : Vector3 = transform.TransformDirection(Vector3.forward) * 5;
	Debug.DrawRay(transform.position, forward, Color.red);*/
}


/*function crouchAnim() {
	idle = false;
	GetComponent.<Animation>().Play('MM_Sneaking');
	idle = true;
}*/ 


//ATTACK ANIMATION
function attackAnim() {
	idle = false;
	GetComponent.<Animation>().Play(attackAnimName);
	yield WaitForSeconds(1.25);
	idle = true;
} 

//JUMP ANIMATION
function jumpAnim() {
	if(jumpAmount <= airTime) {
		jumpAmount++;
		canrun = false;
		idle = false;
		GetComponent.<Animation>().Play(jumpAnimName);
		this.GetComponent.<Rigidbody>().velocity.y = jumpheight;
		//this.GetComponent.<Rigidbody>().velocity.x = jumpwidth;
		yield WaitForSeconds(0.85);
		idle = true;
		canrun = true;
	}else {
		canjump = false;
		//jumpAmount = 0;
	}
}

//DIE ANIMATION / FUNCTION
function die() {
	canjump = false;
	canrun = false;
	idle = false;
	life --;
	saveLifeCount(life);
	GetComponent.<Animation>().Play(dieAnimName);
	yield WaitForSeconds(2);
	
	if (life < 0) {
		Application.LoadLevel("LoseScreen");
	}else {
		Application.LoadLevel(Application.loadedLevelName);
	}
}

function saveLifeCount(lifeNumber : int){
	PlayerPrefs.SetInt("lives", lifeNumber);
}

function savePosition(whatPosition : String){
	PlayerPrefs.SetString("checkpointPos", whatPosition);
}

function pickupAudio() {
	var potionAudio = GameObject.Find('PotionSounds');
	potionAudio.GetComponent.<AudioSource>().Play();
}


function OnCollisionEnter(other : Collision) { 
	
	//DETECT GROUND
    if(other.transform.tag == 'Ground') {
      	canjump = true;
      	jumpAmount = 0;
    }

    //ITEM PICKUPS
    if(other.transform.tag == "health") {
    	pickupAudio();
    	health += 5;
    	if (health > 100) {
    		health = 100;
    	}
    	// Debug.Log(health);
    	Destroy(other.gameObject);
    	// Player Pick up Health 
    	// GameObject.FindGameObjectWithTag("health_ui").GetComponent(UI.RawImage).texture = Resources.Load("pickup1", typeof(Texture)) as Texture;
	}

	if(other.transform.tag == "strength") {
		pickupAudio();
		other.gameObject.SetActive(false);
		GameObject.FindGameObjectWithTag("Strength_UI").GetComponent(UI.RawImage).texture = Resources.Load("pickup1", typeof(Texture)) as Texture;
		
		var playerWeapon = GameObject.FindGameObjectWithTag("playerWeapon").GetComponent(weapon);
        playerWeapon.strength += 10;

		//strength = 15;
		yield WaitForSeconds(6);
		playerWeapon.strength -= 10;
		GameObject.FindGameObjectWithTag("Strength_UI").GetComponent(UI.RawImage).texture = Resources.Load("unpickup2", typeof(Texture)) as Texture;
		Destroy(other.gameObject);
	}
	
	if(other.transform.tag == "speed") {
		pickupAudio();
		other.gameObject.SetActive(false);
		GameObject.FindGameObjectWithTag("Speed_UI").GetComponent(UI.RawImage).texture = Resources.Load("pickup2", typeof(Texture)) as Texture;
		speed = 6;
		yield WaitForSeconds(4);
		speed = 4;
		GameObject.FindGameObjectWithTag("Speed_UI").GetComponent(UI.RawImage).texture = Resources.Load("unpickup2", typeof(Texture)) as Texture;
		Destroy(other.gameObject);
		//transform.Translate(Vector3.forward * speedPot * Time.deltaTime);
		//GetComponent.<Animation>().Play(moveAnimName);
	}

	if(other.transform.tag == "life") {
		pickupAudio();
		life ++;
		saveLifeCount(life);
		var lifeStr = life.ToString();
		GameObject.FindGameObjectWithTag("lifeCount").GetComponent(UI.Text).text = lifeStr;
		Destroy(other.gameObject);
	}//END ITEM PICKUPS

	if(other.transform.tag == "coins") {
		coins += 5;
		//Debug.Log('I got coins');
		Destroy(other.gameObject);
	}


	//MOVE WITH PLATFORM
	if(other.transform.tag == "platform"){
		//Debug.Log('collider');
		transform.parent = other.transform;
	}

	//SPIKES - DYING ANIMATION
	if(other.transform.tag == "spikes"){
		//Debug.Log('uh oh');
		health = 0;
		die();
	}

	if(other.transform.tag == "checkpoint") {
		//Debug.Log('checkpoint');
		//checkpoint = other.gameObject;
		//Debug.Log(checkpoint)
		savePosition('true');
		var checkScript = gameObject.FindGameObjectWithTag("lid").GetComponent(openLid);
		checkScript.open();
		//transform.parent = checkpoint.transform;
		//transform.localPosition = new Vector3(0,0,0);
	}

	if(other.transform.tag == "endpoint") {
		//Debug.Log('endpoint');
		PlayerPrefs.DeleteKey("checkpointPos");		
		var checkDoor : GameObject[] = gameObject.FindGameObjectsWithTag("door");
		var rotateNumber : int = 90;
		for(var i : int = 0; i<checkDoor.Length; i++) {
			checkDoor[i].GetComponent(openLid).openDoor(rotateNumber);
			rotateNumber = rotateNumber*3;
		}
		Destroy(other.gameObject);
	}

	//TUTORIAL MSGS
	if(other.transform.tag == "msg1") {
		//Debug.Log('msg');
		var textScript = gameObject.FindGameObjectWithTag("welcomeMsg").GetComponent(tutorialMsg);
			textScript.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg2") {
		//Debug.Log('msg');
		var jumpScript = gameObject.FindGameObjectWithTag("jumpMsg").GetComponent(tutorialMsg);
			jumpScript.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg3") {
		//Debug.Log('msg');
		var djumpScript = gameObject.FindGameObjectWithTag("djumpMsg").GetComponent(tutorialMsg);
			djumpScript.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg4") {
		//Debug.Log('msg');
		var healthScript = gameObject.FindGameObjectWithTag("healthMsg").GetComponent(tutorialMsg);
			healthScript.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg5") {
		//Debug.Log('msg');
		var enemyScript = gameObject.FindGameObjectWithTag("enemyMsg").GetComponent(tutorialMsg);
			enemyScript.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg6") {
		//Debug.Log('msg');
		var speedScript = gameObject.FindGameObjectWithTag("speedMsg").GetComponent(tutorialMsg);
			speedScript.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg7") {
		//Debug.Log('msg');
		var strengthScript = gameObject.FindGameObjectWithTag("strengthMsg").GetComponent(tutorialMsg);
			strengthScript.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg8") {
		//Debug.Log('msg');
		var lifeMsg = gameObject.FindGameObjectWithTag("lifeMsg").GetComponent(tutorialMsg);
			lifeMsg.enable();
			Destroy(other.gameObject);
	}

	if(other.transform.tag == "msg9") {
		//Debug.Log('msg');
		var coinMsg = gameObject.FindGameObjectWithTag("coinMsg").GetComponent(tutorialMsg);
			coinMsg.enable();
			Destroy(other.gameObject);
	}//END TUTORIAL MSGS

	/*if(other.transform.tag == 'Enemy') {
		Debug.Log('enemy hit');
		var enemy = GameObject.FindGameObjectWithTag("Enemy").GetComponent(WayPoint);
        enemy.looseHealth();
    }*/

 }

function OnCollisionExit(other : Collision){

	//STOP MOVING WITH PLATFORM
    if(other.transform.tag == "platform"){
    	//Debug.Log('bye');
        transform.parent = null;
    }
}
