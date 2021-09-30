export class State {
  private state_id: any;
  private state_name: any;

  State(state_id: number, state_name: string) {
    this.state_id = state_id;
    this.state_name = state_name;
  }

  getStateName(): string {
    return `${this.state_name}`;
  }
}
