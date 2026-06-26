const canvas = document.getElementById("canvas");

// ==========================
// ESCENA
// ==========================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 65;


// ==========================
// RENDER
// ==========================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

// Hace transparente el canvas
renderer.setClearColor(0x000000, 0);


// ==========================
// GRUPO DEL CORAZÓN
// ==========================

const heartGroup = new THREE.Group();

scene.add(heartGroup);


// ==========================
// FORMA DEL CORAZÓN
// ==========================

function heartPoint(t, scale = 1) {

    let x = 17 * Math.pow(
        Math.sin(t),
        3
    );

    let y =
        14 * Math.cos(t) -
        4.5 * Math.cos(2 * t) -
        1.8 * Math.cos(3 * t) -
        0.8 * Math.cos(4 * t);


    // Un poco más ancho
    x *= 1.08;

    // Reduce la punta inferior
    y *= 0.95;


    return new THREE.Vector3(
        x * scale,
        y * scale,
        0
    );
}


// ==========================
// MATERIAL
// ==========================

const material = new THREE.LineBasicMaterial({

    color: 0x64ab8d,

    transparent: true,

    opacity: 0.85

});


// ==========================
// LÍNEAS HORIZONTALES
// ==========================

for (let z = -5.5; z <= 5.5; z += 0.28) {

    const points = [];

    for (let i = 0; i <= 320; i++) {

        const t = (Math.PI * 2 * i) / 320;


        const p = heartPoint(
            t,
            0.9
        );


        const depth = Math.sqrt(
            Math.max(
                0,
                1 - Math.pow(z / 5.5, 2)
            )
        );


        p.x *= depth;
        p.y *= depth;
        p.z = z;


        points.push(p);

    }


    const geometry =
        new THREE.BufferGeometry()
        .setFromPoints(points);


    const line =
        new THREE.Line(
            geometry,
            material
        );


    heartGroup.add(line);
}


// ==========================
// LÍNEAS VERTICALES
// ==========================

for (let i = 0; i < 140; i++) {

    const points = [];


    const t =
        (Math.PI * 2 * i) / 140;


    for (let z = -5.5; z <= 5.5; z += 0.2) {


        const p = heartPoint(
            t,
            0.9
        );


        const depth = Math.sqrt(
            Math.max(
                0,
                1 - Math.pow(z / 5.5, 2)
            )
        );


        p.x *= depth;
        p.y *= depth;
        p.z = z;


        points.push(p);

    }


    const geometry =
        new THREE.BufferGeometry()
        .setFromPoints(points);


    const line =
        new THREE.Line(
            geometry,
            material
        );


    heartGroup.add(line);

}


// ==========================
// POSICIÓN
// ==========================

heartGroup.position.y = 0;


// ==========================
// ANIMACIÓN
// ==========================

function animate() {

    requestAnimationFrame(
        animate
    );


    // Giro suave
    heartGroup.rotation.y += 0.008;


    renderer.render(
        scene,
        camera
    );

}


animate();


// ==========================
// RESPONSIVE
// ==========================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);