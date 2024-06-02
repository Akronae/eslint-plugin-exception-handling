function c() {
  a();
}
function a() {
  throw new Error("heyyyy!");
}
function b() {
  c();
}
b();

export {};
