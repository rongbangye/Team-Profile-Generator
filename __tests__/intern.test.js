const Intern = require("../lib/Intern");

test("creates Intern object", () => {
  const testValue = "SJC";
  const intern = new Intern("Dave", 12345, "dave@gmail.com", testValue);

  expect(intern.school).toBe(testValue);
});

test("get Intern school with getSchool()", () => {
  const testValue = "SJC";
  const intern = new Intern("Dave", 12345, "dave@gmail.com", testValue);

  expect(intern.getSchool()).toBe(testValue);
});

test("get Intern school with getSchool()", () => {
  const intern = new Intern("Dave", 12345, "dave@gmail.com", "SJC");

  expect(intern.getRole()).toBe("Intern");
});
