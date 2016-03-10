#pragma strict

public var target : GameObject;
private var relativePosition : Vector3;
 
function Start() {


    relativePosition = target.transform.position - transform.position;
}
 
function Update () {
    transform.position = target.transform.position - relativePosition;
}