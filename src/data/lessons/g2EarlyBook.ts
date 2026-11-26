import { numberCheckpoint, teachingSteps } from "../teachingSteps";
import type { BookSectionKind, DifficultyTier, EarlyBookSceneState, LessonVariant, LiveStat, MathLesson } from "../../types/lesson";

type QueueSegments = EarlyBookSceneState["queueSegments"];
type WellSpec = EarlyBookSceneState["wellSpec"];
type BusSpec = EarlyBookSceneState["busSpec"];
type StairsSpec = EarlyBookSceneState["stairsSpec"];
type TreesSpec = EarlyBookSceneState["treesSpec"];
type Entry = {
  number?:number; statement:string; facts:string[]; middleQuestion:string; middle:number; middleUnit:string; middleFormula:string;
  finalQuestion:string; answer:number; unit:string; finalFormula:string; result:string; explanation:string; tip:string;
  alternate?:string[]; queueSegments?:QueueSegments; wellSpec?:WellSpec; busSpec?:BusSpec; stairsSpec?:StairsSpec; treesSpec?:TreesSpec;
};
function makeVariant(entry:Entry,mode:EarlyBookSceneState["mode"],kind:BookSectionKind):LessonVariant {
  const tier:DifficultyTier=kind==="challenge"?"challenge":kind==="practice"?"standard":"base";
  const label=entry.number===undefined?"小例题大发现":`我要练一练 · 第 ${entry.number} 题`;
  const id=entry.number===undefined?"example":`q${entry.number}`;
  const formulas=[{id:`${id}-1`,latex:entry.middleFormula,comment:entry.explanation},{id:`${id}-2`,latex:entry.finalFormula,comment:entry.result},...(entry.alternate??[]).map((latex,i)=>({id:`${id}-alt-${i}`,latex,comment:"另一种方法"}))];
  const subject=mode==="bus"?(entry.statement.includes("电脑")?"电脑":entry.statement.includes("舞蹈")?"舞蹈队":entry.statement.includes("水果")?"水果":"公交车"):mode==="well"?(entry.statement.includes("毛毛虫")?"毛毛虫":entry.statement.includes("壮壮")?"台阶":entry.statement.includes("小雅")?"跳格子":entry.statement.includes("表演者")?"舞台":"蜗牛"):mode==="trees"?(entry.statement.includes("气球")?"气球":entry.statement.includes("盆花")?"花":entry.statement.includes("彩旗")?"彩旗":"树"):undefined;
  const finalDisplay=mode==="well"&&entry.number===4?"第一只先到":mode==="well"&&entry.number===5?"小艾先到":`${entry.answer} ${entry.unit}`;
  const isComparison=mode==="well"&&(entry.number===4||entry.number===5);
  const modeHint: Record<EarlyBookSceneState["mode"], string> = {
    queue: "先画图看清谁在前面、谁在后面，别忘了把自己也数进去哦！",
    bus: "分清楚每一次是变多了（上车/运来/加入）还是变少了（下车/卖出/毕业）！",
    stairs: "注意：从 1 楼走到几楼，关键要数中间有几段楼梯（间隔）！",
    well: "想一想：没到终点前会前进再后退，最后一次到达终点后还会退吗？",
    trees: "先分清楚两端栽不栽，数一数树（物体）和间隔谁多 1、谁少 1！",
  };
  const middleTag =
    entry.middleQuestion.replace(/[？?].*$/, "").slice(0, 12) || "第一步";
  const scene=(phase:number,comparison=false):EarlyBookSceneState=>({kind:"early-book",mode,subject,comparison,phase,facts:entry.facts,middleLabel:middleTag,middleValue:`${entry.middle} ${entry.middleUnit}`,finalValue:finalDisplay,queueSegments:entry.queueSegments,wellSpec:entry.wellSpec,busSpec:entry.busSpec,stairsSpec:entry.stairsSpec,treesSpec:entry.treesSpec});
  const stats=(phase:number):LiveStat[]=>[
    {label:"已知条件",value:entry.facts[0] ?? "见题干"},
    {label:"第一步",value:phase>=2?`${entry.middle} ${entry.middleUnit}`:"?",tone:phase===1?"coral":phase>=2?"teal":"default"},
    {label:"最后结果",value:phase>=3?finalDisplay:"?",tone:phase===2?"coral":phase>=3?"teal":"default"},
  ];
  return {id,modeLabel:label,bookPart:tier==="challenge"?"B版":"A版",tier,sectionId:"discovery",sectionKind:kind,questionNo:entry.number,title:label,subtitle:"读题后先想一想，再一步步验证。",defaultParams:{},paramDefs:[],build:()=>({
    problemStatement:entry.statement,formulas,
    steps:teachingSteps([
      {title:`先读题：抓住「${entry.facts[0] ?? "关键条件"}」想一想！`,narration:`${modeHint[mode]} 先找出已知条件，想一想第一步要先算什么？`,sceneState:scene(0),liveStats:stats(0)},
      {title:entry.middleQuestion,narration:`结合右边的条件卡片，先自己算一算：${entry.middleQuestion}`,sceneState:scene(1),liveStats:stats(1),checkpoint:numberCheckpoint(entry.middleQuestion,entry.middle,` ${entry.middleUnit}`,"回到题目找对应的条件。")},
      {title:entry.finalQuestion,narration:`${entry.explanation} 得到 ${entry.middle} ${entry.middleUnit}。${entry.finalQuestion}`,sceneState:scene(2),activeFormulaIndices:[0],liveStats:stats(2),checkpoint:numberCheckpoint(entry.finalQuestion,entry.answer,` ${entry.unit}`,"利用刚刚找到的结果。")},
      ...(isComparison?[{title:entry.number===4?"哪只蜗牛先到井口？":"谁先到达目的地？",narration:`两次计算分别得到 ${entry.middle} ${entry.middleUnit}和 ${entry.answer} ${entry.unit}。比较一下，谁先到？`,sceneState:scene(2,true),activeFormulaIndices:[0,1],liveStats:[{label:"第一次数",value:`${entry.middle} ${entry.middleUnit}`},{label:"第二次数",value:`${entry.answer} ${entry.unit}`},{label:"谁先到",value:"?",tone:"coral" as const}],checkpoint:{question:entry.number===4?"哪只蜗牛先到井口？":"谁先到达目的地？",options:entry.number===4?["第一只蜗牛","第二只蜗牛"]:["小艾","小雅"],correctIndex:0,feedbackCorrect:"答对了！比较到达前需要的次数，就能判断先后。",feedbackWrong:"再比较一下两次计算得到的数字。"}}]:[]),
      {title:"揭晓答案，回头检查",narration:entry.result,sceneState:scene(3),activeFormulaIndices:formulas.map((_,i)=>i),liveStats:stats(3),tipBody:entry.tip},
    ])
  })};
}
function buildLesson(id:string,title:string,chapterId:string,chapterTitle:string,page:string,mode:EarlyBookSceneState["mode"],entries:Entry[],warmup:number,practice:number):MathLesson {
  const lastPage={queue:"5",bus:"8",stairs:"13",well:"16",trees:"19"}[mode];
  return {id,chapterId,chapterTitle,grade:2,gradeLabel:"二年级",weekLabel:`p.${page}`,title,summary:`按原书例题与练习，一步步理解${title}。`,engine:"early-book",keywords:["二年级",title],editionMappings:[{edition:"doubanjiang",grade:2,gradeLabel:"二年级",chapterTitle,weekLabel:`p.${page}`}],sections:[{id:"discovery",title:"小例题大发现",subtitle:`例题及${entries.length-1}道练习`,pageRange:`p.${page}–${lastPage}`}],variants:entries.map((q,i)=>makeVariant(q,mode,i===0?"example":i<=warmup?"warmup":i<=practice?"practice":"challenge"))};
}
const item=(statement:string,facts:string[],middleQuestion:string,middle:number,middleUnit:string,middleFormula:string,finalQuestion:string,answer:number,unit:string,finalFormula:string,result:string,explanation:string,tip:string,alternate?:string[],queueSegments?:QueueSegments,wellSpec?:WellSpec,busSpec?:BusSpec,stairsSpec?:StairsSpec,treesSpec?:TreesSpec):Entry=>({statement,facts,middleQuestion,middle,middleUnit,middleFormula,finalQuestion,answer,unit,finalFormula,result,explanation,tip,alternate,queueSegments,wellSpec,busSpec,stairsSpec,treesSpec});
const numbered=(items:Entry[])=>items.map((q,i)=>({...q,number:i===0?undefined:i}));
const queue=numbered([
 item("童太奇在车站售票处买车票，售票处排了两支人数一样的队伍。在童太奇所在的这一队里，童太奇前面有4人，后面有4人。这两队一共有多少人？",["前面4人，后面4人","两队人数一样"],"童太奇这一队有多少人？",9,"人","4+1+4=9","两队一共有多少人？",18,"人","9\\times2=18","这一队9人，两队一共18人。","前面、本人、后面都要数。","前后加本人，每队再合并。",undefined,{before:4,target:"奇",after:4,teams:2}),
 item("二（2）班学生排队测试短跑，一共排了3队，每队人数都一样。军军在其中一支队伍中，他前面有6名同学，后面有8名同学。二（2）班一共有多少名学生？",["前面6人，后面8人","一共3队，每队一样"],"军军所在队伍有多少人？",15,"人","6+1+8=15","全班一共有多少人？",45,"人","15\\times3=45","每队15人，3队共有45人。","前后人数之外还要加上军军。","前后加本人，再乘队伍数。",undefined,{before:6,target:"军",after:8,teams:3}),
 item("豆豆和朋友们排成一队做游戏，一共有18人，从前往后数，豆豆排在第5位。从后往前数，豆豆排在第几位？",["一共18人","从前数第5位"],"豆豆后面有多少人？",13,"人","18-5=13","从后往前数豆豆排第几位？",14,"位","13+1=14","豆豆后面有13人，从后数豆豆排第14位。","从前数第5位包含豆豆本人。","后面的人数加本人，就是从后数的位次。",undefined,{before:4,target:"豆",after:13,hideAfter:true,reverseCount:true}),
 item("课间，二（1）班的学生排队做操，每队人数都一样。小浩在其中一支队伍中，他的前面和后面都有6名同学，小浩的左边和右边各有1名同学。二（1）班一共有多少名学生？",["前后各6人","左边右边各有1人"],"小浩所在的队伍有多少人？",13,"人","6+1+6=13","3支队伍共有多少人？",39,"人","13\\times3=39","小浩所在队有13人，左右各一队，共3队、39人。","前后加本人，得到一队的人数。","每队人数乘队伍数。",undefined,{before:6,target:"浩",after:6,teams:3}),
 item("二（2）班的学生在排队体检，壮壮和小艾所在的这队一共有25人，从前往后数壮壮排第8，从后往前数小艾排第8。壮壮和小艾中间隔了几人？",["一队25人","壮壮从前第8","小艾从后第8"],"从前往后数，小艾排第几位？",18,"位","25-8+1=18","壮壮和小艾中间隔了几人？",9,"人","18-8-1=9","小艾从前排第18位，两人中间隔9人。","从后数的位置包含小艾本人。","两人位次相减，再减去一。",undefined,{before:7,target:"壮",between:9,secondTarget:"艾",after:7,hideBetween:true}),
 item("周末，小浩和同学们去动物园游玩。有两队人在门口排队检票，小浩所在队伍的人数比旁边的队伍多1人，小浩后面有5人，前面有4人。一共有多少人在门口排队检票？",["前面4人，后面5人","这队比旁边多1人"],"小浩所在队有多少人？",10,"人","4+1+5=10","两队一共有多少人？",19,"人","10+(10-1)=19","小浩一队10人，旁边一队9人，两队共19人。","小浩本人也要算进队伍。","先数一队，再找另一队。",undefined,{before:4,target:"浩",after:5,teams:2,teamDiff:-1}),
 item("小朋友排成一队做游戏，从前面数，小兰排在第4位，从后面数，小雅排在第5位，两人之间有5人。这一队一共有多少人？",["小兰从前第4","小雅从后第5","两人之间5人"],"小兰前面的部分连同中间的人，一共有多少人？",9,"人","4+5=9","这一队一共有多少人？",14,"人","9+5=14","从前到小兰4人，中间5人，从小雅到队尾5人，共14人。","第4位包含小兰本人。","从前一段、中间一段、从后一段相加。",undefined,{before:3,target:"兰",between:5,secondTarget:"雅",after:4}),
 item("班里的学生排队做广播体操，小浩站在最后一排，他的前面还有4排，每排人数都一样。小浩左边有5人，从小浩最右边往左数，他排在第4位。你知道班里一共有多少人吗？",["前面4排","左边5人，从右数第4","每排人数一样"],"小浩这一排有多少人？",9,"人","5+4=9","全班共有多少人？",45,"人","9\\times(4+1)=45","每排9人，共5排，全班45人。","从右数第4位包含小浩本人。","每排人数乘总排数。",undefined,{before:5,target:"浩",after:3,teams:5,reverseCount:true}),
 item("同学们排成方阵做课间操，每排人数都一样，豆豆发现自己前、后、左、右各有3人。这个方阵一共有多少人？",["前后各3人","左右各3人"],"豆豆所在的一排有多少人？",7,"人","3+1+3=7","方阵一共有多少人？",49,"人","7\\times7=49","每排7人，共7排，方阵一共有49人。","左右两边加上豆豆本人。","一排几人、几排，分别数清。",undefined,{before:3,target:"豆",after:3,teams:7,gridSquare:true}),
 item("将班里的45人平均分成5队做游戏。如果小艾前面有6人，那么小艾后面有多少人？",["45人平均分成5队","小艾前面6人"],"每队有多少人？",9,"人","45\\div5=9","小艾后面有多少人？",2,"人","9-6-1=2","每队9人，减去前面6人和小艾本人，后面还有2人。","总人数平均分成5队。","全队减前面，再减本人。",undefined,{before:6,target:"艾",after:2,hideAfter:true,teams:5}),
]);
const bus=numbered([
 item("下来了16人，又上去了23人。车上原来有38人，现在有多少人？",["原有38人","下车16人","上车23人"],"下车后车上还剩多少人？",22,"人","38-16=22","再上车23人，现在有多少人？",45,"人","22+23=45","下车后22人，上车后45人。","先从原有人数里去掉下车的人。","下车要减，上车要加。",["38+23-16=45","23-16+38=45"],undefined,undefined,{initial:"原有 38人",step1Label:"下车 −16",step1Dir:"out",step2Label:"上车 +23",step2Dir:"in",initialNum:38,step1Delta:-16,step2Delta:23,unit:"人"}),
 item("一辆大巴上有43人，中途有8人下车，又上来15人。现在车上有多少人？（用三种方法解答）",["原有43人","下车8人","上车15人"],"下车后还剩多少人？",35,"人","43-8=35","再上来15人，现在多少人？",50,"人","35+15=50","车上现在有50人。","原有43人减去下车的8人。","下车减，上车加。",["43+15-8=50","15-8+43=50"],undefined,undefined,{initial:"原有 43人",step1Label:"下车 −8",step1Dir:"out",step2Label:"上车 +15",step2Dir:"in",initialNum:43,step1Delta:-8,step2Delta:15,unit:"人"}),
 item("一辆公交车上原有乘客23人，在第一站下去7人，上来4人。现在车上有多少人？（用三种方法解答）",["原有23人","下车7人","上车4人"],"下车后还剩多少人？",16,"人","23-7=16","再上来4人，现在多少人？",20,"人","16+4=20","车上现在有20人。","先减去下车的人。","原有减下车，再加上车。",["23+4-7=20","23-(7-4)=20"],undefined,undefined,{initial:"原有 23人",step1Label:"下车 −7",step1Dir:"out",step2Label:"上车 +4",step2Dir:"in",initialNum:23,step1Delta:-7,step2Delta:4,unit:"人"}),
 item("某电脑专卖店有87台电脑，上午卖出19台，下午卖出26台，还剩下多少台？（用两种方法解答）",["原有87台","上午卖出19台","下午卖出26台"],"两次一共卖出多少台？",45,"台","19+26=45","还剩多少台？",42,"台","87-45=42","两次卖出45台，还剩42台。","把上午和下午卖出的数量合起来。","先合并卖出，再从原有数中减去。",["87-19-26=42"],undefined,undefined,{initial:"原有 87台",step1Label:"卖出 19+26",step1Dir:"out",step2Label:"从87减去",step2Dir:"out",initialNum:87,step1Delta:-19,step2Delta:-26,unit:"台"}),
 item("一辆公交车上原有乘客24人，在第一站下去8人，上来1人；在第二站下去9人，上来5人。此时车上有多少人？（用两种方法解答）",["原有24人","第一站下8上1","第二站下9上5"],"经过第一站后车上有多少人？",17,"人","24-8+1=17","经过第二站后车上有多少人？",13,"人","17-9+5=13","第一站后17人，第二站后13人。","从原有人数依次减下车、加上车。","按站计算，或者分别合并上下车人数。",["24-(8+9)+(1+5)=13"],undefined,undefined,{initial:"原有 24人",step1Label:"第1站 下8上1",step1Dir:"out",step2Label:"第2站 下9上5",step2Dir:"in",initialNum:24,step1Delta:-7,step2Delta:-4,unit:"人",twoStops:{s1Off:8,s1On:1,s2Off:9,s2On:5}}),
 item("学校舞蹈队中有12人毕业了，又新加入了23人。舞蹈队现在有77人。学校舞蹈队原来有多少人？（用两种方法解答）",["毕业12人","新加入23人","现在77人"],"先把新加入的人去掉，还剩多少人？",54,"人","77-23=54","再加回毕业的12人，原来多少人？",66,"人","54+12=66","舞蹈队原来有66人。","倒推时先减去后来加入的人。","倒推时反过来：先减加入，再加离开。",["77-(23-12)=66"],undefined,undefined,{initial:"现在 77人",step1Label:"退回新加 −23",step1Dir:"out",step2Label:"请回毕业 +12",step2Dir:"in",initialNum:77,step1Delta:-23,step2Delta:12,unit:"人",reverse:true}),
 item("水果店上午卖出28箱水果，下午又运来22箱水果，现在店内还剩45箱水果。水果店原来有多少箱水果？",["上午卖28箱","下午运来22箱","现在45箱"],"先去掉后来运来的22箱，还剩多少箱？",23,"箱","45-22=23","再加回卖出的28箱，原来多少箱？",51,"箱","23+28=51","水果店原来有51箱。","先把后来运来的数量去掉。","倒着想，运来改减，卖出改加。",undefined,undefined,undefined,{initial:"现在 45箱",step1Label:"退回运来 −22",step1Dir:"out",step2Label:"补回卖出 +28",step2Dir:"in",initialNum:45,step1Delta:-22,step2Delta:28,unit:"箱",reverse:true}),
]);
const stairs=numbered([
 item("奶奶爬楼梯，从一楼走到三楼用了4分钟。照这样的速度，奶奶从一楼走到六楼需要几分钟？",["1楼到3楼用4分钟","速度相同","求1楼到6楼"],"每组楼梯需要几分钟？",2,"分钟","4\\div(3-1)=2","从一楼到六楼需要几分钟？",10,"分钟","(6-1)\\times2=10","每组楼梯2分钟，爬5组需10分钟。","一楼到三楼有两组楼梯。","先数楼层间隔，再乘每组时间。",undefined,undefined,undefined,undefined,{from:1,to:3,targetFrom:1,targetTo:6,unit:"分钟"}),
 item("豆豆家住在三楼，他每上一层楼要走20级台阶。请问豆豆从一楼走到三楼要走多少级台阶？",["一楼到三楼","每组20级台阶"],"一楼到三楼有几组楼梯？",2,"组","3-1=2","一共走多少级台阶？",40,"级","2\\times20=40","一共走40级台阶。","数一楼到二楼、二楼到三楼。","数楼梯间隔，不直接数楼层。",undefined,undefined,undefined,undefined,{from:1,to:3,targetFrom:1,targetTo:3,unit:"级"}),
 item("壮壮从一楼走到二楼用了9秒。他用相同的速度从一楼走到八楼需要多少秒？",["每组用9秒","一楼到八楼"],"一楼到八楼有几组楼梯？",7,"组","8-1=7","一共需要多少秒？",63,"秒","7\\times9=63","一共需要63秒。","从一楼到八楼经过7个间隔。","楼层差是间隔数。",undefined,undefined,undefined,undefined,{from:1,to:2,targetFrom:1,targetTo:8,unit:"秒"}),
 item("李叔叔爬楼梯，从一楼走到四楼用了3分钟。照这样的速度，李叔叔从一楼走到五楼需要几分钟？",["1楼到4楼用3分钟","速度相同"],"每组楼梯需要几分钟？",1,"分钟","3\\div(4-1)=1","一楼到五楼需要几分钟？",4,"分钟","(5-1)\\times1=4","每组1分钟，从一楼到五楼需要4分钟。","一楼到四楼有3组楼梯。","先求每组时间，再算目标间隔。",undefined,undefined,undefined,undefined,{from:1,to:4,targetFrom:1,targetTo:5,unit:"分钟"}),
 item("小艾和小浩住在同一幢楼，小艾住在三楼，小浩住在六楼。小艾从一楼走到家用了18秒。小浩用同样的速度从一楼走到家要多少秒？",["1楼到3楼用18秒","小浩住6楼","速度相同"],"每组楼梯需要多少秒？",9,"秒","18\\div(3-1)=9","小浩到六楼需要多少秒？",45,"秒","(6-1)\\times9=45","每组9秒，走5组需45秒。","从一楼到三楼要走两组。","楼层差乘每组所用时间。",undefined,undefined,undefined,undefined,{from:1,to:3,targetFrom:1,targetTo:6,unit:"秒"}),
 item("军军和小浩住在同一单元楼里，军军住8楼，小浩住6楼。小浩每天从一楼走到家要45秒。军军用和小浩一样的速度从一楼走到家需要多长时间？",["小浩住6楼，用45秒","军军住8楼","速度相同"],"每组楼梯需要多少秒？",9,"秒","45\\div(6-1)=9","军军到八楼需要多少秒？",63,"秒","(8-1)\\times9=63","每组9秒，军军走7组需要63秒。","小浩走了5组楼梯。","先求每组时间。",undefined,undefined,undefined,undefined,{from:1,to:6,targetFrom:1,targetTo:8,unit:"秒"}),
 item("小乌龟爬楼梯，从二楼爬到七楼用了45分钟。如果小乌龟用同样的速度从一楼爬到十楼，需要多长时间？",["2楼到7楼用45分钟","1楼到10楼","速度相同"],"每组楼梯需要几分钟？",9,"分钟","45\\div(7-2)=9","一楼到十楼需要几分钟？",81,"分钟","(10-1)\\times9=81","每组9分钟，爬9组需81分钟。","二楼到七楼是5个间隔。","不是从一楼出发，也要用终点减起点。",undefined,undefined,undefined,undefined,{from:2,to:7,targetFrom:1,targetTo:10,unit:"分钟"}),
 item("小兰从1楼走到5楼共花了36秒。照这样的速度，她从10楼走到18楼要花多少秒？",["1楼到5楼用36秒","10楼到18楼","速度相同"],"每组楼梯需要多少秒？",9,"秒","36\\div(5-1)=9","十楼到十八楼需要多少秒？",72,"秒","(18-10)\\times9=72","每组9秒，走8组需72秒。","一楼到五楼有4组。","用到达楼层减出发楼层。",undefined,undefined,undefined,undefined,{from:1,to:5,targetFrom:10,targetTo:18,unit:"秒"}),
 item("小浩和军军比赛爬楼梯，两人同时从一楼出发，小浩爬到第三层时，军军恰好爬到第二层。照这样的速度，小浩爬到第十三层时，军军爬到第几层？",["小浩到3楼，军军到2楼","同时从1楼出发","小浩到13楼"],"小浩到13楼时，军军爬了几组楼梯？",6,"组","(13-1)\\div2=6","军军到达第几层？",7,"层","6+1=7","小浩爬2组时军军爬1组；小浩到13层时军军到第7层。","同一时间内，小浩爬2组，军军爬1组。","先比间隔，再加起始楼层。",undefined,undefined,undefined,undefined,{from:1,to:3,targetFrom:1,targetTo:13,unit:"层"}),
 item("小雅和小兰两人参加爬楼梯比赛，两人同时从1楼出发，小雅爬到3楼时，小兰爬到了5楼。照这样的速度，小雅爬到9楼时，小兰爬到几楼？",["小雅到3楼，小兰到5楼","从1楼出发","小雅到9楼"],"小雅到9楼时，小兰爬了几组楼梯？",16,"组","(9-1)\\times2=16","小兰到达几楼？",17,"楼","16+1=17","同一时间小兰爬的间隔数是小雅的2倍，所以到17楼。","小雅爬2组时，小兰爬4组。","先比间隔数，最后加起始楼层。",undefined,undefined,undefined,undefined,{from:1,to:3,targetFrom:1,targetTo:9,unit:"楼"}),
]);
const well=numbered([
 item("一口井深6米，一只蜗牛从井底开始往上爬，它白天爬了2米，晚上又下滑1米。这只蜗牛第几天刚好可以爬到井口？",["井深6米","白天爬2米","晚上滑1米"],"没爬出井口的一个昼夜，实际升高多少米？",1,"米","2-1=1","蜗牛第几天爬到井口？",5,"天","(6-2)\\div1+1=5","前4天结束到4米，第5天白天爬到井口。","每个没有出井的昼夜上升1米。","最后一天爬出井口后不再下滑。",undefined,undefined,{total:6,up:2,down:1,unit:"米",vertical:true}),
 item("有一只蜗牛从井底往上爬，它白天往上爬4米，晚上下滑2米，在第五天刚好爬到井口。这口井深多少米？",["白天爬4米","晚上滑2米","第5天刚好到井口"],"前4天结束后，蜗牛到了多高？",8,"米","(4-2)\\times4=8","第五天白天再爬4米，井深多少米？",12,"米","8+4=12","前4天结束时爬到8米，第5天爬到12米。","前四个昼夜各上升2米。","最后一天只算白天向上。",undefined,undefined,{total:12,up:4,down:2,unit:"米",vertical:true,hideTotal:true}),
 item("毛毛虫练习爬树，每天白天爬上去3米，晚上又下滑1米。毛毛虫需要几天才能从树底爬上5米高的树顶？",["树高5米","白天爬3米","晚上滑1米"],"第一个昼夜结束后，毛毛虫在多高处？",2,"米","3-1=2","它第几天可以爬到树顶？",2,"天","2+3=5","第一夜后在2米处，第2天白天到树顶。","第一天没有到树顶，夜里要下滑1米。","到顶就停，不再下滑。",undefined,undefined,{total:5,up:3,down:1,unit:"米",vertical:true}),
 item("壮壮玩爬台阶的游戏，他每次爬3级台阶就往下退1级。照这样爬台阶，壮壮需要爬几次才能爬上第11级台阶？",["目标第11级","每次爬3级","之后退1级"],"没有到终点的一次前进和后退，实际前进几级？",2,"级","3-1=2","壮壮第几次爬到第11级？",5,"次","(11-3)\\div2+1=5","前4次各前进2级，第5次爬到第11级。","未到终点的一次前进后退相抵。","到达目标时不再计算后退。",undefined,undefined,{total:11,up:3,down:1,unit:"级",vertical:false}),
 item("有两只蜗牛同时掉进了一口20米深的井里，第一只蜗牛白天向上爬5米，晚上下滑2米；第二只蜗牛白天向上爬6米，晚上下滑4米。哪只蜗牛先爬到井口？",["井深20米","第一只：爬5米滑2米","第二只：爬6米滑4米"],"第一只蜗牛第几天爬到井口？",6,"天","(20-5)\\div(5-2)+1=6","第二只蜗牛第几天爬到井口？",8,"天","(20-6)\\div(6-4)+1=8","第一只第6天到井口，第二只第8天到井口，第一只先到。","第一只前5个昼夜各升高3米。","分别计算天数，再比较先后。",undefined,undefined,{total:20,up:5,down:2,unit:"米",vertical:true,secondRunner:{name:"第二只",total:20,up:6,down:4}}),
 item("小雅和小艾玩跳格子的游戏，小雅每次先往前跳4格再往后退2格，她的目的地是第12格。小艾每次先往前跳3格再往后退2格，她的目的地是第5格。如果两人往前跳一次所花的时间相同，往后退一次所花的时间也相同，且格子数不影响往前跳与往后退的时间，谁会先到达她的目的地？",["小雅前4后2，目标12格","小艾前3后2，目标5格","同方向每次用时相同"],"小雅要向前跳几次才能到达？",5,"次","(12-4)\\div(4-2)+1=5","小艾要向前跳几次才能到达？",3,"次","(5-3)\\div(3-2)+1=3","小雅向前跳5次，小艾向前跳3次；小艾先到。","小雅到达前先完成4次前进和后退。","分别数前进和后退次数，再比较。",undefined,undefined,{total:12,up:4,down:2,unit:"格",vertical:false,secondRunner:{name:"小艾",total:5,up:3,down:2}}),
 item("一个表演者在舞台上跳舞，舞台的两头相距10米，表演者沿着一条直线先向前跳4米再往后跳2米，如此反复地从舞台的一头跳到另一头，且表演者跳到舞台的另一头后不再后退。这个表演者在这个过程中一共跳了多少米？",["舞台长10米","向前4米，后退2米","到另一头后不再后退"],"表演者需要向前跳几次？",4,"次","(10-4)\\div(4-2)+1=4","前进与后退的路程加起来一共多少米？",22,"米","4\\times4+3\\times2=22","向前跳4次、后退3次，共跳22米。","先数到终点之前需要几次向前跳。","总路程把前进和后退都加起来。",undefined,undefined,{total:10,up:4,down:2,unit:"米",vertical:false}),
]);
const trees=numbered([
 item("在一条40米长的小路的一边栽树，每隔5米栽1棵树。如果小路的两端都栽树，那么一共要栽多少棵树？",["小路长40米","每隔5米一棵","两端都栽"],"这条小路分成几个间隔？",8,"个","40\\div5=8","两端都栽，一共几棵树？",9,"棵","8+1=9","共有8个间隔，两端都栽需9棵树。","用小路长除以每个间隔的长度。","两端都栽，棵数比间隔数多一。",undefined,undefined,undefined,undefined,undefined,{count:9,intervals:8,totalLength:40,gapLength:5,ask:"count",bothEnds:true,unit:"棵"}),
 item("在长48米的小路的一侧栽树，每隔6米栽1棵树，小路的两端都要栽树。这条小路上一共要栽多少棵树？",["小路长48米","每隔6米","两端都栽"],"一共有几个间隔？",8,"个","48\\div6=8","一共要栽多少棵树？",9,"棵","8+1=9","共有8个间隔，要栽9棵树。","48米按6米分成一样长的间隔。","两端都栽，间隔数加一。",undefined,undefined,undefined,undefined,undefined,{count:9,intervals:8,totalLength:48,gapLength:6,ask:"count",bothEnds:true,unit:"棵"}),
 item("在一条20米长的彩带上挂气球，从彩带的一端起，每隔5米挂1个气球，两端都要挂气球。这条彩带上一共要挂多少个气球？",["彩带长20米","每隔5米","两端都挂"],"一共有几个间隔？",4,"个","20\\div5=4","一共挂多少个气球？",5,"个","4+1=5","共有4个间隔，要挂5个气球。","用20米除以每隔5米。","两端都有，间隔数加一。",undefined,undefined,undefined,undefined,undefined,{count:5,intervals:4,totalLength:20,gapLength:5,ask:"count",bothEnds:true,unit:"个"}),
 item("在一条45米长的小路的一侧栽树，两端各栽了1棵树，一共栽了10棵树，相邻两棵树之间的距离相等。相邻两棵树之间的距离是多少？",["小路长45米","两端各一棵","一共10棵"],"10棵树之间一共有几个间隔？",9,"个","10-1=9","相邻两棵树之间的距离是多少米？",5,"米","45\\div9=5","10棵树有9个间隔，相邻树相距5米。","两端都栽时，间隔数比棵数少一。","先数间隔，再用总长除以间隔数。",undefined,undefined,undefined,undefined,undefined,{count:10,intervals:9,totalLength:45,gapLength:5,ask:"gap",bothEnds:true,unit:"米"}),
 item("在学校操场的一侧放花，每隔4米放1盆花，起点和终点各放了1盆花，一共放了10盆花。操场的这一侧长多少米？",["每隔4米一盆","起点终点各一盆","一共10盆"],"10盆花之间有几个间隔？",9,"个","10-1=9","操场这一侧长多少米？",36,"米","9\\times4=36","10盆花有9个间隔，一侧长36米。","两端都有花，间隔数比盆数少一。","先求间隔数，再乘间隔长度。",undefined,undefined,undefined,undefined,undefined,{count:10,intervals:9,totalLength:36,gapLength:4,ask:"total",bothEnds:true,unit:"米"}),
 item("如图，在一条长48米的公路的一侧插彩旗，起点和终点都没插彩旗，一共插了5面彩旗，相邻两面彩旗之间的距离相等。相邻两面彩旗之间的距离是多少米？",["公路长48米","两端不插旗","共5面旗"],"若按图示把两端空隙也看成相等，一共有几个间隔？",6,"个","5+1=6","在这一图示假设下，相邻旗子相距多少米？",8,"米","48\\div6=8","若两端空隙也与旗间距相等，相邻彩旗相距8米。题干本身没有明确说明两端空隙相等。","按图示假设，两端空隙也各算一个相等间隔。","两端不插时，要确认两端空隙是否与旗间距相等。",undefined,undefined,undefined,undefined,undefined,{count:5,intervals:6,totalLength:48,gapLength:8,ask:"gap",bothEnds:false,noEnds:true,unit:"米"}),
 item("在一条45米长的马路的一边种树，每隔5米种1棵树。如果两端都不种树，那么一共需要种多少棵树？",["马路长45米","每隔5米","两端都不种"],"整条路有几个5米的间隔？",9,"个","45\\div5=9","两端都不种，需要多少棵树？",8,"棵","9-1=8","共有9个间隔，两端不种需要8棵树。","用总长度除以每个间隔的长度。","两端都不种，间隔数减一。",undefined,undefined,undefined,undefined,undefined,{count:8,intervals:9,totalLength:45,gapLength:5,ask:"count",bothEnds:false,noEnds:true,unit:"棵"}),
]);
export const queueBookLesson=buildLesson("g2-queue-overlap","排队问题","g2-overall-thinking","01. 整体思维训练","2","queue",queue,3,6);
export const busBookLesson=buildLesson("g2-bus-ride","乘车问题","g2-overall-thinking","01. 整体思维训练","6","bus",bus,2,4);
export const stairsBookLesson=buildLesson("g2-intervals","爬楼问题","g2-correspondence-thinking","02. 对应思维训练","10","stairs",stairs,3,7);
export const wellBookLesson=buildLesson("g2-well-climb","爬井问题","g2-correspondence-thinking","02. 对应思维训练","14","well",well,2,5);
export const treesBookLesson=buildLesson("tree-planting","植树问题","g2-correspondence-thinking","02. 对应思维训练","17","trees",trees,2,4);
