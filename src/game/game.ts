import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 335,
    height: 667,
    parent: containerId,
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }
