class Animal {
  public name = "Dog";
  protected age = 5;
  private secret = "hidden";

  show() {
    console.log(this.name);   // ✅
    console.log(this.age);    // ✅
    console.log(this.secret); // ✅
  }
}

class Dog extends Animal {
  test() {
    console.log(this.name);   // ✅
    console.log(this.age);    // ✅
    // console.log(this.secret); 
  }
}

const d = new Dog();

console.log(d.name); // ✅
console.log(d.age);  // ❌