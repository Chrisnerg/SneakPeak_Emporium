import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

interface ShoeModelProps {
  url: string;
  scale?: number;
  positionY?: number;
  rotationY?: number;
  variantIndex?: number;
}

function ShoeModel({ url, scale = 3.6, positionY = -0.55, rotationY = -0.4, variantIndex = 0 }: ShoeModelProps) {
  const { scene, parser } = useGLTF(url) as any;
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Apply KHR_materials_variants if available
  useEffect(() => {
    if (!parser) return;
    const ext = parser.json?.extensionsUsed?.includes("KHR_materials_variants");
    if (!ext) return;
    const variantsExt = parser.plugins?.["KHR_materials_variants"];
    if (!variantsExt) return;
    try {
      variantsExt.selectVariant(scene, variantIndex);
    } catch (_) {
      // variant switching not supported, ignore
    }
  }, [scene, parser, variantIndex]);

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={scale}
        position={[0, positionY, 0]}
        rotation={[0.08, rotationY, 0]}
      />
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div style={{
        color: "rgba(255,255,255,0.4)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "9px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        textAlign: "center",
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: "2px solid rgba(255,0,0,0.3)",
          borderTop: "2px solid #FF0000",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 12px",
        }} />
        Loading...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

export interface ShoeViewerProps {
  shoeUrl: string;
  scale?: number;
  positionY?: number;
  rotationY?: number;
  variantIndex?: number;
  interacted: boolean;
  onInteractStart: () => void;
  onInteractEnd: () => void;
}

export default function ShoeViewer({
  shoeUrl,
  scale,
  positionY,
  rotationY,
  variantIndex,
  interacted,
  onInteractStart,
  onInteractEnd,
}: ShoeViewerProps) {
  return (
    <div
      className="w-full h-full relative"
      style={{ cursor: interacted ? "grabbing" : "grab" }}
      onMouseDown={onInteractStart}
      onMouseUp={onInteractEnd}
      onTouchStart={onInteractStart}
      onTouchEnd={onInteractEnd}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.3, 3.5], fov: 38 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-3, 4, -2]} intensity={0.9} color="#e8f0ff" />
        <directionalLight position={[0, -2, 4]} intensity={0.4} color="#ffffff" />
        <pointLight position={[2, 2, 3]} intensity={0.8} color="#ffffff" />

        <Environment preset="city" />

        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.5}
          scale={6}
          blur={2.5}
          far={3}
          color="#000000"
        />

        <Suspense fallback={<LoadingFallback />}>
          <ShoeModel
            url={shoeUrl}
            scale={scale}
            positionY={positionY}
            rotationY={rotationY}
            variantIndex={variantIndex}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={7}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={true}
          autoRotateSpeed={1.5}
          makeDefault
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "7px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "4px 8px",
          pointerEvents: "none",
        }}
      >
        3D View · <span style={{ color: "#FF0000" }}>Interactive</span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "7px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          transition: "opacity 0.3s",
          opacity: interacted ? 0 : 0.8,
        }}
      >
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
