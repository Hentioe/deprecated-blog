class Preload {
  constructor(select){
    this.elem = document.querySelector(select);
  }

  play(){
    this.elem.style.visibility = "visible";
  }

  display(){
    this.elem.style.visibility = "hidden";
  }
}

export default Preload;
