function main() {
    var shaders = {};
    var loader = new Loader(
        $.map(['julia', '_vertex'], function(shader) {
            return {
                obj: $.get('shdr/' + shader + '.shdr'),
                callback: function (data) { shaders[shader] = data; }
            };
        })
    );

    loader.$.on('finish', init);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var uniforms = {
        power: {
            type: 'f',
            value: 2.0
        },
        offset: {
            type: 'v2',
            value: new THREE.Vector2(0.5, 0.5)
        },
        juliaMode: {
            type: 'f',
            value: 1
        }
    };

    var geometry = new THREE.PlaneGeometry(2,2, 100, 100);

    camera.position.z = 4;


    var phi = 0, r = 1;
    function render () {
        requestAnimationFrame(render);

        //plane.rotation.x += 0.01;
        //plane.rotation.y += 0.01;
        phi += 0.01;
        if (phi > 7) { phi -= 2*Math.PI; };
        uniforms.offset.value = new THREE.Vector2(r * Math.sin(phi), r * Math.cos(phi));

        renderer.render(scene, camera);
    };

    function init() {
        var shaderMaterial = new THREE.ShaderMaterial({
                fragmentShader: shaders.julia
                , vertexShader: shaders._vertex
                , uniforms: uniforms
            });
        var plane = new THREE.Mesh(geometry, shaderMaterial);
        scene.add(plane);
        render();
    }
}
