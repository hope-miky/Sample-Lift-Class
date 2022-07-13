

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

    public addLift(value: ILift) {
        this._lifts.push(value);
    }

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