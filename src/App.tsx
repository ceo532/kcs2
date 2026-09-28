import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  HelpCircle,
  Send,
  AlertCircle,
  Eye,
  Check,
  User,
  ListOrdered
} from 'lucide-react';
import { QUESTIONS, Question } from './data/questions';

const EXPLANATIONS: Record<number, string> = {
  1: 'Chủ ngữ "She" là ngôi thứ 3 số ít, động từ "go" tận cùng là "o" nên thêm "-es" thành "goes".',
  2: 'Với chủ ngữ "I", câu phủ định ở thì Hiện Tại Đơn dùng trợ động từ "don\'t" + V nguyên thể.',
  3: 'Chủ ngữ "My brother" là ngôi thứ 3 số ít nên động từ thêm "-s" thành "plays".',
  4: 'Chủ ngữ "They" (họ/chúng nó) là số nhiều, đi với động từ to be "are".',
  5: 'Chủ ngữ "The sun" (Mặt trời) là số ít, diễn tả chân lý/sự thật hiển nhiên nên chia "rises".',
  6: 'Chủ ngữ "Water" (nước) là danh từ không đếm được (số ít), sự thật khoa học nên dùng "boils".',
  7: 'Chủ ngữ "My father" là ngôi thứ 3 số ít, động từ "wash" tận cùng bằng "-sh" nên thêm "-es" thành "washes".',
  8: 'Chủ ngữ "We" (chúng tôi) là số nhiều, câu phủ định thì Hiện Tại Đơn dùng "don\'t go".',
  9: '"Mary and Peter" là chủ ngữ số nhiều (2 người), động từ giữ nguyên mẫu "study".',
  10: 'Chủ ngữ "He" là ngôi thứ 3 số ít, dạng số ít của "have" là "has".',
  11: 'Câu hỏi nghi vấn thì Hiện Tại Đơn với chủ ngữ "you" dùng trợ động từ "Do".',
  12: 'Câu hỏi có từ để hỏi với chủ ngữ "he" dùng trợ động từ "does": What time does he usually get up?',
  13: 'Câu hỏi với chủ ngữ số nhiều "they" dùng trợ động từ "do": Where do they live?',
  14: 'Câu hỏi với danh từ nghề nghiệp "a doctor" và chủ ngữ "she" dùng to be "Is": Is she a doctor...?',
  15: 'Câu hỏi tần suất với chủ ngữ "you" dùng trợ động từ "do": How often do you play...?',
  16: 'Câu hỏi với chủ ngữ "she" dùng trợ động từ "does": Why does she cry...?',
  17: 'Câu hỏi với chủ ngữ "you" dùng trợ động từ "do": Who do you live with?',
  18: 'Chủ ngữ "your mother" là ngôi thứ 3 số ít, câu hỏi bắt đầu bằng "Does": Does your mother cook...?',
  19: 'Chủ ngữ "this English word" là danh từ số ít, câu hỏi dùng trợ động từ "does".',
  20: 'Câu hỏi với tính từ/danh từ "your best friends" và chủ ngữ "they" dùng to be "Are".',
  21: 'Trạng từ chỉ tần suất (always) luôn đứng SAU động từ to be: "is always".',
  22: 'Trạng từ chỉ tần suất (usually) luôn đứng TRƯỚC động từ thường: "usually goes".',
  23: 'Chủ ngữ "My parents" (bố mẹ tôi) là danh từ số nhiều nên động từ giữ nguyên "eat".',
  24: 'Trong câu hỏi đã có trợ động từ "does", động từ chính phải ở dạng nguyên mẫu "brush".',
  25: 'Chủ ngữ "John" là ngôi thứ 3 số ít, động từ "watch" tận cùng "-ch" nên thêm "-es" thành "watches".',
  26: 'Lịch trình tàu xe cố định dùng thì Hiện Tại Đơn, "The train" là số ít nên chia "leaves".',
  27: 'Chủ ngữ "I" đi với động từ to be "am". Trạng từ "never" đứng sau to be: "I am never late...".',
  28: 'Sau trợ động từ "Do", động từ chính ở dạng nguyên mẫu không chia: "visit".',
  29: 'Chủ ngữ "Monkeys" (những chú khỉ) là danh từ số nhiều nên động từ ở dạng nguyên mẫu "love".',
  30: 'Chủ ngữ "It" là ngôi thứ 3 số ít nên động từ thêm "-s" thành "rains".',
  31: 'Sau trợ động từ phủ định "doesn\'t", động từ chính trở về dạng nguyên mẫu "play".',
  32: 'Chủ ngữ "She" là ngôi thứ 3 số ít, động từ "try" kết thúc bằng phụ âm + y nên chuyển thành "-ies" ("tries").',
  33: 'Chủ ngữ "My cat" là danh từ số ít, động từ "catch" tận cùng "-ch" nên thêm "-es" thành "catches".',
  34: 'Chủ ngữ "They" là số nhiều nên động từ giữ nguyên mẫu "carry".',
  35: 'Chủ ngữ "The public library" (thư viện công cộng) là số ít, động từ thêm "-s" thành "closes".',
  36: 'Sau trợ động từ "Doesn\'t", động từ chính ở dạng nguyên mẫu không chia "know".',
  37: '"I and my brother" (tôi và anh trai) là chủ ngữ số nhiều (2 người), động từ giữ nguyên mẫu "share".',
  38: '"Every child" (mỗi đứa trẻ) mang ý nghĩa số ít, động từ thêm "-s" thành "likes".',
  39: 'Đại từ bất định "Nobody" (không ai cả) được xem như ngôi thứ 3 số ít, động từ thêm "-s" thành "knows".',
  40: '"You and I" (bạn và tôi) là 2 người, chủ ngữ số nhiều nên động từ to be là "are".'
};

const STUDENTS = ['Bảo Khuê', 'Minh Chi', 'Duy Sang'] as const;
type StudentName = typeof STUDENTS[number];

type Screen = 'name-select' | 'quiz' | 'result';
type OptionKey = 'A' | 'B' | 'C' | 'D';

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec';

export default function App() {
  const [screen, setScreen] = useState<Screen>('name-select');
  const [selectedStudent, setSelectedStudent] = useState<StudentName | ''>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  
  // Track webhook submission status
  const webhookSentRef = useRef<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const currentQuestion: Question = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  // Calculate score
  const correctCount = QUESTIONS.reduce((acc, q) => {
    return answers[q.cau] === q.dapAn ? acc + 1 : acc;
  }, 0);

  // Send result to Google Sheet + Telegram webhook on result screen
  useEffect(() => {
    if (screen === 'result' && !webhookSentRef.current && selectedStudent) {
      webhookSentRef.current = true;

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore if confetti fails
      }

      // CRITICAL: Content-Type must be 'text/plain;charset=utf-8'
      const payload = {
        ten: selectedStudent,
        lop: '7',
        diem: correctCount,
        tongCau: totalQuestions,
        url: window.location.href,
      };

      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          console.log('[Webhook] Điểm đã được gửi thành công về Google Sheet & Telegram:', res.status);
        })
        .catch((err) => {
          console.error('[Webhook] Không thể gửi kết quả:', err);
        });
    }
  }, [screen, selectedStudent, correctCount, totalQuestions]);

  const handleStart = () => {
    if (!selectedStudent) return;
    setCurrentIndex(0);
    setAnswers({});
    webhookSentRef.current = false;
    setScreen('quiz');
  };

  const handleSelectOption = (option: OptionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.cau]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last question - check if any unanswered
      if (answeredCount < totalQuestions) {
        setShowConfirmModal(true);
      } else {
        submitTest();
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const submitTest = () => {
    setShowConfirmModal(false);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedStudent('');
    setAnswers({});
    setCurrentIndex(0);
    setShowConfirmModal(false);
    setShowQuestionGrid(false);
    webhookSentRef.current = false;
    setScreen('name-select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation on quiz screen
  useEffect(() => {
    if (screen !== 'quiz') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modal is open
      if (showConfirmModal) return;

      if (e.key === '1' || e.key.toLowerCase() === 'a') {
        handleSelectOption('A');
      } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
        handleSelectOption('B');
      } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
        handleSelectOption('C');
      } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
        handleSelectOption('D');
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (answers[currentQuestion.cau]) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, currentQuestion, answers, showConfirmModal]);

  // Encouragement evaluation
  const getEncouragement = (score: number) => {
    if (score === 40) {
      return {
        title: 'Xuất sắc tuyệt đối!',
        subtitle: 'Em đạt 10/10 điểm hoàn hảo! Kiến thức thì Hiện Tại Đơn của em vô cùng xuất sắc!',
        color: 'text-amber-500',
        bg: 'bg-amber-50 border-amber-200',
        badge: 'Đỉnh cao!',
      };
    }
    if (score >= 35) {
      return {
        title: 'Rất xuất sắc! 🎉',
        subtitle: 'Em nắm kiến thức thì Hiện Tại Đơn rất vững vàng! Hãy xem lại một vài câu sai nhỏ nhé.',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-200',
        badge: 'Học sinh Giỏi',
      };
    }
    if (score >= 28) {
      return {
        title: 'Làm tốt lắm! 👏',
        subtitle: 'Kết quả khá tốt! Em chỉ cần chú ý thêm một số quy tắc thêm s/es và câu hỏi là đạt điểm tối đa.',
        color: 'text-blue-600',
        bg: 'bg-blue-50 border-blue-200',
        badge: 'Khá Giỏi',
      };
    }
    if (score >= 20) {
      return {
        title: 'Cần cố gắng thêm nhé! 💪',
        subtitle: 'Em đã hoàn thành bài! Hãy xem kỹ phần giải thích đáp án bên dưới để rút kinh nghiệm nhé.',
        color: 'text-orange-600',
        bg: 'bg-orange-50 border-orange-200',
        badge: 'Cần ôn tập thêm',
      };
    }
    return {
      title: 'Đừng nản lòng nhé! 📚',
      subtitle: 'Hãy xem lại từng câu giải thích chi tiết bên dưới, sau đó bấm "Làm lại từ đầu" để luyện tập lại nha!',
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
      badge: 'Cố lên!',
    };
  };

  const filteredQuestions = QUESTIONS.filter((q) => {
    const isCorrect = answers[q.cau] === q.dapAn;
    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'wrong') return !isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-slate-100 flex flex-col justify-between selection:bg-sky-200">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Tiếng Anh Lớp 7
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Bài tập trắc nghiệm · Thì Hiện Tại Đơn (Present Simple)
              </p>
            </div>
          </div>

          {selectedStudent && (
            <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              <User className="w-4 h-4 text-sky-600" />
              <span>{selectedStudent}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {/* ========================================= */}
        {/* SCREEN 1: NAME SELECTION (MÀN HÌNH CHỌN TÊN) */}
        {/* ========================================= */}
        {screen === 'name-select' && (
          <div className="my-auto max-w-lg mx-auto w-full">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100 text-center">
              {/* Cheerful Avatar / Icon */}
              <div className="relative mx-auto w-20 h-20 mb-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-sky-200 rotate-2">
                  <GraduationCap className="w-11 h-11" />
                </div>
                <div className="absolute -top-1 -right-1 bg-amber-400 text-white rounded-full p-1 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Bài Tập Trắc Nghiệm Tiếng Anh
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
                Chủ điểm: <strong>Thì Hiện Tại Đơn (Present Simple Tense)</strong>
                <br />
                Hãy chọn đúng tên của em để bắt đầu làm bài nhé!
              </p>

              {/* Informational Points */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 text-center">
                <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3">
                  <div className="text-base sm:text-lg font-bold text-sky-700">40</div>
                  <div className="text-[11px] text-slate-500 font-medium">Câu trắc nghiệm</div>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3">
                  <div className="text-base sm:text-lg font-bold text-emerald-700">A / B / C / D</div>
                  <div className="text-[11px] text-slate-500 font-medium">4 lựa chọn</div>
                </div>
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3">
                  <div className="text-base sm:text-lg font-bold text-indigo-700">100%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Chấm điểm ngay</div>
                </div>
              </div>

              {/* Name Selection Dropdown (Bắt buộc theo yêu cầu) */}
              <div className="mb-6 text-left">
                <label
                  htmlFor="student-select"
                  className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5"
                >
                  <span>Chọn tên của em:</span>
                  <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="student-select"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value as StudentName)}
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-200 hover:border-sky-400 focus:border-sky-500 focus:bg-white text-slate-900 text-base font-medium rounded-2xl px-4 py-3.5 pr-10 outline-hidden transition shadow-xs cursor-pointer"
                  >
                    <option value="" disabled>
                      -- Vui lòng chọn tên của em --
                    </option>
                    {STUDENTS.map((name) => (
                      <option key={name} value={name} className="py-2 text-slate-900 font-medium">
                        {name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </div>
                </div>

                {!selectedStudent && (
                  <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Em cần chọn tên trước khi bấm "Bắt đầu làm bài".</span>
                  </p>
                )}
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStart}
                disabled={!selectedStudent}
                className={`w-full py-4 px-6 rounded-2xl text-base font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                  selectedStudent
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-sky-500/25 cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-slate-200 text-slate-400 border border-slate-300/60 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Bắt đầu làm bài</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* SCREEN 2: QUIZ SCREEN (MÀN HÌNH LÀM BÀI) */}
        {/* ========================================= */}
        {screen === 'quiz' && (
          <div className="w-full flex flex-col gap-4">
            {/* Progress and Question Quick Jumper Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">
                    Câu {currentIndex + 1} / {totalQuestions}
                  </span>
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    (Đã làm: <strong className="text-slate-800">{answeredCount}</strong>/{totalQuestions})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                    className="text-xs font-semibold text-slate-600 hover:text-sky-600 bg-slate-100 hover:bg-sky-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Danh sách 40 câu</span>
                  </button>
                  <span className="text-xs font-bold text-slate-700">
                    {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
                  </span>
                </div>
              </div>

              {/* Smooth Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Expandable 40 Questions Grid Navigator */}
              {showQuestionGrid && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-500 mb-2 font-medium flex items-center justify-between">
                    <span>Nhấn vào số câu để chuyển nhanh:</span>
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Đã chọn
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-200 ml-1"></span> Chưa làm
                    </span>
                  </div>
                  <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 max-h-40 overflow-y-auto p-1">
                    {QUESTIONS.map((q, idx) => {
                      const isAnswered = !!answers[q.cau];
                      const isCurrent = idx === currentIndex;
                      return (
                        <button
                          key={q.cau}
                          type="button"
                          onClick={() => {
                            setCurrentIndex(idx);
                            setShowQuestionGrid(false);
                          }}
                          className={`h-8 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                            isCurrent
                              ? 'ring-2 ring-sky-500 bg-sky-500 text-white shadow-xs'
                              : isAnswered
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {q.cau}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Current Question Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-bold tracking-wide uppercase text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  Câu hỏi số {currentQuestion.cau}
                </div>
                {answers[currentQuestion.cau] ? (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                    Đã chọn đáp án {answers[currentQuestion.cau]}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 italic">Chưa chọn đáp án</span>
                )}
              </div>

              {/* Question Text (Exact English Wording) */}
              <div className="mb-6 p-4 sm:p-5 bg-slate-50/70 border border-slate-200/60 rounded-2xl">
                <p className="text-lg sm:text-2xl font-bold text-slate-800 leading-relaxed font-sans">
                  {currentQuestion.hoi}
                </p>
              </div>

              {/* 4 Choices (A, B, C, D) */}
              <div className="space-y-3">
                {(['A', 'B', 'C', 'D'] as OptionKey[]).map((key) => {
                  const isSelected = answers[currentQuestion.cau] === key;
                  const optionText = currentQuestion[key];

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectOption(key)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer min-h-[58px] ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/80 shadow-sm text-sky-950 font-medium'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-sky-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {key}
                      </div>

                      <div className="flex-1 text-base sm:text-lg font-medium text-slate-900 leading-snug">
                        {optionText}
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`py-3.5 px-5 rounded-2xl font-semibold text-sm sm:text-base flex items-center gap-2 transition cursor-pointer ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Câu trước</span>
              </button>

              <div className="text-xs text-slate-500 hidden sm:block font-medium">
                Dùng phím A, B, C, D hoặc click chuột để chọn
              </div>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md shadow-sky-500/20 flex items-center gap-2 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-3.5 px-7 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Nộp bài</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Confirmation Modal if Unanswered Questions Exist when Submitting */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in duration-200">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Chưa hoàn thành hết các câu!</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Em mới làm được <strong className="text-sky-600 font-bold">{answeredCount}</strong> trên{' '}
                <strong>{totalQuestions}</strong> câu hỏi. Còn{' '}
                <strong className="text-rose-600 font-bold">{totalQuestions - answeredCount}</strong> câu chưa
                chọn đáp án. Em có muốn nộp bài luôn không?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="py-3 px-4 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  Làm tiếp
                </button>
                <button
                  type="button"
                  onClick={submitTest}
                  className="py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  Vẫn nộp bài
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* SCREEN 3: RESULT SCREEN (MÀN HÌNH KẾT QUẢ) */}
        {/* ========================================= */}
        {screen === 'result' && (
          <div className="w-full flex flex-col gap-6 py-2">
            {/* Score Hero Card */}
            {(() => {
              const praise = getEncouragement(correctCount);
              return (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 text-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Trophy className="w-8 h-8" />
                  </div>

                  {/* Student Name */}
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Kết quả làm bài của học sinh
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    {selectedStudent}
                  </h2>

                  {/* Main Score Display as requested: "Em đúng X/40 câu" */}
                  <div className="my-4 inline-block bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-sky-200 rounded-3xl px-6 py-4 shadow-xs">
                    <div className="text-3xl sm:text-5xl font-black text-sky-600 tracking-tight">
                      Em đúng {correctCount}/40 câu
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                      Điểm quy đổi: <strong className="text-indigo-600 font-bold">{((correctCount / 40) * 10).toFixed(1)}/10</strong> · Tỉ lệ chính xác: {Math.round((correctCount / 40) * 100)}%
                    </div>
                  </div>

                  {/* Praise / Feedback */}
                  <div className={`max-w-md mx-auto p-4 rounded-2xl border text-sm ${praise.bg} mb-6`}>
                    <p className={`font-bold ${praise.color} text-base mb-1`}>{praise.title}</p>
                    <p className="text-slate-600">{praise.subtitle}</p>
                  </div>

                  {/* Stats Breakdown */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto mb-6">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                      <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-semibold mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Số câu đúng</span>
                      </div>
                      <div className="text-2xl font-black text-emerald-700">{correctCount}</div>
                    </div>

                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
                      <div className="flex items-center justify-center gap-1 text-rose-600 text-xs font-semibold mb-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Số câu sai</span>
                      </div>
                      <div className="text-2xl font-black text-rose-700">{40 - correctCount}</div>
                    </div>

                    <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3">
                      <div className="flex items-center justify-center gap-1 text-sky-600 text-xs font-semibold mb-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Tổng số câu</span>
                      </div>
                      <div className="text-2xl font-black text-sky-700">40</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Làm lại từ đầu</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem lại chi tiết bài làm bên dưới</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Detailed Question Review List */}
            <div ref={reviewRef} className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Chi Tiết Từng Câu Hỏi</h3>
                  <p className="text-xs text-slate-500">Xem lại đáp án của em và lời giải chi tiết</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setReviewFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      reviewFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả (40)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('correct')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      reviewFilter === 'correct'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    Đúng ({correctCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('wrong')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      reviewFilter === 'wrong'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-rose-700 hover:bg-rose-50'
                    }`}
                  >
                    Sai ({40 - correctCount})
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredQuestions.map((q) => {
                  const studentAnswer = answers[q.cau];
                  const isCorrect = studentAnswer === q.dapAn;

                  return (
                    <div
                      key={q.cau}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-rose-200 bg-rose-50/20'
                      }`}
                    >
                      {/* Header of review card */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          Câu {q.cau}
                        </span>

                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Đúng</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Sai</span>
                          </span>
                        )}
                      </div>

                      {/* Question English text */}
                      <p className="text-base sm:text-lg font-bold text-slate-900 mb-3 leading-snug">
                        {q.hoi}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {(['A', 'B', 'C', 'D'] as OptionKey[]).map((opt) => {
                          const isOptionCorrect = q.dapAn === opt;
                          const isOptionSelected = studentAnswer === opt;

                          let optionStyles = 'border-slate-200 bg-white text-slate-700';
                          if (isOptionCorrect) {
                            optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                          } else if (isOptionSelected && !isOptionCorrect) {
                            optionStyles = 'border-rose-400 bg-rose-50 text-rose-900 line-through opacity-80';
                          }

                          return (
                            <div
                              key={opt}
                              className={`p-2.5 rounded-xl border text-sm flex items-center justify-between ${optionStyles}`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                                    isOptionCorrect
                                      ? 'bg-emerald-600 text-white'
                                      : isOptionSelected
                                      ? 'bg-rose-500 text-white'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {opt}
                                </span>
                                <span>{q[opt]}</span>
                              </div>

                              <div className="text-xs font-semibold shrink-0">
                                {isOptionCorrect && (
                                  <span className="text-emerald-700 flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" />
                                    Đáp án đúng
                                  </span>
                                )}
                                {isOptionSelected && !isOptionCorrect && (
                                  <span className="text-rose-600 flex items-center gap-1">
                                    <XCircle className="w-3.5 h-3.5" />
                                    Em chọn
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {EXPLANATIONS[q.cau] && (
                        <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-xs text-sky-900 flex items-start gap-2">
                          <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-semibold text-sky-800">Giải thích: </strong>
                            <span>{EXPLANATIONS[q.cau]}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Re-take Button */}
              <div className="mt-8 text-center pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3.5 px-8 rounded-2xl font-bold text-base bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md shadow-sky-500/25 inline-flex items-center gap-2 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Làm lại từ đầu</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Trắc Nghiệm Tiếng Anh Lớp 7 · Thì Hiện Tại Đơn</span>
          <span className="text-slate-400">Dành cho học sinh: Bảo Khuê · Minh Chi · Duy Sang</span>
        </div>
      </footer>
    </div>
  );
}
