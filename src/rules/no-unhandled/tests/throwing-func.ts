export function throwingFunc() {
  try {
    throw new Error("heyyyy!");
  } catch (e) {
    console.error(e);
  }

  throw new Error("heyyyy!");
}
