const Employee = require("../lib/Employee");

test("Creates an Employee object", () => {
  const employee = new Employee("Dave", 12345, "dave@gmail.com");

  expect(employee.name).toBe("Dave");
  expect(employee.id).toBe(12345);
  expect(employee.email).toBe("dave@gmail.com");
});

test("Get Name of the Employee with getName", () => {
  const testValue = "Dave";
  const employee = new Employee(testValue);

  expect(employee.getName()).toBe(testValue);
});

test("Get ID of the Employee with getId", () => {
  const testValue = 12345;
  const employee = new Employee("Dave", testValue);

  expect(employee.getId()).toBe(testValue);
});

test("Get Email of the Employee with getEmail", () => {
  const testValue = "dave@gmail.com";
  const employee = new Employee("Dave", 12345, testValue);

  expect(employee.getEmail()).toBe(testValue);
});

test("Get Role with getRole()", () => {
  const testValue = "Employee";
  const employee = new Employee("Dave", 12345, "dave@gmail.com");
  expect(employee.getRole()).toBe(testValue);
});
