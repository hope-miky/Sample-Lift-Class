

enum LiftStatus {
    moving = 'moving',
    stoped = 'stoped',
    broken = 'broken',
    maintainance = 'maintainance'
}

interface ILift {
    id: number,
    capacity: number,
    status: LiftStatus,
    heading_to: number | null,
    current_location: number | null
}

class MainBuilding {

    private _num_lifts: number;
    private _lifts: Array<ILift> = [];

    // const name: string;

    constructor(num_lift: number, kwards?: any) {
        this._num_lifts = num_lift;
        this._generateLifts()
    }

    public get lifts(): Array<ILift> {
        return this._lifts;
    }

    /**
     * It returns the status of a lift given its id.
     * @param {number} lift_id - number - The id of the lift you want to check the status of
     * @returns LiftStatus | null
     */
    public checkStatus(lift_id: number): LiftStatus | null  {
        try {
            const filtered_lift: ILift = this._lifts.filter((lift) => lift.id === lift_id)[0]
            console.log(filtered_lift.current_location)
            return filtered_lift.status
        } catch (err: any) {
            console.error(`Error finding lift status: ${err}`)
            return null
        }
    }

    /**
     * > Find the index of the lift with the given id
     * @param {number} lift_id - number - the id of the lift you want to find
     * @returns The index of the lift in the array.
     */
    public findLift(lift_id: number): number  {
        try {
            // const filtered_lift: ILift = this._lifts.filter((lift) => lift.id === lift_id)[0]
            const idx = this._lifts.findIndex( lift => lift.id === lift_id );
            return idx
        } catch (err: any) {
            console.error(`Error finding lift status: ${err}`)
            return -1
        }
    }

    /**
     * This function adds a lift to the lifts array.
     * @param {ILift} value - ILift - this is the type of the parameter.  In this case, it's an
     */
    public addLift(value: ILift) {
        this._lifts.push(value);
    }

    /**
     * *move* is a generator function that returns an iterator that yields the next floor to move to
     * @param {number} from - the floor the lift iis being called from
     * @param {number} to - the floor the lift is going to
     * @param {number} idx - the index of the lift in the array of lifts
     */
    *move(from: number, to: number, idx: number): IterableIterator<number> {
        while( from != to ){

            if(to - from > 0){
                to--
            } else {
                to++
            }
            console.log(`lift status ${this._lifts[idx].status} on ${to}th floor`)
            yield to
        }
    } 

    
    /**
     * The function takes two arguments, the floor the user is on and the lift they want to call. It
     * then finds the lift and checks if it's moving. If it is, it throws an error. If it's not, it
     * calls the move function and moves the lift to the floor the user is on
     * @param {number} from - the floor the user is on
     * @param {number} lift_id - the id of the lift you want to call
     */
    public call(from: number, lift_id: number) {
        const idx = this.findLift(lift_id)
        const cur_lift = this._lifts[idx]
        const going_to: number = cur_lift.current_location
        const delay = ms => new Promise(res => setTimeout(res, ms));

        console.log(`lift ${lift_id} going to ${from} from ${going_to}`)

        const delayedCall = () => new Promise(async () => {
            this._lifts[idx].status = LiftStatus.moving
            var iter = this.move(from, going_to, idx)
            while (from != this._lifts[idx].current_location){
                this._lifts[idx].current_location = iter.next().value
                await delay(2000)
            }
            this._lifts[idx].status = LiftStatus.stoped
            console.log(`lift status ${this._lifts[idx].status} now at ${this._lifts[idx].current_location}`)
        });

        if (this._lifts[idx].status === LiftStatus.moving) {
            console.error(`Lift #${cur_lift.id} is already moving`)
        } else if (from === going_to) {
            console.log('the lif is on the same floor!')
        } else {
            delayedCall()
        }
    }

    /**
     * It creates an array of numbers from 0 to the number of lifts, and then maps each number to a
     * lift object
     */
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
    }




}


const test: MainBuilding = new MainBuilding(3)


// const delay = ms => new Promise(res => setTimeout(res, ms));
// console.log(`location of lift 2 is  = ${test.checkStatus(1)}`)
test.call(5, 1)
// test.call(10, 1)

// delay(5000)
// test.call(10, 1)

// console.log('something')