import { teachingSteps } from "../teachingSteps";
import type { BookSectionKind, BookVisualSceneState, DifficultyTier, LessonVariant, MathLesson } from "../../types/lesson";

type MirrorQuestion = {
  id: string; number?: number; part?: number; kind: BookSectionKind; tier: DifficultyTier;
  statement: string; mode: BookVisualSceneState["mode"]; digits?: string; hour?: number; minute?: number; mirrorGiven?: boolean;
  focus: string; step2Tip: string; question: string; options: string[]; correct: number; result: string; hint: string;
};
const questions: MirrorQuestion[] = [
  { id:"example",kind:"example",tier:"base",statement:"下面是在镜子里看到的一个两位数，这个两位数原来是多少？",mode:"digits",digits:"54",focus:"镜子里有两个反过来的数字，先别急着读，仔细看看它们各自的形状。",step2Tip:"第一步先把每个数字左右翻回来（是 4 和 5），第二步再把十位和个位的左右位置翻回来！",question:"原来的两位数是多少？",options:["54","45","44"],correct:0,result:"原来的两位数是54。",hint:"每个数字要翻回来，数字的左右顺序也要翻回来。" },
  { id:"q1-1",number:1,part:1,kind:"warmup",tier:"base",statement:"小女孩在照镜子，哪个镜子里的图像是正确的？在正确的图像下的口里画“√”。",mode:"girl",focus:"看看小女孩伸出的腿在画面的哪一边，镜子里的她会和她面对面照镜子。",step2Tip:"小女孩向右伸出腿，镜子里对称过去，那条腿应该在画面的哪一边？",question:"小女孩正确的镜像在左边还是右边？",options:["左边","右边"],correct:0,result:"小女孩正确的镜像在左边。",hint:"观察伸出的腿在画面的哪一侧，左右对称过去在左边。" },
  { id:"q1-2",number:1,part:2,kind:"warmup",tier:"base",statement:"小猪在照镜子，哪个镜子里的图像是正确的？在正确的图像下的口里画“√”。",mode:"pig",focus:"小猪在镜子前趴着，注意看小猪的头和尾巴分别朝向哪一边。",step2Tip:"小猪的头朝左、尾巴朝右，在镜子里的图像方向会正好左右反过来。",question:"小猪正确的镜像在左边还是右边？",options:["左边","右边"],correct:1,result:"小猪正确的镜像在右边。",hint:"观察猪头与尾巴的方向是否左右互换。" },
  { id:"q2",number:2,kind:"warmup",tier:"base",statement:"在镜子里看到下图所示的图像，那么镜子前小兔在小鸭的______边。",mode:"animals",focus:"镜子里显示“小兔在左边、小鸭在右边”，记住这幅图是从镜子里看到的哦。",step2Tip:"整幅画面左右位置也要一起翻转！镜子里小兔在左，回到镜子前小兔就在……",question:"镜子前小兔在小鸭的哪一边？",options:["左边","右边"],correct:1,result:"镜子前小兔在小鸭的右边。",hint:"整幅画面左右位置会交换，所以镜子前小兔在小鸭的右边。" },
  { id:"q3",number:3,kind:"warmup",tier:"base",statement:"下图是在镜子里看到的图像，那么原来的数是______。",mode:"digits",digits:"367",focus:"镜中有三个倒过来的数字，先逐个认出它们原来是几，再调整顺序。",step2Tip:"先看单个数字翻回来分别是 7、6、3，再把整个三位数左右翻回来！",question:"原来的数是多少？",options:["763","367","376"],correct:1,result:"原来的数是367。",hint:"把整个镜像左右翻回来，从左往右读是 367。" },
  { id:"q4",number:4,kind:"practice",tier:"standard",statement:"下图是在镜子里看到的钟表，现实中这个钟表的时间是______。",mode:"clock",hour:10,minute:30,mirrorGiven:true,focus:"这是镜子里的钟表！分针指在正下方（6 的位置），时针指向镜中右上方的两格之间。",step2Tip:"分针指在 6（30 分）上下不变；把表盘左右翻回来，时针正好在 10 和 11 之间！",question:"现实中的钟表是几时几分？",options:["10:30","1:30","11:30"],correct:0,result:"现实中的钟表显示10时30分。",hint:"镜面里数字和指针都左右反过来，翻回来时针在 10 和 11 之间，是 10:30。" },
  { id:"q5",number:5,kind:"practice",tier:"standard",statement:"下面左图是现实中的钟表上的时间，在镜子里看到的钟表上的时间应该是怎样的？请画到下面右图的钟表上。",mode:"clock",hour:9,minute:0,mirrorGiven:false,focus:"现实中的钟表是 9:00：长针（分针）朝正上方指 12，短针（时针）朝正左方指 9。",step2Tip:"沿竖直镜面翻过去：正上方的长针还在正上方，朝左的短针会朝向哪边？",question:"镜像中短针和长针分别朝哪里？",options:["短针向右，长针向上","短针向左，长针向下","短针向左，长针向上"],correct:0,result:"镜中短针向右，长针向上；钟面数字也左右翻转。",hint:"长针在竖直线上不动，短针从向左翻成向右。" },
];
function createQuestion(q: MirrorQuestion): LessonVariant {
  const label=q.kind === "example" ? "小例题大发现" : `第 ${q.number} 题${q.part ? `（${q.part}）` : ""}`;
  const scene=(phase:number):BookVisualSceneState=>({kind:"book-visual",mode:q.mode,phase,digits:q.digits,hour:q.hour,minute:q.minute,mirrorGiven:q.mirrorGiven,answerText:phase===3?q.result:undefined});
  return {id:q.id,modeLabel:label,bookPart:"A版",tier:q.tier,sectionId:"discovery",sectionKind:q.kind,questionNo:q.number,questionPart:q.part,title:label,subtitle:"仔细看图，先猜一猜，再翻转验证。",defaultParams:{},paramDefs:[],build:()=>({
    problemStatement:q.statement,
    formulas:[{id:`${q.id}-rule`,latex:"\\text{镜像左右翻转，上下位置不变}",comment:"把整幅画面沿竖直方向翻转"}],
    steps:teachingSteps([
      {
        title:"先看一看，图中有哪些线索？",
        narration:q.focus,
        sceneState:scene(0),
        liveStats:[{label:"关键任务",value:"沿竖直镜面翻转",tone:"coral"},{label:"结果",value:"?"}],
      },
      {
        title:"照镜子时，左右和上下会怎样变化？",
        narration:"想象把图画沿竖直的镜面翻过去，左右位置和上下位置会怎样变化？",
        sceneState:scene(1),
        liveStats:[{label:"镜面规律",value:"左右相反，上下不变"}],
        checkpoint:{question:"竖直镜面里的图像有什么变化？",options:["左右相反，上下不变","上下相反，左右不变","左右上下都不变"],correctIndex:0,feedbackCorrect:"对，镜像与原图左右对应，上下位置不变。",feedbackWrong:"试着把画纸沿竖直线对折。"},
      },
      {
        title:q.question,
        narration:`${q.step2Tip} ${q.question}`,
        sceneState:scene(2),
        liveStats:[{label:"镜面规律",value:"左右相反，上下不变"},{label:"待求答案",value:"?",tone:"coral"}],
        checkpoint:{question:q.question,options:q.options,correctIndex:q.correct,feedbackCorrect:`答对了！${q.hint}`,feedbackWrong:`再想想。${q.hint}`},
      },
      {
        title:"揭晓答案，翻回去检查",
        narration:`${q.result}${q.hint}`,
        sceneState:scene(3),
        activeFormulaIndices:[0],
        liveStats:[{label:"镜面规律",value:"左右相反，上下不变"},{label:"答案",value:q.options[q.correct],tone:"teal"}],
        tipBody:"先看单个物体的朝向，再看整体的左右顺序。",
      },
    ])
  })};
}
export const g2MirrorClockLesson:MathLesson={id:"g2-mirror-clock",chapterId:"g2-visual-thinking",chapterTitle:"04. 形象思维训练",grade:2,gradeLabel:"二年级",weekLabel:"p.32",title:"镜面问题",summary:"按书中例题与练习，观察镜像中的数字、位置和钟表。",engine:"mirror-clock",keywords:["二年级","镜面问题","形象思维","镜子时钟"],editionMappings:[{edition:"doubanjiang",grade:2,gradeLabel:"二年级",chapterTitle:"04. 形象思维训练",weekLabel:"p.32"}],sections:[{id:"discovery",title:"小例题大发现",subtitle:"例题及五道练习",pageRange:"p.32–34"}],variants:questions.map(createQuestion)};
