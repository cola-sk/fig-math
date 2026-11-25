import { motion } from "motion/react";
import type { EarlyBookSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function EarlyBookEngine({scene}:{scene:EarlyBookSceneState}) {
  const title={queue:"排队",bus:"乘车与数量变化",stairs:"爬楼梯",well:"向前与后退",trees:"点与间隔"}[scene.mode];
  return <StageFrame ariaLabel={`${title}思考舞台`}>
    <text x="380" y="38" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--ink-primary)">{title} · 图形示意</text>
    <rect x="45" y="68" width="265" height="250" rx="22" fill={scene.phase===1?"var(--accent-blue-soft)":scene.phase===2?"var(--accent-teal-soft)":"var(--bg-surface)"} stroke="var(--border-strong)" />
    {scene.mode==="queue" && <g>
      {scene.phase >= 1 && (
        <motion.rect x="64" y="122" width="226" height="96" rx="14" fill="none" stroke="var(--accent-coral)" strokeWidth="2" strokeDasharray="5 4" initial={{opacity:0}} animate={{opacity:1}} />
      )}
      {[-66, 66].map((dx) => (
        <g key={dx} transform={`translate(${177 + dx} 156)`}>
          <circle cx="0" cy="0" r="12" fill="var(--accent-teal)" fillOpacity=".7" />
          <path d="M -13 42 Q -13 16 0 16 Q 13 16 13 42 Z" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" />
        </g>
      ))}
      <g transform="translate(177 150)">
        <circle cx="0" cy="0" r="17" fill="var(--accent-coral)" />
        <path d="M -18 55 Q -18 20 0 20 Q 18 20 18 55 Z" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="2" />
      </g>
      <text x="177" y="246" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-secondary)">
        {scene.phase === 0 ? "先找主角前后各有几人" : scene.phase === 1 ? "别忘了加上主角本人（+1）" : "看清每队人数与总队数"}
      </text>
    </g>}
    {scene.mode==="bus" && (scene.subject==="公交车" ? <g>
      <rect x="70" y="137" width="205" height="91" rx="22" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="3"/>
      <rect x="90" y="151" width="165" height="38" rx="8" fill="var(--accent-blue-soft)" stroke="var(--accent-blue)"/>
      <circle cx="111" cy="232" r="16" fill="var(--ink-secondary)"/>
      <circle cx="235" cy="232" r="16" fill="var(--ink-secondary)"/>
      <text x="177" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
        {scene.phase === 0 ? "先找原有、下车、上车" : scene.phase === 1 ? "下车 − · 上车 +" : "两步合起来算清楚"}
      </text>
    </g> : <g>
      <text x="177" y="185" textAnchor="middle" fontSize="64">{scene.subject==="电脑"?"💻":scene.subject==="水果"?"🍎":"🩰"}</text>
      <text x="177" y="238" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink-primary)">{scene.subject}的数量变化</text>
      {scene.phase >= 1 && <text x="177" y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent-coral)">{scene.phase === 1 ? "先算第一步变化" : "再推回或算出结果"}</text>}
    </g>)}
    {scene.mode==="stairs" && <g>
      <path d="M75 255 H120 V220 H165 V185 H210 V150 H255" fill="none" stroke="var(--accent-teal)" strokeWidth="9" strokeLinejoin="round"/>
      {scene.phase >= 1 && [0, 1, 2].map((step) => (
        <motion.path
          key={step}
          d={`M ${98 + step * 45} ${220 - step * 35} Q ${115 + step * 45} ${198 - step * 35} ${140 + step * 45} ${185 - step * 35}`}
          fill="none" stroke="var(--accent-coral)" strokeWidth="2.5" strokeDasharray="4 3"
          initial={{opacity:0}} animate={{opacity:1}}
        />
      ))}
      <text x="178" y="285" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-secondary)">
        {scene.phase >= 1 ? "爬 1 层 = 走 1 段楼梯间隔" : "数楼层之间的间隔"}
      </text>
    </g>}
    {scene.mode==="well" && (scene.subject==="蜗牛" ? <g>
      <rect x="105" y="103" width="140" height="165" rx="14" fill="var(--accent-blue-soft)" stroke="var(--accent-blue)" strokeWidth="4"/>
      <path d="M100 105 Q175 80 250 105" fill="none" stroke="var(--accent-blue)" strokeWidth="5"/>
      {[140, 175, 210, 245].map((y) => (
        <line key={y} x1="107" y1={y} x2="122" y2={y} stroke="var(--accent-blue)" strokeWidth="2" />
      ))}
      <motion.g initial={false} animate={{y:scene.phase* -22}}><text x="164" y="239" fontSize="38">🐌</text></motion.g>
      <text x="175" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-secondary)">
        {scene.phase >= 3 ? "爬出井口就不再下滑！" : "蜗牛前进与后退示意"}
      </text>
    </g> : <g>
      <line x1="70" y1="230" x2="270" y2="230" stroke="var(--accent-teal)" strokeWidth="5"/>
      <motion.g initial={false} animate={{x:scene.phase*32}}><text x="75" y="210" fontSize="38">{scene.subject==="毛毛虫"?"🐛":"🚶"}</text></motion.g>
      <text x="175" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-secondary)">{scene.subject}前进与后退示意</text>
    </g>)}
    {scene.mode==="trees" && <g>
      <line x1="65" y1="218" x2="285" y2="218" stroke="var(--ink-secondary)" strokeWidth="4"/>
      {scene.phase >= 1 && Array.from({length:4},(_,i)=>(
        <motion.path
          key={`gap-${i}`}
          d={`M ${82+i*48} 226 Q ${106+i*48} 246 ${130+i*48} 226`}
          fill="none" stroke="var(--accent-coral)" strokeWidth="2.5" strokeDasharray="4 3"
          initial={{opacity:0}} animate={{opacity:1}}
        />
      ))}
      {Array.from({length:5},(_,i)=><g key={i} transform={`translate(${82+i*48} 180)`}><line y1="0" y2="38" stroke="var(--ink-secondary)" strokeWidth="5"/>{scene.subject==="树"?<circle cy="-8" r="17" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2"/>:<text x="-15" y="0" fontSize="29">{scene.subject==="气球"?"🎈":scene.subject==="彩旗"?"🚩":"🌼"}</text>}</g>)}
      <text x="175" y="274" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-secondary)">
        {scene.phase >= 1 ? "红弧线是间隔，看清两端栽不栽" : "端点与间隔见题目"}
      </text>
    </g>}
    {scene.comparison && <motion.text initial={{opacity:0}} animate={{opacity:1}} x="175" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent-coral)">比较双方的结果</motion.text>}
    <text x="500" y="83" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink-primary)">题目条件</text>
    {scene.facts.map((fact,i)=><g key={i}><rect x="345" y={95+i*43} width="320" height="35" rx="9" fill="var(--bg-surface)" stroke="var(--border-subtle)"/><text x="505" y={118+i*43} textAnchor="middle" fontSize="15" fill="var(--ink-primary)">{fact}</text></g>)}
    <motion.g key={scene.phase} initial={{opacity:0}} animate={{opacity:1}}>
      <rect x="345" y="285" width="320" height="38" rx="9" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)"/>
      <text x="505" y="309" textAnchor="middle" fontSize="15" fill="var(--ink-primary)">{scene.middleLabel}：{scene.phase>=2?scene.middleValue:"?"}</text>
      <text x="505" y="358" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--accent-coral)">结果：{scene.phase>=3?scene.finalValue:"?"}</text>
    </motion.g>
  </StageFrame>;
}
