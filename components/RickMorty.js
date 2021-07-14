import Flex from '../components/Flex'
import Button from '../components/Button'

import { Box, Image } from 'rebass/styled-components'
import { Label, Input } from '@rebass/forms'

import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

import { config, options } from '../statecharts/rickmorty'

import { inspect } from "@xstate/inspect";

if (typeof window !== 'undefined') {
  inspect({
    // options
    iframe: false,
    url: "https://statecharts.io/inspect",
  });


}

function RickAndMorty(props) {
    const ramMachine = Machine(config)
    const [ current, send ] = useMachine(ramMachine, options)
    return (
      <Flex center height="100vh">
        
          <Box py={3}>
            <Box px={2} mb={3}>
              <Label htmlFor='email'>Character Name</Label>
              <Input
                id='email'
                name='email'
                defaultValue=''
                onChange={(e) => send({ type:'INPUT_NAME', name: e.target.value })}
              />
            </Box>
            <Box px={2} ml='auto'>
              <Button variant="grey" onClick={() => send({ type: 'SUBMIT', msg: 'sending name'})}>Search: {current.context.msg}</Button>
            </Box>
            <div className="results">
            {Object.keys(current.context.info).length > 0 && (
              <Box px={2}>
                <p>Count: {current.context.info.count}</p>
                <p>Pages: {current.context.info.pages}</p>
              </Box>
            )}
            </div>
          </Box>
        
        {current.context.results.length > 0 && (
          <Flex px={2} flexWrap="wrap" height="100%" center>
            {current.context.results.map(char => (
              <Box key={char.name}>
                <Image src={char.image} />
                <p>Name: {char.name}</p>
                <p>Species: {char.species}</p>
                <p>Status: {char.status}</p>
                <p>Origin: {char.origin.name}</p>
              </Box>
            ))}
          </Flex>
        )}
      </Flex>
    )
}



export default RickAndMorty;
