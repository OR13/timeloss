import { from_hex } from './from_hex.js'
import { to_hex } from './to_hex.js'


const encoder = new TextEncoder()

async function seed_to_initial_params(seed, width, height){
  // console.log('generating world...')
  // console.log(`/seed/${seed}/width/${width}/height/${height}`)
  const params = {
    seed: from_hex(seed),
    points: []
  }
  for (let i=0; i < 10; i++){
    const point_seed_template = `/seed/${seed}/point/${i}`.trim()
    const point_seed = await self.crypto.subtle.digest("SHA-256", encoder.encode(point_seed_template))
    const x = Number(BigInt('0x' + to_hex(point_seed.slice(0,16))) % BigInt(width))
    const y = Number(BigInt('0x' + to_hex(point_seed.slice(16,32))) % BigInt(height))
    const point = [x,y]
    params.points.push(point)
  }
  return params
}

export { seed_to_initial_params }