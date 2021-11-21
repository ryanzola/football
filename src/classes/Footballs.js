import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import MainThreeScene from './MainThreeScene'

export default class Footballs {
  constructor(_options) {
    this.experience = new MainThreeScene()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.modelLoader = new GLTFLoader()
    this.count = 20
    this.meshes = []

    this.setModel()
  }

  setModel() {
    this.modelLoader.load('/assets/models/football.glb', glb => {
      this.football = []
      glb.scene.traverse(child => {
        if(child instanceof THREE.Mesh) {
          this.football.push(child)
        }
      })

      const footballGroup = new THREE.Group()

      this.football.forEach(mesh => {
        footballGroup.add(mesh)
      })

      footballGroup.scale.multiplyScalar(6)
      footballGroup.rotation.y = Math.PI * 0.5
      footballGroup.rotation.z = Math.PI * 0.6
      footballGroup.rotation.order='ZXY'
      

      for(let i = 0; i < this.count; i++) {
        const football = footballGroup.clone()
        football.position.x = (Math.random() - 0.5) * 20
        football.position.y = (Math.random() - 0.5) * 20
        football.position.z = (Math.random() - 0.5) * 20
        football.rotation.z = Math.PI * 0.2
        football.rotation.x = (2 * Math.PI) * Math.random()

        this.scene.add(football)
        this.meshes.push(football)
      }
    })

    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 20)
    this.scene.add(this.light)
  }

  update() {
    this.meshes.forEach(mesh => {
      mesh.rotation.x += this.time.delta * 0.003
      mesh.position.x += 0.025
      mesh.position.y += 0.025

      if(mesh.position.x > 15) {
        mesh.position.x = - 15
      }
      if(mesh.position.y > 15) {
        mesh.position.y = - 15
      }

    })
  }
}