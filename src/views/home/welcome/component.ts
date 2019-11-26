import Vue from 'vue'
// import * as PIXI from 'pixi.js'
const img = require('./images/1.jpg')

export default Vue.extend({
  asyncData({ store }: any) {
    return store.dispatch('user/getUser')
  },
  mounted() {
    const PIXI = require('pixi.js')

    const app = new PIXI.Application({
      width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1
    })
    document.body.appendChild(app.view)

    const container = new PIXI.Container()

    app.stage.addChild(container)

    // Create a new texture
    const texture = PIXI.Texture.from(img)

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 1; i++) {
      const bunny = new PIXI.Sprite(texture)
      bunny.anchor.set(0.5)
      bunny.x = (i % 5) * 40
      bunny.y = Math.floor(i / 5) * 40
      container.addChild(bunny)
    }

    // Move container to the center
    container.x = app.screen.width / 2
    container.y = app.screen.height / 2

    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2
    container.pivot.y = container.height / 2

    // Listen for animate update
    app.ticker.add((delta: number) => {
      // rotate the container!
      // use delta to create frame-independent transform
      container.rotation -= 0.01 * delta
    })
  },
  data() {
    return {
    }
  },
  methods: {
  }
})
