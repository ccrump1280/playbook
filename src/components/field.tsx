import {SimpleGrid, Box, Select} from '@chakra-ui/react'
import {useState} from 'react'
import Field from '../assets/Field.png'

const Backfield: React.FC = () => {
    const [backfield, setBackfield] = useState(setBackfieldByFormation('I'));
    return (
        <>
            <Box position={'relative'} width={'90%'} maxWidth={'350px'} margin={'auto'}>
                <img src={Field}></img>
                <SimpleGrid columns={19} spacing={0} gap={0}  className="backfield">
                    {backfield.map((row: (string | null)[], rowKey: number) => {
                        return (
                            <>
                                {row.map((col: (string | null), colKey: number) => {
                                    return (
                                        <Box className={col != null ? 'player' : undefined} key={rowKey+colKey}>{col}</Box>
                                    )
                                })}
                            </>
                        )
                    })}
                </SimpleGrid>
            </Box>
            <Select w={250} m="1rem auto" backgroundColor={'white'} onChange={(e) => setBackfield(setBackfieldByFormation(e.target.value as FormationName))}>
                <option value='I'>I formation</option>
                <option value='Split'>Split Backs Formation</option>
                <option value='Twins'>Twins Formation</option>
                <option value='Ace'>Ace</option>
                <option value='Trips'>Trips</option>
                <option value='Empty'>Empty</option>
                <option value='Quads'>Quads</option>
                <option value='Bunch'>Bunch</option>
                <option value='Shotgun'>Shotgun</option>
            </Select>
        </>
    )
}
export default Backfield;


function initializeBackfield(): (string | null)[][] {
    //create backfield array and initialize o-line and QB since they never change
    const backfield: (string | null)[][] = Array(4).fill(undefined).map(_e => Array(19).fill(null));
    const center: number = Math.floor(backfield[0].length / 2);
    backfield[1][center] = 'QB';
    backfield[0][center] = 'C';
    backfield[0][center-1] = 'LG';
    backfield[0][center-2] = 'LT';
    backfield[0][center+1] = 'RG';
    backfield[0][center+2] = 'RT';
    return backfield;
}

type Formation = {
    'F'?: number[],
    'T'?: number[],
    'Y'?: number[],
    'X'?: number[],
    'Z'?: number[],
    'S'?: number[],
    'QB'?: number[]
}

function setBackfieldByFormation(key: FormationName): (null | string)[][] {
    const backfield = initializeBackfield();
    const center = Math.floor(backfield[0].length / 2)
    const formation: Formation = FORMATIONS[key];
    for (const position of Object.keys(formation) as (keyof Formation)[]) {
        const directions = formation[position];
        if (directions != null) {
            if (position == 'QB'){
                backfield[1][center] = null;
            }
            backfield[directions[0]][center + directions[1]] = position;
        }
    }
    return backfield;

}

type FormationName = ('I')
const FORMATIONS = {
    'I': {
        'F': [2, 0],
        'T': [3, 0],
        'Y': [0, 3],
        'X': [0, -7],
        'Z': [1, 7]
    },
    'Split': {
        'F': [3, 1],
        'T': [3, -1],
        'Y': [0, 3],
        'X': [0, -7],
        'Z': [1, 7]
    },
    'Twins': {
        'F': [2, 0],
        'T': [3, 0],
        'Y': [0, 3],
        'X': [0, -7],
        'Z': [1, -4]
    },
    'Ace': {
        'T': [3, 0],
        'Y': [0, 3],
        'X': [0, -7],
        'S': [1, -4],
        'Z': [1, 7]
    },
    'Trips': {
        'T': [3, 0],
        'Y': [0, 3],
        'X': [0, -7],
        'S': [1, 4],
        'Z': [1, 7]
    },
    'Empty': {
        'QB': [2, 0],
        'X': [0, -7],
        'S': [1, -4],
        'T': [1, 4],
        'Y': [0, 6],
        'Z': [1, 8]
    },
    'Quads': {
        'QB': [2, 0],
        'X': [0, -7],
        'T': [1, 3],
        'Y': [1, 5],
        'S': [1, 7],
        'Z': [0, 8]
    },
    'Bunch': {
        'T': [3, 0],
        'X': [0, -7],
        'S': [1, 3],
        'Y': [0, 4],
        'Z': [1, 5]
    },
    'Shotgun': {
        'QB': [2, 0],
        'T': [2, -1],
        'Y': [0, 3],
        'X': [0, -7],
        'S': [1, -4],
        'Z': [1, 7]
    }
}