import { MyClass } from "./class-err";
import { obj } from "./obj-err";

const myClass = new MyClass();
myClass.getError();
myClass.ok();
myClass.getErrorAsync();
obj.deep[1].a();
obj.deep[1].b();
