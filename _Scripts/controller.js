#pragma strict

public var speed : int = 3.0;
public var jump : int = 4;
private var canjump = true;
private var anim;
private var hit : RaycastHit;

function Start () {
}

function Update () {
	if(Input.GetKey('right')) {
		transform.Translate(Vector3.forward * speed * Time.deltaTime);
	}

	if(Input.GetKey('left')) {
		transform.Translate(Vector3.back * speed * Time.deltaTime);
	}

    if(Input.GetKeyDown('space') && canjump) {
           this.GetComponent.<Rigidbody>().velocity.y = jump;
           canjump = false;
      }
      
      /*var fwd = transform.TransformDirection(Vector3.forward);

      if(Physics.Raycast(transform.position, fwd, hit, 2) && hit.collider.gameObject.CompareTag("test")) {
		Debug.Log("spacedoor");
	}

	//Draw ray works different, requres direction and length in one variable.
	var forward : Vector3 = transform.TransformDirection(Vector3.forward) * 5;
	Debug.DrawRay(transform.position, forward, Color.red);*/
}

function OnCollisionEnter(other : Collision) {
      
      if(other.transform.tag == 'Ground') {
      	canjump = true;
      }
 }
