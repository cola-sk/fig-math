import { numberCheckpoint, teachingSteps } from "../teachingSteps";
import type { BookSectionKind, DifficultyTier, LessonVariant, MathLesson, SegmentBarSceneState } from "../../types/lesson";

type Preparation = { prompt: string; question: string; answer: number; unit: string; formula: string; explanation: string; };
type SumDifferenceQuestion = {
 id:string; group:1|2; number?:number; kind:BookSectionKind; tier:DifficultyTier;
 statement:string; smaller:string; larger:string; unit:string; total:number; difference:number;
 prep?:Preparation; context:string;
};
const questions:SumDifferenceQuestion[]=[
 {id:"example",group:1,kind:"example",tier:"base",statement:"小艾和哥哥一共有26支铅笔，哥哥的铅笔比小艾的多8支。小艾与哥哥各有多少支铅笔？",smaller:"小艾",larger:"哥哥",unit:"支",total:26,difference:8,context:"铅笔"},
 {id:"d1-q1",group:1,number:1,kind:"warmup",tier:"base",statement:"小白兔和小黑兔拔胡萝卜，一共拔了24根，小白兔比小黑兔多拔了6根。小白兔拔了几根胡萝卜？",smaller:"小黑兔",larger:"小白兔",unit:"根",total:24,difference:6,context:"胡萝卜"},
 {id:"d1-q2",group:1,number:2,kind:"warmup",tier:"base",statement:"盘子里有13块饼干，将它们全部分给小艾和小雅。如果小雅分到的饼干的数量比小艾的多3块，那么小雅分到了多少块饼干呢？",smaller:"小艾",larger:"小雅",unit:"块",total:13,difference:3,context:"饼干"},
 {id:"d1-q3",group:1,number:3,kind:"warmup",tier:"base",statement:"妈妈将21本作业本全部分给哥哥和妹妹，因为哥哥作业更多，需要的本子的数量更多，所以妹妹分到的作业本比哥哥的少5本。哥哥分到了几本作业本呢？",smaller:"妹妹",larger:"哥哥",unit:"本",total:21,difference:5,context:"作业本"},
 {id:"d1-q4",group:1,number:4,kind:"practice",tier:"standard",statement:"壮壮和小雅原来一共有28颗糖，两人吃掉相同数量的糖后，壮壮还剩12颗，小雅还剩4颗。壮壮原来有多少颗糖？",smaller:"小雅",larger:"壮壮",unit:"颗",total:28,difference:8,context:"原来的糖",prep:{prompt:"两人吃掉一样多的糖后，壮壮还剩 12 颗，小雅还剩 4 颗。先比一比，现在壮壮比小雅多几颗糖？",question:"吃掉一样多之后，两人相差多少颗糖？",answer:8,unit:"颗",formula:"12-4=8",explanation:"两人吃掉一样多，剩下的数量差等于原来的数量差，所以原来也相差 8 颗。"}},
 {id:"d1-q5",group:1,number:5,kind:"practice",tier:"standard",statement:"胡萝卜成熟了，小黑兔和小白兔一起拔胡萝卜，它们2天一共拔了18根胡萝卜。已知小黑兔每天比小白兔多拔3根胡萝卜，且两只兔子拔胡萝卜的速度不变。小黑兔每天可以拔几根胡萝卜？",smaller:"小白兔",larger:"小黑兔",unit:"根",total:9,difference:3,context:"每天拔的胡萝卜",prep:{prompt:"题目说两只兔子 2 天一共拔了 18 根，且每天速度不变。先算一算它们 1 天一共拔多少根？",question:"两只兔子一天一共拔多少根？",answer:9,unit:"根",formula:"18\\div2=9",explanation:"两天一共 18 根且速度不变，平均分成 2 天，每天一共拔 9 根。"}},
 {id:"d1-q6",group:1,number:6,kind:"practice",tier:"standard",statement:"小浩和小兰两人两天一共做了40道计算题。已知小浩每天比小兰多做4道题，且两人做题的速度不变。小浩和小兰每天各做了多少道题？",smaller:"小兰",larger:"小浩",unit:"道",total:20,difference:4,context:"每天做的题",prep:{prompt:"两人 2 天一共做了 40 道题，且每天做题速度不变。先算一算两人 1 天一共做多少道题？",question:"两人一天一共做多少道题？",answer:20,unit:"道",formula:"40\\div2=20",explanation:"两天一共 40 道题且速度不变，平均分成 2 天，每天一共做 20 道。"}},
 {id:"d2-example",group:2,kind:"example",tier:"base",statement:"小雅3岁的时候哥哥7岁，今年两人的年龄加起来是20岁。今年小雅与哥哥分别多少岁？",smaller:"小雅",larger:"哥哥",unit:"岁",total:20,difference:4,context:"今年的年龄",prep:{prompt:"小雅 3 岁时哥哥 7 岁，先算一算那时候哥哥比小雅大几岁？今年这个差会变吗？",question:"哥哥比小雅大多少岁？",answer:4,unit:"岁",formula:"7-3=4",explanation:"两人同时长大，年龄差永远不变，今年哥哥还是比小雅大 4 岁。"}},
 {id:"d2-q1",group:2,number:1,kind:"warmup",tier:"base",statement:"小雅和小艾今年的年龄加起来是19岁，已知小艾比小雅大5岁。小艾今年多少岁？",smaller:"小雅",larger:"小艾",unit:"岁",total:19,difference:5,context:"今年的年龄"},
 {id:"d2-q2",group:2,number:2,kind:"warmup",tier:"base",statement:"军军6岁的时候小浩9岁，今年两人的年龄加起来是21岁。今年军军与小浩分别多少岁？",smaller:"军军",larger:"小浩",unit:"岁",total:21,difference:3,context:"今年的年龄",prep:{prompt:"军军 6 岁时小浩 9 岁，先算一算小浩比军军大多少岁？",question:"小浩比军军大多少岁？",answer:3,unit:"岁",formula:"9-6=3",explanation:"两人每年各长 1 岁，年龄差不变，今年小浩还是比军军大 3 岁。"}},
];
function createQuestion(q:SumDifferenceQuestion):LessonVariant {
 const small=(q.total-q.difference)/2, big=small+q.difference, equal=q.total-q.difference;
 const label=q.kind==="example"?`小例题大发现 ${q.group}`:`我要练一练 ${q.group} · 第 ${q.number} 题`;
 const ratios={big:.82,small:.82*small/big};
 const scene=(phase:number):SegmentBarSceneState=>{
  const known=!q.prep || phase>0;
  const reduced=phase===2;
  const shown=phase>=3;
  return {kind:"segment-bar",annotation:phase===0?`观察${q.context}，先找一找条件`:phase===1?"把多出的部分暂时拿掉":phase===2?"剩下两份一样多的部分":phase===3?"把多出的部分接回来":"用和与差检查",
   rows:[
    {id:"big",label:q.larger,color:"coral",parts:1,partLabel:shown?`${small}`:"?",extraValue:reduced?0:q.difference,extraLabel:known?`${q.difference}${q.unit}`:"?",extraState:phase===1?"detached":phase===3?"highlighted":"normal",baseValue:small,visualTotalRatio:reduced?ratios.small:ratios.big},
    {id:"small",label:q.smaller,color:"teal",parts:1,partLabel:shown?`${small}`:"?",visualTotalRatio:ratios.small},
   ],totalBrace:{label:phase===0&&q.prep?.formula.includes("\\div")?"每天合计 ?":`和 ${q.total} ${q.unit}`,state:"normal"}};
 };
 const formulas=[...(q.prep?[{id:`${q.id}-prep`,latex:q.prep.formula,comment:q.prep.explanation}]:[]),
  {id:`${q.id}-equal`,latex:`${q.total}-${q.difference}=${equal}\\text{（${q.unit}）}`,comment:"拿掉较多部分后，剩下两份一样多"},
  {id:`${q.id}-small`,latex:`${equal}\\div2=${small}\\text{（${q.unit}）}`,comment:`${q.smaller}的数量`},
  {id:`${q.id}-big`,latex:`${small}+${q.difference}=${big}\\text{（${q.unit}）}`,comment:`${q.larger}的数量`}];
 const prepCount=q.prep?1:0;
 const isDivPrep = !!q.prep?.formula.includes("\\div");
 return {id:q.id,modeLabel:label,bookPart:"A版",tier:q.tier,sectionId:`discovery-${q.group}`,sectionKind:q.kind,questionNo:q.number,title:label,subtitle:"先找和与差，再画图想一想。",defaultParams:{},paramDefs:[],build:()=>({problemStatement:q.statement,formulas,steps:teachingSteps([
  {
   title:q.prep?q.prep.question:"先观察：谁多出的部分在哪里？",
   narration:q.prep?q.prep.prompt:`看一看${q.larger}和${q.smaller}的${q.context}，两人合起来是多少？谁比谁多？`,
   sceneState:scene(0),
   liveStats:[
    {label:"两数之和",value:isDivPrep?"?":`${q.total} ${q.unit}`,tone:isDivPrep?"coral":"default"},
    {label:"两数之差",value:q.prep&&!isDivPrep?"?":`${q.difference} ${q.unit}`,tone:q.prep&&!isDivPrep?"coral":"default"},
   ],
   ...(q.prep?{checkpoint:numberCheckpoint(q.prep.question,q.prep.answer,` ${q.prep.unit}`,q.prep.explanation)}:{}),
  },
  {
   title:"拿掉多出的部分，合起来还剩多少？",
   narration:`${q.prep?`${q.prep.explanation} `:""}两人的和是 ${q.total} ${q.unit}，相差 ${q.difference} ${q.unit}。暂时拿掉多出的部分，还剩多少？`,
   sceneState:scene(1),
   activeFormulaIndices:q.prep?[0]:[],
   liveStats:[
    {label:"两数之和",value:`${q.total} ${q.unit}`},
    {label:"两数之差",value:`${q.difference} ${q.unit}`},
    {label:"拿掉差后还剩",value:`? ${q.unit}`,tone:"coral"},
   ],
   checkpoint:numberCheckpoint("剩下两份一共是多少？",equal,` ${q.unit}`,"从总和里减掉多出的部分。"),
  },
  {
   title:`把剩下的平均分成两份，${q.smaller}是多少？`,
   narration:`拿掉多出的部分后还剩 ${equal} ${q.unit}。把它平均分成一样多的两份，每份是多少？`,
   sceneState:scene(2),
   activeFormulaIndices:Array.from({length:prepCount+1},(_,i)=>i),
   liveStats:[
    {label:"剩下两份共",value:`${equal} ${q.unit}`,tone:"teal"},
    {label:q.smaller,value:`? ${q.unit}`,tone:"coral"},
    {label:q.larger,value:`? ${q.unit}`},
   ],
   checkpoint:numberCheckpoint(`${q.smaller}是多少？`,small,` ${q.unit}`,"两份一样多，平均分成两份。"),
  },
  {
   title:`把多出的部分接回去，${q.larger}是多少？`,
   narration:`${q.smaller}是 ${small} ${q.unit}。${q.larger}比${q.smaller}多 ${q.difference} ${q.unit}，接回去是多少？`,
   sceneState:scene(3),
   activeFormulaIndices:Array.from({length:prepCount+2},(_,i)=>i),
   liveStats:[
    {label:q.smaller,value:`${small} ${q.unit}`,tone:"teal"},
    {label:"多出部分",value:`${q.difference} ${q.unit}`},
    {label:q.larger,value:`? ${q.unit}`,tone:"coral"},
   ],
   checkpoint:numberCheckpoint(`${q.larger}是多少？`,big,` ${q.unit}`,"在一样多的部分上加回多出的部分。"),
  },
  {
   title:"揭晓答案，一起验算",
   narration:`${q.smaller}是 ${small} ${q.unit}，${q.larger}是 ${big} ${q.unit}。验算：${small} + ${big} = ${q.total}，${big} − ${small} = ${q.difference}。`,
   sceneState:scene(4),
   activeFormulaIndices:formulas.map((_,i)=>i),
   liveStats:[
    {label:q.smaller,value:`${small} ${q.unit}`,tone:"teal"},
    {label:q.larger,value:`${big} ${q.unit}`,tone:"coral"},
    {label:"和与差验算",value:`${q.total} / ${q.difference}`},
   ],
   tipBody:"和减去差，平均分；小的加上差，找到大的。",
  },
 ])})};
}
const ageQuestion:LessonVariant={
 id:"d2-q3",modeLabel:"我要练一练 2 · 第 3 题",bookPart:"A版",tier:"standard",sectionId:"discovery-2",sectionKind:"practice",questionNo:3,title:"我要练一练 2 · 第 3 题",subtitle:"先找今年的年龄和，再看每年增加多少。",defaultParams:{},paramDefs:[],build:()=>{
 const scene=(phase:number)=>({kind:"combo-visual" as const,mode:"make-ten" as const,annotation:"每过一年，两个人各长一岁",cards:[{id:"a",text:"壮壮 8岁",tone:"coral" as const},{id:"b",text:"豆豆 14岁",tone:"teal" as const}],rows:[{label:"今年年龄和",badge:phase>=1?"22岁":"?",active:phase===0},{label:"年龄和还要增加",badge:phase>=2?"24岁":"?",active:phase===1},{label:"年龄和每年增加",badge:phase>=3?"2岁":"?",active:phase===2},{label:"经过多少年",badge:phase>=4?"12年":"?",active:phase===3}]});
 return {problemStatement:"今年壮壮8岁，豆豆14岁，多少年后两人的年龄之和为46岁？",formulas:[{id:"age-sum",latex:"8+14=22\\text{（岁）}"},{id:"age-gap",latex:"46-22=24\\text{（岁）}"},{id:"age-per-year",latex:"1+1=2\\text{（岁）}"},{id:"age-years",latex:"24\\div2=12\\text{（年）}"}],steps:teachingSteps([
 {title:"先算今年，两人年龄加起来是多少？",narration:"今年壮壮 8 岁，豆豆 14 岁。先算出今年的年龄和，看看离目标还差多少。",sceneState:scene(0),liveStats:[{label:"目标年龄和",value:"46 岁"},{label:"今年年龄和",value:"? 岁",tone:"coral"}],checkpoint:numberCheckpoint("今年两人的年龄和是多少？",22," 岁","把两个人今年的年龄相加。")},
 {title:"离 46 岁还差多少？",narration:"今年两人的年龄和是 22 岁。要到 46 岁，年龄和还要增加多少岁？",sceneState:scene(1),activeFormulaIndices:[0],liveStats:[{label:"今年年龄和",value:"22 岁",tone:"teal"},{label:"还要增加",value:"? 岁",tone:"coral"}],checkpoint:numberCheckpoint("年龄和还要增加多少岁？",24," 岁","用 46 减去今年的年龄和。")},
 {title:"每过一年，两人的年龄和会增加几岁？",narration:"年龄和还要增加 24 岁。注意哦，每过一年，壮壮和豆豆各长 1 岁，合起来增加几岁？",sceneState:scene(2),activeFormulaIndices:[0,1],liveStats:[{label:"还要增加",value:"24 岁",tone:"teal"},{label:"每年增加",value:"? 岁",tone:"coral"}],checkpoint:numberCheckpoint("两人的年龄和每年增加几岁？",2," 岁","把两个人每年长的岁数加起来。")},
 {title:"每年合起来长 2 岁，要经过多少年？",narration:"年龄和还要增加 24 岁，每年增加 2 岁。需要多少年？",sceneState:scene(3),activeFormulaIndices:[0,1,2],liveStats:[{label:"还要增加",value:"24 岁"},{label:"每年增加",value:"2 岁"},{label:"经过年数",value:"? 年",tone:"coral"}],checkpoint:numberCheckpoint("需要经过多少年？",12," 年","24 岁平均每年增加 2 岁。")},
 {title:"揭晓答案，代回去验算",narration:"12年后，壮壮20岁，豆豆26岁，年龄和是46岁（20 + 26 = 46）。",sceneState:scene(4),activeFormulaIndices:[0,1,2,3],liveStats:[{label:"经过年数",value:"12 年",tone:"teal"},{label:"12年后年龄",value:"20岁 / 26岁"}],tipBody:"两人每年各长一岁，年龄和每年增加两岁。"},
 ])};
 }};
export const sumDiffLesson:MathLesson={id:"sum-diff",chapterId:"g2-transform-thinking",chapterTitle:"05. 转化思维训练",grade:2,gradeLabel:"二年级",weekLabel:"p.40",title:"和差问题",summary:"从两数的和与差出发，先把多出的部分拿掉，再平均分。",engine:"segment-bar",keywords:["二年级","和差问题","年龄差","线段图"],editionMappings:[{edition:"doubanjiang",grade:2,gradeLabel:"二年级",chapterTitle:"05. 转化思维训练",weekLabel:"p.40"}],sections:[{id:"discovery-1",title:"小例题大发现 1",subtitle:"例题及六道练习",pageRange:"p.40–42"},{id:"discovery-2",title:"小例题大发现 2",subtitle:"例题及已提供的前三道练习",pageRange:"p.43–44"}],variants:[...questions.map(createQuestion),ageQuestion]};
