import { useEffect,useState } from "react";
import './App.css';

//bai2
// const listData=[{
//   name:'Arsenal',
//   points:99,
//   GD:45,
// },
// {
//   name: 'Chelsea',
//   points:75,
//   GD:39,
// },
// {
//   name:'Manchester United',
//   points:60,
//   GD:29,
// },{
//   name:'Tottenham',
//   points:88,
//   GD:20,
// },
// {
//   name:'Liverpool',
//   points:88,
//   GD:39,
// },{
//   name:'Vietnam',
//   points:88,
//   GD:19,
// },{
//   name:'Anh',
//   points:88,
//   GD:40,
// },{
//   name:'Manchester City',
//   points:88,
//   GD:10,
// },

// ]

// const mang=[...listData].sort((a,b)=>{
//   if (a.points>b.points) 
//   return -1;
//   if (a.points<b.points)
//   return 1;
//   if (a.GD>b.GD) 
//   return -1;
//   if (a.GD<b.GD) 
//   return -1;
//   return 0;
// })
// mang.forEach((item,i)=>{
//   item.position=i+1;
// })
// mang.sort((a, b) => listData.indexOf(a) - listData.indexOf(b));
// console.log(mang)

//bai1
// let A1 = [1, 2, "a",'c','d']; let A2 = [1, 3, "b",'d']
// const mangTong=A1.concat(A2);
// const trung=[]
// for (let i=0;i<A1.length;i++){
//   for (let j=0;j<A2.length;j++){
//     if (A1[i]===A2[j]){
//       trung.push(A1[i]);
//     }
//   }
// }
// const ketQua=mangTong.filter((e)=>!trung.includes(e));
// console.log(ketQua)


//bai3
function App() {
 
  useEffect(()=>{

    setIsLoading(false)

    fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple').then((res)=>{  
    return (res.json())}).then((data)=>{
           setNewData(data.results)
           setIsLoading(true)
    })
  },[])
  const [newData,setNewData]=useState([]);

  const [isLoading,setIsLoading]=useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

	const [showScore, setShowScore] = useState(false);

	const [score, setScore] = useState(0);

const [testA,setTestA]=useState([]);

const [testB,setTestB]=useState([]);
useEffect(()=>{

  if (isLoading){

    setTestA(newData[currentQuestion].incorrect_answers)
    setTestB(newData[currentQuestion].correct_answer)

  }
},[newData[currentQuestion]])
const listQuestion=testA.concat(testB)

function shuffleArray(array) {

  for (let i = array.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];

  }
}
shuffleArray(listQuestion)

const resetAll=()=>{
window.location.reload()
}
  return (
    <div className="App">
      {isLoading ? <>
        {showScore ? (
          <div className="form-reset">

				<div className='score-section'>
					You scored {score} out of {newData.length}
				</div>
        <button onClick={resetAll} className='btn-reset'>New questions</button>
        </div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{newData.length}
						</div>
						<div className='question-text'>{newData[currentQuestion].question}</div>
					</div>
					<div className='answer-section'>
						{ 
          
            listQuestion.map((answerOption) => (
							<button onClick={()=>{
                  if(answerOption===newData[currentQuestion].correct_answer){
                    setScore(score +1)
                  }
                  const nextQuestion = currentQuestion + 1;
                  if (nextQuestion < newData.length) {
                    setCurrentQuestion(nextQuestion)
                  } else {setShowScore(true)}
                }
              }>{answerOption}</button>
						))
   
            }
					</div>
				</>
			)}
      </>: ''}
    </div>
  );
}

export default App;