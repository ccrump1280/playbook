import {SimpleGrid, Box, Select} from '@chakra-ui/react'
import {useState} from 'react'

const Backfield: React.FC = () => {
    const [backfield, setBackfield] = useState(backfieldByFormation('I'));
    return (
        <>
            <SimpleGrid columns={1} spacing={0} bg={'lightgreen'} gap={0}  className="backfield">
                {backfield.map((row, rowKey) => {
                    return (
                        <SimpleGrid columns={19} spacing={0} gap={0} height={'fit-content'}>
                            {row.map((col, colKey) => {
                                return (
                                    <Box fontSize={"clamp(0.5rem, 3vw, 1.4rem)"} key={rowKey+colKey} aspectRatio={1}>{col}</Box>
                                )
                            })}
                        </SimpleGrid>
                    )
                })}
            </SimpleGrid>
            <Select mt="1rem" onChange={(e) => setBackfield(backfieldByFormation(e.target.value as FormationName))}>
                <option value='I'>I formation</option>
                <option value='Split'>Split Backs Formation</option>
                <option value='Twins'>Twins Formation</option>
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
    backfield[0][center-1] = 'OL';
    backfield[0][center-2] = 'OL';
    backfield[0][center+1] = 'OL';
    backfield[0][center+2] = 'OL';
    return backfield;
}

type Formation = {
    'F': (null | number[]),
    'T': (null | number[]),
    'Y': (null | number[]),
    'X': (null | number[]),
    'Z': (null | number[])
}

function backfieldByFormation(key: FormationName): (null | string)[][] {
    const backfield = initializeBackfield();
    const center = Math.floor(backfield[0].length / 2)
    const formation: Formation = FORMATIONS[key];
    for (const position of Object.keys(formation) as (keyof Formation)[]) {
        const directions = formation[position];
        if (directions != null) {
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
    }
}