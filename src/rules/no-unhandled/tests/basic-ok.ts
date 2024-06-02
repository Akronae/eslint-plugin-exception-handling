const x = 5;
let y = "abc123";
function myFunction() {}
myFunction();
const myErr = new Error();
throw new Error("heyyyy!");
function c() {
  a();
}
function a() {
  throw new Error("heyyyy!");
}
function b() {
  c();
}

try {
  b();
} catch (e) {
  console.error(e);
}

function d() {
  a();
}
function e() {
  throw new Error("heyyyy!");
}
function f() {
  try {
    c();
  } catch (e) {
    console.error(e);
  }
}
function g() {
  d();
}

f();

try {
  e();
} catch (e) {
  console.error(e);
}

export {};
