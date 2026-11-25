import { motion } from "motion/react";
import type { BookVisualSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";
import girl from "../assets/book-grade2/mirror-girl.jpg";
import pig from "../assets/book-grade2/mirror-pig.jpg";
import frontBlocks from "../assets/book-grade2/front-blocks.jpg";
import topCylinder from "../assets/book-grade2/top-cylinder.jpg";
import solidExample from "../assets/book-grade2/solid-example.jpg";
import solidQ1 from "../assets/book-grade2/solid-q1.jpg";
import solidQ2 from "../assets/book-grade2/solid-q2.jpg";
import solidQ3 from "../assets/book-grade2/solid-q3.jpg";
import solidQ4 from "../assets/book-grade2/solid-q4.jpg";

const images = {girl, pig, blocks: frontBlocks, cylinder: topCylinder, "solid-example":solidExample, "solid-q1":solidQ1, "solid-q2":solidQ2, "solid-q3":solidQ3, "solid-q4":solidQ4};

function Grid({ cells, centerX, y }: { cells: number[][]; centerX: number; y: number }) {
  const size = 46;
  const cols = Math.max(1, ...cells.map((row) => row.length));
  const x = centerX - (cols * size) / 2;
  return <g>{cells.flatMap((row, r) => row.map((v, c) => v ? <rect key={`${r}-${c}`} x={x+c*size} y={y+r*size} width={size} height={size} rx="4" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2.5" /> : null))}</g>;
}
function Clock({ x, hour, minute, mirror }: { x: number; hour: number; minute: number; mirror: boolean }) {
  const cy=207, r=92;
  const hourAngle=((hour%12+minute/60)*30-90)*Math.PI/180;
  const minuteAngle=(minute*6-90)*Math.PI/180;
  return <g transform={mirror ? `translate(${2*x} 0) scale(-1 1)` : undefined}>
    <circle cx={x} cy={cy} r={r} fill="var(--bg-surface)" stroke="var(--accent-blue)" strokeWidth="3" />
    {Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180;return <text key={i} x={x+74*Math.cos(a)} y={cy+74*Math.sin(a)+4} textAnchor="middle" fontSize="13" fill="var(--ink-primary)">{i||12}</text>})}
    <line x1={x} y1={cy} x2={x+45*Math.cos(hourAngle)} y2={cy+45*Math.sin(hourAngle)} stroke="var(--ink-primary)" strokeWidth="6" strokeLinecap="round" />
    <line x1={x} y1={cy} x2={x+62*Math.cos(minuteAngle)} y2={cy+62*Math.sin(minuteAngle)} stroke="var(--accent-coral)" strokeWidth="4" strokeLinecap="round" />
    <circle cx={x} cy={cy} r="5" fill="var(--ink-primary)" />
  </g>;
}
export function BookVisualEngine({scene}:{scene:BookVisualSceneState}) {
  const reveal=scene.phase>=3;
  const src=scene.mode in images ? images[scene.mode as keyof typeof images] : undefined;
  const solid = scene.mode.startsWith("solid-") || scene.mode === "blocks" || scene.mode === "cylinder";
  return <StageFrame ariaLabel={solid ? "立体图形观察舞台" : "镜面观察舞台"}>
    <text x="380" y="42" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--ink-primary)">{solid ? "看准观察方向，再想一想" : "观察镜子里的图像"}</text>
    {src && <g>
      <motion.rect x="45" y="75" width={solid ? 350 : 670} height="255" rx="16" fill="white" stroke={scene.phase === 1 ? "var(--accent-coral)" : "var(--border-strong)"} animate={{ strokeWidth: scene.phase === 1 ? 4 : 1 }} />
      <image href={src} x={solid ? 60 : 60} y="88" width={solid ? 320 : 640} height="228" preserveAspectRatio="xMidYMid meet" />
      {solid && <g>
        {scene.viewLabel && (
          <g>
            <rect x="495" y="75" width="140" height="28" rx="14" fill="var(--accent-coral-soft)" stroke="var(--accent-coral-border)" strokeWidth="1.5" />
            <text x="565" y="94" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--accent-coral)">{scene.viewLabel}</text>
          </g>
        )}
        <text x="565" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink-primary)">{scene.givenGrid ? "题目给出的图形" : "看到的平面图形"}</text>
        {scene.givenGrid ? <Grid cells={scene.givenGrid} centerX={565} y={150}/> : reveal && scene.grid ? <Grid cells={scene.grid} centerX={565} y={150}/> : reveal && (scene.mode === "solid-example" || scene.mode === "cylinder") ? <g>
          <rect x="465" y="155" width="65" height={scene.mode === "solid-example" ? 105 : 65} rx="4" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="3" />
          <text x="497" y={scene.mode === "solid-example" ? 282 : 244} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-secondary)">{scene.mode === "solid-example" ? "长方形" : "正方形"}</text>
          <rect x="570" y={scene.mode === "solid-example" ? 195 : 155} width={scene.mode === "solid-example" ? 65 : 110} height="65" rx="4" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="3" />
          <text x={scene.mode === "solid-example" ? 602 : 625} y={scene.mode === "solid-example" ? 282 : 244} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-secondary)">{scene.mode === "solid-example" ? "正方形" : "长方形"}</text>
        </g> : reveal && scene.mode === "solid-q1" ? <g>
          <circle cx="465" cy="200" r="25" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="3" />
          <text x="465" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-secondary)">圆形</text>
          <rect x="518" y="175" width="50" height="50" rx="4" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="3" />
          <text x="543" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-secondary)">正方形</text>
          <rect x="595" y="162" width="50" height="76" rx="4" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="3" />
          <text x="620" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-secondary)">长方形</text>
        </g> : <text x="565" y="218" textAnchor="middle" fontSize="34" fill="var(--ink-secondary)">?</text>}
      </g>}
    </g>}
    {scene.mode === "digits" && <g>
      <rect x="75" y="105" width="250" height="175" rx="25" fill="var(--accent-blue-soft)" stroke="var(--accent-blue)" strokeWidth="3" />
      <g transform="translate(400 0) scale(-1 1)"><text x="200" y="225" textAnchor="middle" fontSize="84" fontWeight="700" fill="var(--ink-primary)">{scene.digits}</text></g>
      <text x="200" y="310" textAnchor="middle" fontSize="16" fill="var(--ink-secondary)">镜子里的数字</text>
      <line x1="380" y1="88" x2="380" y2="330" stroke="var(--accent-blue)" strokeDasharray="7 5" strokeWidth="3" />
      <rect x="352" y="68" width="56" height="22" rx="11" fill="var(--accent-blue)" />
      <text x="380" y="83" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">镜面</text>
      {reveal ? (
        <motion.text initial={{opacity:0}} animate={{opacity:1}} x="550" y="225" textAnchor="middle" fontSize="84" fontWeight="700" fill="var(--accent-teal)">{scene.digits}</motion.text>
      ) : scene.phase === 2 ? (
        <g>
          <text x="550" y="188" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent-coral)">先看单个数字</text>
          <text x="550" y="214" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent-coral)">再看左右顺序</text>
          <text x="550" y="262" textAnchor="middle" fontSize="40" fontWeight="800" fill="var(--ink-secondary)">?</text>
        </g>
      ) : (
        <text x="550" y="225" textAnchor="middle" fontSize="64" fill="var(--ink-secondary)">?</text>
      )}
      <text x="550" y="310" textAnchor="middle" fontSize="16" fill="var(--ink-secondary)">原来的数字</text>
    </g>}
    {scene.mode === "animals" && <g>
      <rect x="80" y="105" width="260" height="175" rx="24" fill="var(--accent-blue-soft)" stroke="var(--accent-blue)" strokeWidth="3" />
      <text x="145" y="210" fontSize="58">🐰</text><text x="245" y="210" fontSize="58">🐤</text>
      <text x="210" y="310" textAnchor="middle" fontSize="16" fill="var(--ink-secondary)">镜中：兔在左，鸭在右</text>
      <line x1="380" y1="90" x2="380" y2="330" stroke="var(--accent-blue)" strokeDasharray="7 5" strokeWidth="3" />
      {reveal ? <motion.g initial={{opacity:0}} animate={{opacity:1}}><text x="435" y="210" fontSize="58">🐤</text><text x="535" y="210" fontSize="58">🐰</text></motion.g> : <text x="520" y="210" textAnchor="middle" fontSize="64" fill="var(--ink-secondary)">?</text>}
      <text x="520" y="310" textAnchor="middle" fontSize="16" fill="var(--ink-secondary)">镜子前</text>
    </g>}
    {scene.mode === "clock" && <g>
      <line x1="380" y1="75" x2="380" y2="340" stroke="var(--accent-blue)" strokeDasharray="7 5" strokeWidth="3" />
      <Clock x={200} hour={scene.hour ?? 9} minute={scene.minute ?? 0} mirror={!!scene.mirrorGiven}/>
      <text x="200" y="325" textAnchor="middle" fontSize="16" fill="var(--ink-secondary)">{scene.mirrorGiven ? "镜子里的钟" : "现实中的钟"}</text>
      {reveal ? <motion.g initial={{opacity:0}} animate={{opacity:1}}><Clock x={550} hour={scene.hour ?? 9} minute={scene.minute ?? 0} mirror={!scene.mirrorGiven}/></motion.g> : <text x="550" y="220" textAnchor="middle" fontSize="64" fill="var(--ink-secondary)">?</text>}
      <text x="550" y="325" textAnchor="middle" fontSize="16" fill="var(--ink-secondary)">{scene.mirrorGiven ? "现实中的钟" : "镜子里的钟"}</text>
    </g>}
    {reveal && scene.answerText ? <motion.text initial={{opacity:0}} animate={{opacity:1}} x="380" y="378" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--accent-teal)">{scene.answerText}</motion.text> : <text x="380" y="378" textAnchor="middle" fontSize="16" fill="var(--ink-secondary)">{scene.phase === 0 ? "先观察已知图形" : scene.phase === 1 ? (solid ? "沿指定方向看一看" : "沿竖直方向想象翻转") : "先自己想一想，下一步再揭晓"}</text>}
  </StageFrame>;
}
