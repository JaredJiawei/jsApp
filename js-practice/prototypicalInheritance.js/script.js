function HtmlElement(color){
    this.color = color;
    this.click = function(){
        console.log("Clicked");
    }
}

HtmlElement.prototype.focus = function(){
    console.log("Focused");
}

function HtmlSelectElement(items = [],color){
    //HtmlElement.call(this,color),
    this.items = items,
    this.addItem = function(item){
        this.items.push(item);
    },
    this.removeItem = function(index){
        this.items.splice(index,1);
    },
    this.render = function(){
        return `
        <select>${this.items.map(item =>`
            <option>${item}</option>`).join('')}
        </select>`;
    }

}

//Create an object that has specific prototype
HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement; 


function HtmlImgElement(src){
    this.src = src;   
    this.render = function(){
        return `<img src="${this.src}" />`
    }
}

HtmlImgElement.prototype = new HtmlElement();
HtmlImgElement.prototype.constructor = HtmlImgElement;


const elements = [
    new HtmlSelectElement([1,2,3]),
    new HtmlImgElement('http://')
];

for(let element of elements)
    console.log(element.render());