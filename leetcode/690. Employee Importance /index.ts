/**
 * Definition for Employee.
 * class Employee {
 *     id: number
 *     importance: number
 *     subordinates: number
 *     constructor(id: number, importance: number, subordinates: number[]) {
 *         this.id = (id === undefined) ? 0 : id;
 *         this.importance = (importance === undefined) ? 0 : importance;
 *         this.subordinates = (subordinates === undefined) ? [] : subordinates;
 *     }
 * }
 */

export function getImportance(employees: Employee[], id: number): number {
  let importance = 0
  let subordinates = []
  const sortedEmployees = employees.sort((a, b) => (a.id - b.id < 0 ? -1 : 1))
  for (let i = 0; i < sortedEmployees.length; i++) {
    // 当前员工
    if (sortedEmployees[i].id === id) {
      importance += sortedEmployees[i].importance
      subordinates = sortedEmployees[i].subordinates
    }

    if (subordinates.indexOf(sortedEmployees[i].id) > -1) {
      importance += sortedEmployees[i].importance
      subordinates.push(...sortedEmployees[i].subordinates)
    }
  }

  return importance
}
