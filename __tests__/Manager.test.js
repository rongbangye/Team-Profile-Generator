const Manager = require("../lib/Manager");

test("creates Manager object", () => {
  const testValue = 200;
  const manager = new Manager("Dave", 1, "dave@gmail.com", testValue);

  expect(manager.officeNumber).toBe(testValue);
});

test("get role with getManager()", () => {
  const testValue = 200;
  const manager = new Manager("Dave", 1, "dave@gmail.com", testValue);

  expect(manager.getOfficeNumber()).toBe(testValue);
});

test("get role with getManager()", () => {
  const testValue = "Manager";
  const manager = new Manager("Dave", 1, "dave@gmail.com", 200);

  expect(manager.getRole()).toBe(testValue);
});
