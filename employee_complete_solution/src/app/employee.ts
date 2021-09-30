export class Employee {

    private EmpID :any; 
	private EmpName: any; 
    private DOB: any ;
    Employee(EmpID: number,EmpName:string,dob:any)
    {
        this.EmpID=EmpID;
        this.EmpName=EmpName;
        this.DOB=dob;
    }
    getName(): string {
        return `${this.EmpName}`;
      }
}