const pairs = new Map<string, number>([
  ["foo", 1],
  ["bar", 2],
]);

Array.from(pairs.entries())
  .filter(([, count]) => count > 1)
  .forEach(([identifier]) => {
    console.log(identifier);
  });
