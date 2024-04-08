import {
    ViewerApp,
    addBasePlugins,
    AssetManagerBasicPopupPlugin, 
    CanvasSnipperPlugin,
    FileTransferPlugin,
} from "webgi";
import "./styles.css"
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm: false
    })

    await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    await viewer.addPlugin(FileTransferPlugin)
    await viewer.addPlugin(CanvasSnipperPlugin)

    await viewer.load("./assets/drill_model.glb")

    function setupScrollAnimation() {
        const tl = gsap.timeline()
    
        // first animation
    
        tl
        .to(position, { x: 2, y: -3, z: -4.05, 
            onUpdate, 
            immediateRender: false,
            scrollTrigger: { 
                trigger: '.second',
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                markers: true
            } 
        })
        .to(target, { x: -0.1, y: 0, z: 0,
            onUpdate, 
            immediateRender: false,
            scrollTrigger: { 
                trigger: '.second',
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                markers: true
            } 
        })

        .to(position, { x: -2.98, y: -0.16, z: 1.41, 
            immediateRender: false,
            onUpdate, 
            scrollTrigger: { 
                trigger: '.third',
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                markers: true
            } 
        })
        .to(target, { x: -0.42, y: 1.23, z: -0.27,
            immediateRender: false,
            onUpdate, 
            scrollTrigger: { 
                trigger: '.third',
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                markers: true
            } 
        })
    }

    setupScrollAnimation()


    // webgi update
    let needsUpdate = true
    function onUpdate() {
        needsUpdate = true
        viewer.renderer.resetShadows()
    }

    viewer.addEventListener('preFrame', () => {
        if (needsUpdate) {
            camera.positionUpdated(true)
            camera.targetUpdated(true)
            needsUpdate = false
        }
    })
}


setupViewer()
