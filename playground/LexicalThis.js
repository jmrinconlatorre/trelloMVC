function Persona(){
    this.edad=0;
    let self = this;
    setInterval(function crece(){
        self.edad++;
    },1000)
}

const Ivan = new Persona();