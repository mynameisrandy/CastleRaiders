#pragma strict

//var waypoint : Transform[]; //empty array of transforms will hold all of our waypoints
public var enemySpeed : float = 1;
//private var currentWaypoint : int;
public var moveAnimName : String;
//public var idleAnimName : String;
public var attackAnimName : String;
public var dieAnimName : String;
public var attack = false;
public var canrun = true;
//public var motion = true;
//private var idle = true;
public var hit : RaycastHit;
public var enemyHealth : int = 30;
public var enemyStrength : int = 5;

function Update() {
    /*if(currentWaypoint < waypoint.length) {s
        var target : Vector3 = waypoint[currentWaypoint].position; //holds position of current waypoint
        var moveDirection : Vector3 = target - transform.position; //target is current waypoint pos - enemy pos
        var velocity = moveDirection.normalized * enemySpeed;
        var rotation = Quaternion.LookRotation(moveDirection);
        transform.rotation = rotation;

        if(moveDirection.magnitude < 1) {
            currentWaypoint++;
            GetComponent.<Animation>().Play(moveAnimName);
        }
    }else{
        currentWaypoint = 0;//play with this and others to make it NOT TRIANGLE search
    }
    
    if(enemySpeed == 0){
    GetComponent.<Animation>().Play(idleAnimName);
    }
    
    GetComponent.<Rigidbody>().velocity = velocity;*/

    if(attack) {
        transform.Translate(Vector3.forward * 0 * 0);
        enemyAttack();
    }else if(canrun) {
        GetComponent.<Animation>().Play(moveAnimName);
        transform.Translate(Vector3.forward * enemySpeed * Time.deltaTime);
    }

    if(Physics.Raycast(transform.position + Vector3(0, 1, 0), transform.forward, hit, 3) || Physics.Raycast(transform.position + Vector3(0, 1, 0), transform.forward * -1, hit, 3)) {
        var player = GameObject.FindGameObjectWithTag("Player");
        //Debug.Log(player.transform.position.x);

        if(hit.collider.tag == "Player") {
            Debug.Log('Detected player');
            if(transform.position.x < player.transform.position.x) {
                transform.eulerAngles = Vector3(0, 90, 0);
            }else {
                transform.eulerAngles = Vector3(0, 270, 0);
            }

            canrun = false;
            attack = true;
        }else {
            attack = false;
            canrun = true;
        }

        //Debug.Log(transform.position.x);
        //Debug.DrawRay(transform.position + Vector3(0, 1, 0), transform.forward * 3, Color.green);
        //Debug.DrawRay(transform.position + Vector3(0, 1, 0), transform.forward * -3, Color.green);
    }

    if(enemyHealth <= 0) {
        enemyHealth = 0;
        enemyDie();
    }
}

function looseHealth(strength : int) {
    enemyHealth -= strength;
    Debug.Log('loose');
}

function enemyAttack() {
    //motion = false;
    GetComponent.<Animation>().Play(attackAnimName);
    yield WaitForSeconds(2);
    //motion = true;
}

function enemyDie() {
    canrun = false;
    attack = false;
    GetComponent.<Animation>().Play(dieAnimName);
    yield WaitForSeconds(2);
    Destroy(gameObject);
}

function OnCollisionEnter(other : Collision) { 
    
    if(other.transform.tag == 'waypointRight') {
        transform.eulerAngles = Vector3(0, 270, 0);
    }

    if(other.transform.tag == 'waypointLeft') {
        transform.eulerAngles = Vector3(0, 90, 0);
    }

    if(other.transform.tag == 'Player') {
        //Debug.Log('hit');
        var player = GameObject.FindGameObjectWithTag("Player");
        var playerScript = player.GetComponent(controller);
        var playerHealth = playerScript.getHealth();
        if(playerHealth > 0) {
            playerScript.reduceHealth(enemyStrength);
        }
    }
}