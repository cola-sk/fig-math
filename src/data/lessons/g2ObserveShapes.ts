import { teachingSteps } from "../teachingSteps";
import type { BookSectionKind, BookVisualSceneState, DifficultyTier, LessonVariant, MathLesson } from "../../types/lesson";

type ObserveQuestion = {
 id:string; number?:number; part?:number; kind:BookSectionKind; tier:DifficultyTier; statement:string;
 mode:BookVisualSceneState["mode"]; viewLabel:string; grid?:number[][]; givenGrid?:number[][];
 focus:string; step2Tip:string; question:string; options:string[]; correct:number; result:string; hint:string;
};
const questions:ObserveQuestion[]=[
 {id:"example",kind:"example",tier:"base",statement:"观察下面的圆柱与正方体，从正面看，它们分别是什么图形？请你动手画一画吧！",mode:"solid-example",viewLabel:"从正面水平看",focus:"把视线放到物体正前方，保持水平观察圆柱和正方体。",step2Tip:"从正面水平看过去，竖着的圆柱顶部圆面看不到，只能看到直直的侧面轮廓。",question:"从正面看，圆柱和正方体分别是什么图形？",options:["长方形、正方形","圆形、正方形","圆形、长方形"],correct:0,result:"圆柱从正面看是长方形，正方体从正面看是正方形。",hint:"竖着的圆柱正面看到的是长方形，正方体每个面都是正方形。"},
 {id:"q1",number:1,kind:"warmup",tier:"base",statement:"下列立体图形从侧面看分别是什么图形？连一连。",mode:"solid-q1",viewLabel:"从侧面看",focus:"注意这次是从物体的侧面观察：圆柱横着放，旁边是正方体和长方体。",step2Tip:"横放的圆柱从侧面看时，正好正对着它的圆形底面！",question:"从侧面看，圆柱、正方体、长方体依次是什么图形？",options:["圆形、正方形、长方形","长方形、正方形、圆形","圆形、长方形、正方形"],correct:0,result:"横放圆柱的侧面是圆形，正方体是正方形，长方体是长方形。",hint:"这根圆柱横着放，从侧面看正好看到圆形端面。"},
 {id:"q2-1",number:2,part:1,kind:"warmup",tier:"base",statement:"观察下面的立体图形，按要求答题。（1）这是从______面看到的。（填“正”“侧”或“上”）",mode:"solid-q2",viewLabel:"判断观察方向",givenGrid:[[1],[1]],focus:"题目给出的是上下叠在一起的两个正方形，试着从正、侧、上三个方向比一比。",step2Tip:"从哪个方向看过去，左边一列有两层高，而右边的方块被遮住了？",question:"这个上下两格的图是从哪一面看到的？",options:["正面","侧面","上面"],correct:1,result:"这是从侧面看到的。",hint:"从侧面看时，左右排成一排的方块重合在一起，只看到上下两格。"},
 {id:"q2-2",number:2,part:2,kind:"warmup",tier:"base",statement:"观察下面的立体图形，按要求答题。（2）这是从______面看到的。（填“正”“侧”或“上”）",mode:"solid-q2",viewLabel:"判断观察方向",givenGrid:[[1,0,0],[1,1,1]],focus:"题目给出的平面图下排有三格、左上方还有一格。",step2Tip:"哪一个方向能同时看到下面一排的 3 个方块和左上角的 1 个方块？",question:"这个图是从哪一面看到的？",options:["正面","侧面","上面"],correct:0,result:"这是从正面看到的。",hint:"正面能清楚看到下排三格和左上方一格。"},
 {id:"q3",number:3,kind:"practice",tier:"standard",statement:"从侧面看下面的立体图形是什么图形？在右边的方框中画一画吧！",mode:"solid-q3",viewLabel:"从侧面看",grid:[[1,1]],focus:"认真观察立体图，从侧面看过去时，同一排前后对齐的方块会被挡住。",step2Tip:"从侧面看，前后两排中有一块被前面的方块遮住了，你能看到几格？",question:"从侧面看，看到几个并排的正方形？",options:["1个","2个","3个"],correct:1,result:"从侧面看到两个并排的正方形。",hint:"前后共有两排，同一视线上的方块会重合，所以看到 2 个并排的正方形。"},
 {id:"q4-1",number:4,part:1,kind:"practice",tier:"standard",statement:"仔细观察下面的立体图形，按要求在横线上画出相应的图形。（1）从正面看到的图形是______。",mode:"solid-q4",viewLabel:"从正面看",grid:[[1,1,1]],focus:"先看清这 4 个小正方体的摆法，再把视线放到正前方。",step2Tip:"从正面看，左、中、右各有 1 列，前后重合的方块只算 1 格。",question:"从正面看到几个并排的正方形？",options:["2个","3个","4个"],correct:1,result:"正面看到三个并排的正方形。",hint:"前面中间的方块挡住了后面的中间方块，所以一共看到 3 个。"},
 {id:"q4-2",number:4,part:2,kind:"practice",tier:"standard",statement:"仔细观察下面的立体图形，按要求在横线上画出相应的图形。（2）从侧面看到的图形是______。",mode:"solid-q4",viewLabel:"从侧面看",grid:[[1,1]],focus:"保持这组立体方块不动，把眼睛移到侧面来看。",step2Tip:"从侧面看时，后排三个方块排在同一条视线上，会合成 1 格，再加上前排的 1 格。",question:"从侧面看到几个并排的正方形？",options:["1个","2个","3个"],correct:1,result:"侧面看到两个并排的正方形。",hint:"前排 1 格、后排合起来 1 格，所以看到 2 个并排的正方形。"},
 {id:"q4-3",number:4,part:3,kind:"practice",tier:"standard",statement:"仔细观察下面的立体图形，按要求在横线上画出相应的图形。（3）从上面看到的图形是______。",mode:"solid-q4",viewLabel:"从上面看",grid:[[1,1,1],[0,1,0]],focus:"把眼睛放到立体图形的正上方，垂直往下看。",step2Tip:"从上面看能完整看到所有 4 个方块的位置：后排几个？前排在哪个位置？",question:"从上面看到的图形怎样排列？",options:["一排三个，另一排中间一个","一排四个","上下各一排三个"],correct:0,result:"上面看到一排三个正方形，另一排中间一个。",hint:"后排有 3 个，前排中间有 1 个。"},
 {id:"q5",number:5,kind:"challenge",tier:"challenge",statement:"从正面看下面的立体图形是什么图形？在右边的方框中画一画吧！",mode:"blocks",viewLabel:"从正面看",grid:[[1,1,1],[1,1,1]],focus:"仔细看前排左上角和中间空缺的两个位置，从正面看过去会是空的吗？",step2Tip:"从正面看过去，前排空缺的地方会露出后面的方块，正好把空位补满！",question:"正面看到的图形有几行几列？",options:["2行3列","2行2列","1行3列"],correct:0,result:"从正面看到两行三列、共六个正方形。",hint:"前面空缺的两个位置，正好被后面的方块补上了！"},
 {id:"q6",number:6,kind:"challenge",tier:"challenge",statement:"观察下面的立体图形，从上面看是什么图形？在右边的方框中画一画吧！",mode:"cylinder",viewLabel:"从上面看",focus:"左边是一个正方体，右边是一个横着放的圆柱。现在从正上方往下看。",step2Tip:"注意！这个圆柱是横着放的，从上面往下看可不是一个圆哦！",question:"从上面看，正方体和横放圆柱分别是什么图形？",options:["正方形和长方形","正方形和圆形","两个圆形"],correct:0,result:"从上面看到正方形和长方形。",hint:"圆柱横放时，从上面往下看是一个长方形轮廓。"},
];
function createQuestion(q:ObserveQuestion):LessonVariant {
 const label=q.kind==="example" ? "小例题大发现" : `第 ${q.number} 题${q.part ? `（${q.part}）` : ""}`;
 const scene=(phase:number):BookVisualSceneState=>({kind:"book-visual",mode:q.mode,phase,viewLabel:q.viewLabel,grid:q.grid,givenGrid:q.givenGrid,answerText:phase===3?q.result:undefined});
 return {id:q.id,modeLabel:label,bookPart:q.tier==="challenge"?"B版":"A版",tier:q.tier,sectionId:"discovery",sectionKind:q.kind,questionNo:q.number,questionPart:q.part,title:label,subtitle:"从指定方向观察，再画出看到的图形。",defaultParams:{},paramDefs:[],build:()=>({
  problemStatement:q.statement,formulas:[{id:`${q.id}-rule`,latex:"\\text{沿指定方向看，重合部分只画一次}",comment:"先找准观察方向，再画平面轮廓"}],
  steps:teachingSteps([
   {
    title:`先观察：这次要${q.viewLabel}？`,
    narration:q.focus,
    sceneState:scene(0),
    liveStats:[{label:"观察方向",value:q.viewLabel,tone:"coral"},{label:"看到图形",value:"?"}],
   },
   {
    title:"沿视线看过去，被挡住的部分怎样处理？",
    narration:"想一想，同一条视线上一前一后的方块，会不会都画在平面图上？",
    sceneState:scene(1),
    liveStats:[{label:"观察方向",value:q.viewLabel},{label:"规律小考",value:"重合只画一次"}],
    checkpoint:{question:"沿视线重合的部分应怎样画？",options:["只画看到的轮廓","把前后所有方块分开画","不看观察方向"],correctIndex:0,feedbackCorrect:"对，重合在一起时只画看到的轮廓。",feedbackWrong:"想象把眼睛放在题目指定的方向。"},
   },
   {
    title:q.question,
    narration:`${q.step2Tip} ${q.question}`,
    sceneState:scene(2),
    liveStats:[{label:"观察方向",value:q.viewLabel},{label:"待选图形",value:"?",tone:"coral"}],
    checkpoint:{question:q.question,options:q.options,correctIndex:q.correct,feedbackCorrect:`答对了！${q.hint}`,feedbackWrong:`再看一看。${q.hint}`},
   },
   {
    title:"揭晓答案，换个位置检查",
    narration:`${q.result}${q.hint}`,
    sceneState:scene(3),
    activeFormulaIndices:[0],
    liveStats:[{label:"观察方向",value:q.viewLabel},{label:"答案",value:q.options[q.correct],tone:"teal"}],
    tipBody:"先找观察方向，挡住的部分不重复画。",
   },
  ])
 })};
}
export const g2ObserveShapesLesson:MathLesson={id:"g2-observe-shapes",chapterId:"g2-visual-thinking",chapterTitle:"04. 形象思维训练",grade:2,gradeLabel:"二年级",weekLabel:"p.28",title:"观察立体图形",summary:"按书中例题与练习，从正面、侧面和上面观察立体图形。",engine:"count-diagram",keywords:["二年级","形象思维","立体图形","观察方向"],editionMappings:[{edition:"doubanjiang",grade:2,gradeLabel:"二年级",chapterTitle:"04. 形象思维训练",weekLabel:"p.28"}],sections:[{id:"discovery",title:"小例题大发现",subtitle:"例题及六道练习",pageRange:"p.28–31"}],variants:questions.map(createQuestion)};
