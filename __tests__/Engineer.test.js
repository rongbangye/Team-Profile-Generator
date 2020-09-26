const Engineer = require("../lib/Engineer");

test("creates Engineer object", () => {
  const testValue = "rongbangye";
  const enginner = new Engineer("Dave", 12345, "dave@gmail.com", testValue);

  expect(enginner.github).toBe(testValue);
});

test("get Engineer's github with getGithub()", () => {
  const testValue = "rongbangye";
  const enginner = new Engineer("Dave", 12345, "dave@gmail.com", testValue);

  expect(enginner.getGithub()).toBe(testValue);
});

test("get Engineer's role with getRole()", () => {
  const testValue = "Engineer";
  const enginner = new Engineer("Dave", 12345, "dave@gmail.com", "rongbangye");

  expect(enginner.getRole()).toBe(testValue);
});
