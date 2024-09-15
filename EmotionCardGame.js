import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Gift, Heart, PartyPopper, VolumeX, Volume2 } from 'lucide-react';

const EmotionCardGame = () => {
  const stageOneQuestions = [
    { situation: "축구 경기에서 결승골을 넣어 우리 팀이 승리했어!", correctEmotion: "기쁨", emoji: "😄" },
    { situation: "친구랑 다퉜는데, 친구가 내 사과를 받아주지 않아.", correctEmotion: "슬픔", emoji: "😢" },
    { situation: "동생이 내 노트를 찢어서 화가 나.", correctEmotion: "분노", emoji: "😠" },
    { situation: "내일 발표인데, 실수할까 봐 너무 떨리고 걱정돼.", correctEmotion: "불안", emoji: "😰" },
    { situation: "친구가 이번 생일선물로 내가 예전부터 사고 싶던 스마트폰을 받았어.", correctEmotion: "부러움", emoji: "😒" },
    { situation: "점심시간에 넘어져서 음식을 다 쏟았어. 모두가 나를 쳐다봐서 너무 창피해.", correctEmotion: "당황", emoji: "😳" },
    { situation: "피아노 연주를 무대에서 성공적으로 끝냈어!", correctEmotion: "자신감", emoji: "😎" },
    { situation: "열심히 공부했는데, 시험에서 낮은 점수를 받았어.", correctEmotion: "좌절", emoji: "😞" },
    { situation: "내가 좋아하는 사람이 내 친구를 좋아하는 것을 알게 되었어.", correctEmotion: "질투", emoji: "😠" },
    { situation: "친구들이 모두 돌아가고 나만 혼자 남아 있었어.", correctEmotion: "외로움", emoji: "😔" }
  ];

  const stageTwoQuestions = [
    { situation: "주말에 신나는 놀이동산으로 가족여행을 가게 되었어. 어떤 감정을 느낄까?", correctEmotion: "설렘", emoji: "😊" },
    { situation: "오늘 친구가 약속을 지키지 않았어. 어떤 감정을 느낄까?", correctEmotion: "실망", emoji: "😕" },
    { situation: "친구들 앞에서 선생님이 갑자기 내 이름을 불렀어. 어떤 감정을 느낄까?", correctEmotion: "당혹", emoji: "😳" },
    { situation: "친구가 너를 위해 깜짝 생일 파티를 준비했어. 어떤 감정이 들까?", correctEmotion: "감동", emoji: "🥰" },
    { situation: "친구와 다투다가 화가 나서 너무 심한 말을 했어. 어떤 감정을 느낄까?", correctEmotion: "후회", emoji: "😔" },
    { situation: "오늘 발표를 너무 잘했어. 어떤 감정을 느낄까?", correctEmotion: "자랑스러움", emoji: "😊" },
    { situation: "친한 친구가 오늘 학교에 오지 않아서 혼자 있었어. 어떤 감정을 느낄까?", correctEmotion: "쓸쓸함", emoji: "😞" },
    { situation: "많은 사람 앞에서 실수를 했어. 어떤 감정을 느낄까?", correctEmotion: "부끄러움", emoji: "😳" },
    { situation: "할머니가 나보다 동생을 더 예뻐해. 어떤 감정을 느낄까?", correctEmotion: "질투", emoji: "😠" },
    { situation: "늦잠을 잤지만 학교에 늦지 않게 도착했어. 어떤 감정을 느낄까?", correctEmotion: "안도", emoji: "😌" }
  ];

  const stageThreeQuestions = [
    { situation: "도움을 받은 친구가 나에게 고맙다고 말했어.", correctEmotion: "기쁨", emoji: "😄" },
    { situation: "어려운 시험이 끝났는데, 생각보다 결과가 잘 나왔어.", correctEmotion: "안도", emoji: "😌" },
    { situation: "힘든 일이 있었지만, 앞으로는 더 나아질 것 같아.", correctEmotion: "희망", emoji: "😊" },
    { situation: "무대에서 모두가 나만 쳐다보고 있었어.", correctEmotion: "긴장", emoji: "😰" },
    { situation: "동생이 계속 나를 귀찮게 했어.", correctEmotion: "화남", emoji: "😠" },
    { situation: "오랫동안 준비한 발표를 성공적으로 끝냈어.", correctEmotion: "뿌듯함", emoji: "😊" },
    { situation: "수업 중에 갑자기 선생님이 내 이름을 부르셨어.", correctEmotion: "당황", emoji: "😳" },
    { situation: "친구가 내 기분을 상하게 하는 말을 했어.", correctEmotion: "불쾌", emoji: "😒" },
    { situation: "할 일이 너무 많아서 머리가 복잡했어.", correctEmotion: "스트레스", emoji: "😩" },
    { situation: "생각지도 못한 선물을 받았어.", correctEmotion: "감동", emoji: "🥰" }
  ];

  const [stage, setStage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [options, setOptions] = useState([]);
  const [showStageClear, setShowStageClear] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const questions = stage === 1 ? stageOneQuestions : stage === 2 ? stageTwoQuestions : stageThreeQuestions;
    if (currentQuestion < questions.length) {
      const correctEmotion = questions[currentQuestion].correctEmotion;
      const allEmotions = questions.map(q => q.correctEmotion);
      const otherEmotions = allEmotions.filter(emotion => emotion !== correctEmotion);
      const shuffledOtherEmotions = otherEmotions.sort(() => 0.5 - Math.random()).slice(0, 3);
      const newOptions = [...shuffledOtherEmotions, correctEmotion].sort(() => 0.5 - Math.random());
      setOptions(newOptions);
    } else {
      setShowStageClear(true);
      playSound('stageClear');
    }
  }, [stage, currentQuestion]);

  const playSound = (type) => {
    if (soundEnabled) {
      setFeedback(type);
      setTimeout(() => setFeedback(null), 500); // 0.5초 후 피드백 제거
    }
  };

  const handleSelect = (selectedOption) => {
    const questions = stage === 1 ? stageOneQuestions : stage === 2 ? stageTwoQuestions : stageThreeQuestions;
    const correct = selectedOption === questions[currentQuestion].correctEmotion;
    if (correct) {
      setScore(score + 1);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowStageClear(true);
      playSound('stageClear');
    }
  };

  const goToNextStage = () => {
    if (stage < 3) {
      setStage(stage + 1);
      setCurrentQuestion(0);
      setShowStageClear(false);
    } else {
      setGameOver(true);
      playSound('gameOver');
    }
  };

  const resetGame = () => {
    setStage(1);
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setShowStageClear(false);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const SnowFlake = () => {
    const style = {
      position: 'absolute',
      color: 'white',
      fontSize: '20px',
      animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
      left: `${Math.random() * 100}%`,
      top: `-20px`,
    };
    return <div style={style}>❄</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-green-700 flex items-center justify-center p-4 relative overflow-hidden">
      {[...Array(50)].map((_, i) => <SnowFlake key={i} />)}
      {feedback && (
        <div className={`absolute top-0 left-0 right-0 p-2 text-center text-white text-xl ${
          feedback === 'correct' ? 'bg-green-500' : 
          feedback === 'incorrect' ? 'bg-red-500' : 
          'bg-yellow-500'
        }`}>
          {feedback === 'correct' ? '정답입니다!' : 
           feedback === 'incorrect' ? '틀렸습니다.' : 
           '단계 클리어!'}
        </div>
      )}
      <Card className="w-full max-w-md mx-auto bg-white bg-opacity-90 shadow-xl relative z-10">
        <CardHeader className="text-center text-3xl font-bold text-red-600 flex justify-between items-center">
          <span>{gameOver ? "게임 종료" : showStageClear ? `${stage}단계 클리어!` : `감정 카드 게임 - ${stage}단계`}</span>
          <Button onClick={toggleSound} variant="ghost" className="p-1">
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </Button>
        </CardHeader>
        <CardContent>
          {gameOver ? (
            <>
              <p className="text-center mb-6 text-3xl font-bold">최종 점수: {score} / 30</p>
              <Gift className="mx-auto mb-6 text-green-600" size={64} />
              <Button onClick={resetGame} className="w-full bg-red-500 hover:bg-red-600 text-white text-xl py-3">다시 시작</Button>
            </>
          ) : showStageClear ? (
            <>
              <p className="text-center mb-6 text-3xl font-bold">{stage}단계 점수: {score - (stage - 1) * 10} / 10</p>
              <PartyPopper className="mx-auto mb-6 text-yellow-400" size={64} />
              <p className="text-center mb-6 text-xl">축하합니다! {stage < 3 ? `${stage + 1}단계로 넘어갑니다.` : "모든 단계를 클리어했습니다!"}</p>
              <Button onClick={goToNextStage} className="w-full bg-green-500 hover:bg-green-600 text-white text-xl py-3">
                {stage < 3 ? `${stage + 1}단계 시작` : "게임 종료"}
              </Button>
            </>
          ) : (
            <>
              <p className="text-center mb-4 text-xl">점수: {score} / {(stage - 1) * 10 + currentQuestion}</p>
              <div className="bg-green-100 rounded-lg p-4 mb-6">
                <p className="text-center text-lg">
                  {(stage === 1 ? stageOneQuestions : stage === 2 ? stageTwoQuestions : stageThreeQuestions)[currentQuestion].situation}
                </p>
                <p className="text-center text-4xl mt-2">
                  {(stage === 1 ? stageOneQuestions : stage === 2 ? stageTwoQuestions : stageThreeQuestions)[currentQuestion].emoji}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 transform hover:scale-105"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default EmotionCardGame;
