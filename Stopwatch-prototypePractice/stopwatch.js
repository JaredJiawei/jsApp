

//practice 1
//- pros: less code because remove methods into object's prototype. 
//- cons: add extra properties that is against the idea of abstraction in OOP(object oriented programming). and this is going to pollute the interface of the object 

function Stopwatch(){
    let startTime, endTime, running, duration = 0;

    Object.defineProperty(this,'duration',{
            get:function(){return duration},
            set:function(value){duration = value;}
});//Pubilc duration property

    //this.duration = duration;//Pubilc duration property 

    Object.defineProperty(this,'startTime',{
            get:function(){return startTime;},
            set:function(value){startTime = value;}
                                                                            });
    Object.defineProperty(this,'endTime',{
            get:function(){return endTime;},
            set:function(value){endTime = value;}
});
    Object.defineProperty(this,'running',{
            get:function(){return running;},
            set:function(value){running = value;}
});
}

//Outside construtor function , add methods to its prototype(parent) object

//undefined properties readable and writable , using get and set in Stopwatch(), otherwise variables out of scope.
Stopwatch.prototype.reset = function(){
    this.startTime=null;
    this.endTime=null;
    this.running=false;
    this.duration=0;
};

Stopwatch.prototype.start = function(){
    if(this.running){throw new Error("Stopwatch has already started.")}
        else{
            this.running = true;
            this.startTime = new Date();
        }
};

Stopwatch.prototype.end = function(){
    if(!this.running){
        throw new Error("Stopwatch has not started");
    }else{
        this.running = false;
        this.endTime = new Date();
        const second = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
        this.duration += second;
    }
};





//practice 2  OOP 

//using method which includes pravite properties (here become private variables)

//- pros: object oriented programming, using abstraction so Private properties
//- cons: more codes if have many instance because each instance will have same code (same methods)

function StopwatchSecond(){
    let startTime, endTime, running, duration = 0;
    //define property (method) which includes pravited variables or called privated properties
    this.reset = function(){ 
        startTime=null;
        endTime=null;
        running=false;
        duration=0;
    };
    //define property (method) which includes pravited variables or called privated properties
    this.start = function(){
        if(running){throw new Error("StopwatchSecond has already started.")}
            else{
                running = true;
                startTime = new Date();
            }
    };
    //define property (method) which includes pravited variables or called privated properties
    this.end = function(){
        if(!running){
            throw new Error("StopwatchSecond has not started");
        }else{
            running = false;
            endTime = new Date();
            const second = (endTime.getTime() - startTime.getTime()) / 1000;
            duration += second;
        }
    };

    //define public properties, read only as using get
    Object.defineProperty(this,'duration',{
            get:function(){return duration},
            //set:function(value){duration = value;}
                                                                            });
}

//Outside construtor function , add methods to its prototype(parent) object

//undefined properties readable and writable , using get and set in Stopwatch(), otherwise variables out of scope.

//Practice for Prototypical Inheritance
function Shape(){
}

Shape.proto