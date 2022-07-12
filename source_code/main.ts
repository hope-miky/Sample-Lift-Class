

enum LiftStatus {
    moving,
    stoped,
    broken,
    maintainance
}

interface Lift {
    id: number,
    capacity: number,
    status: LiftStatus,
    heading_to: number | null,
    current_location: number | null
}

class MainBuilding {

    private _num_lifts: number;
    private _lifts: Array<Lift> = [];

    // const name: string;

    constructor(num_lift: number, kwards?: any) {
        this._num_lifts = num_lift;
        this._generateLifts()
    }

    public get lifts(): Array<Lift> {
        return this._lifts;
    }

    public checkStatus(lift_id: number): LiftStatus | null  {
        try {
            const filtered_lift: Lift = this._lifts.filter((lift) => lift.id === lift_id)[0]
            return filtered_lift.status
        } catch (err: any) {
            console.error(`Error finding lift status: ${err}`)
            return null
        }
    }

    public addLift(value: Lift) {
        this._lifts.push(value);
    }

    private _generateLifts(): void {
        [ ...Array(this._num_lifts).keys() ].map((value) => {
            this.addLift({
                id: value,
                capacity: 4,
                status: LiftStatus.stoped,
                heading_to: null,
                current_location: Math.floor(Math.random() * this._num_lifts)
            })
        })
        // console.log(this._lifts)
    }




}


const test: MainBuilding = new MainBuilding(3)

console.log(`location of lift 2 is  = ${test.checkStatus(2)}`)